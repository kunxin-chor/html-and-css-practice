# Question

Create a walking-trail guide from a top-level array of trails, each with a nested `stops` array. Append one `<section>` per trail to `#trails`. Each section must contain an `<h3>` with the trail name, an `<ol>` containing one `<li>` per stop, then a `<p>` summary. Format each stop as `<stopId>. <title> - <minutes> min` when minutes is present, or `<stopId>. <title> - time not supplied` when missing. **Zero is present** and must display as `0 min`. Each summary must read `Known time: <sum> min`, summing only that trail's supplied minutes.

Fetch `/async-revision/trails.json` using **axios** with **async/await** when the page loads. Read the fetched data to produce your output; do not hard-code the results. Bootstrap and axios are already loaded. The file is supplied by this practice app and contains:

```json
[
  {
    "name": "Garden Loop",
    "stops": [
      {
        "stopId": 1,
        "title": "Visitor Centre",
        "minutes": 0
      },
      {
        "stopId": 2,
        "title": "Orchid House",
        "minutes": 10
      },
      {
        "stopId": 3,
        "title": "Lake View"
      }
    ]
  },
  {
    "name": "Heritage Walk",
    "stops": [
      {
        "stopId": 1,
        "title": "Old Gate",
        "minutes": 5
      },
      {
        "stopId": 2,
        "title": "Clock Tower"
      }
    ]
  },
  {
    "name": "River Route",
    "stops": [
      {
        "stopId": 1,
        "title": "Stone Bridge",
        "minutes": 8
      },
      {
        "stopId": 2,
        "title": "Boat Landing",
        "minutes": 12
      }
    ]
  }
]
```

Preserve source order in every list, including after filtering. Use traditional `for` loops (or `for...of` with `let`) rather than `map`, `reduce`, `forEach`, or `filter`. Build list items using `document.createElement`, `textContent`, and `appendChild`.

# Test Cases

```javascript
describe('Walking Trail Stops', () => {
  const texts = selector => [...document.querySelectorAll(selector)].map(el => el.textContent.trim());
  const waitFor = async predicate => {
    const start = Date.now();
    while (Date.now() - start < 4000) {
      if (predicate()) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error('Timed out waiting for loaded data');
  };
  it("creates exactly three sections", async () => {
    await waitFor(() => texts("#trails > *").length >= 3 && texts("#trails > *").every(text => text !== ''));
    expect(document.querySelectorAll('#trails > *').length).to.equal(3); expect(document.querySelectorAll('#trails > section').length).to.equal(3);
  });
  it("renders trail headings in order", async () => {
    await waitFor(() => texts("#trails > section > h3").length >= 3 && texts("#trails > section > h3").every(text => text !== ''));
    expect(texts("#trails > section > h3")).to.deep.equal(["Garden Loop","Heritage Walk","River Route"]);
  });
  it("handles zero and missing minutes", async () => {
    await waitFor(() => texts("#trails > section:nth-child(1) > ol > li").length >= 3 && texts("#trails > section:nth-child(1) > ol > li").every(text => text !== ''));
    expect(texts("#trails > section:nth-child(1) > ol > li")).to.deep.equal(["1. Visitor Centre - 0 min","2. Orchid House - 10 min","3. Lake View - time not supplied"]);
  });
  it("renders second trail", async () => {
    await waitFor(() => texts("#trails > section:nth-child(2) > ol > li").length >= 2 && texts("#trails > section:nth-child(2) > ol > li").every(text => text !== ''));
    expect(texts("#trails > section:nth-child(2) > ol > li")).to.deep.equal(["1. Old Gate - 5 min","2. Clock Tower - time not supplied"]);
  });
  it("renders third trail", async () => {
    await waitFor(() => texts("#trails > section:nth-child(3) > ol > li").length >= 2 && texts("#trails > section:nth-child(3) > ol > li").every(text => text !== ''));
    expect(texts("#trails > section:nth-child(3) > ol > li")).to.deep.equal(["1. Stone Bridge - 8 min","2. Boat Landing - 12 min"]);
  });
  it("keeps totals separate", async () => {
    await waitFor(() => texts("#trails > section > p").length >= 3 && texts("#trails > section > p").every(text => text !== ''));
    expect(texts("#trails > section > p")).to.deep.equal(["Known time: 10 min","Known time: 5 min","Known time: 20 min"]);
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
    <title>Walking Trail Stops</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <main class="container py-4">
      <h1>Walking trails</h1><div id="trails"></div>
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
const DATA_URL = '/async-revision/trails.json';

// Write an async loading function, then call it.
```

## Hints

- Use an outer loop for trails and an inner loop for stops.
- Check stop.minutes !== undefined so zero is treated as supplied.
- Reset the total inside the outer loop.

# Solution

```javascript
const DATA_URL = '/async-revision/trails.json';

async function loadData() {
  const { data: trails } = await axios.get(DATA_URL);
  for (let i = 0; i < trails.length; i++) {
    const trail = trails[i];
    const section = document.createElement('section');
    const heading = document.createElement('h3');
    heading.textContent = trail.name;
    section.appendChild(heading);
    const list = document.createElement('ol');
    let total = 0;
    for (let j = 0; j < trail.stops.length; j++) {
      const stop = trail.stops[j];
      const item = document.createElement('li');
      let duration = 'time not supplied';
      if (stop.minutes !== undefined) {
        duration = `${stop.minutes} min`;
        total += stop.minutes;
      }
      item.textContent = `${stop.stopId}. ${stop.title} - ${duration}`;
      list.appendChild(item);
    }
    section.appendChild(list);
    const summary = document.createElement('p');
    summary.textContent = `Known time: ${total} min`;
    section.appendChild(summary);
    document.querySelector('#trails').appendChild(section);
  }
}

loadData();
```

# Walkthrough

1. Await the top-level array.
2. Create a section, heading, list, and fresh total for each trail.
3. Loop over stops, distinguishing zero from a missing property.
4. Append the list and summary to the section, then append the section.
5. Call the loader when the page loads.

# Data Files

/async-revision/trails.json
