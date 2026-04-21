# Question

You have a header bar (`<header class="bar">`) that is a flex container. It contains a tall logo block and a short tagline. Because the two children have different heights, the tagline currently sits along the top edge of the bar.

Your task is to make every child of `.bar` sit **vertically centered** along the cross axis, so the short tagline lines up with the middle of the taller logo.

Requirements:

1. Keep `.bar` as a flex container (`display: flex`).
2. Use the Flexbox property that **aligns children along the cross axis** with the value that centers them.

# Test Cases

```
describe('Header bar cross-axis alignment', () => {
  it('.bar should be a flex container', () => {
    const bar = document.querySelector('.bar');
    expect(bar).to.exist;
    expect(getComputedStyle(bar).display).to.equal('flex');
  });

  it('.bar children should be centered on the cross axis', () => {
    const bar = document.querySelector('.bar');
    expect(getComputedStyle(bar).alignItems).to.equal('center');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Header Bar</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header class="bar">
      <div class="logo">LOGO</div>
      <span class="tagline">Built for speed</span>
    </header>
  </body>
</html>
```

## CSS

```css
.bar {
  display: flex;
  gap: 16px;
  padding: 12px;
  background-color: #192a56;
  color: white;
  /* Vertically center the children */
}

.logo {
  width: 80px;
  height: 80px;
  background-color: #e1b12c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.tagline {
  font-style: italic;
}
```

## Hints

- `justify-content` handles the **main** axis. You want the **cross** axis — the one perpendicular to the direction items flow.
- The default main axis is horizontal, so its cross axis is vertical. The property you need aligns **items** along this cross axis.
- Pick the value that means "middle".

# Solution

```css
.bar {
  display: flex;
  gap: 16px;
  padding: 12px;
  background-color: #192a56;
  color: white;
  align-items: center;
}
```

# Walkthrough

1. Open `style.css` and find the `.bar` rule.
2. The children have different heights, so the shorter one needs to be pushed down to align with the taller one's middle.
3. Add `align-items: center;` — this centers every child along the cross axis (vertically, in a normal row).
4. Save. The tagline should now line up with the middle of the logo square.
5. Run the tests.
