# Question

The page has a **Draw** button and an empty `<ul>` with `id="list"`.

Write a function named **`drawList`** that:

- Takes an array of numbers as its first parameter.
- Renders each number as an `<li>` inside `<ul id="list">`, in the same order as the array.
- Before rendering, clears any existing `<li>` items in the list so that calling `drawList` twice doesn't produce duplicates.

When the user clicks **Draw**, call `drawList` with the array `NUMBERS` that is provided in the starter JavaScript.

Nothing should be rendered when the page first loads — the list only appears after **Draw** is clicked.

# Test Cases

```
describe('append child - drawList function', () => {
  const click = () => document.querySelector('#draw-btn').click();
  const items = () => [...document.querySelectorAll('#list > li')].map((li) => li.textContent.trim());

  it('list is empty before the button is clicked', () => {
    expect(items()).to.deep.equal([]);
  });

  it('drawList is a function', () => {
    expect(typeof window.drawList).to.equal('function');
  });

  it('clicking Draw renders NUMBERS as <li> items in order', () => {
    click();
    expect(items()).to.deep.equal(['3', '7', '11', '42']);
  });

  it('drawList renders any array passed to it', () => {
    window.drawList([1, 2, 3]);
    expect(items()).to.deep.equal(['1', '2', '3']);
  });

  it('calling drawList twice does not duplicate items', () => {
    window.drawList([5, 6]);
    window.drawList([5, 6]);
    expect(items()).to.deep.equal(['5', '6']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>drawList</title>
  </head>
  <body>
    <button id="draw-btn">Draw</button>
    <ul id="list"></ul>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
body {
  font-family: sans-serif;
  padding: 20px;
}
button {
  font-size: 16px;
  padding: 5px 10px;
}
```

## JavaScript

```javascript
const NUMBERS = [3, 7, 11, 42];

// Write your drawList function here, then attach a click listener
// to the Draw button that calls drawList(NUMBERS).
```

## Hints

- To clear an element's children, the easiest way is `list.innerHTML = ''`.
- After clearing, loop over the array and append one `<li>` per item.
- Declare `drawList` at the top level of the script (not inside the click listener) so it's available globally and the tests can call it.

# Solution

```javascript
const NUMBERS = [3, 7, 11, 42];

function drawList(arr) {
  const list = document.querySelector('#list');
  list.innerHTML = '';
  for (const n of arr) {
    const li = document.createElement('li');
    li.textContent = n;
    list.appendChild(li);
  }
}

document.querySelector('#draw-btn').addEventListener('click', () => {
  drawList(NUMBERS);
});
```

# Walkthrough

1. Define `drawList(arr)` as a top-level function.
2. Inside: grab `#list`, clear it (`innerHTML = ''`), then loop over `arr` creating and appending an `<li>` for each number.
3. Attach a `click` listener to the Draw button that calls `drawList(NUMBERS)`.
4. Because `drawList` clears the list before rendering, calling it multiple times always produces exactly the contents of the latest array.
