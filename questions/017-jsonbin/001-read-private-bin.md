# Question

In this category you will use **JSONBin.io** as a tiny cloud database. Each "bin" stores one JSON value that you can read and update over HTTP.

## Setup (do this once before starting)

1. Create a free account at **https://jsonbin.io**.
2. From your account dashboard, copy your **Master Key** (`X-Master-Key`). You'll use it for every request in this category.
3. Click **Create Bin**, paste this exact JSON as the content, then save it as a **PRIVATE** bin:

   ```json
   ["apple", "banana", "cherry"]
   ```

4. From the bin's page, copy the **Bin ID** (the long alphanumeric string in the URL).
5. Open the starter JavaScript and paste both into `window.JSONBIN_CONFIG`.

## What to build

The page already loads **Bootstrap** and **axios** from a CDN. It contains an empty `<ul id="fruits-list"></ul>`.

When the page loads, fetch the contents of your bin from JSONBin using **axios** with **async/await**, and render every fruit in the array as an `<li>` inside `#fruits-list`, in the same order as in the bin.

## JSONBin endpoints you'll need

- **GET latest:** `GET https://api.jsonbin.io/v3/b/{BIN_ID}/latest`
- Required header: `X-Master-Key: {your master key}` (private bins always need this, even for reads).
- The response body looks like `{ record: <your stored value>, metadata: { ... } }` — your array of fruits is at `response.data.record`.

# Test Cases

```
describe('jsonbin - read private bin', () => {
  const waitFor = async (fn, ms = 6000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (await fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error('Timed out waiting for condition');
  };

  it('JSONBIN_CONFIG is filled in', () => {
    const cfg = window.JSONBIN_CONFIG || {};
    expect(cfg.binId, 'set window.JSONBIN_CONFIG.binId in your script').to.be.a('string');
    expect(cfg.binId).to.not.match(/PASTE_YOUR/i);
    expect(cfg.masterKey, 'set window.JSONBIN_CONFIG.masterKey in your script').to.be.a('string');
    expect(cfg.masterKey).to.not.match(/PASTE_YOUR/i);
  });

  it('renders one <li> per fruit, in the same order as the bin', async () => {
    const cfg = window.JSONBIN_CONFIG;
    const fetched = await axios.get(
      `https://api.jsonbin.io/v3/b/${cfg.binId}/latest`,
      { headers: { 'X-Master-Key': cfg.masterKey } }
    );
    const fruits = fetched.data.record;
    expect(fruits, 'your bin should contain a JSON array').to.be.an('array');
    expect(fruits.length, 'your bin should not be empty').to.be.greaterThan(0);

    await waitFor(() =>
      document.querySelectorAll('#fruits-list > li').length === fruits.length
    );
    const items = [...document.querySelectorAll('#fruits-list > li')]
      .map((li) => li.textContent.trim());
    expect(items).to.deep.equal(fruits.map(String));
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JSONBin - Read</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 class="h4 mb-3">My fruits</h1>
      <ul id="fruits-list"></ul>
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
// Paste your bin ID and master key here. Both are required: the bin
// is private, so even GET requests need the master key.
window.JSONBIN_CONFIG = {
  binId: 'PASTE_YOUR_BIN_ID_HERE',
  masterKey: 'PASTE_YOUR_MASTER_KEY_HERE',
};

// Write your code below.
//
// Use axios + async/await to GET the bin's contents and render each
// fruit in the array as an <li> inside #fruits-list.
```

## Hints

- The endpoint is `https://api.jsonbin.io/v3/b/${binId}/latest`.
- Pass the master key in the request headers: `{ headers: { 'X-Master-Key': masterKey } }` as the second argument to `axios.get`.
- The fruits array lives at `response.data.record`, **not** `response.data` itself.
- After getting the array, use a `for...of` loop with `document.createElement('li')` to append each fruit.

# Solution

```javascript
window.JSONBIN_CONFIG = {
  binId: 'PASTE_YOUR_BIN_ID_HERE',
  masterKey: 'PASTE_YOUR_MASTER_KEY_HERE',
};

async function loadFruits() {
  const { binId, masterKey } = window.JSONBIN_CONFIG;
  const response = await axios.get(
    `https://api.jsonbin.io/v3/b/${binId}/latest`,
    { headers: { 'X-Master-Key': masterKey } }
  );
  const fruits = response.data.record;

  const list = document.querySelector('#fruits-list');
  for (const fruit of fruits) {
    const li = document.createElement('li');
    li.textContent = fruit;
    list.appendChild(li);
  }
}

loadFruits();
```

# Walkthrough

1. Fill in `window.JSONBIN_CONFIG.binId` and `window.JSONBIN_CONFIG.masterKey`.
2. Define an `async` function so you can use `await` on the axios call.
3. Build the URL using a template literal that includes the bin ID, and pass the master key as the `X-Master-Key` header.
4. After `await`, the response object has `data` — and the array you stored is at `response.data.record`.
5. Loop over that array with `for...of`. For each value, create a new `<li>`, set its `textContent`, and append it to `#fruits-list`.
6. Call the function once at the end of the script so the request fires on page load.
