# Question

You have a chat row (`<div class="chat-row">`) that is a flex container. Inside, a small circular `.avatar` sits next to a long `.message`. When the container is narrow, the avatar currently gets squashed into an oval because the browser shrinks every flex item proportionally.

Your task is to tell the avatar that it must **never shrink**, no matter how cramped the row gets. The message should still be allowed to shrink as usual.

Requirements:

1. Use the Flexbox property that controls **how much an item is allowed to shrink**.
2. Give `.avatar` the value `0` so it keeps its declared size.
3. Do not change `.message` — it should keep the default shrinking behaviour.

# Test Cases

```
describe('Avatar does not shrink', () => {
  it('.avatar should refuse to shrink', () => {
    const a = document.querySelector('.avatar');
    expect(a).to.exist;
    expect(getComputedStyle(a).flexShrink).to.equal('0');
  });

  it('.message should keep the default shrink behaviour', () => {
    const m = document.querySelector('.message');
    expect(getComputedStyle(m).flexShrink).to.equal('1');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Chat Row</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="chat-row">
      <div class="avatar"></div>
      <p class="message">Hey! Just wanted to check in about the meeting tomorrow and confirm the agenda items.</p>
    </div>
  </body>
</html>
```

## CSS

```css
.chat-row {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: #f5f6fa;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e17055;
  /* Do not allow the avatar to shrink */
}

.message {
  margin: 0;
}
```

## Hints

- The property that governs shrinking is the mirror of `flex-grow`.
- Its default is `1` (shrink normally); set it to `0` to keep an item at its declared size.

# Solution

```css
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e17055;
  flex-shrink: 0;
}
```

# Walkthrough

1. Open `style.css` and find the `.avatar` rule.
2. Add `flex-shrink: 0;` so the avatar refuses to give up space.
3. Leave `.message` alone — it keeps the default `flex-shrink: 1` and absorbs the tightening instead.
4. Save and narrow the preview window. The avatar should stay a perfect circle.
5. Run the tests.
