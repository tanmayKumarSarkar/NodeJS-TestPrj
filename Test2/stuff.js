var counter = function (arg) {
  return "there are "+ arg.length + " elements in the array";
};
module.exports.adder = function (a,b) {
  return `sum of the numbers = ${a+b}`;
};
module.exports.counter = counter;
//module.exports.adder = adder;

/*module.exports = {
  counter : counter,
  adder : adder
};*/
