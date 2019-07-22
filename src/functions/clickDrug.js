const clickDrugHandler = (slider) => {
  //const slider = e.target;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  let sl = 0;
  console.log('i am here!', slider.scrollWidth, slider.clientWidth, slider.scrollWidth - slider.clientWidth, slider.scrollLeft);

  if (slider.scrollWidth !== slider.clientWidth) {
    if ((slider.scrollWidth - slider.clientWidth) <= slider.scrollLeft + 5) {
      slider.classList.remove('is__end');
    } else {
      slider.classList.add('is__end');
    }
    
  }

  slider.addEventListener('mousedown', (e) => {
    
    isDown = true;
    slider.classList.add('is__active');
    startX = e.pageX - slider.offsetLeft;
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
    const walk = (x - startX) * 1.5; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    
    
  });

  slider.addEventListener('scroll', (e) => {
    if (slider.scrollLeft === sl) return;
    console.log()
    if ((slider.scrollWidth - slider.clientWidth) <= slider.scrollLeft + 5) {
      slider.classList.remove('is__end');
    } else {
      if (!slider.classList.contains('is__end'))
        slider.classList.add('is__end');
    }

    if (slider.scrollLeft >= 5 || !slider.classList.contains('is__scrolling')) {
      slider.classList.add('is__scrolling');
    } else {
      slider.classList.remove('is__scrolling');
    }

    sl = slider.scrollLeft;
  })

};

export default clickDrugHandler;
