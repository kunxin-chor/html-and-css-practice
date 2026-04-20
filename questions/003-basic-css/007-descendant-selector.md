# Question

The HTML has two links — one inside a `<nav>` and one outside it.

Using a **descendant selector**, style **only the link inside `<nav>`** so that:

1. Its colour is `green`.
2. Its underline is removed (`text-decoration: none`).

The link outside `<nav>` must remain unchanged.

# Test Cases

```
describe('Nav link', () => {
  it('the <a> inside <nav> should be green', () => {
    const el = document.querySelector('nav a');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(0, 128, 0)');
  });

  it('the <a> inside <nav> should have no underline', () => {
    const el = document.querySelector('nav a');
    expect(el).to.exist;
    // text-decoration-line is the part we care about across browsers.
    const deco = getComputedStyle(el).textDecorationLine || getComputedStyle(el).textDecoration;
    expect(deco).to.match(/none/);
  });
});
```

```
describe('Outside link', () => {
  it('the link outside <nav> should NOT be green', () => {
    const outside = Array.from(document.querySelectorAll('a'))
      .find(a => !a.closest('nav'));
    expect(outside, 'expected a link outside <nav>').to.exist;
    expect(getComputedStyle(outside).color).to.not.equal('rgb(0, 128, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Descendant Selector</title>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
    </nav>
    <p>
      Read the <a href="https://developer.mozilla.org">MDN docs</a>.
    </p>
  </body>
</html>
```

## CSS

```css
/* Style only the link inside <nav> */
```

## Hints

- A descendant selector is written as `ancestor descendant` — two selectors separated by **whitespace**.
- `nav a` matches every `<a>` that is somewhere inside a `<nav>`, no matter how deeply nested.
- `a` alone would style **every** link on the page — too broad.

# Solution

```css
nav a {
  color: green;
  text-decoration: none;
}
```

# Walkthrough

1. In `style.css`, write a new rule whose selector is `nav a`.
2. Set `color: green;` and `text-decoration: none;`.
3. Save and refresh — only the navigation link turns green and loses its underline; the MDN link stays blue and underlined.
