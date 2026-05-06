# Question

You are given the following array of numbers in the starter JavaScript:

```javascript
const NUMBERS = [50, 150, 80, 200, 99, 101];
```

When the page loads, render every number as an `<li>` inside `<ul id="list">`, in the same order as the array.

**Numbers greater than 100** should be shown in **green**. All other numbers keep the default text colour.

# Test Cases

```
describe('append child - green over 100', () => {
  const isGreen = (color) => {
    const c = color.replace(/\s+/g, '').toLowerCase();
    return c === 'green' || c === 'rgb(0,128,0)' || c === '#008000';
  };

  it('renders one <li> per number in order', () => {
    const items = [...document.querySelectorAll('#list > li')].map((li) => li.textContent.trim());
    expect(items).to.deep.equal(['50', '150', '80', '200', '99', '101']);
  });

  it('numbers greater than 100 are green', () => {
    const lis = [...document.querySelectorAll('#list > li')];
    lis.forEach((li) => {
      const n = Number(li.textContent.trim());
      const color = li.style.color || getComputedStyle(li).color;
      if (n > 100) {
        expect(isGreen(color), `expected ${n} to be green, got ${color}`).to.equal(true);
      } else {
        expect(isGreen(color), `expected ${n} NOT to be green, got ${color}`).to.equal(false);
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
    <title>Green Over 100</title>
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
const NUMBERS = [50, 150, 80, 200, 99, 101];

// Write your code here
```

## Hints

- Start from the previous question's solution.
- Inside the loop, after creating the `<li>`, check `if (n > 100)` and set `li.style.color = 'green'`.

# Solution

```javascript
const NUMBERS = [50, 150, 80, 200, 99, 101];

const list = document.querySelector('#list');
for (const n of NUMBERS) {
  const li = document.createElement('li');
  li.textContent = n;
  if (n > 100) {
    li.style.color = 'green';
  }
  list.appendChild(li);
}
```

# Walkthrough

1. Same as the previous question: loop over `NUMBERS`, create an `<li>` for each, set its text, append it.
2. Before appending (or right after creating it), check if the number is greater than 100.
3. If yes, set `li.style.color = 'green'`.
4. Numbers that don't match keep the default text colour.
