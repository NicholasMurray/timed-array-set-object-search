/* Finding pairs of numbers that add to total */
const time = require('./time');
const numbers = require('./numbers');
const total = 100;
const half = total / 2;
const nums = numbers(total);

time('forEach', () => {
  const pairs = [];
  nums.forEach((num) => {
    const match = nums.find((n) => num + n === 100 && num < half);
    if (match) pairs.push([num, match]);
  });
  console.log(pairs);
});

time('map', () => {
  const pairs = [];
  nums.map((num) => {
    const match = nums.find((n) => num + n === 100 && num < half);
    if (match) pairs.push([num, match]);
  });
});

time('map half', () => {
  const pairs = [];
  const lowerArr = nums.filter((n) => n < half);
  const higherArr = nums.filter((n) => n > half);
  lowerArr.map((num) => {
    const match = higherArr.find((n) => num + n === 100 && num < half);
    if (match) pairs.push([num, match]);
  });
});

time('includes', () => {
  const pairs = [];
  const lowerArr = nums.filter((n) => n < half);
  const higherArr = nums.filter((n) => n > half);
  lowerArr.map((num) => {
    if (higherArr.includes(total - num)) pairs.push([num, total - num]);
  });
});

time('set', () => {
  const pairs = [];
  const lowerArr = nums.filter((n) => n < half);
  const higherSet = new Set(nums.filter((n) => n > half));
  lowerArr.map((num) => {
    if (higherSet.has(total - num)) pairs.push([num, total - num]);
  });
});

time('object', () => {
  const pairs = [];
  const lowerArr = nums.filter((n) => n < half);
  const higherObject = nums.reduce((acc, num) => {
    acc[num] = true;
    return acc;
  }, {});
  lowerArr.map((num) => {
    if (higherObject[total - num]) pairs.push([num, total - num]);
  });
});
