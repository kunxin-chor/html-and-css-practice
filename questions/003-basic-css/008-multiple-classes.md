# Question

An element can have **multiple classes** at the same time — separate them with a space inside the single `class` attribute. Each class contributes its own styles.

The HTML contains a `<button>` with the class `btn`. Your job:

1. **In the HTML**, add a second class `primary` to the button (so it ends up with `class="btn primary"`).
2. **In `style.css`**, write two rules:
   - `.btn` — `padding: 10px 20px` and `border: none`
   - `.primary` — `background-color: blue` and `color: white`

When combined, the button should appear blue with white text, padded, and borderless.

# Answer

Add `primary` to the button's class list in the HTML, then define the two class rules in CSS.

# Test Cases

```
describe('Button classes', () => {
  it('the button has both classes "btn" and "primary"', () => {
    const btn = document.querySelector('button');
    expect(btn).to.exist;
    expect(btn.classList.contains('btn'), 'missing btn class').to.equal(true);
    expect(btn.classList.contains('primary'), 'missing primary class').to.equal(true);
  });
});
```

```
describe('.btn styles', () => {
  it('the button has 10px top/bottom and 20px left/right padding', () => {
    const btn = document.querySelector('button');
    const cs = getComputedStyle(btn);
    expect(cs.paddingTop).to.equal('10px');
    expect(cs.paddingBottom).to.equal('10px');
    expect(cs.paddingLeft).to.equal('20px');
    expect(cs.paddingRight).to.equal('20px');
  });

  it('the button has no border', () => {
    const btn = document.querySelector('button');
    expect(getComputedStyle(btn).borderStyle).to.equal('none');
  });
});
```

```
describe('.primary styles', () => {
  it('the button has a blue background', () => {
    const btn = document.querySelector('button');
    expect(getComputedStyle(btn).backgroundColor).to.equal('rgb(0, 0, 255)');
  });

  it('the button text is white', () => {
    const btn = document.querySelector('button');
    expect(getComputedStyle(btn).color).to.equal('rgb(255, 255, 255)');
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
  </head>
  <body>
    <button class="btn">Click me</button>
  </body>
</html>
```

## CSS

```css
/* Write one rule per class */
```

## Hints

- Multiple classes go into the **same** `class` attribute, separated by spaces: `class="btn primary"`.
- Don't invent a single class like `btn-primary` — the exercise is about *combining* class-based styles.
- Each class is its own selector in CSS: `.btn { … }` and `.primary { … }`.
- The order of classes in the HTML doesn't matter; what matters is whether both selectors match.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Multiple Classes</title>
  </head>
  <body>
    <button class="btn primary">Click me</button>
  </body>
</html>
```

```css
.btn {
  padding: 10px 20px;
  border: none;
}

.primary {
  background-color: blue;
  color: white;
}
```

# Walkthrough

1. **HTML.** Edit the button's class attribute to `class="btn primary"` (space between the two class names).
2. **CSS.** Write a `.btn` rule with `padding: 10px 20px;` and `border: none;`.
3. Write a `.primary` rule with `background-color: blue;` and `color: white;`.
4. Save and refresh — the button should appear blue with white text, padded, and borderless.
