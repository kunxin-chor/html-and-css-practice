# Question

Create a profile card with **15px margin**, **20px padding**, and a **1px solid gray border** on all sides.

The HTML is provided with a `div` that has a class of `profile-card`. Add CSS to give it all three box model properties.

# Test Cases

```
describe('Profile card box model', () => {
  it('should have 15px margin on all sides', () => {
    const card = document.querySelector('.profile-card');
    expect(card).to.exist;
    const style = getComputedStyle(card);
    expect(style.marginTop).to.equal('15px');
    expect(style.marginRight).to.equal('15px');
    expect(style.marginBottom).to.equal('15px');
    expect(style.marginLeft).to.equal('15px');
  });

  it('should have 20px padding on all sides', () => {
    const card = document.querySelector('.profile-card');
    const style = getComputedStyle(card);
    expect(style.paddingTop).to.equal('20px');
    expect(style.paddingRight).to.equal('20px');
    expect(style.paddingBottom).to.equal('20px');
    expect(style.paddingLeft).to.equal('20px');
  });

  it('should have a 1px solid gray border', () => {
    const card = document.querySelector('.profile-card');
    const style = getComputedStyle(card);
    expect(style.borderTopWidth).to.equal('1px');
    expect(style.borderTopStyle).to.equal('solid');
    expect(style.borderTopColor).to.equal('rgb(128, 128, 128)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Complete Box Model</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="profile-card">
      <h3>John Doe</h3>
      <p>Web Developer</p>
    </div>
  </body>
</html>
```

## CSS

```css
.profile-card {
  background-color: white;
  /* Add margin, padding, and border here */
}
```

## Hints

- The complete box model includes content, padding, border, and margin.
- Order from inside to outside: content → padding → border → margin.
- Use `border: 1px solid gray` for the border.

# Solution

```css
.profile-card {
  background-color: white;
  margin: 15px;
  padding: 20px;
  border: 1px solid gray;
}
```

# Walkthrough

1. Open `style.css`.
2. Find the `.profile-card` selector.
3. Add `margin: 15px;` for external spacing.
4. Add `padding: 20px;` for internal spacing.
5. Add `border: 1px solid gray;` for the outline.
6. Save and refresh. The card should be nicely spaced with a gray border.
7. Run the tests to verify all three properties.
