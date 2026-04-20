# Question

CSS offers several properties for changing how text looks. This exercise practises four of the most common ones.

Further reading (optional but recommended):

- [MDN: `font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) · [W3Schools](https://www.w3schools.com/cssref/pr_font_font-family.php)
- [MDN: `font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style) · [W3Schools](https://www.w3schools.com/cssref/pr_font_font-style.php)
- [MDN: `text-decoration`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) · [W3Schools](https://www.w3schools.com/cssref/pr_text_text-decoration.php)
- [MDN: `text-transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) · [W3Schools](https://www.w3schools.com/cssref/pr_text_text-transform.php)

The HTML contains four paragraphs, each with a different class. In `style.css`, write four class rules so that:

1. `.serif` — uses a **serif** font family (`font-family: serif`).
2. `.italic` — is shown in italics (`font-style: italic`).
3. `.underline` — has an underline (`text-decoration: underline`).
4. `.uppercase` — is transformed to all uppercase letters (`text-transform: uppercase`).

# Answer

Write one class rule per variant, each setting the matching property to the listed value.

# Test Cases

```
describe('Serif font', () => {
  it('.serif uses a serif font family', () => {
    const el = document.querySelector('.serif');
    expect(el).to.exist;
    expect(getComputedStyle(el).fontFamily.toLowerCase()).to.match(/serif/);
  });
});
```

```
describe('Italic text', () => {
  it('.italic has font-style italic', () => {
    const el = document.querySelector('.italic');
    expect(el).to.exist;
    expect(getComputedStyle(el).fontStyle).to.equal('italic');
  });
});
```

```
describe('Underlined text', () => {
  it('.underline has an underline decoration', () => {
    const el = document.querySelector('.underline');
    expect(el).to.exist;
    const deco = getComputedStyle(el).textDecorationLine || getComputedStyle(el).textDecoration;
    expect(deco).to.match(/underline/);
  });
});
```

```
describe('Uppercase text', () => {
  it('.uppercase has text-transform uppercase', () => {
    const el = document.querySelector('.uppercase');
    expect(el).to.exist;
    expect(getComputedStyle(el).textTransform).to.equal('uppercase');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Text Variants</title>
  </head>
  <body>
    <p class="serif">This paragraph should render in a serif font.</p>
    <p class="italic">This paragraph should render in italics.</p>
    <p class="underline">This paragraph should be underlined.</p>
    <p class="uppercase">this paragraph should appear all uppercase.</p>
  </body>
</html>
```

## CSS

```css
/* Add one rule per class: .serif, .italic, .underline, .uppercase */
```

## Hints

- `font-family` accepts a list of font names — the browser uses the first one it has available. Generic families like `serif`, `sans-serif`, and `monospace` always work.
- `font-style` is for italics. Bold goes through `font-weight`, not `font-style`.
- `text-decoration` is the shorthand for the line (underline / overline / line-through), its colour, and its style. For this question, just `text-decoration: underline;` is enough.
- `text-transform` changes capitalisation visually — the underlying text in the HTML stays the same.

# Solution

```css
.serif {
  font-family: serif;
}

.italic {
  font-style: italic;
}

.underline {
  text-decoration: underline;
}

.uppercase {
  text-transform: uppercase;
}
```

# Walkthrough

1. Open `style.css`.
2. Write `.serif { font-family: serif; }`.
3. Below it, add `.italic { font-style: italic; }`.
4. Add `.underline { text-decoration: underline; }`.
5. Add `.uppercase { text-transform: uppercase; }`.
6. Save and refresh — each paragraph should pick up its corresponding visual change.
