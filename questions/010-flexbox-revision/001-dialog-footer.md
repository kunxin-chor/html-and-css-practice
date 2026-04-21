# Question

You are styling a dialog footer (`<footer class="actions">`) that contains two buttons. In the HTML the **primary** action (`<button class="primary">Confirm</button>`) comes first, and the **secondary** action (`<button class="secondary">Cancel</button>`) comes second.

However, the design requires the primary button to appear on the **right**, and the secondary button on the **left** — without changing the HTML order.

Your task is to use Flexbox to **reverse the visual order** of the children along the main axis.

Requirements:

1. Keep `.actions` as a flex container (`display: flex`).
2. Use the Flexbox property that controls the **direction of the main axis**, with the value that flips the horizontal flow so the first child renders on the **right** and subsequent children go to the left.

# Test Cases

```
describe('Dialog footer order', () => {
  it('.actions should be a flex container', () => {
    const el = document.querySelector('.actions');
    expect(el).to.exist;
    expect(getComputedStyle(el).display).to.equal('flex');
  });

  it('.actions should render children in reversed row order', () => {
    const el = document.querySelector('.actions');
    expect(getComputedStyle(el).flexDirection).to.equal('row-reverse');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dialog Footer</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <footer class="actions">
      <button class="primary">Confirm</button>
      <button class="secondary">Cancel</button>
    </footer>
  </body>
</html>
```

## CSS

```css
.actions {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f1f2f6;
  /* Flip the horizontal order so Confirm is on the right */
}

.primary {
  padding: 8px 16px;
  border: none;
  background-color: #0984e3;
  color: white;
}

.secondary {
  padding: 8px 16px;
  border: none;
  background-color: #dfe6e9;
  color: #2d3436;
}
```

## Hints

- You are **not** supposed to edit the HTML. Flexbox can flip the visual order of items on its own.
- The property that controls main-axis direction has a value that keeps the axis horizontal but runs it the **other way** (right to left).

# Solution

```css
.actions {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f1f2f6;
  flex-direction: row-reverse;
}
```

# Walkthrough

1. Open `style.css` and find the `.actions` rule.
2. `flex-direction` has four values: `row`, `row-reverse`, `column`, `column-reverse`.
3. To swap the horizontal order without touching the HTML, use `flex-direction: row-reverse;`.
4. Save. The Confirm button should now sit on the right and Cancel on the left.
5. Run the tests.
