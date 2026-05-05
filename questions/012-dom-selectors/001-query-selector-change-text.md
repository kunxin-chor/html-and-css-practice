# Question

The page currently shows a heading that says **"Original Heading"**. Write JavaScript in `script.js` so that when the page loads, the heading displays **"Hello, DOM!"** instead.

Do not modify the HTML — the change must come from your JavaScript code.

# Test Cases

```
describe('querySelector - change text', () => {
  it('should change the <h1> text to "Hello, DOM!"', () => {
    const h1 = document.querySelector('h1');
    expect(h1, 'Expected to find an <h1> element').to.exist;
    expect(h1.textContent.trim()).to.equal('Hello, DOM!');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>querySelector</title>
  </head>
  <body>
    <h1>Original Heading</h1>
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

- The DOM gives you a way to find elements on the page from JavaScript.
- Once you have a reference to an element, you can read and write its text content.

# Solution

```javascript
const heading = document.querySelector('h1');
heading.textContent = 'Hello, DOM!';
```

# Walkthrough

1. Open `script.js`.
2. Use `document.querySelector('h1')` to get a reference to the heading.
3. Set its `textContent` property to the string `'Hello, DOM!'`.
4. Run the tests — the heading should now display the new text.
