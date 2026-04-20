# Question

Create a notification badge with **10px margin** and **12px padding** on all sides.

The HTML is provided with a `span` that has a class of `badge`. Add CSS to give it both margin and padding.

# Test Cases

```
describe('Badge margin and padding', () => {
  it('should have 10px margin on all sides', () => {
    const badge = document.querySelector('.badge');
    expect(badge).to.exist;
    const style = getComputedStyle(badge);
    expect(style.marginTop).to.equal('10px');
    expect(style.marginRight).to.equal('10px');
    expect(style.marginBottom).to.equal('10px');
    expect(style.marginLeft).to.equal('10px');
  });

  it('should have 12px padding on all sides', () => {
    const badge = document.querySelector('.badge');
    expect(badge).to.exist;
    const style = getComputedStyle(badge);
    expect(style.paddingTop).to.equal('12px');
    expect(style.paddingRight).to.equal('12px');
    expect(style.paddingBottom).to.equal('12px');
    expect(style.paddingLeft).to.equal('12px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Margin and Padding</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <span class="badge">New</span>
    <span>Some other content</span>
  </body>
</html>
```

## CSS

```css
.badge {
  background-color: #ff6b6b;
  color: white;
  border-radius: 4px;
  /* Add margin and padding here */
}
```

## Hints

- `margin` creates space outside the element.
- `padding` creates space inside the element.
- Both can be set with a single value for all sides.

# Solution

```css
.badge {
  background-color: #ff6b6b;
  color: white;
  border-radius: 4px;
  margin: 10px;
  padding: 12px;
}
```

# Walkthrough

1. Open `style.css`.
2. Find the `.badge` selector.
3. Add `margin: 10px;` to create space around the badge.
4. Add `padding: 12px;` to create space inside the badge.
5. Save and refresh. The badge should have space around it and comfortable internal spacing.
6. Run the tests to verify both margin and padding values.
