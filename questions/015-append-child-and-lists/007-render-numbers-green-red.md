# Question

You are given the following array of numbers in the starter JavaScript:

```javascript
const NUMBERS = [50, 150, -20, 80, -5, 200, 0];
```

When the page loads, render every number as an `<li>` inside `<ul id="list">`, in the same order as the array.

Colour rules:

- Numbers **greater than 100** → **green**
- Numbers **less than 0** → **red**
- All other numbers keep the default text colour

# Test Cases

```
describe('append child - green over 100, red below 0', () => {
  const isGreen = (c) => {
    const v = c.replace(/\s+/g, '').toLowerCase();
    return v === 'green' || v === 'rgb(0,128,0)' || v === '#008000';
  };
  const isRed = (c) => {
    const v = c.replace(/\s+/g, '').toLowerCase();
    return v === 'red' || v === 'rgb(255,0,0)' || v === '#ff0000';
  };

  it('renders one <li> per number in order', () => {
    const items = [...document.querySelectorAll('#list > li')].map((li) => li.textContent.trim());
    expect(items).to.deep.equal(['50', '150', '-20', '80', '-5', '200', '0']);
  });

  it('applies the correct colour based on value', () => {
    const lis = [...document.querySelectorAll('#list > li')];
    lis.forEach((li) => {
      const n = Number(li.textContent.trim());
      const color = li.style.color || getComputedStyle(li).color;
      if (n > 100) {
        expect(isGreen(color), `expected ${n} to be green, got ${color}`).to.equal(true);
      } else if (n < 0) {
        expect(isRed(color), `expected ${n} to be red, got ${color}`).to.equal(true);
      } else {
        expect(isGreen(color) || isRed(color), `expected ${n} to be neither green nor red, got ${color}`).to.equal(false);
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
    <title>Green Red Numbers</title>
  </head>
  <body>
    <ul id="list"></ul>
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
const NUMBERS = [50, 150, -20, 80, -5, 200, 0];

// Write your code here
```

## Hints

- Start from the previous solution.
- Use `if (n > 100) { ... } else if (n < 0) { ... }` so each list item gets at most one colour.

# Solution

```javascript
const NUMBERS = [50, 150, -20, 80, -5, 200, 0];

const list = document.querySelector('#list');
for (const n of NUMBERS) {
  const li = document.createElement('li');
  li.textContent = n;
  if (n > 100) {
    li.style.color = 'green';
  } else if (n < 0) {
    li.style.color = 'red';
  }
  list.appendChild(li);
}
```

# Walkthrough

1. Same loop structure as before.
2. For each number, first check if it's greater than 100 → green.
3. Otherwise, check if it's less than 0 → red.
4. Otherwise, leave the colour alone.
5. Zero falls into neither branch and keeps the default colour.
