const billInput = document.querySelector('#billInput');
const peopleInput = document.querySelector('#peopleInput');
const tipInput = document.querySelector('#tipInput');

const tipButtons = document.querySelectorAll('.tip__btns > .btn');

const tipDisplay = document.querySelector('#tipDisplay');
const totalDisplay = document.querySelector('#totalDisplay');

const resetBtn = document.querySelector('#resetBtn');

let INIT_TIP_VAl = 0.1;
let tipVal = INIT_TIP_VAl;

const calcTip = () => {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  if (people == 0) throw new Error("Value can't be zero.");

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
      console.log(this);
      resetTipButtons();
      const tip = this.dataset.tip;
      this.classList.add('btn--active');

      tipVal = parseFloat(tip);
    });
  }
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
    console.log(tipVal);
    calcTip();
  });

  resetBtn.addEventListener('click', () => {
    calcTip();
  });
};

init();
