
const fixRow = (targetClass) => {

  [...document.querySelectorAll(targetClass)].map(row => {
    row.addEventListener('click', e => {
      console.log(row);
      row.classList.toggle('fixed');
    });
  })
};

export default fixRow;
