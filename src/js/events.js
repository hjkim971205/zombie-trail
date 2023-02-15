import rollNumber from "./rollNumber.js";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Function that rolls events
export default function fates(roll, party, inventory) {
  const charIndex = rollNumber(0, party.members.length-1); // grabs a person to potentially inflict status/damage
  console.log(inventory);
  if (roll <= 10) {
    let staminaVar = rollNumber(5, 20);
    $("#randomEventMessage").text(party.members[charIndex].name +` was up all night and now has lost ${staminaVar} stamina`
    );
    party.members[charIndex].stamina -= staminaVar;
  } else if (roll <= 15) {
    const bulletVar = rollNumber(1, 2);
    const foodVar = rollNumber(1, 2);
    const medkitVar = rollNumber(0, 1);
    $("#randomEventMessage").text(`Your party gets robbed in the middle of the night... looks like they stole ${bulletVar} bullets, ${foodVar} foods, and ${medkitVar} medkits. Darn.`);
    inventory.bullet -= bulletVar;
    inventory.food -= foodVar;
    inventory.medkit -= medkitVar;
  } else if (roll <= 20) {
    const foodVar = rollNumber(1, 5);
    $("#randomEventMessage").text(`Your party has stumbled upon a field of vegtables gain ${foodVar}.`);
    inventory.food += foodVar;
  } else if (roll <= 23) {
    const bulletVar = rollNumber(2, 3);
    $("#randomEventMessage").text(`Your party has found a crazy gun owners house... or whats left of it. Found ${bulletVar} bullets.`);
    inventory.bullet += bulletVar;
  } else if (roll <= 30) {
    const healthVar = rollNumber(10, 20);
    const staminaVar = rollNumber(10, 20);
    $("#randomEventMessage").text(party.members[charIndex].name +`ate rotten food and couldnt sleep at night lost ${healthVar} health and ${staminaVar} stamina`);
    party.members[charIndex].health -= healthVar;
    party.members[charIndex].stamina -= staminaVar;
    //needs to update health and stamina
  } else if (roll <= 35) {
    const healthVar = rollNumber(25, 40);
    $("#randomEventMessage").text(`The party gets caught in a firefight with other survivors, ${party.party[charIndex].name} gets nicked by a bullet and loses ${healthVar}.`);
    party.members[charIndex].health -= healthVar;
  } else {
    $("#randomEventMessage").text("Your party traveled another day");
    const rollNormalEvent = rollNumber(1, 6);
    console.log(rollNormalEvent);
    if ((rollNormalEvent === 1)) {
      $("#randomEventMessage").text(
        "Your party successfully traveled a day and are one step closer to the safe haven"
      );
    } else if ((rollNormalEvent === 2)) {
      $("#randomEventMessage").text("It was a long grueling day of travel but you have made it one step closer to safety"
      );
    } else if ((rollNormalEvent === 3)) {
      $("#randomEventMessage").text(
        `Even though ${party.members[charIndex].name} annoyed the whole group you have made it another day safely`
      );
    } else if ((rollNormalEvent === 4)) {
      $("#randomEventMessage").text("Gunshots fill the air, good thing the party is no where near them. You feel salvation is one day closer."
      );
    } else if ((rollNormalEvent === 5)) {
      $("#randomEventMessage").text("Despite the ominious enviroment, travel goes without a hitch. You move one day closer to the safe haven."
      );
    } else if ((rollNormalEvent === 6)) {
      $("#randomEventMessage").text(
        "It was a quiet night... but you successfully move one day closer to a new life."
      );
    } else {
      return rollNormalEvent;
    }
  }
}

