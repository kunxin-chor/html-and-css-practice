# Question

You have a two-column layout (`<div class="layout">`) with a `.sidebar` and a `.content` area. You want the sidebar's **starting main-axis size** to be `25%` of the container (so it scales with the layout, not a hard pixel value).

You must not use the `width` property — use the Flexbox property that sets an item's **initial main-axis size** before growing/shrinking is applied.

Requirements:

1. Do **not** declare `width` on `.sidebar`.
2. Use the Flexbox property that sets the **starting size** of a flex item, with the value `25%`.

# Test Cases

```
describe('Sidebar starting size', () => {
  it('.sidebar should use a 25% starting main-axis size', () => {
    const s = document.querySelector('.sidebar');
    expect(s).to.exist;
    expect(getComputedStyle(s).flexBasis).to.equal('25%');
  });

  it('.sidebar should not declare the width property', () => {
    const styleText = Array.from(document.styleSheets)
      .flatMap(s => {
        try { return Array.from(s.cssRules); } catch (e) { return []; }
      })
      .map(r => r.cssText)
      .join('\n');
    expect(/\.sidebar\s*\{[^}]*\bwidth\s*:/.test(styleText)).to.equal(false);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sidebar Layout</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">Sidebar</aside>
      <main class="content">Content</main>
    </div>
  </body>
</html>
```

## CSS

```css
.layout {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #f5f6fa;
}

.sidebar {
  padding: 20px;
  background-color: #30336b;
  color: white;
  /* Give the sidebar a starting size of 25% (no width!) */
}

.content {
  padding: 20px;
  background-color: #95afc0;
  flex-grow: 1;
}
```

## Hints

- Flexbox has a property for an item's **starting size** along the main axis, named after the word "basis".
- Its value can be any CSS length — including percentages.

# Solution

```css
.sidebar {
  padding: 20px;
  background-color: #30336b;
  color: white;
  flex-basis: 25%;
}
```

# Walkthrough

1. Open `style.css` and find the `.sidebar` rule.
2. Use the Flexbox "starting size" property instead of `width`.
3. Add `flex-basis: 25%;` so the sidebar starts at a quarter of the container's width.
4. Save and preview. The sidebar should occupy roughly 25% of the row width.
5. Run the tests.
