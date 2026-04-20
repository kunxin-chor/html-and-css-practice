# Question

The page already contains an empty `<table>` element. Your job is to fill it with **two rows**, each containing **three columns** of data.

The cell contents (row by row, left to right) must be:

- Row 1: `A`, `B`, `C`
- Row 2: `D`, `E`, `F`

No header cells are required for this question — use ordinary data cells only.

# Answer

Add two `<tr>` elements inside the existing `<table>`, each containing three `<td>` cells with the values shown above.

# Test Cases

```
describe('Rows', () => {
  it('the table should contain exactly two <tr> rows', () => {
    expect(document.querySelectorAll('table tr').length).to.equal(2);
  });
});
```

```
describe('Columns', () => {
  it('each row should contain exactly three <td> cells', () => {
    const rows = document.querySelectorAll('table tr');
    rows.forEach(row => {
      expect(row.querySelectorAll('td').length).to.equal(3);
    });
  });

  it('no <th> cells should be used', () => {
    expect(document.querySelectorAll('table th').length).to.equal(0);
  });
});
```

```
describe('Cell contents', () => {
  it('row 1 should contain A, B, C', () => {
    const cells = document.querySelectorAll('table tr')[0].querySelectorAll('td');
    const values = Array.from(cells).map(c => c.textContent.trim());
    expect(values).to.deep.equal(['A', 'B', 'C']);
  });

  it('row 2 should contain D, E, F', () => {
    const cells = document.querySelectorAll('table tr')[1].querySelectorAll('td');
    const values = Array.from(cells).map(c => c.textContent.trim());
    expect(values).to.deep.equal(['D', 'E', 'F']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Rows and Columns</title>
  </head>
  <body>
    <h1>Rows and Columns</h1>
    <table border="1">
      <!-- Add two rows of three columns here -->
    </table>
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<tr>` = **t**able **r**ow. One `<tr>` per horizontal row of the table.
- `<td>` = **t**able **d**ata cell. One `<td>` per column.
- A 2×3 table therefore has two `<tr>` elements, each holding three `<td>` elements.
- You do **not** need a `<thead>`, `<tbody>`, or any `<th>` for this question.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Rows and Columns</title>
  </head>
  <body>
    <h1>Rows and Columns</h1>
    <table border="1">
      <tr>
        <td>A</td>
        <td>B</td>
        <td>C</td>
      </tr>
      <tr>
        <td>D</td>
        <td>E</td>
        <td>F</td>
      </tr>
    </table>
  </body>
</html>
```

# Walkthrough

1. Find the empty `<table>` element and the `<!-- Add two rows of three columns here -->` comment.
2. Remove the comment and, in its place, add the first row:
   - Pseudocode: `<tr><td>A</td><td>B</td><td>C</td></tr>`
3. Below that, add the second row the same way, but with `D`, `E`, `F`.
4. Save and refresh the preview. You should see a 2×3 grid with borders.
5. Run the tests to confirm you have 2 rows × 3 columns with the correct values.
