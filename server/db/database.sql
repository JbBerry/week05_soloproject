DROP TABLE students;
DROP TABLE assessments;
DROP TABLE marks;

CREATE TABLE students(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE assessments(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);

CREATE TABLE marks(
  id SERIAL PRIMARY KEY,
  score INT,
  student_id INT REFERENCES students(id),
  assessment_id INT  REFERENCES assessments(id)
);


INSERT INTO students (name) VALUES('Geoff');
INSERT INTO students (name) VALUES('Simon');
INSERT INTO students (name) VALUES('Nina');
INSERT INTO assessments (title) VALUES('Homework');
INSERT INTO assessments (title) VALUES('Exam');
INSERT INTO marks (score, student_id, assessment_id) VALUES(40, 1, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(44, 1, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(50, 2, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(55, 2, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(60, 3, 1);
