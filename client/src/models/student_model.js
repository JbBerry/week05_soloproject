const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class Students{

  constructor () {
    this.studentNames = [];
    this.studentData = [];
  };

  getData() {
    const url = `http://localhost:3000/students/all`;
    const request = new RequestHelper(url);
    request.get()
      .then((studentData) => {
        this.studentData = studentData;
        PubSub.publish('All-Student-Data-Ready', this.studentData);
      })
      .catch((message) => {
        console.error(message);
      });
  };

  getNames() {
    const url = `http://localhost:3000/students`;
    const request = new RequestHelper(url);
    request.get()
      .then((studentNames) => {
        this.studentNames = studentNames;
        PubSub.publish('All-Student-Names-Ready', this.studentNames);
      })
      .catch((message) => {
        console.error(message);
      });
  };

  addStudent(student){
    PubSub.subscribe('Add-New-Student', (event) => {
      const newStudent = event.detail;
      const url = `http://localhost:3000/students`;
      const request = new RequestHelper(url);
      request.post(newStudent)
      .catch(console.error);
    });
  };

}

module.exports = Students;
