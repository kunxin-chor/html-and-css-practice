# Question

As in the previous question, every click of the **Add** button appends a `<span>hello world</span>` to `#output`, with the text coloured **red**. This time the text should also use the **Verdana** font family.

# Test Cases

```
describe('append child - red verdana hello world', () => {
  const click = () => document.querySelector('#add-btn').click();
  const spans = () => document.querySelector('#output').querySelectorAll('span');

  const isRed = (color) => {
    const c = color.replace(/\s+/g, '').toLowerCase();
    return c === 'red' || c === 'rgb(255,0,0)' || c === '#ff0000';
  };

  it('each span says "hello world", in red, in Verdana', () => {
    click();
    click();
    const list = spans();
    expect(list.length).to.equal(2);
    list.forEach((s) => {
      expect(s.textContent.trim()).to.equal('hello world');
      expect(isRed(s.style.color) || isRed(getComputedStyle(s).color)).to.equal(true);
      const font = (s.style.fontFamily || getComputedStyle(s).fontFamily || '').toLowerCase();
      expect(font).to.include('verdana');
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
    <title>Red Verdana Hello</title>
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

- Font family is set with `span.style.fontFamily = 'Verdana'`.
- In JavaScript, CSS properties with hyphens become camelCase (`font-family` → `fontFamily`, `background-color` → `backgroundColor`, etc.).

# Solution

```javascript
const addBtn = document.querySelector('#add-btn');
const output = document.querySelector('#output');

addBtn.addEventListener('click', () => {
  const span = document.createElement('span');
  span.textContent = 'hello world';
  span.style.color = 'red';
  span.style.fontFamily = 'Verdana';
  output.appendChild(span);
});
```

# Walkthrough

1. Start from the previous solution (red hello world).
2. Add one more line: `span.style.fontFamily = 'Verdana'`.
3. Append the span to `#output`.
