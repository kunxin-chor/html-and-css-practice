# Question

Write out the cooking instructions for boiling pasta as an **ordered** (numbered) list with five steps, in this order:

1. Boil water
2. Add salt
3. Add pasta
4. Cook for 10 minutes
5. Drain and serve

Use an `<ol>` element — not `<ul>`.

# Answer

Use an `<ol>` with five `<li>` children inside `<body>`.

# Test Cases

```
describe('Ordered list', () => {
  it('should contain exactly one <ol> element', () => {
    expect(document.querySelectorAll('ol').length).to.equal(1);
  });

  it('should not use a <ul>', () => {
    expect(document.querySelectorAll('ul').length).to.equal(0);
  });

  it('should contain exactly five <li> elements inside the <ol>', () => {
    expect(document.querySelectorAll('ol > li').length).to.equal(5);
  });
});
```

```
describe('Step order', () => {
  it('should list the five steps in the correct order', () => {
    const items = Array.from(document.querySelectorAll('ol > li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal([
      'Boil water',
      'Add salt',
      'Add pasta',
      'Cook for 10 minutes',
      'Drain and serve',
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
    <title>How to boil pasta</title>
  </head>
  <body>
    <h1>How to boil pasta</h1>
    <!-- Add your ordered list here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<ol>` renders a numbered list; `<ul>` renders a bulleted list — be sure to use the right one.
- Both still use `<li>` for their items.
- The browser numbers the steps automatically.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>How to boil pasta</title>
  </head>
  <body>
    <h1>How to boil pasta</h1>
    <ol>
      <li>Boil water</li>
      <li>Add salt</li>
      <li>Add pasta</li>
      <li>Cook for 10 minutes</li>
      <li>Drain and serve</li>
    </ol>
  </body>
</html>
```

# Walkthrough

1. Open an `<ol>` (not `<ul>`) after the `<h1>`.
2. Add five `<li>` elements with the steps in order.
3. Close `</ol>`.
