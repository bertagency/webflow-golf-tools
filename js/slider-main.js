


$(".slider-main_component").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    // See overrides below for Slides per view on each screen size
    slidesPerView: 1,
    initialSlide: 2,
    speed: 1700,
    //swipe up and down with mouse to control slider
    mousewheel: true,
    keyboard: true,
    mousewheel: {
    	// switch off horizontal mouse scroll
      forceToAxis: true
    },
    // infinite loop
    loop: true,
    centredSlides: true,
    // switch to free scroll
    freeMode: false,
    // Click slide to scroll to slide
    slideToClickedSlide: true,
    spaceBetween: 40,
    
    centredSlides: true,
    autoplay: false,
    
    breakpoints: {
    // mobile landscape
    480: {
    slidesPerView: 1,
    spaceBetween: 40
    },
    // tablet
    768: {  
     slidesPerView: 1,
    spaceBetween: 40
    },
    // desktop
    992: {
    slidesPerView: 1,
    spaceBetween: 40,
    centredSlides: true
    }
    },
    pagination: {
    el: $(this).find(".swiper-bullet-wrapper")[0],
    bulletActiveClass: "is-active",
    bulletClass: "swiper-bullet",
    clickable: true,
    },
    navigation: {
    nextEl: $(this).find(".swiper-next")[0],
    prevEl: $(this).find(".swiper-prev")[0],
    disabledClass: "is-disabled"
    }
  });

});


window.addEventListener("load", (event) => {
  const accordions = document.querySelectorAll(
  '[bert-accordion-gsap="accordion"]'
);

accordions.forEach((acc) => {
  const contentWrapper = acc.querySelector(
    `[bert-accordion-gsap="content-wrapper"]`
  );
  const verticalIcon = acc.querySelector(`[bert-accordion-gsap="icon"]`);

  let isOpen = false;

  acc.addEventListener("click", () => {
    if (isOpen) {
      // Close the accordion
      gsap.to(contentWrapper, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        clearProps: "height, opacity",
        onComplete: () => {
          contentWrapper.style.overflow = "hidden";
        }
      });
      gsap.to(verticalIcon, { rotation: 0, opacity: 1, duration: 0.5 });
    } else {
      // Close any other open accordions
      accordions.forEach((otherAcc) => {
        const otherContentWrapper = otherAcc.querySelector(
          `[bert-accordion-gsap="content-wrapper"]`
        );
        const otherVerticalIcon = otherAcc.querySelector(
          `[bert-accordion-gsap="icon"]`
        );

        if (otherAcc !== acc && otherContentWrapper.clientHeight !== 0) {
          gsap.to(otherContentWrapper, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            clearProps: "height, opacity",
            onComplete: () => {
              otherContentWrapper.style.overflow = "hidden";
            }
          });
          gsap.to(otherVerticalIcon, { opacity: 1, rotation: 0, duration: 0.5 });
        }
      });

      // Open the accordion
      contentWrapper.style.overflow = "hidden";
      gsap.to(contentWrapper, { height: "auto", opacity: 1, duration: 0.5 });
      gsap.to(verticalIcon, { opacity: 1, rotation: 180, duration: 0.5 });
    }

    isOpen = !isOpen;
  });
});

});
