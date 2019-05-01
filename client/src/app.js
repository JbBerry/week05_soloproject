const AssessmentModel = require('./models/assessment_model.js');
const MarkModel = require('./models/mark_model.js');
const StudentModel = require('./models/student_model.js');

const AssessmentFormView = require('./views/assessment_form_view.js');
const EditMarkView = require('./views/edit_mark_view.js');
const MarkFormView = require('./views/mark_form_view.js');
const StudentFormView = require('./views/student_form_view.js');
const StudentPreviewView = require('./views/student_preview_view.js');
const StudentDetailsView = require('./views/student_details_view.js');



document.addEventListener('DOMContentLoaded', () => {

  const assessmentFormView = new AssessmentFormView();
  assessmentFormView.bindEvents();

  const markFormView = new MarkFormView();
  markFormView.getStudentNames();
  markFormView.getAssessmentTitles();
  markFormView.bindEvents();

  const editMarkView = new EditMarkView()
  editMarkView.bindEvents();

  const studentFormView = new StudentFormView();
  studentFormView.bindEvents();

  const studentPreviewView = new StudentPreviewView();
  studentPreviewView.bindEvents();
  studentPreviewView.updateDetails();

  const studentDetailsView = new StudentDetailsView();
  studentDetailsView.bindEvents();
  studentDetailsView.updateDetails();


  const assessmentModel = new AssessmentModel();
  assessmentModel.getData();
  assessmentModel.getTitles();
  assessmentModel.addAssessment();

  const markModel = new MarkModel();
  markModel.addMark();
  markModel.editMark();


  const studentModel = new StudentModel();
  studentModel.getData();
  studentModel.getNames();
  studentModel.addStudent();

});
