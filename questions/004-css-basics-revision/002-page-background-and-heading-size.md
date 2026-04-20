# Question

Style the page so that:

1. The page background colour is light gray (`#f0f0f0`).
2. All `<h2>` elements have a font size of exactly `32px`.

# Test Cases

```
describe('Body background', () => {
  it('the body background should be #f0f0f0', () => {
    expect(getComputedStyle(document.body).backgroundColor).to.equal('rgb(240, 240, 240)');
  });
});
```

```
describe('Heading font size', () => {
  it('every <h2> should have font-size: 32px', () => {
    const h2s = document.querySelectorAll('h2');
    expect(h2s.length).to.be.at.least(1);
    h2s.forEach(h2 => {
      expect(getComputedStyle(h2).fontSize).to.equal('32px');
    });
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Background + Heading</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Main title</h1>
    <h2>First section</h2>
    <p>Some content.</p>
    <h2>Second section</h2>
    <p>More content.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- Hex value `#f0f0f0` equals `rgb(240, 240, 240)`.
- Font sizes take length units — here, `px` (pixels).
- Use `body` as the selector for the page background, not `html`.

# Solution

```css
body {
  background-color: #f0f0f0;
}

h2 {
  font-size: 32px;
}
```

# Walkthrough

1. In `style.css`, add a `body` rule with `background-color: #f0f0f0;`.
2. Add an `h2` rule with `font-size: 32px;`.
3. Save and refresh — the page turns light gray and both section headings grow to 32px.
