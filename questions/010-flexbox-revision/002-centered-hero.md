# Question

You have a hero section (`<section class="hero">`) that is a flex container. Inside it there is a single call-to-action button. Right now the button sits against the left edge of the hero.

Your task is to push the button so it is **horizontally centered** along the main axis of the hero.

Requirements:

1. Keep `.hero` as a flex container (`display: flex`).
2. Use the Flexbox property that aligns items along the **main axis**, with the value that **centers** them.

# Test Cases

```
describe('Centered hero button', () => {
  it('.hero should be a flex container', () => {
    const hero = document.querySelector('.hero');
    expect(hero).to.exist;
    expect(getComputedStyle(hero).display).to.equal('flex');
  });

  it('.hero should center its children on the main axis', () => {
    const hero = document.querySelector('.hero');
    expect(getComputedStyle(hero).justifyContent).to.equal('center');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hero</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <section class="hero">
      <button class="cta">Get Started</button>
    </section>
  </body>
</html>
```

## CSS

```css
.hero {
  display: flex;
  padding: 40px;
  background-color: #6c5ce7;
  /* Horizontally center the CTA button */
}

.cta {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  background-color: #fdcb6e;
  color: #2d3436;
  font-weight: bold;
}
```

## Hints

- There is a property whose job is to position items along the **main axis** — the same axis the items flow along.
- Pick the value that means "middle of the line".

# Solution

```css
.hero {
  display: flex;
  padding: 40px;
  background-color: #6c5ce7;
  justify-content: center;
}
```

# Walkthrough

1. Open `style.css` and find the `.hero` rule.
2. The hero is already a flex container; the default main axis is horizontal.
3. Add `justify-content: center;` to center the CTA button along that axis.
4. Save. The button should now sit in the middle of the hero horizontally.
5. Run the tests.
