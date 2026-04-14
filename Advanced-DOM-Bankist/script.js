'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e && e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling

const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// //this is only works on the modern browsers
// learnMoreBtn.addEventListener('click', function () {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// Scrolling old way
learnMoreBtn.addEventListener('click', function (e) {
  // get the section coordinates
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //get the scroll position
  console.log('scroll position (x,y)', window.scrollX, scrollY);
  // to perform the scrolling use the window.scrollTo(left,top) function
  // left = leftCoord for the section + ScrollX position

  // top = topCoord for the secton + ScrollY position

  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  //for smooth behavier
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
});

// event delegation
// smooth scrolling navigation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching stratgy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tapped component

const taps = document.querySelectorAll('.operations__tab');
const tapsContainer = document.querySelector('.operations__tab-container');
const tapsContent = document.querySelectorAll('.operations__content');

//we will useing the event delegation to add an event lister for all taps  using its container
tapsContainer,
  addEventListener('click', function (e) {
    //handled the clicked element
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return; // ignor the click on the contanier itself
    //remove the active tap and the active content
    taps.forEach(t => t.classList.remove('operations__tab--active'));
    tapsContent.forEach(c => c.classList.remove('operations__content--active'));
    // active top
    clicked.classList.add('operations__tab--active');
    //activate the content
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation : the scroll event

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//stiky navigation : Intersection observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

/// Revealsections

const allSections = document.querySelectorAll('.section');
const revealSections = function (entries, observer) {
  entries.forEach(entry => {
    const section = entry.target;
    if (entry.isIntersecting) {
      section.classList.remove('section--hidden');
      observer.unobserve(section);
    }
  });
};
const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/// lazy loading images

const lazyImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const source = img.dataset.src;
      img.src = source;
      img.addEventListener('load', function () {
        img.classList.remove('lazy-img');
      });
      observer.unobserve(img);
    }
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.6,
});

lazyImages.forEach(img => imgObserver.observe(img));

//slider

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}" fdprocessedid="p525nl"></button>
      `
    );
  });
};

goToSlide(0);
createDots();
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

// handle the left and right arrow
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();

  if (e.key === 'ArrowLeft') previousSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});

// const curSlide = slider.querySelector(
//   '.slide[style="transform: translateX(0%);"]'
// );
// console.log(curSlide);

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// /////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////

// // //selecting element
// // console.log(document); // thus is not a real DOM element
// // console.log(document.documentElement); // the root elemet <html>
// // console.log(document.body);
// // console.log(document.head);

// const header = document.querySelector('.header');
// const allSection = document.querySelectorAll('.section');

// document.getElementById('#section--1');

// const allbutton = document.getElementsByTagName('button');
// console.log(allbutton);

// console.log(document.getElementsByClassName('btn'));

// //creating elements
// //addAdjacentHtml()

// const massege = document.createElement('div');
// massege.classList.add('cookie-message');
// massege.innerHTML = `we use cookied for improved functionaliry and analytic <button class="btn btn--close-cookie">Got it!</button> `;

// // header.prepend(massege);
// header.append(massege);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     massege.remove();
//     // massege.parentElement.removeChild(massege);
//     // header.removeChild(massege);
//   });

// massege.style = 'color:red;width:50px;';

// //events

// const h1 = document.querySelector('h1');

// // the first way to listen to an event
// h1.addEventListener('mouseenter', function () {
//   alert('Great! you reading the header');
// });

// // the secound one is by useing the onevent property  ex: onmouseenter , onclick

// h1.onmouseenter = function () {
//   alert('Great! you reading the header');
// };

// // the third way is with the html attribte >> actully similler to the second one >> with the onevent attribute

// //we can add multiple event listener whith the addEventListener but not with the on event lisener
// // we can remove an event listener that listend by addEventListener
// h1.removeEventListener('mouseenter', alertH1);

// // generate random color

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomInt(0, 255));

//event propegation
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
