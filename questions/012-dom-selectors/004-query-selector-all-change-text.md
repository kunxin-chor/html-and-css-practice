# Question

The page contains a list of fruits. Write JavaScript so that every list item's text is replaced with the word **"Updated!"**.

Your solution must work even if more list items are added to the HTML later.

# Test Cases

```
describe('querySelectorAll - change all list items', () => {
  it('should change all <li> text to "Updated!"', () => {
    const items = document.querySelectorAll('li');
    expect(items.length).to.be.at.least(3);
    items.forEach((li) => {
      expect(li.textContent.trim()).to.equal('Updated!');
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
    <title>querySelectorAll</title>
  </head>
  <body>
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* No custom CSS needed */
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- There is a DOM method that returns *all* matching elements, not just the first one.
- The returned collection can be iterated like an array.

# Solution

```javascript
const items = document.querySelectorAll('li');
items.forEach((li) => {
  li.textContent = 'Updated!';
});
```

# Walkthrough

1. `document.querySelectorAll('li')` returns a NodeList of all `<li>` elements.
2. Iterate over each item using `forEach`.
3. For each element, set `textContent = 'Updated!'`.
4. All three list items should now display "Updated!".
