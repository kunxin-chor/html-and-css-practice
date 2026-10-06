# Question

Create a parcel delivery summary from nested JSON objects. Set `#tracking` to the tracking code and `#recipient` to the recipient name. In `#items`, render exactly two address items: `Unit <unit>, <street>` and `Singapore <postalCode>`. Set `#summary` to `<day>: <start> - <end>` using the delivery object.

Fetch `/async-revision/parcel.json` using **axios** with **async/await** when the page loads. Read the fetched data to produce your output; do not hard-code the results. Bootstrap and axios are already loaded. The file is supplied by this practice app and contains:

```json
{
  "trackingCode": "PK-2048",
  "recipient": {
    "name": "Nadia Lim",
    "address": {
      "unit": "08-12",
      "street": "25 Orchard Lane",
      "postalCode": "238800"
    }
  },
  "delivery": {
    "day": "Friday",
    "start": "14:00",
    "end": "16:00"
  }
}
```

Preserve source order in every list, including after filtering. Use traditional `for` loops (or `for...of` with `let`) rather than `map`, `reduce`, `forEach`, or `filter`. Build list items using `document.createElement`, `textContent`, and `appendChild`.

# Test Cases

```javascript
describe('Parcel Delivery Summary', () => {
  const texts = selector => [...document.querySelectorAll(selector)].map(el => el.textContent.trim());
  const waitFor = async predicate => {
    const start = Date.now();
    while (Date.now() - start < 4000) {
      if (predicate()) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error('Timed out waiting for loaded data');
  };
  it("shows tracking code", async () => {
    await waitFor(() => texts("#tracking").length >= 1 && texts("#tracking").every(text => text !== ''));
    expect(texts("#tracking")).to.deep.equal(["PK-2048"]);
  });
  it("shows recipient name", async () => {
    await waitFor(() => texts("#recipient").length >= 1 && texts("#recipient").every(text => text !== ''));
    expect(texts("#recipient")).to.deep.equal(["Nadia Lim"]);
  });
  it("combines address fields", async () => {
    await waitFor(() => texts("#items > li").length >= 2 && texts("#items > li").every(text => text !== ''));
    expect(texts("#items > li")).to.deep.equal(["Unit 08-12, 25 Orchard Lane","Singapore 238800"]);
  });
  it("formats delivery window", async () => {
    await waitFor(() => texts("#summary").length >= 1 && texts("#summary").every(text => text !== ''));
    expect(texts("#summary")).to.deep.equal(["Friday: 14:00 - 16:00"]);
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
    <title>Parcel Delivery Summary</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <main class="container py-4">
      <h1 id="tracking"></h1><p id="recipient"></p><ul id="items"></ul><p id="summary"></p>
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
const DATA_URL = '/async-revision/parcel.json';

// Write an async loading function, then call it.
```

## Hints

- The address is at response.data.recipient.address.
- Use template literals to combine properties into the required lines.

# Solution

```javascript
const DATA_URL = '/async-revision/parcel.json';

function appendItem(selector, text) {
  const item = document.createElement('li');
  item.textContent = text;
  document.querySelector(selector).appendChild(item);
}

async function loadData() {
  const { data: parcel } = await axios.get(DATA_URL);
  document.querySelector('#tracking').textContent = parcel.trackingCode;
  document.querySelector('#recipient').textContent = parcel.recipient.name;
  const address = parcel.recipient.address;
  appendItem('#items', `Unit ${address.unit}, ${address.street}`);
  appendItem('#items', `Singapore ${address.postalCode}`);
  const delivery = parcel.delivery;
  document.querySelector('#summary').textContent = `${delivery.day}: ${delivery.start} - ${delivery.end}`;
}

loadData();
```

# Walkthrough

1. Await the response and access its data object.
2. Read the tracking code and nested recipient name.
3. Combine address properties into two list items.
4. Format the delivery window and call the loader.

# Data Files

/async-revision/parcel.json
