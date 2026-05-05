# Question

The page has a `<div>` (id `box`) and three buttons labelled **Red**, **Green**, and **Blue**. Write JavaScript so that clicking each button changes the background color of the `<div>` to its matching color.

- Clicking **Red** → `<div>` background becomes `red`.
- Clicking **Green** → `<div>` background becomes `green`.
- Clicking **Blue** → `<div>` background becomes `blue`.

# Test Cases

```
describe('event listener - three buttons change background', () => {
  const box = () => document.querySelector('#box');

  it('clicking Red sets background to red', () => {
    document.querySelector('#red-btn').click();
    const bg = box().style.backgroundColor;
    expect(/red|rgb\(\s*255\s*,\s*0\s*,\s*0\s*\)/i.test(bg)).to.equal(true);
  });

  it('clicking Green sets background to green', () => {
    document.querySelector('#green-btn').click();
    const bg = box().style.backgroundColor;
    expect(/green|rgb\(\s*0\s*,\s*128\s*,\s*0\s*\)/i.test(bg)).to.equal(true);
  });

  it('clicking Blue sets background to blue', () => {
    document.querySelector('#blue-btn').click();
    const bg = box().style.backgroundColor;
    expect(/blue|rgb\(\s*0\s*,\s*0\s*,\s*255\s*\)/i.test(bg)).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Color picker</title>
  </head>
  <body>
    <div id="box">Watch my background change</div>
    <button id="red-btn">Red</button>
    <button id="green-btn">Green</button>
    <button id="blue-btn">Blue</button>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
#box {
  width: 300px;
  height: 150px;
  border: 1px solid #333;
  margin-bottom: 10px;
  padding: 10px;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- You need three separate event listeners — one for each button.
- Each listener updates the same target element but with a different color value.

# Solution

```javascript
const box = document.querySelector('#box');

document.querySelector('#red-btn').addEventListener('click', () => {
  box.style.backgroundColor = 'red';
});

document.querySelector('#green-btn').addEventListener('click', () => {
  box.style.backgroundColor = 'green';
});

document.querySelector('#blue-btn').addEventListener('click', () => {
  box.style.backgroundColor = 'blue';
});
```

# Walkthrough

1. Get a reference to the `#box` element.
2. For each button, attach a `click` listener.
3. In each listener, set `box.style.backgroundColor` to the matching color.
