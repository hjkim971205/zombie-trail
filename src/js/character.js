import rollNumber from "./rollNumber.js";

export default function Character(name) {//Creates new Character objects with pre-determined stats
  this.name = name;
  this.health = 25; // when helath becomes 0 the character will die.
  this.stamina = 50; //"zombie meter" and able to use stamina to use special moves during fights.
  this.turned = false; //if health becomes 0 turns into zombie. To regain stamina must rest. 
}

Character.prototype.healthGain = function() { //health gain after healing
  let amount = rollNumber(15,25);
  this.health += amount;
  if (this.health > 100) { // Makes sure that health does not go over 100
    this.health = 100;
  }
};

Character.prototype.staminaGain = function() { // stamina gained after resting
  const amount = rollNumber(5,20);
  this.stamina += amount;
  if (this.stamina > 100) { // Makes sure that stamina does not go over 100
    this.stamina = 100;
  }
};

Character.prototype.staminaLost = function() { //stamina lost while travelling
  let amount = rollNumber(2,10);
  this.stamina -= amount;
  if (this.stamina < 0) { //Makes sure that stamina does not go into to the negetives.
    this.stamina = 0;
  }
  if (this.stamina <= 0) { //start losing heath after travelling if stamina becomes 0
    this.health -= amount;
  } 
  if (this.health <= 0) {
    this.health = 0;
  }
};

Character.prototype.deathCheck = function(character) {
  if(character.health<=0) {
    return true;
  }
};