/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("class Ship {\r\n  constructor(length) {\r\n    this.length = length;\r\n    this.hitTracker = [].fill(false, length);\r\n    this.isSunk = false;\r\n  }\r\n  hit(pos) {\r\n    if (this.hitTracker[pos] !== undefined) this.hitTracker[pos] = true;\r\n    if (this.checkIfSunk()) this.isSunk = true;\r\n  }\r\n  checkIfSunk() {\r\n    return this.hitTracker.every(true);\r\n  }\r\n}\r\n// board is 2 arrays, inside each spot is either 0 for nothing, 1 for empty hit, or a reference to a ship object\r\n// board = [[pos,pos,pos], [pos,pos,pos], [ship1,ship1,ship1]]\r\n// to hit, board[2][0].hit()\r\n// [{},]\r\n\r\nclass GameBoard {\r\n  constructor(player1, player2) {\r\n    this.attackCount = 0;\r\n    this.board = [].fill([].fill({ shipOrWater: 0, isHit: false }, 10), 10);\r\n    this.shipList = [];\r\n    this.playerList = [player1, player2];\r\n  }\r\n\r\n  addShip(length, pos, orientation) {\r\n    let newShip = new Ship(length);\r\n    let shipEntry = { shipObject: newShip, position: pos, isVertical: orientation };\r\n    this.shipList.push(shipEntry);\r\n  }\r\n\r\n  dropShell(positionY, positionX) {\r\n    const hitLocation = this.board[positionX][positionY].shipOrWater;\r\n  }\r\n  // if certain number of ships, start game\r\n}\r\n\n\n//# sourceURL=webpack://jsbattleshipgame/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;