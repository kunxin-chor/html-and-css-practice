# Question

The page already loads Bootstrap 5 CSS and has an empty container `<div class="row" id="product-row">`.

You are given the following array of product objects in the starter JavaScript:

```javascript
const PRODUCTS = [
  { name: 'Apple', price: 1.50, description: 'A crunchy red fruit' },
  { name: 'Banana', price: 0.80, description: 'A yellow curved fruit' },
  { name: 'Cherry', price: 2.00, description: 'A small red stone fruit' },
];
```

When the page loads, render each product as a Bootstrap card inside a column. Each card should use the Bootstrap classes `col-md-4` for the wrapper, `card`, `card-body`, `card-title`, `card-subtitle`, and `card-text`.

Use `document.createElement`, `appendChild`, and nested loops/structures to build the cards.

# Test Cases

```
describe('append child - bootstrap cards', () => {
  it('renders one card per product', () => {
    const cards = document.querySelectorAll('#product-row .card');
    expect(cards.length).to.equal(3);
  });

  it('renders one card-title per product with the product name', () => {
    const titles = [...document.querySelectorAll('#product-row .card-title')]
      .map((h) => h.textContent.trim());
    expect(titles).to.deep.equal(['Apple', 'Banana', 'Cherry']);
  });

  it('renders one card-subtitle per product with the price', () => {
    const subtitles = [...document.querySelectorAll('#product-row .card-subtitle')]
      .map((h) => h.textContent.trim());
    expect(subtitles).to.include.members(['$1.50', '$0.80', '$2.00']);
  });

  it('renders card-text with the descriptions', () => {
    const texts = [...document.querySelectorAll('#product-row .card-text')]
      .map((p) => p.textContent.trim());
    expect(texts).to.include.members([
      'A crunchy red fruit',
      'A yellow curved fruit',
      'A small red stone fruit',
    ]);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Cards</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container mt-4">
      <div class="row" id="product-row"></div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* No custom CSS needed for this question. */
```

## JavaScript

```javascript
const PRODUCTS = [
  { name: 'Apple', price: 1.50, description: 'A crunchy red fruit' },
  { name: 'Banana', price: 0.80, description: 'A yellow curved fruit' },
  { name: 'Cherry', price: 2.00, description: 'A small red stone fruit' },
];

// Write your code here
```

## Hints

- For each product, create a column wrapper `<div class="col-md-4">` first.
- Inside the column, create the `<div class="card">`, then `<div class="card-body">`.
- Inside the card body, create the title, subtitle, and text elements with their Bootstrap classes.
- Use `.appendChild` to build the hierarchy from the inside out.

# Solution

```javascript
const PRODUCTS = [
  { name: 'Apple', price: 1.50, description: 'A crunchy red fruit' },
  { name: 'Banana', price: 0.80, description: 'A yellow curved fruit' },
  { name: 'Cherry', price: 2.00, description: 'A small red stone fruit' },
];

const row = document.querySelector('#product-row');
for (const product of PRODUCTS) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-3';

  const card = document.createElement('div');
  card.className = 'card';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = product.name;

  const subtitle = document.createElement('h6');
  subtitle.className = 'card-subtitle mb-2 text-muted';
  subtitle.textContent = '$' + product.price.toFixed(2);

  const text = document.createElement('p');
  text.className = 'card-text';
  text.textContent = product.description;

  body.appendChild(title);
  body.appendChild(subtitle);
  body.appendChild(text);
  card.appendChild(body);
  col.appendChild(card);
  row.appendChild(col);
}
```

# Walkthrough

1. Get a reference to the `<div class="row" id="product-row">`.
2. Loop over the `PRODUCTS` array.
3. For each product:
   - Create a column wrapper with `className = 'col-md-4 mb-3'`.
   - Create a card element with `className = 'card'`.
   - Create a card body with `className = 'card-body'`.
   - Create the title (`h5`, `card-title`), subtitle (`h6`, `card-subtitle mb-2 text-muted`), and text (`p`, `card-text`).
   - Set the content of each element from the product object.
   - Assemble the hierarchy: body → title, subtitle, text; card → body; column → card; row → column.
4. When the script finishes, the row contains three Bootstrap cards side-by-side on medium screens and larger.
