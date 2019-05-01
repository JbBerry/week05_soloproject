const PubSub = require('../helpers/pub_sub.js');

class StudentDetailsView {

  constructor() {
    this.container = document.querySelector('#form-container')
    this.student = {};
  };

  bindEvents() {
    PubSub.subscribe('View-Student-Details', (event) => {
      this.student = event.detail;
      this.renderStudentDetails();
    });
  }

  updateDetails(){
    PubSub.subscribe('Updated-Mark-Details', (event) => {
      this.renderStudentDetails();
    })
  }

  renderStudentDetails(){
    this.container.innerHTML = '';
    const studentName = document.createElement('div');
    studentName.classList.add('student-details-name');
    studentName.textContent = `${this.student.name}`;

    const currentMark = document.createElement('div');
    currentMark.classList.add('student-details-mark')
    if (this.student.marks.length > 0){
      currentMark.innerHTML = `${this.student.average_mark} %`
    };

    const currentGrade = document.createElement('div');
    currentGrade.classList.add('student-details-grade')
    if (this.student.marks.length > 0){
      currentGrade.innerHTML = `${this.student.grade}`;
    };

    const text = document.createElement('div');
    text.classList.add('form-text','light-border');
    if (this.student.marks.length > 0){
      text.innerHTML = 'Recent Assignments';
    };

    const tileHead = document.createElement('div')
    tileHead.classList.add('title','medium-border','form-title','student-details-head');

    const tile = document.createElement('div');
    tile.classList.add('tile','form-tile');

    tileHead.appendChild(studentName);
    tileHead.appendChild(currentMark);
    tileHead.appendChild(currentGrade);

    tile.appendChild(tileHead);
    tile.appendChild(text);

    const assessmentList = this.student.marks;
    assessmentList.forEach((assessment,i)=>{
      const assessmentRow = document.createElement('div');
      assessmentRow.classList.add('form-text','light-border','student-details-body');

      const assessmentTitle = document.createElement('div');
      assessmentTitle.classList.add('student-assessment-name');
      assessmentTitle.textContent = assessmentList[i].title;

      const assessmentMark = document.createElement('div');
      assessmentMark.classList.add('student-assessment-mark');
      assessmentMark.textContent = `${assessmentList[i].score} %`;

      const editButton = document.createElement('button');
      editButton.classList.add('negative', 'student-assessment-button','form-edit-button');
      editButton.textContent = `Edit`;
      editButton.addEventListener('click', (event) => {
        const editMark = assessmentList[i];
        PubSub.publish('Edit-Assessment-Mark', editMark);
      });

      assessmentRow.appendChild(assessmentTitle);
      assessmentRow.appendChild(assessmentMark);
      assessmentRow.appendChild(editButton);
      tile.appendChild(assessmentRow);
    });

    const emptyRow = document.createElement('div');
    emptyRow.classList.add('bottom-row','light-border');
    tile.appendChild(emptyRow);

    this.container.appendChild(tile);
  }
}

module.exports = StudentDetailsView;
