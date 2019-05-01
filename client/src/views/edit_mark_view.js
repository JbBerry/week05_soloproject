const PubSub = require('../helpers/pub_sub.js');

class EditMarkView {

  constructor() {
    this.container = document.querySelector('#form-container')
    this.mark = {};
  };

  bindEvents() {
    PubSub.subscribe('Edit-Assessment-Mark', (event) => {
      this.mark = event.detail;
      this.renderEditMarkForm();
    });
  }

  renderEditMarkForm(){
    const description = document.createElement('label');
    description.classList.add('title','medium-border','form-title');
    description.textContent = `Edit Mark:`;

    const assessmentRow = document.createElement('div');
    assessmentRow.classList.add('light-border');

    const assessmentTitle = document.createElement('label');
    assessmentTitle.classList.add('form-text');
    assessmentTitle.textContent = `${this.mark.title} %`;

    const assessmentMark = document.createElement('input');
    assessmentMark.classList.add('form-multi-field');
    assessmentMark.setAttribute('required','');
    assessmentMark.id="score";
    assessmentMark.value = this.mark.score;

    assessmentRow.appendChild(assessmentTitle);
    assessmentRow.appendChild(assessmentMark);

    const addButton = document.createElement('button');
    addButton.classList.add('positive','form-confirm-button');
    addButton.textContent = `Update`;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('negative','form-cancel-button');
    cancelButton.textContent = `Cancel`;
    cancelButton.addEventListener('click', (event) => {
      tile.innerHTML = '';
    });

    const buttons = document.createElement('div');
    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);

    const form = document.createElement('div');

    const tile = document.createElement('form');
    tile.classList.add('tile','form-tile');
    tile.addEventListener('submit', (event) => {
      event.preventDefault()
      this.mark.score = assessmentMark.value;
      PubSub.publish('Edit-Mark', this.mark);
      tile.innerHTML = '';
    });

    tile.appendChild(description);
    form.appendChild(assessmentRow);
    form.appendChild(buttons)
    tile.appendChild(form);
    this.container.appendChild(tile)
  }
}
module.exports = EditMarkView;
