# Question

There is a JSON file at this URL:

```
https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/data.json
```

It contains an **array of courses**. Each course has an `id`, a `course` name, and an array of `topics`. Each topic has a `topicId`, a `title`, and *optionally* `hours` (some topics have no `hours` field).

A trimmed example of the shape:

```json
[
  {
    "id": 1001,
    "course": "Automation with OpenClaw",
    "topics": [
      { "topicId": 1, "title": "Introduction to OpenClaw", "hours": 2 },
      { "topicId": 2, "title": "Basic Operations", "hours": 4 },
      { "topicId": 3, "title": "Advanced Features" }
    ]
  },
  ...
]
```

The page already loads **Bootstrap** and **axios** from a CDN. It contains a `<div id="courses-list">` with **two example course blocks** already inside it. Use them as a visual reference for the structure your output should produce — then **delete them from the HTML** before writing your solution. The tests will fail while the examples are still in place.

When the page loads, fetch that URL using **axios** with **async/await**, then render every course inside `#courses-list` as follows:

For each course, append a `<div>` to `#courses-list`. Inside that `<div>`:

- An `<h3>` containing the course name (the `course` property).
- A `<ul>` containing one `<li>` per topic, in order. The text of each topic `<li>` should be:

  - `"<topicId>. <title> — <hours> hours"` if the topic has an `hours` field
  - `"<topicId>. <title>"` if the topic does **not** have an `hours` field

  Examples:
  - `1. Introduction to OpenClaw — 2 hours`
  - `3. Advanced Features`

The order of courses and topics must match the JSON.

# Test Cases

```
describe('axios - courses data.json', () => {
  const waitFor = async (fn, ms = 4000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('Timed out waiting for condition');
  };

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  const courseBlocks = () =>
    [...document.querySelectorAll('#courses-list > *')];

  it('renders 3 course blocks in #courses-list', async () => {
    await waitFor(() => courseBlocks().length >= 3);
    const names = courseBlocks().map((block) => {
      const heading = block.querySelector('h3');
      return heading ? norm(heading.textContent) : '';
    });
    expect(names).to.deep.equal([
      'Automation with OpenClaw',
      'Web Development',
      'Data Science',
    ]);
  });

  it('renders the topics for the first course', async () => {
    await waitFor(() => {
      const block = courseBlocks()[0];
      return block && block.querySelectorAll('ul li').length >= 3;
    });
    const items = [...courseBlocks()[0].querySelectorAll('ul li')]
      .map((li) => norm(li.textContent));
    expect(items).to.deep.equal([
      '1. Introduction to OpenClaw — 2 hours',
      '2. Basic Operations — 4 hours',
      '3. Advanced Features',
    ]);
  });

  it('renders the topics for the second course', async () => {
    await waitFor(() => {
      const block = courseBlocks()[1];
      return block && block.querySelectorAll('ul li').length >= 4;
    });
    const items = [...courseBlocks()[1].querySelectorAll('ul li')]
      .map((li) => norm(li.textContent));
    expect(items).to.deep.equal([
      '1. HTML Basics — 2 hours',
      '2. CSS Basics — 4 hours',
      '3. JavaScript Basics',
      '4. React Basics — 6 hours',
    ]);
  });

  it('omits the hours portion when a topic has no hours field', async () => {
    await waitFor(() =>
      [...document.querySelectorAll('#courses-list ul li')]
        .some((li) => /^\s*3\.\s*Advanced Features\s*$/.test(li.textContent))
    );
    const noHoursCount = [...document.querySelectorAll('#courses-list ul li')]
      .filter((li) => !/\d+ hours/.test(li.textContent))
      .length;
    expect(noHoursCount).to.equal(2);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Courses</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 class="h4 mb-3">Courses</h1>
      <div id="courses-list">
        <!--
          The two course blocks below are EXAMPLES showing the
          structure your JavaScript should generate for each course.
          Delete both before submitting — your code should produce one
          block per real course from the fetched JSON.
        -->
        <div>
          <h3>Example Course One</h3>
          <ul>
            <li>1. First topic — 2 hours</li>
            <li>2. Second topic — 4 hours</li>
            <li>3. Topic without hours</li>
          </ul>
        </div>
        <div>
          <h3>Example Course Two</h3>
          <ul>
            <li>1. Another topic — 1 hours</li>
            <li>2. Yet another topic</li>
          </ul>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* Optional */
```

## JavaScript

```javascript
// Write your code here.
//
// IMPORTANT: The starter HTML contains two example course blocks
// inside #courses-list as a visual reference for the structure you
// need to generate. Delete them from the HTML before running the
// tests — otherwise your output will have extra blocks.
//
// Use axios + async/await to fetch the data.json file from the URL
// above and render every course inside #courses-list as a <div>
// containing an <h3> (course name) and a <ul> of topic <li>s.
```

## Hints

- Two nested loops: the outer loop iterates over courses, the inner loop iterates over each course's `topics`.
- For each course, build the structure with `document.createElement` and `appendChild`: a `<div>` containing an `<h3>` and a `<ul>`.
- For the topic text, append the ` — <hours> hours` part only when `topic.hours !== undefined`.
- The em-dash character is `—`.

# Solution

```javascript
const COURSES_URL = 'https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/data.json';

async function loadCourses() {
  const { data: courses } = await axios.get(COURSES_URL);
  const container = document.querySelector('#courses-list');

  for (const course of courses) {
    const block = document.createElement('div');

    const heading = document.createElement('h3');
    heading.textContent = course.course;
    block.appendChild(heading);

    const ul = document.createElement('ul');
    for (const topic of course.topics) {
      const li = document.createElement('li');
      let text = `${topic.topicId}. ${topic.title}`;
      if (topic.hours !== undefined) {
        text += ` — ${topic.hours} hours`;
      }
      li.textContent = text;
      ul.appendChild(li);
    }
    block.appendChild(ul);

    container.appendChild(block);
  }
}

loadCourses();
```

# Walkthrough

1. Define an `async` function. Inside, `await axios.get(COURSES_URL)` and destructure `data` (the array of courses).
2. Grab the `#courses-list` container.
3. Loop over the courses with `for...of`:
   - Create a `<div>`.
   - Create an `<h3>` and set its text to the course name. Append to the div.
   - Create a `<ul>`.
   - Loop over `course.topics`:
     - Create a `<li>`.
     - Start the line with `${topicId}. ${title}`.
     - If `topic.hours` is defined, append ` — ${topic.hours} hours`.
     - Assign the result to the `<li>`'s `textContent`.
     - Append the `<li>` to the `<ul>`.
   - Append the `<ul>` to the div, and the div to the container.
4. Call the function once at the end of the script.
