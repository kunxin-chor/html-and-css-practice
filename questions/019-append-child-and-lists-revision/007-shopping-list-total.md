# Question

The page has:

- A text input for an item name (`#item-input`)
- A text input for an item price (`#price-input`)
- An **Add** button (`#add-btn`)
- An empty `<ul>` (`#cart`) that will show all items added so far
- A `<div id="total">` that will show the running total

Start from an empty array `items = []` in your script. Each entry in the array should be an object with `name` and `price` properties, for example:

```javascript
{ name: 'Book', price: 12 }
```

When the user types a name and price and clicks **Add**:

1. A new object should be **pushed** into the `items` array.
2. A function named **`drawCart`** should be called to re-render the `<ul>` so that it shows one `<li>` per entry in the `items` array, in order. Each `<li>` should show the item name and price formatted as `Name - $XX.XX`.
3. The `#total` div should display the sum of every price currently in the array, in the format `Total: $XX.XX`.

Examples:

- Type `Book`, `12`, click Add → list shows `Book - $12.00`; total shows `Total: $12.00`.
- Type `Pen`, `1.5`, click Add → list shows `Book - $12.00`, `Pen - $1.50`; total shows `Total: $13.50`.

On page load (before any clicks) the list should be empty and the total should show `Total: $0.00`.

# Test Cases

```
describe('append child revision - shopping list total', () => {
  const itemInput = () => document.querySelector('#item-input');
  const priceInput = () => document.querySelector('#price-input');
  const add = () => document.querySelector('#add-btn').click();
  const items = () => [...document.querySelectorAll('#cart > li')].map((li) => li.textContent.trim());
  const total = () => document.querySelector('#total').textContent.trim();

  it('starts empty with a total of $0.00', () => {
    expect(items()).to.deep.equal([]);
    expect(total()).to.equal('Total: $0.00');
  });

  it('drawCart is a function', () => {
    expect(typeof window.drawCart).to.equal('function');
  });

  it('adding an item pushes it to the list and updates the total', () => {
    itemInput().value = 'Book';
    priceInput().value = '12';
    add();
    expect(items()).to.deep.equal(['Book - $12.00']);
    expect(total()).to.equal('Total: $12.00');
  });

  it('adds multiple items, keeping order and summing correctly', () => {
    itemInput().value = 'Pen';
    priceInput().value = '1.5';
    add();
    expect(items()).to.deep.equal(['Book - $12.00', 'Pen - $1.50']);
    expect(total()).to.equal('Total: $13.50');

    itemInput().value = 'Notebook';
    priceInput().value = '4.5';
    add();
    expect(items()).to.deep.equal(['Book - $12.00', 'Pen - $1.50', 'Notebook - $4.50']);
    expect(total()).to.equal('Total: $18.00');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Shopping List Total</title>
  </head>
  <body>
    <input id="item-input" type="text" placeholder="Item name">
    <input id="price-input" type="text" placeholder="Price">
    <button id="add-btn">Add</button>
    <ul id="cart"></ul>
    <div id="total">Total: $0.00</div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
body {
  font-family: sans-serif;
  padding: 20px;
}
input, button {
  font-size: 16px;
  padding: 5px 10px;
  margin-right: 5px;
}
#total {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}
```

## JavaScript

```javascript
const items = [];

// Write your code here.
//
// You need:
// - a drawCart function that renders `items` into #cart,
// - a click listener on #add-btn that pushes the new item object into
//   `items`, calls drawCart, and updates #total.
```

## Hints

- Push an object like `{ name: itemInput.value, price: Number(priceInput.value) }` into `items`.
- `drawCart` should clear `#cart` first (`cart.innerHTML = ''`) then append one `<li>` per item in the array, formatted as `item.name + ' - $' + item.price.toFixed(2)`.
- The total is the sum of all `item.price` values. Compute it with `items.reduce((sum, item) => sum + item.price, 0)` or a loop.
- Remember to update `#total` every time a new item is added, not just once on load.

# Solution

```javascript
const items = [];

function drawCart(cartItems) {
  const cart = document.querySelector('#cart');
  cart.innerHTML = '';
  for (const item of cartItems) {
    const li = document.createElement('li');
    li.textContent = item.name + ' - $' + item.price.toFixed(2);
    cart.appendChild(li);
  }
}

const itemInput = document.querySelector('#item-input');
const priceInput = document.querySelector('#price-input');
const totalDiv = document.querySelector('#total');

document.querySelector('#add-btn').addEventListener('click', () => {
  const name = itemInput.value;
  const price = Number(priceInput.value);
  items.push({ name, price });

  drawCart(items);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  totalDiv.textContent = 'Total: $' + total.toFixed(2);
});
```

# Walkthrough

1. Define the `items` array at the top.
2. Define `drawCart(cartItems)`: clear `#cart`, loop over `cartItems`, append one `<li>` per item showing the name and formatted price.
3. Get references to the name input, the price input, the Add button, and the total div.
4. In the button's `click` handler:
   - Read the item name and convert the price to a number.
   - Push an object `{ name, price }` into `items`.
   - Call `drawCart(items)` to refresh the list.
   - Compute the sum of prices with `reduce` and set `totalDiv.textContent = 'Total: $' + total.toFixed(2)`.
5. The starting HTML already shows `Total: $0.00`, which matches an empty array.
