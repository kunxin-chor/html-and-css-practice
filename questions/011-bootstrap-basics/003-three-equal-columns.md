# Question

Inside the existing `<div class="container">`, create a Bootstrap **row** that contains **three columns of equal width**.

Requirements:

1. Add one `<div class="row">` inside the container.
2. Inside that row, add **three** child `<div>` elements, each a Bootstrap column that takes up **4 of 12 units** (so all three are equal width).
3. Put the text `One`, `Two`, and `Three` in the three columns in order.

# Test Cases

```
describe('Three equal-width Bootstrap columns', () => {
  it('should have a .row inside the .container', () => {
    const row = document.querySelector('.container > .row');
    expect(row, 'Expected a <div class="row"> as a direct child of .container').to.exist;
  });

  it('the row should contain exactly three column children', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    expect(cols.length).to.equal(3);
  });

  it('each column should be col-4 (equal width, 12 / 3 = 4)', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    cols.forEach((c) => {
      expect(c.classList.contains('col-4'), `Expected column to have class "col-4", got: ${c.className}`).to.equal(true);
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
    <title>Three Equal Columns</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <!-- Add a .row with three equal-width columns here -->
    </div>
  </body>
</html>
```

## CSS

```css
.row > [class*="col-"] {
  border: 1px solid #ced4da;
  padding: 12px;
}
```

## Hints

- 12 units divided evenly by 3 columns = **4 units each** → use `col-4` three times.
- The three `col-4` columns must all be direct children of the same `<div class="row">`.

# Solution

```html
<div class="container">
  <div class="row">
    <div class="col-4">One</div>
    <div class="col-4">Two</div>
    <div class="col-4">Three</div>
  </div>
</div>
```

# Walkthrough

1. Inside `.container`, add `<div class="row">`.
2. Inside that row, add three `<div>` elements.
3. Give each of them the class `col-4`.
4. Add text `One`, `Two`, `Three` so the columns are visible.
5. Save and run the tests. The three columns should sit side-by-side, each one third of the container's width.
