const PubSub = require('../helpers/pub_sub.js');

class AssessmentForm {

  constructor() {
    this.element = document.querySelector('#add-assessment')
    this.container = document.querySelector('#form-container')
  }

  bindEvents() {
    this.element.addEventListener('click', () => {
      this.container.innerHTML = '';
      this.newAssessmentTile()

    })
  }
  newAssessmentTile(){
    const formTitle = document.createElement('label');
    formTitle.classList.add('title','medium-border','form-title');
    formTitle.textContent = `New Assignment:`;

    const newAssessmentName = document.createElement('input');
    newAssessmentName.classList.add('light-border','form-field');
    newAssessmentName.placeholder=('   Title');
    newAssessmentName.id="title";
    newAssessmentName.setAttribute('required','');

    const addButton = document.createElement('button');
    addButton.classList.add('positive','form-confirm-button');
    addButton.textContent = `Add New Assignment`;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('negative','form-cancel-button');
    cancelButton.textContent = `Cancel`;
    cancelButton.addEventListener('click', (event) => {
      this.container.innerHTML = '';
    });

    const buttons = document.createElement('div');
    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);

    const form = document.createElement('form');

    const tile = document.createElement('div');
    tile.classList.add('tile','form-tile');
    tile.addEventListener('submit', (event) => {
      event.preventDefault();
      const newAssessment = {};
      newAssessment.title = event.target['title'].value;
      PubSub.publish('Add-New-Assessment', newAssessment);
      form.reset();
    });

    tile.appendChild(formTitle);
    form.appendChild(newAssessmentName);
    form.appendChild(buttons)
    tile.appendChild(form);
    this.container.appendChild(tile)
  }
}

module.exports = AssessmentForm;
