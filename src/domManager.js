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
      tableCol.classList.add("water_tile");
      if (player && col) tableCol.classList.add("has_ship");
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
  player_one_board.addEventListener("drop", dropHandler, false);
  player_one_board.addEventListener("dragover", preventDef, false);
}
function preventDef(e) {
  e.preventDefault();
}

function dragStartHandler(e) {
  e.dataTransfer.setData("name", e.target.dataset.name);
}
function dropHandler(e) {
  e.preventDefault();
  let droppedName = e.dataTransfer.getData("name");
  const shipObject = playerOne.shipList.find((sh) => sh.name == droppedName);
  let droppedLength = shipObject.shipLength;
  let position = [+e.target.parentElement.dataset.horizontalPos, +e.target.dataset.verticalPos];
  playerOne.board.addShipToList(shipObject, droppedLength, position, vertical_toggle.checked);
  makeShipList(playerOne.shipList);
}

export { drawBoard, makeShipList };
