# Question

The page has five checkboxes representing hobbies (Reading, Coding, Hiking, Gaming, Cooking), a button labelled **Count**, and an empty `<div>` that will display the result.

When the user clicks the **Count** button, the result `<div>` should display how many of the checkboxes are currently checked.

For example, if the user has ticked **Reading** and **Hiking** and then clicks **Count**, the result `<div>` should show:

```
2
```

If the user changes their selections and clicks **Count** again, the displayed count should update.

# Test Cases

```
describe('form processing - count checkboxes', () => {
  const setChecked = (ids) => {
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = ids.includes(cb.id);
    });
  };
  const click = () => document.querySelector('#count-btn').click();
  const getResult = () => document.querySelector('#result').textContent.trim();

  it('reports 0 when nothing is checked', () => {
    setChecked([]);
    click();
    expect(getResult()).to.equal('0');
  });

  it('reports the correct count when some are checked', () => {
    setChecked(['hobby-reading', 'hobby-hiking']);
    click();
    expect(getResult()).to.equal('2');
  });

  it('reports 5 when all are checked', () => {
    setChecked(['hobby-reading', 'hobby-coding', 'hobby-hiking', 'hobby-gaming', 'hobby-cooking']);
    click();
    expect(getResult()).to.equal('5');
  });

  it('updates when selections change', () => {
    setChecked(['hobby-reading', 'hobby-hiking']);
    click();
    setChecked(['hobby-coding']);
    click();
    expect(getResult()).to.equal('1');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Count Checkboxes</title>
  </head>
  <body>
    <fieldset>
      <legend>Hobbies</legend>
      <label><input id="hobby-reading" type="checkbox"> Reading</label>
      <label><input id="hobby-coding"  type="checkbox"> Coding</label>
      <label><input id="hobby-hiking"  type="checkbox"> Hiking</label>
      <label><input id="hobby-gaming"  type="checkbox"> Gaming</label>
      <label><input id="hobby-cooking" type="checkbox"> Cooking</label>
    </fieldset>

    <button id="count-btn">Count</button>
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
  font-size: 24px;
  font-weight: bold;
}
```

## JavaScript

```javascript
// Write your code here
```

## Hints

- `document.querySelectorAll(...)` returns a `NodeList` of every element that matches a selector.
- A checkbox's `.checked` property is `true` when it's ticked and `false` when it isn't.
- You can loop over the NodeList and count, or use array methods like `.filter()` after spreading it into an array.

# Solution

```javascript
const countBtn = document.querySelector('#count-btn');
const resultDiv = document.querySelector('#result');

countBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let count = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      count = count + 1;
    }
  });
  resultDiv.textContent = count;
});
```

# Walkthrough

1. Get a reference to the **Count** button and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Use `querySelectorAll('input[type="checkbox"]')` to get every checkbox.
   - Loop through them and count the ones whose `.checked` is `true`.
   - Set the result `<div>`'s `.textContent` to the count.
4. A more concise alternative: `[...checkboxes].filter(cb => cb.checked).length`.
