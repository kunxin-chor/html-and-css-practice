# Question

The page has three paragraphs, all with the class `highlight`. Write JavaScript that gives **only the first one** a yellow background.

The second and third paragraphs must remain unchanged.

# Test Cases

```
describe('querySelector - class selector', () => {
  it('should set background color of the first .highlight to yellow', () => {
    const el = document.querySelector('.highlight');
    expect(el, 'Expected to find an element with class "highlight"').to.exist;
    const bg = el.style.backgroundColor || getComputedStyle(el).backgroundColor;
    expect(/yellow|rgb\(\s*255\s*,\s*255\s*,\s*0\s*\)/i.test(bg)).to.equal(true);
  });

  it('should NOT change the second .highlight element', () => {
    const all = document.querySelectorAll('.highlight');
    expect(all.length).to.be.at.least(2);
    const second = all[1];
    const bg = second.style.backgroundColor;
    expect(bg === '' || bg === undefined).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>querySelector class</title>
  </head>
  <body>
    <p class="highlight">First highlight</p>
    <p class="highlight">Second highlight</p>
    <p class="highlight">Third highlight</p>
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

- Some DOM methods return only the first matching element, others return all of them. Pick the right one.
- CSS properties with dashes become camelCase in JavaScript (e.g. `background-color` → `backgroundColor`).

# Solution

```javascript
const first = document.querySelector('.highlight');
first.style.backgroundColor = 'yellow';
```

# Walkthrough

1. Call `document.querySelector('.highlight')` to get the first matching element.
2. Set its `style.backgroundColor` to `'yellow'`.
3. The second and third paragraphs remain unchanged because `querySelector` only returns the first match.
