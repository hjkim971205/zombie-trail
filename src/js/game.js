export default function Game(daysLeft) {
  this.totalDays = 0;
  this.daysLeft = daysLeft;
  this.imgArray =  ["url(img/travel3.png)", "url(img/travel2.png)", "url(img/travel1.png)"];
  this.imgArrayIndex = 0
}

export default function Party(member1, member2, member3, member4) {
  this.members = [member1, member2, member3, member4]
  // this.food = 20 We have an invetory already made, ignore this
  // this.medkit = 5
}

export default function rollNumber(min, max) { // Maximum amount one can roll and lowest they can roll.
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * max + min);
};

export default function Character(name) {//Creates new Character objects with pre-determined stats
  this.name = name;
  this.health = 100; // when helath becomes 0 the character will die.
  this.stamina = 100; //"zombie meter" and able to use stamina to use special moves during fights.
  this.turned = false; //if health becomes 0 turns into zombie. To regain stamina must rest. 
}

Character.prototype.healthGain = function () { //health gain after healing
  let amount = rollNumber(1,5);
  this.health += amount;
  if (this.health > 100) { // Makes sure that health does not go over 100
    this.health = 100;
  }
}

Character.prototype.staminaGain = function () { // stamina gained after resting
  let amount = rollNumber(5,20);
  this.stamina += amount;
  if (this.stamina > 100) { // Makes sure that stamina does not go over 100
    this.stamina = 100;
  }
}

Character.prototype.staminaLost = function() { //stamina lost while travelling
  let amount = rollNumber(2,10);
  this.stamina -= amount;
  if (this.stamina < 0) { //Makes sure that stamina does not go into to the negetives.
    this.stamina = 0;
  }
  if (this.stamina <= 0) { //start losing heath after travelling if stamina becomes 0
    this.health -= amount;
  }
}

Character.prototype.deathCheck = function(character) {
  if(this.health<=0) {
    return true;
  }
}

export default function Zombie(name, difficultyMultiplier) { //Creating a new zombie with the attributes of health and damage.
  this.name = name;
  let baseHealth = 5 * difficultyMultiplier;
  this.health = rollNumber(baseHealth+5, baseHealth);
  this.baseDamage = Math.Floor(5 * difficultyMultiplier);
}

Zombie.prototype.attack = function(character) {
  let damageRolled = rollNumber(this.baseDamage, 1);
  character.health +=  -1(damageRolled);
  if (character.health < 0) {
    character.health = 0;
  }
}

export default function Inventory() {
  this.bullet = 10;
  this.food = 10;
  this.medkit = 5;
}

Inventory.prototype.gather = function() {
  let amountB = rollNumber(1,5);
  let amountF = rollNumber(1,5);
  let amountM = rollNumber(0,2);
  this.bullet += amountB; //used for fights (fight action)
  this.food += amountF; //used for stamina gain (rest action)
  this.medkit += amountM; //used for health gain (heal action)
  if (this.bullet >= 25) { // Makes sure that inventory cannot be over loaded
    this.bullet = 25;
  } else if (this.food >= 25) {
    this.food = 25;
  } else if (this.medkit >= 15) {
    this.medkit = 15;
  }
}

Inventory.prototype.fightMob = function() {
  if (this.bullet > 0) {
    this.bullet -= rollNumber(1,3);
  }
}

Inventory.prototype.heal = function() {
    this.medkit -= math.round(members.length()*0.5);
}

Inventory.prototype.rest = function() {
    this.food -= members.length()*0.5*rollNumber(1,3);
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