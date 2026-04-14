"use strict";

// //Functions
// // it's the fundametal building block of real world javaScript application
// // it's a pice of code that we can reuse  over and over agian in our code

// //functin decleration
// function logger() {
//   console.log("this is a logger function");
// }
// // calling / running / invoking  function
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   // the prametar of the function are like local variable that are specific only to this function
//   console.log(apples, oranges);
//   const juice = `juice witi ${apples} apples and ${oranges} oranges`;
//   return juice;
// }

// fruitProcessor(5, 4); // the actul values of the prametear is called arguments
// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// function xss() {
//   const y = 1;
//   const x = 2;
//   const z = x + y;
//   return z;
// }

// const t = xss();
// console.log(t + 2);

// //the difference between function decleration and function expressions

// //function declarations
// function calcAge1(brithyear) {
//   return 2025 - brithyear;
// }

// const age1 = calcAge1(2004);
// console.log(age1);

//function expressions   >> we know befoer that expression produce a value so we will store it in a variable

// const calcAge2 = function (brithyear) {
//   return 2025 - brithyear;
// };

// const age2 = calcAge2(1968);
// console.log(age2);

// // we can call function declarations before we defind it in our code like tis :
// // but we can not do that with function expressions
// const age1 = calcAge1(2004);
// console.log(age1);

// function calcAge1(brithyear) {
//   return 2025 - brithyear;
// }

// // Arrow functin : it is a special form of function expretions so we will store it in a variable

// const clacAge3 = (birthyear) => 2025 - birthyear;
// //this is the simplest form wlhen we have exactly one parametar and one line of code in which we want to return something
// const age3 = clacAge3(1972);
// console.log(age3);

// //if you wanna to write more than one line of code
// const yearUntilRetirement = (birthyear) => {
//   const age = 2025 - birthyear;
//   const retirment = 60 - age;
//   return retirment;
// };
// console.log(yearUntilRetirement(1968));

// //if you have more than one parameter
// const yearUntilRetirement = (birthyear, firstName) => {
//   const age = 2025 - birthyear;
//   const retirment = 60 - age;
//   return `${firstName} retires in ${retirment}`;
// };
// console.log(yearUntilRetirement(2004, "Usama"));

// // Function calling ather functions
// function cutFruitPices(fruit) {
//   return fruit * 4;
// }
// function fruitProcessor(apples, oranges) {
//   const applePices = cutFruitPices(apples);
//   const orangesPices = cutFruitPices(oranges);
//   const juice = `juice with ${applePices} apple pices and ${orangesPices} orange pices`;
//   return juice;
// }
// console.log(fruitProcessor(5, 2));

// console.log("===============challenge 1================");
// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// const scoreDolphins1 = calcAverage(44, 23, 71);
// const scoreKoalas1 = calcAverage(65, 54, 49);
// const scoreDolphins2 = calcAverage(85, 54, 41);
// const scoreKoalas2 = calcAverage(23, 34, 27);

// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= avgKoalas * 2) {
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//   } else if (avgKoalas >= avgDolphins * 2) {
//     console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//   } else console.log("no team win");
// };

// checkWinner(scoreDolphins1, scoreKoalas1);
// checkWinner(scoreDolphins2, scoreKoalas2);
// console.log("===============challenge 1================");

// // Arrays

// const friends = ["ahmed", "usama", "khaled"];
// const years = new Array(2000, 2001, 2002, 2003, 2004);
// console.log(friends);
// console.log(friends[1]);
// console.log(friends.length);

// // only primitive values are immutabel
// // so you can mutate arrays elemeent even you decler it with const
// //but you can not replace the entire array  >> whth const
// friends[0] = "Mohsen";
// console.log(friends);

// // arrays i javaScript can hold values with differant data types at the same time that works because in each position javaScript expects an experssion  >> so you can put any experssion which is produce a value

// const differantTypesArray = ["Usama", 309, years[4], friends];
// console.log(differantTypesArray);

// //array methods

// // puch method to add element in the end of the array and also return the length of the new array
// const lengthOfNewFrineds = friends.push("ahmed");
// console.log(friends);
// console.log(lengthOfNewFrineds);

// //unshift method add element in the begainnig of the array and also returen the lenth of the new arry
// friends.unshift("eslam");
// console.log(friends);

// // pop method is the opposite of puch method remove element from the end of the array and return the removed element
// const popped = friends.pop();
// console.log(friends);
// console.log(popped);

// // shift method is the opposite of unshift method remove the element from the begainning of the arry  and return itt
// const shiftedElement = friends.shift();
// console.log(friends);
// console.log(shiftedElement);

// //indexof method tells us in wilch position the element is in the array
// console.log(friends.indexOf("usama"));

// // includes method return true if element is in the array and false if not  >> use strict equality which means means does not type coeration
// if (friends.includes("usama")) {
//   console.log(
//     `there is a frined called usama in the indes ${friends.indexOf("usama")}`
//   );
// }

// console.log("====================challenge 2===================");
// const calcTip = function (billValue) {
//   return billValue >= 50 && billValue <= 300
//     ? billValue * 0.15
//     : billValue * 0.2;
// };

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(bills);
// console.log(tips);
// console.log(totals);
// console.log("====================challenge 2===================");

// objects  >> it is a key value pair  --key is also called property
// the big diffirence between objects and arrays is that in objects the order of these valus does not matter at all when we want to retrive them .
// the object literla syntax:
// const usama = {
//   fristName: "Usama",
//   lastName: "El-Sharkawi",
//   age: 2025 - 2004,
//   friends: ["khaled", "mohsen", "ahmed"],
// };
// console.log(usama);

// console.log(usama.lastName); //Dot notation
// console.log(usama["lastName"]); //brakets notation
// console.log(usama.jop); // undefind becuase the jop key id not exist in the object
// // the diffrence between dot and braket notakeion is that in the braket notation you can put any expression inside the braket
// console.log(usama["frist" + "Name"]);

// const interstedIn = prompt(
//   "what do you want about usama choose form fristName ,lastName,age,friends"
// );

// if (usama[interstedIn]) {
//   console.log(usama[interstedIn]);
// } else console.log("worng request");

// console.log(
//   `${usama.fristName} has ${usama.friends.length} and the best frined is ${usama.friends[1]}`
// );

// // to add element in the objct
// usama.county = "Egypt";
// usama["jop"] = "programmer";
// console.log(usama);

// const usama = {
//   fristName: "Usama",
//   lastName: "El-Sharkawi",
//   birthyear: 2004,
//   friends: ["khaled", "mohsen", "ahmed"],
//   jop: "programmer",

//   //   clacAge: function (birthyear) {
//   //     return 2025 - birthyear;

//   calcAge: function () {
//     this.age = 2025 - this.birthyear; // this keyword is equal to the object on which the method is called
//     return this.age;
//   },
//   getSammary: function () {
//     return `${this.fristName} ${
//       this.lastName
//     } is ${this.calcAge()} years old he works as a ${
//       this.jop
//     } his friends are ${this.friends}`;
//   },
// };

// console.log(usama.calcAge());
// console.log(usama);
// console.log(usama.age);
// console.log(usama.getSammary());

// console.log("===============challenge 3================")
// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// console.log(mark);

// if (mark.calcBMI() > john.calcBMI()) {
//   console.log(
//     `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`
//   );
// } else if (john.calcBMI() > mark.calcBMI()) {
//   console.log(
//     `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`
//   );
// }
// console.log("===============challenge 3================")

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`repetition ${rep}`);
// }

// // loop in arrays
// const jonas = ["Jonas", " Schmedtmann ", 2037 - 1991, "teacher"];
// for (let i = 0; i < jonas.length; i++) {
//   console.log(jonas[i]);
// }

// const ages = [];
// const years = [1991, 2000, 2004, 2006, 1968];
// for (let i = 0; i < years.length; i++) {
//   ages.push(2025 - years[i]);
//   //   ages[i] = 2025 - years[i];
// }
// console.log(ages);

// for (let i = 0; i <= jonas.length; i++) {
//   if (typeof jonas[i] !== "string") continue; // exit the current iteration
//   console.log(jonas[i]);
// }
// for (let i = 0; i <= jonas.length; i++) {
//   if (typeof jonas[i] === "number") break; //compeletly terminate the whole loop
//   console.log(jonas[i]);
// }

// for (let i = jonas.length - 1; i >= 0; i--) {
//   console.log(i, jonas[i]);
// }

// for (let i = 1; i <= 3; i++) {
//   console.log(`Exercise ${i}`);
//   for (let j = 0; j <= 5; j++) {
//     console.log(j);
//   }
// }

// console.log("================challenge 4==================");
// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];
// const calcTip = function (billValue) {
//   return billValue >= 50 && billValue <= 300
//     ? billValue * 0.15
//     : billValue * 0.2;
// };
// for (let i = 0; i < 10; i++) {
//   tips.push(calcTip(bills[i]));
//   totals.push(tips[i] + bills[i]);
// }
// console.log(tips, totals);

// const calcAge = function (arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum / arr.length;
// };

// console.log(calcAge(bills));
// console.log("================challenge 4==================");
