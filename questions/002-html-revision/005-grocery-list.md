# Question

Create an unordered list of items for a weekly grocery run. The list items, in order, must be:

1. Bread
2. Milk
3. Eggs
4. Butter
5. Cheese

# Test Cases

```
describe('Unordered list', () => {
  it('should contain exactly one <ul> element', () => {
    expect(document.querySelectorAll('ul').length).to.equal(1);
  });

  it('should contain exactly five <li> elements inside the <ul>', () => {
    expect(document.querySelectorAll('ul > li').length).to.equal(5);
  });
});
```

```
describe('List items in order', () => {
  it('should list Bread, Milk, Eggs, Butter, Cheese in that order', () => {
    const items = Array.from(document.querySelectorAll('ul > li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal(['Bread', 'Milk', 'Eggs', 'Butter', 'Cheese']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Grocery List</title>
  </head>
  <body>
    <h1>Weekly Groceries</h1>
    <!-- Add your unordered list here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<ul>` creates an unordered (bulleted) list.
- Each item is its own `<li>`.
- Bullets are drawn automatically — don't type them into the text.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Grocery List</title>
  </head>
  <body>
    <h1>Weekly Groceries</h1>
    <ul>
      <li>Bread</li>
      <li>Milk</li>
      <li>Eggs</li>
      <li>Butter</li>
      <li>Cheese</li>
    </ul>
  </body>
</html>
```

# Walkthrough

1. Open a `<ul>` after the `<h1>`.
2. Add five `<li>` elements with the items in the exact order listed.
3. Close `</ul>`.
