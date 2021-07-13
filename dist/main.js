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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawBoard\": () => (/* binding */ drawBoard),\n/* harmony export */   \"makeShipList\": () => (/* binding */ makeShipList)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n\r\n\r\n\r\nfunction drawBoard(board, player = true) {\r\n  let boardDiv = document.getElementById(\"player_one_board\");\r\n  let headerRow = document.createElement(\"tr\");\r\n  board.forEach((row, rI) => {\r\n    let tableRow = document.createElement(\"tr\");\r\n    tableRow.dataset.horizontalPos = rI;\r\n    row.forEach((col, cI) => {\r\n      let tableCol = document.createElement(\"td\");\r\n      tableCol.dataset.verticalPos = cI;\r\n      if (player) tableCol.classList.add(`${col ? \"has_ship\" : \"not_hit\"}`);\r\n      tableRow.appendChild(tableCol);\r\n    });\r\n    if (rI === 0) boardDiv.appendChild(headerRow);\r\n    boardDiv.appendChild(tableRow);\r\n  });\r\n}\r\n\r\nfunction makeShipList(types) {\r\n  let shipList = document.getElementById(\"player_one_ships\");\r\n  let table = document.createElement(\"table\");\r\n\r\n  types.forEach((ship) => {\r\n    let draggableShip = document.createElement(\"tr\");\r\n    let shipName = document.createElement(\"th\");\r\n    draggableShip.draggable = true;\r\n    draggableShip.className = \"ship_piece\";\r\n    for (let i = 0; i < ship.length; i++) {\r\n      draggableShip.appendChild(document.createElement(\"td\"));\r\n    }\r\n    shipName.innerText = `${ship.name}`;\r\n    shipName.colSpan = \"5\";\r\n    draggableShip.dataset.length = ship.length;\r\n    table.appendChild(shipName);\r\n    table.appendChild(draggableShip);\r\n    shipList.appendChild(table);\r\n  });\r\n  setDragDropListeners();\r\n}\r\n\r\nfunction setDragDropListeners() {\r\n  document.querySelectorAll(\".ship_piece\").forEach((sp) => {\r\n    sp.addEventListener(\"dragstart\", dragStartHandler, false);\r\n  });\r\n  document.getElementById(\"player_one_board\").addEventListener(\"drop\", dropHandler, false);\r\n  document\r\n    .getElementById(\"player_one_board\")\r\n    .addEventListener(\"dragover\", (e) => e.preventDefault(), false);\r\n}\r\n\r\nfunction dragStartHandler(e) {\r\n  e.dataTransfer.setData(\"length\", e.target.dataset.length);\r\n}\r\nfunction dropHandler(e) {\r\n  e.preventDefault();\r\n  let shipLength = e.dataTransfer.getData(\"length\");\r\n  let position = [e.target.parentElement.dataset.horizontalPos, e.target.dataset.verticalPos];\r\n  ___WEBPACK_IMPORTED_MODULE_0__.playerOne.board.addShipToList(shipLength, position, false);\r\n  console.log(___WEBPACK_IMPORTED_MODULE_0__.playerOne.shipList);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/domManager.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameBoard\": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\nclass GameBoard {\r\n  constructor() {\r\n    this.attackCount = 0;\r\n    this.playingBoard = GameBoard.setBoard();\r\n    this.placedShips = [];\r\n  }\r\n  static setBoard() {\r\n    let horizontal = [];\r\n    for (let i = 0; i < 10; i++) {\r\n      let vertical = [];\r\n      for (let j = 0; j < 10; j++) {\r\n        vertical[j] = false;\r\n      }\r\n      horizontal[i] = vertical;\r\n    }\r\n    return horizontal;\r\n  }\r\n  addShipToList(length, pos, orientation) {\r\n    let newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(length);\r\n    let shipEntry = { shipObject: newShip, position: pos, isVertical: orientation };\r\n    if (this.playingBoard[pos[0]][pos[1]] !== false) {\r\n      // a ship is already there warning\r\n      return;\r\n    }\r\n    this.placedShips.push(shipEntry);\r\n    this.setShipsOnBoard();\r\n  }\r\n  setShipsOnBoard() {\r\n    this.placedShips.forEach((ship) => {\r\n      let horizontalCoord = ship.position[0];\r\n      let verticalCoord = ship.position[1];\r\n      for (let i = 0; i < ship.shipObject.shipLength; i++) {\r\n        this.playingBoard[horizontalCoord][verticalCoord] = {\r\n          ship: ship.shipObject,\r\n          hitMarker: false,\r\n        };\r\n        ship.isVertical ? verticalCoord++ : horizontalCoord++;\r\n      }\r\n    });\r\n  }\r\n  dropShell(x, y) {\r\n    //move to game logic\r\n    let hitLocation = this.playingBoard[x][y];\r\n    if (hitLocation === true) return;\r\n    if (hitLocation.ship !== undefined && hitLocation.ship.isSunk === false) {\r\n      hitLocation.ship.hit();\r\n      hitLocation.hitMarker = true;\r\n    } else {\r\n      hitLocation = true;\r\n    }\r\n  }\r\n  // each player gets a board\r\n  // if certain number of ships, start game\r\n  // TODO hit counter checks if the spot has been attacked, if not, marks the attack and checks if it hit a ship\r\n  // if it hits a ship, set a counter on that object\r\n  // TODO something that controls game flow, sets ships, makes boards, sets them on players players and swaps turns\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"playerOne\": () => (/* binding */ playerOne)\n/* harmony export */ });\n/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManager */ \"./src/domManager.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\r\n\r\n\r\nconst playerOne = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(\"Anon\");\r\n(0,_domManager__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(playerOne.board.playingBoard);\r\n(0,_domManager__WEBPACK_IMPORTED_MODULE_0__.makeShipList)(playerOne.shipList);\r\n\r\n\r\n\r\n// another board for pc\r\n// place ships in random places\r\n// different display\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\n\r\nclass Player {\r\n  constructor(name) {\r\n    this.name = name; //get from DOM\r\n    this.board = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard();\r\n    this.shipList = _ship__WEBPACK_IMPORTED_MODULE_1__.Ship.types;\r\n  }\r\n  // needs AI\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n  constructor(shipLength) {\r\n    this.shipLength = shipLength;\r\n    this.hitTracker = [];\r\n    this.isSunk = false;\r\n  }\r\n  hit() {\r\n    if (this.hitTracker.length < this.shipLength) this.hitTracker.push(true);\r\n    this.checkIfSunk();\r\n  }\r\n  checkIfSunk() {\r\n    this.isSunk = this.hitTracker.length === this.shipLength && this.hitTracker.every(true);\r\n  }\r\n  static types = [\r\n    { name: \"Carrier\", length: 5 },\r\n    { name: \"Battleship\", length: 4 },\r\n    { name: \"Cruiser\", length: 3 },\r\n    { name: \"Submarine\", length: 3 },\r\n    { name: \"Destroyer\", length: 2 },\r\n  ];\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/ship.js?");

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