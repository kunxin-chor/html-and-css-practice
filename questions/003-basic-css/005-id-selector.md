# Question

The HTML contains an `<h1>` with `id="page-title"`. In `style.css`, use an **id selector** to style only that element:

1. Text colour must be `red`.
2. Text must be centered horizontally (`text-align: center`).

Any other text on the page should remain unchanged.

# Test Cases

```
describe('Styled heading', () => {
  it('the #page-title should be red', () => {
    const el = document.querySelector('#page-title');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 0, 0)');
  });

  it('the #page-title should be center-aligned', () => {
    const el = document.querySelector('#page-title');
    expect(el).to.exist;
    expect(getComputedStyle(el).textAlign).to.equal('center');
  });
});
```

```
describe('Other text untouched', () => {
  it('a paragraph without the id should not be red', () => {
    const p = document.querySelector('p');
    expect(p).to.exist;
    expect(getComputedStyle(p).color).to.not.equal('rgb(255, 0, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ID Selector</title>
  </head>
  <body>
    <h1 id="page-title">Welcome</h1>
    <p>This paragraph should not be affected.</p>
  </body>
</html>
```

## CSS

```css
/* Target the heading by its id */
```

## Hints

- An id selector starts with `#` followed by the id value — e.g. `#page-title`.
- There should only ever be **one** element with a given id in a document.
- Id selectors have higher specificity than class or element selectors.

# Solution

```css
#page-title {
  color: red;
  text-align: center;
}
```

# Walkthrough

1. Open `style.css`.
2. Write a new rule beginning with `#page-title { … }`.
3. Inside the braces, set `color: red;` and `text-align: center;`.
4. Save and refresh — the heading should turn red and be centered; the paragraph stays unchanged.
