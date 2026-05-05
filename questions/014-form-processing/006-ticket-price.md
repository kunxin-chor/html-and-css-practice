# Question

A ticket booth charges:

- **$12 per ticket** on weekends (Saturday and Sunday)
- **$7 per ticket** on weekdays (Monday to Friday)

The page has a **Day of week** dropdown whose options have the values `1` through `7`, where `1` is Monday and `7` is Sunday (so `6` and `7` are the weekend). It also has a number input for the number of tickets, a button labelled **Calculate**, and an empty `<div>` that will display the result.

When the user clicks the **Calculate** button, the result `<div>` should display the total cost in the format `$N` (a leading dollar sign followed by the whole-number total).

Examples:

- Day = `3` (Wednesday), tickets = `4` → `$28`  (4 × $7)
- Day = `6` (Saturday), tickets = `4` → `$48`  (4 × $12)
- Day = `7` (Sunday),   tickets = `1` → `$12`
- Day = `1` (Monday),   tickets = `0` → `$0`

# Test Cases

```
describe('form processing - ticket price', () => {
  const setDay = (v) => { document.querySelector('#day').value = String(v); };
  const setTickets = (v) => { document.querySelector('#tickets').value = String(v); };
  const click = () => document.querySelector('#calc-btn').click();
  const getResult = () => document.querySelector('#result').textContent.trim();

  it('weekday rate ($7) for Wednesday', () => {
    setDay(3);
    setTickets(4);
    click();
    expect(getResult()).to.equal('$28');
  });

  it('weekday rate ($7) for Monday', () => {
    setDay(1);
    setTickets(5);
    click();
    expect(getResult()).to.equal('$35');
  });

  it('weekday rate ($7) for Friday', () => {
    setDay(5);
    setTickets(2);
    click();
    expect(getResult()).to.equal('$14');
  });

  it('weekend rate ($12) for Saturday', () => {
    setDay(6);
    setTickets(4);
    click();
    expect(getResult()).to.equal('$48');
  });

  it('weekend rate ($12) for Sunday', () => {
    setDay(7);
    setTickets(1);
    click();
    expect(getResult()).to.equal('$12');
  });

  it('zero tickets gives $0', () => {
    setDay(1);
    setTickets(0);
    click();
    expect(getResult()).to.equal('$0');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ticket Price</title>
  </head>
  <body>
    <label>
      Day of week:
      <select id="day">
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="7">Sunday</option>
      </select>
    </label>

    <label>
      Number of tickets:
      <input id="tickets" type="number" min="0" value="1">
    </label>

    <button id="calc-btn">Calculate</button>
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
label {
  display: inline-block;
  margin-right: 15px;
}
select, input, button {
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
//
// Reminder: input and select values are strings. Convert them to
// numbers (e.g. with Number()) before doing math or comparisons.
```

## Hints

- The day dropdown's value is a string from `'1'` to `'7'`. After converting it to a number, the weekend check is simply `day === 6 || day === 7` (or `day >= 6`).
- Pick the per-ticket price based on whether it's a weekend or weekday, then multiply by the ticket count.
- Build the result string by prefixing the total with `'$'`.

# Solution

```javascript
const daySelect = document.querySelector('#day');
const ticketsInput = document.querySelector('#tickets');
const calcBtn = document.querySelector('#calc-btn');
const resultDiv = document.querySelector('#result');

calcBtn.addEventListener('click', () => {
  const day = Number(daySelect.value);
  const tickets = Number(ticketsInput.value);

  const isWeekend = day === 6 || day === 7;
  const pricePerTicket = isWeekend ? 12 : 7;

  const total = pricePerTicket * tickets;
  resultDiv.textContent = '$' + total;
});
```

# Walkthrough

1. Get references to the day `<select>`, the tickets `<input>`, the **Calculate** button, and the result `<div>`.
2. Attach a `click` listener to the button.
3. Inside the listener:
   - Convert the day's value to a number.
   - Decide if it's a weekend (`6` or `7`) and pick `12` or `7` accordingly.
   - Convert the ticket count to a number and multiply by the per-ticket price.
   - Set the result `<div>`'s `textContent` to `'$'` followed by the total.
4. Without the `Number()` conversion the `*` operator would still work (JavaScript coerces strings for `*`), but the comparison `day === 6` would be `false` because `'6' === 6` is `false`.
