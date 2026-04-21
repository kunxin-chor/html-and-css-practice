# Question

You have a navigation menu (`<nav class="menu">`) that contains four links. The parent `.menu` is already a flex container, but the links are currently laid out **side by side in a row**.

Your task is to make the links stack **vertically from top to bottom**, one per line, using Flexbox.

Requirements:

1. Keep `.menu` as a flex container (`display: flex`).
2. Use the Flexbox property that **controls the direction of the main axis** so children flow from **top to bottom** instead of left to right.

# Test Cases

```
describe('Vertical menu stack', () => {
  it('.menu should be a flex container', () => {
    const menu = document.querySelector('.menu');
    expect(menu).to.exist;
    expect(getComputedStyle(menu).display).to.equal('flex');
  });

  it('.menu children should flow top-to-bottom', () => {
    const menu = document.querySelector('.menu');
    expect(getComputedStyle(menu).flexDirection).to.equal('column');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Vertical Menu</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav class="menu">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Blog</a>
      <a href="#">Contact</a>
    </nav>
  </body>
</html>
```

## CSS

```css
.menu {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f1f2f6;
  /* Stack the links from top to bottom */
}

.menu a {
  padding: 8px 12px;
  background-color: #dff9fb;
  text-decoration: none;
  color: #130f40;
}
```

## Hints

- A flex container has a **main axis**. By default the main axis runs **horizontally** (left to right), which is why your links are in a row.
- One Flexbox property flips the main axis so it runs **vertically**. The value you want is the one that literally names a vertical arrangement.

# Solution

```css
.menu {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f1f2f6;
  flex-direction: column;
}

.menu a {
  padding: 8px 12px;
  background-color: #dff9fb;
  text-decoration: none;
  color: #130f40;
}
```

# Walkthrough

1. Open `style.css` and find the `.menu` rule.
2. `.menu` is already a flex container because of `display: flex`, but its main axis is horizontal.
3. Add `flex-direction: column;` to flip the main axis to vertical.
4. Save. The four links should now stack one on top of another.
5. Run the tests.
