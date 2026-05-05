# Question

The page asks the user to choose how they heard about the site. There are four radio buttons:

- Search engine
- Friend
- Social media
- Other (with a text input next to it)

The text input next to **Other** should only be **enabled** when the **Other** radio button is currently selected. When any of the first three radio buttons is selected, the text input should be **disabled** so the user cannot type in it.

There is a button labelled **Submit** and an empty `<div>` that will display the result.

When the user clicks **Submit**, the result `<div>` should display:

- If a non-Other radio is selected: just the value of that radio button. e.g. `Search engine`
- If **Other** is selected: the text the user typed in the textbox, prefixed with `Other: `. e.g. if the user typed `A podcast`, the result should be `Other: A podcast`.

When the page first loads, no radio button is selected and the **Other** text input is disabled.

Useful reading:

- [`change` event / `onchange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
- [`disabled` property on form elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#instance_properties)

# Test Cases

```
describe('form processing - other radio with textbox', () => {
  const selectRadio = (value) => {
    const r = document.querySelector(`input[name="source"][value="${value}"]`);
    r.checked = true;
    r.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const click = () => document.querySelector('#submit-btn').click();
  const getResult = () => document.querySelector('#result').textContent.trim();
  const otherInput = () => document.querySelector('#other-text');

  it('the other textbox is disabled on page load', () => {
    expect(otherInput().disabled).to.equal(true);
  });

  it('reports the selected non-other radio value', () => {
    selectRadio('Search engine');
    click();
    expect(getResult()).to.equal('Search engine');
  });

  it('reports another non-other radio value', () => {
    selectRadio('Friend');
    click();
    expect(getResult()).to.equal('Friend');
  });

  it('enables the other textbox when Other is selected', () => {
    selectRadio('Other');
    expect(otherInput().disabled).to.equal(false);
  });

  it('disables the other textbox again when a non-other radio is selected', () => {
    selectRadio('Other');
    selectRadio('Social media');
    expect(otherInput().disabled).to.equal(true);
  });

  it('reports "Other: <text>" when Other is selected and a value is typed', () => {
    selectRadio('Other');
    otherInput().value = 'A podcast';
    click();
    expect(getResult()).to.equal('Other: A podcast');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>How did you hear about us?</title>
  </head>
  <body>
    <fieldset>
      <legend>How did you hear about us?</legend>
      <label><input type="radio" name="source" value="Search engine"> Search engine</label><br>
      <label><input type="radio" name="source" value="Friend"> Friend</label><br>
      <label><input type="radio" name="source" value="Social media"> Social media</label><br>
      <label>
        <input type="radio" name="source" value="Other"> Other:
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
  margin: 4px 0;
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

- An input's `.disabled` property can be set to `true` or `false` to disable / enable it.
- Listen for the `change` event on the radio buttons (one listener per radio, or one listener on a common parent) so you can react when the selection changes.
- When the **Other** radio is the one that's now checked, set the textbox's `.disabled = false`. Otherwise set `.disabled = true`.
- For the submit button's click handler, branch on whether the checked radio's value is `'Other'`.

# Solution

```javascript
const otherInput = document.querySelector('#other-text');
const radios = document.querySelectorAll('input[name="source"]');
const submitBtn = document.querySelector('#submit-btn');
const resultDiv = document.querySelector('#result');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const otherRadio = document.querySelector('input[name="source"][value="Other"]');
    otherInput.disabled = !otherRadio.checked;
  });
});

submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="source"]:checked');
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

1. Get references to the **Other** text input, every radio in the `source` group, the **Submit** button, and the result `<div>`.
2. For every radio button, attach a `change` listener:
   - When the change happens, look at whether the **Other** radio is the one that's now checked.
   - Set `otherInput.disabled` to `true` if Other is **not** checked, `false` if it **is**.
3. Attach a `click` listener to **Submit**:
   - Find the currently checked radio with `input[name="source"]:checked`.
   - If its value is `'Other'`, write `'Other: ' + otherInput.value` to the result.
   - Otherwise, write the radio's value directly.
4. The HTML starts with `disabled` already set on the textbox, so it's correctly disabled on page load.
