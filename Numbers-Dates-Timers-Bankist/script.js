'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-06-25T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2025-06-20T23:36:17.929Z',
    '2025-06-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-06-24T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-06-25T14:43:26.374Z',
    '2025-06-23T18:49:59.371Z',
    '2025-06-25T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
function formatCurrency(
  amount,
  currency = 'USD',
  locale = 'en-US',
  options = {}
) {
  const {
    useGrouping = true,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    useGrouping: useGrouping,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(amount);
}

const formatMovmentDate = function (date, locale) {
  const calcpassedDays = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcpassedDays(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;

  // const year = date.getFullYear();
  // const mounth = `${date.getMonth()}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // return `${day}/${mounth}/${year}`;
  return Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movsWithDates = acc.movements.map((mov, i) => [
    mov,
    acc.movementsDates[i],
  ]);
  const movs = sort
    ? movsWithDates.slice().sort((a, b) => a[0] - b[0])
    : movsWithDates;

  movs.forEach(function (mov, i) {
    const type = mov[0] > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(mov[1]);
    const displayDate = formatMovmentDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurrency(
          mov[0],
          currentAccount.currency,
          currentAccount.locale
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    currentAccount.currency,
    currentAccount.locale
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  let time = 10 * 60;
  const tick = function () {
    const min = `${Math.floor(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  tick();

  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(new Date());
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // timer
      if (timer) clearInterval(timer);
      timer = startLogoutTimer();
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(2 === 2.0);
// console.log(0.1 + 0.2); // it's hard to represnt fractions in binary in javaScript
// console.log(0.1 + 0.2 === 0.3);

// //converting strings to numbers
// console.log(Number('23'));
// console.log(+'23'); // here when javaScript see the + operator it will do type ceorcion automaticlly
// console.log(+'20' + '30'); //type ceorcion here is to string  '2030' (the + operator with strings)

// //prasing
// console.log(Number.parseInt('30px', 10)); // remove the px and convert the '30' to a number
// console.log(Number.parseInt('e5454', 10)); // NaN the string here should start with a number
// console.log(Number.parseFloat('2.5rem', 10)); // 2.5
// console.log(Number.parseInt('2.5rem', 10)); // 2

// //check if the value in NaN
// //Number.isNaN() only returns true if the value is exactly the special value NaN and of type number.
// console.log(Number.isNaN(23));
// console.log(Number.isNaN('23'));
// console.log(Number.isNaN(+'5u'));
// console.log(Number.isNaN(10 / 0));
// console.log('===========================');
// // check is the value is a number
// console.log(Number.isFinite(23));
// console.log(Number.isFinite('23'));
// console.log(Number.isFinite(+'f23'));
// console.log(Number.isFinite(+'23'));
// console.log(Number.isFinite(10 / 0));
// console.log('==========================================');
// console.log(Number.isInteger(2));
// console.log(Number.isInteger(2.0));
// console.log(Number.isInteger(2.5));

/// Math and rounding

// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));

// console.log(Math.max(1, 2, 55, 3, 4, 88, 9));
// console.log(Math.max(1, 2, 3, '5')); // type cearcion automaticlly
// console.log(Math.max(1, 2, 5, '30px')); // NaN
// console.log(Math.min(1, 4, 5, 5, 6, 4, 8));

// console.log(Math.PI * Number.parseInt('30px') ** 2);

// // // 10 -> 20 ; 11
// // // min -> max ; max-min + 1

// // const roandomInt = (min, max) =>
// //   Math.floor(Math.random() * (max - min + 1)) + min;

// // console.log(roandomInt(10, 20));
// // console.log(roandomInt(0, 5));

// /// Rounding intgers  // all of these method does type coertion.
// //Math.trunc => removes any dicimal part
// console.log(Math.trunc(23.3));
// //Math.round => alwys round to the nearest integer
// console.log(Math.round(2.6));
// console.log(Math.round(2.5));
// console.log(Math.round(2.4));
// // Math.ceil => round up to the next bigger intger
// console.log(Math.ceil(22.9));
// console.log(Math.ceil(22.1));
// //Math.floor() => round down to the next smallest integer
// console.log(Math.floor(22.9));
// console.log(Math.floor(22.1));
// //see the difference
// console.log(Math.trunc(-23.3)); //-23
// console.log(Math.floor(-23.3)); //-24

// // toFixed method to round dicmals
// // returns a string
// console.log((22.5).toFixed(0)); // here 22.5 is a primative value so javaScript does boxing here which is to trasfare the number to number object to dealing with its methods
// console.log((22.5).toFixed(3));
// console.log(+(22.5512).toFixed(2));

// /// hte reminder operator

// const isEven = n => n % 2 === 0;
// console.log(isEven(6));

// const isOdd = n => n % 2 !== 0;
// console.log(isOdd(8));

// // // whenever you need to do something every nth time we can use the reminder operator for that
// // [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
// //   // every secound time
// //   if (i % 2 === 0) {
// //     row.style.backgroundColor = 'orange';
// //   }
// //   //every third thime
// //   if (i % 3 === 0) {
// //     row.style.backgroundColor = 'blue';
// //   }
// // });

// // // the Numaric seperators

// // const x = 250_450_000;
// // console.log(x);

// // console.log(Number('250_000')); //NaN

// /// working whith bigInt

// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 0); //

// console.log(41978146281651498484515156189485156985n);
// // console.log(20 + 20n); // is inpossible
// console.log(20n + BigInt(20));

// //expctions
// console.log(20n > 2);
// console.log(20n === 20); // false  // strict equality  does not type ceotion
// console.log(20n == 20); // true    // loose equlaity does type ceorcion

// //Math operations are not gonna work

// //divisios

// console.log(10n / 3n); // 3n  returns the closest bigInt
// console.log(12n / 3n);

// /// Dates

// //there are four ways to create dates ,they all use the Date constructor but they can acept differnt parameter
// // 1-> date for now without passing any thing
// console.log(new Date());
// // 2-> passing a string with date information and javaScript will parsing it
// console.log(new Date('jun ,01 ,2015'));
// // 3 -> passing an ISO8601 string
// console.log(new Date(account1.movementsDates[0]));
// // 4 -> passing a TimeStamp in ms and calcoulte date after the unix date which is jun 01 1970
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after the unix date
// // 5 ->
// console.log(new Date(2024, 5, 30, 6, 35, 55));

// //working with dates

// const future = new Date('Mon Nov 18 2019 23:31:17');

// console.log(future.getFullYear());
// console.log(future.getMonth()); // 0 based
// console.log(future.getDate()); // day on the mounth
// console.log(future.getDay()); // day on the week
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getMilliseconds());
// console.log(future.getTime()); // get the timeStamp
// console.log(future.toISOString());

// console.log(Date.now()); //time stamp for now

// future.setFullYear(2000);
// console.log(future);

/// operations with dates

// //when we convert dates to number the result will be the timeStampt for this date
// const future = new Date(2023, 9, 6, 5);
// console.log(+future); // convert it to number

// const calcpassedDays = (date1, date2) =>
//   Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

// console.log(
//   calcpassedDays(new Date(2024, 9, 14, 5, 7), new Date(2024, 9, 24, 12, 58))
// );
