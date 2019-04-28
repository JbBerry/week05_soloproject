var express = require('express');
var router = express.Router();
var SqlRunner = require('../db/sql_runner');

/* GET all marks. */
router.get('/', function(req, res, next) {
  SqlRunner.run("SELECT * FROM marks")
  .then((result)=>{
    res.status(200).json(result.rows);
  })
});

// ADD a NEW mark
router.post('/', function(req, res){
  SqlRunner.run('INSERT INTO marks (score, student_id, assessment_id) VALUES ($1, $2, $3)', [req.body.score, req.body.student_id, req.body.assessment_id])
  .then((result) => {
    res.status(201).json(result);
  });
});

module.exports = router;
