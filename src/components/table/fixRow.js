
const fixRow = (targetClass) => {
  //console.log(document.querySelectorAll(targetClass));
  [...document.querySelectorAll(targetClass)].map(row => {
    //console.log(row.classList);
    //row.classList.add('fixed');
    
    row.addEventListener('click', e => {
      console.log(row);
      row.classList.toggle('fixed');
    });
  })
};

export default fixRow;
