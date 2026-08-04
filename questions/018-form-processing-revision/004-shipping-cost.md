# Question

A courier company charges for shipping based on the region and the weight of a parcel:

| Region | Base cost | Cost per kg |
| --- | --- | --- |
| Local | $5 | $1 |
| Regional | $10 | $2 |
| International | $25 | $5 |

The page has a **Region** dropdown with values `local`, `regional`, and `international`, a weight input in kilograms, a button labelled **Calculate**, and an empty `<div>` that will display the result.

When the user clicks **Calculate**, the result `<div>` should show the shipping cost in the format `Cost: $X`.

Examples:

- Region = `local`, weight = `3` → `Cost: $8` (base $5 + 3 × $1)
- Region = `regional`, weight = `2` → `Cost: $14` (base $10 + 2 × $2)
- Region = `international`, weight = `4` → `Cost: $45` (base $25 + 4 × $5)

# Test Cases

```
describe('form processing revision - shipping cost', () => {
  const region = () => document.querySelector('#region');
  const weight = () => document.querySelector('#weight');
  const btn = () => document.querySelector('#calc-btn');
  const result = () => document.querySelector('#result').textContent.trim();

  it('calculates local shipping', () => {
    region().value = 'local';
    weight().value = '3';
    btn().click();
    expect(result()).to.equal('Cost: $8');
  });

  it('calculates regional shipping', () => {
    region().value = 'regional';
    weight().value = '2';
    btn().click();
    expect(result()).to.equal('Cost: $14');
  });

  it('calculates international shipping', () => {
    region().value = 'international';
    weight().value = '4';
    btn().click();
    expect(result()).to.equal('Cost: $45');
  });

  it('handles zero weight', () => {
    region().value = 'local';
    weight().value = '0';
    btn().click();
    expect(result()).to.equal('Cost: $5');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Shipping Cost</title>
  </head>
  <body>
    <label>
      Region:
      <select id="region">
        <option value="local">Local</option>
        <option value="regional">Regional</option>
        <option value="international">International</option>
      </select>
    </label>

    <label>
      Weight (kg):
      <input id="weight" type="number" min="0" value="1">
    </label>

    <button id="calc-btn">Calculate</button>
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
label {
  display: inline-block;
  margin-right: 15px;
}
select, input, button {
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
// Reminder: select values and input values are strings. Convert the
// weight to a number before doing math.
```

## Hints

- Get references to the region `<select>`, the weight `<input>`, the button, and the result `<div>`.
- Use `if`/`else if` to pick the base cost and per-kg cost based on the region value.
- Convert the weight to a number and compute `base + perKg * weight`.
- Build the result string as `'Cost: $' + total`.

# Solution

```javascript
const regionSelect = document.querySelector('#region');
const weightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const resultDiv = document.querySelector('#result');

calcBtn.addEventListener('click', () => {
  const region = regionSelect.value;
  const weight = Number(weightInput.value);

  let base = 0;
  let perKg = 0;
  if (region === 'local') {
    base = 5;
    perKg = 1;
  } else if (region === 'regional') {
    base = 10;
    perKg = 2;
  } else if (region === 'international') {
    base = 25;
    perKg = 5;
  }

  const total = base + perKg * weight;
  resultDiv.textContent = 'Cost: $' + total;
});
```

# Walkthrough

1. Get references to the region dropdown, the weight input, the **Calculate** button, and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Read the region value from the dropdown.
   - Convert the weight input's value to a number.
   - Use `if`/`else if` to set the base cost and per-kg cost based on the selected region.
   - Compute `base + perKg * weight` and set the result `<div>`'s `.textContent` to `'Cost: $' + total`.
4. Without `Number()` on the weight, the multiplication would still coerce strings, but explicit conversion is clearer.
