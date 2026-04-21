# Question

The page has three `div` elements, all sharing the class `widget`. Right now they are cramped against each other with no outlines.

Write **a single CSS rule** that targets every widget and makes all three of them look the same. After your change, each widget must:

1. Have **15 pixels of empty space on every side between its edge and its text**.
2. Be wrapped in a **thin gray outline made of short dashes**. The outline is **1 pixel thick**, its style is dashed (not solid), and its colour is `#999`.
3. Have a **20-pixel gap below it** so that the next widget stacked underneath does not sit flush against it. There should be **no extra space** added to the top, left, or right sides of each widget — only below.

You must use only **one class selector** to apply the styles — do not write three separate rules.

# Test Cases

```
describe('Widget row box model', () => {
  it('all three widgets should exist', () => {
    const widgets = document.querySelectorAll('.widget');
    expect(widgets.length).to.equal(3);
  });

  it('each widget should have 15px padding on all sides', () => {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((w) => {
      const style = getComputedStyle(w);
      expect(style.paddingTop).to.equal('15px');
      expect(style.paddingRight).to.equal('15px');
      expect(style.paddingBottom).to.equal('15px');
      expect(style.paddingLeft).to.equal('15px');
    });
  });

  it('each widget should have a 1px dashed #999 border', () => {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((w) => {
      const style = getComputedStyle(w);
      expect(style.borderTopWidth).to.equal('1px');
      expect(style.borderTopStyle).to.equal('dashed');
      expect(style.borderTopColor).to.equal('rgb(153, 153, 153)');
    });
  });

  it('each widget should have 20px margin-bottom', () => {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((w) => {
      const style = getComputedStyle(w);
      expect(style.marginBottom).to.equal('20px');
    });
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Widget Row</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="widget">Widget A</div>
    <div class="widget">Widget B</div>
    <div class="widget">Widget C</div>
  </body>
</html>
```

## CSS

```css
/* Use a single selector to style all .widget elements */
```

## Hints

- A class selector (starts with `.`) will match every element that has that class, so one rule is enough to style all three widgets.
- There are two different box-model properties for spacing: one adds space on the **inside** of an element, and one adds space on the **outside**. This question uses both.
- Outlines have a `style` value. `solid` is the default shape, but there are others such as `dashed` and `dotted`.
- To add space on only one side of an element (rather than all four), there is a specific property that targets that side.

# Solution

```css
.widget {
  padding: 15px;
  border: 1px dashed #999;
  margin-bottom: 20px;
}
```

# Walkthrough

1. Open `style.css`.
2. Add a single rule for `.widget`.
3. Inside the braces, add `padding: 15px;`, `border: 1px dashed #999;`, and `margin-bottom: 20px;`.
4. Save and refresh. You should see three outlined boxes with breathing room inside and gaps between them.
5. Run the tests to verify padding, border, and margin-bottom on every widget.
