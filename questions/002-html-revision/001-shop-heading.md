# Question

Create a page whose main heading welcomes visitors to a small online shop. The page must contain a single top-level heading with the exact text:

`Welcome to the Bookshop`

# Answer

Use one `<h1>` element inside `<body>` with the required text.

# Test Cases

```
describe('Main heading', () => {
  it('should contain exactly one <h1>', () => {
    expect(document.querySelectorAll('h1').length).to.equal(1);
  });
});
```

```
describe('Heading text', () => {
  it('the <h1> should say "Welcome to the Bookshop"', () => {
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent.trim()).to.equal('Welcome to the Bookshop');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bookshop</title>
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

- The `<h1>` element is for the single most important heading on a page.
- Text goes between the opening `<h1>` and closing `</h1>` tags.
- The tests compare text exactly — capitalisation and spacing matter.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bookshop</title>
  </head>
  <body>
    <h1>Welcome to the Bookshop</h1>
  </body>
</html>
```

# Walkthrough

1. Open `index.html` and find the `<body>` section.
2. Inside `<body>`, add an `<h1>` element.
3. Place the exact text `Welcome to the Bookshop` between the tags.
4. Save, refresh the preview, and run the tests.
