# Question

The page contains a row of three small boxes. The middle box has the class `highlight`. Right now it is aligned with its neighbours.

Your task is to **shift the highlighted box 15 pixels UPWARD and 25 pixels to the LEFT** of where it would normally sit, **without affecting the boxes around it**.

Important behaviour the tests will check:

1. Use the CSS `position` property with the value that lets an element be **offset from its natural spot while still reserving the space it originally took up** in the document. The other two boxes must **not shift over** to fill the gap.
2. Shift the box **15 pixels upward** using the offset property that measures from the **bottom** of its original position.
3. Shift the box **25 pixels to the left** using the offset property that measures from the **right** of its original position.

The neighbouring boxes (without any class) must stay untouched.

# Test Cases

```
describe('Highlight nudge', () => {
  it('should use the position value that keeps the element in document flow', () => {
    const el = document.querySelector('.highlight');
    expect(el).to.exist;
    expect(getComputedStyle(el).position).to.equal('relative');
  });

  it('should be offset 15px upward using the bottom property', () => {
    const el = document.querySelector('.highlight');
    expect(getComputedStyle(el).bottom).to.equal('15px');
  });

  it('should be offset 25px to the left using the right property', () => {
    const el = document.querySelector('.highlight');
    expect(getComputedStyle(el).right).to.equal('25px');
  });

  it('sibling boxes should remain in the default static flow', () => {
    const siblings = document.querySelectorAll('.box:not(.highlight)');
    expect(siblings.length).to.equal(2);
    siblings.forEach((el) => {
      expect(getComputedStyle(el).position).to.equal('static');
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
    <title>Highlight Nudge</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="box">A</div>
    <div class="box highlight">B</div>
    <div class="box">C</div>
  </body>
</html>
```

## CSS

```css
.box {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: #dfe6e9;
  text-align: center;
  line-height: 60px;
  margin-right: 8px;
}

.highlight {
  background-color: #fdcb6e;
  /* Nudge this box up and to the left here */
}
```

## Hints

- The `position` property has a value designed for "move an element a bit, but do not disturb anything around it". Siblings stay put because the original slot in the flow is preserved.
- There are four offset properties: `top`, `bottom`, `left`, and `right`. Choose the pair that measures from the **bottom** and from the **right** edges of the original position — they push the element upward and leftward respectively.

# Solution

```css
.highlight {
  background-color: #fdcb6e;
  position: relative;
  bottom: 15px;
  right: 25px;
}
```

# Walkthrough

1. Open `style.css` and find the `.highlight` rule.
2. Pick the `position` value that keeps the element in the document flow while allowing offsets.
3. Add `bottom: 15px;` to push it upward.
4. Add `right: 25px;` to push it leftward.
5. Save and refresh. The middle box should appear shifted up-left, while boxes A and C stay exactly where they were.
6. Run the tests.
