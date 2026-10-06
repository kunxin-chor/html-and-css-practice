import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/services/srcdoc.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const moduleContext = vm.createContext({ exports: {}, window: { location: { origin: 'http://localhost:5173' } } });
vm.runInContext(compiled, moduleContext);
const { buildPreviewSrcDoc } = moduleContext.exports;

function runPage(html, axios) {
  const page = buildPreviewSrcDoc(html, '', 'window.baseAtStudentStart = window.axios && window.axios.defaults.baseURL;');
  const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const window = { axios, parent: { postMessage() {} }, addEventListener() {} };
  const context = vm.createContext({ window, console });
  for (const script of scripts) vm.runInContext(script[1], context);
  return { page, window };
}

test('sets an absolute Axios base before student code for all supported HTML shapes', () => {
  for (const html of ['<!doctype html><html><head></head><body></body></html>', '<html></html>', '<ul id="items"></ul>']) {
    const { page, window } = runPage(html, { defaults: {} });
    assert.match(page, /<base href="http:\/\/localhost:5173\/">/);
    assert.equal(window.baseAtStudentStart, 'http://localhost:5173/');
    // Axios same-origin checking fails with relative URLs against about:srcdoc.
    assert.throws(() => new URL('/async-revision/parcel.json', 'about:srcdoc'));
    const absolute = window.baseAtStudentStart + 'async-revision/parcel.json';
    assert.equal(new URL(absolute, 'about:srcdoc').href, 'http://localhost:5173/async-revision/parcel.json');
  }
});

test('preserves an explicitly configured Axios base', () => {
  const { window } = runPage('<body></body>', { defaults: { baseURL: 'https://example.com/api/' } });
  assert.equal(window.baseAtStudentStart, 'https://example.com/api/');
});

test('pages without Axios still execute student code', () => {
  const { window } = runPage('<body></body>', undefined);
  assert.equal(window.baseAtStudentStart, undefined);
});
