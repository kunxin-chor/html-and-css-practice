# Question

You have a tag cloud (`<div class="tags">`) that is a flex container with many `.tag` children. When the container is narrower than the combined width of the tags, they currently overflow the container on a single line.

Your task is to allow the tags to **wrap onto multiple lines**, *but in reverse order*: the first row of tags should sit at the **bottom** of the container, and additional rows should stack **upwards**.

Requirements:

1. Keep `.tags` as a flex container (`display: flex`).
2. Use the Flexbox property that controls wrapping, with the value that wraps items onto new lines **in reverse cross-axis order** (so new rows stack upward instead of downward).

# Test Cases

```
describe('Reverse-wrapping tag cloud', () => {
  it('.tags should be a flex container', () => {
    const t = document.querySelector('.tags');
    expect(t).to.exist;
    expect(getComputedStyle(t).display).to.equal('flex');
  });

  it('.tags should wrap items in reverse cross-axis order', () => {
    const t = document.querySelector('.tags');
    expect(getComputedStyle(t).flexWrap).to.equal('wrap-reverse');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tag Cloud</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="tags">
      <span class="tag">html</span>
      <span class="tag">css</span>
      <span class="tag">flexbox</span>
      <span class="tag">grid</span>
      <span class="tag">javascript</span>
      <span class="tag">typescript</span>
      <span class="tag">accessibility</span>
      <span class="tag">animation</span>
    </div>
  </body>
</html>
```

## CSS

```css
.tags {
  display: flex;
  gap: 8px;
  padding: 12px;
  width: 320px;
  background-color: #2f3640;
  /* Let the tags wrap, but stack new rows upward */
}

.tag {
  padding: 4px 10px;
  border-radius: 999px;
  background-color: #f1c40f;
  color: #2d3436;
  white-space: nowrap;
}
```

## Hints

- The wrap-controlling property has three values: one that disables wrapping, one that wraps downward, and one that wraps **upward**.
- The value you want literally has the word "reverse" in it.

# Solution

```css
.tags {
  display: flex;
  gap: 8px;
  padding: 12px;
  width: 320px;
  background-color: #2f3640;
  flex-wrap: wrap-reverse;
}
```

# Walkthrough

1. Open `style.css` and find the `.tags` rule.
2. Pick the Flexbox property that allows items to wrap to new lines.
3. Instead of the normal `wrap` value, use `wrap-reverse` so subsequent rows stack **upward**.
4. Save. The first row of tags should appear at the bottom of the container, with extra rows above it.
5. Run the tests.
