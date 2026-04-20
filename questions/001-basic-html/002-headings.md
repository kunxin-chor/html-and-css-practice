# Question

Build a small page with two headings of different levels:

1. A top-level heading (`<h1>`) with the text `My Blog`.
2. A sub-heading (`<h2>`) with the text `My first post`.

The `<h2>` must appear **after** the `<h1>` in the document.

# Answer

Inside `<body>`, add an `<h1>` followed by an `<h2>` with the exact text above.

# Test Cases

```
describe('Top-level heading', () => {
  it('should contain exactly one <h1> that says "My Blog"', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).to.equal(1);
    expect(h1s[0].textContent.trim()).to.equal('My Blog');
  });
});
```

```
describe('Sub-heading', () => {
  it('should contain exactly one <h2> that says "My first post"', () => {
    const h2s = document.querySelectorAll('h2');
    expect(h2s.length).to.equal(1);
    expect(h2s[0].textContent.trim()).to.equal('My first post');
  });
});
```

```
describe('Heading order', () => {
  it('the <h2> should appear after the <h1> in the document', () => {
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    expect(h1).to.exist;
    expect(h2).to.exist;
    const order = h1.compareDocumentPosition(h2);
    // Node.DOCUMENT_POSITION_FOLLOWING === 4
    expect(order & 4).to.equal(4);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Blog</title>
  </head>
  <body>
    <!-- Add your headings here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<h1>` is the most important heading; `<h2>` is the next level down.
- Both take their visible text between their opening and closing tags.
- Order matters in HTML — elements render in the order they appear in the source.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Blog</title>
  </head>
  <body>
    <h1>My Blog</h1>
    <h2>My first post</h2>
  </body>
</html>
```

# Walkthrough

1. Open `index.html` and find the `<body>` section.
2. Add the page title as an `<h1>`:
   - Pseudocode: `<h1>` + `My Blog` + `</h1>`
3. Below it, add the sub-heading as an `<h2>`:
   - Pseudocode: `<h2>` + `My first post` + `</h2>`
4. Make sure the `<h2>` is *after* the `<h1>` — the tests check document order.
5. Save, refresh the preview, and run the tests.
