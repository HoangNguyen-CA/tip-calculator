const billInput = document.querySelector('#billInput');
const peopleInput = document.querySelector('#peopleInput');
const tipInput = document.querySelector('#tipInput');

const tipButtons = document.querySelectorAll('.tip__btns > .btn');

const tipDisplay = document.querySelector('#tipDisplay');
const totalDisplay = document.querySelector('#totalDisplay');

const resetBtn = document.querySelector('#resetBtn');

const billError = document.querySelector('#billError');
const peopleError = document.querySelector('#peopleError');

let INIT_TIP_VAl = 0.1;
let tipVal = INIT_TIP_VAl;

const setBillError = (message) => {
  billError.innerText = message;
  billInput.classList.add('tip__input--invalid');
};

const resetBillError = () => {
  billError.innerText = '';
  billInput.classList.remove('tip__input--invalid');
};

const setPeopleError = (message) => {
  peopleError.innerText = message;
  peopleInput.classList.add('tip__input--invalid');
};

const resetPeopleError = () => {
  peopleError.innerText = '';
  peopleInput.classList.remove('tip__input--invalid');
};

const setTipError = () => {
  tipInput.classList.add('tip__input--invalid');
};

const resetTipError = () => {
  tipInput.classList.remove('tip__input--invalid');
};

const calcTip = () => {
  resetBtn.disabled = false;
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (isNaN(bill)) {
    setBillError('Invalid value');
    return;
  } else {
    resetBillError();
  }

  if (isNaN(people)) {
    setPeopleError('Invalid value');
    return;
  } else if (people == 0) {
    setPeopleError("Can't be zero");
    return;
  } else {
    resetPeopleError();
  }

  const tip = bill * tipVal;
  const total = bill + tip;

  const tipPP = (tip / people).toFixed(2);
  const totalPP = (total / people).toFixed(2);

  console.log(tipPP, totalPP);

  tipDisplay.innerText = `$${tipPP}`;
  totalDisplay.innerText = `$${totalPP}`;
};

const resetTipButtons = () => {
  for (let i = 0; i < tipButtons.length; i++) {
    const button = tipButtons[i];
    button.classList.remove('btn--active');
  }
};

const initTipButtons = () => {
  for (let i = 0; i < tipButtons.length; i++) {
    const button = tipButtons[i];
    if (button.dataset.tip == INIT_TIP_VAl) button.classList.add('btn--active');

    button.addEventListener('click', function () {
      resetTipButtons();
      const tip = this.dataset.tip;
      this.classList.add('btn--active');

      tipVal = parseFloat(tip);
    });
  }
};

const reset = () => {
  for (let i = 0; i < tipButtons.length; i++) {
    const button = tipButtons[i];
    button.classList.remove('btn--active');
    if (button.dataset.tip == INIT_TIP_VAl) button.classList.add('btn--active');
    tipVal = INIT_TIP_VAl;
  }

  billInput.value = '';
  peopleInput.value = '';
  tipDisplay.innerText = '$0.00';
  totalDisplay.innerText = '$0.00';
  resetBtn.disabled = true;
  resetBillError();
  resetPeopleError();
  resetTipError();
};

const init = () => {
  initTipButtons();
  billInput.addEventListener('input', () => {
    calcTip();
  });

  peopleInput.addEventListener('input', () => {
    calcTip();
  });

  tipInput.addEventListener('input', () => {
    resetTipButtons();
    tipVal = parseFloat(tipInput.value) / 100;
    if (isNaN(tipVal)) {
      setTipError();
      tipVal = 0;
      return;
    } else {
      resetTipError();
    }
    calcTip();
  });

  resetBtn.addEventListener('click', () => {
    reset();
  });
};

init();
