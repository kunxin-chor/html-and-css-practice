# Question

The page has an `<h2>` with the class `title-right`. Align **only** that heading to the right using CSS. All other text on the page must keep its default left alignment.

# Answer

Use a class selector `.title-right` with `text-align: right;`.

# Test Cases

```
describe('Right-aligned heading', () => {
  it('the .title-right element has text-align: right', () => {
    const el = document.querySelector('.title-right');
    expect(el).to.exist;
    expect(getComputedStyle(el).textAlign).to.equal('right');
  });
});
```

```
describe('Other elements untouched', () => {
  it('paragraphs are NOT right-aligned', () => {
    const p = document.querySelector('p');
    expect(p).to.exist;
    expect(getComputedStyle(p).textAlign).to.not.equal('right');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Right Aligned</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h2 class="title-right">Announcements</h2>
    <p>We will be closed on Monday.</p>
    <p>New items arrive on Wednesday.</p>
  </body>
</html>
```

## CSS

```css
/* Add your styles here */
```

## Hints

- `text-align` controls horizontal alignment inside a block element.
- Valid values include `left`, `right`, `center`, and `justify`.
- Target the class, not the element, so the paragraphs aren't affected.

# Solution

```css
.title-right {
  text-align: right;
}
```

# Walkthrough

1. In `style.css`, add a rule for `.title-right`.
2. Set `text-align: right;`.
3. Save and refresh — the heading snaps to the right edge, paragraphs stay on the left.
