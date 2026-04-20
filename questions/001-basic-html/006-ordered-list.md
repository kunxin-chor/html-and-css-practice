# Question

Create an **ordered** (numbered) list showing the top 3 finishers of a race. The items, in order, must be:

1. Alice
2. Bob
3. Carol

The page must use an `<ol>` element — not `<ul>`.

# Test Cases

```
describe('Ordered list', () => {
  it('should contain exactly one <ol> element', () => {
    expect(document.querySelectorAll('ol').length).to.equal(1);
  });

  it('should not use a <ul> element', () => {
    expect(document.querySelectorAll('ul').length).to.equal(0);
  });

  it('should contain exactly three <li> elements inside the <ol>', () => {
    const items = document.querySelectorAll('ol > li');
    expect(items.length).to.equal(3);
  });
});
```

```
describe('Finisher order', () => {
  it('should list Alice, Bob, Carol in that order', () => {
    const items = Array.from(document.querySelectorAll('ol > li'))
      .map(li => li.textContent.trim());
    expect(items).to.deep.equal(['Alice', 'Bob', 'Carol']);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Race Results</title>
  </head>
  <body>
    <h1>Race Results</h1>
    <!-- Add your ordered list here -->
  </body>
</html>
```

## CSS

```css
```

## Hints

- `<ol>` creates an **o**rdered (numbered) list; `<ul>` is for **u**nordered bullet lists.
- Each item inside the list still uses `<li>`.
- The numbers are rendered automatically by the browser — you do not write "1.", "2.", etc. in the text.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Race Results</title>
  </head>
  <body>
    <h1>Race Results</h1>
    <ol>
      <li>Alice</li>
      <li>Bob</li>
      <li>Carol</li>
    </ol>
  </body>
</html>
```

# Walkthrough

1. After the `<h1>`, open an `<ol>` tag (not `<ul>`).
2. Inside the `<ol>`, add three `<li>` elements — one per finisher, in finishing order.
   - Pseudocode:
     ```
     <ol>
       <li>first place</li>
       <li>second place</li>
       <li>third place</li>
     </ol>
     ```
3. Close the `</ol>`.
4. Refresh the preview — the browser will automatically render "1.", "2.", "3." beside the names.
