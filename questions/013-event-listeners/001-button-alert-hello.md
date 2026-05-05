# Question

The page has a single button. Write JavaScript so that **every time the button is clicked**, the browser shows an alert with the message `Hello World`.

Do not call `alert` on page load — the alert should only appear in response to a click.

# Test Cases

```
describe('event listener - alert on click', () => {
  it('should call alert("Hello World") when the button is clicked', () => {
    const btn = document.querySelector('button');
    expect(btn, 'Expected to find a <button>').to.exist;

    const original = window.alert;
    let called = null;
    window.alert = (msg) => { called = msg; };

    btn.click();

    window.alert = original;
    expect(called).to.equal('Hello World');
  });

  it('should NOT alert on page load', () => {
    // If alert had fired on load, the test runner would have been interrupted.
    expect(true).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Click me</title>
  </head>
  <body>
    <button id="greet">Click me</button>
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

- DOM elements can listen for events such as `click`.
- The browser provides a built-in `alert()` function.

# Solution

```javascript
const btn = document.querySelector('#greet');
btn.addEventListener('click', () => {
  alert('Hello World');
});
```

# Walkthrough

1. Find the button on the page.
2. Attach a `click` event listener to it.
3. Inside the listener, call `alert('Hello World')`.
4. Each click triggers a fresh alert.
