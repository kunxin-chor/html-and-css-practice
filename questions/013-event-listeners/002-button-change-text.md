# Question

The page shows a paragraph with the text `Click the button to change me` and a button labelled `Update`. Write JavaScript so that when the button is clicked, the paragraph's text changes to `Text has been updated!`.

Before the button is clicked, the paragraph must still show its original text.

# Test Cases

```
describe('event listener - change text on click', () => {
  it('should keep the original text before click', () => {
    const p = document.querySelector('#target');
    expect(p.textContent.trim()).to.equal('Click the button to change me');
  });

  it('should change text after button click', () => {
    const btn = document.querySelector('button');
    btn.click();
    const p = document.querySelector('#target');
    expect(p.textContent.trim()).to.equal('Text has been updated!');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Change text</title>
  </head>
  <body>
    <p id="target">Click the button to change me</p>
    <button>Update</button>
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

- You'll need to find two different elements — one to listen on, and one to update.
- The update must happen *inside* the event listener so it only runs when the button is clicked.

# Solution

```javascript
const btn = document.querySelector('button');
const target = document.querySelector('#target');

btn.addEventListener('click', () => {
  target.textContent = 'Text has been updated!';
});
```

# Walkthrough

1. Get references to both the paragraph and the button.
2. Attach a `click` listener to the button.
3. Inside the listener, update the paragraph's `textContent`.
