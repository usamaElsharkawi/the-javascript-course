// Remember, we're gonna use strict mode in all scripts now!
'use strict';

console.log('==============challenge 1=============');
const printForecast = function (arr) {
  let forecast = '';
  for (let i = 0; i < arr.length; i++) {
    forecast += `${arr[i]}C in ${i + 1} days...`;
  }
  return '...' + forecast;
};

console.log(printForecast([17, 21, 23]));
console.log('==============challenge1=============');

console.log('===================challenge 2=======================');
const timeTracking = function (arr) {};
console.log('===================challenge 2=======================');
