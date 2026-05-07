# Question

There is a JSON file at this URL:

```
https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/users.json
```

It contains an **object** whose `users` property is an array of user objects. Shape:

```json
{
  "users": [
    {
      "userId": 1,
      "firstName": "Krish",
      "lastName": "Lee",
      "phoneNumber": "123456",
      "emailAddress": "krish.lee@learningcontainer.com"
    },
    ...
  ]
}
```

Note that the array is **not** at the top level — it's at the `users` property of the root object.

The page already loads **Bootstrap** and **axios** from a CDN. It contains a `<ul id="users-list">` with **two example `<li>` items** already inside it. Use those examples as a visual reference for the format your output should produce — then **delete them from the HTML** before writing your solution. The tests will fail while the examples are still in place.

When the page loads, fetch that URL using **axios** with **async/await** and append one `<li>` to `#users-list` per user, in the same order as in the JSON.

Each `<li>` should have the text:

```
<firstName> <lastName> — <emailAddress> (<phoneNumber>)
```

Example:

```
Krish Lee — krish.lee@learningcontainer.com (123456)
```

# Test Cases

```
describe('axios - users.json', () => {
  const waitFor = async (fn, ms = 4000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('Timed out waiting for condition');
  };

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  it('renders one <li> per user, in order', async () => {
    await waitFor(() => document.querySelectorAll('#users-list > li').length >= 5);
    const items = [...document.querySelectorAll('#users-list > li')]
      .map((li) => norm(li.textContent));
    expect(items).to.deep.equal([
      'Krish Lee — krish.lee@learningcontainer.com (123456)',
      'racks jacson — racks.jacson@learningcontainer.com (123456)',
      'denial roast — denial.roast@learningcontainer.com (33333333)',
      'devid neo — devid.neo@learningcontainer.com (222222222)',
      'jone mac — jone.mac@learningcontainer.com (111111111)',
    ]);
  });

  it('does not render extra <li> items', async () => {
    await waitFor(() => document.querySelectorAll('#users-list > li').length >= 5);
    expect(document.querySelectorAll('#users-list > li').length).to.equal(5);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Users</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 class="h4 mb-3">Users</h1>
      <ul id="users-list">
        <!--
          The two <li> below are EXAMPLES showing what each rendered
          user should look like. Delete both before submitting —
          your JavaScript should produce one <li> per real user.
        -->
        <li>Example One — example.one@example.com (000000)</li>
        <li>Example Two — example.two@example.com (999999)</li>
      </ul>
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
// IMPORTANT: The starter HTML contains two example <li> items inside
// #users-list as a visual reference. Delete them from the HTML before
// running the tests — otherwise your output will have extra items.
//
// Use axios + async/await to fetch the users.json file from the URL
// above and append one <li> per user to #users-list.
```

## Hints

- After `await axios.get(...)`, the parsed JSON is in `response.data`. The array of users is at `response.data.users`, **not** `response.data` itself.
- Use `for...of` to loop over the users array and build each `<li>` with `document.createElement` + `textContent`.
- Use a template literal to build the line in the required format:
  `` `${user.firstName} ${user.lastName} — ${user.emailAddress} (${user.phoneNumber})` ``

# Solution

```javascript
const USERS_URL = 'https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/users.json';

async function loadUsers() {
  const response = await axios.get(USERS_URL);
  const users = response.data.users;

  const list = document.querySelector('#users-list');
  for (const user of users) {
    const li = document.createElement('li');
    li.textContent = `${user.firstName} ${user.lastName} — ${user.emailAddress} (${user.phoneNumber})`;
    list.appendChild(li);
  }
}

loadUsers();
```

# Walkthrough

1. Define an `async` function.
2. `await axios.get(USERS_URL)`. The resolved object has a `data` property holding the parsed JSON.
3. Remember the array lives at `response.data.users`, not `response.data` — so grab that.
4. Loop over the array with `for...of`. For each user:
   - Create a new `<li>`.
   - Build its text using a template literal: `` `${firstName} ${lastName} — ${emailAddress} (${phoneNumber})` ``.
   - Append it to `#users-list`.
5. Call the function once at the end of the script.
