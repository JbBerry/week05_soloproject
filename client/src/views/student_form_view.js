const PubSub = require('../helpers/pub_sub.js');

class StudentForm {

  constructor() {
    this.element = document.querySelector('#add-student')
    this.container = document.querySelector('#form-container')
  }

  bindEvents() {
    this.element.addEventListener('click', () => {
      this.container.innerHTML = '';
      this.newStudentTile()

    })
  }
  newStudentTile(){
    const formTitle = document.createElement('div');
    formTitle.classList.add('title','medium-border','form-title');
    formTitle.textContent = `New Student:`;

    const newStudentName = document.createElement('input');
    newStudentName.classList.add('light-border','form-field');
    newStudentName.placeholder=('   Name');
    newStudentName.id="name";
    newStudentName.setAttribute('required','');

    const addButton = document.createElement('button');
    addButton.classList.add('positive','form-confirm-button');
    addButton.textContent = `Add New Student`;

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
      const newStudent = {};
      newStudent.name = event.target['name'].value;
      PubSub.publish('Add-New-Student', newStudent);
      form.reset();
    });


    tile.appendChild(formTitle);
    form.appendChild(newStudentName);
    form.appendChild(buttons)
    tile.appendChild(form);
    this.container.appendChild(tile)
  }
}

module.exports = StudentForm;
