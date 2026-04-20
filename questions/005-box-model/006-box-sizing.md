# Question

Create two boxes that both have **width: 200px**, **padding: 20px**, and **border: 5px solid black**.

The first box (`.content-box`) should use `content-box` sizing (the default). The second box (`.border-box`) should use `border-box` sizing.

This demonstrates how `box-sizing` affects the total rendered width.

# Test Cases

```
describe('Box sizing behavior', () => {
  it('content-box should have default box-sizing', () => {
    const box = document.querySelector('.content-box');
    expect(box).to.exist;
    const style = getComputedStyle(box);
    expect(style.boxSizing).to.equal('content-box');
  });

  it('border-box should have border-box sizing', () => {
    const box = document.querySelector('.border-box');
    expect(box).to.exist;
    const style = getComputedStyle(box);
    expect(style.boxSizing).to.equal('border-box');
  });

  it('both boxes should have 200px width', () => {
    const contentBox = document.querySelector('.content-box');
    const borderBox = document.querySelector('.border-box');
    expect(contentBox).to.exist;
    expect(borderBox).to.exist;
    const contentStyle = getComputedStyle(contentBox);
    const borderStyle = getComputedStyle(borderBox);
    expect(contentStyle.width).to.equal('200px');
    expect(borderStyle.width).to.equal('200px');
  });

  it('both boxes should have 20px padding and 5px border', () => {
    const contentBox = document.querySelector('.content-box');
    const borderBox = document.querySelector('.border-box');
    const contentStyle = getComputedStyle(contentBox);
    const borderStyle = getComputedStyle(borderBox);
    expect(contentStyle.paddingTop).to.equal('20px');
    expect(contentStyle.borderTopWidth).to.equal('5px');
    expect(borderStyle.paddingTop).to.equal('20px');
    expect(borderStyle.borderTopWidth).to.equal('5px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Box Sizing</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="content-box">Content Box (I get wider with padding/border)</div>
    <div class="border-box">Border Box (I stay 200px total)</div>
  </body>
</html>
```

## CSS

```css
.content-box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightcoral;
  margin-bottom: 10px;
  /* Add box-sizing here */
}

.border-box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightgreen;
  /* Add box-sizing here */
}
```

## Hints

- `content-box`: width/height applies to content only. Padding and border are added outside.
- `border-box`: width/height applies to the entire box including padding and border.
- `border-box` is often preferred for easier layout calculations.

# Solution

```css
.content-box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightcoral;
  margin-bottom: 10px;
  box-sizing: content-box;
}

.border-box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightgreen;
  box-sizing: border-box;
}
```

# Walkthrough

1. Open `style.css`.
2. Find the `.content-box` selector and add `box-sizing: content-box;`.
3. Find the `.border-box` selector and add `box-sizing: border-box;`.
4. Save and refresh. Notice the content-box is wider because padding and border add to its total size.
5. Run the tests to verify the box-sizing properties.
