# Question

Below the existing heading, add **three** paragraphs of text, in this order:

1. `The Moon is Earth's only natural satellite.`
2. `It is about 384,400 km away on average.`
3. `A full orbit takes roughly 27 days.`

# Answer

Add three `<p>` elements inside the `<body>`, each containing the required text.

# Test Cases

```
describe('Paragraph count', () => {
  it('should contain exactly three <p> elements', () => {
    expect(document.querySelectorAll('p').length).to.equal(3);
  });
});
```

```
describe('Paragraph contents in order', () => {
  const expected = [
    "The Moon is Earth's only natural satellite.",
    'It is about 384,400 km away on average.',
    'A full orbit takes roughly 27 days.',
  ];
  expected.forEach((text, i) => {
    it('paragraph ' + (i + 1) + ' should say "' + text + '"', () => {
      const p = document.querySelectorAll('p')[i];
      expect(p).to.exist;
      expect(p.textContent.trim()).to.equal(text);
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
    <title>The Moon</title>
  </head>
  <body>
    <h1>The Moon</h1>
    <!-- Add three paragraphs here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- Each paragraph is its own `<p>...</p>` element.
- Order matters: the tests check `querySelectorAll('p')[i]`.
- Text is compared character-by-character.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>The Moon</title>
  </head>
  <body>
    <h1>The Moon</h1>
    <p>The Moon is Earth's only natural satellite.</p>
    <p>It is about 384,400 km away on average.</p>
    <p>A full orbit takes roughly 27 days.</p>
  </body>
</html>
```

# Walkthrough

1. Replace the comment with three `<p>` elements, one per line.
2. Put the sentences in the exact order from the brief.
3. Save, refresh, and run the tests.
