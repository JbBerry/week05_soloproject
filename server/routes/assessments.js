var express = require('express');
var router = express.Router();
var SqlRunner = require('../db/sql_runner');

/* GET all assignments. */
router.get('/', function(req, res, next) {
  SqlRunner.run("SELECT * FROM assessments")
  .then((result)=>{
    res.status(200).json(result.rows);
  })
});

/* GET all assessments and student marks. */
router.get('/all', function(req, res, next) {
  SqlRunner.run(`SELECT * FROM assessments`)
  .then((assessments)=>{
    SqlRunner.run(`SELECT * FROM marks INNER JOIN students ON students.student_id = marks.student_id`)
    .then((marks)=>{
      const assessmentList = assessments.rows;
      const markList = marks.rows;
      assessmentList.forEach((assessment)=>{
        assessment.marks=[];
        markList.forEach((mark)=>{
          if(mark.assessment_id==assessment.assessment_id){
            delete mark.assessment_id;
            assessment.marks.push(mark)
          };
        });
      });
      res.status(200).json(assessmentList);
    });
  });
});

// ADD a NEW assignment
router.post('/', function(req, res){
  SqlRunner.run('INSERT INTO assessments (title) VALUES ($1)', [req.body.title])
  .then((result) => {
    res.status(201).json(result);
  });
});

module.exports = router;
