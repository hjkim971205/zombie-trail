import rollNumber from "./rollNumber.js";

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
};