# Question

The page has a text input where the user can type their name, a button labelled **Greet**, and an empty `<div>` that will display the result.

When the user clicks the **Greet** button, the text `Hello, ` followed by whatever name the user typed should appear inside the result `<div>`.

For example, if the user types `Alice` and clicks **Greet**, the result `<div>` should show:

```
Hello, Alice
```

If the user types a different name and clicks **Greet** again, the result `<div>` should update to show the new name.

# Test Cases

```
describe('form processing - hello name', () => {
  it('displays the entered name when Greet is clicked', () => {
    const input = document.querySelector('#name-input');
    const btn = document.querySelector('#greet-btn');
    const result = document.querySelector('#result');

    input.value = 'Alice';
    btn.click();
    expect(result.textContent.trim()).to.equal('Hello, Alice');
  });

  it('updates when a different name is entered', () => {
    const input = document.querySelector('#name-input');
    const btn = document.querySelector('#greet-btn');
    const result = document.querySelector('#result');

    input.value = 'Bob';
    btn.click();
    expect(result.textContent.trim()).to.equal('Hello, Bob');
  });

  it('handles empty input', () => {
    const input = document.querySelector('#name-input');
    const btn = document.querySelector('#greet-btn');
    const result = document.querySelector('#result');

    input.value = '';
    btn.click();
    expect(result.textContent.trim()).to.equal('Hello,');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Name</title>
  </head>
  <body>
    <input id="name-input" type="text" placeholder="Enter your name">
    <button id="greet-btn">Greet</button>
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
  font-size: 20px;
  font-weight: bold;
}
```

## JavaScript

```javascript
// Write your code here
//
// To set the text inside a <div>, use the `.textContent` property:
//
//   const resultEl = document.querySelector('#result');
//   resultEl.textContent = 'some text';
```

## Hints

- You need three things: a reference to the input, a reference to the button, and a reference to the result `<div>`.
- Attach a `click` event listener to the button.
- Inside the listener, read the input's `.value`, build the greeting string, and assign it to the result element's `.textContent`.
- The greeting string is `'Hello, '` plus the name. Use `+` to join strings together.

# Solution

```javascript
const nameInput = document.querySelector('#name-input');
const greetBtn = document.querySelector('#greet-btn');
const resultDiv = document.querySelector('#result');

greetBtn.addEventListener('click', () => {
  const name = nameInput.value;
  resultDiv.textContent = 'Hello, ' + name;
});
```

# Walkthrough

1. Use `document.querySelector()` to get references to `#name-input`, `#greet-btn`, and `#result`.
2. Call `addEventListener('click', ...)` on the button.
3. Inside the callback function:
   - Read the current value of the input with `.value`.
   - Build the greeting by concatenating `'Hello, '` with the name.
   - Set the result `<div>`'s `.textContent` to that greeting.
4. Test by typing a name and clicking **Greet**.
