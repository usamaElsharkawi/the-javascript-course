//012 CHALLENGE #1
// console.log("===============challenge 1 =================")
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMIMark = massMark / (heightMark * heightMark);
// const BMIJohn = massJohn / (heightJohn * heightJohn)

// console.log(BMIMark , BMIJohn)
// console.log("===============challenge 1 =================")

// const fristName ='Usama';
// const lastname = 'El-Sharkawi'
// const birthyear =2004;
// const year = 2025
// const age = year - birthyear;

// const Usama = "i'm "+ fristName +" "+lastname + ","+age+'years old';
// console.log(Usama);

// const UsamaNew =`i'm ${fristName} , ${age} years old `;
// console.log(UsamaNew)

// const newString =`String with
// multible
// lines`

// console.log(newString)

// const age = 15;
// const isOldEnough = age>=18;

// if(isOldEnough){
// console.log(`usama can start driving license 🚗`)
// }
// else{
//     const leftYear = 18 - age
//     console.log(`Usama is too young , wait another ${leftYear}  years`)
// }

//  console.log("===============challenge 2 =================")
//   const massMark = 78;
//  const heightMark = 1.69;
//  const massJohn = 92;
//  const heightJohn = 1.95;

//  const BMIMark = massMark / (heightMark * heightMark);
//  const BMIJohn = massJohn / (heightJohn * heightJohn)

//  console.log(BMIMark , BMIJohn)

//  if(BMIMark > BMIJohn){
//     console.log(`Mark's BMI (${BMIMark}) is higher than John's! (${BMIJohn})`)
//  }
//  else{
//     console.log(`John's BMI (${BMIJohn}) is higher than Mark's! (${ BMIMark})`)
//  }
//  console.log("===============challenge 2 =================")

// to convert any thing to a munber

// const input = "1991";
// console.log(Number(input), input, typeof input);
// console.log(input + 18);
// console.log(Number(input) + 18);

// const fristName = "Usama";
// console.log(Number(fristName), typeof NaN); // the output is NaN and the type of NaN is a number
// console.log(Number(true)); // 1
// console.log(Number(false)); // 0
// console.log(Number(null)); // 0
// console.log(Number(undefined)); // NaN

// // Convert to string
// console.log(String(23), typeof String(23), 23, typeof 23);

// //type coercion

// console.log(
//   "I am usama " + 21 + " years old",
//   typeof ("I am usama " + 21 + " years old")
// ); // convert the number (21) to string automaticliy
// console.log("23" - "10", typeof ("23" - "10")); // 13 number
// console.log("23" * "2", typeof ("23" * "2"));
// console.log("23" / "2");

// let n = "1" + 1;
// n = n - 1;
// console.log(n); // 10

// console.log(2 + 5 + 1 + "6", typeof (2 + 5 + 1 + "6")); //86
// console.log("6" + 1 + 5 + 2, typeof ("6" + 1 + 5 + 2)); //6152

// truthy and falsy values
// fuasy value : the values that will be false when we convert it to Boolean
// 5 falsy values : 0, '' , null, undifined ,NaN
// Everythisng else are our so-called truthy values

// console.log(Boolean(0));
// console.log(Boolean(""));
// console.log(Boolean({}));
// console.log(Boolean(55));
// console.log(Boolean(undefined));
// console.log(Boolean(null));

// const money = 100;
// if (money) {
//   console.log(`You have money (${money})`);
// } else {
//   console.log("you do not have mony ");
// }

// let height;

// if (height || height === 0) {
//   console.log("the heght is defined");
// } else {
//   console.log("height is undifined");
// }

//Equality operators

// the strict equality operattors : does not type coeracion

// const age = 18;
// if (age === 18) {
//   // the age is exactly the 18 number
//   console.log(" you just become adult");
// }

// // loose equality operator : does type coeracion
// if (age == "18") {
//   // the age is loosely equal to 18
//   console.log(" you just become adult (loose equality)");
// }

// const day = "friday";
// switch (day) {
//   case "saturday":
//     console.log("hello saturday");
//     break;
//   case "sunday":
//     console.log("hello sunday");
//     break;
//   case "monday":
//     console.log("hello monday");
//     break;
//   case "tuseday":
//   case "wednesday":
//     console.log("Hello! Hello!");
//     break;
//   case "thursday":
//     console.log("hello thursday");
//     break;
//   case "friday":
//     console.log("hello friday");
//     break;
//   default:
//     console.log("invalid day!");
// }

// if (day === "saturday") console.log("hello saturday");
// else if (day === "sunday") console.log("hello sunday");
// else if (day === "monday") console.log("hello monday");
// else if (day === "tuseday" || day === "wednesday") console.log("Hello! Hello!");
// else if (day === "thursday") console.log("hello thursday");
// else if (day === "friday") console.log("hello friday");
// else console.log("invalid day");

// the conditional operator
//condition ? expression_if_true : expression_if_false;

// const age = 23;
// age > 18 //this is hte condition
//   ? console.log("My age is greater than 18") // if the condition true the operator do one thig after the ?
//   : console.log("my age is less than 18"); // the else block is mandatory

// actuallu we do not use it like above
// any operator is an exprission >> the exprission is a pice of code that produce a  value >> so we can use it t decleare a variable

// const age = 23;
// const ageStrintg = age > 18 ? "greater than 18" : "less that 18";
// console.log(ageStrintg);

// // look the diffrence
// let ageStrintg2;
// if (age > 18) {
//   ageStrintg2 = "greater than 18";
// } else ageStrintg2 = "less than 18";
// console.log(ageStrintg2);

// // we can use it in template letirals >> because it is an expressien
// console.log(`The age is ${age > 18 ? "greater than 18" : "less that 18"}`);

// console.log("===========challenge 4=================");
// const bill = 275;
// const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// console.log(
//   `the bill was ${bill}, the tip was ${tip}, the total value is ${bill + tip}`
// );
// console.log("===========challenge 4=================");
