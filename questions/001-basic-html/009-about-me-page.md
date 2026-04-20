# Question

Put everything from this category together and build a small **"About Me"** page. The page must contain all of the following, in this order:

1. A top-level heading `<h1>` with the text `About Me`.
2. An `<h2>` saying `Bio`, followed by a `<p>` with the text: `I am a web developer learning HTML.`
3. An `<h2>` saying `Hobbies`, followed by an **unordered** list (`<ul>`) with exactly these items in order: `Reading`, `Cycling`, `Cooking`.
4. An `<h2>` saying `Top 3 Favorite Foods`, followed by an **ordered** list (`<ol>`) with exactly these items in order: `Pizza`, `Sushi`, `Tacos`.
5. An `<h2>` saying `Profile`, followed by:
   - an `<img>` with `src="https://picsum.photos/200/200"` and `alt="My profile picture"`
   - a link `<a href="https://example.com">Visit my website</a>`
6. An `<h2>` saying `Schedule`, followed by a `<table>` with:
   - a `<thead>` containing one row with two `<th>` cells: `Day`, `Activity`
   - a `<tbody>` with two rows:
     - `Monday` / `Gym`
     - `Tuesday` / `Reading`

# Test Cases

```
describe('Main heading', () => {
  it('has exactly one <h1> with text "About Me"', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).to.equal(1);
    expect(h1s[0].textContent.trim()).to.equal('About Me');
  });
});
```

```
describe('Section headings', () => {
  it('has five <h2> sub-headings in the expected order', () => {
    const titles = Array.from(document.querySelectorAll('h2'))
      .map(h => h.textContent.trim());
    expect(titles).to.deep.equal([
      'Bio',
      'Hobbies',
      'Top 3 Favorite Foods',
      'Profile',
      'Schedule',
    ]);
  });
});
```

```
describe('Bio paragraph', () => {
  it('contains a <p> with the expected bio text', () => {
    const paragraphs = Array.from(document.querySelectorAll('p'))
      .map(p => p.textContent.trim());
    expect(paragraphs).to.include('I am a web developer learning HTML.');
  });
});
```

```
describe('Hobbies list', () => {
  it('has an unordered list with Reading, Cycling, Cooking in order', () => {
    const uls = document.querySelectorAll('ul');
    expect(uls.length).to.be.at.least(1);
    const items = Array.from(uls[0].querySelectorAll('li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal(['Reading', 'Cycling', 'Cooking']);
  });
});
```

```
describe('Favorite foods list', () => {
  it('has an ordered list with Pizza, Sushi, Tacos in order', () => {
    const ols = document.querySelectorAll('ol');
    expect(ols.length).to.be.at.least(1);
    const items = Array.from(ols[0].querySelectorAll('li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal(['Pizza', 'Sushi', 'Tacos']);
  });
});
```

```
describe('Profile image', () => {
  it('has an <img> with the expected src and alt', () => {
    const img = document.querySelector('img');
    expect(img).to.exist;
    expect(img.getAttribute('src')).to.equal('https://picsum.photos/200/200');
    expect(img.getAttribute('alt')).to.equal('My profile picture');
  });
});
```

```
describe('Profile link', () => {
  it('has an <a> linking to https://example.com with text "Visit my website"', () => {
    const links = Array.from(document.querySelectorAll('a'));
    const match = links.find(a => a.getAttribute('href') === 'https://example.com');
    expect(match, 'expected a link to https://example.com').to.exist;
    expect(match.textContent.trim()).to.equal('Visit my website');
  });
});
```

```
describe('Schedule table', () => {
  it('has a <table> with one <thead> and one <tbody>', () => {
    expect(document.querySelectorAll('table').length).to.equal(1);
    expect(document.querySelectorAll('table > thead').length).to.equal(1);
    expect(document.querySelectorAll('table > tbody').length).to.equal(1);
  });

  it('has a header row with Day and Activity', () => {
    const ths = document.querySelectorAll('thead > tr > th');
    expect(ths.length).to.equal(2);
    expect(ths[0].textContent.trim()).to.equal('Day');
    expect(ths[1].textContent.trim()).to.equal('Activity');
  });

  it('has two body rows with the correct values', () => {
    const bodyRows = document.querySelectorAll('tbody > tr');
    expect(bodyRows.length).to.equal(2);

    const row1 = bodyRows[0].querySelectorAll('td');
    expect(row1[0].textContent.trim()).to.equal('Monday');
    expect(row1[1].textContent.trim()).to.equal('Gym');

    const row2 = bodyRows[1].querySelectorAll('td');
    expect(row2[0].textContent.trim()).to.equal('Tuesday');
    expect(row2[1].textContent.trim()).to.equal('Reading');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <!-- Build your About Me page here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- Work top-to-bottom — add one section at a time and run the tests as you go.
- Review each earlier question in this category if you forget a tag: headings (`<h1>`/`<h2>`), paragraphs (`<p>`), links (`<a>`), images (`<img>`), unordered lists (`<ul>`), ordered lists (`<ol>`), and tables (`<table>` / `<thead>` / `<tbody>` / `<tr>` / `<th>` / `<td>`).
- Exact text matters — the tests compare strings including capitalisation and punctuation.
- The image source uses Lorem Picsum: `https://picsum.photos/200/200`.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>

    <h2>Bio</h2>
    <p>I am a web developer learning HTML.</p>

    <h2>Hobbies</h2>
    <ul>
      <li>Reading</li>
      <li>Cycling</li>
      <li>Cooking</li>
    </ul>

    <h2>Top 3 Favorite Foods</h2>
    <ol>
      <li>Pizza</li>
      <li>Sushi</li>
      <li>Tacos</li>
    </ol>

    <h2>Profile</h2>
    <img src="https://picsum.photos/200/200" alt="My profile picture">
    <p><a href="https://example.com">Visit my website</a></p>

    <h2>Schedule</h2>
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td>Gym</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>Reading</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

# Walkthrough

1. **Start with the main heading.** Add `<h1>About Me</h1>` inside `<body>`.
2. **Bio section.** Add `<h2>Bio</h2>`, then a `<p>` with the exact sentence from the brief.
3. **Hobbies section.** Add `<h2>Hobbies</h2>`, then a `<ul>` with three `<li>` items in the order `Reading`, `Cycling`, `Cooking`.
4. **Favorite foods section.** Add `<h2>Top 3 Favorite Foods</h2>`, then an `<ol>` (not `<ul>`) with three `<li>` items in the order `Pizza`, `Sushi`, `Tacos`.
5. **Profile section.** Add `<h2>Profile</h2>`, then the `<img>` with the Lorem Picsum src and correct alt, and a link wrapped in a `<p>` (so the link tests can pass either way).
6. **Schedule section.** Add `<h2>Schedule</h2>`, then a `<table>`:
   - Inside, add `<thead>` with one `<tr>` containing two `<th>` cells: `Day`, `Activity`.
   - After the thead, add `<tbody>` with two `<tr>` rows, each with two `<td>` cells for the day and activity.
7. Save, refresh the preview, and run the tests. Fix any failing sections one at a time.
