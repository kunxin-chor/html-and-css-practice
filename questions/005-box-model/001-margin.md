# Question

Create a box with **20px margin** on all sides. The box should have a visible background color so the margin effect is clear.

The HTML is provided with a `div` that has a class of `box`. Add CSS to give it the required margin.

# Test Cases

```
describe('Box margin', () => {
  it('should have 20px margin on all sides', () => {
    const box = document.querySelector('.box');
    expect(box).to.exist;
    const style = getComputedStyle(box);
    expect(style.marginTop).to.equal('20px');
    expect(style.marginRight).to.equal('20px');
    expect(style.marginBottom).to.equal('20px');
    expect(style.marginLeft).to.equal('20px');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Margin Practice</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="box">I have margin around me</div>
  </body>
</html>
```

## CSS

```css
.box {
  background-color: lightblue;
  /* Add margin here */
}
```

## Hints

- `margin` is the space outside an element's border.
- You can set all margins at once with `margin: 20px`.
- Alternatively, use `margin-top`, `margin-right`, `margin-bottom`, `margin-left` individually.

# Solution

```css
.box {
  background-color: lightblue;
  margin: 20px;
}
```

# Walkthrough

1. Open `style.css`.
2. Find the `.box` selector — it already has a background color so you can see the box.
3. Add `margin: 20px;` inside the braces.
4. Save and refresh the preview. You should see space around the light blue box.
5. Run the tests to verify all four margins are 20px.
