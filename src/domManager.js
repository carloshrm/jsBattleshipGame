import { playerOne } from ".";
import { GameBoard } from "./gameBoard";

function drawBoard(board, player = true) {
  let boardDiv = document.getElementById("player_one_board");
  boardDiv.innerHTML = "";
  let headerRow = document.createElement("tr");
  board.forEach((row, rI) => {
    let tableRow = document.createElement("tr");
    tableRow.dataset.horizontalPos = rI;
    row.forEach((col, cI) => {
      let tableCol = document.createElement("td");
      tableCol.dataset.verticalPos = cI;
      if (player) tableCol.classList.add(`${col ? "has_ship" : "not_hit"}`);
      tableRow.appendChild(tableCol);
    });
    if (rI === 0) boardDiv.appendChild(headerRow);
    boardDiv.appendChild(tableRow);
  });
}

function makeShipList(list) {
  let listDom = document.getElementById("player_one_ships");
  let table = document.createElement("table");
  listDom.innerHTML = "";
  list.forEach((ship) => {
    if (playerOne.board.placedShips.find((s) => s.shipObject.name == ship.name)) return;
    let draggableShip = document.createElement("tr");
    let shipName = document.createElement("th");
    draggableShip.draggable = true;
    draggableShip.className = "ship_piece";
    for (let i = 0; i < ship.shipLength; i++) {
      draggableShip.appendChild(document.createElement("td"));
    }
    shipName.innerText = `${ship.name}`;
    shipName.colSpan = "5";
    draggableShip.dataset.length = ship.shipLength;
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
  document.getElementById("player_one_board").addEventListener("drop", dropHandler, false);
  document
    .getElementById("player_one_board")
    .addEventListener("dragover", (e) => e.preventDefault(), false);
}

function dragStartHandler(e) {
  e.dataTransfer.setData("length", e.target.dataset.length);
  e.dataTransfer.setData("name", e.target.dataset.name);
}
function dropHandler(e) {
  e.preventDefault();
  let droppedLength = e.dataTransfer.getData("length");
  let droppedName = e.dataTransfer.getData("name");
  const shipObject = playerOne.shipList.find((sh) => sh.name == droppedName);
  let position = [+e.target.parentElement.dataset.horizontalPos, +e.target.dataset.verticalPos];
  playerOne.board.addShipToList(shipObject, droppedLength, position, false);
  makeShipList(playerOne.shipList);
  console.log(playerOne.board.placedShips);
}

export { drawBoard, makeShipList };
