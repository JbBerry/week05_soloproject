const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class StudentView{

  constructor (container) {
      this.container = document.querySelector('#student-container')
    }

  bindEvents() {
    PubSub.subscribe('All-Student-Data-Ready', (event) => {
      console.log(`All-Student-Data received`);
      const studentData = event.detail;
      console.log(studentData);
      this.render(studentData);

    });
  }

  render(studentData) {
    this.container.innerHTML = '';
    studentData.forEach((student) => {
    const tile = this.createTile(student);
    this.container.appendChild(tile);
    });
  };

  createTile(student) {
    const studentName = document.createElement('div');
    studentName.classList.add('header');
    studentName.textContent = `${student.name}`;

    const currentGrade = document.createElement('div');
    if (student.marks.length > 0){

      let totalMark = 0;
      student.marks.forEach((mark,i) =>{
        totalMark += student.marks[i].score
      });
      const averageMark = totalMark / student.marks.length;
      currentGrade.innerHTML = `Current grade ${averageMark}`
    };

    const marks = document.createElement('div');
    if (student.marks.length > 0){
      student.marks.forEach((mark,i) => {
        const grade = document.createElement('div');
        grade.innerHTML = `${student.marks[i].title}: ${student.marks[i].score}`;
        marks.appendChild(grade);
      });
    };

    const details = document.createElement('div');
    details.classList.add("content");

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('ui', 'purple','button');
    detailsButton.textContent = `Details`;
    detailsButton.addEventListener('click', (event) => {
      console.log(`view details for ${student.name}`);
      // set view report card to visable
    });
    const buttons = document.createElement('div');
    buttons.classList.add('ui', 'buttons');
    buttons.appendChild(detailsButton);


    const tile = document.createElement('div');
    tile.classList.add('ui', 'card');

    details.appendChild(studentName);
    details.appendChild(currentGrade);
    details.appendChild(marks);
    tile.appendChild(details);
    tile.appendChild(buttons);

    return tile;
  };
}
module.exports =  StudentView;
