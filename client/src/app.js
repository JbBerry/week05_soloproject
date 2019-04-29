const AssessmentModel = require('./models/assessment_model.js');
const MarkModel = require('./models/mark_model.js');
const StudentModel = require('./models/student_model.js');

const AssessmentFormView = require('./views/assessment_form_view.js');
const MarkFormView = require('./views/mark_form_view.js');
const StudentFormView = require('./views/student_form_view.js');
const StudentView = require('./views/student_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const assessmentFormView = new AssessmentFormView();
  assessmentFormView.bindEvents();

  // const markFormView = new MarkFormView();
  // markFormView.bindEvents();

  const studentFormView = new StudentFormView();
  studentFormView.bindEvents();

  const studentView = new StudentView();
  studentView.bindEvents();

  const assessmentModel = new AssessmentModel();
  assessmentModel.getData();
  assessmentModel.getTitles();
  assessmentModel.addAssessment();

  // const markModel = new MarkModel();
  // markModel.bindEvents();

  const studentModel = new StudentModel();
  studentModel.getData();
  studentModel.getNames();
  studentModel.addStudent();

});
