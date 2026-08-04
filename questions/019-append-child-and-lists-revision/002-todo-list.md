# Question

The page has a text input for entering a todo item, a button labelled **Add**, and an empty `<ul>` with `id="todo-list"`.

When the user types something into the input and clicks **Add**, the value should be added as a new `<li>` at the end of the list. After adding, the input should be cleared so the user can type the next item easily.

If the user clicks **Add** while the input is empty, do nothing.

# Test Cases

```
describe('append child revision - todo list', () => {
  const input = () => document.querySelector('#todo-input');
  const btn = () => document.querySelector('#add-btn');
  const items = () => [...document.querySelectorAll('#todo-list > li')].map((li) => li.textContent.trim());

  it('adds a single todo item', () => {
    input().value = 'Buy milk';
    btn().click();
    expect(items()).to.deep.equal(['Buy milk']);
  });

  it('adds multiple items in order', () => {
    input().value = 'Walk dog';
    btn().click();
    input().value = 'Read book';
    btn().click();
    expect(items()).to.deep.equal(['Buy milk', 'Walk dog', 'Read book']);
  });

  it('clears the input after adding', () => {
    input().value = 'Exercise';
    btn().click();
    expect(input().value).to.equal('');
  });

  it('does not add an empty item', () => {
    const countBefore = items().length;
    input().value = '';
    btn().click();
    expect(items().length).to.equal(countBefore);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Todo List</title>
  </head>
  <body>
    <input id="todo-input" type="text" placeholder="Enter a todo">
    <button id="add-btn">Add</button>
    <ul id="todo-list"></ul>
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
input, button {
  font-size: 16px;
  padding: 5px 10px;
}
#todo-list {
  margin-top: 15px;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- Get references to the input, the button, and the `<ul>`.
- In the click handler, read `input.value` and only create an `<li>` if the value is not empty.
- Set the `<li>`'s `textContent` to the input value, then append it to the list.
- Set `input.value = ''` to clear the input after adding.

# Solution

```javascript
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');

addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text === '') {
    return;
  }

  const li = document.createElement('li');
  li.textContent = text;
  todoList.appendChild(li);

  todoInput.value = '';
});
```

# Walkthrough

1. Get references to the todo input, the **Add** button, and the todo list `<ul>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Read the input value and trim it.
   - If the trimmed value is empty, return early so nothing is added.
   - Create a new `<li>`, set its `textContent` to the value, and append it to the list.
   - Clear the input by setting `todoInput.value = ''`.
4. Returning early for empty input prevents blank list items from being created.
