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
    const newAssessmentName = document.createElement('input');
    newAssessmentName.classList.add('field');
    newAssessmentName.placeholder=('Assignment Title');
    newAssessmentName.id="title";

    const addButton = document.createElement('button');
    addButton.classList.add('ui', 'purple','button');
    addButton.textContent = `Add New Assignment`;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('ui','button');
    cancelButton.textContent = `cancel`;
    cancelButton.addEventListener('click', (event) => {
      this.container.innerHTML = '';
    });

    const buttons = document.createElement('div');
    buttons.classList.add('ui', 'buttons');
    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);

    const details = document.createElement('form');
    details.classList.add('content','ui','form');
    details.addEventListener('submit', (event) => {
      const newAssessment = {};
      newAssessment.title = event.target['title'].value;
      PubSub.publish('Add-New-Assessment', newAssessment);
      details.reset();
    });

    const tile = document.createElement('div');
    tile.classList.add('ui','card');

    details.appendChild(newAssessmentName);
    details.appendChild(buttons)
    tile.appendChild(details);
    this.container.appendChild(tile)
  }
}

module.exports = AssessmentForm;
