# Question

Make the `<h1>` heading on the page display in **red**.

Use CSS to style the heading — do not use inline `style` attributes in the HTML.

# Answer

In `style.css`, add a rule that targets `h1` and sets `color` to `red`.

# Test Cases

```
describe('Heading color', () => {
  it('the <h1> should be rendered in red', () => {
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    const color = getComputedStyle(h1).color;
    expect(color).to.equal('rgb(255, 0, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Red Heading</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>I should be red</h1>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- CSS rules look like: `selector { property: value; }`
- The selector for an `<h1>` element is simply `h1`.
- The property for text color is `color`.

# Solution

```css
h1 {
  color: red;
}
```

# Walkthrough

1. Open `style.css`.
2. Write a selector that targets the heading element:
   - Pseudocode: `h1 { ... }`
3. Inside the braces, set the `color` property to `red`.
   - Pseudocode: `color: red;`
4. Save and refresh the preview — the heading should now appear red.
5. Run the tests. The computed color `rgb(255, 0, 0)` is the same as `red`.
