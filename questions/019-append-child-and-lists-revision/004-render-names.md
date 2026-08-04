# Question

You are given the following array of names in the starter JavaScript:

```javascript
const NAMES = ['Alice', 'Bob', 'Anna', 'Charlie', 'Amanda', 'David'];
```

The page has an empty `<ul>` with `id="name-list"`. When the page loads, each name in the array should appear as an `<li>` inside that `<ul>`, in the same order as the array.

Names that start with the letter **A** (uppercase or lowercase) should be shown in **bold**.

Use `document.createElement`, `appendChild`, and a loop to build the list.

# Test Cases

```
describe('append child revision - render names', () => {
  const isBold = (weight) => {
    return weight === '700' || weight === 'bold' || weight === '800' || weight === '900';
  };

  it('renders one <li> per name in order', () => {
    const items = [...document.querySelectorAll('#name-list > li')].map((li) => li.textContent.trim());
    expect(items).to.deep.equal(['Alice', 'Bob', 'Anna', 'Charlie', 'Amanda', 'David']);
  });

  it('makes names starting with A bold', () => {
    const lis = [...document.querySelectorAll('#name-list > li')];
    lis.forEach((li) => {
      const name = li.textContent.trim();
      const weight = li.style.fontWeight || getComputedStyle(li).fontWeight;
      if (name[0].toUpperCase() === 'A') {
        expect(isBold(weight), `expected ${name} to be bold, got ${weight}`).to.equal(true);
      } else {
        expect(isBold(weight), `expected ${name} not to be bold, got ${weight}`).to.equal(false);
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
    <title>Render Names</title>
  </head>
  <body>
    <ul id="name-list"></ul>
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
const NAMES = ['Alice', 'Bob', 'Anna', 'Charlie', 'Amanda', 'David'];

// Write your code here
```

## Hints

- Grab the `#name-list` element first.
- Loop over the `NAMES` array. For each name, create an `<li>`, set its `textContent`, and append it to the `<ul>`.
- Check the first character of the name with `name[0].toUpperCase() === 'A'` and set `li.style.fontWeight = 'bold'` if it matches.

# Solution

```javascript
const NAMES = ['Alice', 'Bob', 'Anna', 'Charlie', 'Amanda', 'David'];

const list = document.querySelector('#name-list');
for (const name of NAMES) {
  const li = document.createElement('li');
  li.textContent = name;
  if (name[0].toUpperCase() === 'A') {
    li.style.fontWeight = 'bold';
  }
  list.appendChild(li);
}
```

# Walkthrough

1. Get a reference to the `<ul id="name-list">`.
2. Loop over the `NAMES` array with `for...of`.
3. Each iteration:
   - Create a new `<li>`.
   - Set its `textContent` to the current name.
   - Check whether the first letter of the name is `A` (case-insensitive).
   - If it is, set `li.style.fontWeight = 'bold'`.
   - Append the `<li>` to the list.
4. When the script finishes, the list has one `<li>` per name in order, with A-names bold.
