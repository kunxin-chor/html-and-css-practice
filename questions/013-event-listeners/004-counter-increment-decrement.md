# Question

Build a simple counter. The page shows a number (starting at `0`) and two buttons: **+** and **−**.

- Clicking **+** should increase the displayed number by 1.
- Clicking **−** should decrease the displayed number by 1.
- The number should be able to go negative.

The starting number shown on the page must be `0` when the page loads.

# Test Cases

```
describe('event listener - counter', () => {
  const getValue = () => Number(document.querySelector('#count').textContent);

  it('starts at 0', () => {
    expect(getValue()).to.equal(0);
  });

  it('increments when + is clicked', () => {
    document.querySelector('#inc').click();
    document.querySelector('#inc').click();
    document.querySelector('#inc').click();
    expect(getValue()).to.equal(3);
  });

  it('decrements when - is clicked', () => {
    document.querySelector('#dec').click();
    expect(getValue()).to.equal(2);
  });

  it('can go below zero', () => {
    document.querySelector('#dec').click();
    document.querySelector('#dec').click();
    document.querySelector('#dec').click();
    expect(getValue()).to.equal(-1);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Counter</title>
  </head>
  <body>
    <h1 id="count">0</h1>
    <button id="dec">-</button>
    <button id="inc">+</button>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
body {
  font-family: sans-serif;
  text-align: center;
}
button {
  font-size: 24px;
  padding: 5px 20px;
  margin: 0 5px;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- **Important:** `element.textContent` (and `innerText`) is always a **string**, even if it looks like a number. If you do `"0" + 1` you get `"01"`, not `1`. Convert it first with `Number(...)` or `parseInt(...)`.
- You could either read the text each click and update it, or keep the count in a separate variable.

# Solution

```javascript
const display = document.querySelector('#count');

document.querySelector('#inc').addEventListener('click', () => {
  const current = Number(display.textContent);
  display.textContent = current + 1;
});

document.querySelector('#dec').addEventListener('click', () => {
  const current = Number(display.textContent);
  display.textContent = current - 1;
});
```

# Walkthrough

1. Grab the `#count` element — this is where the number lives.
2. For the **+** button, add a click listener that:
   - Reads the current text, converts it to a number.
   - Adds `1` and writes the result back into `textContent`.
3. Do the same for the **−** button, but subtract instead.
4. Remember: without `Number()`, the `+` operator would concatenate strings instead of adding numbers.
