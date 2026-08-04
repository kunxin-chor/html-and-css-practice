# Question

This is a challenge question. The page already has a working **Bootstrap 5 carousel** with two static slides. It loads both the Bootstrap CSS and the Bootstrap JS bundle.

You are given an array of extra slides in the starter JavaScript:

```javascript
const EXTRA_SLIDES = [
  { src: 'https://picsum.photos/800/400?random=3', caption: 'Third slide' },
  { src: 'https://picsum.photos/800/400?random=4', caption: 'Fourth slide' },
];
```

When the page loads, your script should:

1. Append each extra slide from `EXTRA_SLIDES` to the carousel's inner container. Each new slide should have the class `carousel-item` and contain an `<img>` and a caption `<div>` just like the existing slides.
2. Update the carousel indicator buttons so there is one button for every slide (including the original two) and each button has the correct `data-bs-slide-to` value.
3. **Re-initialize the Bootstrap carousel** so it knows about the new slides. Bootstrap stores a JavaScript object on the carousel element when it first starts. If you add new slides to the DOM without re-initializing, the carousel still thinks it only has two slides and the navigation may break.

The expected result is a four-slide carousel that still works with the previous/next controls and the indicators.

# Test Cases

```
describe('append child revision - bootstrap carousel challenge', () => {
  const carousel = () => document.querySelector('#photoCarousel');
  const items = () => document.querySelectorAll('#carousel-inner > .carousel-item');
  const indicators = () => document.querySelectorAll('.carousel-indicators > button');

  it('has four carousel items after the extra slides are added', () => {
    expect(items().length).to.equal(4);
  });

  it('keeps the first original slide active', () => {
    expect(items()[0].classList.contains('active')).to.equal(true);
  });

  it('has four indicator buttons', () => {
    expect(indicators().length).to.equal(4);
  });

  it('indicators have correct data-bs-slide-to values', () => {
    const values = [...indicators()].map((b) => b.getAttribute('data-bs-slide-to'));
    expect(values).to.deep.equal(['0', '1', '2', '3']);
  });

  it('re-initializes the Bootstrap carousel so the new last slide is reachable', () => {
    const instance = bootstrap.Carousel.getInstance(carousel());
    expect(instance, 'Expected a Bootstrap Carousel instance to exist after re-initialization').to.exist;
    instance.to(3);
    expect(items()[3].classList.contains('active')).to.equal(true);
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Carousel Challenge</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container mt-4">
      <div id="photoCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators" id="carousel-indicators">
          <button type="button" data-bs-target="#photoCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#photoCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner" id="carousel-inner">
          <div class="carousel-item active">
            <img src="https://picsum.photos/800/400?random=1" class="d-block w-100" alt="Slide 1">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://picsum.photos/800/400?random=2" class="d-block w-100" alt="Slide 2">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide</h5>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
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
const EXTRA_SLIDES = [
  { src: 'https://picsum.photos/800/400?random=3', caption: 'Third slide' },
  { src: 'https://picsum.photos/800/400?random=4', caption: 'Fourth slide' },
];

// Write your code here.
//
// 1. Append each extra slide to #carousel-inner.
// 2. Update the indicator buttons in #carousel-indicators.
// 3. Re-initialize the Bootstrap carousel so it recognises the new slides.
//
// Hint: Bootstrap components are stored as data on the element. You can
// get the existing carousel instance with bootstrap.Carousel.getInstance(...),
// dispose of it with .dispose(), and then create a new one with
// new bootstrap.Carousel(...).
```

## Hints

- Look at the existing HTML structure carefully. Each slide is a `<div class="carousel-item">` with an `<img>` and a `<div class="carousel-caption">` inside it.
- For the indicators, rebuild the whole list so every slide has one button. The first button should have `class="active"`, `aria-current="true"`, and `data-bs-slide-to="0"`.
- Before re-initializing, dispose of the old Bootstrap Carousel instance so the new one starts fresh.
- The `bootstrap` global object is available because `bootstrap.bundle.min.js` is loaded before `script.js`.

# Solution

```javascript
const EXTRA_SLIDES = [
  { src: 'https://picsum.photos/800/400?random=3', caption: 'Third slide' },
  { src: 'https://picsum.photos/800/400?random=4', caption: 'Fourth slide' },
];

const carouselEl = document.querySelector('#photoCarousel');
const carouselInner = document.querySelector('#carousel-inner');
const indicators = document.querySelector('#carousel-indicators');

// 1. Add the extra slides
for (const slide of EXTRA_SLIDES) {
  const item = document.createElement('div');
  item.className = 'carousel-item';

  const img = document.createElement('img');
  img.src = slide.src;
  img.className = 'd-block w-100';
  img.alt = slide.caption;

  const caption = document.createElement('div');
  caption.className = 'carousel-caption d-none d-md-block';

  const h5 = document.createElement('h5');
  h5.textContent = slide.caption;
  caption.appendChild(h5);

  item.appendChild(img);
  item.appendChild(caption);
  carouselInner.appendChild(item);
}

// 2. Rebuild the indicators for all slides
const totalSlides = carouselInner.querySelectorAll('.carousel-item').length;
indicators.innerHTML = '';
for (let i = 0; i < totalSlides; i++) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('data-bs-target', '#photoCarousel');
  button.setAttribute('data-bs-slide-to', String(i));
  button.setAttribute('aria-label', 'Slide ' + (i + 1));
  if (i === 0) {
    button.classList.add('active');
    button.setAttribute('aria-current', 'true');
  }
  indicators.appendChild(button);
}

// 3. Re-initialize the Bootstrap carousel
const oldInstance = bootstrap.Carousel.getInstance(carouselEl);
if (oldInstance) {
  oldInstance.dispose();
}
new bootstrap.Carousel(carouselEl);
```

# Walkthrough

1. Get references to the carousel element, the inner slide container, and the indicators container.
2. Loop over `EXTRA_SLIDES` and build each new slide:
   - Create a `<div class="carousel-item">`.
   - Create an `<img>` with the slide's `src` and `class="d-block w-100"`.
   - Create a caption `<div class="carousel-caption d-none d-md-block">` with the caption text inside an `<h5>`.
   - Append the image and caption to the item, then append the item to `#carousel-inner`.
3. Count the total number of slides now in the carousel and rebuild the indicators:
   - Clear the indicators container with `innerHTML = ''`.
   - For each slide index, create a `<button>` with `data-bs-target="#photoCarousel"`, `data-bs-slide-to="i"`, and the correct `aria-label`.
   - Mark the first indicator as `active` with `aria-current="true"`.
4. Re-initialize the carousel:
   - Get any existing Bootstrap Carousel instance with `bootstrap.Carousel.getInstance(carouselEl)`.
   - If one exists, call `.dispose()` to remove the old instance.
   - Create a fresh instance with `new bootstrap.Carousel(carouselEl)`.
5. Without this re-initialization step, the previous/next buttons and indicators would still point to the original two-slide state, so the new slides would not work correctly.
