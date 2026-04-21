# Question

This is a mini-capstone for the positioning category. The page is a simple dashboard layout with four roles that each need a different behaviour from the CSS `position` property.

The HTML contains:

- A top bar: `<header class="top-bar">`
- A main area with a card: `<section class="card">` containing a ribbon `<span class="ribbon">SALE</span>` and a heading.
- Inside the main area there is also an `<h2 class="sidebar-title">` acting as a sidebar section title.
- A "scroll to top" button at the bottom: `<button class="scroll-top">Top</button>`.

Apply CSS so that each of these four elements has the correct behaviour:

1. **Top bar (`.top-bar`)** — must stay **pinned to the top-left of the browser window at all times**, even while the page scrolls. It should be anchored at `top: 0` and `left: 0`, and stretch to `width: 100%`.

2. **Card (`.card`) + ribbon (`.ribbon`)** — the ribbon must sit in the **top-right corner of the card** (`top: 0`, `right: 0`). The ribbon must be taken out of the document flow so it overlays the card, and it must anchor to the card (not to the viewport). To achieve that, the card itself must also be given a `position` value that acts as a positioning context **without actually moving** the card.

3. **Sidebar title (`.sidebar-title`)** — must behave normally while in view, but **stick to the top of the viewport** (at `top: 0`) once the user scrolls past it, until its parent section scrolls out.

4. **Scroll-to-top button (`.scroll-top`)** — must stay **pinned to the bottom-right corner of the browser window** at all times, `20px` from the bottom and `20px` from the right.

All four elements use different values of the same `position` property family. Pick the right one for each.

# Test Cases

```
describe('Top bar pinned to viewport', () => {
  it('should stay anchored to the top of the window', () => {
    const bar = document.querySelector('.top-bar');
    expect(bar).to.exist;
    const style = getComputedStyle(bar);
    expect(style.position).to.equal('fixed');
    expect(style.top).to.equal('0px');
    expect(style.left).to.equal('0px');
    expect(style.width).to.equal(String(window.innerWidth) + 'px');
  });
});

describe('Card and ribbon', () => {
  it('.card should act as a positioning context without moving', () => {
    const card = document.querySelector('.card');
    expect(card).to.exist;
    expect(getComputedStyle(card).position).to.equal('relative');
  });

  it('.ribbon should be taken out of flow and pinned to the card corner', () => {
    const ribbon = document.querySelector('.ribbon');
    expect(ribbon).to.exist;
    const style = getComputedStyle(ribbon);
    expect(style.position).to.equal('absolute');
    expect(style.top).to.equal('0px');
    expect(style.right).to.equal('0px');
  });
});

describe('Sidebar title stickiness', () => {
  it('should use the hybrid position value and stick to top:0', () => {
    const title = document.querySelector('.sidebar-title');
    expect(title).to.exist;
    const style = getComputedStyle(title);
    expect(style.position).to.equal('sticky');
    expect(style.top).to.equal('0px');
  });
});

describe('Scroll-to-top button', () => {
  it('should stay pinned to the bottom-right corner of the viewport', () => {
    const btn = document.querySelector('.scroll-top');
    expect(btn).to.exist;
    const style = getComputedStyle(btn);
    expect(style.position).to.equal('fixed');
    expect(style.bottom).to.equal('20px');
    expect(style.right).to.equal('20px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dashboard Layout</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header class="top-bar">Dashboard</header>

    <main>
      <h2 class="sidebar-title">Overview</h2>

      <section class="card">
        <span class="ribbon">SALE</span>
        <h3>Featured product</h3>
        <p>A great product at a great price.</p>
      </section>

      <p style="height: 1500px;">Lots of content so the page is scrollable...</p>
    </main>

    <button class="scroll-top">Top</button>
  </body>
</html>
```

## CSS

```css
.top-bar {
  background-color: #2c3e50;
  color: white;
  padding: 12px 16px;
  /* Pin to top of viewport, full width */
}

.sidebar-title {
  background-color: #f1c40f;
  padding: 8px;
  margin: 0;
  /* Stick to the top once the user scrolls past it */
}

.card {
  width: 260px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 80px;
  /* Make this card a positioning context without moving it */
}

.ribbon {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  /* Pin to the top-right corner of the card */
}

.scroll-top {
  padding: 8px 12px;
  /* Pin to bottom-right of the viewport, 20px from each edge */
}
```

## Hints

- Re-read the previous questions in this category — each of the four required behaviours was covered by one specific `position` value.
- The top bar and the scroll-to-top button both stay locked to the **browser window**, but anchored to different corners — the same `position` value works for both; just use different offset properties (`top`/`left` vs `bottom`/`right`).
- The ribbon needs to anchor to the card, not the page. That only happens if the card itself has been turned into a positioning context — remember the `position` value that does this without actually moving the element.
- The sidebar title has a hybrid behaviour: in-flow at first, pinned later. That is the fourth `position` value you have learned.

# Solution

```css
.top-bar {
  background-color: #2c3e50;
  color: white;
  padding: 12px 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.sidebar-title {
  background-color: #f1c40f;
  padding: 8px;
  margin: 0;
  position: sticky;
  top: 0;
}

.card {
  width: 260px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 80px;
  position: relative;
}

.ribbon {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
}

.scroll-top {
  padding: 8px 12px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

# Walkthrough

1. **Top bar.** Give `.top-bar` the `position` value that locks it to the viewport. Add `top: 0;`, `left: 0;`, and `width: 100%;`.
2. **Sidebar title.** Give `.sidebar-title` the hybrid `position` value that makes it stick on scroll. Add `top: 0;` so it sticks to the very top of the viewport.
3. **Card.** Give `.card` the `position` value that makes it a positioning context **without moving it**. This turns the card into the anchor point for the ribbon.
4. **Ribbon.** Give `.ribbon` the `position` value that takes an element out of the flow and anchors it to its nearest positioned ancestor. Add `top: 0;` and `right: 0;` so it sits in the card's top-right corner.
5. **Scroll-to-top button.** Give `.scroll-top` the same viewport-locking `position` value as the top bar, but use the `bottom` and `right` offsets with `20px` so it floats in the bottom-right corner.
6. Save and scroll the preview. You should see: top bar stays pinned, the ribbon stays in the card's corner, the sidebar title sticks when scrolled past, and the scroll-to-top button stays in the bottom-right corner.
7. Run the tests — each section covers one of the four behaviours.
