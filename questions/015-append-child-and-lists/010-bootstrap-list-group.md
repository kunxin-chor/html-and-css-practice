# Question

The page already loads Bootstrap 5 CSS and has an empty container `<div class="list-group" id="menu-list">`.

You are given the following array in the starter JavaScript:

```javascript
const MENU_ITEMS = ['Dashboard', 'Profile', 'Settings', 'Logout'];
```

When the page loads, render each item in the array as a Bootstrap list-group item. Each item should be an `<a>` element with the classes `list-group-item` and `list-group-item-action`, and its text should be the item name.

Use `document.createElement`, `appendChild`, and a loop to build the list.

# Test Cases

```
describe('append child - bootstrap list group', () => {
  it('renders one list-group-item per menu item', () => {
    const items = document.querySelectorAll('#menu-list > .list-group-item');
    expect(items.length).to.equal(4);
  });

  it('renders the correct text in order', () => {
    const items = [...document.querySelectorAll('#menu-list > .list-group-item')]
      .map((el) => el.textContent.trim());
    expect(items).to.deep.equal(['Dashboard', 'Profile', 'Settings', 'Logout']);
  });

  it('each item is a list-group-item-action', () => {
    const items = document.querySelectorAll('#menu-list > .list-group-item');
    items.forEach((item) => {
      expect(item.classList.contains('list-group-item-action')).to.equal(true);
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
    <title>Bootstrap List Group</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container mt-4">
      <div class="list-group" id="menu-list"></div>
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
const MENU_ITEMS = ['Dashboard', 'Profile', 'Settings', 'Logout'];

// Write your code here
```

## Hints

- Create an `<a>` element for each item.
- Set `element.className = 'list-group-item list-group-item-action'` to apply both Bootstrap classes at once.
- Set `.textContent` to the item name and `.href` to `'#'`.
- Append each item to `#menu-list`.

# Solution

```javascript
const MENU_ITEMS = ['Dashboard', 'Profile', 'Settings', 'Logout'];

const list = document.querySelector('#menu-list');
for (const item of MENU_ITEMS) {
  const a = document.createElement('a');
  a.className = 'list-group-item list-group-item-action';
  a.href = '#';
  a.textContent = item;
  list.appendChild(a);
}
```

# Walkthrough

1. Get a reference to the `<div class="list-group" id="menu-list">`.
2. Loop over the `MENU_ITEMS` array.
3. For each item:
   - Create an `<a>` element.
   - Set its `className` to `'list-group-item list-group-item-action'` so it looks like a Bootstrap list-group item.
   - Set `href` to `'#'` and `textContent` to the item name.
   - Append the `<a>` to the list group container.
4. When the script finishes, the container contains four Bootstrap list-group items in order.
