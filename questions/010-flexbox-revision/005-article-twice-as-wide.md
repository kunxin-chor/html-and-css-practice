# Question

You have a two-pane layout (`<div class="split">`) with a `.notes` pane and an `.article` pane. Both are supposed to absorb extra space when the window is wide — but the `.article` should absorb **twice as much** extra space as the `.notes` does.

Your task is to use the Flexbox property that controls how an item **absorbs remaining space**, and set numeric growth factors so that `.article` grows twice as fast as `.notes`.

Requirements:

1. Give `.notes` a growth factor of `1`.
2. Give `.article` a growth factor of `2`.

# Test Cases

```
describe('Article grows twice as fast as notes', () => {
  it('.notes should grow with factor 1', () => {
    const n = document.querySelector('.notes');
    expect(n).to.exist;
    expect(getComputedStyle(n).flexGrow).to.equal('1');
  });

  it('.article should grow with factor 2', () => {
    const a = document.querySelector('.article');
    expect(a).to.exist;
    expect(getComputedStyle(a).flexGrow).to.equal('2');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Split View</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="split">
      <section class="notes">Notes</section>
      <section class="article">Article</section>
    </div>
  </body>
</html>
```

## CSS

```css
.split {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #f5f6fa;
}

.notes {
  padding: 20px;
  background-color: #fab1a0;
  /* Grow, but only half as fast as the article */
}

.article {
  padding: 20px;
  background-color: #74b9ff;
  /* Grow twice as fast as the notes */
}
```

## Hints

- The property that controls how much **remaining space** a flex item absorbs takes a unitless **growth factor**.
- The factors are relative: if one item has `1` and another has `2`, the second item takes twice the share of remaining space the first one takes.

# Solution

```css
.notes {
  padding: 20px;
  background-color: #fab1a0;
  flex-grow: 1;
}

.article {
  padding: 20px;
  background-color: #74b9ff;
  flex-grow: 2;
}
```

# Walkthrough

1. Open `style.css` and find the `.notes` and `.article` rules.
2. Pick the Flexbox property that distributes **extra** space across items.
3. Give `.notes` the growth factor `1` and `.article` the growth factor `2`.
4. Save and resize the preview. The article pane should grow twice as fast as the notes pane.
5. Run the tests.
