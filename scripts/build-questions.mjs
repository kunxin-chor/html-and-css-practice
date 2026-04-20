#!/usr/bin/env node
/**
 * build-questions.mjs
 *
 * Scans the /questions directory, parses each authored Markdown question
 * file, and writes a single JSON bundle consumed by the React app.
 *
 * Design notes (see docs/requirements.md):
 *  - Folder layout: questions/<NNN-category-slug>/<NNN-question-slug>.md
 *  - The NNN- prefix is ONLY for ordering. Stable IDs are derived from
 *    the slug *after* the NNN- prefix is stripped, so re-ordering,
 *    re-numbering, or moving a question between categories never
 *    changes its ID (student progress keyed by ID stays intact).
 *  - Each question .md uses a fixed set of headings:
 *      # Question
 *      # Answer
 *      # Test Cases
 *      # Starting Files
 *        ## HTML
 *        ## CSS
 *        ## Hints
 *      # Solution
 *      # Walkthrough
 *  - Every fenced code block under `# Test Cases` is extracted as an
 *    independent test case (browser-runnable: Mocha + Chai style).
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, '..');
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions');
const OUTPUT_FILE = path.join(REPO_ROOT, 'data', 'questions.json');

// ----------------------------- helpers -------------------------------------

const ORDER_PREFIX_RE = /^(\d{3})-(.+)$/;

/**
 * Split "001-basic-html" -> { order: 1, slug: "basic-html" }.
 * Throws when the prefix is missing so authoring mistakes fail loudly.
 */
function parseOrderedName(name) {
  const match = name.match(ORDER_PREFIX_RE);
  if (!match) {
    throw new Error(
      `Name "${name}" is missing the required 3-digit order prefix (e.g. "001-${name}")`
    );
  }
  return { order: Number(match[1]), slug: match[2] };
}

/** Stable ID = first 12 hex chars of sha1(slug). */
function stableId(slug) {
  return crypto.createHash('sha1').update(slug).digest('hex').slice(0, 12);
}

/** "basic-html" -> "Basic Html" (used as a default human-readable title). */
function titleCase(slug) {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// --------------------------- markdown parser -------------------------------

/**
 * Parse a question Markdown document into a structured object.
 *
 * Strategy:
 *   1. Walk the file line by line, tracking fenced code blocks so that
 *      headings inside them are ignored.
 *   2. When a top-level `# X` or `## X` heading is found (outside a
 *      fence), start a new section and accumulate subsequent lines
 *      into it until the next heading at the same-or-shallower level.
 *   3. A few sections get special post-processing:
 *        - "Starting Files" is a container of H2 sub-sections.
 *        - "Test Cases" is split into an array, one entry per fenced
 *          code block. Non-code prose is discarded.
 *        - "Starting Files > HTML" / "> CSS" return the first fenced
 *          block's contents as a plain string.
 */
function parseQuestionMarkdown(raw) {
  const lines = raw.split(/\r?\n/);

  // Pass 1: collect sections as { level, title, body[] }.
  const sections = [];
  let current = null;
  let inFence = false;
  let fenceMarker = '';

  for (const line of lines) {
    const fenceMatch = line.match(/^(\s*)(```+|~~~+)(.*)$/);
    if (fenceMatch) {
      const marker = fenceMatch[2];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (line.trim().startsWith(fenceMarker)) {
        inFence = false;
        fenceMarker = '';
      }
      if (current) current.body.push(line);
      continue;
    }

    if (!inFence) {
      const h1 = line.match(/^#\s+(.+?)\s*$/);
      const h2 = line.match(/^##\s+(.+?)\s*$/);
      if (h1) {
        current = { level: 1, title: h1[1].trim(), body: [] };
        sections.push(current);
        continue;
      }
      if (h2) {
        current = { level: 2, title: h2[1].trim(), body: [] };
        sections.push(current);
        continue;
      }
    }

    if (current) current.body.push(line);
  }

  // Pass 2: group H2s under their preceding H1 (specifically "Starting Files").
  const topLevel = {};
  let activeH1 = null;
  for (const section of sections) {
    if (section.level === 1) {
      activeH1 = { title: section.title, body: section.body, subs: {} };
      topLevel[section.title.toLowerCase()] = activeH1;
    } else if (section.level === 2 && activeH1) {
      activeH1.subs[section.title.toLowerCase()] = section.body;
    }
  }

  const getBody = (key) =>
    topLevel[key] ? topLevel[key].body.join('\n').trim() : '';
  const getSub = (parentKey, subKey) => {
    const parent = topLevel[parentKey];
    if (!parent) return '';
    const sub = parent.subs[subKey];
    return sub ? sub.join('\n').trim() : '';
  };

  // Extract all fenced code blocks from a body array.
  function extractCodeBlocks(bodyLines) {
    const blocks = [];
    let collecting = false;
    let marker = '';
    let buffer = [];
    for (const line of bodyLines) {
      const fence = line.match(/^(\s*)(```+|~~~+)(.*)$/);
      if (fence) {
        const m = fence[2];
        if (!collecting) {
          collecting = true;
          marker = m;
          buffer = [];
        } else if (line.trim().startsWith(marker)) {
          blocks.push(buffer.join('\n'));
          collecting = false;
          marker = '';
          buffer = [];
        } else {
          buffer.push(line);
        }
      } else if (collecting) {
        buffer.push(line);
      }
    }
    return blocks;
  }

  // First fenced code block of a body array (or '' if none).
  const firstCodeBlock = (bodyLines) => {
    const blocks = extractCodeBlocks(bodyLines);
    return blocks[0] ?? '';
  };

  const testCaseBodyLines = topLevel['test cases']?.body ?? [];

  return {
    question: getBody('question'),
    answer: getBody('answer'),
    testCases: extractCodeBlocks(testCaseBodyLines),
    startingFiles: {
      html: firstCodeBlock(topLevel['starting files']?.subs['html'] ?? []),
      css: firstCodeBlock(topLevel['starting files']?.subs['css'] ?? []),
    },
    hints: getSub('starting files', 'hints'),
    solution: getBody('solution'),
    walkthrough: getBody('walkthrough'),
  };
}

// ----------------------------- build ---------------------------------------

async function safeReaddir(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function build() {
  const categoryEntries = await safeReaddir(QUESTIONS_DIR);
  const categoryDirs = categoryEntries
    .filter((e) => e.isDirectory())
    .filter((e) => ORDER_PREFIX_RE.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (categoryDirs.length === 0) {
    console.warn(`No category folders found in ${QUESTIONS_DIR}`);
  }

  const categories = [];
  const questions = [];

  for (const catDir of categoryDirs) {
    const { order: categoryOrder, slug: categorySlug } = parseOrderedName(
      catDir.name
    );
    const categoryId = stableId(categorySlug);
    const categoryPath = path.join(QUESTIONS_DIR, catDir.name);

    categories.push({
      id: categoryId,
      slug: categorySlug,
      name: titleCase(categorySlug),
      order: categoryOrder,
    });

    const questionEntries = await safeReaddir(categoryPath);
    const questionFiles = questionEntries
      .filter((e) => e.isFile() && e.name.endsWith('.md'))
      .filter((e) => ORDER_PREFIX_RE.test(e.name.replace(/\.md$/i, '')))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const qFile of questionFiles) {
      const baseName = qFile.name.replace(/\.md$/i, '');
      const { order: questionOrder, slug: questionSlug } =
        parseOrderedName(baseName);
      const questionId = stableId(questionSlug);
      const filePath = path.join(categoryPath, qFile.name);
      const raw = await fs.readFile(filePath, 'utf8');

      let parsed;
      try {
        parsed = parseQuestionMarkdown(raw);
      } catch (err) {
        throw new Error(
          `Failed to parse ${path.relative(REPO_ROOT, filePath)}: ${err.message}`
        );
      }

      questions.push({
        id: questionId,
        slug: questionSlug,
        title: titleCase(questionSlug),
        categoryId,
        categorySlug,
        order: questionOrder,
        sourcePath: path
          .relative(REPO_ROOT, filePath)
          .replaceAll(path.sep, '/'),
        ...parsed,
      });
    }
  }

  // Detect duplicate IDs (would indicate two files sharing a slug).
  const seenQ = new Map();
  for (const q of questions) {
    if (seenQ.has(q.id)) {
      throw new Error(
        `Duplicate question id "${q.id}" from slug "${q.slug}" — ` +
          `${seenQ.get(q.id)} and ${q.sourcePath} collide. ` +
          `Rename one of the files so the slug differs.`
      );
    }
    seenQ.set(q.id, q.sourcePath);
  }
  const seenC = new Map();
  for (const c of categories) {
    if (seenC.has(c.id)) {
      throw new Error(
        `Duplicate category id "${c.id}" from slug "${c.slug}".`
      );
    }
    seenC.set(c.id, c.slug);
  }

  const bundle = {
    generatedAt: new Date().toISOString(),
    categories,
    questions,
  };

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(bundle, null, 2) + '\n', 'utf8');

  console.log(
    `Wrote ${questions.length} questions across ${categories.length} categories -> ${path.relative(
      REPO_ROOT,
      OUTPUT_FILE
    )}`
  );
}

build().catch((err) => {
  console.error('[build-questions] ' + err.message);
  process.exit(1);
});
