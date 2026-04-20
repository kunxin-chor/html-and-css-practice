# Question

The CSS already contains a very specific rule:

```css
#special {
  color: red;
}
```

The element in the HTML is `<p id="special" class="danger">…</p>`. You need the paragraph to appear **green**, not red.

Because the id selector `#special` has higher specificity than a class selector, a plain `.danger { color: green; }` rule would lose. Use the `!important` keyword to force your class rule to win.

**Rules:**

1. Do **not** modify the existing `#special` rule.
2. Add a `.danger` rule that sets `color: green !important;`.

# Test Cases

```
describe('Override with !important', () => {
  it('the paragraph should end up green, not red', () => {
    const p = document.querySelector('#special');
    expect(p).to.exist;
    expect(getComputedStyle(p).color).to.equal('rgb(0, 128, 0)');
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
    expect(allText).to.match(/color\s*:\s*green\s*!important/i);
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
  </head>
  <body>
    <p id="special" class="danger">This text must end up green.</p>
  </body>
</html>
```

## CSS

```css
#special {
  color: red;
}

/* Add a .danger rule that wins using !important */
```

## Hints

- The cascade order (highest wins): **`!important` declaration → specificity → source order**.
- Without `!important`, `#special` (id, specificity 100) beats `.danger` (class, specificity 10).
- Write `color: green !important;` — the `!important` flag goes **after** the value, before the semicolon.
- `!important` should be used sparingly in real projects — prefer raising specificity first (see the next question).

# Solution

```css
#special {
  color: red;
}

.danger {
  color: green !important;
}
```

# Walkthrough

1. Leave the existing `#special` rule as-is.
2. Below it, add a new rule with selector `.danger`.
3. Inside the rule, write `color: green !important;`.
4. Save and refresh — the text turns green even though the id rule is more specific.
