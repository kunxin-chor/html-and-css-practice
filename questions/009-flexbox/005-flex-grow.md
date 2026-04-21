# Question

You have a layout with three columns inside a flex container (`.layout`): `.side-left`, `.main`, and `.side-right`. The two sides are narrow and their widths should stay roughly as-is. The main column, however, should **expand to take up all the leftover space** in the row as the container grows.

Your task is to tell the main column that it is allowed to **grow** and consume the remaining free space, while the two sides do not grow.

Requirements:

1. Use the Flexbox property that controls **how much remaining space an item absorbs** relative to its siblings.
2. Give `.main` a growth factor of `1` so it expands to fill the free space.
3. Do not add the same property to `.side-left` or `.side-right` — leave them at their default (they should not grow).

# Test Cases

```
describe('Main column expansion', () => {
  it('.main should be allowed to absorb remaining space (flex-grow: 1)', () => {
    const main = document.querySelector('.main');
    expect(main).to.exist;
    expect(getComputedStyle(main).flexGrow).to.equal('1');
  });

  it('.side-left should keep the default non-growing behaviour', () => {
    const left = document.querySelector('.side-left');
    expect(getComputedStyle(left).flexGrow).to.equal('0');
  });

  it('.side-right should keep the default non-growing behaviour', () => {
    const right = document.querySelector('.side-right');
    expect(getComputedStyle(right).flexGrow).to.equal('0');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Three-column Layout</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="layout">
      <aside class="side-left">L</aside>
      <section class="main">Main content</section>
      <aside class="side-right">R</aside>
    </div>
  </body>
</html>
```

## CSS

```css
.layout {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #dcdde1;
}

.side-left,
.side-right {
  width: 80px;
  padding: 20px;
  background-color: #718093;
  color: white;
  text-align: center;
}

.main {
  padding: 20px;
  background-color: #44bd32;
  color: white;
  /* Let this column take up all remaining space */
}
```

## Hints

- There is a single Flexbox property on the child that tells it: "take a share of the **leftover** free space in the container."
- Its value is a **unitless number** describing the growth factor. `0` means "do not grow" (the default); `1` means "take all the remaining space" if no other sibling also wants to grow.

# Solution

```css
.main {
  padding: 20px;
  background-color: #44bd32;
  color: white;
  flex-grow: 1;
}
```

# Walkthrough

1. Open `style.css` and find the `.main` rule.
2. Think about which property controls how a flex item **absorbs free space**.
3. Add `flex-grow: 1;` so `.main` takes up all the remaining horizontal space inside `.layout`.
4. Leave `.side-left` and `.side-right` alone — their default `flex-grow: 0` keeps them at their natural width.
5. Save and preview. Resize the window and notice that only the main column grows.
6. Run the tests.
