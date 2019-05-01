const PubSub = require('../helpers/pub_sub.js');

class StudentDetailsView {

  constructor() {
    this.container = document.querySelector('#form-container')
    this.student = {};
  };

  bindEvents() {
    PubSub.subscribe('View-Student-Details', (event) => {
      this.student = event.detail;
      this.container.innerHTML = '';
      console.log(`received ${this.student.name}`);
      this.renderStudentDetails();
    });
  }

  renderStudentDetails(){
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
    text.classList.add('form-text','description');
    if (this.student.marks.length > 0){
      text.innerHTML = 'Recent Assignments';
    };

    const tileHead = document.createElement('div')
    tileHead.classList.add('student-details-head');

    const tile = document.createElement('div');
    tile.classList.add('form-tile');

    tileHead.appendChild(studentName);
    tileHead.appendChild(currentMark);
    tileHead.appendChild(currentGrade);

    tile.appendChild(tileHead);
    tile.appendChild(text);

    const assessmentList = this.student.marks;
    assessmentList.forEach((assessment,i)=>{
      const assessmentRow = document.createElement('div');
      assessmentRow.classList.add('form-text','description','student-details-body');

      const assessmentTitle = document.createElement('div');
      assessmentTitle.classList.add('student-assessment-name');
      assessmentTitle.textContent = assessmentList[i].title;

      const assessmentMark = document.createElement('div');
      assessmentMark.classList.add('student-assessment-mark');
      assessmentMark.textContent = `${assessmentList[i].score} %`;

      assessmentRow.appendChild(assessmentTitle);
      assessmentRow.appendChild(assessmentMark);
      tile.appendChild(assessmentRow);
    });

    this.container.appendChild(tile);
  }
}

module.exports = StudentDetailsView;
