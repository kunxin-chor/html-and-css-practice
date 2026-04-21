# Question

The HTML contains a vertical bulleted list of four links inside a `<nav>`. Your task is to turn it into a **horizontal navigation bar** using only CSS.

After your changes, the page must look like this:

- The four items must sit **side by side on a single line**, not stacked vertically.
- The list must have **no bullet markers** in front of the items.
- The list must **start flush against the left edge** of the page — the browser's default indent on unordered lists must be removed.
- Each item must have **10 pixels of empty space on all sides between its edge and the link text**.
- Each item must be wrapped in a **thin dark outline**: 1 pixel thick, solid, coloured `#333`.
- There must be **8 pixels of space to the right of each item** so that the items do not touch each other. No extra space should be added to the top, bottom, or left sides of the items.

Size and outline settings on the items must actually take effect — so make sure you put them in a layout mode that respects width, height, and inner spacing.

# Test Cases

```
describe('Inline-block navigation', () => {
  it('all li items should use display: inline-block', () => {
    const items = document.querySelectorAll('nav li');
    expect(items.length).to.equal(4);
    items.forEach((li) => {
      expect(getComputedStyle(li).display).to.equal('inline-block');
    });
  });

  it('each li should have 10px padding on all sides', () => {
    const items = document.querySelectorAll('nav li');
    items.forEach((li) => {
      const style = getComputedStyle(li);
      expect(style.paddingTop).to.equal('10px');
      expect(style.paddingRight).to.equal('10px');
      expect(style.paddingBottom).to.equal('10px');
      expect(style.paddingLeft).to.equal('10px');
    });
  });

  it('each li should have a 1px solid #333 border', () => {
    const items = document.querySelectorAll('nav li');
    items.forEach((li) => {
      const style = getComputedStyle(li);
      expect(style.borderTopWidth).to.equal('1px');
      expect(style.borderTopStyle).to.equal('solid');
      expect(style.borderTopColor).to.equal('rgb(51, 51, 51)');
    });
  });

  it('each li should have 8px margin-right', () => {
    const items = document.querySelectorAll('nav li');
    items.forEach((li) => {
      expect(getComputedStyle(li).marginRight).to.equal('8px');
    });
  });

  it('the ul should have no list-style and no padding-left', () => {
    const ul = document.querySelector('nav ul');
    expect(ul).to.exist;
    const style = getComputedStyle(ul);
    expect(style.listStyleType).to.equal('none');
    expect(style.paddingLeft).to.equal('0px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Horizontal Nav</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </body>
</html>
```

## CSS

```css
nav ul {
  /* Remove bullets and default padding here */
}

nav li {
  /* Make horizontal, then add padding, border, and margin-right */
}
```

## Hints

- By default, each `<li>` is a block and stacks vertically. There is a CSS property that controls how an element is laid out — and one of its values makes elements flow horizontally **while still respecting width, inner spacing, and outlines**.
- Browsers add default indentation on `<ul>` elements. You can remove it by setting the appropriate side's inner spacing to `0`.
- There is a CSS property dedicated to the bullet/number markers on lists. One of its values means "no marker at all".
- To push items away from each other on only one side, use the side-specific form of the outer-spacing property.

# Solution

```css
nav ul {
  list-style-type: none;
  padding-left: 0;
}

nav li {
  display: inline-block;
  padding: 10px;
  border: 1px solid #333;
  margin-right: 8px;
}
```

# Walkthrough

1. Open `style.css`.
2. In the `nav ul` rule, add `list-style-type: none;` and `padding-left: 0;` to strip the default bullet styling.
3. In the `nav li` rule, add `display: inline-block;` so the items sit side-by-side.
4. Add `padding: 10px;` for internal spacing, `border: 1px solid #333;` for an outline, and `margin-right: 8px;` for gaps between items.
5. Save and refresh. The four links should appear in a neat horizontal row.
6. Run the tests to verify display, padding, border, margin-right, and list styling.
