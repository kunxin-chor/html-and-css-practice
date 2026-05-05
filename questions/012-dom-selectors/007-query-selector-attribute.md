# Question

The form has three inputs: a text field, an email field, and a password field. Write JavaScript that pre-fills **only the email input** with the value `hello@example.com`.

The other two inputs must remain empty.

Note: none of the inputs have an id or class, so you'll need another way to target the right one.

# Test Cases

```
describe('querySelector - attribute selector', () => {
  it('should set the email input value', () => {
    const input = document.querySelector('input[type="email"]');
    expect(input, 'Expected to find input[type="email"]').to.exist;
    expect(input.value).to.equal('hello@example.com');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Attribute selector</title>
  </head>
  <body>
    <form>
      <input type="text" placeholder="Name">
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Password">
    </form>
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

- CSS supports selecting elements based on attribute values, and so does `querySelector`.
- The displayed contents of a form input is stored in its `value`, not its text.

# Solution

```javascript
const emailInput = document.querySelector('input[type="email"]');
emailInput.value = 'hello@example.com';
```

# Walkthrough

1. `document.querySelector('input[type="email"]')` finds the input with `type="email"`.
2. Form input values are accessed via the `.value` property.
3. Assign `'hello@example.com'` to `.value`.
