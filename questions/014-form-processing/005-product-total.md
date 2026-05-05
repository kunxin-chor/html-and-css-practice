# Question

The page shows a list of four products, each with a checkbox and a price:

| Product | Price |
| --- | --- |
| Apple  | 1.50 |
| Bread  | 3.00 |
| Cheese | 5.25 |
| Donut  | 2.00 |

Each price is stored on the corresponding checkbox in a `data-price` attribute (for example, `<input type="checkbox" data-price="1.50">`).

There is a button labelled **Calculate Total** and an empty `<div>` that will display the result.

When the user clicks the **Calculate Total** button, the result `<div>` should display the sum of the prices of every product whose checkbox is currently checked, formatted to **two decimal places** with a leading `$`.

Examples:

- No checkboxes ticked → `$0.00`
- Only **Apple** ticked → `$1.50`
- **Apple** and **Cheese** ticked → `$6.75`
- All four ticked → `$11.75`

# Test Cases

```
describe('form processing - product total', () => {
  const check = (ids) => {
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = ids.includes(cb.id);
    });
  };
  const click = () => document.querySelector('#total-btn').click();
  const getResult = () => document.querySelector('#result').textContent.trim();

  it('shows $0.00 when nothing is selected', () => {
    check([]);
    click();
    expect(getResult()).to.equal('$0.00');
  });

  it('totals a single product', () => {
    check(['p-apple']);
    click();
    expect(getResult()).to.equal('$1.50');
  });

  it('totals multiple products', () => {
    check(['p-apple', 'p-cheese']);
    click();
    expect(getResult()).to.equal('$6.75');
  });

  it('totals all products', () => {
    check(['p-apple', 'p-bread', 'p-cheese', 'p-donut']);
    click();
    expect(getResult()).to.equal('$11.75');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Product Total</title>
  </head>
  <body>
    <fieldset>
      <legend>Products</legend>
      <label><input id="p-apple"  type="checkbox" data-price="1.50"> Apple — $1.50</label>
      <label><input id="p-bread"  type="checkbox" data-price="3.00"> Bread — $3.00</label>
      <label><input id="p-cheese" type="checkbox" data-price="5.25"> Cheese — $5.25</label>
      <label><input id="p-donut"  type="checkbox" data-price="2.00"> Donut — $2.00</label>
    </fieldset>

    <button id="total-btn">Calculate Total</button>
    <div id="result"></div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
body {
  font-family: sans-serif;
  padding: 20px;
}
fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
fieldset label {
  display: block;
  margin: 4px 0;
}
button {
  font-size: 16px;
  padding: 5px 10px;
}
#result {
  margin-top: 15px;
  font-size: 24px;
  font-weight: bold;
}
```

## JavaScript

```javascript
// Write your code here
//
// Reminder: data attribute values are strings. Convert them to numbers
// (e.g. with Number()) before adding.
//
// To format a number to 2 decimal places, use .toFixed(2):
//
//   (3.5).toFixed(2)  // '3.50'
```

## Hints

- A `data-*` attribute can be read either with `element.dataset.price` or `element.getAttribute('data-price')`. Both return strings.
- Loop through every checkbox; for each one that is checked, add its price (converted to a number) to a running total.
- Use `total.toFixed(2)` to format the final number with exactly two decimals, then prefix it with `$`.

# Solution

```javascript
const totalBtn = document.querySelector('#total-btn');
const resultDiv = document.querySelector('#result');

totalBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let total = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      total = total + Number(cb.dataset.price);
    }
  });
  resultDiv.textContent = '$' + total.toFixed(2);
});
```

# Walkthrough

1. Get references to the button and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Start a running total of `0`.
   - Loop over every product checkbox.
   - For each checkbox that is `checked`, read its `data-price` (via `cb.dataset.price`), convert it to a number, and add it to the total.
   - Format the total with `total.toFixed(2)`, prefix `$`, and write it to the result `<div>`.
4. `dataset` always returns strings, so the `Number()` conversion is essential — otherwise `+` would concatenate prices as text.
