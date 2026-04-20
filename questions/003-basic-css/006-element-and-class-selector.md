# Question

The HTML has two elements with `class="warning"` — one is a `<p>` and one is a `<div>`. Style **only the paragraph** that has the `warning` class so its text colour is `red`.

The `<div class="warning">` and any other elements must remain unchanged.

You must use a **combined selector** — an element tag plus a class — to do this (e.g. `tag.class`).

# Test Cases

```
describe('Warning paragraph', () => {
  it('the <p class="warning"> should be red', () => {
    const el = document.querySelector('p.warning');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 0, 0)');
  });
});
```

```
describe('Warning div untouched', () => {
  it('the <div class="warning"> should NOT be red', () => {
    const el = document.querySelector('div.warning');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.not.equal('rgb(255, 0, 0)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Element + Class</title>
  </head>
  <body>
    <p class="warning">This paragraph warning should be red.</p>
    <div class="warning">This div warning must stay the default colour.</div>
    <p>A regular paragraph.</p>
  </body>
</html>
```

## CSS

```css
/* Style only <p> elements that have the warning class */
```

## Hints

- `.warning` alone would match both the `<p>` and the `<div>` — too broad.
- `p.warning` (no space) means "an element that is a `<p>` **and** has the class `warning`".
- Combined selectors are one of the most common patterns in day-to-day CSS.

# Solution

```css
p.warning {
  color: red;
}
```

# Walkthrough

1. In `style.css`, start a new rule with `p.warning` as the selector.
2. Set `color: red;` inside the braces.
3. Save and refresh — only the paragraph with the warning class turns red; the div stays untouched.
