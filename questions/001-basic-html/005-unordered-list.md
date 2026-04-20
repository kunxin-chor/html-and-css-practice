# Question

Create an unordered list of your three favorite fruits. The list items, in order, must be:

1. Apple
2. Banana
3. Cherry

# Test Cases

```
describe('Unordered list', () => {
  it('should contain exactly one <ul> element', () => {
    expect(document.querySelectorAll('ul').length).to.equal(1);
  });

  it('should contain exactly three <li> elements inside the <ul>', () => {
    const items = document.querySelectorAll('ul > li');
    expect(items.length).to.equal(3);
  });
});
```

```
describe('List items in order', () => {
  it('should list Apple, Banana, Cherry in that order', () => {
    const items = Array.from(document.querySelectorAll('ul > li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal(['Apple', 'Banana', 'Cherry']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Favorite Fruits</title>
  </head>
  <body>
    <h1>My Favorite Fruits</h1>
    <!-- Add your unordered list here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<ul>` creates an unordered (bulleted) list.
- Each item inside the list uses `<li>`.
- Keep the order the same as the question.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Favorite Fruits</title>
  </head>
  <body>
    <h1>My Favorite Fruits</h1>
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>
  </body>
</html>
```

# Walkthrough

1. After the `<h1>`, open a `<ul>` tag.
2. Inside the `<ul>`, add three `<li>` elements — one per fruit.
   - Pseudocode:
     ```
     <ul>
       <li>fruit 1</li>
       <li>fruit 2</li>
       <li>fruit 3</li>
     </ul>
     ```
3. Close the `</ul>`.
4. Verify in the preview that you see three bulleted items in the correct order.
