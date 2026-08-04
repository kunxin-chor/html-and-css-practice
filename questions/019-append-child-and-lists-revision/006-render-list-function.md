# Question

The page has a **Refresh** button and an empty `<ul>` with `id="list"`.

Write a function named **`renderList`** that:

- Takes an array of strings as its first parameter.
- Clears any existing `<li>` items inside `<ul id="list">`.
- Renders each string as an `<li>` inside `<ul id="list">`, in the same order as the array.

When the user clicks **Refresh**, call `renderList` with the array `WORDS` provided in the starter JavaScript.

Nothing should be rendered when the page first loads — the list only appears after **Refresh** is clicked.

# Test Cases

```
describe('append child revision - renderList function', () => {
  const click = () => document.querySelector('#refresh-btn').click();
  const items = () => [...document.querySelectorAll('#list > li')].map((li) => li.textContent.trim());

  it('list is empty before the button is clicked', () => {
    expect(items()).to.deep.equal([]);
  });

  it('renderList is a function', () => {
    expect(typeof window.renderList).to.equal('function');
  });

  it('clicking Refresh renders WORDS as <li> items in order', () => {
    click();
    expect(items()).to.deep.equal(['apple', 'banana', 'cherry', 'date']);
  });

  it('renderList renders any array passed to it', () => {
    window.renderList(['one', 'two', 'three']);
    expect(items()).to.deep.equal(['one', 'two', 'three']);
  });

  it('calling renderList twice does not duplicate items', () => {
    window.renderList(['a', 'b']);
    window.renderList(['a', 'b']);
    expect(items()).to.deep.equal(['a', 'b']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>renderList</title>
  </head>
  <body>
    <button id="refresh-btn">Refresh</button>
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
const WORDS = ['apple', 'banana', 'cherry', 'date'];

// Write your renderList function here, then attach a click listener
// to the Refresh button that calls renderList(WORDS).
```

## Hints

- To clear an element's children, the easiest way is `list.innerHTML = ''`.
- After clearing, loop over the array and append one `<li>` per item.
- Declare `renderList` at the top level of the script (not inside the click listener) so it is available globally and the tests can call it.

# Solution

```javascript
const WORDS = ['apple', 'banana', 'cherry', 'date'];

function renderList(arr) {
  const list = document.querySelector('#list');
  list.innerHTML = '';
  for (const item of arr) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }
}

document.querySelector('#refresh-btn').addEventListener('click', () => {
  renderList(WORDS);
});
```

# Walkthrough

1. Define `renderList(arr)` as a top-level function.
2. Inside the function:
   - Grab `#list`.
   - Clear it with `list.innerHTML = ''`.
   - Loop over `arr` and create and append one `<li>` per item.
3. Attach a `click` listener to the **Refresh** button that calls `renderList(WORDS)`.
4. Because `renderList` clears the list before rendering, calling it multiple times always produces exactly the contents of the latest array.
