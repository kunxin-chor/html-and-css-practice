# Question

The page contains a site header (`<header class="site-header">`) and a long block of content underneath. Right now the header scrolls away with the rest of the page as soon as the user scrolls down.

Your job is to make the header **stay visible at the top of the browser window no matter how far the user scrolls**.

Requirements for the header:

1. Use the CSS `position` property with the value that **takes an element out of the normal document flow and pins it to the browser window**, so that scrolling the page does not move it.
2. The header must be anchored to the **top edge of the viewport** (0 pixels from the top).
3. The header must be anchored to the **left edge of the viewport** (0 pixels from the left).
4. The header must stretch across the **full width of the viewport** (`width: 100%`).

Do **not** change the styling of the rest of the page.

# Test Cases

```
describe('Fixed site header', () => {
  it('the header should stay at the top regardless of scrolling', () => {
    const header = document.querySelector('.site-header');
    expect(header).to.exist;
    expect(getComputedStyle(header).position).to.equal('fixed');
  });

  it('the header should be anchored to the top-left of the viewport', () => {
    const header = document.querySelector('.site-header');
    const style = getComputedStyle(header);
    expect(style.top).to.equal('0px');
    expect(style.left).to.equal('0px');
  });

  it('the header should span the full width of the viewport', () => {
    const header = document.querySelector('.site-header');
    expect(getComputedStyle(header).width).to.equal(String(window.innerWidth) + 'px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fixed Header</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header class="site-header">My Site</header>
    <main>
      <p>Scroll down to see the header stay in place.</p>
      <p style="height: 2000px;">Lots of content here...</p>
    </main>
  </body>
</html>
```

## CSS

```css
.site-header {
  background-color: #2c3e50;
  color: white;
  padding: 16px;
  /* Pin the header to the top of the viewport here */
}
```

## Hints

- The `position` property has several possible values. One of them attaches an element to the **browser window itself**, so the element stays put even when the page scrolls.
- Once you pick the right value, you still need to tell the browser *where* to stick it. That is what the `top` and `left` offset properties are for.
- `width: 100%` makes the element stretch the full width of its containing box — in this case, the viewport.

# Solution

```css
.site-header {
  background-color: #2c3e50;
  color: white;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

# Walkthrough

1. Open `style.css` and find the `.site-header` rule.
2. Add a `position` value that anchors the element to the viewport rather than to the normal page flow.
3. Add `top: 0;` and `left: 0;` so the header is anchored to the top-left corner of the window.
4. Add `width: 100%;` so the header spans the full width of the viewport.
5. Save and scroll the preview. The header should stay locked to the top while the content underneath scrolls.
6. Run the tests to confirm the position, offsets, and width.
