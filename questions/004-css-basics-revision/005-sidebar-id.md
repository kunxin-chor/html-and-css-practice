# Question

The HTML contains an `<aside>` with `id="sidebar"`. Using an **id selector** in `style.css`, style only that element so that:

1. Its text colour is `white`.
2. Its background colour is `#333` (which computes to `rgb(51, 51, 51)`).

The `<main>` content must remain unchanged.

# Answer

Use `#sidebar { … }` — an id selector targets the element whose `id` attribute matches.

# Test Cases

```
describe('Sidebar styling', () => {
  it('#sidebar has white text', () => {
    const el = document.querySelector('#sidebar');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 255, 255)');
  });

  it('#sidebar has a #333 background', () => {
    const el = document.querySelector('#sidebar');
    expect(el).to.exist;
    expect(getComputedStyle(el).backgroundColor).to.equal('rgb(51, 51, 51)');
  });
});
```

```
describe('Main untouched', () => {
  it('<main> should not have the sidebar background', () => {
    const el = document.querySelector('main');
    expect(el).to.exist;
    expect(getComputedStyle(el).backgroundColor).to.not.equal('rgb(51, 51, 51)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sidebar</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <aside id="sidebar">
      <p>Links and filters go here.</p>
    </aside>
    <main>
      <h1>Main content</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </main>
  </body>
</html>
```

## CSS

```css
/* Style the sidebar by its id */
```

## Hints

- Id selectors start with `#`. The id value is the exact string in the `id` attribute.
- `#333` is shorthand for `#333333` and computes to `rgb(51, 51, 51)`.

# Solution

```css
#sidebar {
  color: white;
  background-color: #333;
}
```

# Walkthrough

1. In `style.css`, add a new rule starting with `#sidebar`.
2. Set `color: white;` and `background-color: #333;`.
3. Save and refresh — the sidebar turns dark gray with white text; `<main>` stays untouched.
