# Question

The page shows a checklist of five daily tasks. Each task has a checkbox. There is a button labelled **Check Progress** and an empty `<div>` that will display the result.

When the user clicks **Check Progress**, the result `<div>` should show how many tasks are checked, in the format:

```
X of 5 completed
```

For example, if the user has ticked **Exercise** and **Read**, the result should be:

```
2 of 5 completed
```

If the user changes which tasks are checked and clicks again, the result should update.

# Test Cases

```
describe('form processing revision - task checklist', () => {
  const setChecked = (ids) => {
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = ids.includes(cb.id);
    });
  };
  const click = () => document.querySelector('#progress-btn').click();
  const result = () => document.querySelector('#result').textContent.trim();

  it('reports 0 of 5 when nothing is checked', () => {
    setChecked([]);
    click();
    expect(result()).to.equal('0 of 5 completed');
  });

  it('reports the count when some tasks are checked', () => {
    setChecked(['task-exercise', 'task-read']);
    click();
    expect(result()).to.equal('2 of 5 completed');
  });

  it('reports 5 of 5 when all tasks are checked', () => {
    setChecked(['task-exercise', 'task-meditate', 'task-read', 'task-clean', 'task-code']);
    click();
    expect(result()).to.equal('5 of 5 completed');
  });

  it('updates when selections change', () => {
    setChecked(['task-meditate', 'task-clean', 'task-code']);
    click();
    setChecked(['task-exercise']);
    click();
    expect(result()).to.equal('1 of 5 completed');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Task Checklist</title>
  </head>
  <body>
    <fieldset>
      <legend>Daily Tasks</legend>
      <label><input id="task-exercise" type="checkbox"> Exercise</label>
      <label><input id="task-meditate" type="checkbox"> Meditate</label>
      <label><input id="task-read" type="checkbox"> Read</label>
      <label><input id="task-clean" type="checkbox"> Clean room</label>
      <label><input id="task-code" type="checkbox"> Code</label>
    </fieldset>

    <button id="progress-btn">Check Progress</button>
    <div id="result"></div>
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
fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
fieldset label {
  display: block;
  margin: 4px 0;
}
button {
  font-size: 16px;
  padding: 5px 10px;
}
#result {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- Use `document.querySelectorAll('input[type="checkbox"]')` to get all checkboxes.
- Loop through them and count how many have `.checked` equal to `true`.
- Build the result string with the count and `' of 5 completed'`.

# Solution

```javascript
const progressBtn = document.querySelector('#progress-btn');
const resultDiv = document.querySelector('#result');

progressBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let count = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      count = count + 1;
    }
  });
  resultDiv.textContent = count + ' of 5 completed';
});
```

# Walkthrough

1. Get references to the **Check Progress** button and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Select every checkbox on the page.
   - Start a count at `0` and increment it for each checkbox that is checked.
   - Set the result `<div>`'s `.textContent` to `count + ' of 5 completed'`.
4. Clicking again recounts the current checkboxes, so updates work automatically.
