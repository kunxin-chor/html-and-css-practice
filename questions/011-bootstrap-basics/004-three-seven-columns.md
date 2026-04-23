# Question

A Bootstrap row is **12 units** wide in total. When your columns add up to exactly 12, they fill the row completely with no leftover space on the right.

Inside the existing `<div class="container">`, create a Bootstrap **row** with **three columns**:

- The **left** column should take **3 units**.
- The **middle** column should take **7 units**.
- The **right** column should fill whatever is **left over** so the three columns together fill the row exactly.

The width of the right column is **not given to you** — you need to work it out from the row's total of 12 units and the two columns you already know.

Requirements:

1. Add one `<div class="row">` inside the container.
2. First column: `col-3` with the text `Left (3)`.
3. Second column: `col-7` with the text `Middle (7)`.
4. Third column: the correct `col-N` so that the three columns add up to **exactly 12 units**, with the text `Right`.

# Test Cases

```
describe('Bootstrap columns: 3 + 7 + (remainder)', () => {
  it('should have a .row inside the .container', () => {
    const row = document.querySelector('.container > .row');
    expect(row, 'Expected a <div class="row"> as a direct child of .container').to.exist;
  });

  it('the row should contain exactly three column children', () => {
    const row = document.querySelector('.container > .row');
    const cols = row.querySelectorAll(':scope > [class*="col-"]');
    expect(cols.length).to.equal(3);
  });

  it('the first column should be col-3', () => {
    const row = document.querySelector('.container > .row');
    const first = row.querySelector(':scope > [class*="col-"]:nth-child(1)');
    expect(first, 'Expected a first column child').to.exist;
    expect(first.classList.contains('col-3'), `Expected first column class "col-3", got: ${first.className}`).to.equal(true);
  });

  it('the middle column should be col-7', () => {
    const row = document.querySelector('.container > .row');
    const middle = row.querySelector(':scope > [class*="col-"]:nth-child(2)');
    expect(middle, 'Expected a middle column child').to.exist;
    expect(middle.classList.contains('col-7'), `Expected middle column class "col-7", got: ${middle.className}`).to.equal(true);
  });

  it('the third column should fill the remaining units so the row sums to 12', () => {
    const row = document.querySelector('.container > .row');
    const third = row.querySelector(':scope > [class*="col-"]:nth-child(3)');
    expect(third, 'Expected a third column child').to.exist;
    expect(third.classList.contains('col-2'), `Expected third column class "col-2" (12 - 3 - 7 = 2), got: ${third.className}`).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>3 + 7 + ? Columns</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <!-- Add a .row with three columns: 3 units, 7 units, and the remainder -->
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

- The number in `col-N` is the number of **12ths** the column occupies.
- A row has 12 units total. If two of the three columns use 3 and 7 units, how many units are left for the third?
- Sanity check: all three `col-N` numbers should add up to exactly **12**.

# Solution

```html
<div class="container">
  <div class="row">
    <div class="col-3">Left (3)</div>
    <div class="col-7">Middle (7)</div>
    <div class="col-2">Right</div>
  </div>
</div>
```

# Walkthrough

1. Inside `.container`, add `<div class="row">`.
2. Add a first child `<div class="col-3">` with text `Left (3)`.
3. Add a second child `<div class="col-7">` with text `Middle (7)`.
4. Work out how many units are left: the row totals 12 units and you've used 3 + 7 = 10, so the third column needs `12 - 10 = 2` units.
5. Add a third child with the corresponding `col-N` class and the text `Right`.
6. Save and run the tests. The three columns should together fill the row exactly.
