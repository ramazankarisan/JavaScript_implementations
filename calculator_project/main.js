const display1E1 = document.querySelector('.display-1');
const display2E1 = document.querySelector('.display-2');
const numbersE1 = document.querySelectorAll('.number');
const operationE1 = document.querySelectorAll('.operation');
const equalE1 = document.querySelector('.equal');
const clearE1 = document.querySelector('.all-clear');
const clearLastE1 = document.querySelector('.last-entity-clear');
const sqrtE1 = document.querySelector('.sqrt');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;
let afterEqual = false;

numbersE1.forEach(number => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    if (dis2Num && afterEqual) {
      dis2Num = '';
      dis2Num += e.target.innerText;
      afterEqual = false;
    } else {
      dis2Num += e.target.innerText;
    }
    display2E1.innerText = dis2Num;

  })
});

operationE1.forEach(operation => {
  operation.addEventListener('click', (e) => {
    if (!dis2Num) { return };
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num)
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  })
});
function clearVar(name = '') {
  if (dis2Num.includes('√')) { return; };
  dis1Num += dis2Num + ' ' + name + ' ';
  display1E1.innerText = dis1Num;
  dis2Num = '';
  display2E1.innerText = '0';

}
function mathOperation() {
  if (lastOperation === 'x') {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === '/') {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === '%') {
    result = parseFloat(result) % parseFloat(dis2Num);
  } else if (lastOperation === '^') {
    result = parseFloat(result) ** parseFloat(dis2Num);
  } else if (lastOperation === '√') {
    result = Math.sqrt(parseFloat(dis2Num.slice(1)))
  }
}

equalE1.addEventListener('click', (e) => {
  afterEqual = true;
  sqrtEqual();
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  display2E1.innerText = result;
  dis2Num = result;
  dis1Num = '';
  display1E1.innerText = '';
  console.log(afterEqual);

})

clearE1.addEventListener('click', (e) => {
  display1E1.innerText = '';
  display2E1.innerText = '0';
  dis1Num = '';
  dis2Num = '';
  result = '';
  haveDot = false;
  afterEqual = false;
})

clearLastE1.addEventListener('click', (e) => {
  dis2Num = dis2Num.slice(0, dis2Num.length - 1);
  display2E1.innerText = dis2Num;
})
sqrtE1.addEventListener('click', (e) => {
  if (dis2Num.includes('√')) { return; };
  dis2Num = e.target.innerText;
  display2E1.innerText = dis2Num;
  lastOperation = '√';
  console.log(afterEqual);


})

function sqrtEqual() {
  if (dis2Num.includes('√')) {
    haveDot = false;
    mathOperation();
    display2E1.innerText = result;
    dis2Num = result;
    dis1Num = '';
    display1E1.innerText = '';



  }
}