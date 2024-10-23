/**
* Template Name: Ninestars
* Template URL: https://bootstrapmade.com/ninestars-free-bootstrap-3-theme-for-creative/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  // document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
  //   navmenu.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     this.parentNode.classList.toggle('active');
  //     this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
  //     e.stopImmediatePropagation();
  //   });
  // });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  // document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
  //   faqItem.addEventListener('click', () => {
  //     faqItem.parentNode.classList.toggle('faq-active');
  //   });
  // });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  function switchDay(){
   

      const dayBtn = $('.btn-day');
      const nightBtn = $('.btn-night');
      const btnholder = $('.btn-holder');
      const section = $$('section')
      btnholder.addEventListener('click',(e)=>{
          dayBtn.classList.toggle('d-none')
          nightBtn.classList.toggle('d-none')
          document.body.classList.toggle('dark-background');
          for(let i=0; i<section.length; i++){ 
              if(section[i].classList.contains('light-background') || section[i].classList.contains('dark-background')){
                section[i].classList.toggle('light-background')
                section[i].classList.toggle('dark-background')    
              }
            }
        
        })
     
  }
  window.addEventListener('load', switchDay);

  function render(){
    const Film = {
      films : [
        {
          title : 'Cám',
          img : 'assets/img/film/tam.jpg',
          status : 'Đang chiếu',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'ongoing'
        },
        {
          title : 'Quỷ Án',
          img : 'assets/img/film/media_images_2024_08_20_q-101323-200824-62.jpg',
          status : 'Sắp chiếu',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'preview'
        },
        {
          title : 'Transformer One',
          img : 'assets/img/film/media_images_2024_09_11_tf1-intl-allspark-dgtl-online-payoff-keyart-vie-400x633-134254-110924-51.jpg',
          status : 'Đặc biệt',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'special'
        },        
        {
          title : 'Joker Điên có đôi',
          img : 'assets/img/film/media_images_2024_09_19_482wx722h-162630-190924-83.jpg',
          status : 'Đang chiếu',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'ongoing'
        },
        {
          title : 'Venom',
          img : 'assets/img/film/media_images_2024_09_19_screenshot-2024-09-19-150036-150139-190924-38.png',
          status : 'Sắp chiếu',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'preview'
        }, 
        {
          title : 'Latency',
          img : 'assets/img/film/media_images_2024_09_19_screenshot-2024-09-19-154629-154714-190924-43.png',
          status : 'Đặc biệt',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'special'
        },
        {
          title : 'Shin : Cậu bé bút chì ',
          img : 'assets/img/film/media_images_2024_08_01_38-400x633-182208-010824-97.png',
          status : 'Đang chiếu',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'ongoing'
        },
        {
          title : 'Đố anh bắt được em',
          img : 'assets/img/film/da.png',
          status : 'Sắp chiếu',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'preview'
        },
        {
          title : 'Avenger: End Game',
          img : 'assets/img/film/R.jpg',
          status : 'Đặc biệt',
          description : 'Lorem ipsum, dolor sit amet consectetur',
          filter : 'special'
        },
        
      ],
      render : function(){
        const html = this.films.map((film)=>{
          return `<div class="col-lg-4 col-md-6 film-item isotope-item filter-${film.filter}">
              <div class="film-content h-100">
                <img src=${film.img} class="img-fluid " alt="">
                <div class="film-info">
                 <h4>${film.status}</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a href="${film.img}" title="${film.title}" data-gallery="film-gallery-app" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                  <a href="film-details.html" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
                  <a href="Admin.html" class="details-link"><i class="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>`
        })
        $(".film-container").innerHTML = html.join('')
      }
    }
    Film.render();
  }
  window.addEventListener('load', render);
})();
