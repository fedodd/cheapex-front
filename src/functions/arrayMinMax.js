const arrayMinMax = (array, target) => {
  if (target === 'min') {
    return Math.min.apply(null, array);
  } else if (target === 'max') {
    return Math.max.apply(null, array);
  } else {
    return null;
  }
}

export default arrayMinMax;