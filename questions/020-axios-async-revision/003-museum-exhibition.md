# Question

Build an exhibition page from one object containing scalar fields, an array of strings, and an array of objects. Fill `#title` with the title, `#curator` with `Curator: <curator>`, and `#year` with `Year: <year>`. Render each theme in uppercase in `#themes`. Render each exhibit in `#items` as `<name> (Zone <zone>) - <minutes> min`. Set `#summary` to `Total visit time: <sum> min`, summing all exhibit durations.

Fetch `/async-revision/exhibition.json` using **axios** with **async/await** when the page loads. Read the fetched data to produce your output; do not hard-code the results. Bootstrap and axios are already loaded. The file is supplied by this practice app and contains:

```json
{
  "title": "Ocean Discoveries",
  "curator": "Dr Mei Tan",
  "year": 2026,
  "themes": [
    "marine life",
    "conservation",
    "exploration"
  ],
  "exhibits": [
    {
      "name": "Coral Garden",
      "zone": "A",
      "minutes": 12
    },
    {
      "name": "Deep Sea Camera",
      "zone": "B",
      "minutes": 8
    },
    {
      "name": "Research Vessel",
      "zone": "C",
      "minutes": 15
    }
  ]
}
```

Preserve source order in every list, including after filtering. Use traditional `for` loops (or `for...of` with `let`) rather than `map`, `reduce`, `forEach`, or `filter`. Build list items using `document.createElement`, `textContent`, and `appendChild`.

# Test Cases

```javascript
describe('Museum Exhibition', () => {
  const texts = selector => [...document.querySelectorAll(selector)].map(el => el.textContent.trim());
  const waitFor = async predicate => {
    const start = Date.now();
    while (Date.now() - start < 4000) {
      if (predicate()) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error('Timed out waiting for loaded data');
  };
  it("shows title", async () => {
    await waitFor(() => texts("#title").length >= 1 && texts("#title").every(text => text !== ''));
    expect(texts("#title")).to.deep.equal(["Ocean Discoveries"]);
  });
  it("labels curator", async () => {
    await waitFor(() => texts("#curator").length >= 1 && texts("#curator").every(text => text !== ''));
    expect(texts("#curator")).to.deep.equal(["Curator: Dr Mei Tan"]);
  });
  it("labels year", async () => {
    await waitFor(() => texts("#year").length >= 1 && texts("#year").every(text => text !== ''));
    expect(texts("#year")).to.deep.equal(["Year: 2026"]);
  });
  it("uppercases themes", async () => {
    await waitFor(() => texts("#themes > li").length >= 3 && texts("#themes > li").every(text => text !== ''));
    expect(texts("#themes > li")).to.deep.equal(["MARINE LIFE","CONSERVATION","EXPLORATION"]);
  });
  it("formats exhibits", async () => {
    await waitFor(() => texts("#items > li").length >= 3 && texts("#items > li").every(text => text !== ''));
    expect(texts("#items > li")).to.deep.equal(["Coral Garden (Zone A) - 12 min","Deep Sea Camera (Zone B) - 8 min","Research Vessel (Zone C) - 15 min"]);
  });
  it("sums durations", async () => {
    await waitFor(() => texts("#summary").length >= 1 && texts("#summary").every(text => text !== ''));
    expect(texts("#summary")).to.deep.equal(["Total visit time: 35 min"]);
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
    <title>Museum Exhibition</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <main class="container py-4">
      <h1 id="title"></h1><p id="curator"></p><p id="year"></p><ul id="themes"></ul><ul id="items"></ul><p id="summary"></p>
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
const DATA_URL = '/async-revision/exhibition.json';

// Write an async loading function, then call it.
```

## Hints

- Use separate loops for themes and exhibits.
- Start a numeric total at zero and add each duration.

# Solution

```javascript
const DATA_URL = '/async-revision/exhibition.json';

function appendItem(selector, text) {
  const item = document.createElement('li');
  item.textContent = text;
  document.querySelector(selector).appendChild(item);
}

async function loadData() {
  const { data } = await axios.get(DATA_URL);
  document.querySelector('#title').textContent = data.title;
  document.querySelector('#curator').textContent = `Curator: ${data.curator}`;
  document.querySelector('#year').textContent = `Year: ${data.year}`;
  for (let i = 0; i < data.themes.length; i++) {
    appendItem('#themes', data.themes[i].toUpperCase());
  }
  let total = 0;
  for (let i = 0; i < data.exhibits.length; i++) {
    const exhibit = data.exhibits[i];
    appendItem('#items', `${exhibit.name} (Zone ${exhibit.zone}) - ${exhibit.minutes} min`);
    total += exhibit.minutes;
  }
  document.querySelector('#summary').textContent = `Total visit time: ${total} min`;
}

loadData();
```

# Walkthrough

1. Await the JSON response and display its scalar fields.
2. Uppercase each string while rendering the themes.
3. Format each exhibit object and accumulate its minutes.
4. Display the total and call the loader.

# Data Files

/async-revision/exhibition.json
