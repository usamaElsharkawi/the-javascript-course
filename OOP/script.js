'use strict';

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const usama1 = new Person('usama', 2004);
// const mohsen = new Person('mohsen', 2004);
//1. new empty object was created
//2. function is called and the this keyword is set to the empty object that was created at step 1
//3.the object linked to a prototype
//4.function automaticlly return the this object if there is no object returned in a premaive value will returns form the function it would be ignored
// console.log(usama instanceof Person);

// //stsatic method attached to the constrctor functino itself not to the instances
// Person.hey = function () {
//   console.log('hey there 👋');
// };

// Person.hey();
// //prototypes

// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   return 2025 - this.birthYear;
// };

// console.log(usama.calcAge());
// console.log(usama.__proto__);
// console.log(usama.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(usama));

// Person.prototype.country = 'Egypt';

// console.log(usama.country);
// console.log(usama);
// console.log(usama.hasOwnProperty('country')); // false

// console.log(usama.__proto__);
// console.log(usama.__proto__.__proto__);
// console.log(usama.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [1, 2, 2, 2, 3, , 5, 6, 8];

// console.log(arr);

// const h1 = document.querySelector('h1');
// console.dir(h1); // look at the prototype chain

// //========================Challenge 1 ==========================

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// console.log(car1, car2);

// car1.accelerate();
// car1.accelerate();
// car1.brake();
// car1.accelerate();
// //========================challenge 1==========================

// /// ES6 calsses

// class PersonCL {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2025 - this.birthYear);
//   }
//   get age() {
//     return 2025 - this.birthYear;
//   }

//   //set property that already exist
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('hey there 👋');
//   }
// }

// const usama = new PersonCL('usama elsharkawi', 2004);
// console.log(usama);

// console.log(usama.fullName);

// /// getters and setters

// const account = {
//   owner: 'usama',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   }, // getterd

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// const s = new String('usama');
// console.log(s);

// const a = [...'usama'];
// console.log(a);

// /// Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2025 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const usama = Object.create(PersonProto);
// usama.name = 'usama El-Sharkawi';
// usama.birthYear = 2004;
// console.log(usama);
// usama.calcAge();

// console.log(usama.__proto__);
// console.log(usama.__proto__ === PersonProto);

// const mohsen = Object.create(PersonProto);
// mohsen.init('mohsen', 2004);
// console.log(mohsen);

// ////////////////////////////////// challenge 2 //////////////////////////////////////
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  barke() {
    this.speed += 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// const ford = new CarCl('ford', 120);
// console.log(ford);

// console.log(ford.speedUS);

// ford.accelerate();
// ford.accelerate();
// ford.barke();
// ford.accelerate();
// ////////////////////////////////// challenge 2 //////////////////////////////////////

// /// the real inhretance
//constructor function

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2025 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Student.prototype.__proto__ = Person.prototype; (old way)
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// Student.prototype.constructor = Student;

// const usamaStu = new Student('usama', 2004, 'javaScript');
// console.log(usamaStu);

// usamaStu.calcAge();

// ////////////////////////////challenge 3 ///////////////////////////////
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeBattery = function (chargeTO) {
//   this.charge = chargeTO;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge} %`
//   );
// };

// const tesla = new EV('tesla', 120, 22);
// console.log(tesla);

// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.accelerate();
// ////////////////////////////challenge 3 ///////////////////////////////

// /// real inheritance using ES6 classes
// class PersonCL {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2025 - this.birthYear);
//   }
//   get age() {
//     return 2025 - this.birthYear;
//   }

//   //set property that already exist
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('hey there 👋');
//   }
// }

// class StudentCL extends PersonCL {
//   constructor(fullName, birthYear, course) {
//     // always need to happen first!
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName}, and i study ${this.course}`);
//   }
// }

// // Student.prototype = Object.create(PersonCL.prototype);  the prototype propery with the ES6 classes is an only read method
// //so you can not assign it

// const usaa = new StudentCL('usama El-sharkawi', 2004, 'OOP');
// console.log(usaa);

///

// const PersonProto = {
//   calcAge() {
//     console.log(2025 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const moamen = Object.create(PersonProto);
// moamen.init('moamen', 2005);
// console.log(moamen);

// const Studentproto = Object.create(PersonProto);

// Studentproto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };
// const usama = Object.create(Studentproto);
// usama.init('usama', 2004, 'java');
// console.log(usama);
// usama.calcAge();

// class Account {
//   constructor(owner, pin, currency) {
//     this.owner = owner;
//     this.pin = pin;
//     this.currency = currency;
//     this.movements = [];
//     this.local = navigator.language;
//   }

//   //puplic interface or API
//   deposit(val) {
//     this.movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }

//   approveLoan(val) {
//     //some condtions
//     return true;
//   }
//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log('loan approved');
//     }
//   }
// }

// const acc1 = new Account('usama', 111, 'USD');

// acc1.deposit(500);
// acc1.deposit(600);
// acc1.deposit(150);
// acc1.withdraw(500);
// acc1.requestLoan(1000);
// console.log(acc1);

// ///calss fields and encapsulation

// class Account {
//   //public fields
//   local = navigator.language;
//   bank = 'bankist';
//   //private fields
//   #movments = [];
//   #pin;
//   constructor(owner, pin, currency) {
//     this.owner = owner;
//     this.#pin = pin;
//     this.currency = currency;
//   }

//   deposit(val) {
//     this.#movments.push(val);
//     return this;
//   }

//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }

//   getMovments() {
//     return this.#movments;
//   }

//   #approveLoan(val) {
//     //some condtions
//     return true;
//   }
//   requestLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log('loan approved');
//     }
//     return this;
//   }
// }

// const amr = new Account('amr', 555, 'USD');
// amr.deposit(1000).withdraw(500).deposit(5000).withdraw(2000).withdraw(500);

// console.log(amr);

////////////////////////////////////// challenge 4 ///////////////////////////////////////////

// class EVCL extends CarCl {
//   #charge;
//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }

//   accelerate() {
//     this.speed += 20;
//     this.charge--;
//     console.log(
//       `${this.make} going at ${this.speed}km/h, with a charge of ${
//         this.#charge
//       } %`
//     );
//     return this;
//   }

//   chargeBattery = function (chargeTO) {
//     this.charge = chargeTO;
//     return this;
//   };
// }

// const car1 = new EVCL('Rivian', 120, 23);
// car1.accelerate();
// ////////////////////////////////////// challenge 4 ///////////////////////////////////////////
