# Question

Create three elements demonstrating different `display` behaviors:

1. `.inline-el`: Should display as `inline` (flows with text, cannot set width/height)
2. `.block-el`: Should display as `block` (takes full width, starts on new line)
3. `.inline-block-el`: Should display as `inline-block` (flows with text, but can set width/height)

All three should have `width: 100px`, `height: 50px`, and `background-color` set to see the difference.

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

- `inline`: Flows with text, ignores width/height properties.
- `block`: Takes full available width, respects width/height.
- `inline-block`: Flows with text like inline, but respects width/height.
- Notice how inline elements ignore the 100px width and 50px height settings.

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
