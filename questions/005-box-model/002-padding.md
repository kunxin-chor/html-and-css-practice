# Question

Create a box with **16px padding** on all sides. The box should have a visible background color and a border so the padding effect is clear.

The HTML is provided with a `div` that has a class of `card`. Add CSS to give it the required padding.

# Test Cases

```
describe('Card padding', () => {
  it('should have 16px padding on all sides', () => {
    const card = document.querySelector('.card');
    expect(card).to.exist;
    const style = getComputedStyle(card);
    expect(style.paddingTop).to.equal('16px');
    expect(style.paddingRight).to.equal('16px');
    expect(style.paddingBottom).to.equal('16px');
    expect(style.paddingLeft).to.equal('16px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Padding Practice</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="card">Content inside the card</div>
  </body>
</html>
```

## CSS

```css
.card {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  /* Add padding here */
}
```

## Hints

- `padding` is the space inside an element, between content and border.
- You can set all padding at once with `padding: 16px`.
- The background color extends into the padding area.

# Solution

```css
.card {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 16px;
}
```

# Walkthrough

1. Open `style.css`.
2. Find the `.card` selector — it has a background and border.
3. Add `padding: 16px;` inside the braces.
4. Save and refresh. Notice how the text has breathing room inside the card.
5. Run the tests to verify all four padding values are 16px.
