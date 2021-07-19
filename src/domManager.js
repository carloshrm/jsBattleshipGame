function drawBoard(board, player = true) {
  let boardDiv = player
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
      if (player && col) {
        tableCol.classList.add("ship_piece");
        tableCol.draggable = true;
        tableCol.dataset.name = col.ship.name;
      }
      tableRow.appendChild(tableCol);
    });
    if (rI === 0) boardDiv.appendChild(headerRow);
    boardDiv.appendChild(tableRow);
  });
  setDragDropListeners(playerObject);
}

function fleetList(playerObject) {
  let listDom = document.getElementById("player_one_ships");
  let table = document.createElement("table");
  listDom.innerHTML = "";
  playerObject.shipList.forEach((ship) => {
    if (playerObject.board.placedShips.find((s) => s.shipObject.name == ship.name)) return;
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
}

function setDragDropListeners(playerObject) {
  debugger;
  document.querySelectorAll(".ship_piece").forEach((sp) => {
    sp.addEventListener("dragstart", dragStartHandler, false);
  });
  player_one_board.addEventListener("dragover", preventDef, false);
  player_one_ships_div.addEventListener("dragover", preventDef, false);
  player_one_board.addEventListener("drop", (e) => dropHandler(e, playerObject), false);
  player_one_ships_div.addEventListener("drop", (e) => dropHandler(e, playerObject), false);
}

function preventDef(e) {
  e.preventDefault();
}

function dragStartHandler(e) {
  console.log(e);
  e.dataTransfer.setData("name", e.target.dataset.name);
  e.dataTransfer.setData("origin", e.target.classList);
}

function dropHandler(e, playerObject) {
  e.preventDefault();
  let originSwitch = e.dataTransfer.getData("origin").includes("water_tile");
  let droppedName = e.dataTransfer.getData("name");
  const shipObject = playerObject.shipList.find((sh) => sh.name == droppedName);
  if (e.target.classList.contains("water_tile")) {
    if (originSwitch) dropOnList();
    dropOnBoard();
  }
  if (e.target.classList.contains("ship_list") && originSwitch) dropOnList();
  fleetList(playerObject);
  //
  function dropOnBoard() {
    let targetPosition = [
      +e.target.parentElement.dataset.horizontalPos,
      +e.target.dataset.verticalPos,
    ];
    playerObject.board.addShipToList(shipObject, targetPosition, vertical_toggle.checked);
  }
  function dropOnList() {
    let pickedObject = playerObject.board.placedShips.find((x) => x.shipObject.name == droppedName);
    console.log(pickedObject);
    playerObject.board.placedShips.splice(playerObject.board.placedShips.indexOf(pickedObject), 1);
    playerObject.board.iterateShipLength(pickedObject, true);
    playerObject.board.refreshBoard();
  }
}

export { drawBoard, fleetList };

// TODO - SETUP NEW BOARD FOR COMPUTER, MAKE RANDOM SHIP PLACEMENT -> START BUTTON
// start button should cut drag/drop listeners
