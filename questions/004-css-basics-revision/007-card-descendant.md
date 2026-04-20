# Question

The HTML contains two `<p>` elements: one inside a `<div class="card">` and one outside.

Using a **descendant selector**, style **only the paragraphs inside `.card`** so that their text colour is `#555` (`rgb(85, 85, 85)`). The paragraph outside must keep its default colour.

# Test Cases

```
describe('Paragraphs inside .card', () => {
  it('each <p> inside .card is #555', () => {
    const els = document.querySelectorAll('.card p');
    expect(els.length).to.be.at.least(1);
    els.forEach(el => {
      expect(getComputedStyle(el).color).to.equal('rgb(85, 85, 85)');
    });
  });
});
```

```
describe('Paragraphs outside .card', () => {
  it('a <p> outside .card is NOT #555', () => {
    const outside = Array.from(document.querySelectorAll('p'))
      .find(p => !p.closest('.card'));
    expect(outside, 'expected a paragraph outside .card').to.exist;
    expect(getComputedStyle(outside).color).to.not.equal('rgb(85, 85, 85)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Card</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>This paragraph is outside the card.</p>

    <div class="card">
      <h2>Featured</h2>
      <p>This paragraph is inside the card and should look muted.</p>
    </div>
  </body>
</html>
```

## CSS

```css
/* Style only paragraphs inside a .card */
```

## Hints

- A descendant selector is `ancestor descendant` — two selectors separated by **whitespace**.
- `.card p` matches any `<p>` anywhere inside an element with class `card`, no matter how deeply nested.
- `p` alone (no ancestor) would colour **every** paragraph.

# Solution

```css
.card p {
  color: #555;
}
```

# Walkthrough

1. In `style.css`, add a rule with the selector `.card p`.
2. Set `color: #555;`.
3. Save and refresh — only the paragraph inside the card turns muted; the outside paragraph is unaffected.
