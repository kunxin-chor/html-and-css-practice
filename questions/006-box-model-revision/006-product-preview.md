# Question

The page already contains two `div` elements with the class `product-card`. Each card holds a product title and a price. Right now the two cards stack vertically and have no styling.

Build a small product preview row by adding CSS so that:

1. The two cards sit **next to each other on the same line**, not stacked. The layout mode you pick must still let you set a fixed width and inner spacing on each card.
2. Each card has a **fixed width of exactly 160 pixels**.
3. Inside each card, there are **10 pixels of empty space on every side between the card's edge and its text content**.
4. Each card is wrapped in a **thin light-gray outline**: 1 pixel thick, solid, coloured `#ccc`.
5. There is a **15-pixel gap to the right of each card** so the two cards are not touching. Do not add any extra space to the top, bottom, or left sides.
6. Each card has a **pure white background** (`#fff`).

# Test Cases

```
describe('Product preview cards', () => {
  it('there should be exactly two product cards', () => {
    const cards = document.querySelectorAll('.product-card');
    expect(cards.length).to.equal(2);
  });

  it('each card should use display: inline-block', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      expect(getComputedStyle(card).display).to.equal('inline-block');
    });
  });

  it('each card should have 10px padding on all sides', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const style = getComputedStyle(card);
      expect(style.paddingTop).to.equal('10px');
      expect(style.paddingRight).to.equal('10px');
      expect(style.paddingBottom).to.equal('10px');
      expect(style.paddingLeft).to.equal('10px');
    });
  });

  it('each card should have a 1px solid #ccc border', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const style = getComputedStyle(card);
      expect(style.borderTopWidth).to.equal('1px');
      expect(style.borderTopStyle).to.equal('solid');
      expect(style.borderTopColor).to.equal('rgb(204, 204, 204)');
    });
  });

  it('each card should have 15px margin-right', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      expect(getComputedStyle(card).marginRight).to.equal('15px');
    });
  });

  it('each card should be 160px wide with a white background', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      expect(getComputedStyle(card).width).to.equal('160px');
      expect(getComputedStyle(card).backgroundColor).to.equal('rgb(255, 255, 255)');
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
    <title>Product Preview</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="product-card">
      <h3>T-Shirt</h3>
      <p>$20</p>
    </div>
    <div class="product-card">
      <h3>Hoodie</h3>
      <p>$45</p>
    </div>
  </body>
</html>
```

## CSS

```css
.product-card {
  /* Add display, width, padding, border, margin-right, and background here */
}
```

## Hints

- By default, a `<div>` takes up the full width of its parent and stacks vertically. There is a CSS property that controls this, and one of its values makes elements flow horizontally **while still respecting width and inner spacing** (unlike the plain inline value, which ignores width).
- Use the `width` property with an exact pixel value to fix the size of the cards.
- When you only want to add outer space on one specific side, use the side-specific version of the outer-spacing property rather than the shorthand.
- All six requirements can be solved inside a single rule targeting `.product-card`.

# Solution

```css
.product-card {
  display: inline-block;
  width: 160px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 15px;
  background-color: #fff;
}
```

# Walkthrough

1. Open `style.css` and find the `.product-card` selector.
2. Add `display: inline-block;` so both cards line up horizontally.
3. Add `width: 160px;` to keep them uniformly sized.
4. Add `padding: 10px;` for internal spacing.
5. Add `border: 1px solid #ccc;` for the outline.
6. Add `margin-right: 15px;` for a gap between the two cards.
7. Add `background-color: #fff;` so the cards look clean.
8. Save and refresh. The two product cards should appear side by side with consistent spacing, borders, and padding.
9. Run the tests to confirm all six properties.
