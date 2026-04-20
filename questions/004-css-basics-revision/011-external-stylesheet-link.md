# Question

The HTML is missing its connection to `style.css`. Inside the existing `<head>`, add a `<link>` tag that loads `style.css`:

```html
<link rel="stylesheet" href="style.css">
```

The starting `style.css` already makes every `<p>` green. The test simply verifies that the `<link>` tag is present and correctly formed.

# Test Cases

```
describe('Stylesheet link', () => {
  it('has a <link rel="stylesheet" href="style.css"> inside <head>', () => {
    const link = document.querySelector('head link[rel="stylesheet"][href="style.css"]');
    expect(link, 'expected <link rel="stylesheet" href="style.css"> in <head>').to.exist;
  });
});
```

```
describe('Styles applied', () => {
  it('paragraphs are green (from style.css)', () => {
    const p = document.querySelector('p');
    expect(p).to.exist;
    expect(getComputedStyle(p).color).to.equal('rgb(0, 128, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>External Stylesheet</title>
    <!-- Add the <link> to style.css here -->
  </head>
  <body>
    <h1>Greetings</h1>
    <p>The paragraphs below should be green once the stylesheet is linked.</p>
    <p>This one should be green too.</p>
  </body>
</html>
```

## CSS

```css
p {
  color: green;
}
```

## Hints

- The `<link>` element is self-closing — no closing tag.
- Three parts to get right: `rel="stylesheet"`, `href="style.css"`, and it must live inside `<head>`.
- `<link>` has no inner content — everything is in attributes.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>External Stylesheet</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Greetings</h1>
    <p>The paragraphs below should be green once the stylesheet is linked.</p>
    <p>This one should be green too.</p>
  </body>
</html>
```

# Walkthrough

1. Inside `<head>`, after the `<title>`, add a new line.
2. On that line, write `<link rel="stylesheet" href="style.css">`.
3. Save and refresh — the paragraphs should be green, and the link test passes.
