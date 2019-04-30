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
    const formDescription = document.createElement('div');
    formDescription.classList.add('form-title');
    formDescription.textContent = `Assignment Marked`;

    const studentDescription = document.createElement('label');
    studentDescription.classList.add('form-text');
    studentDescription.textContent = `Student Name:`;

    const studentName = document.createElement('select');
    studentName.classList.add('form-field');
      let blankOption = document.createElement('option');
      blankOption.value = "";
      studentName.appendChild(blankOption)
    this.studentNames.forEach((student) =>{
      const option = document.createElement('option');
      option.textContent = student.name;
      option.value = student.student_id;
      studentName.appendChild(option);
    });
    studentName.id="name";

    const assessmentDescription = document.createElement('label');
    assessmentDescription.classList.add('form-text');
    assessmentDescription.textContent = `Assignment Title:`;

    const assessmentTitle = document.createElement('select');
    assessmentTitle.classList.add('form-field');
      let blankOption2 = document.createElement('option');
      blankOption2.value = "";
      assessmentTitle.appendChild(blankOption2)
    this.assessmentTitles.forEach((assessment) =>{
      const option = document.createElement('option');
      option.textContent = assessment.title;
      option.value = assessment.assessment_id;
      assessmentTitle.appendChild(option);
    });
    assessmentTitle.id="title";

    const markDescription = document.createElement('label');
    markDescription.classList.add('form-text');
    markDescription.textContent = `Assignment Mark:`;

    const assessmentMark = document.createElement('input');
    assessmentMark.classList.add('form-field');
    // assessmentMark.placeholder = ('Mark');
    assessmentMark.id="score";

    const addButton = document.createElement('button');
    addButton.classList.add('positive-button','form-confirm-button');
    addButton.textContent = `Mark Assignment`;

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

    const tile = document.createElement('form');
    tile.classList.add('form-tile');
    tile.addEventListener('submit', (event) => {
      const newMark = {};
      newMark.score = event.target['score'].value;
      newMark.student_id = event.target['name'].value;
      newMark.assessment_id = event.target['title'].value;
      PubSub.publish('Add-New-Mark', newMark);
      details.reset();
    });

    tile.appendChild(formDescription);
    form.appendChild(studentDescription);
    form.appendChild(studentName);
    form.appendChild(assessmentDescription);
    form.appendChild(assessmentTitle);
    form.appendChild(markDescription);
    form.appendChild(assessmentMark);
    form.appendChild(buttons);
    tile.appendChild(form);
    this.container.appendChild(tile)
  }
}

module.exports = MarkForm;
