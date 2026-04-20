# Question

Center-align the text of the `<h1>` heading horizontally using CSS.

# Test Cases

```
describe('Centered heading', () => {
  it('the <h1> should have text-align center', () => {
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    expect(getComputedStyle(h1).textAlign).to.equal('center');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Centered Heading</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Center me</h1>
    <p>This paragraph can stay on the left.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- The `text-align` property controls horizontal alignment of text inside a block element.
- Valid values include `left`, `right`, `center`, and `justify`.
- Only style the `h1`, not the `body` — otherwise the paragraph will also move.

# Solution

```css
h1 {
  text-align: center;
}
```

# Walkthrough

1. Open `style.css`.
2. Add a rule for the `h1` selector:
   - Pseudocode: `h1 { text-align: center; }`
3. Save and refresh the preview. The heading should now appear horizontally centered, while the paragraph stays left-aligned.
4. Run the tests to confirm the computed `text-align` is `center`.
