# Question

Create a box with a **2px solid blue border** on all sides.

The HTML is provided with a `div` that has a class of `box`. Add CSS to give it the required border styling.

# Test Cases

```
describe('Box border', () => {
  it('should have a 2px solid blue border', () => {
    const box = document.querySelector('.box');
    expect(box).to.exist;
    const style = getComputedStyle(box);
    expect(style.borderTopWidth).to.equal('2px');
    expect(style.borderTopStyle).to.equal('solid');
    expect(style.borderTopColor).to.equal('rgb(0, 0, 255)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Border Practice</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="box">I have a border</div>
  </body>
</html>
```

## CSS

```css
.box {
  background-color: #fff;
  padding: 20px;
  /* Add border here */
}
```

## Hints

- Border has three components: width, style, and color.
- The shorthand `border: 2px solid blue` sets all three at once.
- Common border styles: `solid`, `dashed`, `dotted`, `double`, `none`.

# Solution

```css
.box {
  background-color: #fff;
  padding: 20px;
  border: 2px solid blue;
}
```

# Walkthrough

1. Open `style.css`.
2. Find the `.box` selector.
3. Add `border: 2px solid blue;` inside the braces.
4. Save and refresh. You should see a blue outline around the white box.
5. Run the tests to verify the border width, style, and color.
