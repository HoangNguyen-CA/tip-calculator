const billInput = document.querySelector('#billInput');
const peopleInput = document.querySelector('#peopleInput');
const tipInput = document.querySelector('#tipInput');

const billError = document.querySelector('#billError');
const peopleError = document.querySelector('#peopleError');

const tipButtons = document.querySelectorAll('.tip__btns > .btn');

const tipDisplay = document.querySelector('#tipDisplay');
const totalDisplay = document.querySelector('#totalDisplay');

const resetBtn = document.querySelector('#resetBtn');

let INIT_TIP_VAl = 0.1;
let tipVal = INIT_TIP_VAl;

class InputField {
  constructor(node, calcTip) {
    this.node = node;
    this.calcTip = calcTip;
  }

  setError() {
    this.node.classList.add('tip__input--invalid');
  }

  resetError() {
    this.node.classList.remove('tip__input--invalid');
  }

  getVal() {
    const val = parseFloat(this.node.value);
    return val;
  }

  reset() {
    this.resetError();
    this.node.value = '';
  }

  init() {
    this.node.addEventListener('input', () => {
      this.calcTip();
    });
  }
}

class InputFieldWithError extends InputField {
  constructor(inputNode, calcTip, errorNode) {
    super(inputNode, calcTip);
    this.errorNode = errorNode;
  }

  setError(message) {
    super.setError();
    this.errorNode.innerText = message;
  }

  resetError() {
    super.resetError();
    this.errorNode.innerText = '';
  }

  getVal() {
    const val = parseFloat(this.node.value);
    if (isNaN(val)) {
      this.setError('Invalid value');
    } else {
      this.resetError();
    }
    return val;
  }
}

class buttonList {
  constructor(node, calcTip) {
    this.node = node;
    this.calcTip = calcTip;
  }
  resetButtons() {
    for (let i = 0; i < tipButtons.length; i++) {
      const button = tipButtons[i];
      button.classList.remove('btn--active');
    }
  }

  init() {
    for (let i = 0; i < this.node.length; i++) {
      const button = this.node[i];
      const resetButtons = this.resetButtons;
      const calcTip = this.calcTip;
      if (button.dataset.tip == INIT_TIP_VAl)
        button.classList.add('btn--active');

      button.addEventListener('click', function () {
        resetButtons();
        const tip = this.dataset.tip;
        this.classList.add('btn--active');
        tipVal = parseFloat(tip);

        calcTip();
      });
    }
  }

  reInitButtons() {
    for (let i = 0; i < tipButtons.length; i++) {
      const button = tipButtons[i];
      button.classList.remove('btn--active');
      if (button.dataset.tip == INIT_TIP_VAl)
        button.classList.add('btn--active');
    }
  }
}

const billNode = new InputFieldWithError(billInput, calcTip, billError);
const peopleNode = new InputFieldWithError(peopleInput, calcTip, peopleError);
const tipNode = new InputField(tipInput, calcTip);
const btnList = new buttonList(tipButtons, calcTip);

function calcTip() {
  resetBtn.disabled = false;
  const bill = billNode.getVal();
  const people = peopleNode.getVal();

  if (Number.isNaN(bill) || Number.isNaN(people)) return;
  if (people == 0) {
    peopleNode.setError("Can't be zero");
    return;
  }

  const tip = bill * tipVal;
  const total = bill + tip;

  const tipPP = (tip / people).toFixed(2);
  const totalPP = (total / people).toFixed(2);

  tipDisplay.innerText = `$${tipPP}`;
  totalDisplay.innerText = `$${totalPP}`;
}

const reset = () => {
  btnList.reInitButtons();
  tipVal = INIT_TIP_VAl;

  billNode.reset();
  peopleNode.reset();
  tipNode.reset();

  tipDisplay.innerText = '$0.00';
  totalDisplay.innerText = '$0.00';
  resetBtn.disabled = true;
};

const init = () => {
  billNode.init();
  peopleNode.init();
  btnList.init();

  tipNode.node.addEventListener('input', () => {
    btnList.resetButtons();
    tipVal = tipNode.getVal() / 100;
    if (isNaN(tipVal)) tipVal = 0;

    calcTip();
  });

  resetBtn.addEventListener('click', () => {
    reset();
  });
};

init();
