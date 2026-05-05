# Question

The page has two text inputs and a **Swap** button. Write JavaScript so that when the button is clicked, the values of the two inputs are **swapped**.

For example, if the first input contains `apple` and the second contains `banana`, after clicking **Swap** the first should contain `banana` and the second should contain `apple`.

# Test Cases

```
describe('event listener - swap input values', () => {
  it('swaps two non-empty values', () => {
    const a = document.querySelector('#input-a');
    const b = document.querySelector('#input-b');
    a.value = 'apple';
    b.value = 'banana';
    document.querySelector('#swap').click();
    expect(a.value).to.equal('banana');
    expect(b.value).to.equal('apple');
  });

  it('swaps again back to original', () => {
    const a = document.querySelector('#input-a');
    const b = document.querySelector('#input-b');
    a.value = 'one';
    b.value = 'two';
    document.querySelector('#swap').click();
    document.querySelector('#swap').click();
    expect(a.value).to.equal('one');
    expect(b.value).to.equal('two');
  });

  it('handles empty values', () => {
    const a = document.querySelector('#input-a');
    const b = document.querySelector('#input-b');
    a.value = '';
    b.value = 'hello';
    document.querySelector('#swap').click();
    expect(a.value).to.equal('hello');
    expect(b.value).to.equal('');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Swap values</title>
  </head>
  <body>
    <input id="input-a" type="text" placeholder="First">
    <input id="input-b" type="text" placeholder="Second">
    <button id="swap">Swap</button>
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
```

## JavaScript

```javascript
// Write your code here
//
// Reminder: the text currently inside an <input> is read via the `.value`
// property (not textContent). For example:
//
//   const inputEl = document.querySelector('#input-a');
//   const text = inputEl.value;        // read what the user typed
//   inputEl.value = 'something new';   // change the displayed text
```

## Hints

- You'll need to hold one of the values in a temporary variable so it isn't overwritten before you can use it.
- Destructuring assignment (`[a, b] = [b, a]`) is an elegant one-liner swap, but a temp variable works just as well.

# Solution

```javascript
const a = document.querySelector('#input-a');
const b = document.querySelector('#input-b');
const swapBtn = document.querySelector('#swap');

swapBtn.addEventListener('click', () => {
  const temp = a.value;
  a.value = b.value;
  b.value = temp;
});
```

# Walkthrough

1. Get references to both inputs and the swap button.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Save the first input's `value` into a temporary variable.
   - Assign the second input's `value` to the first.
   - Assign the saved value to the second.
4. Without the temp variable, the first assignment would overwrite the value you're trying to swap.
