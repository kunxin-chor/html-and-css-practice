# Question

The page contains three elements, each with its own class: `.inline-el`, `.block-el`, and `.inline-block-el`. Each class already has `width: 100px`, `height: 50px`, and a background colour set.

Your task is to set the CSS `display` property on each of the three classes to the correct value so that the three elements each behave differently on the page:

1. **`.inline-el`** — must flow inline with the surrounding text, **just like a normal `<span>` does**. Because of this behaviour, even though `width` and `height` are set in the CSS, the browser will **ignore them** and the element will size itself purely to its content.
2. **`.block-el`** — must start on a **new line** and behave like a normal paragraph or `<div>`. It should take up the full width available in its parent unless a width is given, and it should **respect** the 100×50 dimensions declared in the CSS.
3. **`.inline-block-el`** — must be a "hybrid": it should **flow inline alongside text** (not start a new line), **but** it should **still respect** the 100×50 width and height declared in the CSS.

Use the `display` property with three different values — one per class.

# Test Cases

```
describe('Display types', () => {
  it('inline element should have inline display', () => {
    const el = document.querySelector('.inline-el');
    expect(el).to.exist;
    const style = getComputedStyle(el);
    expect(style.display).to.equal('inline');
  });

  it('block element should have block display', () => {
    const el = document.querySelector('.block-el');
    expect(el).to.exist;
    const style = getComputedStyle(el);
    expect(style.display).to.equal('block');
  });

  it('inline-block element should have inline-block display', () => {
    const el = document.querySelector('.inline-block-el');
    expect(el).to.exist;
    const style = getComputedStyle(el);
    expect(style.display).to.equal('inline-block');
  });

  it('all elements should have 100px width and 50px height', () => {
    const inline = document.querySelector('.inline-el');
    const block = document.querySelector('.block-el');
    const inlineBlock = document.querySelector('.inline-block-el');
    
    expect(getComputedStyle(inline).width).to.equal('100px');
    expect(getComputedStyle(block).width).to.equal('100px');
    expect(getComputedStyle(inlineBlock).width).to.equal('100px');
    expect(getComputedStyle(inline).height).to.equal('50px');
    expect(getComputedStyle(block).height).to.equal('50px');
    expect(getComputedStyle(inlineBlock).height).to.equal('50px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Display Types</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>
      Text before
      <span class="inline-el">Inline</span>
      text after
    </p>
    <div class="block-el">Block</div>
    <p>
      Text before
      <span class="inline-block-el">Inline-Block</span>
      text after
    </p>
  </body>
</html>
```

## CSS

```css
.inline-el {
  background-color: #ff9999;
  width: 100px;
  height: 50px;
  /* Add display here */
}

.block-el {
  background-color: #99ff99;
  width: 100px;
  height: 50px;
  /* Add display here */
}

.inline-block-el {
  background-color: #9999ff;
  width: 100px;
  height: 50px;
  /* Add display here */
}
```

## Hints

- The `display` property has several values. Three of them are especially common:
  - one makes an element behave like plain text inside a sentence (no new line, and the browser ignores width/height),
  - one makes an element behave like a paragraph or `<div>` (starts on a new line, respects width/height),
  - one is a hybrid that keeps the element in line with surrounding text **while still** respecting width and height.
- Match each of the three behaviours described in the question to the correct value.
- When the tests run, the elements that "ignore" width/height in behaviour will still report `100px`/`50px` in the CSS because that is what you declared — the tests only check the `display` value and the declared size, not the rendered size.

# Solution

```css
.inline-el {
  background-color: #ff9999;
  width: 100px;
  height: 50px;
  display: inline;
}

.block-el {
  background-color: #99ff99;
  width: 100px;
  height: 50px;
  display: block;
}

.inline-block-el {
  background-color: #9999ff;
  width: 100px;
  height: 50px;
  display: inline-block;
}
```

# Walkthrough

1. Open `style.css`.
2. Add `display: inline;` to `.inline-el`. Notice it ignores the width/height.
3. Add `display: block;` to `.block-el`. It takes full width and the set dimensions.
4. Add `display: inline-block;` to `.inline-block-el`. It flows with text but shows at 100x50px.
5. Save and refresh. Compare how each element behaves in the layout.
6. Run the tests to verify all display properties and dimensions.
