import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Character from './js/character.js';
// import Game from "./game.js";
import Party from './js/party.js';
// import Zombie from "./game.js";

// const gameStartSong = new Audio("audio.md");
// const gameWinSong = new Audio();
let party = new Party();

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
  let list = document.getElementById("zombieMembers").innerHTML = "";
  party.members.forEach(function(memberName) {
    let listNames = document.createElement("li");
    listNames.textContent = memberName.name;
    list.appendChild(listNames);
  });

  let autoName = ["Rick", "Daryl", "Maggie", "Glen", "Negan", "Morgan", "Carol", "Shane", "Dale", "Michone", "Sasha", "Abraham"];
  party.members.forEach(function (autoMemberName) {
    if (!autoMemberName.name) {
      // eslint-disable-next-line no-undef
      let index = rollNumber(0, autoName.length);
      autoMemberName.name = autoName[index];
      autoName.splice(index, 1);
    }
  });
}
window.addEventListener("load", function () {
  document.getElementById("createParty").addEventListener("submit", handleFormSubmission);
});