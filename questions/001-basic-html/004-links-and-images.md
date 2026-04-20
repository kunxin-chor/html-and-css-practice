# Question

Add the following to the page:

1. A link that says `Visit Example` and goes to `https://example.com`.
2. An image with the source `https://picsum.photos/200/300` and the alt text `Placeholder image`.

# Answer

Use the `<a>` element for the link (with an `href` attribute) and the `<img>` element for the image (with `src` and `alt` attributes).

# Test Cases

```
describe('Link', () => {
  it('should have an <a> pointing to https://example.com with text "Visit Example"', () => {
    const a = document.querySelector('a');
    expect(a).to.exist;
    expect(a.getAttribute('href')).to.equal('https://example.com');
    expect(a.textContent.trim()).to.equal('Visit Example');
  });
});
```

```
describe('Image', () => {
  it('should have an <img> with the correct src', () => {
    const img = document.querySelector('img');
    expect(img).to.exist;
    expect(img.getAttribute('src')).to.equal('https://picsum.photos/200/300');
  });

  it('should have the correct alt text', () => {
    const img = document.querySelector('img');
    expect(img).to.exist;
    expect(img.getAttribute('alt')).to.equal('Placeholder image');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Links and Images</title>
  </head>
  <body>
    <h1>Links and Images</h1>
    <!-- Add your link and image here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<a href="URL">link text</a>` creates a clickable link.
- `<img src="URL" alt="description">` is a self-closing element — it has no closing tag.
- The `alt` attribute is required for accessibility.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Links and Images</title>
  </head>
  <body>
    <h1>Links and Images</h1>
    <a href="https://example.com">Visit Example</a>
    <img src="https://picsum.photos/200/300" alt="Placeholder image">
  </body>
</html>
```

# Walkthrough

1. Inside `<body>`, after the heading, add an anchor element:
   - Pseudocode: `<a href="...">...</a>`
   - Set `href` to `https://example.com` and the inner text to `Visit Example`.
2. Below the link, add the image:
   - Pseudocode: `<img src="..." alt="...">`
   - Set `src` to the placeholder URL and `alt` to `Placeholder image`.
3. Refresh the preview — you should see the text link and the image.
4. Run the tests to confirm the attributes match.
