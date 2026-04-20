# Question

The HTML contains two paragraphs. Only the one with the class `highlight` should:

1. Have a yellow background (`yellow`).
2. Be displayed in bold.

The other paragraph must remain unstyled.

# Test Cases

```
describe('Highlighted paragraph', () => {
  it('should have a yellow background', () => {
    const el = document.querySelector('p.highlight');
    expect(el).to.exist;
    expect(getComputedStyle(el).backgroundColor).to.equal('rgb(255, 255, 0)');
  });

  it('should be bold', () => {
    const el = document.querySelector('p.highlight');
    expect(el).to.exist;
    const weight = getComputedStyle(el).fontWeight;
    // "bold" computes to 700 in most browsers
    expect(['bold', '700']).to.include(weight);
  });
});
```

```
describe('Non-highlighted paragraph', () => {
  it('should NOT have a yellow background', () => {
    const paragraphs = Array.from(document.querySelectorAll('p'));
    const plain = paragraphs.find(p => !p.classList.contains('highlight'));
    expect(plain, 'expected a paragraph without the highlight class').to.exist;
    expect(getComputedStyle(plain).backgroundColor).to.not.equal('rgb(255, 255, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Class Selector</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>This paragraph should look normal.</p>
    <p class="highlight">This paragraph should be highlighted.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- A class selector in CSS starts with a dot, e.g. `.myClass`.
- Only elements with `class="myClass"` will match.
- Use `font-weight: bold;` to make text bold.

# Solution

```css
.highlight {
  background-color: yellow;
  font-weight: bold;
}
```

# Walkthrough

1. Look at the HTML — only the second `<p>` has `class="highlight"`.
2. In `style.css`, write a class selector:
   - Pseudocode: `.highlight { ... }`
3. Inside the block, set `background-color: yellow;` and `font-weight: bold;`.
4. Because the first paragraph has no class, it will not match this selector and stays unstyled.
5. Refresh the preview and run the tests.
