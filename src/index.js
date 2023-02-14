import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Character from './js/character.js';
import Party from './js/party.js';
import rollNumber from './js/rollNumber';
import Game from './js/game.js';
import $ from 'jquery';
import fates from "./js/events.js";
window.jQuery = $;
window.$ = $;


// const gameStartSong = new Audio("audio.md");
// const gameWinSong = new Audio();
let party = new Party();
const game = new Game();

//UI Logic
function handleFormSubmission(event) {
  event.preventDefault();

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
  party.members.forEach(function(memberName) {
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
    party.members.forEach(function(memberName) {
      let listNames = document.createElement("li");
      listNames.textContent = memberName.name;
      list.appendChild(listNames);
    });

    $("#homeScreen").hide();
    $("#gameScreen").show();
    console.log(fates);

  });
}

// function travel() {
//   const roll = rollNumber(1,101);
//   console.log(roll);
//   fates(roll)
// }

function updateStats() {
  $(".totalDays").text(game.totalDays);
  let memberNames = "";
  party.members.forEach(function(member) {
    console.log(member);
    memberNames += "<li>" + member.name + " | Health: " + member.health + " | Stamina:" + member.stamina + "</li>";
  });
  $("#zombieMembers").html(memberNames);

}



window.addEventListener("load", function () {
  document.querySelector("form#createParty").addEventListener("submit", handleFormSubmission);
});


$(".travel").click(function(){
  game.totalDays++;
  for(let i=0; i <party.members.length; i++){
    party.members[i].staminaLost();
  }
  updateStats();
});

$(".rest").click(function() {
  game.totalDays++;
  for (let i = 0; i < party.members.length; i++) {
    party.members[i].staminaGain();
    console.log(party.members[i]);
  }
  
  updateStats();
});



// document.querySelector(".travel").addEventListener("click", function(){
//   game.totalDays++;
// });