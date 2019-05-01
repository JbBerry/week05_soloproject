var express = require('express');
var router = express.Router();
var SqlRunner = require('../db/sql_runner');

/* GET all students. */
router.get('/', function(req, res, next) {
  SqlRunner.run("SELECT * FROM students ORDER BY student_id ASC")
  .then((result)=>{
    res.status(200).json(result.rows);
  })
});

/* GET all students and their assessment marks. */
router.get('/all', function(req, res, next) {
  SqlRunner.run('SELECT * FROM students ORDER BY student_id ASC')
  .then((students)=>{
    SqlRunner.run('SELECT * FROM marks INNER JOIN assessments ON assessments.assessment_id = marks.assessment_id ORDER BY mark_id ASC')
    .then((marks)=>{
      const studentList = students.rows;
      const markList = marks.rows;
      studentList.forEach((student)=>{
        student.marks=[];
        markList.forEach((mark)=>{
          if(mark.student_id==student.student_id){
            delete mark.student_id;
            student.marks.push(mark)
          };
        });
      });
      res.status(200).json(studentList);
    });
  });
});

/* ADD a NEW student. */
router.post('/', function(req, res){
  SqlRunner.run('INSERT INTO students (name) VALUES ($1)', [req.body.name])
  .then((result) => {
    res.status(201).json(result);
  });
});

module.exports = router;
