# Question

Add two paragraphs of text to the page below the existing heading.

The first paragraph should say: `I am learning HTML.`
The second paragraph should say: `It is fun!`

# Test Cases

```
describe('Paragraph count', () => {
  it('should contain exactly two <p> elements', () => {
    expect(document.querySelectorAll('p').length).to.equal(2);
  });
});
```

```
describe('First paragraph', () => {
  it('should say "I am learning HTML."', () => {
    const p = document.querySelectorAll('p')[0];
    expect(p).to.exist;
    expect(p.textContent.trim()).to.equal('I am learning HTML.');
  });
});
```

```
describe('Second paragraph', () => {
  it('should say "It is fun!"', () => {
    const p = document.querySelectorAll('p')[1];
    expect(p).to.exist;
    expect(p.textContent.trim()).to.equal('It is fun!');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <!-- Add your paragraphs here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- Paragraphs use the `<p>` tag.
- Each paragraph should be its own `<p>...</p>` element.
- Place them **after** the `<h1>` but still **inside** `<body>`.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>I am learning HTML.</p>
    <p>It is fun!</p>
  </body>
</html>
```

# Walkthrough

1. Locate the comment in `<body>` that says where to add your paragraphs.
2. Replace the comment with your first paragraph element:
   - Pseudocode: `<p>` + text + `</p>`
3. On the next line, add the second paragraph the same way.
4. Double-check the text is exact — the tests compare character by character.
5. Save, refresh the preview, and run the tests.
