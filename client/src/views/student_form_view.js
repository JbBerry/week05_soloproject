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
    const description = document.createElement('div');
    description.classList.add('form-title');
    description.textContent = `New Student:`;

    const newStudentName = document.createElement('input');
    newStudentName.classList.add('form-field');
    newStudentName.placeholder=('   Name');
    newStudentName.id="name";

    const addButton = document.createElement('button');
    addButton.classList.add('positive-button','form-confirm-button');
    addButton.textContent = `Add New Student`;

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('negative-button','form-cancel-button');
    cancelButton.textContent = `Cancel`;
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
      const newStudent = {};
      newStudent.name = event.target['name'].value;
      console.log(`publishing ${newStudent.name}`);
      PubSub.publish('Add-New-Student', newStudent);
      details.reset();
    });


    tile.appendChild(description);
    form.appendChild(newStudentName);
    form.appendChild(buttons)
    tile.appendChild(form);
    this.container.appendChild(tile)
  }
}

module.exports = StudentForm;
