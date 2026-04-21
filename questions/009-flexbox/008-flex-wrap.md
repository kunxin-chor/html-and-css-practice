# Question

You have a gallery (`<div class="gallery">`) that is a flex container with eight fixed-size tiles inside. Because the container is narrower than the combined width of all tiles, the tiles currently overflow on a single line (or get squished).

Your task is to allow the tiles to **wrap onto multiple lines** when they do not all fit on one line, instead of staying on a single line.

Requirements:

1. Keep `.gallery` as a flex container (`display: flex`).
2. Use the Flexbox property that **controls whether items wrap to new lines** with the value that enables wrapping.

# Test Cases

```
describe('Wrapping gallery', () => {
  it('.gallery should be a flex container', () => {
    const g = document.querySelector('.gallery');
    expect(g).to.exist;
    expect(getComputedStyle(g).display).to.equal('flex');
  });

  it('.gallery should allow its items to wrap onto multiple lines', () => {
    const g = document.querySelector('.gallery');
    expect(getComputedStyle(g).flexWrap).to.equal('wrap');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Gallery</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="gallery">
      <div class="tile">1</div>
      <div class="tile">2</div>
      <div class="tile">3</div>
      <div class="tile">4</div>
      <div class="tile">5</div>
      <div class="tile">6</div>
      <div class="tile">7</div>
      <div class="tile">8</div>
    </div>
  </body>
</html>
```

## CSS

```css
.gallery {
  display: flex;
  gap: 8px;
  padding: 12px;
  width: 360px;
  background-color: #2f3640;
  /* Let the tiles flow onto multiple lines when they do not fit */
}

.tile {
  flex: 0 0 100px;
  height: 80px;
  background-color: #00a8ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
```

## Hints

- By default, a flex container forces all its children onto a **single line**, even if they overflow.
- One Flexbox property on the **container** toggles this behaviour. Its name literally describes what you want the items to do when they run out of room.
- The value you want is the one that means "yes, wrap onto new lines".

# Solution

```css
.gallery {
  display: flex;
  gap: 8px;
  padding: 12px;
  width: 360px;
  background-color: #2f3640;
  flex-wrap: wrap;
}
```

# Walkthrough

1. Open `style.css` and find the `.gallery` rule.
2. The container is only 360px wide but each tile is 100px — they cannot all fit on one line.
3. Add `flex-wrap: wrap;` so that when a tile would overflow, it moves to the next line instead.
4. Save and preview. The eight tiles should arrange themselves across multiple rows.
5. Run the tests.
