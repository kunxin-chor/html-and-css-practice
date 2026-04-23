# Question

Bootstrap's grid has **12 units** in every row, and each column uses a class like `col-N` where `N` is how many of those 12 units the column takes up.

Inside the existing `<div class="container">`, create a Bootstrap **row** with **two columns**:

- The **left** column should take **25%** of the row's width.
- The **right** column should take **75%** of the row's width.

You'll need to figure out the correct `col-N` value for each column yourself — convert the percentages into a number of 12-unit pieces.

Requirements:

1. Add one `<div class="row">` inside the container.
2. A first column whose width equals 25% of the row, containing the text `Sidebar (25%)`.
3. A second column whose width equals 75% of the row, containing the text `Content (75%)`.
4. The two columns together should fill the entire row with no leftover space.

# Test Cases

```
describe('Bootstrap 25% / 75% split', () => {
  it('should have a .row inside the .container', () => {
    const row = document.querySelector('.container > .row');
    expect(row, 'Expected a <div class="row"> as a direct child of .container').to.exist;
  });

  it('the row should contain exactly two column children', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    expect(cols.length).to.equal(2);
  });

  it('the first column should be col-3 (25%)', () => {
    const row = document.querySelector('.container > .row');
    const first = row.querySelector(':scope > [class*="col-"]:nth-child(1)');
    expect(first).to.exist;
    expect(first.classList.contains('col-3'), `Expected "col-3", got: ${first.className}`).to.equal(true);
  });

  it('the second column should be col-9 (75%)', () => {
    const row = document.querySelector('.container > .row');
    const second = row.querySelector(':scope > [class*="col-"]:nth-child(2)');
    expect(second).to.exist;
    expect(second.classList.contains('col-9'), `Expected "col-9", got: ${second.className}`).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>25 / 75 Columns</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <!-- Add a .row with a 25% column and a 75% column here -->
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

- A Bootstrap row is split into **12 equal units**. Ask yourself: *how many of those 12 units equal 25%? How many equal 75%?*
- One way to work it out: `percentage / 100 * 12`. For example, 50% would be `50 / 100 * 12 = 6`, so 50% is `col-6`.
- Sanity check: the two numbers you pick should add up to **12** so the row is completely filled.
- A common real-world use of this layout is a **sidebar + main content** area.

# Solution

```html
<div class="container">
  <div class="row">
    <div class="col-3">Sidebar (25%)</div>
    <div class="col-9">Content (75%)</div>
  </div>
</div>
```

# Walkthrough

1. Inside `.container`, add `<div class="row">`.
2. Add a first child `<div class="col-3">` for the 25% sidebar.
3. Add a second child `<div class="col-9">` for the 75% content.
4. Confirm `3 + 9 = 12` so the two columns completely fill the row.
5. Save and run the tests.
