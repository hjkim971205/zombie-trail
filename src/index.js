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
const game = new Game();

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
    });
  });
  // Inventory UI
  let listSupply = document.getElementById("inventory");
  const bullets = document.createElement("li");
  const food = document.createElement("li");
  const medKit = document.createElement("li");

  bullets.textContent = `Bullet: ${inventory.bullet}`;
  food.textContent = `Food: ${inventory.food}`;
  medKit.textContent = `Med Kit: ${inventory.medkit}`;

  listSupply.appendChild(bullets);
  listSupply.appendChild(food);
  listSupply.appendChild(medKit);

  $("#homeScreen").hide();
  $("#gameScreen").show();
}

//
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
  // let inventoryItems = "";
  // inventory.forEach(function (item) {
  //   inventoryItems += "<li>" + item.bullet + "</li>";
  // });
  // $("#inventory").html(inventoryItems);
}

window.addEventListener("load", function () {
  document.querySelector("form#createParty").addEventListener("submit", handleFormSubmission);
});

$(".travel").click(function () {
  $("#randomEventMessage").empty();

  for (let i = 0; i < party.members.length; i++) {
    party.members[i].staminaLost();
  }
  game.totalDays++;
  const rollFates = rollNumber(1,101);
  travel(rollFates, party, inventory);
  updateStats();
});

$(".rest").click(function () {
  //game.totalDays++;
  for (let i = 0; i < party.members.length; i++) {
    party.members[i].staminaGain();
    // this.food -= party.members.length() * 0.5 * rollNumber(1, 3);
    //console.log(party.members[i]);
  }

  updateStats();
});

$(".heal").click(function () {
  //game.totalDays++;
  for (let i = 0; i < party.members.length; i++) {
    party.members[i].healthGain();
    //inventory.heal();
    //console.log(party.members[i]);
  }

  updateStats();
});

$(".restock").click(function () {
  inventory.restock();
  game.totalDays++;
});
