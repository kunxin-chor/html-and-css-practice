# Question

Put everything from this category together to style a **book product card**. The HTML markup is already provided — your job is to decide which selectors best match each visual goal described below, then write the CSS.

Your goal is to recreate this design:

![Book card target design](/images/proposed-solution-1.png)

## Visual goals

1. **Connect your stylesheet.** The HTML isn't loading `style.css` yet — fix that first.
2. **Page.** The page should sit on a soft off-white background.
3. **Card container.** The card should feel like a boxed product tile — give it comfortable internal spacing and a thin light-gray border so it separates from the page.
4. **Book title.** The main heading should be centred and use a darker, nearly-black colour (plain `black` is too harsh).
5. **Tagline.** The short line labelled as the tagline should read like a small-caps label: all-uppercase letters, a little extra space between characters, and a muted gray colour.
6. **Tag list.** Every item in the tag list should appear in green.
7. **Buy button.** The call-to-action button has two responsibilities split across two classes:
   - Its **base** styling should remove the default border and give it generous horizontal padding.
   - Its **primary** variant should fill it with a purple background and white text.
   - Your CSS must respect this split — one rule for the base styling, a separate rule for the primary colours, so the pattern works for future non-primary buttons too.

## Design tokens

Use these exact values so the tests can match your colours and sizes:

- Page background: `#fafafa`
- Card border: `1px solid #ccc`
- Card padding: `24px`
- Title colour: `#222`
- Tagline letter-spacing: `2px`
- Tag list colour: `green`
- Base button padding: `10px 20px`
- Primary button background: `purple`
- Primary button text: `white`

You decide which selectors to reach for. The tests check computed styles on the relevant elements, so **any** selector that correctly targets the element will pass — but the concepts you practised earlier in this category (id selectors, descendant selectors, element + class combinations, multi-class styling, text variants) are all usable here. Pick the one that best fits each goal.

# Answer

Read each visual goal and pick the selector that matches — ids for unique elements, classes for reusable labels, descendant selectors for "X inside Y", etc. Link the stylesheet first, then translate each goal into a rule.

# Test Cases

```
describe('External stylesheet', () => {
  it('<head> links style.css', () => {
    const link = document.querySelector('head link[rel="stylesheet"][href="style.css"]');
    expect(link, 'missing <link rel="stylesheet" href="style.css">').to.exist;
  });
});
```

```
describe('Page background', () => {
  it('body background is #fafafa', () => {
    expect(getComputedStyle(document.body).backgroundColor).to.equal('rgb(250, 250, 250)');
  });
});
```

```
describe('Card container (id selector)', () => {
  it('#book-card has 24px padding on all sides', () => {
    const el = document.querySelector('#book-card');
    expect(el).to.exist;
    const cs = getComputedStyle(el);
    expect(cs.paddingTop).to.equal('24px');
    expect(cs.paddingBottom).to.equal('24px');
    expect(cs.paddingLeft).to.equal('24px');
    expect(cs.paddingRight).to.equal('24px');
  });

  it('#book-card has a 1px solid #ccc border', () => {
    const el = document.querySelector('#book-card');
    const cs = getComputedStyle(el);
    expect(cs.borderTopWidth).to.equal('1px');
    expect(cs.borderTopStyle).to.equal('solid');
    expect(cs.borderTopColor).to.equal('rgb(204, 204, 204)');
  });
});
```

```
describe('Title (descendant of id)', () => {
  it('#book-card h1 is centered', () => {
    const el = document.querySelector('#book-card h1');
    expect(el).to.exist;
    expect(getComputedStyle(el).textAlign).to.equal('center');
  });

  it('#book-card h1 uses #222 text colour', () => {
    const el = document.querySelector('#book-card h1');
    expect(getComputedStyle(el).color).to.equal('rgb(34, 34, 34)');
  });
});
```

```
describe('Tagline (class selector)', () => {
  it('.tagline is uppercase', () => {
    const el = document.querySelector('.tagline');
    expect(el).to.exist;
    expect(getComputedStyle(el).textTransform).to.equal('uppercase');
  });

  it('.tagline has letter-spacing 2px', () => {
    const el = document.querySelector('.tagline');
    expect(getComputedStyle(el).letterSpacing).to.equal('2px');
  });

  it('.tagline is gray', () => {
    const el = document.querySelector('.tagline');
    expect(getComputedStyle(el).color).to.equal('rgb(128, 128, 128)');
  });
});
```

```
describe('Tag list items (descendant selector)', () => {
  it('every .tags li is green', () => {
    const items = document.querySelectorAll('.tags li');
    expect(items.length).to.be.at.least(1);
    items.forEach(li => {
      expect(getComputedStyle(li).color).to.equal('rgb(0, 128, 0)');
    });
  });
});
```

```
describe('Primary button (multiple classes)', () => {
  it('the button has both btn and primary classes', () => {
    const btn = document.querySelector('button');
    expect(btn).to.exist;
    expect(btn.classList.contains('btn')).to.equal(true);
    expect(btn.classList.contains('primary')).to.equal(true);
  });

  it('.btn padding is 10px 20px', () => {
    const btn = document.querySelector('button');
    const cs = getComputedStyle(btn);
    expect(cs.paddingTop).to.equal('10px');
    expect(cs.paddingBottom).to.equal('10px');
    expect(cs.paddingLeft).to.equal('20px');
    expect(cs.paddingRight).to.equal('20px');
  });

  it('.btn has no border', () => {
    const btn = document.querySelector('button');
    expect(getComputedStyle(btn).borderStyle).to.equal('none');
  });

  it('.primary has a purple background and white text', () => {
    const btn = document.querySelector('button');
    const cs = getComputedStyle(btn);
    expect(cs.backgroundColor).to.equal('rgb(128, 0, 128)');
    expect(cs.color).to.equal('rgb(255, 255, 255)');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Book card</title>
    <!-- Link style.css here -->
  </head>
  <body>
    <article id="book-card">
      <h1>The Pragmatic Programmer</h1>
      <p class="tagline">A modern classic</p>
      <p>A timeless guide for working programmers.</p>
      <ul class="tags">
        <li>software</li>
        <li>career</li>
        <li>craft</li>
      </ul>
      <button class="btn primary">Buy now</button>
    </article>
  </body>
</html>
```

## CSS

```css
/* Translate each visual goal from the question into a CSS rule. */
```

## Hints

- Work one visual goal at a time and run the tests after each — the test groups mirror the bulleted goals above.
- The tests check **computed styles**, so whichever selector you pick, as long as it lands on the right element with the right value, it passes.
- For each goal, ask: *is this element unique on the page (id), a reusable role (class), something nested inside another element (descendant selector), or a combination of behaviours (multiple classes)?*
- Look at the HTML — the class and id names already hint at what each part is responsible for.
- `border: 1px solid #ccc;` is shorthand — it sets width, style, and colour in one go.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Book card</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <article id="book-card">
      <h1>The Pragmatic Programmer</h1>
      <p class="tagline">A modern classic</p>
      <p>A timeless guide for working programmers.</p>
      <ul class="tags">
        <li>software</li>
        <li>career</li>
        <li>craft</li>
      </ul>
      <button class="btn primary">Buy now</button>
    </article>
  </body>
</html>
```

```css
body {
  background-color: #fafafa;
}

#book-card {
  padding: 24px;
  border: 1px solid #ccc;
}

#book-card h1 {
  text-align: center;
  color: #222;
}

.tagline {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: gray;
}

.tags li {
  color: green;
}

.btn {
  padding: 10px 20px;
  border: none;
}

.primary {
  background-color: purple;
  color: white;
}
```

# Walkthrough

1. **Link the stylesheet.** Inside `<head>`, add `<link rel="stylesheet" href="style.css">`.
2. **Page background.** Add a `body` rule with `background-color: #fafafa;`.
3. **Card container.** Add `#book-card { padding: 24px; border: 1px solid #ccc; }`.
4. **Title inside the card.** Use the descendant selector `#book-card h1` and set `text-align: center;` and `color: #222;`.
5. **Tagline.** Use `.tagline` and set `text-transform: uppercase; letter-spacing: 2px; color: gray;`.
6. **Tag list.** Use the descendant selector `.tags li` and set `color: green;`.
7. **Base button.** `.btn { padding: 10px 20px; border: none; }`.
8. **Primary variant.** `.primary { background-color: purple; color: white; }`.
9. Save, refresh, and run the tests — each group should pass in order.
