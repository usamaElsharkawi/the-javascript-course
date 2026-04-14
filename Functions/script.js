'use strict';

// ///Default parameter
// // in ES6 you can set a default value to the prameter by assign it to any expretion , and you can use the values of other parameter that were set before
// //before ES6 you shoud use the short circting or the logical assignment operator to set a default value to parameter
// const createbooking = function (
//   flightNum,
//   numPassenger = 1,
//   price = 100 * numPassenger
// ) {
//   const booking = {
//     flightNum,
//     numPassenger,
//     price,
//   };
//   console.log(booking);
// };

// createbooking('5456', 20);
// createbooking('5666', 15, 400);
// //you can skip a parameter to leave it at its default value by seting it to undifind
// createbooking('s55667', undefined, 200);

// //// Functions accepting callback functions

// const oneWord = function (str) {
//   return str.replaceAll(' ', '');
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // the heigher order functions

// const transformer = function (str, fn) {
//   console.log(`The transformated string is : ${fn(str)}`);
//   console.log(`Transformated by : ${fn.name}`);
// };

// transformer('javaScript is the best', upperFirstWord); // the upperFirstWord here is  a callback function

// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);

// //function return other function
// const great = greating => name => console.log(`${greating} ${name}`);

// great('Hi')('Usama');

// //// the call and apply method

// const great = function (greating) {
//   console.log(`${greating} ${this.name}`);
// };

// const usama = {
//   name: 'Usama',
//   age: 21,
// };

// const mohsen = {
//   name: 'mohsen',
//   age: 21,
// };

// great.call(usama, 'Hi');
// great.call(mohsen, 'Hello');

// //apply : the function parameter should be in arry
// const greating = ['hi'];
// great.apply(usama, greating);

// //=============================challenge 1============================

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😁
//   answers: new Array(4).fill(0),
// };

// const registerNewAnswer = function () {
//   const ans = Number(
//     prompt(`
// ${this.question}
// ${this.options.join('\n')}
//         `)
//   );
//   if (typeof ans === 'number' && !isNaN(ans) && ans >= 0 && ans <= 3) {
//     this.answers[ans]++;
//     displayResult(this.answers);
//   } else {
//     alert('invalid number or not a number');
//   }
// };

// const poll1 = registerNewAnswer.bind(poll);

// const pollBtn = document.querySelector('.poll');
// pollBtn.addEventListener('click', poll1);

// const displayResult = function (type) {
//   alert(`poll is : ${type.join(' ')}`);
// };
// //===============================challenge 1==================================

// //Immediatly invoked functions Expretions

// (function () {
//   console.log(
//     'this is an immediatly invoked function which is executed just once'
//   );
// })();

// //with arrow functions
// (() =>
//   console.log(
//     'this is an immediatly invoked function which is executed just once'
//   ))();

// {
//   const isprive = 2;
//   var s = 3;
//   //other statment
// }

// //Closures

// const secureBooking = function () {
//   let passengercount = 0;
//   return function () {
//     passengercount++;
//     console.log(passengercount);
//   };
// };

// let f;

// const g = function () {
//   const a = 22;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 555;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// //Re-assigning f function
// h();
// f();

//============================challenge 2=================================
/* Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😉
*/

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   document.body.addEventListener('click', function () {
//     header.style.color = 'blue';
//   });
// })();
