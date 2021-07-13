import { playerOne } from ".";
import { GameBoard } from "./gameBoard";

function drawBoard(board, player = true) {
  let boardDiv = document.getElementById("player_one_board");
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

function makeShipList(types) {
  let shipList = document.getElementById("player_one_ships");
  let table = document.createElement("table");

  types.forEach((ship) => {
    let draggableShip = document.createElement("tr");
    let shipName = document.createElement("th");
    draggableShip.draggable = true;
    draggableShip.className = "ship_piece";
    for (let i = 0; i < ship.length; i++) {
      draggableShip.appendChild(document.createElement("td"));
    }
    shipName.innerText = `${ship.name}`;
    shipName.colSpan = "5";
    draggableShip.dataset.length = ship.length;
    table.appendChild(shipName);
    table.appendChild(draggableShip);
    shipList.appendChild(table);
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
}
function dropHandler(e) {
  e.preventDefault();
  let shipLength = e.dataTransfer.getData("length");
  let position = [e.target.parentElement.dataset.horizontalPos, e.target.dataset.verticalPos];
  playerOne.board.addShipToList(shipLength, position, false);
  console.log(playerOne.shipList);
}

export { drawBoard, makeShipList };
