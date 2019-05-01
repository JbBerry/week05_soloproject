const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class StudentView{

  constructor (container) {
      this.container = document.querySelector('#student-container')
      this.studentData = [];
    }

  bindEvents() {
    PubSub.subscribe('All-Student-Data-Ready', (event) => {
      this.container.innerHTML = '';
      this.studentData = event.detail;
      this.renderStudentData();
    });
  }

  updateDetails(){
    PubSub.subscribe('Updated-Mark-Details', (event) => {
      this.container.innerHTML = '';
      this.renderStudentData();
    })
  }

  renderStudentData() {
    this.studentData.forEach((student) => {
    const tile = this.createTile(student);
    this.container.appendChild(tile);
    });
  };

  createTile(student) {
    const studentName = document.createElement('div');
    studentName.classList.add('student-name');
    studentName.textContent = `${student.name}`;

    const currentMark = document.createElement('div');
    currentMark.classList.add('student-mark')
    if (student.marks.length > 0){
      currentMark.innerHTML = `${student.average_mark} %`
    };

    const currentGrade = document.createElement('div');
    currentGrade.classList.add('student-grade')
    if (student.marks.length > 0){
      currentGrade.innerHTML = `${student.grade}`;
    };

    const text = document.createElement('div');
    text.classList.add('student-text','description');
    if (student.marks.length > 0){
      text.innerHTML = 'Last Assignment';
    };

    const assessment = document.createElement('div');
    assessment.classList.add('student-assessment','description');
    if (student.marks.length > 0){
      assessment.textContent = student.marks[student.marks.length -1].title;
    };

    const assessmentMark = document.createElement('div');
    assessmentMark.classList.add('student-assessment-grade','description');
    if (student.marks.length > 0){
      assessmentMark.textContent = `${student.marks[student.marks.length -1].score} %`;
    };

    const tile = document.createElement('div');
    tile.classList.add('student-tile');
    tile.addEventListener('click', (event) => {
      PubSub.publish('View-Student-Details', student);
    });

    tile.appendChild(studentName);
    tile.appendChild(currentMark);
    tile.appendChild(currentGrade);
    tile.appendChild(text);
    tile.appendChild(assessment);
    tile.appendChild(assessmentMark);

    return tile;
  };

}
module.exports =  StudentView;
