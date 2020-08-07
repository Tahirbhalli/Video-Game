const speed = (b = document.querySelector('input')) => {
  switch (b.value) {
    case '1':
      return 200;
    case '2':
      return 100;
    case '3':
      return 50;
    default:
      return 100;
  }
};
module.exports = speed;