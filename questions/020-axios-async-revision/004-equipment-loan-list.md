# Question

A school equipment desk receives an object whose `equipment` property contains an array. The root object is not an array. Render only entries with `available === true` in `#items` as `<name> - <category> (<quantity> available)`. Set `#summary` to `<count> equipment types available`, counting displayed entries rather than adding quantities.

Fetch `/async-revision/equipment.json` using **axios** with **async/await** when the page loads. Read the fetched data to produce your output; do not hard-code the results. Bootstrap and axios are already loaded. The file is supplied by this practice app and contains:

```json
{
  "equipment": [
    {
      "name": "Camera",
      "category": "Media",
      "available": true,
      "quantity": 3
    },
    {
      "name": "Tripod",
      "category": "Media",
      "available": false,
      "quantity": 0
    },
    {
      "name": "Microphone",
      "category": "Audio",
      "available": true,
      "quantity": 2
    },
    {
      "name": "Projector",
      "category": "Display",
      "available": false,
      "quantity": 0
    },
    {
      "name": "Speaker",
      "category": "Audio",
      "available": true,
      "quantity": 1
    }
  ]
}
```

Preserve source order in every list, including after filtering. Use traditional `for` loops (or `for...of` with `let`) rather than `map`, `reduce`, `forEach`, or `filter`. Build list items using `document.createElement`, `textContent`, and `appendChild`.

# Test Cases

```javascript
describe('Equipment Loan List', () => {
  const texts = selector => [...document.querySelectorAll(selector)].map(el => el.textContent.trim());
  const waitFor = async predicate => {
    const start = Date.now();
    while (Date.now() - start < 4000) {
      if (predicate()) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error('Timed out waiting for loaded data');
  };
  it("filters unavailable equipment and preserves order", async () => {
    await waitFor(() => texts("#items > li").length >= 3 && texts("#items > li").every(text => text !== ''));
    expect(texts("#items > li")).to.deep.equal(["Camera - Media (3 available)","Microphone - Audio (2 available)","Speaker - Audio (1 available)"]);
  });
  it("counts types rather than units", async () => {
    await waitFor(() => texts("#summary").length >= 1 && texts("#summary").every(text => text !== ''));
    expect(texts("#summary")).to.deep.equal(["3 equipment types available"]);
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
    <title>Equipment Loan List</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <main class="container py-4">
      <h1>Equipment loans</h1><ul id="items"></ul><p id="summary"></p>
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
const DATA_URL = '/async-revision/equipment.json';

// Write an async loading function, then call it.
```

## Hints

- Loop over response.data.equipment.
- Check the availability flag before creating a list item.

# Solution

```javascript
const DATA_URL = '/async-revision/equipment.json';

function appendItem(selector, text) {
  const item = document.createElement('li');
  item.textContent = text;
  document.querySelector(selector).appendChild(item);
}

async function loadData() {
  const response = await axios.get(DATA_URL);
  let count = 0;
  const equipmentList = response.data.equipment;
  for (let i = 0; i < equipmentList.length; i++) {
    const equipment = equipmentList[i];
    if (equipment.available === true) {
      appendItem('#items', `${equipment.name} - ${equipment.category} (${equipment.quantity} available)`);
      count += 1;
    }
  }
  document.querySelector('#summary').textContent = `${count} equipment types available`;
}

loadData();
```

# Walkthrough

1. Await the request and access the array inside the wrapper object.
2. Check each entry for availability.
3. Render matching entries in source order and count them.
4. Show the count of types and call the loader.

# Data Files

/async-revision/equipment.json
