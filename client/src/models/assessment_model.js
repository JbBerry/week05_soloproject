const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class Assessments{

  constructor () {
    this.assessmentTitles = [];
    this.assessmentData = [];
  };

  getData() {
    const url = `http://localhost:3000/assessments/all`;
    const request = new RequestHelper(url);
    request.get()
      .then((assessmentData) => {
        this.assessmentData = assessmentData;
        PubSub.publish('All-Assessment-Data-Ready', this.assessmentData);
      })
      .catch((message) => {
        console.error(message);
      });
  };

  getTitles() {
    const url = `http://localhost:3000/assessments`;
    const request = new RequestHelper(url);
    request.get()
      .then((assessmentTitles) => {
        this.assessmentTitles = assessmentTitles;
        PubSub.publish('All-Assessment-Titles-Ready', this.assessmentTitles);
      })
      .catch((message) => {
        console.error(message);
      });
  };

  addAssessment(assessment){
    PubSub.subscribe('Add-New-Assessment', (event) => {
      const newAssessment = event.detail;
      const url = `http://localhost:3000/assessments`;
      const request = new RequestHelper(url);
      request.post(newAssessment)
      .then(() => {this.getTitles()})
      .catch(console.error);
    });
  };

}

module.exports = Assessments;
