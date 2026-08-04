# Question

The page has a text input for a surname, a dropdown to choose a title, a button labelled **Greet**, and an empty `<div>` that will display the result.

The title dropdown contains:

- `Mr`
- `Ms`
- `Mx`

When the user clicks the **Greet** button, the result `<div>` should show:

```
Hello, Title Surname
```

For example, if the user selects `Mr` and types `Tan` in the surname input, then clicks **Greet**, the result should be:

```
Hello, Mr Tan
```

If the user changes the title or surname and clicks **Greet** again, the result should update.

# Test Cases

```
describe('form processing revision - greeting with title', () => {
  const title = () => document.querySelector('#title');
  const surname = () => document.querySelector('#surname');
  const btn = () => document.querySelector('#greet-btn');
  const result = () => document.querySelector('#result');

  it('greets with a title and surname', () => {
    title().value = 'Mr';
    surname().value = 'Tan';
    btn().click();
    expect(result().textContent.trim()).to.equal('Hello, Mr Tan');
  });

  it('updates when the surname changes', () => {
    title().value = 'Ms';
    surname().value = 'Lee';
    btn().click();
    expect(result().textContent.trim()).to.equal('Hello, Ms Lee');
  });

  it('works with Mx', () => {
    title().value = 'Mx';
    surname().value = 'Smith';
    btn().click();
    expect(result().textContent.trim()).to.equal('Hello, Mx Smith');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Greeting with Title</title>
  </head>
  <body>
    <label>
      Title:
      <select id="title">
        <option value="Mr">Mr</option>
        <option value="Ms">Ms</option>
        <option value="Mx">Mx</option>
      </select>
    </label>

    <label>
      Surname:
      <input id="surname" type="text" placeholder="Your surname">
    </label>

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
  font-size: 20px;
  font-weight: bold;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- You need a reference to the title `<select>`, the surname `<input>`, the button, and the result `<div>`.
- Read the selected title with `titleSelect.value` and the surname with `surnameInput.value`.
- Build the greeting string by joining `'Hello, '`, the title, a space, and the surname.

# Solution

```javascript
const titleSelect = document.querySelector('#title');
const surnameInput = document.querySelector('#surname');
const greetBtn = document.querySelector('#greet-btn');
const resultDiv = document.querySelector('#result');

greetBtn.addEventListener('click', () => {
  const title = titleSelect.value;
  const surname = surnameInput.value;
  resultDiv.textContent = 'Hello, ' + title + ' ' + surname;
});
```

# Walkthrough

1. Get references to the title dropdown, the surname input, the **Greet** button, and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Read the title dropdown's `.value` and the surname input's `.value`.
   - Build the greeting by concatenating `'Hello, '`, the title, a space, and the surname.
   - Set the result `<div>`'s `.textContent` to the greeting.
4. Clicking again re-reads the current values, so the result updates automatically.
