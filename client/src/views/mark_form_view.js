const PubSub = require('../helpers/pub_sub.js');

class MarkForm {

  constructor() {
    this.element = document.querySelector('#add-mark')
    this.container = document.querySelector('#form-container')
    this.assessmentTitles = [];
    this.studentNames = [];
  };

  getStudentNames(){
    PubSub.subscribe('All-Student-Names-Ready', (event) => {
      this.studentNames = event.detail;
    });
  };

  getAssessmentTitles(){
    PubSub.subscribe('All-Assessment-Titles-Ready', (event) => {
      this.assessmentTitles = event.detail;
    });
  };

  bindEvents() {
    this.element.addEventListener('click', () => {
      this.container.innerHTML = '';
      this.newMarkTile()

    })
  }

  newMarkTile(){
    const studentName = document.createElement('select');
    studentName.classList.add('field');
    studentName.placeholder=('Student Name');
    this.studentNames.forEach((student) =>{
      const option = document.createElement('option');
      option.textContent = student.name;
      option.value = student.student_id;
      studentName.appendChild(option);
    });
    studentName.id="name";

    const assessmentTitle = document.createElement('select');
    assessmentTitle.classList.add('field');
    assessmentTitle.placeholder=('Assignment Title');
    this.assessmentTitles.forEach((assessment) =>{
      const option = document.createElement('option');
      option.textContent = assessment.title;
      option.value = assessment.assessment_id;
      assessmentTitle.appendChild(option);
    });
    assessmentTitle.id="title";

    const assessmentMark = document.createElement('input');
    assessmentMark.classList.add('field');
    assessmentMark.placeholder = ('Assignment Mark');
    assessmentMark.id="score";

    const addButton = document.createElement('button');
    addButton.classList.add('ui', 'purple','button');
    addButton.textContent = `Mark Assignment`;

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

      const newMark = {};
      newMark.score = event.target['score'].value;
      newMark.student_id = event.target['name'].value;
      newMark.assessment_id = event.target['title'].value;
      PubSub.publish('Add-New-Mark', newMark);
      details.reset();
    });

    const tile = document.createElement('div');
    tile.classList.add('ui','card');

    details.appendChild(studentName);
    details.appendChild(assessmentTitle);
    details.appendChild(assessmentMark);
    details.appendChild(buttons);
    tile.appendChild(details);
    this.container.appendChild(tile)
  }
}

module.exports = MarkForm;
