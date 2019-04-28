SELECT * 
FROM students
INNER JOIN marks
      ON students.id=marks.student_id
INNER JOIN assessments
      ON assessments.id=marks.assessment_id
