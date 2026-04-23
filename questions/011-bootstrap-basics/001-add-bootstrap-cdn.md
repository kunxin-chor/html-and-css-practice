# Question

You have a plain HTML page with a single top-level `<div>` that will hold all of your page content. You need to start using **Bootstrap 5** on this page.

Your task is to:

1. Load Bootstrap's CSS from the official CDN by adding a `<link>` tag inside `<head>`. Use the Bootstrap 5 CSS CDN URL (any Bootstrap 5.x version is fine).
2. Add the Bootstrap `container` class to the existing main `<div>` so that its contents are centered with responsive horizontal padding.

You should **not** remove or rename the existing `<div class="main">` — just add `container` to its class list.

# Test Cases

```
describe('Add Bootstrap CDN and container class', () => {
  it('should include a Bootstrap 5 CSS <link> in the <head>', () => {
    const links = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
    const bootstrapLink = links.find((l) => /bootstrap.*\.css/i.test(l.getAttribute('href') || ''));
    expect(bootstrapLink, 'Expected a <link rel="stylesheet"> pointing to a Bootstrap CSS file').to.exist;
    expect(bootstrapLink.getAttribute('href')).to.match(/bootstrap@?5/i);
  });

  it('should load Bootstrap from a CDN (not a local path)', () => {
    const links = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
    const bootstrapLink = links.find((l) => /bootstrap.*\.css/i.test(l.getAttribute('href') || ''));
    expect(bootstrapLink).to.exist;
    expect(bootstrapLink.getAttribute('href')).to.match(/^https?:\/\//);
  });

  it('the main <div> should have both the "main" and "container" classes', () => {
    const main = document.querySelector('div.main');
    expect(main, 'Expected to still find <div class="main">').to.exist;
    expect(main.classList.contains('container')).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Start</title>
    <!-- Add the Bootstrap 5 CSS CDN link here -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="main">
      <h1>Welcome</h1>
      <p>This is the start of a Bootstrap page.</p>
    </div>
  </body>
</html>
```

## CSS

```css
/* No custom CSS needed for this question. */
```

## Hints

- The Bootstrap 5 CDN link looks like `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`.
- You can keep multiple class names on a single element by separating them with a space, e.g. `class="main container"`.
- Order matters: put the Bootstrap `<link>` **before** your own `style.css` so your styles can override Bootstrap if needed.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Start</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="main container">
      <h1>Welcome</h1>
      <p>This is the start of a Bootstrap page.</p>
    </div>
  </body>
</html>
```

# Walkthrough

1. Open `index.html`.
2. Inside the `<head>`, add a `<link rel="stylesheet" href="...">` that points to the Bootstrap 5 CSS on a CDN (e.g. jsDelivr).
3. Keep your own `style.css` link **after** the Bootstrap link so your rules can override Bootstrap's defaults later.
4. Find `<div class="main">` and add `container` to its `class` attribute: `class="main container"`.
5. Save and run the tests. Visually, the content should now be horizontally centered with responsive padding.
