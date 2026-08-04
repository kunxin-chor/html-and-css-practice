# Question

The page already loads Bootstrap 5 CSS and has a Bootstrap navbar skeleton with an empty `<ul class="navbar-nav" id="nav-list">`.

You are given the following array of link objects in the starter JavaScript:

```javascript
const NAV_LINKS = [
  { text: 'Home', href: '#' },
  { text: 'Features', href: '#features' },
  { text: 'Pricing', href: '#pricing' },
  { text: 'About', href: '#about' },
];
```

When the page loads, render each link as a Bootstrap navbar item. Each item should be an `<li class="nav-item">` containing an `<a class="nav-link">` with the correct `href` and text.

Use `document.createElement`, `appendChild`, and a loop to build the navbar links.

# Test Cases

```
describe('append child - bootstrap navbar', () => {
  it('renders one nav-item per link', () => {
    const items = document.querySelectorAll('#nav-list > .nav-item');
    expect(items.length).to.equal(4);
  });

  it('renders nav-links with the correct text in order', () => {
    const links = [...document.querySelectorAll('#nav-list .nav-link')]
      .map((a) => a.textContent.trim());
    expect(links).to.deep.equal(['Home', 'Features', 'Pricing', 'About']);
  });

  it('renders nav-links with the correct href values', () => {
    const links = [...document.querySelectorAll('#nav-list .nav-link')]
      .map((a) => a.getAttribute('href'));
    expect(links).to.deep.equal(['#', '#features', '#pricing', '#about']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Navbar</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">My Site</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" id="nav-list"></ul>
        </div>
      </div>
    </nav>
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
const NAV_LINKS = [
  { text: 'Home', href: '#' },
  { text: 'Features', href: '#features' },
  { text: 'Pricing', href: '#pricing' },
  { text: 'About', href: '#about' },
];

// Write your code here
```

## Hints

- For each link, create an `<li>` with `className = 'nav-item'`.
- Inside the `<li>`, create an `<a>` with `className = 'nav-link'`, set its `href`, and set its `textContent`.
- Append the `<a>` to the `<li>`, then append the `<li>` to `#nav-list`.

# Solution

```javascript
const NAV_LINKS = [
  { text: 'Home', href: '#' },
  { text: 'Features', href: '#features' },
  { text: 'Pricing', href: '#pricing' },
  { text: 'About', href: '#about' },
];

const navList = document.querySelector('#nav-list');
for (const link of NAV_LINKS) {
  const li = document.createElement('li');
  li.className = 'nav-item';

  const a = document.createElement('a');
  a.className = 'nav-link';
  a.href = link.href;
  a.textContent = link.text;

  li.appendChild(a);
  navList.appendChild(li);
}
```

# Walkthrough

1. Get a reference to the `<ul class="navbar-nav" id="nav-list">`.
2. Loop over the `NAV_LINKS` array.
3. For each link:
   - Create an `<li>` element with `className = 'nav-item'`.
   - Create an `<a>` element with `className = 'nav-link'`.
   - Set the `<a>`'s `href` to `link.href` and its `textContent` to `link.text`.
   - Append the `<a>` to the `<li>`, then append the `<li>` to the navbar list.
4. When the script finishes, the navbar contains four Bootstrap nav links in order.
