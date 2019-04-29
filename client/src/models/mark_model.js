const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class Marks{

  addMark(mark){
    PubSub.subscribe('Add-New-Mark', (event) => {
      const newMark = event.detail;
      const url = `http://localhost:3000/marks`;
      const request = new RequestHelper(url);
      request.post(newMark)
      .catch(console.error);
    });
  };

}

module.exports = Marks;
