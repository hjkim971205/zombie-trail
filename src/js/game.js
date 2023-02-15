export default function Game() {
  this.totalDays = 0;
  this.daysLeft = 25;
  this.imgArray =  ["url(src/assets/images/car1.png)", "url(src/assets/images/car2.png)", "url(src/assets/images/car3.png)"];
  this.imgArrayIndex = 0;

  this.addDay = function() {
    this.totalDays++;
  };
}


