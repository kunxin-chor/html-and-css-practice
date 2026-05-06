# Question

The page has **two independent unordered lists** — a Fruits list and a Colours list. Each list has its own **text input** and its own **Add** button.

When the user types something into a list's input and clicks **that same list's Add** button, the typed value should be added as a new `<li>` to **only that list** (the other list should not change).

- Adding `apple` via the Fruits Add button appends `<li>apple</li>` to the Fruits list only.
- Adding `blue` via the Colours Add button appends `<li>blue</li>` to the Colours list only.
- Clicking a list's Add button multiple times should keep appending items (each click adds one more `<li>`).

# Test Cases

```
describe('append child - two independent lists', () => {
  const fruitInput = () => document.querySelector('#fruit-input');
  const colourInput = () => document.querySelector('#colour-input');
  const fruitList = () => document.querySelector('#fruit-list');
  const colourList = () => document.querySelector('#colour-list');
  const addFruit = () => document.querySelector('#fruit-add').click();
  const addColour = () => document.querySelector('#colour-add').click();

  it('adds an item only to the fruit list', () => {
    fruitInput().value = 'apple';
    addFruit();
    const fruits = [...fruitList().querySelectorAll('li')].map((li) => li.textContent.trim());
    const colours = [...colourList().querySelectorAll('li')].map((li) => li.textContent.trim());
    expect(fruits).to.deep.equal(['apple']);
    expect(colours).to.deep.equal([]);
  });

  it('adds an item only to the colour list', () => {
    colourInput().value = 'blue';
    addColour();
    const fruits = [...fruitList().querySelectorAll('li')].map((li) => li.textContent.trim());
    const colours = [...colourList().querySelectorAll('li')].map((li) => li.textContent.trim());
    expect(fruits).to.deep.equal(['apple']);
    expect(colours).to.deep.equal(['blue']);
  });

  it('appends multiple items in order', () => {
    fruitInput().value = 'banana';
    addFruit();
    fruitInput().value = 'cherry';
    addFruit();
    const fruits = [...fruitList().querySelectorAll('li')].map((li) => li.textContent.trim());
    expect(fruits).to.deep.equal(['apple', 'banana', 'cherry']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Two Lists</title>
  </head>
  <body>
    <section>
      <h3>Fruits</h3>
      <ul id="fruit-list"></ul>
      <input id="fruit-input" type="text" placeholder="Fruit name">
      <button id="fruit-add">Add</button>
    </section>

    <section>
      <h3>Colours</h3>
      <ul id="colour-list"></ul>
      <input id="colour-input" type="text" placeholder="Colour name">
      <button id="colour-add">Add</button>
    </section>

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
section {
  margin-bottom: 20px;
}
input, button {
  font-size: 16px;
  padding: 5px 10px;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- You need one click listener per button. Each listener reads from its own input and appends to its own list.
- To add a new list item: create an `<li>` with `document.createElement('li')`, set its `textContent`, and `appendChild` it to the correct `<ul>`.

# Solution

```javascript
const fruitInput = document.querySelector('#fruit-input');
const fruitList = document.querySelector('#fruit-list');
document.querySelector('#fruit-add').addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = fruitInput.value;
  fruitList.appendChild(li);
});

const colourInput = document.querySelector('#colour-input');
const colourList = document.querySelector('#colour-list');
document.querySelector('#colour-add').addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = colourInput.value;
  colourList.appendChild(li);
});
```

# Walkthrough

1. Grab references to the two inputs, the two `<ul>` elements, and the two buttons.
2. For each list, attach its own `click` handler to the matching button.
3. Inside each handler:
   - Create a fresh `<li>`.
   - Set its `textContent` to the matching input's `.value`.
   - Append it to the matching `<ul>`.
4. Because each handler only touches one list, the other list is untouched.
