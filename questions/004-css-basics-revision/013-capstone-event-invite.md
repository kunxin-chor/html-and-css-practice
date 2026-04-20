# Question

Put everything from this category together to style an **event invitation poster**. The design is intentionally very different from the book-card capstone: dark background, amber highlights, dashed border, left-aligned uppercase heading, and an outlined (not filled) button.

The HTML markup is provided. Your job is to read each visual goal, pick a selector that fits, and write the CSS.

Your goal is to recreate this design:

![Event poster target design](/images/proposed-solution-2.png)

**Starter CSS (do not modify):**

```css
#event-card a {
  color: black;
}
```

This rule will fight you when you style the register button — you'll need to beat it.

## Visual goals

1. **Connect your stylesheet.** The HTML isn't loading `style.css` yet — fix that first.
2. **Page.** The page sits on a very dark navy background — think "stage lights off".
3. **Card.** The invitation is a dark slate panel with an amber **dashed** border (not a solid one) and generous padding so it reads like a printed poster.
4. **Heading.** The event title is a poster-style wordmark: **left-aligned** (not centred), ALL CAPS, widely spaced letters, rendered in amber.
5. **Subtitle.** Italicised, white, with airy line-height so it breathes underneath the heading.
6. **Speaker list.** Every speaker item appears in white, in ALL CAPS, with extra vertical space between lines.
7. **Register button.** The register element is an `<a>` wearing two classes:
   - Its **base** styling gives it chunky padding, removes the default link underline, and gives it a thin **white outline border** so it looks like an outlined button (no background fill).
   - Its **call-to-action** variant makes the text bold.
   - Your CSS must respect this split — one rule for the outlined base, a separate rule for the CTA weight.
8. **Winning the colour fight.** The starter rule paints every link inside the card black. You need the register button's text to be **white** regardless — choose the minimum tool needed to override that starter rule.

## Design tokens

Use these exact values so the tests match your colours and sizes:

- Page background: `#0f172a`
- Card padding: `40px`
- Card border: `4px dashed #fbbf24`
- Card background: `#1e293b`
- Heading text-align: `left`
- Heading text-transform: `uppercase`
- Heading letter-spacing: `4px`
- Heading colour: `#fbbf24`
- Subtitle font-style: `italic`
- Subtitle colour: `white`
- Subtitle line-height: `1.8`
- Speaker list colour: `white`
- Speaker list text-transform: `uppercase`
- Speaker list line-height: `2`
- Register base padding: `14px 28px`
- Register base underline: removed
- Register base border: `2px solid white`
- Register CTA font-weight: `bold`
- Register CTA text colour: `white` (must win against the starter rule)

You pick the selectors. Any selector that correctly targets the right element and applies the tokenised values will pass.

# Answer

Link the stylesheet, then translate each visual goal into a CSS rule. The register button's colour override needs `!important` because a plain class selector can't beat `#event-card a`.

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
  it('body background is #0f172a', () => {
    expect(getComputedStyle(document.body).backgroundColor).to.equal('rgb(15, 23, 42)');
  });
});
```

```
describe('Card container', () => {
  it('#event-card has 40px padding', () => {
    const el = document.querySelector('#event-card');
    expect(el).to.exist;
    const cs = getComputedStyle(el);
    expect(cs.paddingTop).to.equal('40px');
    expect(cs.paddingBottom).to.equal('40px');
    expect(cs.paddingLeft).to.equal('40px');
    expect(cs.paddingRight).to.equal('40px');
  });

  it('#event-card has a 4px dashed amber border', () => {
    const el = document.querySelector('#event-card');
    const cs = getComputedStyle(el);
    expect(cs.borderTopWidth).to.equal('4px');
    expect(cs.borderTopStyle).to.equal('dashed');
    expect(cs.borderTopColor).to.equal('rgb(251, 191, 36)');
  });

  it('#event-card has a #1e293b background', () => {
    const el = document.querySelector('#event-card');
    expect(getComputedStyle(el).backgroundColor).to.equal('rgb(30, 41, 59)');
  });
});
```

```
describe('Heading', () => {
  it('#event-card h1 is LEFT-aligned', () => {
    const el = document.querySelector('#event-card h1');
    expect(el).to.exist;
    expect(getComputedStyle(el).textAlign).to.equal('left');
  });

  it('#event-card h1 is uppercase', () => {
    const el = document.querySelector('#event-card h1');
    expect(getComputedStyle(el).textTransform).to.equal('uppercase');
  });

  it('#event-card h1 has letter-spacing 4px', () => {
    const el = document.querySelector('#event-card h1');
    expect(getComputedStyle(el).letterSpacing).to.equal('4px');
  });

  it('#event-card h1 is amber (#fbbf24)', () => {
    const el = document.querySelector('#event-card h1');
    expect(getComputedStyle(el).color).to.equal('rgb(251, 191, 36)');
  });
});
```

```
describe('Subtitle', () => {
  it('.subtitle is italic', () => {
    const el = document.querySelector('.subtitle');
    expect(el).to.exist;
    expect(getComputedStyle(el).fontStyle).to.equal('italic');
  });

  it('.subtitle is white', () => {
    const el = document.querySelector('.subtitle');
    expect(getComputedStyle(el).color).to.equal('rgb(255, 255, 255)');
  });

  it('.subtitle has line-height ~1.8', () => {
    const el = document.querySelector('.subtitle');
    const cs = getComputedStyle(el);
    const ratio = parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
    expect(Math.abs(ratio - 1.8)).to.be.lessThan(0.05);
  });
});
```

```
describe('Speaker list', () => {
  it('every .speakers li is white', () => {
    const items = document.querySelectorAll('.speakers li');
    expect(items.length).to.be.at.least(1);
    items.forEach(li => {
      expect(getComputedStyle(li).color).to.equal('rgb(255, 255, 255)');
    });
  });

  it('every .speakers li is uppercase', () => {
    const items = document.querySelectorAll('.speakers li');
    items.forEach(li => {
      expect(getComputedStyle(li).textTransform).to.equal('uppercase');
    });
  });

  it('every .speakers li has line-height ~2', () => {
    const items = document.querySelectorAll('.speakers li');
    items.forEach(li => {
      const cs = getComputedStyle(li);
      const ratio = parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
      expect(Math.abs(ratio - 2)).to.be.lessThan(0.05);
    });
  });
});
```

```
describe('Register button (multiple classes)', () => {
  it('the register link has both btn and cta classes', () => {
    const a = document.querySelector('a.btn.cta');
    expect(a, 'expected <a class="btn cta">').to.exist;
  });

  it('.btn padding is 14px 28px', () => {
    const el = document.querySelector('a.btn.cta');
    const cs = getComputedStyle(el);
    expect(cs.paddingTop).to.equal('14px');
    expect(cs.paddingBottom).to.equal('14px');
    expect(cs.paddingLeft).to.equal('28px');
    expect(cs.paddingRight).to.equal('28px');
  });

  it('.btn removes the underline', () => {
    const el = document.querySelector('a.btn.cta');
    const deco = getComputedStyle(el).textDecorationLine || getComputedStyle(el).textDecoration;
    expect(deco).to.match(/none/);
  });

  it('.btn has a 2px solid white border', () => {
    const el = document.querySelector('a.btn.cta');
    const cs = getComputedStyle(el);
    expect(cs.borderTopWidth).to.equal('2px');
    expect(cs.borderTopStyle).to.equal('solid');
    expect(cs.borderTopColor).to.equal('rgb(255, 255, 255)');
  });

  it('.cta makes the text bold', () => {
    const el = document.querySelector('a.btn.cta');
    const weight = getComputedStyle(el).fontWeight;
    expect(['bold', '700']).to.include(weight);
  });
});
```

```
describe('Colour override with !important', () => {
  it('the register link ends up white, even though #event-card a is black', () => {
    const el = document.querySelector('a.btn.cta');
    expect(el).to.exist;
    expect(getComputedStyle(el).color).to.equal('rgb(255, 255, 255)');
  });

  it('a rule uses !important on color', () => {
    const sheets = Array.from(document.styleSheets);
    const allText = sheets
      .flatMap(s => {
        try {
          return Array.from(s.cssRules).map(r => r.cssText);
        } catch {
          return [];
        }
      })
      .join('\n');
    expect(allText).to.match(/color\s*:\s*white\s*!important/i);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event invite</title>
    <!-- Link style.css here -->
  </head>
  <body>
    <section id="event-card">
      <h1>Summer Conference</h1>
      <p class="subtitle">Three days of talks, two nights of music, one great city.</p>
      <ul class="speakers">
        <li>Ada Lovelace</li>
        <li>Grace Hopper</li>
        <li>Margaret Hamilton</li>
      </ul>
      <a href="/register" class="btn cta">Register now</a>
    </section>
  </body>
</html>
```

## CSS

```css
/* Starter rule — do not modify */
#event-card a {
  color: black;
}

/* Translate each visual goal from the question into a CSS rule below. */
```

## Hints

- Work one visual goal at a time and run the tests after each — the test groups mirror the bulleted goals above.
- The tests check **computed styles**, so whichever selector you pick, as long as it lands on the right element with the right value, it passes.
- For each goal, ask: *is this element unique on the page (id), a reusable role (class), something nested inside another element (descendant selector), or a combination of behaviours (multiple classes)?*
- `border: 4px dashed #fbbf24` is shorthand — it sets width, style, and colour together. `dashed` is critical; `solid` won't pass the style test.
- Line-height without a unit (e.g. `1.8`, `2`) is a multiplier of the element's own font size — that's what the tests measure.
- The starter `#event-card a` has specificity (0, 1, 0, 1). A plain class selector is only (0, 0, 1, 0) and will lose. Think about what single flag can force your colour to win without rewriting the selector.

# Solution

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event invite</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <section id="event-card">
      <h1>Summer Conference</h1>
      <p class="subtitle">Three days of talks, two nights of music, one great city.</p>
      <ul class="speakers">
        <li>Ada Lovelace</li>
        <li>Grace Hopper</li>
        <li>Margaret Hamilton</li>
      </ul>
      <a href="/register" class="btn cta">Register now</a>
    </section>
  </body>
</html>
```

```css
#event-card a {
  color: black;
}

body {
  background-color: #0f172a;
}

#event-card {
  padding: 40px;
  border: 4px dashed #fbbf24;
  background-color: #1e293b;
}

#event-card h1 {
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #fbbf24;
}

.subtitle {
  font-style: italic;
  color: white;
  line-height: 1.8;
}

.speakers li {
  color: white;
  text-transform: uppercase;
  line-height: 2;
}

.btn {
  padding: 14px 28px;
  text-decoration: none;
  border: 2px solid white;
}

.cta {
  font-weight: bold;
  color: white !important;
}
```

# Walkthrough

1. **Link the stylesheet.** Inside `<head>`, add `<link rel="stylesheet" href="style.css">`.
2. **Dark page.** `body { background-color: #0f172a; }` — the whole stage goes dark.
3. **Dark card with dashed border.** Use the card's id and set `padding: 40px;`, `border: 4px dashed #fbbf24;`, and `background-color: #1e293b;`. This is the biggest visual departure from the book-card capstone — dashed instead of solid, dark instead of light, larger padding.
4. **Poster heading.** Use a descendant selector from the card to its `h1`. Set `text-align: left;`, `text-transform: uppercase;`, `letter-spacing: 4px;`, and `color: #fbbf24;`. The heading shouts in amber now.
5. **Airy subtitle.** `.subtitle { font-style: italic; color: white; line-height: 1.8; }`.
6. **Uppercase speaker list.** Use a descendant selector `.speakers li` and set `color: white; text-transform: uppercase; line-height: 2;`.
7. **Outlined base button.** `.btn { padding: 14px 28px; text-decoration: none; border: 2px solid white; }` — note the white border instead of a filled background.
8. **Bold CTA with colour override.** `.cta { font-weight: bold; color: white !important; }` — `!important` is what actually beats the starter `#event-card a` rule.
9. Save, refresh, and run the tests. When everything passes you should see a dark, amber-bordered poster with uppercase white list items and an outlined register button — a very different vibe from the book card.
