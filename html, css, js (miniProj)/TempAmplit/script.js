//Task: calculating one day the temperature amplitude. Sometimes there might be a sensor error.

//Solution
console.log('Task a');
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temp) {
  let max = temp[0];
  let min = temp[0];
  for (let i = 0; i < temp.length; i++) {
    const curentTemp = temp[i];
    if (typeof curentTemp !== 'number') continue;
    //for error

    if (curentTemp > max) max = curentTemp;
    if (curentTemp < min) min = curentTemp;
  }
  console.log('MAX temp.:', max, '|', 'MIN temp.:', min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log('Amplitude:', amplitude);

//Task: working with two temperature arrays.

//Solution
console.log('Task b');
const temperaturesNew = [3, 0, -2, -10, 'error', 1, 9, 2, 13];
const calcTempAmplitudeNew = function (t1, t2) {
  const temp = t1.concat(t2);
  let max = temp[0];
  let min = temp[0];
  for (let i = 0; i < temp.length; i++) {
    const curentTemp = temp[i];
    if (typeof curentTemp !== 'number') continue;
    //for error

    if (curentTemp > max) max = curentTemp;
    if (curentTemp < min) min = curentTemp;
  }
  console.log('MAX temp.:', max, '|', 'MIN temp.:', min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew(temperatures, temperaturesNew);
console.log('Amplitude:', amplitudeNew);
// console.log('Arry#1', temperatures)
// console.log('Arry#2', temperaturesNew)
