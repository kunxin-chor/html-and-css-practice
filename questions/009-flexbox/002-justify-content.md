# Question

You have a toolbar (`<div class="toolbar">`) that is a flex container with three buttons inside. Right now all three buttons are bunched together on the left side of the toolbar.

Your task is to **spread the buttons out evenly across the main axis**, so the first button sits flush against the left edge, the last button sits flush against the right edge, and the middle button is centered — with equal empty space between each pair of buttons.

Requirements:

1. Keep `.toolbar` as a flex container (`display: flex`).
2. Use the Flexbox property that **positions children along the main axis** with a value that puts **equal space between each item** and **no space at the outer edges**.

# Test Cases

```
describe('Toolbar spacing', () => {
  it('.toolbar should be a flex container', () => {
    const bar = document.querySelector('.toolbar');
    expect(bar).to.exist;
    expect(getComputedStyle(bar).display).to.equal('flex');
  });

  it('.toolbar should place equal space between buttons with no outer gap', () => {
    const bar = document.querySelector('.toolbar');
    expect(getComputedStyle(bar).justifyContent).to.equal('space-between');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Toolbar</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="toolbar">
      <button>Back</button>
      <button>Home</button>
      <button>Next</button>
    </div>
  </body>
</html>
```

## CSS

```css
.toolbar {
  display: flex;
  padding: 12px;
  background-color: #2d3436;
  /* Spread the three buttons across the toolbar */
}

.toolbar button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #dfe6e9;
  color: #2d3436;
}
```

## Hints

- There is a Flexbox property dedicated to aligning children along the **main axis** (the direction the items flow).
- Several values are available; the one you want pushes the first item to the start, the last item to the end, and distributes the **remaining space between** the items.

# Solution

```css
.toolbar {
  display: flex;
  padding: 12px;
  background-color: #2d3436;
  justify-content: space-between;
}

.toolbar button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #dfe6e9;
  color: #2d3436;
}
```

# Walkthrough

1. Open `style.css` and find the `.toolbar` rule.
2. The container is already flex, so items flow along the horizontal main axis.
3. Add `justify-content: space-between;` — this puts the first button at the left edge, the last button at the right edge, and splits the remaining space evenly between the items.
4. Save and preview. The three buttons should now span the full width of the toolbar.
5. Run the tests.
