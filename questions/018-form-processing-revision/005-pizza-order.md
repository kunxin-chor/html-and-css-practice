# Question

A pizza shop has a menu with sizes and toppings:

| Size | Price |
| --- | --- |
| Small | $8.00 |
| Medium | $10.00 |
| Large | $12.00 |

| Topping | Price |
| --- | --- |
| Pepperoni | $1.50 |
| Mushrooms | $1.00 |
| Olives | $1.00 |
| Onions | $0.50 |

The page has a **Size** dropdown where each `<option>` has a `data-price` attribute, four topping checkboxes each with a `data-price` attribute, a button labelled **Calculate Total**, and an empty `<div>` that will display the result.

When the user clicks **Calculate Total**, the result `<div>` should show the price of the selected size plus the price of every checked topping, formatted as `$XX.XX`.

Examples:

- Small + Pepperoni → `$9.50`
- Medium + Mushrooms + Olives → `$12.00`
- Large + all toppings → `$16.00`

# Test Cases

```
describe('form processing revision - pizza order', () => {
  const size = (v) => { document.querySelector('#size').value = v; };
  const toppings = (ids) => {
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = ids.includes(cb.id);
    });
  };
  const btn = () => document.querySelector('#total-btn').click();
  const result = () => document.querySelector('#result').textContent.trim();

  it('totals size and one topping', () => {
    size('small');
    toppings(['topping-pepperoni']);
    btn();
    expect(result()).to.equal('$9.50');
  });

  it('totals size and multiple toppings', () => {
    size('medium');
    toppings(['topping-mushrooms', 'topping-olives']);
    btn();
    expect(result()).to.equal('$12.00');
  });

  it('totals all toppings on a large pizza', () => {
    size('large');
    toppings(['topping-pepperoni', 'topping-mushrooms', 'topping-olives', 'topping-onions']);
    btn();
    expect(result()).to.equal('$16.00');
  });

  it('shows only the size price when no toppings are checked', () => {
    size('small');
    toppings([]);
    btn();
    expect(result()).to.equal('$8.00');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Pizza Order</title>
  </head>
  <body>
    <label>
      Size:
      <select id="size">
        <option value="small" data-price="8.00">Small</option>
        <option value="medium" data-price="10.00">Medium</option>
        <option value="large" data-price="12.00">Large</option>
      </select>
    </label>

    <fieldset>
      <legend>Toppings</legend>
      <label><input id="topping-pepperoni" type="checkbox" data-price="1.50"> Pepperoni</label>
      <label><input id="topping-mushrooms" type="checkbox" data-price="1.00"> Mushrooms</label>
      <label><input id="topping-olives" type="checkbox" data-price="1.00"> Olives</label>
      <label><input id="topping-onions" type="checkbox" data-price="0.50"> Onions</label>
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
label, fieldset {
  display: block;
  margin-bottom: 10px;
}
fieldset {
  border: 1px solid #ccc;
  padding: 10px;
}
fieldset label {
  display: block;
  margin: 4px 0;
}
select, button {
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
// before adding.
//
// To get the selected option of a <select>, use:
//   const selectedOption = selectElement.options[selectElement.selectedIndex];
```

## Hints

- The selected size's price is stored on the `<option>` element, not on the `<select>` directly. Use `sizeSelect.options[sizeSelect.selectedIndex]` to get the selected option.
- Read the price with `selectedOption.dataset.price`.
- Loop through the topping checkboxes and add `Number(cb.dataset.price)` for each checked one.
- Format the final total with `.toFixed(2)` and prefix it with `$`.

# Solution

```javascript
const sizeSelect = document.querySelector('#size');
const totalBtn = document.querySelector('#total-btn');
const resultDiv = document.querySelector('#result');

totalBtn.addEventListener('click', () => {
  const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
  let total = Number(selectedOption.dataset.price);

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      total = total + Number(cb.dataset.price);
    }
  });

  resultDiv.textContent = '$' + total.toFixed(2);
});
```

# Walkthrough

1. Get references to the size `<select>`, the **Calculate Total** button, and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Get the currently selected `<option>` from the size dropdown.
   - Read its `data-price` and convert it to a number. This is the starting total.
   - Loop over every topping checkbox. For each checked one, add its `data-price` (converted to a number) to the total.
   - Format the total with `total.toFixed(2)` and prefix `$` before writing it to the result `<div>`.
4. Remember that `dataset.price` is a string, so `Number()` is needed before addition.
