# Question

The page has two text inputs for entering numbers, four radio buttons to choose an operation (**+**, **−**, **×**, **÷**), a button labelled **Calculate**, and an empty `<div>` that will display the result.

When the user clicks the **Calculate** button, the two numbers should be processed using the selected operation and the result displayed inside the result `<div>`.

For example, if the user enters `10` and `4`, selects **−**, and clicks **Calculate**, the result `<div>` should show:

```
6
```

The **+** operation is selected by default when the page loads.

# Test Cases

```
describe('form processing - calculate with radio buttons', () => {
  const setInputs = (a, b) => {
    document.querySelector('#num-a').value = String(a);
    document.querySelector('#num-b').value = String(b);
  };

  const selectOp = (value) => {
    document.querySelector(`input[name="operation"][value="${value}"]`).checked = true;
  };

  const clickCalc = () => document.querySelector('#calc-btn').click();
  const getResult = () => document.querySelector('#result').textContent.trim();

  it('adds two numbers', () => {
    setInputs(10, 4);
    selectOp('add');
    clickCalc();
    expect(getResult()).to.equal('14');
  });

  it('subtracts two numbers', () => {
    setInputs(10, 4);
    selectOp('subtract');
    clickCalc();
    expect(getResult()).to.equal('6');
  });

  it('multiplies two numbers', () => {
    setInputs(10, 4);
    selectOp('multiply');
    clickCalc();
    expect(getResult()).to.equal('40');
  });

  it('divides two numbers', () => {
    setInputs(10, 4);
    selectOp('divide');
    clickCalc();
    expect(getResult()).to.equal('2.5');
  });

  it('default operation is add', () => {
    setInputs(7, 3);
    clickCalc();
    expect(getResult()).to.equal('10');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Calculate</title>
  </head>
  <body>
    <input id="num-a" type="text" placeholder="First number">
    <input id="num-b" type="text" placeholder="Second number">

    <fieldset>
      <label><input type="radio" name="operation" value="add" checked> +</label>
      <label><input type="radio" name="operation" value="subtract"> −</label>
      <label><input type="radio" name="operation" value="multiply"> ×</label>
      <label><input type="radio" name="operation" value="divide"> ÷</label>
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
input, button {
  font-size: 16px;
  padding: 5px 10px;
  margin-right: 5px;
}
fieldset {
  margin: 10px 0;
  border: none;
  padding: 0;
}
fieldset label {
  margin-right: 15px;
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
// Reminder: input values are strings. Convert them to numbers before
// doing math (e.g. with Number()).
```

## Hints

- Get references to both number inputs, the calculate button, and the result `<div>`.
- Inside the click listener, find the checked radio button to know which operation to perform.
- Convert both input values to numbers with `Number()`.
- Use `if`/`else if` (or a `switch`) to pick the right calculation based on the radio button's `value`.
- For division, be aware that dividing by zero gives `Infinity` — that's fine for this exercise.

# Solution

```javascript
const numA = document.querySelector('#num-a');
const numB = document.querySelector('#num-b');
const calcBtn = document.querySelector('#calc-btn');
const resultDiv = document.querySelector('#result');

calcBtn.addEventListener('click', () => {
  const a = Number(numA.value);
  const b = Number(numB.value);

  const selected = document.querySelector('input[name="operation"]:checked');
  const op = selected.value;

  let result;
  if (op === 'add') {
    result = a + b;
  } else if (op === 'subtract') {
    result = a - b;
  } else if (op === 'multiply') {
    result = a * b;
  } else if (op === 'divide') {
    result = a / b;
  }

  resultDiv.textContent = result;
});
```

# Walkthrough

1. Get references to `#num-a`, `#num-b`, `#calc-btn`, and `#result`.
2. Attach a `click` listener to the **Calculate** button.
3. Inside the listener:
   - Convert both input values to numbers.
   - Find the checked radio button: `document.querySelector('input[name="operation"]:checked')`.
   - Read its `.value` to know which operation was selected.
   - Use conditional logic (`if`/`else if` or `switch`) to perform the correct math.
   - Set the result `<div>`'s `.textContent` to the computed value.
4. The `+` radio has the `checked` attribute in the HTML, so it's selected by default.
