# Question

The page already loads Bootstrap 5 CSS and has an empty container `<div class="row" id="team-row">`.

You are given the following array of team member objects in the starter JavaScript:

```javascript
const TEAM = [
  { name: 'Alice', role: 'Developer', bio: 'Builds front-end features.' },
  { name: 'Bob', role: 'Designer', bio: 'Creates user interfaces.' },
  { name: 'Carla', role: 'Manager', bio: 'Keeps the team on track.' },
];
```

When the page loads, render each team member as a Bootstrap card inside a column. Each card should use the Bootstrap classes `col-md-4` for the wrapper, `card`, `card-body`, `card-title`, `card-subtitle`, and `card-text`.

Use `document.createElement`, `appendChild`, and nested structures to build the cards.

# Test Cases

```
describe('append child revision - bootstrap cards', () => {
  it('renders one card per team member', () => {
    const cards = document.querySelectorAll('#team-row .card');
    expect(cards.length).to.equal(3);
  });

  it('renders one card-title per member with the name', () => {
    const titles = [...document.querySelectorAll('#team-row .card-title')]
      .map((h) => h.textContent.trim());
    expect(titles).to.deep.equal(['Alice', 'Bob', 'Carla']);
  });

  it('renders one card-subtitle per member with the role', () => {
    const subtitles = [...document.querySelectorAll('#team-row .card-subtitle')]
      .map((h) => h.textContent.trim());
    expect(subtitles).to.include.members(['Developer', 'Designer', 'Manager']);
  });

  it('renders card-text with the bios', () => {
    const texts = [...document.querySelectorAll('#team-row .card-text')]
      .map((p) => p.textContent.trim());
    expect(texts).to.include.members([
      'Builds front-end features.',
      'Creates user interfaces.',
      'Keeps the team on track.',
    ]);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Cards Revision</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container mt-4">
      <div class="row" id="team-row"></div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* No custom CSS needed for this question. */
```

## JavaScript

```javascript
const TEAM = [
  { name: 'Alice', role: 'Developer', bio: 'Builds front-end features.' },
  { name: 'Bob', role: 'Designer', bio: 'Creates user interfaces.' },
  { name: 'Carla', role: 'Manager', bio: 'Keeps the team on track.' },
];

// Write your code here
```

## Hints

- For each team member, create a column wrapper `<div class="col-md-4">` first.
- Inside the column, create the `<div class="card">`, then `<div class="card-body">`.
- Inside the card body, create the title, subtitle, and text elements with their Bootstrap classes.
- Use `.appendChild` to build the hierarchy from the inside out.

# Solution

```javascript
const TEAM = [
  { name: 'Alice', role: 'Developer', bio: 'Builds front-end features.' },
  { name: 'Bob', role: 'Designer', bio: 'Creates user interfaces.' },
  { name: 'Carla', role: 'Manager', bio: 'Keeps the team on track.' },
];

const row = document.querySelector('#team-row');
for (const member of TEAM) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-3';

  const card = document.createElement('div');
  card.className = 'card';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = member.name;

  const subtitle = document.createElement('h6');
  subtitle.className = 'card-subtitle mb-2 text-muted';
  subtitle.textContent = member.role;

  const text = document.createElement('p');
  text.className = 'card-text';
  text.textContent = member.bio;

  body.appendChild(title);
  body.appendChild(subtitle);
  body.appendChild(text);
  card.appendChild(body);
  col.appendChild(card);
  row.appendChild(col);
}
```

# Walkthrough

1. Get a reference to the `<div class="row" id="team-row">`.
2. Loop over the `TEAM` array.
3. For each member:
   - Create a column wrapper with `className = 'col-md-4 mb-3'`.
   - Create a card element with `className = 'card'`.
   - Create a card body with `className = 'card-body'`.
   - Create the title (`h5`, `card-title`), subtitle (`h6`, `card-subtitle mb-2 text-muted`), and text (`p`, `card-text`).
   - Set the content of each element from the member object.
   - Assemble the hierarchy: body → title, subtitle, text; card → body; column → card; row → column.
4. When the script finishes, the row contains three Bootstrap cards side-by-side on medium screens and larger.
