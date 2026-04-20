# Question

Build a small HTML table that lists two people and their ages.

Requirements:

1. Use a `<table>` element.
2. Inside it, include a `<thead>` with one row containing two header cells (`<th>`): `Name` and `Age`.
3. Include a `<tbody>` with exactly two data rows (`<tr>`), each containing two `<td>` cells:
   - Row 1: `Alice` / `30`
   - Row 2: `Bob` / `25`

# Answer

Use `<table>` with a `<thead>` for the header row and a `<tbody>` containing the two data rows.

# Test Cases

```
describe('Table structure', () => {
  it('should contain exactly one <table>', () => {
    expect(document.querySelectorAll('table').length).to.equal(1);
  });

  it('the table should have a <thead> and a <tbody>', () => {
    expect(document.querySelectorAll('table > thead').length).to.equal(1);
    expect(document.querySelectorAll('table > tbody').length).to.equal(1);
  });
});
```

```
describe('Header row', () => {
  it('the <thead> should contain one row with two <th> cells "Name" and "Age"', () => {
    const headerRows = document.querySelectorAll('thead > tr');
    expect(headerRows.length).to.equal(1);
    const ths = headerRows[0].querySelectorAll('th');
    expect(ths.length).to.equal(2);
    expect(ths[0].textContent.trim()).to.equal('Name');
    expect(ths[1].textContent.trim()).to.equal('Age');
  });
});
```

```
describe('Body rows', () => {
  it('the <tbody> should contain exactly two data rows', () => {
    const bodyRows = document.querySelectorAll('tbody > tr');
    expect(bodyRows.length).to.equal(2);
  });

  it('the first data row should be Alice / 30', () => {
    const cells = document.querySelectorAll('tbody > tr')[0].querySelectorAll('td');
    expect(cells.length).to.equal(2);
    expect(cells[0].textContent.trim()).to.equal('Alice');
    expect(cells[1].textContent.trim()).to.equal('30');
  });

  it('the second data row should be Bob / 25', () => {
    const cells = document.querySelectorAll('tbody > tr')[1].querySelectorAll('td');
    expect(cells.length).to.equal(2);
    expect(cells[0].textContent.trim()).to.equal('Bob');
    expect(cells[1].textContent.trim()).to.equal('25');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>People</title>
  </head>
  <body>
    <h1>People</h1>
    <!-- Build your table here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- A table is a grid: rows (`<tr>`) contain cells.
- Header cells use `<th>` (bold + centered by default). Data cells use `<td>`.
- `<thead>` groups the header row(s); `<tbody>` groups the data rows. Browsers tolerate missing `<thead>`/`<tbody>`, but the tests for this question require them explicitly.
- Structure:
  ```
  <table>
    <thead>
      <tr>
        <th>...</th>
        <th>...</th>
      </tr>
    </thead>
    <tbody>
      <tr> ... </tr>
      <tr> ... </tr>
    </tbody>
  </table>
  ```

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>People</title>
  </head>
  <body>
    <h1>People</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice</td>
          <td>30</td>
        </tr>
        <tr>
          <td>Bob</td>
          <td>25</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

# Walkthrough

1. Inside `<body>`, open a `<table>` element.
2. Add a `<thead>` with a single `<tr>` row. Inside that row, add two `<th>` cells with the text `Name` and `Age`.
3. After the `<thead>`, add a `<tbody>` element.
4. Inside the `<tbody>`, add two `<tr>` rows:
   - Pseudocode for each row: `<tr><td>name</td><td>age</td></tr>`
   - First row → `Alice` / `30`. Second row → `Bob` / `25`.
5. Close `</tbody>` and `</table>`.
6. Refresh the preview. You should see a small two-column table with a header row and two data rows.
