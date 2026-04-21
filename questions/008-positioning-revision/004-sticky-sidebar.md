# Question

The page has a long article with a small sidebar navigation on the side (`<aside class="sidebar-nav">`). As the user scrolls, the sidebar should **stay visible alongside the article** instead of scrolling away with it.

Your task is to make the sidebar behave normally while it is in view, and then **stick to a point near the top of the viewport while the article keeps scrolling**. Unlike a fixed element, the sidebar must still be part of the layout and must stop sticking if its parent container scrolls past.

Important behaviour the tests will check:

1. Use the CSS `position` property with the value that is "hybrid" — the element behaves like a normal in-flow element **until** it would scroll off the top of the viewport, at which point it becomes pinned (but only while its containing section is still on screen).
2. The sidebar must pin **20 pixels below the top of the viewport** (not flush against the top — leave a small gap). Use the appropriate offset property.

Do not change the HTML.

# Test Cases

```
describe('Sticky sidebar nav', () => {
  it('should use the hybrid position value that sticks on scroll', () => {
    const nav = document.querySelector('.sidebar-nav');
    expect(nav).to.exist;
    expect(getComputedStyle(nav).position).to.equal('sticky');
  });

  it('should pin 20px below the top of the viewport', () => {
    const nav = document.querySelector('.sidebar-nav');
    expect(getComputedStyle(nav).top).to.equal('20px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sticky Sidebar</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar-nav">
        <h3>Sections</h3>
        <ul>
          <li>Intro</li>
          <li>Details</li>
          <li>Summary</li>
        </ul>
      </aside>
      <article>
        <h1>An Article</h1>
        <p style="height: 2000px;">Lots of article content to scroll...</p>
      </article>
    </div>
  </body>
</html>
```

## CSS

```css
.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.sidebar-nav {
  width: 180px;
  padding: 12px;
  background-color: #ecf0f1;
  /* Make the sidebar stick near the top while the article scrolls */
}
```

## Hints

- The `position` property has a value that combines two behaviours: the element flows normally at first, and then gets pinned at a specific offset once the user scrolls past it.
- This pinning behaviour only kicks in when an offset property is set. Without it, the browser does not know where to stick the element.
- A value of `20px` on the offset property that measures from the top of the viewport will leave a small gap between the sidebar and the top edge of the browser window.

# Solution

```css
.sidebar-nav {
  width: 180px;
  padding: 12px;
  background-color: #ecf0f1;
  position: sticky;
  top: 20px;
}
```

# Walkthrough

1. Open `style.css` and find the `.sidebar-nav` rule.
2. Pick the `position` value that mixes normal flow with fixed-style pinning.
3. Add `top: 20px;` so the sidebar pins with a 20-pixel gap from the top of the viewport.
4. Save and scroll the preview. The sidebar should scroll normally for a moment, then stick 20 pixels below the top while the article continues to scroll.
5. Run the tests.
