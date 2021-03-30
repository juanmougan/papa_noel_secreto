(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/api/src/main.ts":
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_shuffle_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/shuffle_service */ "./apps/api/src/services/shuffle_service.ts");
/* harmony import */ var _services_mail_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/mail_service */ "./apps/api/src/services/mail_service.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);







const app = express__WEBPACK_IMPORTED_MODULE_1__();
app.use(cors__WEBPACK_IMPORTED_MODULE_2__());
app.use(express__WEBPACK_IMPORTED_MODULE_1__["static"](path__WEBPACK_IMPORTED_MODULE_6__["join"](__dirname, '../ui/')));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3__["urlencoded"]({ extended: true }));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3__["json"]());
// TODO move this to the Router instead
app.post('/api/rosters', function (req, res) {
    const roster = req.body;
    // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
    // and it should eventually be {"name": "juan", "juan@mail.com"}
    const gifterReceiverMap = Object(_services_shuffle_service__WEBPACK_IMPORTED_MODULE_4__["shuffleRoster"])(roster);
    sendMails(gifterReceiverMap)
        .then(data => {
        const { sent, errors } = data;
        console.log("Errors", errors);
        console.log("Sent", sent);
        if (errors && errors.length) {
            res.status(400).send({
                sent: sent,
                errors: errors
            });
        }
        else {
            res.status(201).send({
                sent: sent
            });
        }
    });
});
function sendMails(gifterReceiverMap) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const sent = [];
        const errors = [];
        for (let pair of gifterReceiverMap) {
            const gifterEmail = pair[0];
            const receiverEmail = pair[1];
            const subject = `You are ${receiverEmail}'s Secret Santa!`;
            const body = `Hi ${gifterEmail}, \nDon't forget to get a present for ${receiverEmail}`;
            try {
                yield Object(_services_mail_service__WEBPACK_IMPORTED_MODULE_5__["sendMail"])(gifterEmail, subject, body);
                sent.push(gifterEmail);
            }
            catch (error) {
                const errorMessage = `Error sending mail to: ${gifterEmail}. Reason: ${error}`;
                console.error(errorMessage);
                errors.push(gifterEmail);
            }
        }
        return Promise.resolve({
            sent: sent,
            errors: errors
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.");
});
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);


/***/ }),

/***/ "./apps/api/src/services/mail_service.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/services/mail_service.ts ***!
  \***********************************************/
/*! exports provided: sendMail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMail", function() { return sendMail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nodemailer */ "nodemailer");
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_2__);



function sendMail(gifterEmail, subject, body) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            dotenv__WEBPACK_IMPORTED_MODULE_1__["config"]();
            let transporter = Object(nodemailer__WEBPACK_IMPORTED_MODULE_2__["createTransport"])({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            console.log(`Will send an email to ${gifterEmail}`);
            console.log(`with subject: ${subject}`);
            console.log(`and body: ${body}`);
            let mailOptions = {
                to: gifterEmail,
                subject: subject,
                text: body,
            };
            return transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error("error is " + error);
                    reject(false);
                }
                else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });
    });
}


/***/ }),

/***/ "./apps/api/src/services/shuffle_service.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/services/shuffle_service.ts ***!
  \**************************************************/
/*! exports provided: shuffleRoster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleRoster", function() { return shuffleRoster; });
// Awfully copy-pasted from https://github.com/juanmougan/shuffler/blob/master/src/App.js#L108
function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function pair(arr) {
    const shuffled = shuffleArray(arr);
    console.log(`Shuffled: ${shuffled}`);
    let circular = shuffled.concat([shuffled[0]]);
    console.log(`Circled: ${circular}`);
    let result = [];
    const pairs = new Map();
    console.log(`circular.length is: ${circular.length}`);
    while (circular.length > 1) {
        console.log(`0th is: ${circular[0]}`);
        console.log(`1th is: ${circular[1]}`);
        pairs.set(circular[0], circular[1]);
        console.log('- - - - - - - - - - - - ');
        circular.shift();
    }
    for (let p of pairs) {
        console.log(`pair: ${p}`);
    }
}
function validateNotRepeated(roster) {
    const rosterSet = new Set(roster);
    return roster.length === rosterSet.size;
}
function shuffleRoster(roster) {
    validateNotRepeated(roster);
    // Shuffle input
    const shuffledRoster = shuffleArray(roster);
    let circular = shuffledRoster.concat([shuffledRoster[0]]);
    const pairs = new Map();
    while (circular.length > 1) {
        console.log(`Will make pair of: ${circular[0]}, ${circular[1]}`);
        pairs.set(circular[0], circular[1]);
        circular.shift();
    }
    return pairs;
}


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/api/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/juanma/dev/fullstack/papa_noel_secreto/apps/api/src/main.ts */"./apps/api/src/main.ts");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map