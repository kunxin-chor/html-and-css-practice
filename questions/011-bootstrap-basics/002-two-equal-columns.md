# Question

Bootstrap's grid is built on **rows** and **columns**. A row (`<div class="row">`) holds up to 12 column units on each line, and each column uses a class like `col-6` to declare how many of those 12 units it occupies.

Inside the existing `<div class="container">`, create a Bootstrap **row** that contains **two columns of equal width**. Each column should take up half of the row.

Requirements:

1. Add one `<div class="row">` inside the container.
2. Inside that row, add **two** child `<div>` elements, each a Bootstrap column that takes up **6 of 12 units** (so they are equal width).
3. Put the text `Left` inside the first column and `Right` inside the second column so the structure is easy to see.

# Test Cases

```
describe('Two equal-width Bootstrap columns', () => {
  it('should have a .row inside the .container', () => {
    const row = document.querySelector('.container > .row');
    expect(row, 'Expected a <div class="row"> as a direct child of .container').to.exist;
  });

  it('the row should contain exactly two column children', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    expect(cols.length).to.equal(2);
  });

  it('both columns should be col-6 (equal width)', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    cols.forEach((c) => {
      expect(c.classList.contains('col-6'), `Expected column to have class "col-6", got: ${c.className}`).to.equal(true);
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
    <title>Two Equal Columns</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <!-- Add a .row with two equal-width columns here -->
    </div>
  </body>
</html>
```

## CSS

```css
/* Optional: add borders so you can see the columns */
.row > [class*="col-"] {
  border: 1px solid #ced4da;
  padding: 12px;
}
```

## Hints

- A Bootstrap row = `<div class="row">`.
- The grid has 12 units per row. Two equal columns means each takes **12 / 2 = 6** units → `col-6`.
- Columns must be **direct children** of the row.

# Solution

```html
<div class="container">
  <div class="row">
    <div class="col-6">Left</div>
    <div class="col-6">Right</div>
  </div>
</div>
```

# Walkthrough

1. Inside `.container`, add a new `<div class="row">`.
2. Inside that row, add two `<div>` elements.
3. Give each of the two inner `<div>`s the class `col-6` so they split the 12-unit row evenly.
4. Add some text like `Left` and `Right` so you can see the layout.
5. Save and run the tests. The two columns should sit side-by-side, each taking half the container's width.
