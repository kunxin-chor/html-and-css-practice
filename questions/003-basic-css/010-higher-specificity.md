# Question

`!important` is a blunt instrument. A cleaner way to override a rule is to write a **more specific selector**. This question demonstrates the technique — without using `!important` at all.

The starting CSS already contains two broad rules that paint everything inside `#main` black / gray:

```css
#main p {
  color: black;
}

#main button {
  background-color: gray;
}
```

The HTML inside `#main` contains two paragraphs *and* a submit button:

```html
<div id="main">
  <p class="first">…</p>
  <p class="second">…</p>
  <button type="submit" class="cta">Send</button>
</div>
```

**Your task** — add **three** new rules (keep the existing two unchanged) so that:

1. The paragraph with class `first` becomes **red**.
2. The paragraph with class `second` becomes **green**.
3. The `<button type="submit">` gets a **purple** background (`rgb(128, 0, 128)`).

Each new rule must be **more specific** than the matching base rule. For the paragraphs, combine id + element + class. For the button, use an **attribute selector** so the selector matches *only* submit buttons. **Do not use `!important`.**

# Answer

- `#main p.first { color: red; }` — id + element + class beats `#main p`.
- `#main p.second { color: green; }` — same pattern.
- `#main button[type="submit"] { background-color: purple; }` — the attribute selector `[type="submit"]` raises specificity above `#main button`.

# Test Cases

```
describe('Paragraph overrides', () => {
  it('the first paragraph is red', () => {
    const el = document.querySelector('#main p.first');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 0, 0)');
  });

  it('the second paragraph is green', () => {
    const el = document.querySelector('#main p.second');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(0, 128, 0)');
  });
});
```

```
describe('Button override with attribute selector', () => {
  it('the submit button has a purple background', () => {
    const btn = document.querySelector('#main button[type="submit"]');
    expect(btn).to.exist;
    expect(getComputedStyle(btn).backgroundColor).to.equal('rgb(128, 0, 128)');
  });

  it('an attribute selector [type="submit"] is used in the CSS', () => {
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
    expect(allText).to.match(/\[type\s*=\s*["']?submit["']?\]/i);
  });
});
```

```
describe('No !important used', () => {
  it('no rule uses !important', () => {
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
    expect(allText).to.not.match(/!important/i);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Specificity</title>
  </head>
  <body>
    <div id="main">
      <p class="first">Should become red.</p>
      <p class="second">Should become green.</p>
      <button type="submit" class="cta">Send</button>
    </div>
  </body>
</html>
```

## CSS

```css
#main p {
  color: black;
}

#main button {
  background-color: gray;
}

/* Add three rules below — each MORE SPECIFIC than the matching base rule above.
   Don't use !important. */
```

## Hints

- Specificity is counted roughly as (inline, ids, classes + attributes + pseudo-classes, elements).
  - `#main p` → (0, 1, 0, 1). `#main p.first` → (0, 1, 1, 1) — adding a class wins.
  - `#main button` → (0, 1, 0, 1). `#main button[type="submit"]` → (0, 1, 1, 1) — the attribute selector also counts as a "class-level" bump.
- You can always beat a rule without `!important` by writing a more specific selector.
- **Attribute selectors** are written in square brackets: `[attr="value"]`. They're great for styling form controls without adding extra classes.

# Solution

```css
#main p {
  color: black;
}

#main button {
  background-color: gray;
}

#main p.first {
  color: red;
}

#main p.second {
  color: green;
}

#main button[type="submit"] {
  background-color: purple;
}
```

# Walkthrough

1. Leave the two existing rules (`#main p` and `#main button`) unchanged.
2. Add `#main p.first { color: red; }` — id + element + class beats id + element.
3. Add `#main p.second { color: green; }` — same idea for the other paragraph.
4. Add `#main button[type="submit"] { background-color: purple; }` — the `[type="submit"]` attribute selector bumps specificity above `#main button`.
5. Save and refresh — each element now gets the correct colour, and no `!important` is needed.
