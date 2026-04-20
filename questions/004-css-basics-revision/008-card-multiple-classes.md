# Question

An element can have multiple classes at the same time — each class contributes its own styles.

The HTML contains a `<div>` with the class `card`. Your job:

1. **In the HTML**, add a second class `featured` to the div (so it ends up with `class="card featured"`).
2. **In `style.css`**, write two rules:
   - `.card` — `padding: 16px` and `border: 1px solid #ccc`
   - `.featured` — `background-color: yellow` and `font-weight: bold`

When combined, the div should appear with padding, a light border, a yellow background, and bold text.

# Answer

Add `featured` to the div's class list in the HTML, then define the two class rules in CSS.

# Test Cases

```
describe('Div classes', () => {
  it('the div has both classes "card" and "featured"', () => {
    const div = document.querySelector('div');
    expect(div).to.exist;
    expect(div.classList.contains('card'), 'missing card class').to.equal(true);
    expect(div.classList.contains('featured'), 'missing featured class').to.equal(true);
  });
});
```

```
describe('.card styles', () => {
  it('padding is 16px on all sides', () => {
    const div = document.querySelector('div');
    const cs = getComputedStyle(div);
    expect(cs.paddingTop).to.equal('16px');
    expect(cs.paddingBottom).to.equal('16px');
    expect(cs.paddingLeft).to.equal('16px');
    expect(cs.paddingRight).to.equal('16px');
  });

  it('border is 1px solid #ccc', () => {
    const div = document.querySelector('div');
    const cs = getComputedStyle(div);
    expect(cs.borderTopWidth).to.equal('1px');
    expect(cs.borderTopStyle).to.equal('solid');
    expect(cs.borderTopColor).to.equal('rgb(204, 204, 204)');
  });
});
```

```
describe('.featured styles', () => {
  it('background is yellow', () => {
    const div = document.querySelector('div');
    expect(getComputedStyle(div).backgroundColor).to.equal('rgb(255, 255, 0)');
  });

  it('text is bold', () => {
    const div = document.querySelector('div');
    const weight = getComputedStyle(div).fontWeight;
    expect(['bold', '700']).to.include(weight);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Multiple Classes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="card">
      <h2>Premium tier</h2>
      <p>Unlock advanced features.</p>
    </div>
  </body>
</html>
```

## CSS

```css
/* Write one rule per class */
```

## Hints

- Multiple classes go into the same `class` attribute, separated by spaces: `class="card featured"`.
- Don't create a single merged class like `card-featured` — the exercise is about combining class-based styles.
- Each class is its own selector in CSS.
- `border: 1px solid #ccc` is shorthand for three border properties.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Multiple Classes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="card featured">
      <h2>Premium tier</h2>
      <p>Unlock advanced features.</p>
    </div>
  </body>
</html>
```

```css
.card {
  padding: 16px;
  border: 1px solid #ccc;
}

.featured {
  background-color: yellow;
  font-weight: bold;
}
```

# Walkthrough

1. **HTML.** Change the div's class attribute to `class="card featured"`.
2. **CSS.** Write a `.card` rule with `padding: 16px;` and `border: 1px solid #ccc;`.
3. Write a `.featured` rule with `background-color: yellow;` and `font-weight: bold;`.
4. Save and refresh — the card now has padding, a light border, a yellow background, and bold text.
