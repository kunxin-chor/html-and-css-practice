# Question

A CSS rule already defines styling for elements with the class `active` (bold, green text). Write JavaScript that applies this class to every paragraph on the page.

When you're done, all paragraphs should render as bold green text — driven entirely by your JavaScript.

# Test Cases

```
describe('querySelectorAll - add class', () => {
  it('should add "active" class to every <p> element', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).to.be.at.least(3);
    paragraphs.forEach((p) => {
      expect(p.classList.contains('active')).to.equal(true);
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
    <title>Add class to all</title>
  </head>
  <body>
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <p>Third paragraph</p>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
.active {
  font-weight: bold;
  color: green;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- Elements have a property that lets you manipulate their list of CSS classes without overwriting existing ones.
- Remember: `querySelectorAll` returns multiple elements.

# Solution

```javascript
const paragraphs = document.querySelectorAll('p');
paragraphs.forEach((p) => {
  p.classList.add('active');
});
```

# Walkthrough

1. `document.querySelectorAll('p')` returns all paragraph elements.
2. Loop through with `forEach`.
3. Call `classList.add('active')` on each element.
4. All paragraphs should now appear bold and green (from the existing CSS).
