class Grades {

  getGrade(mark){
    if (mark > 80){
      return "A";}
    if (mark > 70){
      return "B";}
    if (mark > 60){
      return "C";}
    if (mark > 50){
      return "D";}
    if (mark > 40){
      return "E";}
    if (mark > 30){
      return "F";}
  };
}

module.exports = Grades;
