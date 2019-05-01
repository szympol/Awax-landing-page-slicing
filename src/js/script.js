'use strict';
// import '@babel/polyfill';

// variables
const menu = document.querySelector('.hamburger');
const navbarWrapper = document.getElementById('navbar-wrapper');
const navbarSections = document.getElementById('navbar-sections');
const navbarSectionsElements = navbarSections.querySelectorAll('li');
const navbarSectionsElementsLinks = navbarSections.querySelectorAll('li a');

const classesNavbarWrapper = navbarWrapper.classList;
let ifHasNavbarWrapperForMobileView;

// toggle menu on mobile viewport
menu.addEventListener(
  'click',
  function() {
    this.classList.toggle('hamburger--active');
  },
  false
);

function toggleMenu() {
  navbarWrapper.classList.toggle('navbar-wrapper--mobile');
  navbarSections.classList.toggle('navbar-sections--mobile');
  ifHasNavbarWrapperForMobileView = classesNavbarWrapper.contains(
    'navbar-wrapper--mobile'
  );
}

function removeMobileToggle() {
  navbarWrapper.classList.remove('navbar-wrapper--mobile');
  navbarSections.classList.remove('navbar-sections--mobile');
  menu.classList.remove('hamburger--active');
}

menu.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
});

// listening to resize
let viewportWidth;

let setViewportWidth = () => {
  viewportWidth = window.innerWidth;
  // console.log(viewportWidth);
};

setViewportWidth();

window.addEventListener(
  'resize',
  function() {
    setViewportWidth();
    // eslint-disable-next-line no-unused-expressions
    viewportWidth > 768 && ifHasNavbarWrapperForMobileView
      ? removeMobileToggle()
      : false;
  },
  false
);

// active element in the menu
let sortNavbarSectionsElements = () => {
  for (let element of navbarSectionsElements) {
    element.classList.remove('navbar-sections--active');
  }
};

for (let i = 0; i < navbarSectionsElements.length; i++) {
  navbarSectionsElements[i].addEventListener('click', function() {
    sortNavbarSectionsElements();
    navbarSectionsElements[i].classList.add('navbar-sections--active');
  });
}

// sliders

let glide = new Glide('.hero', {
  type: 'carousel',
  hoverpause: false,
  autoplay: false,
  perView: 1,
  gap: 0
});

glide.mount();

let glideTeam = new Glide('.our-team', {
  type: 'carousel',
  hoverpause: true,
  autoplay: false,
  perView: 3,
  gap: 30,
  startAt: 0,
  breakpoints: {
    576: {
      perView: 1,
      autoplay: false
    },
    991: {
      perView: 2,
      autoplay: false
    }
  }
});

glideTeam.mount();

let glideHappyClients = new Glide('.happy-clients', {
  type: 'carousel',
  hoverpause: true,
  autoplay: false,
  perView: 1,
  startAt: 0
});

glideHappyClients.mount();

let glidePremium = new Glide('.premium', {
  type: 'carousel',
  hoverpause: true,
  autoplay: false,
  perView: 1,
  startAt: 0
});

glidePremium.mount();

// video play when visible

window.onload = () => {
  let videos = document.getElementsByTagName('video');
  let fraction = 0.8;

  let checkScroll = () => {
    for (let i = 0; i < videos.length; i++) {
      let video = videos[i];
      let x = video.offsetLeft;
      let y = video.offsetTop;
      let w = video.offsetWidth;
      let h = video.offsetHeight;
      let r = x + w; //right
      let b = y + h; //bottom
      let visibleX;
      let visibleY;
      let visible;

      visibleX = Math.max(
        0,
        Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset)
      );
      visibleY = Math.max(
        0,
        Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset)
      );

      visible = (visibleX * visibleY) / (w * h);

      visible > fraction ? video.play() : video.pause();
    }
  };

  window.addEventListener('scroll', checkScroll, false);
  window.addEventListener('resize', checkScroll, false);
};

// init Isotope
var iso = new Isotope('.our-projects-grid', {
  itemSelector: '.our-projects-grid-item',
  layoutMode: 'fitRows'
});

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener('click', function(event) {
  // only work with buttons
  if (!matchesSelector(event.target, 'button')) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function
  iso.arrange({ filter: filterValue });
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for (var i = 0, len = buttonGroups.length; i < len; i++) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup(buttonGroup);
}

function radioButtonGroup(buttonGroup) {
  buttonGroup.addEventListener('click', function(event) {
    // only work with buttons
    if (!matchesSelector(event.target, 'button')) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}

// delegate onClick transfer to sections from 'a' to 'li' tags in the navbar

var simulateClick = function(elem) {
  // Create our event (with options)
  var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  // If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
};

for (let i = 0; i < navbarSectionsElements.length; i++) {
  navbarSectionsElements[i].addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
      let a = navbarSectionsElements[i].querySelector('a');
      //let a = e.target.getElementsByTagName('a');
      simulateClick(a);
      // console.log('List item ', i, ' was clicked!', a.innerText);
    }
  });
}
