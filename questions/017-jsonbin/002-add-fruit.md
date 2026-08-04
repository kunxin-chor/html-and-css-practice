# Question

Continuing from the previous question, you'll now **add** a new fruit to your JSONBin from a form on the page.

## Setup

Reuse the **same private bin** from the previous question. It must currently contain a JSON array (e.g. `["apple", "banana", "cherry"]`).

Paste the same `binId` and `masterKey` into `window.JSONBIN_CONFIG` in the starter JavaScript.

## What to build

The page already loads **Bootstrap** and **axios** from a CDN. It contains:

- An empty `<ul id="fruits-list"></ul>`.
- A text input `<input id="fruit-input">`.
- A button `<button id="add-btn">Add</button>`.

When the page loads:

1. Fetch the array from the bin and render each entry as an `<li>` inside `#fruits-list`.

When the user types a fruit name and clicks **Add**:

1. Fetch the **current** array from the bin (so you don't overwrite changes someone else made).
2. Push the input's value onto the end of that array.
3. **Update** the bin to be that new, longer array.
4. Re-render `#fruits-list` so the new fruit appears.

## JSONBin endpoints you'll need

- **GET latest:** `GET https://api.jsonbin.io/v3/b/{BIN_ID}/latest`
- **Update bin:** `PUT https://api.jsonbin.io/v3/b/{BIN_ID}`
  - Body: the new JSON value (the whole array)
  - Headers: `X-Master-Key: {your master key}` and `Content-Type: application/json`

# Test Cases

```
describe('jsonbin - add a fruit', () => {
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

  it('clicking Add appends the input value to the bin and re-renders', async () => {
    const before = await fetchBin();
    expect(before, 'your bin should contain a JSON array').to.be.an('array');

    const unique = 'test-fruit-' + Date.now();
    document.querySelector('#fruit-input').value = unique;
    document.querySelector('#add-btn').click();

    // Wait for the bin to reflect the addition.
    await waitFor(async () => {
      const after = await fetchBin();
      return after.length === before.length + 1
        && after[after.length - 1] === unique;
    });

    // Wait for the DOM to reflect the addition too.
    await waitFor(() => {
      const items = [...document.querySelectorAll('#fruits-list > li')]
        .map((li) => li.textContent.trim());
      return items.length === before.length + 1
        && items[items.length - 1] === unique;
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
    <title>JSONBin - Add</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 class="h4 mb-3">My fruits</h1>
      <ul id="fruits-list"></ul>
      <div class="mt-3">
        <input id="fruit-input" type="text" placeholder="New fruit">
        <button id="add-btn" class="btn btn-primary">Add</button>
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
// 2. On Add click: GET the current array, push the input value, PUT it back,
//    then re-render the list.
```

## Hints

- A small helper `async function getBin()` that returns `response.data.record` keeps your code DRY for the GET call.
- For the PUT, axios takes the body as the **second** argument and config (headers) as the **third**:
  `axios.put(url, newArray, { headers: { 'X-Master-Key': masterKey, 'Content-Type': 'application/json' } })`.
- After PUT succeeds, the response also contains the new value at `response.data.record` — you can re-render from that, or just refetch the bin.
- A simple way to re-render: clear `#fruits-list` with `list.innerHTML = ''`, then loop over the array again.

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

document.querySelector('#add-btn').addEventListener('click', async () => {
  const input = document.querySelector('#fruit-input');
  const value = input.value;
  if (!value) return;

  const fruits = await getFruits();
  fruits.push(value);
  await putFruits(fruits);
  render(fruits);
  input.value = '';
});

init();
```

# Walkthrough

1. Pull `binId` and `masterKey` out of `window.JSONBIN_CONFIG` and build the bin URL + headers once.
2. Two small async helpers:
   - `getFruits()` does a GET on `/latest` and returns `response.data.record`.
   - `putFruits(fruits)` does a PUT with the new array as the body.
3. A `render(fruits)` helper clears `#fruits-list` and rebuilds the `<li>`s — so it works the first time and after every add.
4. On page load, call `getFruits()` and render.
5. On Add click:
   - Read the input value (skip if empty).
   - Always **GET first** so you have the current array (someone else might have changed it).
   - `push` the new value, then PUT the whole array back.
   - Re-render the list and clear the input.
