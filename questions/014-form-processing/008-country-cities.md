# Question

The page has a **Country** dropdown that already lists two countries (Japan and France), an empty **City** dropdown, a button labelled **Show**, and an empty `<div>` that will display the result.

You are given a data object in the starter JavaScript that maps each country name to an array of city objects. Each city object has an `id` and a `name`:

```javascript
const COUNTRIES = {
  Japan: [
    { id: 'tyo', name: 'Tokyo' },
    { id: 'osa', name: 'Osaka' },
    { id: 'kyo', name: 'Kyoto' },
  ],
  France: [
    { id: 'par', name: 'Paris' },
    { id: 'lyo', name: 'Lyon' },
    { id: 'mar', name: 'Marseille' },
  ],
};
```

Behavior:

1. When the user picks a country from the Country dropdown, the City dropdown should be populated with that country's cities. Each city option should display the city's **name**, and its `value` should be the city's **id**.
2. If the user changes the country, the City dropdown should be re-populated with the cities of the newly chosen country (any previous options should be removed).
3. When the user clicks the **Show** button, the result `<div>` should display the **id** and **name** of the currently selected city in the format `id: name`. For example, if Tokyo is selected, the result should be:

   ```
   tyo: Tokyo
   ```

When the page first loads, no country is selected and the City dropdown is empty (apart from any placeholder you may keep).

Useful reading:

- [`change` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
- [`HTMLSelectElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)
- [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

# Test Cases

```
describe('form processing - country and cities', () => {
  const countrySelect = () => document.querySelector('#country');
  const citySelect = () => document.querySelector('#city');
  const result = () => document.querySelector('#result');

  const selectCountry = (value) => {
    const sel = countrySelect();
    sel.value = value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const selectCity = (id) => {
    citySelect().value = id;
  };
  const click = () => document.querySelector('#show-btn').click();

  it('populates cities for Japan', () => {
    selectCountry('Japan');
    const opts = [...citySelect().querySelectorAll('option')]
      .filter((o) => o.value !== '');
    expect(opts.length).to.equal(3);
    const ids = opts.map((o) => o.value);
    const names = opts.map((o) => o.textContent.trim());
    expect(ids).to.include.members(['tyo', 'osa', 'kyo']);
    expect(names).to.include.members(['Tokyo', 'Osaka', 'Kyoto']);
  });

  it('repopulates cities when country changes', () => {
    selectCountry('Japan');
    selectCountry('France');
    const opts = [...citySelect().querySelectorAll('option')]
      .filter((o) => o.value !== '');
    expect(opts.length).to.equal(3);
    const ids = opts.map((o) => o.value);
    expect(ids).to.include.members(['par', 'lyo', 'mar']);
    // No leftover Japanese cities
    expect(ids).to.not.include('tyo');
  });

  it('shows id: name for the selected city', () => {
    selectCountry('Japan');
    selectCity('tyo');
    click();
    expect(result().textContent.trim()).to.equal('tyo: Tokyo');
  });

  it('shows the right city after switching countries', () => {
    selectCountry('Japan');
    selectCountry('France');
    selectCity('lyo');
    click();
    expect(result().textContent.trim()).to.equal('lyo: Lyon');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Country and Cities</title>
  </head>
  <body>
    <label>
      Country:
      <select id="country">
        <option value="">-- choose a country --</option>
        <option value="Japan">Japan</option>
        <option value="France">France</option>
      </select>
    </label>

    <label>
      City:
      <select id="city">
        <option value="">-- choose a city --</option>
      </select>
    </label>

    <button id="show-btn">Show</button>
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
select, button {
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
const COUNTRIES = {
  Japan: [
    { id: 'tyo', name: 'Tokyo' },
    { id: 'osa', name: 'Osaka' },
    { id: 'kyo', name: 'Kyoto' },
  ],
  France: [
    { id: 'par', name: 'Paris' },
    { id: 'lyo', name: 'Lyon' },
    { id: 'mar', name: 'Marseille' },
  ],
};

// Write your code here
```

## Hints

- Build a new `<option>` element with `document.createElement('option')`. Set its `.value` and `.textContent`, then append it to the City dropdown.
- Before adding new options, clear the old ones. The simplest way is `citySelect.innerHTML = ''` (and then re-add the placeholder if you want one).
- Use `Array.prototype.find` on the country's array to look up the city object by id when the **Show** button is clicked.

# Solution

```javascript
const COUNTRIES = {
  Japan: [
    { id: 'tyo', name: 'Tokyo' },
    { id: 'osa', name: 'Osaka' },
    { id: 'kyo', name: 'Kyoto' },
  ],
  France: [
    { id: 'par', name: 'Paris' },
    { id: 'lyo', name: 'Lyon' },
    { id: 'mar', name: 'Marseille' },
  ],
};

const countrySelect = document.querySelector('#country');
const citySelect = document.querySelector('#city');
const showBtn = document.querySelector('#show-btn');
const resultDiv = document.querySelector('#result');

countrySelect.addEventListener('change', () => {
  const country = countrySelect.value;
  citySelect.innerHTML = '<option value="">-- choose a city --</option>';

  const cities = COUNTRIES[country] || [];
  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city.id;
    option.textContent = city.name;
    citySelect.appendChild(option);
  });
});

showBtn.addEventListener('click', () => {
  const country = countrySelect.value;
  const cityId = citySelect.value;
  const cities = COUNTRIES[country] || [];
  const city = cities.find((c) => c.id === cityId);
  if (city) {
    resultDiv.textContent = city.id + ': ' + city.name;
  }
});
```

# Walkthrough

1. Get references to the country `<select>`, city `<select>`, the **Show** button, and the result `<div>`.
2. Listen for the `change` event on the Country dropdown:
   - Read `countrySelect.value` — it will be `'Japan'`, `'France'`, or empty.
   - Clear the city dropdown by setting its `innerHTML` to an empty string (or a placeholder option).
   - Look up the matching cities array in `COUNTRIES[country]`.
   - For each city, create an `<option>` element, set its `value` to `city.id` and its `textContent` to `city.name`, then append it to the City dropdown.
3. Listen for the `click` event on the **Show** button:
   - Read the currently selected country and city id.
   - Use `Array.find` to locate the city object whose `id` matches.
   - Set the result `<div>`'s `textContent` to `city.id + ': ' + city.name`.
4. Switching the country re-runs the `change` handler, so old cities are wiped before new ones are added.
