# Question

You have a row of four equal-width pill buttons inside a flex container (`.pills`). You want every button to:

- have a **starting main-axis size of `0`** (so content width does not matter),
- be allowed to **grow** with a factor of `1`,
- be allowed to **shrink** with a factor of `1`.

Instead of writing three separate properties (`flex-grow`, `flex-shrink`, `flex-basis`), use the **single shorthand property** that sets all three at once.

Requirements:

1. On `.pill`, use the Flexbox shorthand property (not the three individual properties) with the value `1 1 0`.
2. Do not declare `flex-grow`, `flex-shrink`, or `flex-basis` separately on `.pill`.

# Test Cases

```
describe('Equal-width pills via flex shorthand', () => {
  it('.pill should grow with factor 1', () => {
    const pill = document.querySelector('.pill');
    expect(pill).to.exist;
    expect(getComputedStyle(pill).flexGrow).to.equal('1');
  });

  it('.pill should shrink with factor 1', () => {
    const pill = document.querySelector('.pill');
    expect(getComputedStyle(pill).flexShrink).to.equal('1');
  });

  it('.pill should have a zero starting main-axis size', () => {
    const pill = document.querySelector('.pill');
    expect(getComputedStyle(pill).flexBasis).to.equal('0px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Equal Pills</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="pills">
      <button class="pill">New</button>
      <button class="pill">Popular</button>
      <button class="pill">Trending this week</button>
      <button class="pill">Top</button>
    </div>
  </body>
</html>
```

## CSS

```css
.pills {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #f1f2f6;
}

.pill {
  padding: 8px 12px;
  border: none;
  border-radius: 999px;
  background-color: #5352ed;
  color: white;
  /* Make every pill grow and shrink equally, starting from size 0 */
}
```

## Hints

- There is a Flexbox **shorthand** property whose name is simply `flex`. It bundles three longhand properties in this order: `<grow> <shrink> <basis>`.
- The target value for this question is three tokens separated by spaces.
- Do not also write the longhand versions — the shorthand must do the whole job.

# Solution

```css
.pill {
  padding: 8px 12px;
  border: none;
  border-radius: 999px;
  background-color: #5352ed;
  color: white;
  flex: 1 1 0;
}
```

# Walkthrough

1. Open `style.css` and find the `.pill` rule.
2. Instead of writing three properties, use the shorthand `flex` property.
3. Remember the order: `flex: <grow> <shrink> <basis>;`.
4. Write `flex: 1 1 0;` — each pill grows equally, shrinks equally, and starts at 0, so they end up the same width regardless of text length.
5. Save and preview. All four pills should be equal in width.
6. Run the tests.
