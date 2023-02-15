import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Character from "./js/character.js";
import Party from "./js/party.js";
import rollNumber from "./js/rollNumber";
import Game from "./js/game.js";
import $ from "jquery";
import fates from "./js/events.js";
import Inventory from "./js/inventory.js";
window.jQuery = $;
window.$ = $;

// const gameStartSong = new Audio("audio.md");
// const gameWinSong = new Audio();
let party = new Party();
let inventory = new Inventory();
let game = new Game();

//UI Logic
function handleFormSubmission(event) {
  event.preventDefault();

  // Character Names

  const carLeader = document.getElementById("addLeader").value;
  const member1 = document.getElementById("addMember1").value;
  const member2 = document.getElementById("addMember2").value;
  const member3 = document.getElementById("addMember3").value;

  let char1 = new Character(carLeader);
  let char2 = new Character(member1);
  let char3 = new Character(member2);
  let char4 = new Character(member3);

  party.members.push(char1, char2, char3, char4);
  let list = document.querySelector("#zombieMembers");
  list.innerHTML = "";
  party.members.forEach(function (memberName) {
    let listNames = document.createElement("li");
    listNames.textContent = memberName.name;
    list.appendChild(listNames);
  });

  let autoName = ["Rick", "Daryl", "Maggie", "Glen", "Negan", "Morgan", "Carol", "Shane", "Dale", "Michone", "Sasha", "Abraham"];
  party.members.forEach(function (autoMemberName) {
    if (!autoMemberName.name) {
      let index = rollNumber(0, autoName.length);
      autoMemberName.name = autoName[index];
      autoName.splice(index, 1);
    }

    let list = document.querySelector("#zombieMembers");
    list.innerHTML = "";
    party.members.forEach(function (memberName) {
      let listNames = document.createElement("li");
      listNames.textContent = memberName.name;
      list.appendChild(listNames);
      $('#instructions').hide();
    });
  });


  // Inventory UI
  // let listSupply = document.getElementById("inventory");
  // const bullets = document.createElement("li");
  // const food = document.createElement("li");
  // const medKit = document.createElement("li");

  // bullets.textContent = `Bullet: ${inventory.bullet}`;
  // food.textContent = `Food: ${inventory.food}`;
  // medKit.textContent = `Med Kit: ${inventory.medkit}`;

  // listSupply.appendChild(bullets);
  // listSupply.appendChild(food);
  // listSupply.appendChild(medKit);

  $("#homeScreen").hide();
  $("#gameScreen").show();
}

//All the game functions
function travel(rollFates, party, inventory) {
  fates(rollFates, party, inventory);
}

function updateStats() {
  $(".totalDays").text(game.totalDays);
  let memberNames = "";
  party.members.forEach(function (member) {
    memberNames += "<li>" + member.name + " | Health: " + member.health + " | Stamina:" + member.stamina + "</li>";
  });
  $("#zombieMembers").html(memberNames);

  let inventoryItems = "";
  Object.keys(inventory).forEach(function(key){
    const str2 = key.charAt(0).toUpperCase() + key.slice(1);
    inventoryItems += "<li>" + str2 +" : " + inventory[key] + "</li>";
  });
  $("#inventory").html(inventoryItems);
}


//All the event listener fucntions
window.addEventListener("load", function () {
  document.querySelector("form#createParty").addEventListener("submit", handleFormSubmission);
});

//Listener for travel
$(".travel").click(function () {
  $("#randomEventMessage").empty();
  $(".imgHeader").css("background-image", game.imgArray[game.imgArrayIndex]);
  for (let i = 0; i < party.members.length; i++) {
    party.members[i].staminaLost();
  }
  game.totalDays++;
  if(game.imgArrayIndex < 2) {
    game.imgArrayIndex++;
  } else {
    game.imgArrayIndex = 0;
  }
  const rollFates = rollNumber(1,101);
  travel(rollFates, party, inventory);
  updateStats();
});

// listener for resting
$(".rest").click(function () {
  //game.totalDays++;
  for (let i = 0; i < party.members.length; i++) {
    party.members[i].staminaGain();
    // this.food -= party.members.length() * 0.5 * rollNumber(1, 3);
    //console.log(party.members[i]);
  }

  updateStats();
});

//listener for heal
$(".heal").click(function () {
  if (inventory.medkit > 0) {
    for (let i = 0; i < party.members.length; i++) {
      party.members[i].healthGain();
    }
    $("#randomEventMessage").text(
      "Your party decides its best to heal some wounds, the party used a medkit")
    inventory.medkit -= 1
    updateStats();
  } else {
    $("#randomEventMessage").text(
      "Despite your best wishes, you cannot heal without supplies(no medkits!)")
  }
});

//listener for restocking
$(".restock").click(function () {
  inventory.restock();
  game.totalDays++;
  updateStats();
});


// function checkDeath() {
//   let deathString = "";
//   for(let i = 0; i < party.members.length; i++) {
//     if(party.members[i].deathCheck(i)) {
//       deathString += party.members[i].name + " has died. ";
//       party.members.splice(i, 1);
//       if (party.members.length <= 0) {
//         $("#event").html("Everyone in your party has died. The game is over.");
//         $(".imgHeader").css("background-image", "url(../assets/images/GameOver.png");
//         return;
//       }
//       i--;
//     }
//   }
 
//   if (deathString) {
//     deathString += "Bummer.";
//     $("#event").html(deathString);
//   }
// }