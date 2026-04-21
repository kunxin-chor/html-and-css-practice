# Question

The page has a product card (`<div class="card">`) with a heading and a small badge element (`<span class="badge">NEW</span>`) inside it.

Your task is to **pin the `NEW` badge to the top-right corner of the card**, so that no matter where the card is placed on the page, the badge always sits in that corner.

Important behaviour the tests will check:

1. The badge must use a `position` value that **removes it from the normal document flow and positions it relative to its closest positioned ancestor**. The badge itself should no longer push the heading around.
2. For the badge to anchor to the **card** (and not to the whole page), the `.card` must be turned into a *positioning context*. Do this by giving the card a `position` value that **does not actually move it**, but does make it act as the reference for its positioned children.
3. The badge must sit with its **top edge** at `0px` and its **right edge** at `0px` relative to the card.

# Test Cases

```
describe('Card acts as positioning context', () => {
  it('.card should be positioned (non-static) so its children anchor to it', () => {
    const card = document.querySelector('.card');
    expect(card).to.exist;
    expect(getComputedStyle(card).position).to.equal('relative');
  });
});

describe('Badge pinned to corner', () => {
  it('.badge should be taken out of document flow and positioned against its ancestor', () => {
    const badge = document.querySelector('.badge');
    expect(badge).to.exist;
    expect(getComputedStyle(badge).position).to.equal('absolute');
  });

  it('.badge should be offset to the top-right corner', () => {
    const badge = document.querySelector('.badge');
    const style = getComputedStyle(badge);
    expect(style.top).to.equal('0px');
    expect(style.right).to.equal('0px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Corner Badge</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="card">
      <span class="badge">NEW</span>
      <h3>Product name</h3>
      <p>A short description of the product.</p>
    </div>
  </body>
</html>
```

## CSS

```css
.card {
  width: 260px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  /* Make this card the positioning context for its children */
}

.badge {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  /* Pin this badge to the top-right corner of the card */
}
```

## Hints

- The `position` property has four main values beyond the default. One of them lets an element be **offset from its nearest positioned ancestor** and takes it out of the document flow.
- For the badge to anchor to the **card** rather than to the viewport or the whole page, the card must itself be "positioned". There is a `position` value that does this **without actually moving the card** — it simply makes the element act as a reference for its positioned children.
- You already know `top` as an offset property. There is a matching one for the right-hand side.

# Solution

```css
.card {
  width: 260px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: relative;
}

.badge {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
}
```

# Walkthrough

1. Open `style.css` and find the `.card` rule.
2. Give the card a `position` value that does not move it but turns it into a positioning context for its children.
3. Find the `.badge` rule.
4. Give the badge a `position` value that takes it out of the flow and anchors it to the nearest positioned ancestor (which is now the card).
5. Add `top: 0;` and `right: 0;` so the badge sits against the top-right corner of the card.
6. Save and refresh. The `NEW` badge should appear in the card's top-right corner, and the heading should no longer be pushed down by it.
7. Run the tests.
