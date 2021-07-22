import { playerOne } from ".";
import { Player } from "./player";

function drawBoard(board, owner) {
  let boardDiv = owner
    ? document.getElementById("player_one_board")
    : document.getElementById("player_two_board");
  boardDiv.innerHTML = "";
  let headerRow = document.createElement("tr");
  board.forEach((row, rI) => {
    let tableRow = document.createElement("tr");
    tableRow.dataset.horizontalPos = rI;
    row.forEach((col, cI) => {
      let tableCol = document.createElement("td");
      tableCol.dataset.verticalPos = cI;
      tableCol.classList.add("water_tile");
      if (owner && col) {
        tableCol.classList.add("ship_piece");
        tableCol.draggable = true;
        tableCol.dataset.name = col.ship.name;
      }
      tableRow.appendChild(tableCol);
    });
    if (rI === 0) boardDiv.appendChild(headerRow);
    boardDiv.appendChild(tableRow);
  });
}

function fleetList() {
  let listDom = document.getElementById("player_one_ships");
  let table = document.createElement("table");
  listDom.innerHTML = "";
  playerOne.shipList.forEach((ship) => {
    if (playerOne.board.placedShips.find((s) => s.shipObject.name == ship.name)) return;
    let draggableShip = document.createElement("tr");
    let shipName = document.createElement("th");
    draggableShip.draggable = true;
    draggableShip.classList.add("ship_piece");
    for (let i = 0; i < ship.shipLength; i++) {
      draggableShip.appendChild(document.createElement("td"));
    }
    shipName.innerText = `${ship.name}`;
    shipName.colSpan = "5";
    draggableShip.dataset.name = ship.name;
    table.appendChild(shipName);
    table.appendChild(draggableShip);
    listDom.appendChild(table);
  });
  setDragDropListeners();
}

function setDragDropListeners() {
  document.querySelectorAll(".ship_piece").forEach((sp) => {
    sp.addEventListener("dragstart", dragStartHandler, false);
  });
  player_one_board.addEventListener("dragover", preventDef, false);
  player_one_ships_div.addEventListener("dragover", preventDef, false);
  player_one_board.addEventListener("drop", dropHandler, false);
  player_one_ships_div.addEventListener("drop", dropHandler, false);
}
function removeDragDropListeners() {
  document.querySelectorAll(".ship_piece").forEach((sp) => {
    sp.removeEventListener("dragstart", dragStartHandler, false);
  });
  player_one_board.removeEventListener("dragover", preventDef, false);
  player_one_ships_div.removeEventListener("dragover", preventDef, false);
  player_one_board.removeEventListener("drop", dropHandler, false);
  player_one_ships_div.removeEventListener("drop", dropHandler, false);
}

function setGameplayListeners() {
  document.querySelectorAll("td").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      let targetPosition = [
        +e.target.parentElement.dataset.horizontalPos,
        +e.target.dataset.verticalPos,
      ];
      console.log(targetPosition);
    });
  });
}

function preventDef(e) {
  e.preventDefault();
}
function dragStartHandler(e) {
  e.dataTransfer.setData("name", e.target.dataset.name);
  e.dataTransfer.setData("origin", e.target.classList);
}

function dropHandler(e) {
  e.preventDefault();
  let originSwitch = e.dataTransfer.getData("origin").includes("water_tile");
  let droppedName = e.dataTransfer.getData("name");
  const shipObject = playerOne.shipList.find((sh) => sh.name == droppedName);
  if (e.target.classList.contains("water_tile")) {
    if (originSwitch) dropOnList();
    dropOnBoard();
  }
  if (e.target.classList.contains("ship_list") && originSwitch) dropOnList();
  fleetList();
  //
  function dropOnBoard() {
    let targetPosition = [
      +e.target.parentElement.dataset.horizontalPos,
      +e.target.dataset.verticalPos,
    ];
    if (
      playerOne.board.addShipToList(shipObject, targetPosition, vertical_toggle.checked) === false
    )
      alert("That position already occupied or not long enough for the selected ship.");
  }
  function dropOnList() {
    let pickedObject = playerOne.board.placedShips.find((x) => x.shipObject.name == droppedName);
    playerOne.board.placedShips.splice(playerOne.board.placedShips.indexOf(pickedObject), 1);
    playerOne.board.iterateShipLength(pickedObject, true);
    playerOne.board.refreshBoard();
  }
}
function startGame() {
  removeDragDropListeners();
  player_one_ships_div.style.display = "none";
  player_two.style.display = "block";
  setGameplayListeners();
  skynetSetup();
}

function skynetSetup() {
  const playerTwo = new Player("Skynet");
  playerTwo.board.humanOwner = false;
  drawBoard(playerTwo.board.playingBoard, playerTwo.board.humanOwner);
  while (playerTwo.board.placedShips.length !== 5) {
    addRandomShip();
  }
  function addRandomShip() {
    let randomPos = [];
    let randomShip = [];
    do {
      randomShip = playerTwo.shipList[Math.floor(Math.random() * 5)];
    } while (playerTwo.board.placedShips.find((s) => s.shipObject.name == randomShip.name));
    let keepTrying = true;
    do {
      debugger;
      randomPos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      keepTrying = playerTwo.board.addShipToList(
        randomShip,
        randomPos,
        Math.floor(Math.random() * 2)
      );
    } while (keepTrying);
  }
}

function formListeners() {
  player_name_form.value = playerOne.name;
  startup_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    setName(e.target[0].value);
    if (playerOne.board.placedShips.length !== 5) {
      alert("place all your ships on the board before starting!");
      return;
    } else if (playerOne.board.placedShips.length === 5) {
      startGame();
    }
  });
  player_name_form.addEventListener("change", (e) => setName(e.target.value));

  function setName(name) {
    if (name === "") return;
    playerOne.name = name;
    p1_board_title.innerText = playerOne.name + " Fleet";
  }
}

export { drawBoard, fleetList, setDragDropListeners, formListeners };

// TODO - SETUP NEW BOARD FOR COMPUTER, MAKE RANDOM SHIP PLACEMENT -> START BUTTON
// start button should cut drag/drop listeners replace with click to fire
