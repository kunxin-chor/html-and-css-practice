# Question

The page already contains an empty `<table>` element. Fill it with **four rows** of **two columns** each.

The cell contents (row by row, left to right) must be:

- Row 1: `Monday`, `09:00`
- Row 2: `Tuesday`, `10:00`
- Row 3: `Wednesday`, `11:00`
- Row 4: `Thursday`, `12:00`

No header cells are required — use ordinary data cells only.

# Answer

Add four `<tr>` elements inside the existing `<table>`, each with two `<td>` cells.

# Test Cases

```
describe('Rows', () => {
  it('the table should contain exactly four <tr> rows', () => {
    expect(document.querySelectorAll('table tr').length).to.equal(4);
  });
});
```

```
describe('Columns', () => {
  it('each row should contain exactly two <td> cells', () => {
    document.querySelectorAll('table tr').forEach(row => {
      expect(row.querySelectorAll('td').length).to.equal(2);
    });
  });

  it('no <th> cells should be used', () => {
    expect(document.querySelectorAll('table th').length).to.equal(0);
  });
});
```

```
describe('Cell contents', () => {
  const expected = [
    ['Monday', '09:00'],
    ['Tuesday', '10:00'],
    ['Wednesday', '11:00'],
    ['Thursday', '12:00'],
  ];
  expected.forEach((row, i) => {
    it('row ' + (i + 1) + ' should contain ' + row.join(', '), () => {
      const cells = document.querySelectorAll('table tr')[i].querySelectorAll('td');
      const values = Array.from(cells).map(c => c.textContent.trim());
      expect(values).to.deep.equal(row);
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
    <title>Weekly Plan</title>
  </head>
  <body>
    <h1>Weekly Plan</h1>
    <table border="1">
      <!-- Add four rows of two columns here -->
    </table>
  </body>
</html>
```

## CSS

```css
```

## Hints

- One `<tr>` per horizontal row; one `<td>` per column inside a row.
- A 4×2 table has four `<tr>` elements, each holding two `<td>` elements.
- Times like `09:00` are plain text — no special tag needed.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Weekly Plan</title>
  </head>
  <body>
    <h1>Weekly Plan</h1>
    <table border="1">
      <tr>
        <td>Monday</td>
        <td>09:00</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>10:00</td>
      </tr>
      <tr>
        <td>Wednesday</td>
        <td>11:00</td>
      </tr>
      <tr>
        <td>Thursday</td>
        <td>12:00</td>
      </tr>
    </table>
  </body>
</html>
```

# Walkthrough

1. Replace the comment inside `<table>` with the first row:
   - Pseudocode: `<tr><td>Monday</td><td>09:00</td></tr>`
2. Repeat for Tuesday, Wednesday, and Thursday with their matching times.
3. Save and refresh — you should see a 4×2 grid with borders.
