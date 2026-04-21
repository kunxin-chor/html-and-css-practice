# Question

You have a flex container (`.row`) with a fixed-size `.logo` on the left and a long `.title` on the right. When the container gets narrower than the sum of the two items' widths, the browser shrinks every flex item proportionally — including the logo, which distorts it.

Your task is to tell the logo that it is **not allowed to shrink** when space is tight, while leaving the title free to shrink as usual.

Requirements:

1. Use the Flexbox property that controls **how much an item is allowed to shrink** when there is not enough room.
2. Give `.logo` the value `0` so it keeps its size.
3. Do not change `.title` — it should keep the default shrinking behaviour.

# Test Cases

```
describe('Logo does not shrink', () => {
  it('.logo should refuse to shrink', () => {
    const logo = document.querySelector('.logo');
    expect(logo).to.exist;
    expect(getComputedStyle(logo).flexShrink).to.equal('0');
  });

  it('.title should keep the default shrink behaviour', () => {
    const title = document.querySelector('.title');
    expect(getComputedStyle(title).flexShrink).to.equal('1');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Logo Row</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="row">
      <div class="logo">LOGO</div>
      <h1 class="title">A very long article title that takes up lots of room</h1>
    </div>
  </body>
</html>
```

## CSS

```css
.row {
  display: flex;
  gap: 16px;
  padding: 12px;
  background-color: #f5f6fa;
  align-items: center;
}

.logo {
  width: 120px;
  height: 60px;
  background-color: #e84118;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  /* Do not allow this logo to shrink when space is tight */
}

.title {
  margin: 0;
  font-size: 1.2rem;
}
```

## Hints

- Flexbox has a dedicated property that is the **opposite** of `flex-grow`: it controls how eagerly an item gives up space when the container is too small.
- Its value is a **unitless number**. `1` (the default) means "shrink normally"; `0` means "refuse to shrink".

# Solution

```css
.logo {
  width: 120px;
  height: 60px;
  background-color: #e84118;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}
```

# Walkthrough

1. Open `style.css` and find the `.logo` rule.
2. Identify the Flexbox property that controls **shrinking** when space is short.
3. Add `flex-shrink: 0;` so the logo keeps its declared 120x60 size even when the row gets narrow.
4. Leave `.title` alone — its default `flex-shrink: 1` lets it give up space.
5. Save, shrink the preview window, and confirm the logo stays the same size.
6. Run the tests.
