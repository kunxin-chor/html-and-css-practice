# Question

There is a JSON file at this URL:

```
https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/customer.json
```

Its shape:

```json
{
  "name": "Mary Sue",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345"
  },
  "phone": "555-1234"
}
```

The page already loads **Bootstrap** and **axios** from a CDN. It contains:

- An empty `<h1 id="name">` for the customer's name.
- An empty `<ul id="address-list">` for the address.

When the page loads, your code should fetch that URL using **axios** with **async/await** and:

1. Put the customer's `name` into `#name`.
2. Render each part of the address as its own `<li>` inside `#address-list`, in this order:
   - `street`
   - `city`
   - `state`
   - `zip`

# Test Cases

```
describe('axios - customer.json', () => {
  const waitFor = async (fn, ms = 4000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('Timed out waiting for condition');
  };

  it('shows the customer name in #name', async () => {
    await waitFor(() => document.querySelector('#name').textContent.includes('Mary Sue'));
    expect(document.querySelector('#name').textContent.trim()).to.equal('Mary Sue');
  });

  it('renders 4 address items in order in #address-list', async () => {
    await waitFor(() => document.querySelectorAll('#address-list > li').length >= 4);
    const items = [...document.querySelectorAll('#address-list > li')]
      .map((li) => li.textContent.trim());
    expect(items.length).to.equal(4);
    expect(items[0]).to.include('123 Main St');
    expect(items[1]).to.include('Anytown');
    expect(items[2]).to.include('CA');
    expect(items[3]).to.include('12345');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Customer Info</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 id="name" class="h4 mb-3"></h1>
      <h2 class="h6 text-muted">Address</h2>
      <ul id="address-list" class="list-group"></ul>
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
// Use axios + async/await to fetch the customer.json file from the
// URL above. Then update #name with the customer's name, and append
// one <li> per address part to #address-list.
```

## Hints

- `await axios.get(CUSTOMER_URL)` will give you an object whose `.data` is the parsed JSON (axios parses JSON automatically based on the response Content-Type).
- The address parts you need are the four properties of `data.address`. Put them into an array in the right order so you can loop over them.
- Create each list item with `document.createElement('li')`, set its `textContent`, and `appendChild` to `#address-list`.

# Solution

```javascript
const CUSTOMER_URL = 'https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/customer.json';

async function loadCustomer() {
  const { data } = await axios.get(CUSTOMER_URL);

  document.querySelector('#name').textContent = data.name;

  const list = document.querySelector('#address-list');
  const parts = [data.address.street, data.address.city, data.address.state, data.address.zip];
  for (const part of parts) {
    const li = document.createElement('li');
    li.textContent = part;
    list.appendChild(li);
  }
}

loadCustomer();
```

# Walkthrough

1. Declare an `async` function so you can use `await`.
2. `await axios.get(CUSTOMER_URL)` and destructure `data` from the response.
3. Set `#name`'s `textContent` to `data.name`.
4. Build an array `[street, city, state, zip]` from `data.address` so the order is fixed.
5. Loop over the array; for each value create an `<li>`, set its text, and append to `#address-list`.
6. Call the function once at the end of the script.
