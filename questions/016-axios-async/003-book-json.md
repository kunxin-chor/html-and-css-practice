# Question

There is a JSON file at this URL:

```
https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/book.json
```

Its shape:

```json
{
  "title": "The Lord of the Rings",
  "author": "J.R.R. Tolkien",
  "year": 1954,
  "alternateTitles": ["The Fellowship of the Ring", "The Two Towers", "The Return of the King"],
  "tags": ["fantasy", "epic", "middle-earth"],
  "characters": [
    { "name": "Frodo Baggins", "role": "The One Ring Bearer", "race": "Hobbit" },
    { "name": "Gandalf",       "role": "Wizard",              "race": "Maia" },
    { "name": "Aragorn",       "role": "Ranger",              "race": "Human" }
  ]
}
```

The page already loads **Bootstrap** and **axios** from a CDN. It has these placeholders:

- `<h1 id="title">` — the book title
- `<p id="author">` — the author
- `<p id="year">` — the year
- `<ul id="tags-list">` — for the tag list
- `<ul id="characters-list">` — for the character list

When the page loads, fetch that URL using **axios** with **async/await** and:

1. Put the book's `title` into `#title`.
2. Put the `author` into `#author`.
3. Put the `year` into `#year`.
4. For each tag, append a `<li>` to `#tags-list` whose text is the tag.
5. For each character, append a `<li>` to `#characters-list` showing the character's name, role and race in this format:

   ```
   <name> — <role> (<race>)
   ```

   Example: `Frodo Baggins — The One Ring Bearer (Hobbit)`

The order in each list should match the order in the JSON.

# Test Cases

```
describe('axios - book.json', () => {
  const waitFor = async (fn, ms = 4000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('Timed out waiting for condition');
  };

  it('shows the title, author, and year', async () => {
    await waitFor(() =>
      document.querySelector('#title').textContent.includes('Lord of the Rings')
    );
    expect(document.querySelector('#title').textContent).to.include('The Lord of the Rings');
    expect(document.querySelector('#author').textContent).to.include('J.R.R. Tolkien');
    expect(document.querySelector('#year').textContent).to.include('1954');
  });

  it('renders the tag list in order', async () => {
    await waitFor(() => document.querySelectorAll('#tags-list > li').length >= 3);
    const tags = [...document.querySelectorAll('#tags-list > li')]
      .map((li) => li.textContent.trim());
    expect(tags).to.deep.equal(['fantasy', 'epic', 'middle-earth']);
  });

  it('renders the character list in order with name — role (race)', async () => {
    await waitFor(() => document.querySelectorAll('#characters-list > li').length >= 3);
    const chars = [...document.querySelectorAll('#characters-list > li')]
      .map((li) => li.textContent.replace(/\s+/g, ' ').trim());
    expect(chars[0]).to.equal('Frodo Baggins — The One Ring Bearer (Hobbit)');
    expect(chars[1]).to.equal('Gandalf — Wizard (Maia)');
    expect(chars[2]).to.equal('Aragorn — Ranger (Human)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Book Info</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 id="title" class="mb-1"></h1>
      <p id="author" class="text-muted mb-1"></p>
      <p id="year" class="text-muted"></p>

      <h2 class="h6 mt-4">Tags</h2>
      <ul id="tags-list" class="list-group mb-4"></ul>

      <h2 class="h6">Characters</h2>
      <ul id="characters-list" class="list-group"></ul>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* Optional */
```

## JavaScript

```javascript
// Write your code here.
//
// Use axios + async/await to fetch the book.json file from the URL
// above and render:
// - the book metadata into #title, #author, #year
// - one <li> per tag into #tags-list
// - one <li> per character into #characters-list, with text in the
//   format: "<name> — <role> (<race>)"
```

## Hints

- After `await axios.get(...)`, the parsed body lives at `response.data`.
- A small reusable helper that creates and appends a `<li>` saves repetition.
- For the character format, build the string with template literals: `` `${c.name} — ${c.role} (${c.race})` ``. The dash character is `—` (em dash).

# Solution

```javascript
const BOOK_URL = 'https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/book.json';

async function loadBook() {
  const { data: book } = await axios.get(BOOK_URL);

  document.querySelector('#title').textContent = book.title;
  document.querySelector('#author').textContent = book.author;
  document.querySelector('#year').textContent = book.year;

  const tagsList = document.querySelector('#tags-list');
  for (const tag of book.tags) {
    const li = document.createElement('li');
    li.textContent = tag;
    tagsList.appendChild(li);
  }

  const charactersList = document.querySelector('#characters-list');
  for (const c of book.characters) {
    const li = document.createElement('li');
    li.textContent = `${c.name} — ${c.role} (${c.race})`;
    charactersList.appendChild(li);
  }
}

loadBook();
```

# Walkthrough

1. Declare an `async` function and `await axios.get(BOOK_URL)`.
2. Destructure `data` from the response — that's the parsed JSON object.
3. Update `#title`, `#author`, `#year` with the corresponding fields.
4. Loop over `book.tags` with `for...of`, creating an `<li>` for each tag and appending to `#tags-list`.
5. Loop over `book.characters` similarly. Build each `<li>`'s text using a template literal in the required `name — role (race)` format.
6. Call the function once at the end of the script.
