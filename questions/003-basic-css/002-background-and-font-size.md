# Question

Style the page so that:

1. The page background is light yellow (`#ffffcc`).
2. All paragraphs have a font size of exactly `20px`.

# Answer

In `style.css`, target the `body` element for the background color and the `p` element for the font size.

# Test Cases

```
describe('Body background', () => {
  it('the body should have background color #ffffcc', () => {
    const bg = getComputedStyle(document.body).backgroundColor;
    expect(bg).to.equal('rgb(255, 255, 204)');
  });
});
```

```
describe('Paragraph font size', () => {
  it('paragraphs should have a font size of 20px', () => {
    const p = document.querySelector('p');
    expect(p).to.exist;
    expect(getComputedStyle(p).fontSize).to.equal('20px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Styling Basics</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Styling Basics</h1>
    <p>This paragraph should be 20 pixels tall.</p>
    <p>So should this one.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- `background-color` sets the background of an element.
- Hex color `#ffffcc` equals `rgb(255, 255, 204)`.
- `font-size` takes a length value like `20px`.

# Solution

```css
body {
  background-color: #ffffcc;
}

p {
  font-size: 20px;
}
```

# Walkthrough

1. Open `style.css`.
2. Add a rule for the `body` selector and set `background-color` to `#ffffcc`.
3. Add a second rule for the `p` selector and set `font-size` to `20px`.
   - Pseudocode:
     ```
     body { background-color: <color>; }
     p    { font-size: <size>; }
     ```
4. Save and refresh — you should see a pale yellow background and slightly larger paragraph text.
5. Run the tests to verify both the color and font size.
