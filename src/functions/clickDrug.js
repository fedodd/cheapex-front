import classes from '../components/table/Table.pcss';

const clickDrugHandler = (slider) => {
  //const slider = e.target;
  let isDown = false;

  let startX;
  let scrollLeft;
  let sl = 0;

  slider.addEventListener('mousedown', (e) => {
    // check if its on slider then pass this action. now need to move all this code to a component
    if (e.target.classList.contains('rc-slider-handle')) return;
    //
    isDown = true;
    slider.classList.add(classes.is__active);
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove(classes.is__active);
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove(classes.is__active);
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
    if (slider.scrollWidth - slider.clientWidth <= slider.scrollLeft + 5) {
      slider.classList.remove(classes.is__end);
    } else {
      if (!slider.classList.contains(classes.is__end))
        slider.classList.add(classes.is__end);
    }

    if (slider.scrollLeft >= 5) {
      slider.classList.add(classes.is__scrolling);
    } else {
      slider.classList.remove(classes.is__scrolling);
    }
    sl = slider.scrollLeft;
  });
};

export default clickDrugHandler;
