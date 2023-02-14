import rollNumber from "./js/game.js";

export default function fates(roll, party, inventory) {
  // Function that rolls events
  const charIndex = rollNumber(0, party.party.length); // grabs a person to potentially inflict status/damage
  $("#event").html(
    "Though the journey may be rough, you have continued on your trail."
  );

  if (roll <= 10) {
    if (party.members[charIndex].stamina > 0) {
      let staminaVar = rollNumber(5, 20);
      $("randomEventMessage").text(
        party.members[charIndex].name +
          ` was up all night and now has lost ${staminaVar} stamina`
      );
      party.members[charIndex].stamina -= staminaVar;
      let bulletVar = rollNumber(1, 2);
      let foodVar = rollNumber(1, 2);
      let medkitVar = rollNumber(0, 1);
      $("randomEventMessage").text(
        `Your party gets robbed in the middle of the night... looks like they stole ${bulletVar} bullets, ${foodVar} foods, and ${medkit} medkits. Darn.`
      );
      inventory.bullet -= bulletVar;
      inventory.food -= foodVar;
      inventory.medkit -= medkitVar;
    } else if (roll <= 20) {
      let foodVar = rollNumber(1, 5);
      $("randomEventMessage").text(
        `Your party has stumbled upon a field of vegtables gain ${foodVar}.`
      );
      inventory.food += foodVar;
    } else if (roll <= 23) {
      let bulletVar = rollNumber(2, 3);
      $("randomEventMessage").text(
        `Your party has found a crazy gun owners house... or whats left of it. Found ${bulletVar} bullets.`
      );
      inventory.bullet += foodVar;
    } else if (roll <= 30) {
      let healthVar = rollNumber(10, 20);
      let staminaVar = rollNumber(10, 20);
      $("randomEventMessage").text(
        party.party[charIndex].name +
          `ate rotten food and couldnt sleep at night lost ${health} health and ${stamina} stamina`
      );
      party.members[charIndex].health -= healthVar;
      party.members[charIndex].stamina -= staminaVar;
      //needs to update health and stamina
    } else if (roll <= 35) {
      let healthVar = rollNumber(25, 40);
      $("randomEventMessage").text(
        `The party gets caught in a firefight with other survivors, ${party.party[charIndexIndex].name} gets nicked by a bullet and loses ${healthVar}.`
      );
      party.members[charIndex].health -= healthVar;
    } else {
      let rollNormalEvent = rollNumber(1, 6);
      if ((rollNormalEvent = 1)) {
        $("event").text(
          "Your party successfully traveled a day and are one step closer to the safe haven"
        );
      } else if ((rollNormalEvent = 2)) {
        $("event").text(
          "It was a long grueling day of travel but you have made it one step closer to safety"
        );
      } else if ((rollNormalEvent = 3)) {
        $("event").text(
          `Even though ${party.members[charIndex].name} annoyed the whole group you have made it another day safely`
        );
      } else if ((rollNormalEvent = 4)) {
        $("event").text(
          "Gunshots fill the air, good thing the party is no where near them. You feel salvation is one day closer."
        );
      } else if ((rollNormalEvent = 5)) {
        $("event").text(
          "Despite the ominious enviroment, travel goes without a hitch. You move one day closer to the safe haven."
        );
      } else if ((rollNormalEvent = 6)) {
        $("event").text(
          "It was a quiet night... but you successfully move one day closer to a new life."
        );
      } else {
        console.log("IT SHOULD NOT BE ROLLING PAST 6");
        console.log(rollNormalEvent);
      }
    }
  }
}
