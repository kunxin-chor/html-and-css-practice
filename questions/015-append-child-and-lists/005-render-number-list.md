# Question

You are given the following array of numbers in the starter JavaScript:

```javascript
const NUMBERS = [10, 25, 50, 75, 90];
```

The page has an empty `<ul>` with `id="list"`. When the page loads, each number in the array should appear as an `<li>` inside that `<ul>`, in the same order as the array.

Use `document.createElement`, `appendChild`, and a `for...of` loop to build the list.

# Test Cases

```
describe('append child - basic number list', () => {
  it('renders one <li> per number in the array, in order', () => {
    const items = [...document.querySelectorAll('#list > li')].map((li) => li.textContent.trim());
    expect(items).to.deep.equal(['10', '25', '50', '75', '90']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Number List</title>
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
const NUMBERS = [10, 25, 50, 75, 90];

// Write your code here
```

## Hints

- Grab the `#list` element first.
- Use `for (const n of NUMBERS) { ... }` to iterate.
- For each number: create an `<li>`, set its `textContent` to the number, and append it to the `<ul>`.

# Solution

```javascript
const NUMBERS = [10, 25, 50, 75, 90];

const list = document.querySelector('#list');
for (const n of NUMBERS) {
  const li = document.createElement('li');
  li.textContent = n;
  list.appendChild(li);
}
```

# Walkthrough

1. Get a reference to the `<ul id="list">`.
2. Loop over the `NUMBERS` array with `for...of`.
3. Each iteration: create a new `<li>`, set its `textContent` to the current number, append it to the list.
4. When the script finishes running, the list has one `<li>` per array entry in order.
