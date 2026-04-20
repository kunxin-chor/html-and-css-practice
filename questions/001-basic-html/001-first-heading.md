# Question

Create a web page that displays the text **"Hello, World!"** as the main heading of the page.

Use the appropriate HTML element for a top-level heading.

# Answer

Edit `index.html` so that the page contains a single top-level heading with the text `Hello, World!`.

# Test Cases

```
describe('Main heading', () => {
  it('should contain exactly one <h1> element', () => {
    expect(document.querySelectorAll('h1').length).to.equal(1);
  });
});
```

```
describe('Heading text', () => {
  it('the <h1> should say "Hello, World!"', () => {
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent.trim()).to.equal('Hello, World!');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <!-- Write your heading here -->
  </body>
</html>
```

## CSS

```css
/* No CSS needed for this question */
```

## Hints

- The `<h1>` element is used for the most important heading on a page.
- The text goes between the opening `<h1>` and closing `</h1>` tags.
- Make sure the text matches exactly, including the comma and exclamation mark.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

# Walkthrough

1. Open `index.html`.
2. Find the `<body>` section — this is where visible content goes.
3. Inside `<body>`, add an `<h1>` element:
   - Pseudocode: `<h1>` + your text + `</h1>`
4. Put the exact text `Hello, World!` between the tags.
5. Save and refresh the preview. You should see large bold text.
6. Run the tests to confirm the `<h1>` exists and has the correct text.
