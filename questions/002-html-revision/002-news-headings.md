# Question

Build a small news page that mixes paragraphs in between the headings. Inside `<body>`, add — in this exact order:

1. An `<h1>` with the text `Tech News`.
2. A `<p>` with the text `Latest updates from the web.`
3. An `<h2>` with the text `JavaScript turns 30`.
4. A `<p>` with the text `A milestone for the language.`

# Answer

Add four elements in the order `<h1>` → `<p>` → `<h2>` → `<p>` with the required text.

# Test Cases

```
describe('Element order', () => {
  it('the first four elements inside <body> are h1, p, h2, p', () => {
    const tags = Array.from(document.body.children)
      .slice(0, 4)
      .map(el => el.tagName.toLowerCase());
    expect(tags).to.deep.equal(['h1', 'p', 'h2', 'p']);
  });
});
```

```
describe('Headings', () => {
  it('the <h1> says "Tech News"', () => {
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent.trim()).to.equal('Tech News');
  });

  it('the <h2> says "JavaScript turns 30"', () => {
    const h2 = document.querySelector('h2');
    expect(h2).to.exist;
    expect(h2.textContent.trim()).to.equal('JavaScript turns 30');
  });
});
```

```
describe('Paragraphs', () => {
  it('the first paragraph follows the h1 with the correct text', () => {
    const p = document.querySelectorAll('p')[0];
    expect(p).to.exist;
    expect(p.textContent.trim()).to.equal('Latest updates from the web.');
  });

  it('the second paragraph follows the h2 with the correct text', () => {
    const p = document.querySelectorAll('p')[1];
    expect(p).to.exist;
    expect(p.textContent.trim()).to.equal('A milestone for the language.');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tech News</title>
  </head>
  <body>
    <!-- Add your headings and paragraphs here, in order -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- HTML renders elements in the order they appear in the source — watch the order carefully.
- `<h1>` is for the page title, `<h2>` for a section heading. A paragraph `<p>` can sit directly between them.
- The tests check the tag order of the first four children of `<body>`.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tech News</title>
  </head>
  <body>
    <h1>Tech News</h1>
    <p>Latest updates from the web.</p>
    <h2>JavaScript turns 30</h2>
    <p>A milestone for the language.</p>
  </body>
</html>
```

# Walkthrough

1. Inside `<body>`, add `<h1>Tech News</h1>`.
2. Below it, add `<p>Latest updates from the web.</p>`.
3. Then `<h2>JavaScript turns 30</h2>`.
4. Finally, `<p>A milestone for the language.</p>`.
5. Save, refresh, and run the tests.
