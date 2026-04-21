# Question

The page contains a modal dialog (`<div class="modal">`). Inside the modal there is a close button (`<button class="close-btn">×</button>`) and some content.

Your task is to **place the close button in the bottom-right corner of the modal**, overlaying the content rather than pushing it around. No matter where the modal is positioned on the page, the close button must stay anchored to the modal's corner.

Important behaviour the tests will check:

1. The close button must use a `position` value that **removes it from the normal document flow and positions it relative to its closest positioned ancestor**. It should no longer take up space next to the modal's content.
2. For the close button to anchor to the **modal** (not to the whole page), the `.modal` must itself be turned into a *positioning context*. Give the modal a `position` value that **does not actually move it**, but makes it act as the reference frame for its positioned children.
3. The close button must sit **8 pixels from the bottom edge of the modal** and **8 pixels from the right edge of the modal**.

# Test Cases

```
describe('Modal acts as positioning context', () => {
  it('.modal should be positioned (non-static) so its children anchor to it', () => {
    const modal = document.querySelector('.modal');
    expect(modal).to.exist;
    expect(getComputedStyle(modal).position).to.equal('relative');
  });
});

describe('Close button pinned to modal corner', () => {
  it('.close-btn should be taken out of flow and positioned against its ancestor', () => {
    const btn = document.querySelector('.close-btn');
    expect(btn).to.exist;
    expect(getComputedStyle(btn).position).to.equal('absolute');
  });

  it('.close-btn should be offset 8px from the bottom and 8px from the right of the modal', () => {
    const btn = document.querySelector('.close-btn');
    const style = getComputedStyle(btn);
    expect(style.bottom).to.equal('8px');
    expect(style.right).to.equal('8px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Modal Close Button</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="modal">
      <h3>Are you sure?</h3>
      <p>This action cannot be undone.</p>
      <button class="close-btn">&times;</button>
    </div>
  </body>
</html>
```

## CSS

```css
.modal {
  width: 300px;
  height: 180px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  /* Make this modal a positioning context for its children */
}

.close-btn {
  background-color: #d63031;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  font-size: 18px;
  /* Pin this button to the bottom-right corner of the modal */
}
```

## Hints

- The `position` property has a value that lets an element be **offset from its nearest positioned ancestor** and is removed from the document flow.
- For the close button to anchor to the **modal** instead of the whole page, the modal itself has to be "positioned". There is a `position` value that sets this up **without moving the modal** — it simply makes the modal the reference point.
- You have used `top` and `left` before. This question uses the other two offset properties: the ones that measure from the **bottom** and from the **right** edges of the ancestor.

# Solution

```css
.modal {
  width: 300px;
  height: 180px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: relative;
}

.close-btn {
  background-color: #d63031;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  font-size: 18px;
  position: absolute;
  bottom: 8px;
  right: 8px;
}
```

# Walkthrough

1. Open `style.css` and find the `.modal` rule.
2. Give the modal a `position` value that turns it into a positioning context without moving it.
3. Find the `.close-btn` rule.
4. Give the button a `position` value that takes it out of the document flow and anchors it to the nearest positioned ancestor (the modal).
5. Add `bottom: 8px;` and `right: 8px;` so the button sits in the modal's bottom-right corner.
6. Save and refresh. The red × should overlay the modal's bottom-right corner.
7. Run the tests.
