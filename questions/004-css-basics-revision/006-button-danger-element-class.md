# Question

The HTML contains two elements with `class="danger"` — one is a `<button>` and one is a `<span>`. Style **only** the button so that:

1. Its background colour is `red`.
2. Its text colour is `white`.

The `<span class="danger">` must remain unstyled.

You must use a **combined element + class selector** (e.g. `tag.class`).

# Test Cases

```
describe('Dangerous button', () => {
  it('button.danger has a red background', () => {
    const el = document.querySelector('button.danger');
    expect(el).to.exist;
    expect(getComputedStyle(el).backgroundColor).to.equal('rgb(255, 0, 0)');
  });

  it('button.danger has white text', () => {
    const el = document.querySelector('button.danger');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 255, 255)');
  });
});
```

```
describe('Span untouched', () => {
  it('span.danger should NOT have a red background', () => {
    const el = document.querySelector('span.danger');
    expect(el).to.exist;
    expect(getComputedStyle(el).backgroundColor).to.not.equal('rgb(255, 0, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Danger</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>Status: <span class="danger">critical</span></p>
    <button class="danger">Delete account</button>
  </body>
</html>
```

## CSS

```css
/* Style only <button> elements that have the danger class */
```

## Hints

- `.danger` alone matches **both** the button and the span — too broad.
- `button.danger` (no space) means "an element that is a `<button>` AND has the class `danger`".

# Solution

```css
button.danger {
  background-color: red;
  color: white;
}
```

# Walkthrough

1. In `style.css`, add a new rule with the selector `button.danger`.
2. Set `background-color: red;` and `color: white;`.
3. Save and refresh — the button turns red with white text; the inline `<span>` stays untouched.
