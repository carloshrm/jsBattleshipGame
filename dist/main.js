/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domManager.js":
/*!***************************!*\
  !*** ./src/domManager.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawBoard\": () => (/* binding */ drawBoard),\n/* harmony export */   \"fleetList\": () => (/* binding */ fleetList),\n/* harmony export */   \"setDragDropListeners\": () => (/* binding */ setDragDropListeners),\n/* harmony export */   \"formListeners\": () => (/* binding */ formListeners)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\r\n\r\n\r\nfunction drawBoard(board, owner) {\r\n  let boardDiv = owner\r\n    ? document.getElementById(\"player_one_board\")\r\n    : document.getElementById(\"player_two_board\");\r\n  boardDiv.innerHTML = \"\";\r\n  let headerRow = document.createElement(\"tr\");\r\n  board.forEach((row, rI) => {\r\n    let tableRow = document.createElement(\"tr\");\r\n    tableRow.dataset.horizontalPos = rI;\r\n    row.forEach((col, cI) => {\r\n      let tableCol = document.createElement(\"td\");\r\n      tableCol.dataset.verticalPos = cI;\r\n      tableCol.classList.add(\"water_tile\");\r\n      if (owner && col) {\r\n        tableCol.classList.add(\"ship_piece\");\r\n        tableCol.draggable = true;\r\n        tableCol.dataset.name = col.ship.name;\r\n      }\r\n      tableRow.appendChild(tableCol);\r\n    });\r\n    if (rI === 0) boardDiv.appendChild(headerRow);\r\n    boardDiv.appendChild(tableRow);\r\n  });\r\n}\r\n\r\nfunction fleetList() {\r\n  let listDom = document.getElementById(\"player_one_ships\");\r\n  let table = document.createElement(\"table\");\r\n  listDom.innerHTML = \"\";\r\n  ___WEBPACK_IMPORTED_MODULE_0__.playerOne.shipList.forEach((ship) => {\r\n    if (___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placedShips.find((s) => s.shipObject.name == ship.name)) return;\r\n    let draggableShip = document.createElement(\"tr\");\r\n    let shipName = document.createElement(\"th\");\r\n    draggableShip.draggable = true;\r\n    draggableShip.classList.add(\"ship_piece\");\r\n    for (let i = 0; i < ship.shipLength; i++) {\r\n      draggableShip.appendChild(document.createElement(\"td\"));\r\n    }\r\n    shipName.innerText = `${ship.name}`;\r\n    shipName.colSpan = \"5\";\r\n    draggableShip.dataset.name = ship.name;\r\n    table.appendChild(shipName);\r\n    table.appendChild(draggableShip);\r\n    listDom.appendChild(table);\r\n  });\r\n  setDragDropListeners();\r\n}\r\n\r\nfunction setDragDropListeners() {\r\n  document.querySelectorAll(\".ship_piece\").forEach((sp) => {\r\n    sp.addEventListener(\"dragstart\", dragStartHandler, false);\r\n  });\r\n  player_one_board.addEventListener(\"dragover\", preventDef, false);\r\n  player_one_ships_div.addEventListener(\"dragover\", preventDef, false);\r\n  player_one_board.addEventListener(\"drop\", dropHandler, false);\r\n  player_one_ships_div.addEventListener(\"drop\", dropHandler, false);\r\n}\r\nfunction removeDragDropListeners() {\r\n  document.querySelectorAll(\".ship_piece\").forEach((sp) => {\r\n    sp.removeEventListener(\"dragstart\", dragStartHandler, false);\r\n  });\r\n  player_one_board.removeEventListener(\"dragover\", preventDef, false);\r\n  player_one_ships_div.removeEventListener(\"dragover\", preventDef, false);\r\n  player_one_board.removeEventListener(\"drop\", dropHandler, false);\r\n  player_one_ships_div.removeEventListener(\"drop\", dropHandler, false);\r\n}\r\n\r\nfunction setGameplayListeners() {\r\n  document.querySelectorAll(\"td\").forEach((tile) => {\r\n    tile.addEventListener(\"click\", (e) => {\r\n      let targetPosition = [\r\n        +e.target.parentElement.dataset.horizontalPos,\r\n        +e.target.dataset.verticalPos,\r\n      ];\r\n      console.log(targetPosition);\r\n    });\r\n  });\r\n}\r\n\r\nfunction preventDef(e) {\r\n  e.preventDefault();\r\n}\r\nfunction dragStartHandler(e) {\r\n  e.dataTransfer.setData(\"name\", e.target.dataset.name);\r\n  e.dataTransfer.setData(\"origin\", e.target.classList);\r\n}\r\n\r\nfunction dropHandler(e) {\r\n  e.preventDefault();\r\n  let originSwitch = e.dataTransfer.getData(\"origin\").includes(\"water_tile\");\r\n  let droppedName = e.dataTransfer.getData(\"name\");\r\n  const shipObject = ___WEBPACK_IMPORTED_MODULE_0__.playerOne.shipList.find((sh) => sh.name == droppedName);\r\n  if (e.target.classList.contains(\"water_tile\")) {\r\n    if (originSwitch) dropOnList();\r\n    dropOnBoard();\r\n  }\r\n  if (e.target.classList.contains(\"ship_list\") && originSwitch) dropOnList();\r\n  fleetList();\r\n  //\r\n  function dropOnBoard() {\r\n    let targetPosition = [\r\n      +e.target.parentElement.dataset.horizontalPos,\r\n      +e.target.dataset.verticalPos,\r\n    ];\r\n    if (\r\n      ___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.addShipToList(shipObject, targetPosition, vertical_toggle.checked) === false\r\n    )\r\n      alert(\"That position already occupied or not long enough for the selected ship.\");\r\n  }\r\n  function dropOnList() {\r\n    let pickedObject = ___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placedShips.find((x) => x.shipObject.name == droppedName);\r\n    ___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placedShips.splice(___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placedShips.indexOf(pickedObject), 1);\r\n    ___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.iterateShipLength(pickedObject, true);\r\n    ___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.refreshBoard();\r\n  }\r\n}\r\nfunction startGame() {\r\n  removeDragDropListeners();\r\n  player_one_ships_div.style.display = \"none\";\r\n  player_two.style.display = \"block\";\r\n  setGameplayListeners();\r\n  skynetSetup();\r\n}\r\n\r\nfunction skynetSetup() {\r\n  debugger;\r\n  const playerTwo = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(\"Skynet\");\r\n  playerTwo.board.humanOwner = false;\r\n  drawBoard(playerTwo.board.playingBoard, playerTwo.board.humanOwner);\r\n  while (playerTwo.board.placedShips.length !== 5) {\r\n    addRandomShip();\r\n  }\r\n  function addRandomShip() {\r\n    let randomPos = [];\r\n    let randomShip = [];\r\n    do {\r\n      randomShip = playerTwo.shipList[Math.floor(Math.random() * 5)];\r\n    } while (playerTwo.board.placedShips.find((s) => s.shipObject.name == randomShip.name));\r\n    let keepTrying = true;\r\n    do {\r\n      randomPos = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\r\n      keepTrying = playerTwo.board.addShipToList(\r\n        randomShip,\r\n        randomPos,\r\n        Math.floor(Math.random() * 2)\r\n      );\r\n    } while (keepTrying);\r\n  }\r\n}\r\n\r\nfunction formListeners() {\r\n  player_name_form.value = ___WEBPACK_IMPORTED_MODULE_0__.playerOne.name;\r\n  startup_form.addEventListener(\"submit\", (e) => {\r\n    e.preventDefault();\r\n    console.log(e);\r\n    setName(e.target[0].value);\r\n    if (___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placedShips.length !== 5) {\r\n      alert(\"place all your ships on the board before starting!\");\r\n      return;\r\n    } else if (___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.placedShips.length === 5) {\r\n      startGame();\r\n    }\r\n  });\r\n  player_name_form.addEventListener(\"change\", (e) => setName(e.target.value));\r\n\r\n  function setName(name) {\r\n    if (name === \"\") return;\r\n    ___WEBPACK_IMPORTED_MODULE_0__.playerOne.name = name;\r\n    p1_board_title.innerText = ___WEBPACK_IMPORTED_MODULE_0__.playerOne.name + \" Fleet\";\r\n  }\r\n}\r\n\r\n\r\n\r\n// TODO - SETUP NEW BOARD FOR COMPUTER, MAKE RANDOM SHIP PLACEMENT -> START BUTTON\r\n// start button should cut drag/drop listeners replace with click to fire\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/domManager.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameBoard\": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManager */ \"./src/domManager.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\n\r\nclass GameBoard {\r\n  constructor() {\r\n    this.attackCount = 0;\r\n    this.playingBoard = GameBoard.setBlankBoard();\r\n    this.placedShips = [];\r\n    this.humanOwner = true;\r\n  }\r\n\r\n  static setBlankBoard() {\r\n    let horizontal = [];\r\n    for (let i = 0; i < 10; i++) {\r\n      let vertical = [];\r\n      for (let j = 0; j < 10; j++) {\r\n        vertical[j] = false;\r\n      }\r\n      horizontal[i] = vertical;\r\n    }\r\n    return horizontal;\r\n  }\r\n\r\n  addShipToList(shipObject, pos, orientation) {\r\n    let shipEntry = { shipObject: shipObject, position: pos, isVertical: orientation };\r\n    if (this.iterateShipLength(shipEntry) == false) {\r\n      return false;\r\n    }\r\n    this.placedShips.push(shipEntry);\r\n    this.refreshBoard();\r\n  }\r\n\r\n  refreshBoard() {\r\n    this.placedShips.forEach((ship) => {\r\n      let vertCoord = ship.position[0];\r\n      let horCoord = ship.position[1];\r\n      for (let i = 0; i < ship.shipObject.shipLength; i++) {\r\n        this.playingBoard[vertCoord][horCoord] = {\r\n          ship: ship.shipObject,\r\n          hitMarker: false,\r\n        };\r\n        ship.isVertical ? vertCoord++ : horCoord++;\r\n      }\r\n    });\r\n    (0,_domManager__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(this.playingBoard, this.humanOwner);\r\n  }\r\n\r\n  iterateShipLength(targetShip, switchRemove = false) {\r\n    let vertPos = targetShip.position[0];\r\n    let horPos = targetShip.position[1];\r\n    for (let i = 0; i < targetShip.shipObject.shipLength; i++) {\r\n      if (this.playingBoard[vertPos][horPos] !== false && !switchRemove) {\r\n        return false;\r\n      }\r\n      if (switchRemove) this.playingBoard[vertPos][horPos] = false;\r\n      targetShip.isVertical ? vertPos++ : horPos++;\r\n    }\r\n    return true;\r\n  }\r\n\r\n  dropShell(x, y) {\r\n    let hitLocation = this.playingBoard[x][y];\r\n    if (hitLocation === true) return;\r\n    if (hitLocation.ship !== undefined && hitLocation.ship.isSunk === false) {\r\n      hitLocation.ship.hit();\r\n      hitLocation.hitMarker = true;\r\n    } else {\r\n      hitLocation = true;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"playerOne\": () => (/* binding */ playerOne)\n/* harmony export */ });\n/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManager */ \"./src/domManager.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\r\n\r\n\r\nconst playerOne = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(\"Player\");\r\n(0,_domManager__WEBPACK_IMPORTED_MODULE_0__.fleetList)(playerOne);\r\nplayerOne.board.refreshBoard();\r\n(0,_domManager__WEBPACK_IMPORTED_MODULE_0__.formListeners)();\r\n\r\n\r\n\r\n// another board for pc\r\n// place ships in random places\r\n// different display\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\n\r\nclass Player {\r\n  constructor(name) {\r\n    this.name = name; //get from DOM\r\n    this.board = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard();\r\n    this.shipList = _ship__WEBPACK_IMPORTED_MODULE_1__.Ship.shipSet;\r\n    this.isRealPlayer = true;\r\n  }\r\n  // needs AI\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n  constructor(name, shipLength) {\r\n    this.name = name;\r\n    this.shipLength = shipLength;\r\n    this.hitTracker = [];\r\n    this.isSunk = false;\r\n  }\r\n  hit() {\r\n    if (this.hitTracker.length < this.shipLength) this.hitTracker.push(true);\r\n    this.checkIfSunk();\r\n  }\r\n  checkIfSunk() {\r\n    this.isSunk = this.hitTracker.length === this.shipLength && this.hitTracker.every(true);\r\n  }\r\n  static shipSet = [\r\n    new Ship(\"Carrier\", 5),\r\n    new Ship(\"Battleship\", 4),\r\n    new Ship(\"Cruiser\", 3),\r\n    new Ship(\"Submarine\", 3),\r\n    new Ship(\"Destroyer\", 2),\r\n  ];\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;