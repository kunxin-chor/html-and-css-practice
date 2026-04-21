# Question

You have a row of three cards inside a flex container (`.cards`). You want each `.card` to **start at 200 pixels wide** before any growing or shrinking is applied by the flex container.

Note: you are not allowed to use the `width` property here — the whole point is to set the item's **starting size along the main axis** using the proper Flexbox property, so it behaves predictably inside the flex layout.

Requirements:

1. Do **not** add a `width` declaration to `.card`.
2. Use the Flexbox property that sets an item's **initial main-axis size** (its "starting size" before growing or shrinking), with a value of `200px`.

# Test Cases

```
describe('Card initial size', () => {
  it('.card should set its starting main-axis size to 200px', () => {
    const card = document.querySelector('.card');
    expect(card).to.exist;
    expect(getComputedStyle(card).flexBasis).to.equal('200px');
  });

  it('.card should not use the width property', () => {
    const styleText = document.querySelector('style')?.textContent
      ?? Array.from(document.styleSheets)
           .flatMap(s => {
             try { return Array.from(s.cssRules); } catch (e) { return []; }
           })
           .map(r => r.cssText)
           .join('\n');
    expect(/\.card\s*\{[^}]*\bwidth\s*:/.test(styleText)).to.equal(false);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Cards</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="cards">
      <div class="card">One</div>
      <div class="card">Two</div>
      <div class="card">Three</div>
    </div>
  </body>
</html>
```

## CSS

```css
.cards {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #f5f6fa;
}

.card {
  padding: 20px;
  background-color: #40739e;
  color: white;
  /* Give each card a starting main-axis size of 200px (no width!) */
}
```

## Hints

- Setting `width` works in simple cases, but Flexbox has its own dedicated property for an item's **starting size** along the main axis.
- The name of the property literally describes what it is: the item's "basis" from which growing and shrinking is calculated.
- Use the pixel value requested in the question.

# Solution

```css
.card {
  padding: 20px;
  background-color: #40739e;
  color: white;
  flex-basis: 200px;
}
```

# Walkthrough

1. Open `style.css` and find the `.card` rule.
2. Avoid adding `width`; Flexbox items have a dedicated "starting size" property.
3. Add `flex-basis: 200px;` to set the initial main-axis size of each card.
4. Save. Each card should start at 200 pixels wide before any flex growing/shrinking takes effect.
5. Run the tests.
