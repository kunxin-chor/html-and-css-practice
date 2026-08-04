# Question

The page has two independent tag lists — a **Work** list and a **Personal** list. Each list has its own text input and its own **Add** button.

When the user types a tag into one of the inputs and clicks the matching **Add** button, the tag should be added as a new `<li>` to **only that list** (the other list should not change).

- Adding `urgent` via the Work Add button appends `<li>urgent</li>` to the Work list only.
- Adding `family` via the Personal Add button appends `<li>family</li>` to the Personal list only.

Clicking a list's **Add** button multiple times should keep appending items.

# Test Cases

```
describe('append child revision - two tag lists', () => {
  const workInput = () => document.querySelector('#work-input');
  const personalInput = () => document.querySelector('#personal-input');
  const workList = () => document.querySelector('#work-list');
  const personalList = () => document.querySelector('#personal-list');
  const addWork = () => document.querySelector('#work-add').click();
  const addPersonal = () => document.querySelector('#personal-add').click();

  it('adds a tag only to the work list', () => {
    workInput().value = 'urgent';
    addWork();
    const work = [...workList().querySelectorAll('li')].map((li) => li.textContent.trim());
    const personal = [...personalList().querySelectorAll('li')].map((li) => li.textContent.trim());
    expect(work).to.deep.equal(['urgent']);
    expect(personal).to.deep.equal([]);
  });

  it('adds a tag only to the personal list', () => {
    personalInput().value = 'family';
    addPersonal();
    const work = [...workList().querySelectorAll('li')].map((li) => li.textContent.trim());
    const personal = [...personalList().querySelectorAll('li')].map((li) => li.textContent.trim());
    expect(work).to.deep.equal(['urgent']);
    expect(personal).to.deep.equal(['family']);
  });

  it('appends multiple tags in order', () => {
    workInput().value = 'meeting';
    addWork();
    personalInput().value = 'shopping';
    addPersonal();
    personalInput().value = 'dinner';
    addPersonal();
    const work = [...workList().querySelectorAll('li')].map((li) => li.textContent.trim());
    const personal = [...personalList().querySelectorAll('li')].map((li) => li.textContent.trim());
    expect(work).to.deep.equal(['urgent', 'meeting']);
    expect(personal).to.deep.equal(['family', 'shopping', 'dinner']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Two Tag Lists</title>
  </head>
  <body>
    <section>
      <h3>Work</h3>
      <ul id="work-list"></ul>
      <input id="work-input" type="text" placeholder="Work tag">
      <button id="work-add">Add</button>
    </section>

    <section>
      <h3>Personal</h3>
      <ul id="personal-list"></ul>
      <input id="personal-input" type="text" placeholder="Personal tag">
      <button id="personal-add">Add</button>
    </section>

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
section {
  margin-bottom: 20px;
}
input, button {
  font-size: 16px;
  padding: 5px 10px;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- You need one click listener per button. Each listener reads from its own input and appends to its own list.
- To add a new list item: create an `<li>` with `document.createElement('li')`, set its `textContent`, and `appendChild` it to the correct `<ul>`.

# Solution

```javascript
const workInput = document.querySelector('#work-input');
const workList = document.querySelector('#work-list');
document.querySelector('#work-add').addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = workInput.value;
  workList.appendChild(li);
});

const personalInput = document.querySelector('#personal-input');
const personalList = document.querySelector('#personal-list');
document.querySelector('#personal-add').addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = personalInput.value;
  personalList.appendChild(li);
});
```

# Walkthrough

1. Grab references to the two inputs, the two `<ul>` elements, and the two buttons.
2. For each list, attach its own `click` handler to the matching button.
3. Inside each handler:
   - Create a fresh `<li>`.
   - Set its `textContent` to the matching input's `.value`.
   - Append it to the matching `<ul>`.
4. Because each handler only touches one list, the other list is untouched.
