# Question

The page asks the user to rate a workshop. There are five radio buttons:

- 1
- 2
- 3
- 4
- Other (with a text input next to it)

The text input next to **Other** should only be **enabled** when the **Other** radio button is selected. When any of the numbered radio buttons is selected, the text input should be **disabled**.

There is a button labelled **Submit** and an empty `<div>` that will display the result.

When the user clicks **Submit**:

- If a numbered radio is selected, the result should show just that number (for example, `4`).
- If **Other** is selected, the result should show `Other: <text>` where `<text>` is whatever the user typed (for example, `Other: Great venue`).

When the page first loads, no radio button is selected and the **Other** text input is disabled.

# Test Cases

```
describe('form processing revision - workshop feedback', () => {
  const selectRadio = (value) => {
    const r = document.querySelector(`input[name="rating"][value="${value}"]`);
    r.checked = true;
    r.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const click = () => document.querySelector('#submit-btn').click();
  const result = () => document.querySelector('#result').textContent.trim();
  const otherInput = () => document.querySelector('#other-text');

  it('the other textbox is disabled on page load', () => {
    expect(otherInput().disabled).to.equal(true);
  });

  it('reports a numbered rating', () => {
    selectRadio('4');
    click();
    expect(result()).to.equal('4');
  });

  it('reports a different numbered rating', () => {
    selectRadio('2');
    click();
    expect(result()).to.equal('2');
  });

  it('enables the other textbox when Other is selected', () => {
    selectRadio('Other');
    expect(otherInput().disabled).to.equal(false);
  });

  it('disables the other textbox again when a numbered rating is selected', () => {
    selectRadio('Other');
    selectRadio('3');
    expect(otherInput().disabled).to.equal(true);
  });

  it('reports Other: <text> when Other is selected', () => {
    selectRadio('Other');
    otherInput().value = 'Great venue';
    click();
    expect(result()).to.equal('Other: Great venue');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Workshop Feedback</title>
  </head>
  <body>
    <fieldset>
      <legend>Rate this workshop</legend>
      <label><input type="radio" name="rating" value="1"> 1</label>
      <label><input type="radio" name="rating" value="2"> 2</label>
      <label><input type="radio" name="rating" value="3"> 3</label>
      <label><input type="radio" name="rating" value="4"> 4</label>
      <label>
        <input type="radio" name="rating" value="Other"> Other:
        <input id="other-text" type="text" disabled placeholder="Please specify">
      </label>
    </fieldset>

    <button id="submit-btn">Submit</button>
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
  display: inline-block;
  margin-right: 15px;
}
input[type="text"] {
  font-size: 14px;
  padding: 3px 6px;
  margin-left: 5px;
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

- Listen for the `change` event on the rating radio buttons. A single listener on the `<fieldset>` or one listener per radio both work.
- In the change handler, check whether the **Other** radio is currently checked. If it is, set `otherInput.disabled = false`; otherwise set it to `true`.
- For the submit handler, check the value of the checked radio. If it is `'Other'`, build the result as `'Other: ' + otherInput.value`. Otherwise, just show the rating value.

# Solution

```javascript
const otherInput = document.querySelector('#other-text');
const radios = document.querySelectorAll('input[name="rating"]');
const submitBtn = document.querySelector('#submit-btn');
const resultDiv = document.querySelector('#result');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const otherRadio = document.querySelector('input[name="rating"][value="Other"]');
    otherInput.disabled = !otherRadio.checked;
  });
});

submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="rating"]:checked');
  if (!selected) {
    resultDiv.textContent = '';
    return;
  }
  if (selected.value === 'Other') {
    resultDiv.textContent = 'Other: ' + otherInput.value;
  } else {
    resultDiv.textContent = selected.value;
  }
});
```

# Walkthrough

1. Get references to the **Other** text input, every radio in the `rating` group, the **Submit** button, and the result `<div>`.
2. Attach a `change` listener to each radio button:
   - Find the **Other** radio and check whether it is `.checked`.
   - Set `otherInput.disabled` to the opposite of that (disabled when Other is not selected).
3. Attach a `click` listener to the **Submit** button:
   - Find the currently checked radio.
   - If none is selected, clear the result.
   - If the selected value is `'Other'`, write `'Other: ' + otherInput.value`.
   - Otherwise, write the selected value directly.
4. The HTML starts with `disabled` on the textbox, so the initial state is correct.
