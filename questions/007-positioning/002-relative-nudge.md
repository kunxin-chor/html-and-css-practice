# Question

The page contains three paragraphs. The middle paragraph has the class `nudged`. Right now it sits in line with the other two.

Your task is to **shift the middle paragraph 10 pixels down and 20 pixels to the right** of where it would normally appear, **without affecting the other paragraphs**.

Important behaviour the tests will check:

1. Use the CSS `position` property with the value that lets an element be **offset from its normal position while still occupying the space it originally took up** in the document flow. (In other words, the paragraphs above and below must **not shift upwards** to fill the gap.)
2. Shift the paragraph **10 pixels downward** using the appropriate offset property.
3. Shift the paragraph **20 pixels to the right** using the appropriate offset property.

Do not change the HTML or the other paragraphs.

# Test Cases

```
describe('Nudged paragraph', () => {
  it('should use the position value that keeps the element in document flow', () => {
    const p = document.querySelector('.nudged');
    expect(p).to.exist;
    expect(getComputedStyle(p).position).to.equal('relative');
  });

  it('should be offset 10px down', () => {
    const p = document.querySelector('.nudged');
    expect(getComputedStyle(p).top).to.equal('10px');
  });

  it('should be offset 20px to the right', () => {
    const p = document.querySelector('.nudged');
    expect(getComputedStyle(p).left).to.equal('20px');
  });

  it('the sibling paragraphs should not be repositioned', () => {
    const ps = document.querySelectorAll('p');
    ps.forEach((p) => {
      if (!p.classList.contains('nudged')) {
        expect(getComputedStyle(p).position).to.equal('static');
      }
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
    <title>Relative Nudge</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <p>I am the first paragraph.</p>
    <p class="nudged">I should be nudged down and to the right.</p>
    <p>I am the third paragraph and should not move.</p>
  </body>
</html>
```

## CSS

```css
.nudged {
  background-color: #ffeaa7;
  /* Nudge this paragraph here */
}
```

## Hints

- There are several values the `position` property can take. The one you need lets an element move by an offset but **still reserves its original slot in the layout** — so surrounding elements stay put.
- Once the position value is set, use the `top` and `left` offset properties to shift the element in the desired direction. Positive numbers push the element away from the top edge and away from the left edge of its original spot.

# Solution

```css
.nudged {
  background-color: #ffeaa7;
  position: relative;
  top: 10px;
  left: 20px;
}
```

# Walkthrough

1. Open `style.css` and find the `.nudged` rule.
2. Pick the `position` value that keeps the element in the document flow while allowing it to be offset.
3. Add `top: 10px;` to push it down.
4. Add `left: 20px;` to push it to the right.
5. Save and refresh. The middle paragraph should appear shifted, but the first and third paragraphs should remain exactly where they were.
6. Run the tests.
