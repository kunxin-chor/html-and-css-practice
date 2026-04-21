# Question

You have a navigation bar (`<nav class="nav">`) with four links inside. You want every link to **absorb an equal share of the remaining space**, using each link's natural content size as the starting size.

The three longhand values you want are:

- grow: `1`
- shrink: `1`
- basis: `auto`

Instead of writing three properties, use the **single shorthand** that sets all three at once. Here, the shorthand accepts the one-value form — a single unitless number — because `1` is a common shortcut for "grow 1, shrink 1, basis 0".

But wait: that shortcut changes the basis to `0`, which is **not** what you want. You want the basis to stay `auto`. So you need to write out the three tokens explicitly using the shorthand.

Requirements:

1. On `.nav a`, use the Flexbox shorthand property (not the three longhand ones) with the value `1 1 auto`.
2. Do not declare `flex-grow`, `flex-shrink`, or `flex-basis` separately on `.nav a`.

# Test Cases

```
describe('Nav links with shorthand flex', () => {
  it('.nav a should grow with factor 1', () => {
    const a = document.querySelector('.nav a');
    expect(a).to.exist;
    expect(getComputedStyle(a).flexGrow).to.equal('1');
  });

  it('.nav a should shrink with factor 1', () => {
    const a = document.querySelector('.nav a');
    expect(getComputedStyle(a).flexShrink).to.equal('1');
  });

  it('.nav a should keep an auto starting size', () => {
    const a = document.querySelector('.nav a');
    expect(getComputedStyle(a).flexBasis).to.equal('auto');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Nav</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav class="nav">
      <a href="#">Home</a>
      <a href="#">Products</a>
      <a href="#">About</a>
      <a href="#">Contact Us</a>
    </nav>
  </body>
</html>
```

## CSS

```css
.nav {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #2d3436;
}

.nav a {
  padding: 8px 12px;
  background-color: #0984e3;
  color: white;
  text-align: center;
  text-decoration: none;
  /* Grow & shrink equally, but keep the link's natural size as basis */
}
```

## Hints

- The shorthand `flex` property takes three tokens in this order: `<grow> <shrink> <basis>`.
- Writing `flex: 1;` is a shortcut that expands to `1 1 0`. You don't want a zero basis here — you want `auto`.
- Write all three tokens explicitly.

# Solution

```css
.nav a {
  padding: 8px 12px;
  background-color: #0984e3;
  color: white;
  text-align: center;
  text-decoration: none;
  flex: 1 1 auto;
}
```

# Walkthrough

1. Open `style.css` and find the `.nav a` rule.
2. Use the shorthand `flex` property with three tokens.
3. Write `flex: 1 1 auto;` — grow factor 1, shrink factor 1, basis auto (the link's natural size).
4. Save and preview. Longer links will be naturally wider, and extra space is split evenly between all links.
5. Run the tests.
