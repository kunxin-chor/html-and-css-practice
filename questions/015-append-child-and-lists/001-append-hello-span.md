# Question

The page has a button labelled **Add** and an empty `<div>` with `id="output"`.

Every time the user clicks **Add**, a new `<span>` containing the text `hello world` should be appended to the end of the `#output` div.

For example, after clicking **Add** three times, `#output` should contain three `<span>hello world</span>` elements (in the order they were added).

# Test Cases

```
describe('append child - hello world span', () => {
  const click = () => document.querySelector('#add-btn').click();
  const output = () => document.querySelector('#output');
  const spans = () => output().querySelectorAll('span');

  it('starts with an empty output', () => {
    expect(spans().length).to.equal(0);
  });

  it('appends one span per click', () => {
    click();
    expect(spans().length).to.equal(1);
    click();
    click();
    expect(spans().length).to.equal(3);
  });

  it('each span contains "hello world"', () => {
    click();
    click();
    spans().forEach((s) => {
      expect(s.textContent.trim()).to.equal('hello world');
    });
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Append Hello World</title>
  </head>
  <body>
    <button id="add-btn">Add</button>
    <div id="output"></div>
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
button {
  font-size: 16px;
  padding: 5px 10px;
}
#output span {
  margin-right: 8px;
}
```

## JavaScript

```javascript
// Write your code here
//
// You can create a new DOM element with document.createElement(...),
// set its text with .textContent, and attach it to another element
// with parent.appendChild(...).
```

## Hints

- Create the span with `document.createElement('span')`.
- Set its text with `.textContent = 'hello world'`.
- Append it to the output div with `outputDiv.appendChild(span)`.

# Solution

```javascript
const addBtn = document.querySelector('#add-btn');
const output = document.querySelector('#output');

addBtn.addEventListener('click', () => {
  const span = document.createElement('span');
  span.textContent = 'hello world';
  output.appendChild(span);
});
```

# Walkthrough

1. Get references to the button and the `#output` div.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Create a brand-new `<span>` with `document.createElement('span')`.
   - Set its `textContent` to `'hello world'`.
   - Call `output.appendChild(span)` to attach it to the end of the output div.
4. Because a new element is created on every click, each click produces one more span.
