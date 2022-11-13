const bill = document.querySelector('.tip-calc__bill');
const buttonsPrecent = document.querySelectorAll('.tip-calc__precent');
const inputPrecent = document.querySelector('.tip-calc__precent.tip-calc__input');
const inputPerson = document.querySelector('.tip-calc__person');

const precents = document.querySelector('.tip-calc__precents');

const tipAmount = document.querySelector('.tip-amount');
const total = document.querySelector('.total');
const errorTitle = document.querySelector('.tip-calc__error-title');

const reset = document.querySelector('.tip-calc__reset');

let procent;

precents.addEventListener('click', e => {
   if( e.target.classList.contains('tip-calc__precent') ) {
      inactiveProcent();
      e.target.classList.add('active');
      let innerText = e.target.innerText.replace('%', ''); 
      procent = ( innerText == '' ) ? e.target.value : innerText;
      calcTip();
   } else return;
})

reset.addEventListener('click', e => {
   inactiveProcent();
   reset.classList.add('inactive');
   procent = 0;
   bill.value = '';
   inputPrecent.value = '';
   inputPerson.value = '';
   tipAmount.innerText = '$0.00';
   total.innerText = '$0.00';
})

function inactiveProcent() {
   buttonsPrecent.forEach(button => {
      button.classList.remove('active');
   });
}

bill.oninput = function() {
   calcTip();
}

inputPrecent.oninput = function() {
   procent = inputPrecent.value;
   calcTip();
}


inputPerson.oninput = function() {
   let persons = inputPerson.value;
   if( persons == '' || persons < 0 ) {
      inputPerson.classList.add('error');
      errorTitle.classList.add('active');
   } else {
      inputPerson.classList.remove('error');
      errorTitle.classList.remove('active');
      calcTip();
   }
}

function calcTip() {
   let inputPersonValue = inputPerson.value;
   let billValue = +bill.value;
   if(inputPersonValue == '' || inputPersonValue <= 0) {
      inputPerson.classList.add('error');
      errorTitle.classList.add('active');
   } else if ( billValue > 0 && procent != '' ) {
      let tip = billValue / 100 * procent;
      let amountResult = roundNumber((tip / inputPersonValue), 2);
      tipAmount.innerText = `$${amountResult}`;
      let totalResult = roundNumber(((billValue + tip) / inputPersonValue), 2);
      total.innerText = `$${totalResult}`;

      reset.classList.remove('inactive');
   }
}

function roundNumber(number, digits) {
   var multiple = Math.pow(10, digits);
   var rndedNum = Math.round(number * multiple) / multiple;
   return rndedNum;
}