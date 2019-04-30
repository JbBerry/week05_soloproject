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
    const description = document.createElement('label');
    description.classList.add('form-title');
    description.textContent = `New Assignment:`;

    const newAssessmentName = document.createElement('input');
    newAssessmentName.classList.add('form-field');
    newAssessmentName.placeholder=('   Title');
    newAssessmentName.id="title";

    const addButton = document.createElement('button');
    addButton.classList.add('positive-button','form-confirm-button');
    addButton.textContent = `Add New Assignment`;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('negative-button','form-cancel-button');
    cancelButton.textContent = `cancel`;
    cancelButton.addEventListener('click', (event) => {
      this.container.innerHTML = '';
    });

    const buttons = document.createElement('div');
    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);

    const form = document.createElement('form');

    const tile = document.createElement('div');
    tile.classList.add('form-tile');
    tile.addEventListener('submit', (event) => {
      const newAssessment = {};
      newAssessment.title = event.target['title'].value;
      PubSub.publish('Add-New-Assessment', newAssessment);
      details.reset();
    });

    tile.appendChild(description);
    form.appendChild(newAssessmentName);
    form.appendChild(buttons)
    tile.appendChild(form);
    this.container.appendChild(tile)
  }
}

module.exports = AssessmentForm;
