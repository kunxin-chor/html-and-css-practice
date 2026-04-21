# Question

This is a capstone for the positioning revision. You are styling a simple social-media feed page that has four different elements, each needing a different value of the CSS `position` property.

The HTML contains:

- An announcement banner: `<div class="announcement">`
- A post card: `<article class="post">` containing an avatar `<img class="avatar">` and the post text.
- A "What's new" label: `<h2 class="new-label">` that appears above the feed.
- A compose-post floating button: `<button class="compose">+</button>` at the bottom.

Apply CSS so each element has the correct behaviour:

1. **Announcement banner (`.announcement`)** — must stay **pinned to the top of the browser window** at all times, anchored at `top: 0` and `left: 0`, stretching the full width of the viewport (`width: 100%`).

2. **Post card (`.post`) + avatar (`.avatar`)** — the avatar must **overlay the top-left corner of the post card**, sticking out slightly. Anchor the avatar **−20 pixels from the top** (so it sits above the card's top edge) and **−20 pixels from the left** (so it sits to the left of the card's left edge). The avatar must be taken out of the document flow and anchored to the **post card**, not to the viewport. To achieve that, give the post card a `position` value that acts as a positioning context **without actually moving** the card.

3. **"What's new" label (`.new-label`)** — must behave normally while in view, but **stick to the top of the viewport** (at `top: 0`) once the user scrolls past it, releasing once its containing section scrolls out.

4. **Compose button (`.compose`)** — must stay **pinned to the bottom-right corner of the browser window** at all times, anchored **24 pixels from the bottom** and **24 pixels from the right**.

All four elements use different values of the same `position` property family. Pick the right one for each.

# Test Cases

```
describe('Announcement banner pinned to viewport', () => {
  it('should stay locked to the top of the window', () => {
    const el = document.querySelector('.announcement');
    expect(el).to.exist;
    const style = getComputedStyle(el);
    expect(style.position).to.equal('fixed');
    expect(style.top).to.equal('0px');
    expect(style.left).to.equal('0px');
    expect(style.width).to.equal(String(window.innerWidth) + 'px');
  });
});

describe('Post card and avatar', () => {
  it('.post should act as a positioning context without moving', () => {
    const post = document.querySelector('.post');
    expect(post).to.exist;
    expect(getComputedStyle(post).position).to.equal('relative');
  });

  it('.avatar should be taken out of flow and anchored to the post card', () => {
    const avatar = document.querySelector('.avatar');
    expect(avatar).to.exist;
    const style = getComputedStyle(avatar);
    expect(style.position).to.equal('absolute');
    expect(style.top).to.equal('-20px');
    expect(style.left).to.equal('-20px');
  });
});

describe('New label stickiness', () => {
  it('should use the hybrid position value and pin at top:0', () => {
    const el = document.querySelector('.new-label');
    expect(el).to.exist;
    const style = getComputedStyle(el);
    expect(style.position).to.equal('sticky');
    expect(style.top).to.equal('0px');
  });
});

describe('Compose floating button', () => {
  it('should stay locked to the bottom-right corner of the viewport', () => {
    const btn = document.querySelector('.compose');
    expect(btn).to.exist;
    const style = getComputedStyle(btn);
    expect(style.position).to.equal('fixed');
    expect(style.bottom).to.equal('24px');
    expect(style.right).to.equal('24px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Social Feed</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="announcement">New messaging features are live!</div>

    <main>
      <h2 class="new-label">What's new</h2>

      <article class="post">
        <img class="avatar" src="https://picsum.photos/60/60" alt="User avatar">
        <h3>Jane Doe</h3>
        <p>Just launched my new portfolio site!</p>
      </article>

      <p style="height: 1500px;">More posts would go here...</p>
    </main>

    <button class="compose">+</button>
  </body>
</html>
```

## CSS

```css
.announcement {
  background-color: #0984e3;
  color: white;
  padding: 10px 16px;
  text-align: center;
  /* Pin to top of viewport, full width */
}

.new-label {
  background-color: #fab1a0;
  padding: 8px 12px;
  margin: 0;
  /* Stick to the top once scrolled past */
}

.post {
  width: 320px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 80px auto;
  /* Make this post a positioning context without moving it */
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  background-color: #ddd;
  /* Overlay the top-left corner of the post, sticking out by 20px */
}

.compose {
  background-color: #6c5ce7;
  color: white;
  border: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: 24px;
  /* Pin to bottom-right of the viewport, 24px from each edge */
}
```

## Hints

- Re-read the first four questions in this category — each of the four required behaviours maps onto one specific `position` value.
- The announcement banner and the compose button both stay locked to the **browser window**, just anchored to different corners. The same `position` value works for both; use different offset properties (`top`/`left` vs `bottom`/`right`).
- For the avatar to anchor to the post card (and not to the page), the card itself must first be turned into a positioning context using the `position` value that does **not** actually move it.
- Negative offsets are allowed. `top: -20px` pushes an element **above** its anchor point, and `left: -20px` pushes it further to the left.
- The "What's new" label needs the hybrid behaviour — in-flow at first, pinned once scrolled past.

# Solution

```css
.announcement {
  background-color: #0984e3;
  color: white;
  padding: 10px 16px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.new-label {
  background-color: #fab1a0;
  padding: 8px 12px;
  margin: 0;
  position: sticky;
  top: 0;
}

.post {
  width: 320px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 80px auto;
  position: relative;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  background-color: #ddd;
  position: absolute;
  top: -20px;
  left: -20px;
}

.compose {
  background-color: #6c5ce7;
  color: white;
  border: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: 24px;
  position: fixed;
  bottom: 24px;
  right: 24px;
}
```

# Walkthrough

1. **Announcement banner.** Give `.announcement` the `position` value that locks it to the viewport. Add `top: 0;`, `left: 0;`, and `width: 100%;`.
2. **"What's new" label.** Give `.new-label` the hybrid `position` value so it sticks on scroll. Add `top: 0;` so it pins to the very top of the viewport.
3. **Post card.** Give `.post` the `position` value that turns it into a positioning context without moving it. This makes the card the anchor point for the avatar.
4. **Avatar.** Give `.avatar` the `position` value that takes an element out of the flow and anchors it to its nearest positioned ancestor. Use **negative** offsets: `top: -20px;` and `left: -20px;` so the avatar sticks out above and to the left of the card's corner.
5. **Compose button.** Give `.compose` the same viewport-locking `position` value as the announcement, but use the `bottom` and `right` offsets with `24px` so it floats in the bottom-right corner.
6. Save and scroll the preview. You should see: the announcement stays pinned at the top, the avatar hangs off the corner of the post, the "What's new" label sticks when scrolled past, and the compose button stays in the bottom-right corner.
7. Run the tests — each section covers one of the four behaviours.
