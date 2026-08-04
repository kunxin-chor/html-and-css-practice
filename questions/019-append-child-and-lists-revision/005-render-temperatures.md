# Question

You are given the following array of temperature readings in the starter JavaScript:

```javascript
const TEMPERATURES = [5, 32, 15, 8, 41, -3, 22, 38];
```

The page has an empty `<ul>` with `id="temp-list"`. When the page loads, each temperature should appear as an `<li>` inside that `<ul>`, in the same order as the array.

Colour rules:

- Temperatures **greater than 30** → **red**
- Temperatures **less than 10** → **blue**
- All other temperatures keep the default text colour

# Test Cases

```
describe('append child revision - render temperatures', () => {
  const isRed = (c) => {
    const v = c.replace(/\s+/g, '').toLowerCase();
    return v === 'red' || v === 'rgb(255,0,0)' || v === '#ff0000';
  };
  const isBlue = (c) => {
    const v = c.replace(/\s+/g, '').toLowerCase();
    return v === 'blue' || v === 'rgb(0,0,255)' || v === '#0000ff';
  };

  it('renders one <li> per temperature in order', () => {
    const items = [...document.querySelectorAll('#temp-list > li')].map((li) => li.textContent.trim());
    expect(items).to.deep.equal(['5', '32', '15', '8', '41', '-3', '22', '38']);
  });

  it('applies the correct colour based on value', () => {
    const lis = [...document.querySelectorAll('#temp-list > li')];
    lis.forEach((li) => {
      const n = Number(li.textContent.trim());
      const color = li.style.color || getComputedStyle(li).color;
      if (n > 30) {
        expect(isRed(color), `expected ${n} to be red, got ${color}`).to.equal(true);
      } else if (n < 10) {
        expect(isBlue(color), `expected ${n} to be blue, got ${color}`).to.equal(true);
      } else {
        expect(isRed(color) || isBlue(color), `expected ${n} to be neither red nor blue, got ${color}`).to.equal(false);
      }
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
    <title>Render Temperatures</title>
  </head>
  <body>
    <ul id="temp-list"></ul>
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
```

## JavaScript

```javascript
const TEMPERATURES = [5, 32, 15, 8, 41, -3, 22, 38];

// Write your code here
```

## Hints

- Start by rendering each temperature as an `<li>` in order.
- Use `if (n > 30) { ... } else if (n < 10) { ... }` so each list item gets at most one colour.
- Temperatures between 10 and 30 inclusive keep the default colour.

# Solution

```javascript
const TEMPERATURES = [5, 32, 15, 8, 41, -3, 22, 38];

const list = document.querySelector('#temp-list');
for (const n of TEMPERATURES) {
  const li = document.createElement('li');
  li.textContent = n;
  if (n > 30) {
    li.style.color = 'red';
  } else if (n < 10) {
    li.style.color = 'blue';
  }
  list.appendChild(li);
}
```

# Walkthrough

1. Get a reference to the `<ul id="temp-list">`.
2. Loop over the `TEMPERATURES` array.
3. For each temperature:
   - Create an `<li>` and set its `textContent` to the temperature.
   - First check if the temperature is greater than 30 → set `li.style.color = 'red'`.
   - Otherwise, check if it is less than 10 → set `li.style.color = 'blue'`.
   - Otherwise, leave the colour alone.
   - Append the `<li>` to the list.
4. Values from 10 to 30 fall into neither branch and keep the default colour.
