# Question

Style the page so that **every `<a>` element** on the page has the text colour `purple`.

# Answer

Add a rule in `style.css` using the element selector `a` and set `color: purple;`.

# Test Cases

```
describe('Link colour', () => {
  it('all <a> elements should be purple', () => {
    const links = document.querySelectorAll('a');
    expect(links.length).to.be.at.least(1);
    links.forEach(a => {
      expect(getComputedStyle(a).color).to.equal('rgb(128, 0, 128)');
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
    <title>Purple Links</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>Read the <a href="https://developer.mozilla.org">MDN docs</a>.</p>
    <p>Or visit <a href="https://web.dev">web.dev</a>.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- Selector for any `<a>` element is just `a`.
- Colour names work out of the box — `purple` computes to `rgb(128, 0, 128)`.

# Solution

```css
a {
  color: purple;
}
```

# Walkthrough

1. In `style.css`, add a new rule with the selector `a`.
2. Inside the braces, set `color: purple;`.
3. Save and refresh — every link on the page should now appear purple.
