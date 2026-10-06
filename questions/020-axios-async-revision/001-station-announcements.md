# Question

A station noticeboard receives a plain-text file containing announcements, one per line. Render each non-empty line as an `<li>` in `#items`, trimming spaces from both ends. Set `#summary` to `Announcements: <count>`, counting only the cleaned, non-empty lines.

Fetch `/async-revision/announcements.txt` using **axios** with **async/await** when the page loads. Read the fetched data to produce your output; do not hard-code the results. Bootstrap and axios are already loaded. The file is supplied by this practice app and contains:

```text
  Platform 2 is now open  

Please keep behind the yellow line
  Next train: 5 minutes
```

Preserve source order in every list, including after filtering. Use traditional `for` loops (or `for...of` with `let`) rather than `map`, `reduce`, `forEach`, or `filter`. Build list items using `document.createElement`, `textContent`, and `appendChild`.

# Test Cases

```javascript
describe('Station Announcements', () => {
  const texts = selector => [...document.querySelectorAll(selector)].map(el => el.textContent.trim());
  const waitFor = async predicate => {
    const start = Date.now();
    while (Date.now() - start < 4000) {
      if (predicate()) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error('Timed out waiting for loaded data');
  };
  it("renders trimmed lines without blank items", async () => {
    await waitFor(() => texts("#items > li").length >= 3 && texts("#items > li").every(text => text !== ''));
    expect(texts("#items > li")).to.deep.equal(["Platform 2 is now open","Please keep behind the yellow line","Next train: 5 minutes"]);
  });
  it("counts non-empty announcements", async () => {
    await waitFor(() => texts("#summary").length >= 1 && texts("#summary").every(text => text !== ''));
    expect(texts("#summary")).to.deep.equal(["Announcements: 3"]);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Station Announcements</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <main class="container py-4">
      <h1>Station noticeboard</h1><ul id="items"></ul><p id="summary"></p>
    </main>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* Optional custom styles. */
```

## JavaScript

```javascript
const DATA_URL = '/async-revision/announcements.txt';

// Write an async loading function, then call it.
```

## Hints

- Plain-text response.data is a string.
- Split on the newline character, trim each line, and remove empty strings.

# Solution

```javascript
const DATA_URL = '/async-revision/announcements.txt';

function appendItem(selector, text) {
  const item = document.createElement('li');
  item.textContent = text;
  document.querySelector(selector).appendChild(item);
}

async function loadData() {
  const response = await axios.get(DATA_URL);
  const rawLines = response.data.split('\n');
  const lines = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (line !== '') {
      lines.push(line);
      appendItem('#items', line);
    }
  }
  document.querySelector('#summary').textContent = `Announcements: ${lines.length}`;
}

loadData();
```

# Walkthrough

1. Await the request inside an async function.
2. Split and clean the response text.
3. Create a list item for each non-empty line.
4. Use the cleaned array length for the summary, then call the loader.

# Data Files

/async-revision/announcements.txt
