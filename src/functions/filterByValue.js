const filterByValue = (array, targetString) => {
  return array.reduce((acc, row, index) => {
    const toLowerCaseCompany = row[0].toLowerCase();
    return toLowerCaseCompany.includes(targetString) ? [...acc, index] : acc;
  }, []);
}

export default filterByValue;