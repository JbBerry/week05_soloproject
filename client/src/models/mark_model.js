const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const StudentModel = require('./student_model.js')

class Marks{

  addMark(mark){
    PubSub.subscribe('Add-New-Mark', (event) => {
      const newMark = event.detail;
      const url = `http://localhost:3000/marks`;
      const request = new RequestHelper(url);
      request.post(newMark)
      .then(() => {
        studentModel.getData();
      })
      .catch(console.error);
    });
  };

  editMark(mark){
    PubSub.subscribe('Edit-Mark', (event) =>{
      const editMark = event.detail
      const url = `http://localhost:3000/marks`;
      const request = new RequestHelper(url);
      request.put(editMark)
      .then(() => {
        studentModel.getData();
        PubSub.publish('Updated-Mark-Details', '');
      })
      .catch(console.error);
    });
  };
}

const studentModel = new StudentModel();

module.exports = Marks;
