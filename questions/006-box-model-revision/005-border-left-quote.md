# Question

The page contains a `<blockquote>` with the class `featured-quote`. Style it so it stands out as a featured quote on a blog.

Requirements:

1. There must be a **red accent bar running down the left side only** of the quote. The bar is **3 pixels wide**, drawn as a solid line, and uses the colour `#e74c3c`. There must be **no outline at all on the top, right, or bottom** of the quote.
2. The text inside the quote must have **16 pixels of empty space on every side between the text and the edge of the quote box**.
3. There must be a **20-pixel vertical gap above and below the quote**, separating it from the paragraphs around it. At the same time, the quote must **not be pushed inwards** horizontally — it should stretch to the same left/right position as the surrounding paragraphs (no extra outer spacing on the left or right sides).
4. The quote should have a **very light gray background** with the colour `#f9f9f9`.

# Test Cases

```
describe('Featured quote styling', () => {
  it('should have a 3px solid #e74c3c left border', () => {
    const quote = document.querySelector('.featured-quote');
    expect(quote).to.exist;
    const style = getComputedStyle(quote);
    expect(style.borderLeftWidth).to.equal('3px');
    expect(style.borderLeftStyle).to.equal('solid');
    expect(style.borderLeftColor).to.equal('rgb(231, 76, 60)');
  });

  it('should have no border on top, right, or bottom', () => {
    const quote = document.querySelector('.featured-quote');
    const style = getComputedStyle(quote);
    expect(style.borderTopWidth).to.equal('0px');
    expect(style.borderRightWidth).to.equal('0px');
    expect(style.borderBottomWidth).to.equal('0px');
  });

  it('should have 16px padding on all sides', () => {
    const quote = document.querySelector('.featured-quote');
    const style = getComputedStyle(quote);
    expect(style.paddingTop).to.equal('16px');
    expect(style.paddingRight).to.equal('16px');
    expect(style.paddingBottom).to.equal('16px');
    expect(style.paddingLeft).to.equal('16px');
  });

  it('should have 20px margin-top and margin-bottom, 0px left and right', () => {
    const quote = document.querySelector('.featured-quote');
    const style = getComputedStyle(quote);
    expect(style.marginTop).to.equal('20px');
    expect(style.marginBottom).to.equal('20px');
    expect(style.marginLeft).to.equal('0px');
    expect(style.marginRight).to.equal('0px');
  });

  it('should have a #f9f9f9 background', () => {
    const quote = document.querySelector('.featured-quote');
    expect(getComputedStyle(quote).backgroundColor).to.equal('rgb(249, 249, 249)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Featured Quote</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>Some introductory text about design.</p>
    <blockquote class="featured-quote">
      Design is not just what it looks like and feels like. Design is how it works.
    </blockquote>
    <p>More content follows the quote.</p>
  </body>
</html>
```

## CSS

```css
.featured-quote {
  /* Style the quote here */
}
```

## Hints

- Outlines can be applied to all four sides at once, or to just one specific side. Since the accent bar is only on the left, look for the side-specific form of the outline property.
- There is a shorthand that lets you set the outer spacing with one value for the top/bottom sides and a different value for the left/right sides in a single line.
- `0` is a valid value on its own — you do not need to write `0px` for sides that should have no spacing.
- The background colour is a single CSS property set to the hex value `#f9f9f9`.

# Solution

```css
.featured-quote {
  border-left: 3px solid #e74c3c;
  padding: 16px;
  margin: 20px 0;
  background-color: #f9f9f9;
}
```

# Walkthrough

1. Open `style.css` and find `.featured-quote`.
2. Add `border-left: 3px solid #e74c3c;` for the red accent bar.
3. Add `padding: 16px;` for internal spacing.
4. Add `margin: 20px 0;` — 20px top and bottom, 0px left and right.
5. Add `background-color: #f9f9f9;` for the light gray fill.
6. Save and refresh. The quote should stand out with a red left border and breathing room around it.
7. Run the tests to verify all border, padding, margin, and background values.
