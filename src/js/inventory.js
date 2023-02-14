export default function Inventory() {
  this.bullet = 10;
  this.food = 10;
  this.medkit = 5;
}

let rollNumber = new rollNumber();

Inventory.prototype.gather = function () {
  let amountB = rollNumber(1, 5);
  let amountF = rollNumber(1, 5);
  let amountM = rollNumber(0, 2);
  this.bullet += amountB; //used for fights (fight action)
  this.food += amountF; //used for stamina gain (rest action)
  this.medkit += amountM; //used for health gain (heal action)
  if (this.bullet >= 25) {
    // Makes sure that inventory cannot be over loaded
    this.bullet = 25;
  } else if (this.food >= 25) {
    this.food = 25;
  } else if (this.medkit >= 15) {
    this.medkit = 15;
  }
};

Inventory.prototype.fightMob = function () {
  if (this.bullet > 0) {
    this.bullet -= rollNumber(1, 3);
  }
};

Inventory.prototype.heal = function () {
  this.medkit -= Math.round(members.length() * 0.5);
};

Inventory.prototype.rest = function () {
  this.food -= members.length() * 0.5 * rollNumber(1, 3);
};
