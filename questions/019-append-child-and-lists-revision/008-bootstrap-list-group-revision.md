# Question

The page already loads Bootstrap 5 CSS and has an empty container `<div class="list-group" id="settings-list">`.

You are given the following array in the starter JavaScript:

```javascript
const SETTINGS = ['Account', 'Privacy', 'Notifications', 'Display'];
```

When the page loads, render each item in the array as a Bootstrap list-group item. The first item should be marked as the active item by also including the `active` class.

Each item should be an `<a>` element with the classes `list-group-item`, `list-group-item-action`, and (for the first item only) `active`.

Use `document.createElement`, `appendChild`, and a loop to build the list.

# Test Cases

```
describe('append child revision - bootstrap list group', () => {
  it('renders one list-group-item per setting', () => {
    const items = document.querySelectorAll('#settings-list > .list-group-item');
    expect(items.length).to.equal(4);
  });

  it('renders the correct text in order', () => {
    const items = [...document.querySelectorAll('#settings-list > .list-group-item')]
      .map((el) => el.textContent.trim());
    expect(items).to.deep.equal(['Account', 'Privacy', 'Notifications', 'Display']);
  });

  it('each item is a list-group-item-action', () => {
    const items = document.querySelectorAll('#settings-list > .list-group-item');
    items.forEach((item) => {
      expect(item.classList.contains('list-group-item-action')).to.equal(true);
    });
  });

  it('marks the first item as active', () => {
    const first = document.querySelector('#settings-list > .list-group-item');
    expect(first.classList.contains('active')).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap List Group Revision</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container mt-4">
      <div class="list-group" id="settings-list"></div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* No custom CSS needed for this question. */
```

## JavaScript

```javascript
const SETTINGS = ['Account', 'Privacy', 'Notifications', 'Display'];

// Write your code here
```

## Hints

- Use a loop with an index so you can check whether the current item is the first one (`index === 0`).
- For the first item, include the `active` class along with `list-group-item` and `list-group-item-action`.
- You can build the class string as a template or use `classList.add` after setting the base class.

# Solution

```javascript
const SETTINGS = ['Account', 'Privacy', 'Notifications', 'Display'];

const list = document.querySelector('#settings-list');
SETTINGS.forEach((setting, index) => {
  const a = document.createElement('a');
  a.className = 'list-group-item list-group-item-action';
  if (index === 0) {
    a.classList.add('active');
  }
  a.href = '#';
  a.textContent = setting;
  list.appendChild(a);
});
```

# Walkthrough

1. Get a reference to the `<div class="list-group" id="settings-list">`.
2. Loop over the `SETTINGS` array, keeping track of the index.
3. For each item:
   - Create an `<a>` element.
   - Set its base classes to `'list-group-item list-group-item-action'`.
   - If the index is `0`, add the `active` class so the first item is highlighted.
   - Set `href` to `'#'` and `textContent` to the setting name.
   - Append the `<a>` to the list group container.
4. When the script finishes, the container contains four Bootstrap list-group items, with the first one marked active.
