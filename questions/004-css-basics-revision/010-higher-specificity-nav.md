# Question

This question is the revision pair for the earlier specificity exercise. Again — no `!important` allowed. You win purely by making selectors more specific.

The starting CSS already contains two broad rules:

```css
.nav a {
  color: black;
}

.card h2 {
  color: black;
}
```

The HTML looks like this:

```html
<nav class="nav">
  <a href="/" class="active">Home</a>
  <a href="/about">About</a>
</nav>

<div class="card">
  <h2 id="title">Welcome</h2>
  <h2>Another section</h2>
</div>
```

**Your task** — add **two** new rules (keep the existing two unchanged) so that:

1. The link inside `.nav` that has class `active` becomes **red**.
2. The `<h2>` inside `.card` that has `id="title"` becomes **blue**.

The other `<a>` and the other `<h2>` must stay black.

Use two different specificity-raising patterns: **add a class to the descendant** for the link, and **add an id to the descendant** for the heading. **Do not use `!important`.**

# Answer

- `.nav a.active { color: red; }` — class added to the descendant raises specificity above `.nav a`.
- `.card h2#title { color: blue; }` — id added to the descendant raises specificity above `.card h2`.

# Test Cases

```
describe('Active nav link', () => {
  it('the active link is red', () => {
    const el = document.querySelector('.nav a.active');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 0, 0)');
  });

  it('the other nav link is still black', () => {
    const other = Array.from(document.querySelectorAll('.nav a'))
      .find(a => !a.classList.contains('active'));
    expect(other).to.exist;
    expect(getComputedStyle(other).color).to.equal('rgb(0, 0, 0)');
  });
});
```

```
describe('Title heading', () => {
  it('the h2#title is blue', () => {
    const el = document.querySelector('.card h2#title');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(0, 0, 255)');
  });

  it('the other h2 in the card is still black', () => {
    const other = Array.from(document.querySelectorAll('.card h2'))
      .find(h => h.id !== 'title');
    expect(other).to.exist;
    expect(getComputedStyle(other).color).to.equal('rgb(0, 0, 0)');
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
    <title>Specificity Revision</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav class="nav">
      <a href="/" class="active">Home</a>
      <a href="/about">About</a>
    </nav>

    <div class="card">
      <h2 id="title">Welcome</h2>
      <h2>Another section</h2>
    </div>
  </body>
</html>
```

## CSS

```css
.nav a {
  color: black;
}

.card h2 {
  color: black;
}

/* Add two more rules below — each MORE SPECIFIC than the matching base rule above.
   Don't use !important. */
```

## Hints

- Specificity roughly: (inline, ids, classes + attributes + pseudo-classes, elements).
  - `.nav a` → (0, 0, 1, 1). `.nav a.active` → (0, 0, 2, 1) — class on the descendant wins.
  - `.card h2` → (0, 0, 1, 1). `.card h2#title` → (0, 1, 1, 1) — id on the descendant wins (and by a lot).
- The two solutions use *different* specificity-raising patterns: adding a class vs adding an id.

# Solution

```css
.nav a {
  color: black;
}

.card h2 {
  color: black;
}

.nav a.active {
  color: red;
}

.card h2#title {
  color: blue;
}
```

# Walkthrough

1. Leave the two existing rules in place.
2. Add `.nav a.active { color: red; }` — a class added to the descendant bumps specificity enough to beat `.nav a`.
3. Add `.card h2#title { color: blue; }` — an id added to the descendant beats `.card h2` decisively.
4. Save and refresh — the active link turns red, the title heading turns blue, nothing else changes.
