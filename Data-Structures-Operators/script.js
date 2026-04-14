'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const openingHours = {
  [days[4]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivary({ time = '20;00', address = '000', starterIndex = 0 }) {
    console.log(
      `the order id recived! ${this.starterMenu[starterIndex]} to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    return `this is the delicous pasta with ${ing1},${ing2} and ${ing3}`;
  },
};

// const {
//   openingHours: {
//     thu: { open: o1, close: c1 },
//     fri: { open: o2, close: c2 },
//   },
// } = restaurant;
// console.log(o1, c1, o2, c2);

// restaurant.orderDelivary({
//   time: '20:30',
//   address: 'cairo',
//   starterIndex: 0,
// });
// restaurant.orderDelivary({
//   address: 'cairo',
// });

// //desturacturing objects

// const {
//   categories: [v, b, c],
//   mainMenu,
// } = restaurant;
// console.log(v, b, c, mainMenu);

// const { starterMenu: starter, mainMenu: main, openingHours } = restaurant;
// console.log(starter, main, openingHours);

// // default values
// const { a = [], categories = [] } = restaurant;
// console.log(a, categories);

// //mutating variables
// let t = 111;
// let n = 999;
// const Obj = { t: 7, n: 8 };
// ({ t, n } = Obj);
// console.log(t, n);

// //Nested objects
// const {
//   fri: { open, close },
// } = openingHours;
// console.log(open, close);

//desturcturing  Arrays

// const arr = [1, 2, 3];
// const [a, b, c] = arr;
// console.log(a, b, c); // desturcturing the array but not affect it
// console.log(arr);

// let [first, second] = restaurant.categories;
// console.log(first, second);

// let [, , third, forth] = restaurant.categories;
// console.log(third, forth);

// // switching a variables

// [first, forth] = [forth, first];
// console.log(first, forth);

// const [starter, main] = restaurant.order(1, 2);
// console.log(starter, main);

// //you can set a defuslt values
// const [a = 1, b = 1, c = 1] = [9, 8];
// console.log(a, b, c);

// //Spread operator

// //extend an array
// const arr1 = [3, 4, 5, 6];
// const arr2 = new Array(1, 2, ...arr1);
// console.log(arr2);

// // Array Shallow copy
// const arr2Coypy = [...arr2];
// console.log(arr2Coypy);

// //marge Arrays
// const arr3 = [...arr2, ...arr1];
// console.log(arr3);

// //it work with all iterables like strigs

// const UsamaName = 'usama';
// console.log(...UsamaName);

// const letters = [...UsamaName, ' '];
// console.log(letters);

// // with object

// const objectTest = {
//   firstName: 'usama',
//   lastName: 'Mohammed',
// };

// const objectUpdate = { ...objectTest, age: 21 };
// console.log(objectUpdate);

// // object shallow copy

// const restaurantCopy = { ...restaurant };
// console.log(restaurantCopy);

// //with function
// const ingrediants = ['ing1', 'ing2', 'ing3'];
// const theOrdre = restaurant.orderPasta(...ingrediants);
// console.log(theOrdre);

// rest pattern and parmeter >> it is written in the left hand side
// it is the opposite of the speard opertor bt it has the same syntax
// the spread operator is used where we would otherwise write values spreated by commas ,
// the rest pattern used to otherwie write variables nave spreated by commas
// spread operator ==> 1,2,3,4
// rest patterns ==> NumberOneVariable , NumberTwoVariable , NumberThreeVariable , NumberFourVariable

// const arr = [1, 2, 3, 4, 5];
// const [a, b, ...others] = arr;
// console.log(a, b, others);

// const { location: loc, name: n, ...otherInRestaurant } = restaurant;
// console.log(loc, n, otherInRestaurant);

// const sum = function (...numbers) {
//   let sum = 0;
//   numbers.forEach(element => {
//     sum += element;
//   });
//   return sum;
// };

// console.log(sum(2, 3));
// console.log(sum(2, 3, 5, 8));
// console.log(sum(6, 9, 1, 7, 5, 2, 2, 2));

// short circiting

// console.log(3 || 'usama');
// console.log(0 || 3);
// console.log(false && 'usama');
// console.log(true && 'usama');

// restaurant.m || (restaurant.m = 22);
// console.log({ ...restaurant });

// restaurant.m && delete restaurant.m;
// console.log({ ...restaurant });

// // nullish coalescing operator : it works with nullish values not falsy values
// // (null,undifind) not (0,' ',fulse)
// restaurant.m ?? (restaurant.m = 22);
// console.log({ ...restaurant });

///////////////////////////////////////
// Coding Challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const {
//   players: [players1, players2],
// } = game;
// console.log(players1, players2);

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// const {
//   odds: { team1, x: draw, team2 },
// } = game;

// const printGoals = function (...playerNames) {
//   console.log(`${playerNames.length} goals`);
// };

// printGoals(...game.scored);

// team1 < team2 && console.log(`team1 is more likely to win `);
// team2 < team1 && console.log(`team2 is more likely to win `);

// // the for of loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) {
//   console.log(item);
// }

// for (const item of menu.entries()) {
//   console.log(item);
// }
// console.log(...menu.entries());

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1} : ${el}`);
// }
//////////////////////////////////////////
// console.log(restaurant.name && restaurant.name);
/////////////////////////////////////////////////

// // optional chaining.
// console.log(restaurant.openingHours?.mon?.open);

// const test = restaurant.order?.(0, 1) ?? 'the function not found ';
// console.log(test);

// const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// for (const item of weekdays) {
//   console.log(restaurant.openingHours[item]?.open ?? 'closed');
// }\

// console.log(Object.entries(openingHours));
// console.log(Object.keys(openingHours));
// console.log(Object.values(openingHours));

// //////////////////////////// Challenge 2 //////////////////////////
// for (const [goal, player] of game.scored.entries()) {
//   console.log(`"Goal ${goal + 1}: ${player}"`);
// }

// let sum = 0;
// for (const odd of Object.values(game.odds)) {
//   sum += odd;
// }
// const avg = sum / Object.values(game.odds).length;
// console.log(avg);

// for (const [key, value] of Object.entries(game.odds)) {
//   console.log(
//     `Odd of victory ${game[key] ?? 'draw'}: ${value}
//     `
//   );
// }

// // const filtered = game.scored.filter(
// //   (value, index) => game.scored.indexOf(value) === index
// // );
// // console.log(filtered);

// const scorersArr = [...new Set(game.scored)];

// const scorers = {};

// const goalcounter = function (player) {
//   return game.scored.filter(item => item === player).length;
// };

// for (const item of scorersArr) {
//   scorers[item] = goalcounter(item);
// }

// console.log(scorers);
// //////////////////////////// Challenge 2 //////////////////////////

// //Sets

// const NamesSet = new Set(['usama', 'ahmed', 'ali', 'mohsen', 'usama']);
// console.log(NamesSet);

// NamesSet.add('zahraa');
// console.log(NamesSet);
// NamesSet.delete('ali');
// console.log(NamesSet);
// console.log(NamesSet.has('zahraa'));
// console.log(NamesSet.size);
// NamesSet.clear();
// console.log(NamesSet);

// const commanFood = italianFoods.intersection(mexicanFoods);
// console.log(commanFood);

// const italianFoodsAndMaxicanFoods = italianFoods.union(mexicanFoods);
// console.log(italianFoodsAndMaxicanFoods);

// const uniqueItalianFood = italianFoods.difference(mexicanFoods);
// console.log(uniqueItalianFood);

// const uniqueMexicanFood = mexicanFoods.difference(italianFoods);
// console.log(uniqueMexicanFood);

// const notInstesctFood = italianFoods.symmetricDifference(mexicanFoods);
// console.log(notInstesctFood);

// console.log(italianFoods.isDisjointFrom(mexicanFoods));

// //Maps
// const newMap = new Map();
// newMap.set(1, 'usama').set(2, 'zahraa').set(3, 'mohsen');
// console.log(newMap);

// newMap.set(4, 'shimaa');

// console.log(newMap);

// // with arrays

// const arr = [1, 2];
// newMap.set(arr, 'balbalbal');
// console.log(newMap);

// console.log(newMap.get(arr));
// console.log(newMap.get([1, 2]));

// console.log(newMap.has(2));
// newMap.delete(1);
// console.log(newMap);
// newMap.clear();
// console.log(newMap);
// console.log(newMap.size);
// // there is  anothere way fo populating a new map without having to use the set method

// const map2 = new Map([
//   [1, 'usama'],
//   [2, 'zahraa'],
//   [3, 'mohsen'],
// ]);
// console.log(map2);

// // you can convert an object to a map

// const openingHoursMap = new Map(Object.entries(openingHours));
// console.log(openingHoursMap);

// for (const item of map2) {
//   console.log(item);
// }

// //======================================Challenge 3=========================================

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1.  Create an array 'events' of the different game events that happened (no duplicates)
// // 2.  After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// // 3.  Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// // 4.  Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
// //     [FIRST HALF] 17: ⚽️ GOAL

// const events = [...new Set(gameEvents.values())];
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// for (const [minute, event] of gameEvents) {
//   console.log(`
//     ${minute < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${minute}: ${event}
//     `);
// }

// // Working with Strings

// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(airline[4]);
// console.log(airline.indexOf('r')); //first occurence
// console.log(airline.lastIndexOf('r')); // last occurence

// console.log(airline.slice(4));
// console.log(airline.slice(-2));
// console.log(airline.slice(4, 7));
// console.log(airline.slice(4, -6));
// console.log(airline.slice(airline.indexOf(' ') + 1));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// const usamaStringObject = new String('usama'); // this is what happend automaticlly whenever we calling method on a string primative
// console.log(usamaStringObject);

// const passenger = 'usama';
// console.log(passenger.toLowerCase());
// console.log(passenger.toUpperCase());

// //Fix capitlization in name
// const passenger1 = 'usAmA'; // Usama
// const passengerLower = passenger1.toLowerCase();
// const passengerCorrect = passenger[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// // comparing emails

// const email = 'hello@usama.io';
// const loginEmail = 'Hello@Usama.Io';
// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(email === normalizedEmail);

// //replacing
// const priceGB = '288,55£';
// const peiceUS = priceGB.replace(',', '.').replace('£', '$');
// console.log(peiceUS);

// const announcement = 'please come to bording door 23 ,Bording door 23';
// console.log(announcement.replace('door', 'gate')); // the first occurence
// console.log(announcement.replaceAll('door', 'gate')); // all occurence
// //regular expresion
// console.log(announcement.replace(/door/g, 'gate'));

// console.log(announcement.includes('23'));
// console.log(announcement.startsWith('please'));
// console.log(announcement.endsWith('dfa'));

// // Split and join
// console.log('a+very+nice+String'.split('+'));
// console.log('usama mohamed'.split(' '));

// const capitlizeName = function (name) {
//   const names = name.split(' ');
//   const upperNames = [];
//   for (const n of names) {
//     upperNames.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   return upperNames.join(' ');
// };

// console.log(capitlizeName('usama mohamed mohsen'));

//padding a string
// adding strig to the strig from the biganig or end until reaching a certin length   padStrt();  , padEnd()
// const maskCridtCard = function (number) {
//   const str = String(number);
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCridtCard(45899465132345899));

// //repeat
// const name11 = 'usama....';
// console.log(name11.repeat(10));

// //form the flights string
// // 🔴 Delayed Departure from FAO to TXL (11h25)
// //  Arrival from BRU to FAO (11h45)
// //  🔴 Delayed Arrival from HEL to FAO (12h05)
// //  Departure from FAO to LIS (12h30)
// const getCode = str => str.slice(0, 3).toUpperCase();

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';');
//   const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type
//     .replaceAll('_', ' ')
//     .trim()} from ${getCode(from)} to ${getCode(to)} (${time.replace(
//     ':',
//     'h'
//   )})`;
//   console.log(output.padStart(50));
// }
