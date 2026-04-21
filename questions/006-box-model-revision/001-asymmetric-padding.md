# Question

The page contains a blog post card (a `div` with the class `blog-card`). Right now the text sits flush against the edge of the card and the card has no outline.

Update the CSS so that:

1. There is **12 pixels of empty space above and below the text** inside the card.
2. There is **24 pixels of empty space to the left and right of the text** inside the card.
3. The whole card is wrapped in a **thin light-gray outline**. The outline must be exactly **1 pixel thick**, drawn as a solid line, and coloured `#ddd`.

The spacing you add must be on the **inside** of the card (between the card's edge and its text), not on the outside.

# Test Cases

```
describe('Blog card box model', () => {
  it('should have 12px padding top and bottom', () => {
    const card = document.querySelector('.blog-card');
    expect(card).to.exist;
    const style = getComputedStyle(card);
    expect(style.paddingTop).to.equal('12px');
    expect(style.paddingBottom).to.equal('12px');
  });

  it('should have 24px padding left and right', () => {
    const card = document.querySelector('.blog-card');
    const style = getComputedStyle(card);
    expect(style.paddingLeft).to.equal('24px');
    expect(style.paddingRight).to.equal('24px');
  });

  it('should have a 1px solid #ddd border on all sides', () => {
    const card = document.querySelector('.blog-card');
    const style = getComputedStyle(card);
    expect(style.borderTopWidth).to.equal('1px');
    expect(style.borderTopStyle).to.equal('solid');
    expect(style.borderTopColor).to.equal('rgb(221, 221, 221)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Asymmetric Padding</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="blog-card">
      <h3>Post Title</h3>
      <p>A short summary of the blog post.</p>
    </div>
  </body>
</html>
```

## CSS

```css
.blog-card {
  background-color: #fff;
  /* Add asymmetric padding and border here */
}
```

## Hints

- "Space on the inside of an element, between its edge and its content" is the box-model property you need — not the one for space outside the element.
- You do not have to set each side in a separate declaration. Think about whether there is a shorthand that lets you give one value for vertical sides and a different value for horizontal sides.
- An outline around the element is drawn by setting its width, its style (such as solid or dashed), and its colour.

# Solution

```css
.blog-card {
  background-color: #fff;
  padding: 12px 24px;
  border: 1px solid #ddd;
}
```

# Walkthrough

1. Open `style.css` and find the `.blog-card` selector.
2. Add `padding: 12px 24px;` — this gives 12px to top and bottom, and 24px to left and right.
3. Add `border: 1px solid #ddd;` for the outline.
4. Save and refresh. The card should feel taller inside horizontally than vertically.
5. Run the tests to confirm the exact padding and border values.
