# Question

Let's combine what you've learned. A common layout is **two narrow sidebars with a wide content area in the middle**.

Inside the existing `<div class="container">`, create a Bootstrap **row** with **three columns**:

- The **left** column should take **25%** of the row.
- The **right** column should take **25%** of the row.
- The **middle** column should take the **remaining width** so the three columns together fill the row exactly.

You'll need to figure out the correct `col-N` value for each column yourself — remember a Bootstrap row is always 12 units wide.

Requirements:

1. Add one `<div class="row">` inside the container.
2. A first column whose width equals 25% of the row, containing the text `Left (25%)`.
3. A middle column that fills the remaining width, containing text describing it (e.g. `Middle (50%)`).
4. A third column whose width equals 25% of the row, containing the text `Right (25%)`.
5. The three columns together should fill the row exactly (they must add up to 12 units).

# Test Cases

```
describe('Bootstrap 25% / 50% / 25% three-column layout', () => {
  it('should have a .row inside the .container', () => {
    const row = document.querySelector('.container > .row');
    expect(row, 'Expected a <div class="row"> as a direct child of .container').to.exist;
  });

  it('the row should contain exactly three column children', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    expect(cols.length).to.equal(3);
  });

  it('the first column should be col-3 (25%)', () => {
    const row = document.querySelector('.container > .row');
    const first = row.querySelector(':scope > [class*="col-"]:nth-child(1)');
    expect(first).to.exist;
    expect(first.classList.contains('col-3'), `Expected first column "col-3", got: ${first.className}`).to.equal(true);
  });

  it('the middle column should be col-6 (the remaining 50%)', () => {
    const row = document.querySelector('.container > .row');
    const middle = row.querySelector(':scope > [class*="col-"]:nth-child(2)');
    expect(middle).to.exist;
    expect(middle.classList.contains('col-6'), `Expected middle column "col-6", got: ${middle.className}`).to.equal(true);
  });

  it('the third column should be col-3 (25%)', () => {
    const row = document.querySelector('.container > .row');
    const third = row.querySelector(':scope > [class*="col-"]:nth-child(3)');
    expect(third).to.exist;
    expect(third.classList.contains('col-3'), `Expected third column "col-3", got: ${third.className}`).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sidebar + Content + Sidebar</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <!-- Add a .row with three columns (25% / middle / 25%) here -->
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

- Start by converting each 25% side column into a number of 12-unit pieces. (Hint: `25 / 100 * 12 = ?`)
- Then subtract the two side columns from 12 to find out how many units are left for the middle.
- Sanity check: your three `col-N` numbers must add up to exactly **12** for the row to be completely filled with no leftover space.
- The order of the columns in the HTML matches their left-to-right visual order.

# Solution

```html
<div class="container">
  <div class="row">
    <div class="col-3">Left (25%)</div>
    <div class="col-6">Middle (50%)</div>
    <div class="col-3">Right (25%)</div>
  </div>
</div>
```

# Walkthrough

1. Inside `.container`, add `<div class="row">`.
2. Add three child `<div>` elements in this order: left, middle, right.
3. Work out how many of the 12 units equal 25%, and give both the left and right columns that `col-N` class.
4. Subtract the two side columns from 12 to get the middle column's unit count, and give the middle column that `col-N` class.
5. Add identifying text in each column so the layout is easy to see.
6. Save and run the tests. You should see a narrow-wide-narrow three-column layout filling the container.
