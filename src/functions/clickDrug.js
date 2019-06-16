const clickDrugHandler = (slider) => {
  //const slider = e.target;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  if (slider.scrollWidth === slider.clientWidth) {
    slider.classList.add('is__end');
  }

  slider.addEventListener('mousedown', (e) => {
    
    isDown = true;
    slider.classList.add('is__active');
    startX = e.pageX - slider.offsetLeft;
    console.log('scrollLeft ', scrollLeft);
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('is__active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('is__active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    
    
  });

  slider.addEventListener('scroll', (e) => {
    console.log('slider.scrollWidth - slider.clientWidth', slider.scrollWidth - slider.clientWidth);
   
    if ((slider.scrollWidth - slider.clientWidth) <= slider.scrollLeft + 2) {
      slider.classList.remove('is__end');
    } else {
      if (!slider.classList.contains('is__end'))
        slider.classList.add('is__end');
    }

    if (slider.scrollLeft >= 2 || !slider.classList.contains('is__scrolling')) {
      slider.classList.add('is__scrolling');
    } else {
      slider.classList.remove('is__scrolling');
    }
  })

};

export default clickDrugHandler;
