'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//from here






document.querySelector('.operations__tab-container').addEventListener('click', function (e) {
  let clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  let tabs=document.querySelectorAll('.operations__tab')
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  let tabsContent=document.querySelectorAll('.operations__content')
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
document.getElementById('learnmore').addEventListener('click',(e)=>{
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' });
}

)








let ib = new IntersectionObserver((et,a)=>{

  let e=et[0];
  if (!e.isIntersecting) return;
  e.target.src = e.target.dataset.src;
  e.target.addEventListener('load', function () {
    e.target.classList.remove('lazy-img');
  });
  ib.unobserve(e.target);
},
 {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
let imgs=document.querySelectorAll('.lazy-img')
for(let i=0;i<imgs.length;i++){
  ib.observe(imgs[i]);
}




let navb=document.querySelectorAll('.nav__link');
for( let j=0;j<navb.length;j++){
  let ele=navb[j];
  ele.addEventListener('mouseout',(e)=>{
    
    for(let i=0;i<navb.length;i++){
      let abc=navb[i];
      abc.style.opacity=1;
    }
    
  });
  ele.addEventListener('click',e=>{
    e.preventDefault();
    let link= e.target.getAttribute('href');
    if(link?.length>0){
      document.querySelector(link).scrollIntoView({ behavior: 'smooth' });
    }
  })
  ele.addEventListener('mouseover',(e)=>{
    
    for(let i=0;i<navb.length;i++){
      let abc=navb[i];
      abc.style.opacity=0.5;
    }
    e.target.style.opacity=1;
  });
}
const slides = document.querySelectorAll('.slide');  
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  document.querySelector('.slider__btn--right').addEventListener('click', nextSlide);
  document.querySelector('.slider__btn--left').addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });