
export default function Game() {
  this.totalDays = 0;
  this.daysLeft = 100;
  this.imgArray =  ["url(../assets/images/travel3.png)", "url(../assets/images/travel2.png)", "url(../assets/images/travel1.png)",];
  this.imgArrayIndex = 0;

  this.addDay = function() {
    this.totalDays++;
  };
}


