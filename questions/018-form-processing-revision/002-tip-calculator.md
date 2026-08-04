# Question

The page has a text input for a bill amount, four radio buttons to choose a tip percentage, a button labelled **Calculate**, and an empty `<div>` that will display the result.

The tip percentages are:

- `10%`
- `15%` (selected by default)
- `20%`
- `25%`

When the user clicks **Calculate**, the total bill including the tip should be shown in the result `<div>` as:

```
Total: $XX.XX
```

For example, if the bill is `50` and the selected tip is `20%`, the result should be:

```
Total: $60.00
```

If the user changes the bill or tip and clicks **Calculate** again, the result should update.

# Test Cases

```
describe('form processing revision - tip calculator', () => {
  const bill = () => document.querySelector('#bill');
  const tip = (value) => {
    const r = document.querySelector(`input[name="tip"][value="${value}"]`);
    r.checked = true;
  };
  const btn = () => document.querySelector('#calc-btn');
  const result = () => document.querySelector('#result');

  it('calculates 15% tip by default', () => {
    bill().value = '100';
    btn().click();
    expect(result().textContent.trim()).to.equal('Total: $115.00');
  });

  it('calculates 20% tip', () => {
    bill().value = '50';
    tip('20');
    btn().click();
    expect(result().textContent.trim()).to.equal('Total: $60.00');
  });

  it('calculates 10% tip', () => {
    bill().value = '80';
    tip('10');
    btn().click();
    expect(result().textContent.trim()).to.equal('Total: $88.00');
  });

  it('calculates 25% tip', () => {
    bill().value = '40';
    tip('25');
    btn().click();
    expect(result().textContent.trim()).to.equal('Total: $50.00');
  });

  it('handles a zero bill', () => {
    bill().value = '0';
    tip('15');
    btn().click();
    expect(result().textContent.trim()).to.equal('Total: $0.00');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tip Calculator</title>
  </head>
  <body>
    <label>
      Bill amount:
      <input id="bill" type="text" placeholder="e.g. 50">
    </label>

    <fieldset>
      <legend>Tip</legend>
      <label><input type="radio" name="tip" value="10"> 10%</label>
      <label><input type="radio" name="tip" value="15" checked> 15%</label>
      <label><input type="radio" name="tip" value="20"> 20%</label>
      <label><input type="radio" name="tip" value="25"> 25%</label>
    </fieldset>

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
label, fieldset {
  display: block;
  margin-bottom: 10px;
}
fieldset {
  border: 1px solid #ccc;
  padding: 10px;
}
fieldset label {
  display: inline-block;
  margin-right: 15px;
}
input, button {
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
// Reminder: convert the bill value to a number before doing math.
// To format a number to 2 decimal places, use .toFixed(2).
```

## Hints

- Get references to the bill input, the **Calculate** button, and the result `<div>`.
- Find the checked tip radio with `document.querySelector('input[name="tip"]:checked')` and read its `.value`.
- Convert the bill to a number, multiply by `1 + (tip / 100)`, and format the result with `.toFixed(2)`.

# Solution

```javascript
const billInput = document.querySelector('#bill');
const calcBtn = document.querySelector('#calc-btn');
const resultDiv = document.querySelector('#result');

calcBtn.addEventListener('click', () => {
  const bill = Number(billInput.value);
  const selected = document.querySelector('input[name="tip"]:checked');
  const tipPercent = Number(selected.value);

  const total = bill * (1 + tipPercent / 100);
  resultDiv.textContent = 'Total: $' + total.toFixed(2);
});
```

# Walkthrough

1. Get references to the bill input, the **Calculate** button, and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Convert the bill input's value to a number with `Number()`.
   - Find the checked tip radio button and read its `.value` as a number.
   - Compute the total as `bill * (1 + tipPercent / 100)`.
   - Format the result with `total.toFixed(2)` and prefix it with `'Total: $'`.
4. The `15%` radio has the `checked` attribute, so it is selected by default.
