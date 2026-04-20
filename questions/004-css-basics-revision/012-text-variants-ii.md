# Question

This is the revision pair for the earlier text-variants exercise. It covers **four different** text-styling properties.

Further reading:

- [MDN: `font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) · [W3Schools](https://www.w3schools.com/cssref/pr_font_weight.php)
- [MDN: `line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) · [W3Schools](https://www.w3schools.com/cssref/pr_dim_line-height.php)
- [MDN: `letter-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) · [W3Schools](https://www.w3schools.com/cssref/pr_text_letter-spacing.php)
- [MDN: `text-decoration`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) · [W3Schools](https://www.w3schools.com/cssref/pr_text_text-decoration.php)

The HTML contains four paragraphs, each with a different class. In `style.css`, write four class rules so that:

1. `.bold` — `font-weight: bold`.
2. `.tall` — `line-height: 2`.
3. `.spaced` — `letter-spacing: 4px`.
4. `.strike` — `text-decoration: line-through`.

# Answer

Write one class rule per variant, each setting the matching property to the listed value.

# Test Cases

```
describe('Bold text', () => {
  it('.bold has font-weight bold', () => {
    const el = document.querySelector('.bold');
    expect(el).to.exist;
    const weight = getComputedStyle(el).fontWeight;
    expect(['bold', '700']).to.include(weight);
  });
});
```

```
describe('Tall line-height', () => {
  it('.tall has line-height 2 (doubled)', () => {
    const el = document.querySelector('.tall');
    expect(el).to.exist;
    const cs = getComputedStyle(el);
    const ratio = parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
    // Accept small floating-point error.
    expect(Math.abs(ratio - 2)).to.be.lessThan(0.05);
  });
});
```

```
describe('Letter spacing', () => {
  it('.spaced has letter-spacing 4px', () => {
    const el = document.querySelector('.spaced');
    expect(el).to.exist;
    expect(getComputedStyle(el).letterSpacing).to.equal('4px');
  });
});
```

```
describe('Strike-through text', () => {
  it('.strike has text-decoration line-through', () => {
    const el = document.querySelector('.strike');
    expect(el).to.exist;
    const deco = getComputedStyle(el).textDecorationLine || getComputedStyle(el).textDecoration;
    expect(deco).to.match(/line-through/);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Text Variants II</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p class="bold">This paragraph should be bold.</p>
    <p class="tall">This paragraph should have double line-height so the lines feel airy. Add more text here to actually see the effect across multiple wrapped lines.</p>
    <p class="spaced">This paragraph should have wider letter spacing.</p>
    <p class="strike">This paragraph should have a line through it.</p>
  </body>
</html>
```

## CSS

```css
/* Add one rule per class: .bold, .tall, .spaced, .strike */
```

## Hints

- `font-weight` controls boldness. Use `bold` (or a numeric value like `700`).
- `line-height` without units is a multiplier of the element's font size — `2` means "twice the font size".
- `letter-spacing` adds space between characters. Use a length like `4px`.
- `text-decoration` shorthand accepts `underline`, `line-through`, `overline`, `none`, etc.

# Solution

```css
.bold {
  font-weight: bold;
}

.tall {
  line-height: 2;
}

.spaced {
  letter-spacing: 4px;
}

.strike {
  text-decoration: line-through;
}
```

# Walkthrough

1. Open `style.css`.
2. Add `.bold { font-weight: bold; }`.
3. Add `.tall { line-height: 2; }`.
4. Add `.spaced { letter-spacing: 4px; }`.
5. Add `.strike { text-decoration: line-through; }`.
6. Save and refresh — each paragraph should take on its corresponding visual change.
