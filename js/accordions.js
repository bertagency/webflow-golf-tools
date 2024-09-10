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