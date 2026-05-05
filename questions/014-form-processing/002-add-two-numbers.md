# Question

The page has two text inputs for entering numbers, a button labelled **Add**, and an empty `<div>` that will display the result.

When the user clicks the **Add** button, the two numbers should be added together and the sum displayed inside the result `<div>`.

For example, if the user enters `5` in the first input and `3` in the second and clicks **Add**, the result `<div>` should show:

```
8
```

If the user changes either number and clicks **Add** again, the result should update.

# Test Cases

```
describe('form processing - add two numbers', () => {
  it('adds two positive integers', () => {
    document.querySelector('#num-a').value = '5';
    document.querySelector('#num-b').value = '3';
    document.querySelector('#add-btn').click();
    expect(document.querySelector('#result').textContent.trim()).to.equal('8');
  });

  it('adds numbers with decimals', () => {
    document.querySelector('#num-a').value = '2.5';
    document.querySelector('#num-b').value = '1.5';
    document.querySelector('#add-btn').click();
    expect(document.querySelector('#result').textContent.trim()).to.equal('4');
  });

  it('handles negative numbers', () => {
    document.querySelector('#num-a').value = '10';
    document.querySelector('#num-b').value = '-4';
    document.querySelector('#add-btn').click();
    expect(document.querySelector('#result').textContent.trim()).to.equal('6');
  });

  it('handles zero', () => {
    document.querySelector('#num-a').value = '0';
    document.querySelector('#num-b').value = '7';
    document.querySelector('#add-btn').click();
    expect(document.querySelector('#result').textContent.trim()).to.equal('7');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Add Two Numbers</title>
  </head>
  <body>
    <input id="num-a" type="text" placeholder="First number">
    <input id="num-b" type="text" placeholder="Second number">
    <button id="add-btn">Add</button>
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
// Reminder: input values are strings. To do math, convert them to
// numbers first:
//
//   const num = Number('5');   // num is now the number 5
//
// You can also use parseFloat() for decimal numbers.
```

## Hints

- Read both input values with `.value`. They will be strings.
- Convert both strings to numbers before adding them. If you add strings, `'5' + '3'` gives `'53'`, not `8`.
- Use `Number()` or `parseFloat()` to do the conversion.
- Set the result `<div>`'s `.textContent` to the sum.

# Solution

```javascript
const numA = document.querySelector('#num-a');
const numB = document.querySelector('#num-b');
const addBtn = document.querySelector('#add-btn');
const resultDiv = document.querySelector('#result');

addBtn.addEventListener('click', () => {
  const a = Number(numA.value);
  const b = Number(numB.value);
  resultDiv.textContent = a + b;
});
```

# Walkthrough

1. Get references to both inputs, the button, and the result `<div>`.
2. Attach a `click` listener to the **Add** button.
3. Inside the listener:
   - Read `.value` from each input — these are strings.
   - Convert each to a number with `Number()`.
   - Add them together and assign the result to the result `<div>`'s `.textContent`.
4. Without `Number()`, the `+` operator would concatenate the two strings instead of adding the numbers.
