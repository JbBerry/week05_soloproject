const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class StudentPreviewView{

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
    studentName.classList.add('student-name','title','medium-border');
    studentName.textContent = `${student.name}`;

    const currentMark = document.createElement('div');
    currentMark.classList.add('student-mark','title','medium-border')
    if (student.marks.length > 0){
      currentMark.innerHTML = `${student.average_mark} %`
    };

    const currentGrade = document.createElement('div');
    currentGrade.classList.add('student-grade','title','medium-border')
    if (student.marks.length > 0){
      currentGrade.innerHTML = `${student.grade}`;
    };

    const text = document.createElement('div');
    text.classList.add('student-text','light-border');
    if (student.marks.length > 0){
      text.innerHTML = 'Last Assignment';
    };

    const assessment = document.createElement('div');
    assessment.classList.add('student-assessment','light-border');
    if (student.marks.length > 0){
      assessment.textContent = student.marks[student.marks.length -1].title;
    };

    const assessmentMark = document.createElement('div');
    assessmentMark.classList.add('student-assessment-grade','light-border');
    if (student.marks.length > 0){
      assessmentMark.textContent = `${student.marks[student.marks.length -1].score} %`;
    };

    const emptyRow = document.createElement('div');
    emptyRow.classList.add('student-empty','bottom-row','light-border');


    const tile = document.createElement('div');
    tile.classList.add('tile','student-tile');
    tile.addEventListener('click', (event) => {
      PubSub.publish('View-Student-Details', student);
    });

    tile.appendChild(studentName);
    tile.appendChild(currentMark);
    tile.appendChild(currentGrade);
    tile.appendChild(text);
    tile.appendChild(assessment);
    tile.appendChild(assessmentMark);
    tile.appendChild(emptyRow);

    return tile;
  };

}
module.exports =  StudentPreviewView;
