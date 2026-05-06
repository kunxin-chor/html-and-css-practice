# Question

As in the previous question, the page has a button labelled **Add** and an empty `<div>` with `id="output"`.

Every time the user clicks **Add**, a new `<span>` containing the text `hello world` should be appended to the `#output` div. This time, the text inside each appended span should be displayed in **red**.

# Test Cases

```
describe('append child - red hello world', () => {
  const click = () => document.querySelector('#add-btn').click();
  const spans = () => document.querySelector('#output').querySelectorAll('span');

  const isRed = (color) => {
    const c = color.replace(/\s+/g, '').toLowerCase();
    return c === 'red' || c === 'rgb(255,0,0)' || c === '#ff0000';
  };

  it('appends one span per click', () => {
    click();
    click();
    expect(spans().length).to.equal(2);
  });

  it('each span contains "hello world"', () => {
    click();
    spans().forEach((s) => {
      expect(s.textContent.trim()).to.equal('hello world');
    });
  });

  it('each span is coloured red', () => {
    click();
    spans().forEach((s) => {
      expect(isRed(s.style.color) || isRed(getComputedStyle(s).color)).to.equal(true);
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
    <title>Append Red Hello</title>
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
```

## Hints

- Set the text colour directly on the new span's inline style: `span.style.color = 'red'`.
- Do this before appending, or after — either order works.

# Solution

```javascript
const addBtn = document.querySelector('#add-btn');
const output = document.querySelector('#output');

addBtn.addEventListener('click', () => {
  const span = document.createElement('span');
  span.textContent = 'hello world';
  span.style.color = 'red';
  output.appendChild(span);
});
```

# Walkthrough

1. Start from the solution of the previous question.
2. After creating the span and setting its text, add `span.style.color = 'red'`.
3. Append the span to the output div as before.
