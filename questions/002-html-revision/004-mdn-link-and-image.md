# Question

Add the following to the page, below the existing heading:

1. A link that says `Read the MDN docs` and goes to `https://developer.mozilla.org`.
2. A second link that says `Learn web.dev` and goes to `https://web.dev`.
3. An image with `src="https://picsum.photos/250/150"` and `alt="Code on a screen"`.

# Test Cases

```
describe('Links', () => {
  it('has exactly two <a> elements', () => {
    expect(document.querySelectorAll('a').length).to.equal(2);
  });

  it('has an MDN link with the correct href and text', () => {
    const links = Array.from(document.querySelectorAll('a'));
    const mdn = links.find(a => a.getAttribute('href') === 'https://developer.mozilla.org');
    expect(mdn, 'expected a link to https://developer.mozilla.org').to.exist;
    expect(mdn.textContent.trim()).to.equal('Read the MDN docs');
  });

  it('has a web.dev link with the correct href and text', () => {
    const links = Array.from(document.querySelectorAll('a'));
    const webdev = links.find(a => a.getAttribute('href') === 'https://web.dev');
    expect(webdev, 'expected a link to https://web.dev').to.exist;
    expect(webdev.textContent.trim()).to.equal('Learn web.dev');
  });
});
```

```
describe('Image', () => {
  it('has exactly one <img>', () => {
    expect(document.querySelectorAll('img').length).to.equal(1);
  });

  it('the <img> has the correct src and alt', () => {
    const img = document.querySelector('img');
    expect(img).to.exist;
    expect(img.getAttribute('src')).to.equal('https://picsum.photos/250/150');
    expect(img.getAttribute('alt')).to.equal('Code on a screen');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Learn Web Dev</title>
  </head>
  <body>
    <h1>Learn Web Dev</h1>
    <!-- Add two links and one image here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- Each link is its own `<a href="URL">text</a>` element — you'll need two of them.
- `<img>` is self-closing — no closing tag.
- The `alt` attribute is required for every image.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Learn Web Dev</title>
  </head>
  <body>
    <h1>Learn Web Dev</h1>
    <a href="https://developer.mozilla.org">Read the MDN docs</a>
    <a href="https://web.dev">Learn web.dev</a>
    <img src="https://picsum.photos/250/150" alt="Code on a screen">
  </body>
</html>
```

# Walkthrough

1. After the `<h1>`, add the first link: `<a href="https://developer.mozilla.org">Read the MDN docs</a>`.
2. Add the second link: `<a href="https://web.dev">Learn web.dev</a>`.
3. Add the image: `<img src="https://picsum.photos/250/150" alt="Code on a screen">`.
