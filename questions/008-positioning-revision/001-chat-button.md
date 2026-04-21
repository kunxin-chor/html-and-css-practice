# Question

The page contains a floating help-chat button (`<button class="chat-button">Chat</button>`) and a lot of long content underneath. Right now the button sits in line with the other content and scrolls away with the page.

Your task is to make the button **hover in the bottom-left corner of the browser window at all times**, even as the user scrolls through the page.

Requirements:

1. Use the CSS `position` property with the value that **takes an element out of the normal document flow and locks it to the browser window**.
2. The button must be anchored **16 pixels above the bottom edge** of the viewport.
3. The button must be anchored **16 pixels away from the left edge** of the viewport.

# Test Cases

```
describe('Floating chat button', () => {
  it('should be pinned to the browser window', () => {
    const btn = document.querySelector('.chat-button');
    expect(btn).to.exist;
    expect(getComputedStyle(btn).position).to.equal('fixed');
  });

  it('should sit 16px from the bottom of the viewport', () => {
    const btn = document.querySelector('.chat-button');
    expect(getComputedStyle(btn).bottom).to.equal('16px');
  });

  it('should sit 16px from the left of the viewport', () => {
    const btn = document.querySelector('.chat-button');
    expect(getComputedStyle(btn).left).to.equal('16px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Chat Button</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <main>
      <h1>Help Center</h1>
      <p style="height: 2000px;">Lots of content to scroll through...</p>
    </main>
    <button class="chat-button">Chat</button>
  </body>
</html>
```

## CSS

```css
.chat-button {
  background-color: #27ae60;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 999px;
  /* Pin the button to the bottom-left of the viewport */
}
```

## Hints

- The `position` property has a value that attaches an element directly to the **browser window**, so scrolling the page does not move it.
- Once you pick the right value, tell the browser *where* to place it using offset properties. Here you want to anchor from the **bottom** and from the **left** edge of the viewport rather than from the top.

# Solution

```css
.chat-button {
  background-color: #27ae60;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 999px;
  position: fixed;
  bottom: 16px;
  left: 16px;
}
```

# Walkthrough

1. Open `style.css` and find the `.chat-button` rule.
2. Add a `position` value that locks the element to the viewport.
3. Add `bottom: 16px;` so it sits 16 pixels above the bottom edge.
4. Add `left: 16px;` so it sits 16 pixels away from the left edge.
5. Save and scroll the preview. The green Chat button should stay in the bottom-left corner while the content scrolls.
6. Run the tests.
