# Question

There is a plain-text file at this URL that contains a single line of text:

```
https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/messages.txt
```

Its contents are:

```
She sells seashells at the seashore
```

The page already loads **Bootstrap** and **axios** from a CDN. It has a heading and an empty `<div id="output">` styled as a Bootstrap card body.

When the page loads, your code should fetch that URL using **axios** with **async/await**, and put its contents into `#output` so that the file's text appears on the page.

If `#output` does not yet contain the file's text when the page first loads, that is fine — but it must contain the text shortly after (once the request resolves).

# Test Cases

```
describe('axios - read messages.txt', () => {
  const waitFor = async (fn, ms = 4000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      try { if (fn()) return; } catch (e) { /* keep trying */ }
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('Timed out waiting for condition');
  };

  it('axios is loaded on the page', () => {
    expect(window.axios, 'expected axios to be available as a global').to.exist;
  });

  it('eventually displays the file contents in #output', async () => {
    await waitFor(() =>
      document.querySelector('#output').textContent.includes('She sells seashells at the seashore')
    );
    expect(document.querySelector('#output').textContent.trim())
      .to.equal('She sells seashells at the seashore');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Read messages.txt</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios@1/dist/axios.min.js"></script>
  </head>
  <body class="bg-light">
    <div class="container py-4">
      <h1 class="h4 mb-3">Message of the day</h1>
      <div class="card">
        <div id="output" class="card-body"></div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
/* Optional: any small custom tweaks */
```

## JavaScript

```javascript
// Write your code here.
//
// Use axios + async/await to fetch the messages.txt file from the
// URL above and put the response text into the #output div.
```

## Hints

- `axios.get(url)` returns a Promise. With `await`, the resolved value has a `.data` property containing the response body.
- For a plain-text file, `response.data` will already be the string contents.
- Wrap your `await` calls inside an `async` function so you can use `await` at all.

# Solution

```javascript
const MESSAGES_URL = 'https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/refs/heads/master/messages.txt';

async function loadMessage() {
  const response = await axios.get(MESSAGES_URL);
  document.querySelector('#output').textContent = response.data;
}

loadMessage();
```

# Walkthrough

1. Define an `async` function (axios calls return Promises, so you need `async` to use `await`).
2. Inside the function, call `axios.get(MESSAGES_URL)` and `await` the result.
3. The resolved object has a `data` property — that's the text from the file.
4. Set `#output`'s `textContent` to `response.data`.
5. Call the function once at the bottom of the script so the request fires on page load.
