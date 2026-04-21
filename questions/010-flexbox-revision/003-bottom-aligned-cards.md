# Question

You have a row (`<div class="row">`) that is a flex container with three cards of different heights. Right now the cards line up along the top of the row, which looks uneven.

Your task is to make every child of `.row` sit along the **bottom edge** of the row (aligned along the cross axis to the end of the axis).

Requirements:

1. Keep `.row` as a flex container (`display: flex`).
2. Use the Flexbox property that aligns children along the **cross axis**, with the value that sticks them to the **end** of that axis (in a normal row, the bottom).

# Test Cases

```
describe('Bottom-aligned cards', () => {
  it('.row should be a flex container', () => {
    const row = document.querySelector('.row');
    expect(row).to.exist;
    expect(getComputedStyle(row).display).to.equal('flex');
  });

  it('.row children should align to the end of the cross axis', () => {
    const row = document.querySelector('.row');
    expect(getComputedStyle(row).alignItems).to.equal('flex-end');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Uneven Cards</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="row">
      <div class="card short">Short</div>
      <div class="card medium">Medium height</div>
      <div class="card tall">Tall card with more text inside</div>
    </div>
  </body>
</html>
```

## CSS

```css
.row {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #dff9fb;
  height: 200px;
  /* Align every card to the bottom of the row */
}

.card {
  width: 120px;
  padding: 12px;
  background-color: #22a6b3;
  color: white;
}

.short { height: 60px; }
.medium { height: 100px; }
.tall { height: 150px; }
```

## Hints

- `justify-content` handles the **main** axis. You need the one for the **cross** axis.
- Cross-axis alignment has a value that sticks items to the **end** of the axis (the opposite of the start).
- In a default row layout, the cross axis runs top-to-bottom, so the end of that axis is the bottom.

# Solution

```css
.row {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #dff9fb;
  height: 200px;
  align-items: flex-end;
}
```

# Walkthrough

1. Open `style.css` and find the `.row` rule.
2. Pick the property that aligns items along the cross axis.
3. Add `align-items: flex-end;` so every card's bottom edge sits on the bottom of the row.
4. Save. The three cards should now line up along the bottom instead of the top.
5. Run the tests.
