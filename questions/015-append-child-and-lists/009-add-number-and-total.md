# Question

The page has:

- A number input (`#number-input`)
- An **Add** button (`#add-btn`)
- An empty `<ul>` (`#list`) that will show all numbers added so far
- A `<div id="total">` that will show the running total

Start from an empty array `numbers = []` in your script.

When the user types a number and clicks **Add**:

1. The typed value (converted to a number) should be **pushed** into the `numbers` array.
2. A function named **`drawList`** should be called to re-render the `<ul>` so that it shows one `<li>` per entry in the `numbers` array, in order.
3. The `#total` div should display the **sum** of every number currently in the array, in the format `Total: N` (plain number, no currency symbol).

Examples:

- Type `5`, click Add → list shows `5`; total shows `Total: 5`.
- Type `3`, click Add → list shows `5`, `3`; total shows `Total: 8`.
- Type `-2`, click Add → list shows `5`, `3`, `-2`; total shows `Total: 6`.

On page load (before any clicks) the list should be empty and the total should show `Total: 0`.

# Test Cases

```
describe('append child - add number and total', () => {
  const input = () => document.querySelector('#number-input');
  const add = () => document.querySelector('#add-btn').click();
  const items = () => [...document.querySelectorAll('#list > li')].map((li) => li.textContent.trim());
  const total = () => document.querySelector('#total').textContent.trim();

  it('starts empty with a total of 0', () => {
    expect(items()).to.deep.equal([]);
    expect(total()).to.equal('Total: 0');
  });

  it('drawList is a function', () => {
    expect(typeof window.drawList).to.equal('function');
  });

  it('adding a number pushes it to the list and updates the total', () => {
    input().value = '5';
    add();
    expect(items()).to.deep.equal(['5']);
    expect(total()).to.equal('Total: 5');
  });

  it('adds multiple numbers, keeping order and summing correctly', () => {
    input().value = '3';
    add();
    expect(items()).to.deep.equal(['5', '3']);
    expect(total()).to.equal('Total: 8');

    input().value = '-2';
    add();
    expect(items()).to.deep.equal(['5', '3', '-2']);
    expect(total()).to.equal('Total: 6');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Add Number and Total</title>
  </head>
  <body>
    <input id="number-input" type="number" placeholder="Enter a number">
    <button id="add-btn">Add</button>
    <ul id="list"></ul>
    <div id="total">Total: 0</div>
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
input, button {
  font-size: 16px;
  padding: 5px 10px;
}
#total {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}
```

## JavaScript

```javascript
const numbers = [];

// Write your code here.
//
// You need:
// - a drawList function that renders `numbers` into #list,
// - a click listener on #add-btn that pushes the input value into
//   `numbers`, calls drawList, and updates #total.
```

## Hints

- `numbers.push(Number(input.value))` to add the new number.
- `drawList` should clear `#list` first (`list.innerHTML = ''`) then append one `<li>` per number in the array.
- The total is the sum of `numbers`. You can compute it with `numbers.reduce((a, b) => a + b, 0)` or with a `for` loop.
- Remember to update `#total` every time a new number is added, not just once on load.

# Solution

```javascript
const numbers = [];

function drawList(arr) {
  const list = document.querySelector('#list');
  list.innerHTML = '';
  for (const n of arr) {
    const li = document.createElement('li');
    li.textContent = n;
    list.appendChild(li);
  }
}

const input = document.querySelector('#number-input');
const totalDiv = document.querySelector('#total');

document.querySelector('#add-btn').addEventListener('click', () => {
  numbers.push(Number(input.value));
  drawList(numbers);
  const total = numbers.reduce((sum, n) => sum + n, 0);
  totalDiv.textContent = 'Total: ' + total;
});
```

# Walkthrough

1. Define the `numbers` array at the top.
2. Define `drawList(arr)`: clear `#list`, loop over `arr`, append one `<li>` per entry.
3. Get references to the input, the Add button, and the total div.
4. In the button's `click` handler:
   - Convert `input.value` to a number and `push` it into `numbers`.
   - Call `drawList(numbers)` to refresh the list.
   - Compute the sum (e.g. with `reduce`) and set `totalDiv.textContent = 'Total: ' + sum`.
5. The starting HTML already shows `Total: 0`, which matches an empty array.
