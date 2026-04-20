# Question

Every question in this course uses a separate CSS file called `style.css`. In real projects, you connect an external stylesheet to an HTML document using a `<link>` element in `<head>`.

**Task:** inside the existing `<head>` of the HTML, add a `<link>` tag that loads `style.css`:

```html
<link rel="stylesheet" href="style.css">
```

You don't need to write any new CSS for this question — the starting `style.css` already sets `h1` to `blue`. The test simply verifies that the `<link>` tag is present and correctly formed.

# Answer

Add `<link rel="stylesheet" href="style.css">` inside `<head>`.

# Test Cases

```
describe('External stylesheet link', () => {
  it('has a <link rel="stylesheet" href="style.css"> inside <head>', () => {
    const link = document.querySelector('head link[rel="stylesheet"][href="style.css"]');
    expect(link, 'expected <link rel="stylesheet" href="style.css"> in <head>').to.exist;
  });
});
```

```
describe('Styling still works', () => {
  it('the <h1> is blue (from style.css)', () => {
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    expect(getComputedStyle(h1).color).to.equal('rgb(0, 0, 255)');
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
    <h1>Hello, stylesheet!</h1>
  </body>
</html>
```

## CSS

```css
h1 {
  color: blue;
}
```

## Hints

- The `<link>` element is self-closing — no closing tag.
- Three attributes to get right: `rel="stylesheet"`, `href="style.css"`, and it must live inside `<head>`.
- Unlike `<script>`, `<link>` does not take inner content — everything is in attributes.
- In this course the CSS is auto-applied even without the link for convenience, but you still need to add the link to pass this question's test.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>External Stylesheet</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Hello, stylesheet!</h1>
  </body>
</html>
```

# Walkthrough

1. Inside `<head>`, after the `<title>`, add a new line.
2. On that line, write `<link rel="stylesheet" href="style.css">`.
3. Save and refresh — the heading should be blue (it was already, via the injected styles), and the `<link>` test will now pass.
