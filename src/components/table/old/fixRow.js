const fixRow = (targetClass) => {
  [...document.querySelectorAll(targetClass)].map((row) => {
    row.addEventListener("click", (e) => {
      row.classList.toggle("fixed");
    });
  });
};

export default fixRow;
