# Question

The HTML contains several paragraphs. Only the ones with the class `muted` should:

1. Have a gray text colour (`gray`).
2. Be displayed in italics.

Paragraphs without the `muted` class must remain unstyled.

# Answer

Use a class selector `.muted` in `style.css` with `color: gray;` and `font-style: italic;`.

# Test Cases

```
describe('Muted paragraphs', () => {
  it('elements with class "muted" should be gray', () => {
    const els = document.querySelectorAll('.muted');
    expect(els.length).to.be.at.least(1);
    els.forEach(el => {
      expect(getComputedStyle(el).color).to.equal('rgb(128, 128, 128)');
    });
  });

  it('elements with class "muted" should be italic', () => {
    const els = document.querySelectorAll('.muted');
    els.forEach(el => {
      expect(getComputedStyle(el).fontStyle).to.equal('italic');
    });
  });
});
```

```
describe('Other paragraphs', () => {
  it('paragraphs without the "muted" class should NOT be gray', () => {
    const plain = Array.from(document.querySelectorAll('p'))
      .find(p => !p.classList.contains('muted'));
    expect(plain, 'expected a paragraph without the muted class').to.exist;
    expect(getComputedStyle(plain).color).to.not.equal('rgb(128, 128, 128)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Muted class</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>This paragraph should look normal.</p>
    <p class="muted">This paragraph is a side comment.</p>
    <p>Another normal paragraph.</p>
    <p class="muted">Another side comment.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- Class selectors start with a dot: `.muted`.
- `color: gray;` computes to `rgb(128, 128, 128)`.
- `font-style: italic;` slants text — don't confuse it with `font-weight`, which is for bold.

# Solution

```css
.muted {
  color: gray;
  font-style: italic;
}
```

# Walkthrough

1. In `style.css`, add a rule with the selector `.muted`.
2. Inside the braces, set `color: gray;` and `font-style: italic;`.
3. Save and refresh — the two side-comment paragraphs turn gray and italic; the others stay untouched.
