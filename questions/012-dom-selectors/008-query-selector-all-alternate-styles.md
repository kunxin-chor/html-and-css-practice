# Question

The page contains a table with several rows. Write JavaScript that gives the table a **zebra-stripe** effect using inline styles:

- Rows at positions **0, 2, 4, ...** (even indexes) should have a `lightgray` background.
- Rows at positions **1, 3, 5, ...** (odd indexes) should have a `white` background.

The effect should be applied via JavaScript, not CSS.

# Test Cases

```
describe('querySelectorAll - alternating styles', () => {
  it('should set even rows to lightgray and odd rows to white', () => {
    const rows = document.querySelectorAll('tr');
    expect(rows.length).to.be.at.least(4);
    rows.forEach((row, i) => {
      const bg = row.style.backgroundColor;
      if (i % 2 === 0) {
        expect(/lightgray|rgb\(\s*211\s*,\s*211\s*,\s*211\s*\)/i.test(bg)).to.equal(true);
      } else {
        expect(/white|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)/i.test(bg)).to.equal(true);
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
    <title>Alternating rows</title>
  </head>
  <body>
    <table>
      <tr><td>Row 1</td></tr>
      <tr><td>Row 2</td></tr>
      <tr><td>Row 3</td></tr>
      <tr><td>Row 4</td></tr>
    </table>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
table {
  border-collapse: collapse;
  width: 100%;
}
td {
  padding: 8px;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- When looping through a collection, you often have access to the index of the current element.
- The modulo operator (`%`) is useful for distinguishing even from odd numbers.

# Solution

```javascript
const rows = document.querySelectorAll('tr');
rows.forEach((row, i) => {
  row.style.backgroundColor = i % 2 === 0 ? 'lightgray' : 'white';
});
```

# Walkthrough

1. Select all rows with `document.querySelectorAll('tr')`.
2. Iterate using `forEach` with index: `(row, i) => {...}`.
3. Use a ternary: set `lightgray` when `i % 2 === 0`, `white` otherwise.
4. The table now displays striped rows.
