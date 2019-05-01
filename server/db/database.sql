DROP TABLE marks;
DROP TABLE students;
DROP TABLE assessments;

CREATE TABLE students(
  student_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE assessments(
  assessment_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE marks(
  mark_id SERIAL PRIMARY KEY,
  score INT NOT NULL,
  student_id INT REFERENCES students(student_id),
  assessment_id INT REFERENCES assessments(assessment_id)
);


INSERT INTO students (name) VALUES('Arvin Kelly');
INSERT INTO students (name) VALUES('Connar Mccallum');
INSERT INTO students (name) VALUES('Calvin Prince');
INSERT INTO students (name) VALUES('Emilio Bartlett');
INSERT INTO students (name) VALUES('Siena Burnett');
INSERT INTO students (name) VALUES('Seth Esquivel');
INSERT INTO students (name) VALUES('Kristopher Ray');
INSERT INTO students (name) VALUES('Rheanna Burrows');
INSERT INTO students (name) VALUES('Anabelle Fraser');
INSERT INTO students (name) VALUES('Miles Parsons');

INSERT INTO assessments (title) VALUES('Javascript Essentials');
INSERT INTO assessments (title) VALUES('DOM Basics');
INSERT INTO assessments (title) VALUES('Logic Statements');
INSERT INTO assessments (title) VALUES('Loops and Functions');
INSERT INTO assessments (title) VALUES('ECMAScript 6');
INSERT INTO assessments (title) VALUES('Javascript Next Steps');

INSERT INTO marks (score, student_id, assessment_id) VALUES(85, 1, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(90, 2, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(85, 3, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(80, 4, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(75, 5, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(60, 6, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(70, 7, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(80, 8, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(75, 9, 1);
INSERT INTO marks (score, student_id, assessment_id) VALUES(65, 10, 1);

INSERT INTO marks (score, student_id, assessment_id) VALUES(70, 1, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(80, 2, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(60, 3, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(50, 4, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(70, 5, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(65, 6, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(90, 7, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(85, 8, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(65, 9, 2);
INSERT INTO marks (score, student_id, assessment_id) VALUES(55, 10, 2);

INSERT INTO marks (score, student_id, assessment_id) VALUES(40, 1, 3);
INSERT INTO marks (score, student_id, assessment_id) VALUES(80, 3, 3);
INSERT INTO marks (score, student_id, assessment_id) VALUES(75, 6, 3);
INSERT INTO marks (score, student_id, assessment_id) VALUES(85, 7, 3);
INSERT INTO marks (score, student_id, assessment_id) VALUES(90, 8, 3);
INSERT INTO marks (score, student_id, assessment_id) VALUES(60, 10, 3);

INSERT INTO marks (score, student_id, assessment_id) VALUES(60, 1, 4);
INSERT INTO marks (score, student_id, assessment_id) VALUES(85, 3, 4);
