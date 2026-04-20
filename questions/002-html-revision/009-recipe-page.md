# Question

Put everything from this category together and build a small **recipe page** for pancakes. The page must contain all of the following, in this order:

1. A top-level heading `<h1>` with the text `Fluffy Pancakes`.
2. A tagline `<p>` directly under the `<h1>` with the text `A classic weekend breakfast recipe.`
3. An `<h2>` saying `Links & Photo`, followed by:
   - a link `<a href="https://en.wikipedia.org/wiki/Pancake">Wikipedia: Pancake</a>`
   - a link `<a href="https://example.com/pancakes">Full recipe on example.com</a>`
   - an `<img>` with `src="https://picsum.photos/320/200"` and `alt="A stack of pancakes"`
4. An `<h2>` saying `Ingredients`, followed by an **unordered** list (`<ul>`) with exactly these five items in order: `Flour`, `Milk`, `Eggs`, `Sugar`, `Butter`.
5. An `<h2>` saying `Steps`, followed by an **ordered** list (`<ol>`) with exactly these five items in order: `Mix dry ingredients`, `Add milk and eggs`, `Melt butter`, `Cook on the pan`, `Serve hot`.
6. An `<h2>` saying `Nutrition`, followed by a `<table>` with:
   - a `<thead>` containing one row with three `<th>` cells: `Nutrient`, `Amount`, `Daily Value`
   - a `<tbody>` with three rows:
     - `Calories` / `220` / `11%`
     - `Protein` / `6g` / `12%`
     - `Fat` / `8g` / `10%`

# Answer

Combine every element from this category — headings, paragraphs, links, images, lists, and a table — into one document.

# Test Cases

```
describe('Main heading and tagline', () => {
  it('has exactly one <h1> with text "Fluffy Pancakes"', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).to.equal(1);
    expect(h1s[0].textContent.trim()).to.equal('Fluffy Pancakes');
  });

  it('the first <p> is the tagline directly after the <h1>', () => {
    const firstP = document.querySelector('p');
    expect(firstP).to.exist;
    expect(firstP.textContent.trim()).to.equal('A classic weekend breakfast recipe.');
  });
});
```

```
describe('Section headings', () => {
  it('has four <h2> sub-headings in the expected order', () => {
    const titles = Array.from(document.querySelectorAll('h2'))
      .map(h => h.textContent.trim());
    expect(titles).to.deep.equal([
      'Links & Photo',
      'Ingredients',
      'Steps',
      'Nutrition',
    ]);
  });
});
```

```
describe('Links & Photo section', () => {
  it('has a Wikipedia link with the correct href and text', () => {
    const links = Array.from(document.querySelectorAll('a'));
    const wiki = links.find(a => a.getAttribute('href') === 'https://en.wikipedia.org/wiki/Pancake');
    expect(wiki, 'expected a link to Wikipedia').to.exist;
    expect(wiki.textContent.trim()).to.equal('Wikipedia: Pancake');
  });

  it('has a full-recipe link with the correct href and text', () => {
    const links = Array.from(document.querySelectorAll('a'));
    const match = links.find(a => a.getAttribute('href') === 'https://example.com/pancakes');
    expect(match, 'expected a link to example.com').to.exist;
    expect(match.textContent.trim()).to.equal('Full recipe on example.com');
  });

  it('has an <img> with the expected src and alt', () => {
    const img = document.querySelector('img');
    expect(img).to.exist;
    expect(img.getAttribute('src')).to.equal('https://picsum.photos/320/200');
    expect(img.getAttribute('alt')).to.equal('A stack of pancakes');
  });
});
```

```
describe('Ingredients list', () => {
  it('has an unordered list with five items in order', () => {
    const uls = document.querySelectorAll('ul');
    expect(uls.length).to.be.at.least(1);
    const items = Array.from(uls[0].querySelectorAll('li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal(['Flour', 'Milk', 'Eggs', 'Sugar', 'Butter']);
  });
});
```

```
describe('Steps list', () => {
  it('has an ordered list with the five steps in order', () => {
    const ols = document.querySelectorAll('ol');
    expect(ols.length).to.be.at.least(1);
    const items = Array.from(ols[0].querySelectorAll('li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal([
      'Mix dry ingredients',
      'Add milk and eggs',
      'Melt butter',
      'Cook on the pan',
      'Serve hot',
    ]);
  });
});
```

```
describe('Nutrition table', () => {
  it('has one <table> with one <thead> and one <tbody>', () => {
    expect(document.querySelectorAll('table').length).to.equal(1);
    expect(document.querySelectorAll('table > thead').length).to.equal(1);
    expect(document.querySelectorAll('table > tbody').length).to.equal(1);
  });

  it('has a header row with Nutrient, Amount, Daily Value', () => {
    const ths = document.querySelectorAll('thead > tr > th');
    expect(ths.length).to.equal(3);
    const labels = Array.from(ths).map(th => th.textContent.trim());
    expect(labels).to.deep.equal(['Nutrient', 'Amount', 'Daily Value']);
  });

  it('has three body rows with the correct values', () => {
    const expected = [
      ['Calories', '220', '11%'],
      ['Protein', '6g', '12%'],
      ['Fat', '8g', '10%'],
    ];
    const rows = document.querySelectorAll('tbody > tr');
    expect(rows.length).to.equal(3);
    expected.forEach((row, i) => {
      const cells = rows[i].querySelectorAll('td');
      expect(cells.length).to.equal(3);
      const values = Array.from(cells).map(c => c.textContent.trim());
      expect(values).to.deep.equal(row);
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
    <title>Fluffy Pancakes</title>
  </head>
  <body>
    <!-- Build your recipe page here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- Work top-to-bottom and run the tests as you go.
- The tagline is a plain `<p>` directly under the `<h1>` — the tests check it's the first `<p>` on the page.
- The Nutrition table has **three** columns (Nutrient, Amount, Daily Value) — don't forget the third one.
- The image uses Lorem Picsum: `https://picsum.photos/320/200`.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fluffy Pancakes</title>
  </head>
  <body>
    <h1>Fluffy Pancakes</h1>
    <p>A classic weekend breakfast recipe.</p>

    <h2>Links & Photo</h2>
    <a href="https://en.wikipedia.org/wiki/Pancake">Wikipedia: Pancake</a>
    <a href="https://example.com/pancakes">Full recipe on example.com</a>
    <img src="https://picsum.photos/320/200" alt="A stack of pancakes">

    <h2>Ingredients</h2>
    <ul>
      <li>Flour</li>
      <li>Milk</li>
      <li>Eggs</li>
      <li>Sugar</li>
      <li>Butter</li>
    </ul>

    <h2>Steps</h2>
    <ol>
      <li>Mix dry ingredients</li>
      <li>Add milk and eggs</li>
      <li>Melt butter</li>
      <li>Cook on the pan</li>
      <li>Serve hot</li>
    </ol>

    <h2>Nutrition</h2>
    <table>
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Amount</th>
          <th>Daily Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calories</td>
          <td>220</td>
          <td>11%</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>6g</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>8g</td>
          <td>10%</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

# Walkthrough

1. **Heading + tagline.** Add `<h1>Fluffy Pancakes</h1>` followed immediately by `<p>A classic weekend breakfast recipe.</p>`.
2. **Links & Photo section.** `<h2>Links & Photo</h2>`, then two `<a>` links (Wikipedia + example.com), then the `<img>` with Lorem Picsum src and correct alt.
3. **Ingredients section.** `<h2>Ingredients</h2>`, then a `<ul>` with five `<li>` items in the required order.
4. **Steps section.** `<h2>Steps</h2>`, then an `<ol>` (not `<ul>`) with five `<li>` items in the required order.
5. **Nutrition section.** `<h2>Nutrition</h2>`, then a `<table>` with a `<thead>` (three `<th>` cells) and a `<tbody>` (three `<tr>` rows, each with three `<td>` cells).
6. Save, refresh, and run the tests. Fix sections one at a time until everything is green.
