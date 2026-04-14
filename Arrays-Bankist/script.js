'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'basic',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'standerd',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${movType}">${i} ${movType}</div>
        <div class="movements__value">${mov}&nbsp;€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const CalcBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance} €`;
  acc.balance = balance;
};

const clacDisplaySummary = function (acc) {
  const totalDeposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${totalDeposit} €`;
  const totalWithdrawls = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawls)} €`;
  const interst = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interst} €`;
};

const createeUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const updateUI = function (acc) {
  displayMovements(currentAccount.movements);
  CalcBalance(currentAccount);
  clacDisplaySummary(currentAccount);
};
createeUserNames(accounts);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    //clear inputs
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    //display the UI
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recipientAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    recipientAccount &&
    recipientAccount !== currentAccount &&
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-amount);
    recipientAccount?.movements.push(amount);
    currentAccount.balance -= amount;
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const closedAccount = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(closedAccount, 1);
    console.log(accounts);
    // hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = sorted ? false : true;
  displayMovements(currentAccount.movements, sorted);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

//Slice
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr); // does not change the original array

//splice
// arr.splice(1);
// arr.splice(2, 3, 'v');
// arr.splice(-1);
// console.log(arr);

// console.log(arr[-1]); // undifind
// console.log(arr.at(-1)); // f

// looping arrays forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //with for of

// for (const [i, mov] of movements.entries()) {
//   if (mov > 0) {
//     console.log(`${i}: deposit ${mov}`);
//   } else {
//     console.log(`${i}: withdrawls ${Math.abs(mov)}`);
//   }
// }

// console.log(`/////////////forEach////////////////`);
// movements.forEach(function (movement, i, theEntireArray) {
//   if (movement > 0) {
//     console.log(`${i}: deposit ${movement}`);
//   } else {
//     console.log(`${i}: withdrawls ${Math.abs(movement)}`);
//   }
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (currentValue, currentKey, entireMap) {
//   console.log(`${currentKey} : ${currentValue}`);
// });

// const currenciesUnique = new Set(currencies.keys());
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, Set) {
//   console.log(value);
// });

// //The map method
// const eurToUsd = 1.1;
// const movemenstUSD = movements.map(mov => eurToUsd * mov);
// console.log(movements);
// console.log(movemenstUSD);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

/// the filter method
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// // look the differece
// const test = function (mov) {
//   return mov > 0;
// };

// console.log(test(5));

// const withdrawls = movements.filter(mov => mov < 0);
// console.log(withdrawls);

// /// the reduce method   reduce(callbackFunction , intialAccValue);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration ${i} acc is ${acc}`);
//   return acc + cur;
// }, 0);

// console.log(balance);

// // const max = movements.reduce(function (acc, cur) {
// //   if (cur > acc) {
// //     acc = cur;
// //   }
// //   return acc;
// // }, 0);

// const max = movements.reduce((acc, cur) => {
//   if (acc > cur) return acc;
//   else return cur;
// });

// console.log(max);

// const eurToUsd = 1.1;
// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov);
// console.log(totalDepositUSD);

// /// findLast and findLastIndex methods

// const largeMovement = movements.findLast(mov => Math.abs(mov) > 1000);
// const largeMovementIndex = movements.findLastIndex(mov => Math.abs(mov) > 1000);
// console.log(
//   `Your latest large movement ${largeMovement} was movement #${
//     largeMovementIndex + 1
//   }`
// );

// /// The some method

// //Equality
// console.log(movements.includes(-130));

// const includes = movements.some(mov => mov === -130); // what the include method do
// console.log(includes);
// //conditiono not just equality
// const anyDeposit = movements.some(mov => mov > 0);
// console.log(anyDeposit);

// // the every method

// const allIsDeposit = movements.every(mov => mov > 0);
// console.log(allIsDeposit);

// //flat method
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// /// the sort method for sorting an array
// const names = ['usama', 'mohsen', 'ahmed', 'shiam', 'zahraa'];
// names.sort(); //does the sorting based on strings
// console.log(names);

// movements.sort(); // also based on strings
// console.log(movements);

// // a=> the current element    b=> the next elemet after the current elemet
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1; // returns positve number means sort the next element (b) before the current element (a)
//   } else if (a < b) return -1; // returns nagative number means sort the current element(a) before the next elemet (b)
// });

// console.log(movements);

// //More Concise Numerical Sort
// movements.sort((a, b) => a - b);
// console.log(movements);

// /// grouping Array

// const groupedMovment = Object.groupBy(movements, mov =>
//   mov > 0 ? 'deposit' : 'withDrawls'
// );
// console.log(groupedMovment);

// const groupedByActivity = Object.groupBy(accounts, account => {
//   const n = account.movements.length;
//   if (n >= 8) return 'veryActive';
//   else if (n >= 5) return 'active';
//   else if (n >= 1) return 'moderate';
//   else return 'inactive';
// });

// console.log(groupedByActivity);

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
// console.log(groupedAccounts);

// const groupedAccounts2 = Object.groupBy(accounts, ({ type }) => type); // with destructing
// console.log(groupedAccounts2);

// //test
// // const allAccMov = accounts.map(acc => acc.movements);

// // const groupedByActivity = Object.groupBy(
// //   allAccMov,
// //   movements => `${movements.length}Movements`
// // );

// // console.log(allAccMov);
// // console.log(groupedByActivity);
// // console.log(typeof groupedByActivity);

// // fill the arry programmriclly

// const arr = [1, 2, 3, 4, 5, 6, 7];
// const arr2 = new Array(1, 2, 3, 4, 5, 6, 7);

// const x = new Array(7); // this will create an empty array with 7 elemet (length = 7)
// console.log(x);
// // you can fill it by the fill method
// console.log(x.fill(1));
// console.log(x.fill(2, 3));
// console.log(x.fill(3, 4, 6)); // index 6 is not included
// console.log(x);
// // another way
// const z = Array.from({ length: 7 }, () => 1);
// console.log(z);

// const s = Array.from({ length: 7 }, (currntElemet, index) => index + 1); //this callback function is similar to the map method callback function
// console.log(s);

// // generate an arry with 100 rondom dice rolls
// const rolls = Array.from(
//   { length: 100 },
//   (_, i) => Math.trunc(Math.random() * 6) + 1
// );

// console.log(rolls);

// // non-destractive methods

// const ResrevedMovs = movements.toReversed();
// console.log(ResrevedMovs);
// const SortedMovs = movements.toSorted();
// console.log(SortedMovs);
// const fristMov = movements.toSpliced(1);
// console.log(fristMov);
// const newMovments = movements.with(1, 5000);
// console.log(newMovments);
// console.log(movements); // does not change

// ///Array method praictice
// //1.
// const totalBankDeposit = accounts
//   .flatMap(({ movements }) => movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, mov) => acc + mov);
// console.log(totalBankDeposit);

// //2.
// const largeDepositNum = accounts
//   .flatMap(({ movements }) => movements)
//   .filter(mov => mov >= 1000).length;
// console.log(largeDepositNum);

// const largeDepositNum1 = accounts
//   .flatMap(({ movements }) => movements)
//   .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
// console.log(largeDepositNum1);

// //3.
// const sums = accounts
//   .flatMap(({ movements }) => movements)
//   .reduce(
//     (sums, cur) => {
//       sums[cur > 0 ? 'deposit' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposit: 0, withdrawals: 0 }
//   );
// console.log(sums);
