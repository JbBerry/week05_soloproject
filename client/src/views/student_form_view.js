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
    const newStudentName = document.createElement('input');
    newStudentName.classList.add('field');
    newStudentName.placeholder=('Student Name');
    newStudentName.id="name";

    const addButton = document.createElement('button');
    addButton.classList.add('ui', 'purple','button');
    addButton.textContent = `Add New Student`;

    const cancelButton = document.createElement('button');
    addButton.classList.add('ui','button');
    addButton.textContent = `Cancel`;

    const details = document.createElement('form');
    details.classList.add('content','ui','form');
    details.addEventListener('submit', (event) => {
      const newStudent = {};
      newStudent.name = event.target['name'].value;
      PubSub.publish('Add-New-Student', newStudent);
      details.reset();
    });

    const tile = document.createElement('div');
    tile.classList.add('ui','card');

    details.appendChild(newStudentName);
    details.appendChild(addButton);
    tile.appendChild(details);
    this.container.appendChild(tile)
  }
}

module.exports = StudentForm;
