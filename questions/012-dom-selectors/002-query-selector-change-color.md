# Question

The page has a paragraph with id `message`. Using JavaScript in `script.js`, make its text appear in **red**.

Use your JavaScript code to apply the color — do not edit the HTML or CSS files.

# Test Cases

```
describe('querySelector - change color', () => {
  it('should set #message color to red', () => {
    const el = document.querySelector('#message');
    expect(el, 'Expected to find #message').to.exist;
    const color = el.style.color || getComputedStyle(el).color;
    expect(/red|rgb\(\s*255\s*,\s*0\s*,\s*0\s*\)/i.test(color)).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>querySelector color</title>
  </head>
  <body>
    <p id="message">This text should turn red.</p>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* No custom CSS needed */
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- Elements can be found by their id.
- Every element has a `style` object that lets you set inline CSS properties from JavaScript.

# Solution

```javascript
const msg = document.querySelector('#message');
msg.style.color = 'red';
```

# Walkthrough

1. In `script.js`, call `document.querySelector('#message')` to get the paragraph.
2. Set `.style.color = 'red'` on the returned element.
3. Run the tests — the paragraph text should render in red.
