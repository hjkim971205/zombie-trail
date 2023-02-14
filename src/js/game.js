export default function Game() {
  this.totalDays = 0;
  this.daysLeft = 100;
  this.imgArray =  ["url(img/travel3.png)", "url(img/travel2.png)", "url(img/travel1.png)"];
  this.imgArrayIndex = 0;

  this.addDay = function() {
    this.totalDays++;
  };
}


/*
 * make a js file for events.js
 *  within events.js it will include pop up fights and random people encounters
 *  fights will make the character lose heath. Running will cause +3 day counter
 *  random people encounter will give the option to add a member to the team. 
 *      More NPC = better fighting multiplier. Faster food drain.
 * 
 * make a js file for inventory.js
 *  within inventory.js it will include bullets(fight multiplier), food(stamina gain multiplier), 
 *  and med-kits(health gain multiplier)
 */