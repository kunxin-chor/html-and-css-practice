# Question

The page has several paragraphs. Some have the class `item` and one does not. Write JavaScript so that **only the paragraphs with the class `item`** have blue text.

The paragraph without the `item` class must stay its default color.

# Test Cases

```
describe('querySelectorAll - change all colors', () => {
  it('should set all .item elements to blue', () => {
    const items = document.querySelectorAll('.item');
    expect(items.length).to.be.at.least(3);
    items.forEach((el) => {
      const color = el.style.color || getComputedStyle(el).color;
      expect(/blue|rgb\(\s*0\s*,\s*0\s*,\s*255\s*\)/i.test(color)).to.equal(true);
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
    <title>querySelectorAll color</title>
  </head>
  <body>
    <p class="item">Item one</p>
    <p class="item">Item two</p>
    <p class="item">Item three</p>
    <p>Not an item</p>
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

- CSS selectors work inside DOM queries too — classes, ids, tags, attributes.
- You'll need to iterate through a collection of elements.

# Solution

```javascript
const items = document.querySelectorAll('.item');
items.forEach((el) => {
  el.style.color = 'blue';
});
```

# Walkthrough

1. Select all elements with class `item` using `document.querySelectorAll('.item')`.
2. Loop through the NodeList with `forEach`.
3. Set each element's `style.color = 'blue'`.
4. The element without the `item` class remains unchanged.
