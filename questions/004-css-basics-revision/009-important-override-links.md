# Question

The CSS already contains a high-specificity rule that paints every link inside `#nav` red:

```css
#nav a {
  color: red;
}
```

You have a link with `class="external"` that should appear **blue** instead. Because `#nav a` (specificity 0,1,0,1) beats `.external` (0,0,1,0), a plain class rule would lose.

Use the `!important` keyword to force your class rule to win.

**Rules:**

1. Do **not** modify the existing `#nav a` rule.
2. Add a `.external` rule that sets `color: blue !important;`.

# Test Cases

```
describe('Override with !important', () => {
  it('the external link should be blue, not red', () => {
    const el = document.querySelector('a.external');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(0, 0, 255)');
  });
});
```

```
describe('!important is present', () => {
  it('a rule uses !important on color', () => {
    const sheets = Array.from(document.styleSheets);
    const allText = sheets
      .flatMap(s => {
        try {
          return Array.from(s.cssRules).map(r => r.cssText);
        } catch {
          return [];
        }
      })
      .join('\n');
    expect(allText).to.match(/color\s*:\s*blue\s*!important/i);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>!important</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav id="nav">
      <a href="/">Home</a>
      <a href="https://developer.mozilla.org" class="external">MDN (external)</a>
    </nav>
  </body>
</html>
```

## CSS

```css
#nav a {
  color: red;
}

/* Add a .external rule that wins using !important */
```

## Hints

- Cascade order (highest wins): **`!important` declaration → specificity → source order**.
- The `!important` flag goes after the value, before the semicolon: `color: blue !important;`.
- Use `!important` sparingly in real projects — prefer raising specificity (next question).

# Solution

```css
#nav a {
  color: red;
}

.external {
  color: blue !important;
}
```

# Walkthrough

1. Leave the `#nav a` rule in place.
2. Below it, add `.external { color: blue !important; }`.
3. Save and refresh — the external link turns blue even though the id-based rule is more specific.
