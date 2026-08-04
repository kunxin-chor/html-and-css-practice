# Question

Continuing from the previous questions, you'll now **edit** an existing entry in your bin.

## Setup

Reuse the **same private bin** as before. Make sure it currently contains a JSON array with **at least one fruit** (e.g. `["apple", "banana", "cherry"]`).

Paste the same `binId` and `masterKey` into `window.JSONBIN_CONFIG` in the starter JavaScript.

## What to build

The page already loads **Bootstrap** and **axios** from a CDN. It contains:

- An empty `<ul id="fruits-list"></ul>`.
- A number input `<input id="index-input">` for the index of the fruit to edit (`0` = first fruit, `1` = second, etc.).
- A text input `<input id="value-input">` for the new value.
- A button `<button id="update-btn">Update</button>`.

When the page loads:

1. Fetch the array from the bin and render each entry as an `<li>` inside `#fruits-list`.

When the user fills in the index + new value and clicks **Update**:

1. Fetch the **current** array from the bin.
2. Replace the entry at the given index with the new value.
3. **Update** the bin to be that modified array (same length, just one entry changed).
4. Re-render `#fruits-list` so the change appears.

## JSONBin endpoints you'll need

Same as the previous question:

- `GET https://api.jsonbin.io/v3/b/{BIN_ID}/latest`
- `PUT https://api.jsonbin.io/v3/b/{BIN_ID}`

Both require the `X-Master-Key` header.

# Test Cases

```
describe('jsonbin - edit a fruit', () => {
  const waitFor = async (fn, ms = 8000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (await fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 150));
    }
    throw new Error('Timed out waiting for condition');
  };

  const fetchBin = async () => {
    const cfg = window.JSONBIN_CONFIG;
    const r = await axios.get(
      `https://api.jsonbin.io/v3/b/${cfg.binId}/latest`,
      { headers: { 'X-Master-Key': cfg.masterKey } }
    );
    return r.data.record;
  };

  it('JSONBIN_CONFIG is filled in', () => {
    const cfg = window.JSONBIN_CONFIG || {};
    expect(cfg.binId).to.be.a('string').and.not.match(/PASTE_YOUR/i);
    expect(cfg.masterKey).to.be.a('string').and.not.match(/PASTE_YOUR/i);
  });

  it('clicking Update changes the entry at the given index, leaves length unchanged, and re-renders', async () => {
    const before = await fetchBin();
    expect(before, 'your bin should contain a JSON array').to.be.an('array');
    expect(before.length, 'add at least one fruit to your bin before running this test')
      .to.be.greaterThan(0);

    const idx = before.length - 1;
    const unique = 'edited-' + Date.now();

    document.querySelector('#index-input').value = String(idx);
    document.querySelector('#value-input').value = unique;
    document.querySelector('#update-btn').click();

    // Wait for the bin to reflect the edit.
    await waitFor(async () => {
      const after = await fetchBin();
      return after.length === before.length && after[idx] === unique;
    });

    // Wait for the DOM to reflect the edit too.
    await waitFor(() => {
      const items = [...document.querySelectorAll('#fruits-list > li')]
        .map((li) => li.textContent.trim());
      return items.length === before.length && items[idx] === unique;
    });
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JSONBin - Edit</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 class="h4 mb-3">My fruits</h1>
      <ul id="fruits-list"></ul>
      <div class="mt-3">
        <input id="index-input" type="number" placeholder="Index">
        <input id="value-input" type="text" placeholder="New value">
        <button id="update-btn" class="btn btn-primary">Update</button>
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
window.JSONBIN_CONFIG = {
  binId: 'PASTE_YOUR_BIN_ID_HERE',
  masterKey: 'PASTE_YOUR_MASTER_KEY_HERE',
};

// Write your code below.
//
// 1. On page load, GET the bin and render each fruit as an <li> in #fruits-list.
// 2. On Update click: GET the current array, replace the entry at the given
//    index with the new value, PUT the array back, then re-render the list.
```

## Hints

- The number input gives you a string. Convert it with `Number(indexInput.value)` before using it as an array index.
- The order of operations is the same as the previous question: GET → mutate → PUT → re-render. Only the mutation step differs (`fruits[index] = newValue` instead of `fruits.push(newValue)`).
- Reuse small helpers like `getFruits()`, `putFruits(arr)`, and `render(arr)` to keep the click handler short.

# Solution

```javascript
window.JSONBIN_CONFIG = {
  binId: 'PASTE_YOUR_BIN_ID_HERE',
  masterKey: 'PASTE_YOUR_MASTER_KEY_HERE',
};

const { binId, masterKey } = window.JSONBIN_CONFIG;
const BIN_URL = `https://api.jsonbin.io/v3/b/${binId}`;
const HEADERS = {
  'X-Master-Key': masterKey,
  'Content-Type': 'application/json',
};

async function getFruits() {
  const response = await axios.get(`${BIN_URL}/latest`, { headers: HEADERS });
  return response.data.record;
}

async function putFruits(fruits) {
  await axios.put(BIN_URL, fruits, { headers: HEADERS });
}

function render(fruits) {
  const list = document.querySelector('#fruits-list');
  list.innerHTML = '';
  for (const fruit of fruits) {
    const li = document.createElement('li');
    li.textContent = fruit;
    list.appendChild(li);
  }
}

async function init() {
  const fruits = await getFruits();
  render(fruits);
}

document.querySelector('#update-btn').addEventListener('click', async () => {
  const index = Number(document.querySelector('#index-input').value);
  const newValue = document.querySelector('#value-input').value;

  const fruits = await getFruits();
  fruits[index] = newValue;
  await putFruits(fruits);
  render(fruits);
});

init();
```

# Walkthrough

1. Same setup as the previous question: pull config out, build the bin URL + headers, and define `getFruits`, `putFruits`, and `render` helpers.
2. On page load, `init()` fetches the array and renders it.
3. On Update click:
   - Read the index input and convert it to a number with `Number(...)`.
   - Read the new value input as-is (it's already a string).
   - GET the array (so you're working on the latest version).
   - Replace `fruits[index]` with the new value. The array length stays the same — only that one entry changes.
   - PUT the modified array back to the bin.
   - Re-render the list so the change is visible.
