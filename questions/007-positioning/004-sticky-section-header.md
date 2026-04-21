# Question

The page is a long article split into several sections. Each section has an `<h2 class="section-heading">` at the top followed by lots of content.

Your task is to make each section heading **behave normally until the user scrolls past it, and then stick to the top of the viewport while the rest of that section scrolls underneath it**. When the next section reaches the top, its own heading takes over.

Important behaviour the tests will check:

1. Use the `position` value that gives this hybrid behaviour — it acts like a normal in-flow element **until** it would scroll off the top of the viewport, at which point it becomes pinned until its parent section scrolls past. (It is neither purely relative nor purely fixed.)
2. The heading must be pinned to the **top edge of the viewport** (0 pixels from the top) once it becomes pinned.

Do not wrap the heading in anything new; apply the styles directly to `.section-heading`.

# Test Cases

```
describe('Sticky section headings', () => {
  it('section headings should use the position value that sticks on scroll', () => {
    const heading = document.querySelector('.section-heading');
    expect(heading).to.exist;
    expect(getComputedStyle(heading).position).to.equal('sticky');
  });

  it('section headings should pin to the top of the viewport', () => {
    const heading = document.querySelector('.section-heading');
    expect(getComputedStyle(heading).top).to.equal('0px');
  });

  it('every section heading on the page should use the same behaviour', () => {
    const headings = document.querySelectorAll('.section-heading');
    expect(headings.length).to.be.at.least(2);
    headings.forEach((h) => {
      expect(getComputedStyle(h).position).to.equal('sticky');
      expect(getComputedStyle(h).top).to.equal('0px');
    });
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sticky Headings</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <section>
      <h2 class="section-heading">Section 1</h2>
      <p style="height: 600px;">Lots of content in section 1...</p>
    </section>
    <section>
      <h2 class="section-heading">Section 2</h2>
      <p style="height: 600px;">Lots of content in section 2...</p>
    </section>
    <section>
      <h2 class="section-heading">Section 3</h2>
      <p style="height: 600px;">Lots of content in section 3...</p>
    </section>
  </body>
</html>
```

## CSS

```css
.section-heading {
  background-color: #f1c40f;
  padding: 10px;
  margin: 0;
  /* Make the heading stick to the top while its section is on screen */
}
```

## Hints

- The `position` property has a value that is sometimes called "hybrid": the element behaves like a normally-flowing element at first, and only becomes pinned once scrolling would push it off the top of the viewport.
- For the pinning behaviour to kick in you **must** also specify an offset (like `top`) — without it, the browser has no idea where to stick the element.
- You do not need to add a new wrapper element. The pinned heading uses its existing parent `<section>` as the container it stays within.

# Solution

```css
.section-heading {
  background-color: #f1c40f;
  padding: 10px;
  margin: 0;
  position: sticky;
  top: 0;
}
```

# Walkthrough

1. Open `style.css` and find the `.section-heading` rule.
2. Pick the `position` value that mixes normal flow with fixed-style pinning.
3. Add `top: 0;` so the heading pins against the very top of the viewport.
4. Save and scroll the preview slowly. As each section reaches the top, its heading should stick there until the next section takes over.
5. Run the tests to confirm the position value and the top offset on every heading.
