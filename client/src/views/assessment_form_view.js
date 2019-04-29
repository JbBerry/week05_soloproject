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
    newAssessmentName.placeholder=('Assignment Name');
    newAssessmentName.id="title";

    const addButton = document.createElement('button');
    addButton.classList.add('ui', 'purple','button');
    addButton.textContent = `Add New Assignment`;

    const details = document.createElement('form');
    details.classList.add('content','ui','form');
    details.addEventListener('submit', (event) => {
      // event.preventDefault();
      const newAssessment = {};
      newAssessment.title = event.target['title'].value;
      PubSub.publish('Add-New-Assessment', newAssessment);
      details.reset();
    });

    const tile = document.createElement('div');
    tile.classList.add('ui','card');

    details.appendChild(newAssessmentName);
    details.appendChild(addButton);
    tile.appendChild(details);
    this.container.appendChild(tile)
    // return tile;
  }
}

module.exports = AssessmentForm;
