# Question

Build a table listing three cities with their country and population.

Requirements:

1. Use a `<table>`.
2. Include a `<thead>` with one row containing three `<th>` cells: `City`, `Country`, `Population`.
3. Include a `<tbody>` with exactly three data rows (`<tr>`), each with three `<td>` cells:
   - Row 1: `Tokyo` / `Japan` / `37400068`
   - Row 2: `Delhi` / `India` / `28514000`
   - Row 3: `Shanghai` / `China` / `25582000`

# Answer

Use a `<table>` with a `<thead>` for the three-column header and a `<tbody>` with three data rows.

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
  it('the <thead> should contain one row with three <th> cells', () => {
    const headerRows = document.querySelectorAll('thead > tr');
    expect(headerRows.length).to.equal(1);
    const ths = headerRows[0].querySelectorAll('th');
    expect(ths.length).to.equal(3);
    const labels = Array.from(ths).map(th => th.textContent.trim());
    expect(labels).to.deep.equal(['City', 'Country', 'Population']);
  });
});
```

```
describe('Body rows', () => {
  const expected = [
    ['Tokyo', 'Japan', '37400068'],
    ['Delhi', 'India', '28514000'],
    ['Shanghai', 'China', '25582000'],
  ];

  it('the <tbody> should contain exactly three rows', () => {
    expect(document.querySelectorAll('tbody > tr').length).to.equal(3);
  });

  expected.forEach((row, i) => {
    it('row ' + (i + 1) + ' should be ' + row.join(' / '), () => {
      const cells = document.querySelectorAll('tbody > tr')[i].querySelectorAll('td');
      expect(cells.length).to.equal(3);
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
    <title>World Cities</title>
  </head>
  <body>
    <h1>Largest Cities</h1>
    <!-- Build your table here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- Header cells use `<th>`; data cells use `<td>`.
- Group the header row inside `<thead>` and the data rows inside `<tbody>` — the tests check for both explicitly.
- This table has **three** columns, so each row needs three cells.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>World Cities</title>
  </head>
  <body>
    <h1>Largest Cities</h1>
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tokyo</td>
          <td>Japan</td>
          <td>37400068</td>
        </tr>
        <tr>
          <td>Delhi</td>
          <td>India</td>
          <td>28514000</td>
        </tr>
        <tr>
          <td>Shanghai</td>
          <td>China</td>
          <td>25582000</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

# Walkthrough

1. Open a `<table>` after the `<h1>`.
2. Add a `<thead>` with one `<tr>` containing three `<th>` cells: `City`, `Country`, `Population`.
3. After the `<thead>`, open a `<tbody>`.
4. Add three `<tr>` rows, each with three `<td>` cells for city, country, and population.
5. Close `</tbody>` and `</table>`.
