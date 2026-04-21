# Question

The page contains two boxes, `.box-a` and `.box-b`. Both are declared with the same `width: 300px`, yet when you open the preview `.box-a` takes up noticeably more horizontal space than `.box-b`.

The reason is that `.box-a` also has inner spacing and a thick outline, which by default get **added on top of** the declared width. Your job is to change this behaviour for `.box-a` so that its declared width of `300px` is treated as the **total visible width** of the box — including its inner spacing and outline.

After your change:

- The two boxes must occupy the **same amount of horizontal space on the page**.
- `.box-a` must still keep its inner spacing and its outline — do not remove them.
- `.box-b` must remain untouched. Do not add any new properties to it.

You should only need to add **one line** to `.box-a`.

# Test Cases

```
describe('Equal width challenge', () => {
  it('.box-a should use border-box sizing', () => {
    const box = document.querySelector('.box-a');
    expect(box).to.exist;
    expect(getComputedStyle(box).boxSizing).to.equal('border-box');
  });

  it('.box-b should keep the default content-box sizing', () => {
    const box = document.querySelector('.box-b');
    expect(box).to.exist;
    expect(getComputedStyle(box).boxSizing).to.equal('content-box');
  });

  it('both boxes should report 300px width in getComputedStyle', () => {
    const a = document.querySelector('.box-a');
    const b = document.querySelector('.box-b');
    expect(getComputedStyle(a).width).to.equal('300px');
    expect(getComputedStyle(b).width).to.equal('300px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Equal Width Challenge</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="box-a">Box A (padding + border)</div>
    <div class="box-b">Box B (plain)</div>
  </body>
</html>
```

## CSS

```css
.box-a {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightcoral;
  /* Add box-sizing here */
}

.box-b {
  width: 300px;
  background-color: lightgreen;
}
```

## Hints

- By default, the `width` property only describes the width of the **content area**; the browser then adds inner spacing and outline on top when rendering.
- There is a CSS property that changes how the `width` is interpreted, so that it covers the content, the inner spacing, and the outline all together.
- Try to recall the two possible values of that property — one of them is the default, and one of them is the fix you need here.
- Only `.box-a` needs to be changed.

# Solution

```css
.box-a {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  background-color: lightcoral;
  box-sizing: border-box;
}

.box-b {
  width: 300px;
  background-color: lightgreen;
}
```

# Walkthrough

1. Open `style.css` and find `.box-a`.
2. Add `box-sizing: border-box;` inside the braces.
3. Save and refresh. Both boxes should now occupy the same horizontal space on the page, even though only `.box-a` has padding and a border.
4. Run the tests to confirm `.box-a` uses `border-box` and `.box-b` keeps the default `content-box`.
