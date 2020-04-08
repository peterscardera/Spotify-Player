const converter = (aNumber) => {
  if (aNumber > 999 && aNumber < 1000000) {
    return (aNumber / 1000).toFixed(0) + "k";
  } else if (aNumber > 1000000) {
    return (aNumber / 1000000).toFixed(0) + "m";
  }
};
  
export default converter
  
  
  
  