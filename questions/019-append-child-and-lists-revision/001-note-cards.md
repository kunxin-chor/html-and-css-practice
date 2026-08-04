# Question

The page has a button labelled **Add Note** and an empty `<div>` with `id="notes"`.

Every time the user clicks **Add Note**, a new `<div>` containing the text `Remember` should be appended to the end of `#notes`. Each new note should also have a **light blue** background colour.

For example, after clicking **Add Note** twice, `#notes` should contain two `<div>` elements, each with the text `Remember` and a light blue background.

# Test Cases

```
describe('append child revision - note cards', () => {
  const click = () => document.querySelector('#add-btn').click();
  const notes = () => document.querySelector('#notes');
  const items = () => notes().querySelectorAll('div');

  const isLightBlue = (color) => {
    const c = color.replace(/\s+/g, '').toLowerCase();
    return c === 'lightblue' || c === 'rgb(173,216,230)' || c === '#add8e6';
  };

  it('starts with no notes', () => {
    expect(items().length).to.equal(0);
  });

  it('appends one note per click', () => {
    click();
    click();
    click();
    expect(items().length).to.equal(3);
  });

  it('each note says Remember and has a light blue background', () => {
    click();
    items().forEach((note) => {
      expect(note.textContent.trim()).to.equal('Remember');
      const bg = note.style.backgroundColor || getComputedStyle(note).backgroundColor;
      expect(isLightBlue(bg)).to.equal(true);
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
    <title>Note Cards</title>
  </head>
  <body>
    <button id="add-btn">Add Note</button>
    <div id="notes"></div>
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
button {
  font-size: 16px;
  padding: 5px 10px;
  margin-bottom: 10px;
}
#notes div {
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
}
```

## JavaScript

```javascript
// Write your code here
//
// You can create a new DOM element with document.createElement(...),
// set its text with .textContent, style it with .style.backgroundColor,
// and attach it to another element with parent.appendChild(...).
```

## Hints

- Create the div with `document.createElement('div')`.
- Set its text with `.textContent = 'Remember'`.
- Set the background colour with `.style.backgroundColor = 'lightblue'`.
- Append it to the `#notes` div with `notes.appendChild(card)`.

# Solution

```javascript
const addBtn = document.querySelector('#add-btn');
const notes = document.querySelector('#notes');

addBtn.addEventListener('click', () => {
  const card = document.createElement('div');
  card.textContent = 'Remember';
  card.style.backgroundColor = 'lightblue';
  notes.appendChild(card);
});
```

# Walkthrough

1. Get references to the **Add Note** button and the `#notes` div.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Create a brand-new `<div>` with `document.createElement('div')`.
   - Set its `textContent` to `'Remember'`.
   - Set its `style.backgroundColor` to `'lightblue'`.
   - Call `notes.appendChild(card)` to attach it to the end of the notes div.
4. Because a new element is created on every click, each click produces one more note.
