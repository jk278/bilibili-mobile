// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            4.0-alpha.7
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  在 Via 与 Safari 打开电脑模式，获取舒适的移动端体验。
// @author             jk278
// @license            MIT
// @match              https://*.bilibili.com/*
// @grant              unsafeWindow
// @grant              GM_registerMenuCommand
// @grant              GM_getValue
// @grant              GM_setValue
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* ---------------------------------------------------- *
* ----------------------- 操作栏 ----------------------- *
* ---------------------------------------------------- */

/* 操作栏 */
#actionbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: var(--header-height);
    z-index: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: inherit;
    transition: .5s transform ease-in;
}

[scroll-hidden=true] #actionbar {
    transform: translateY(var(--header-height));
}

#actionbar>* {
    padding: 8px;
    opacity: 0;
    animation: fadeIn 1s ease-in forwards;
}

#my-top,
#refresh-fab {
    display: none;
}

#actionbar.home {

    #full-now,
    #sidebar-fab {
        display: none;
    }

    #my-top,
    #refresh-fab {
        display: block;
    }
}

#menu-fab {
    position: relative;
    background: inherit;
}

/* 底部菜单内容 */
#header-in-menu {
    position: absolute !important;
    bottom: calc(var(--header-height) + 5px);
    /* space-evenly : 20px 为底栏图标高度的一半*/
    left: calc((200vw + 20px) / 3);
    background-color: white;
    padding: 5px 0;
    white-space: nowrap;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    display: none;
    border-radius: 5px;
    font-size: 16px;
    transform: translate(-50%, calc(100% + 5px + var(--header-height)));
    opacity: 0;
    transition: .4s ease-in;

    li {
        list-style-type: none;
        padding: 5px 30px;
    }
}

#header-in-menu.show {
    display: block;
    transform: translateX(-50%);
    opacity: 1;
}

/* 底部菜单、侧边栏: layout */
#menu-overlay,
#sidebar-overlay,
#search-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    transition: background-color .4s ease-in;
}

#sidebar-overlay#sidebar-overlay {
    transition: background-color .6s ease-in;
}

#menu-overlay:has(>.show),
#sidebar-overlay.show,
#search-overlay.show {
    pointer-events: auto;
    background-color: rgba(0, 0, 0, .3);
}

/* --------------------- 其它适配 --------------------- */

/* 扩增载入后产生的骨架空位 */
.floor-single-card:has(.skeleton, .skeleton-item) {
    display: none;
}

/* 脚本设置窗口 */
.setting-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 1;
    border: 1px solid var(--line_regular);
    display: none;
    flex-direction: column;
    padding: 10px 5px;
    border-radius: 10px;
    font-size: 16px;
    max-height: calc(100vh - var(--header-height)* 2 - 10px);
    width: 260px;
    max-width: calc(100% - 20px);
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
}

.setting-panel.show {
    display: flex !important;
}

.setting-title {
    padding-bottom: 5px;
    margin: 0 5px;
    border-bottom: 1px solid var(--line_regular);
    text-align: center;
    color: var(--Ga7);
}

.setting-checkboxes {
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.setting-checkboxes label {
    margin: 5px;
    display: flex;
    align-items: center;
}

.setting-checkboxes span {
    flex-grow: 1;
    text-align: center;
}

.setting-checkboxes input[type="checkbox"] {
    width: 16px;
    height: 26px;
}

.setting-checkboxes input[type="number"] {
    width: 40px;
    appearance: textfield;
    height: 22px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

.setting-conform {
    margin: 2px 5px;
    border-radius: 15px;
    border: 1px solid var(--line_regular);
    padding: 2px;
    background-color: var(--graph_bg_thin) !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* -------------------------------------------------- 
   ------------------------ 顶栏 ----------------------- 
   -------------------------------------------------- */

/* #i_cecream 属首页，#app #biliMainHeader 属视频页 */

/* 顶栏外框 */
#biliMainHeader,
#bili-header-container {
    position: fixed;
    width: 100%;
    z-index: 62;
    transform: translateY(-100%);
}

/* 搜索页顶栏外框 */
#bili-header-container {
    background: unset !important;
}

/* 首页顶栏 */
.large-header .bili-header__bar {
    transform: translateY(-100%);
}

/* 搜索框 */
.center-search-container {
    position: absolute !important;
    width: 100%;
    left: 0;
    top: 64px;
    padding: 10px 20px 5px !important;
    z-index: 3;
    margin: 0 !important;
    display: none;
}

.center-search-container.show {
    display: block;
}

/* 移除顶部动图和临时静图 */
.animated-banner,
#bili-header-banner-img,
.biliheader__banner {
    display: none !important;
}

/* 使用 controlHeaderImage 获取随机头图 */

/* -------------------------------------------------- 
   ---------------------- 展开图类 --------------------- 
   -------------------------------------------------- */

.v-popover {
    position: fixed !important;
    top: 50vh !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    max-width: 100%;
    padding: 5px !important;
    left: 50% !important;
}

/* 取消分类图在加载过程中类的变化导致的横向平移从0到-50%的不好看的动画 */
.v-popover.is-bottom-start {
    transform: translate(-50%, -50%) !important;
}

/* 分类(左侧入口)展开图: 一列 */
.channel-panel__column {
    flex: 1;
    padding: 0 !important;
}

/* 右侧入口展开图 */
.dynamic-panel-popover,
.favorite-panel-popover,
.history-panel-popover {
    max-width: 100%;
    padding: 0 5px !important;
}

/* 动态展开图 */
.dynamic-video-item {
    margin-right: 0 !important;
}

.header-dynamic-list-item {
    padding: 0 !important;
}

.header-dynamic__box--center {
    max-width: 60%;
}

.header-dynamic__box--right {
    top: 0 !important;
    margin-bottom: 0 !important;
    width: unset !important;
    flex: 1;

    .cover {
        width: unset !important;
        height: unset !important;
    }
}

/* 收藏展开图 */
.favorite-panel-popover__nav {
    max-width: 25%;
}

.header-fav-card__image {
    max-width: 40%;

    picture {
        max-width: 100%;
        height: 100% !important;
    }
}

/* 间距（收藏展开图） */
.favorite-panel-popover__nav .tab-item {
    padding: 0 6px !important;
}

.header-fav-card {
    padding: 6px !important;
}

.favorite-panel-popover__nav {
    margin-top: 6px !important;
}

/* 历史展开图 */
.header-history-video {
    padding: 5px 10px !important;
}

/* 移除头像大图 */
.header-entry-avatar {
    display: none !important;
}

/* 关闭头像动画 */
.header-entry-mini {
    animation: unset !important;
}

/* 移除次要入口 */
.left-entry>li:not(:nth-of-type(1)),
.vip-wrap,
.right-entry-item:has(>.vip-wrap),
.right-entry-item:nth-of-type(6),
.right-entry-item--upload,
.header-channel,
.bili-header__channel,
.recommended-swipe,
.feed-roll-btn {
    display: none !important;
}

/* 广告、推广图块 */
/* 底部登录弹窗类 .lt-row 可能包含其它元素 */
/* 首页顶部动图上的大 Logo */
.container>*:has(.bili-video-card__info--ad),
.floor-single-card,
.desktop-download-tip,
.lt-row,
.header-banner__inner {
    display: none !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_home_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* ----------------------------------------------------
 ------------------------ 首页 ------------------------
 ----------------------------------------------------- */

body {
    /* 避免评论未加载时显示灰色 */
    background: white !important;

    /* 添加透明 animation 为 Via 预留加载 initViewport 的时间后，刷新加载出现白屏 */

    --header-height: 46px;
}

/* 双列视频 */
.recommended-container_floor-aside .container {
    grid-template-columns: repeat(2, 1fr) !important;
    padding: 5px;
    grid-gap: 5px !important;
    background: #f1f2f3;
}

/* 头图底色 */
.bili-header__banner {
    background-color: #f1f2f3 !important;
}

/* 显示根据屏宽隐藏的 feed */
.container>.feed-card {
    display: block !important;
}

/* 最小宽度（body、顶栏） */
body,
.bili-header,
.bili-header__banner {
    min-width: 0 !important;
}

/* 主页视频流 */
.bili-feed4-layout {
    width: 100% !important;
}

/* ----------------------------------------------------
 --------------------- 主页视频卡片 --------------------
 ----------------------------------------------------- */

.container>* {
    margin-top: 0 !important;
}

/* 卡片底板 */
.bili-video-card__wrap {
    border-radius: 5px;
}

/* 封面宽长比 */
.bili-video-card.is-rcmd {
    --cover-radio: 75% !important;
}

/* 封面圆角 */
.v-img.bili-video-card__cover {
    border-radius: 5px 5px 0 0;
}

/* 封面信息（阴影层圆角） */
.bili-video-card__stats {
    border-radius: 0 !important;
    --icon-size: 16px;
    --subtitle-font-size: 11px;
    white-space: nowrap;
}

/* 卡片标题 - 字样 */
.bili-video-card__info--tit {
    --title-padding-right: 0;
    --title-font-size: 14px;
    --title-line-height: 20px;
}

/* 标题 - 上下距 */
/* .bili-video-card__info  */

/* 标题 - 左右距 */
.bili-video-card__info--right {
    padding: 0 5px;
}

/* 标题 - 字重 */
/* .bili-video-card__info--tit > a */

/* 小标 */
.bili-video-card__info--bottom {
    --subtitle-font-size: 12px;
}

.bili-video-card__info--icon-text {
    padding: 0 5px !important;
}

/* 小标 - 日期 */
.bili-video-card__info--owner {
    flex: 1;
}

.bili-video-card__info--date {
    margin-left: auto !important;
}

/* 小标 - 点赞数 */
.bili-video-card__info--icon-text {
    --follow-icon-font-size: 11px;
    --follow-icon-line-height: 15px;
}

/* ----------------------------------------------------
 ------------------------- 按钮 -----------------------
 ----------------------------------------------------- */

/* 原首页按钮(置顶、刷新按钮):底层隐藏 -10 (同原全屏、音量按钮)(顶栏视口外隐藏) */
.palette-button-outer {
    z-index: -10;
    visibility: hidden;
}

/* 首页按钮组 */
.primary-btn,
span.btn-text-inner,
.storage-box {
    display: none !important;
}

/* ----------------------------------------------------
 ------------------------- 窗口 -----------------------
 ----------------------------------------------------- */

/* 登录窗 */
.login-scan-wp,
.bili-mini-line {
    display: none !important;
}

.bili-mini-content-wp {
    padding: 52px 0 29px !important;
}

.bili-mini-login-right-wp,
.bili-mini-login-right-wp * {
    max-width: 80vw;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_video_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_video_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_video_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_video_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_video_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* ----------------------------------------------------
  * ---------------------------------------------------- *
  * --------------------- 视频详情页 -------------------- *
  * ---------------------------------------------------- *
   ----------------------------------------------------- */

/* 主应用块 */
#app {
    overflow: hidden;
}

/* 主体内容块 */
.video-container-v1 {
    min-width: 0 !important;
    padding: 0 !important;
    top: 0;
}

/* ----------------------------------------------------
  * ---------------------- 主视频块 --------------------- *
   ----------------------------------------------------- */

/* 主视频块 */
.left-container {
    --video-min-height: calc(100vw * 0.5625);
    --dm-row-height: 44px;
}

/* 有初始内联 top */
/* 视频块（宽度） (#mainheight与header的高度差导致了64px-48px的可滚动区域) */
.left-container {
    /* 移动 Safari 百分比宽高自动考虑边框和填充 */
    box-sizing: border-box;
    width: 100% !important;

    /* 填充评论未加载时的空白，video-container-v1 已考虑顶部留空，但 #app 的高度把顶部重叠的部分加上了 */
    min-height: calc(100vh - var(--video-min-height));
    position: relative !important;
    padding: calc(var(--dm-row-height) + 5px) 10px 0 0;
    display: none;
}

/* ----------------------------------------------------
  * ----------------------- 推荐块 ---------------------- *
   ----------------------------------------------------- */

/* 推荐块(初始样式不要设transform，否则via在刷新时侧边栏出问题) */
.right-container {
    position: fixed !important;
    width: 85% !important;
    left: 85%;
    padding: 10px;
    margin: 0 0 0 15% !important;

    z-index: 76;
    background: white;
    transition: transform .6s ease-in;
    height: 100%;
    overflow-y: auto;
    /* 避免到达边界后的滚动事件穿透 */
    overscroll-behavior: contain;

    box-sizing: border-box;
    border-left: 1px solid var(--line_regular);
}

.right-container.show {
    transform: translateX(-100%);
}

.right-container-inner {
    padding: 0 !important;
}

/* UP信息 */
.upinfo-btn-panel .default-btn {
    font-size: 12px !important;
}

.new-charge-btn {
    max-width: 35%;
}

.follow-btn {
    max-width: 150px !important;
}

/* UP头像 */
/*.up-avatar-wrap .bili-avatar,
  .up-avatar-wrap {
    width: 38px !important;
    height: 38px !important;
  }*/

/* 推荐视频图块 */
#reco_list .card-box .pic-box {
    max-width: 50%;
}

/* --------------------------------------------------
 ---------------- 块状广告（整个视频页）---------------
 ---------------------------------------------------- */

#activity_vote,
#bannerAd,
.reply-notice,
.ad-report,
.pop-live-small-mode,
#slide_ad,
.video-page-game-card-small {
    display: none !important;
}

/* ---------------------------------------------------
 ----------------------- 播放器 -----------------------
 ----------------------------------------------------- */

/* 视频置顶 */
#playerWrap {
    position: fixed;
    z-index: 61;
    top: 0;
    left: 0;
    display: none;
}

#bilibili-player.mode-webscreen {
    width: 100% !important;
    height: 100% !important;
}

/* 小窗时的隐藏 - 始终隐藏*/
/* 顶部关注、音乐、反馈 */
/* 右下角暂停图标 */
/* 取消静音 */
.bpx-player-top-wrap,
.bpx-player-state-wrap,
.bpx-player-toast-wrap {
    display: none !important;
}

/* 小窗时的隐藏 - 固定显示*/
/* 视频控制栏 */
/* 弹幕行 */
/* .bpx-player-control-wrap,
.bpx-player-sending-area {
    display: block !important;
} */

/* 小窗时的隐藏：定位、解除静音、点赞关注等弹窗 */
.bpx-player-toast-wrap {
    bottom: unset !important;
    top: 50%;
    transform: translateY(-50%);
}

/* 小窗按钮 */
.mini-player-window {
    position: fixed;
    z-index: -10;
    visibility: hidden;
}

/* 客服按钮 */
.customer-service {
    display: none !important;
}

/* 窄屏不隐藏控制条和阴影 */
.bpx-player-control-entity,
.bpx-player-control-mask {
    display: block !important;
}

/* 移除次要按钮：画中画、宽屏、时间、选集 */
.bpx-player-ctrl-pip,
.bpx-player-ctrl-wide,
.bpx-player-ctrl-time,
.bpx-player-ctrl-eplist {
    display: none !important;
}

/* 横屏时恢复时间显示 */
@media screen and (orientation: landscape) {
    .bpx-player-ctrl-time {
        display: block !important;
    }
}

/* 左右控制区 */
.bpx-player-control-bottom-left,
.bpx-player-control-bottom-right {
    flex: unset !important;
}

/* 全屏时 */
.bpx-player-container .bpx-player-control-bottom-left,
.bpx-player-container .bpx-player-control-bottom-right {
    min-width: 0 !important;
}

/* 清晰度(width:auto 不换行，隐藏不掉高清字样) */
.bpx-player-ctrl-quality {
    margin-right: 0 !important;
    min-width: 0;
    flex: auto !important;
}

/* 清晰度、倍速文本 */
.bpx-player-ctrl-quality-result,
.bpx-player-ctrl-playbackrate {
    font-size: 12px !important;
}

/* 清晰度文本:隐藏换行的部分 */
.bpx-player-ctrl-quality-result {
    height: 22px;
    overflow: hidden;
}

/* 倍速文本:禁止换行 */
.bpx-player-ctrl-playbackrate {
    text-wrap: nowrap;
}

/* 清晰度文本:全屏时恢复大小 */
@media screen and (min-width: 750px) {
    .bpx-player-container[data-screen=full] .bpx-player-ctrl-quality-result {
        font-size: 16px !important;
        height: unset !important;
    }
}

/* 按钮区(图标22px，算 margin 37px) */
.bpx-player-control-bottom {
    height: 29px !important;
    margin-top: 7px !important;
    padding: 0 7px !important;
}

/* 进度条 */
.bpx-player-control-top {
    bottom: 36px !important;
}

/* 修复部分情况下的控制栏图标增大导致的高度过高 */
@media screen and (min-width: 750px) {
    .bpx-player-container[data-screen=full] {
        .bpx-player-control-wrap {
            height: 43px !important;
        }

        .bpx-player-control-top {
            bottom: 43px !important;
        }
    }
}

/* 进度条细条包含块（高12px） */
.bpx-player-progress-wrap {
    height: 7px !important;
    padding-bottom: 3px !important;
}

/* 阴影(控制栏展开时: 高能区 100% - 1px) */
.bpx-player-pbp {
    bottom: 1px !important;
}

.bpx-player-pbp.show {
    bottom: calc(100% + 6px) !important;
}

/* 替换via暗色异常的阴影 */
.bpx-player-control-mask {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 100%) !important;
}

/* 清晰度弹窗 */
.bpx-player-ctrl-quality-menu-wrap {
    bottom: 0 !important;
    max-height: var(--video-min-height) !important;
}

/* 倍速弹窗 */
.bpx-player-ctrl-playbackrate-menu-item {
    height: 30px !important;
    line-height: 30px !important;
}

/* 设置弹窗 */
.bpx-player-ctrl-setting-box {
    right: 0 !important;
    bottom: 0 !important;
}

/* 更多设置 */
.bpx-player-ctrl-setting-menu-right {
    padding: 5px !important;
    max-height: var(--video-min-height) !important;
}

/* 更多设置 */
.bui.bui-radio.bui-dark {
    margin-bottom: 5px !important;
}

/* 弹幕设置弹窗 */
.bpx-player-dm-setting-wrap {
    bottom: unset !important;
    top: 0;
    position: fixed !important;
    left: 50%;
    transform: translateX(-50%);
}

/* 全屏控制栏 */
.bpx-player-control-bottom-center .bpx-player-sending-bar {
    padding-right: 6px !important;
    height: 24px !important;
}

/* 存在章节时(允许章节缩小) */
.bpx-player-ctrl-viewpoint {
    margin: 0 !important;
    min-width: 0 !important;
    width: 45px !important;
    flex-shrink: 1 !important;
}

.bpx-player-ctrl-viewpoint-text {
    width: 24px !important;
    text-overflow: unset !important;
    font-size: 12px;
    flex: none;
}

/* ----------------------------------------------------
  * ----------------------- 弹幕行 ---------------------- *
   ----------------------------------------------------- */

/* 弹幕行：滚动隐藏 */
.bpx-player-sending-area {
    position: absolute !important;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);

    transition: 0.5s transform ease-in;
    display: block !important;
    z-index: 0;
}

[scroll-hidden=true] .bpx-player-sending-area {
    transform: none;
}

.bpx-player-video-area {
    z-index: 1;
}

/* 修改小窗样式的时候把这行删了，导致弹幕行显示异常 */
.bpx-player-container[data-screen=mini] {
    overflow: unset !important;
}

/* 弹幕行预加载灰块白条(视频底下也有，预加载有时会看到) */
.bpx-player-sending-bar-left,
.bpx-player-sending-bar-right,
#bilibili-player-placeholder-bottom {
    display: none !important;
}

/* 弹幕行高度 */
.bpx-player-sending-bar {
    height: var(--dm-row-height) !important;
}

.bpx-player-dm-input {
    height: 26px !important;
}

/* 弹幕输入栏外 */
.bpx-player-video-inputbar {
    height: 26px !important;
    border-radius: 13px !important;

    min-width: 0 !important;
}

.bpx-player-video-inputbar-wrap {
    width: 100% !important;
}

/* 不输入隐藏发送 */
.bpx-player-dm-btn-send {
    display: none !important;
}

.bpx-player-video-inputbar-wrap:has(>input:focus)+.bpx-player-dm-btn-send {
    display: flex !important;
}

.bpx-player-dm-btn-send {
    border-radius: 0 13px 13px 0 !important;
    height: 26px !important;
    min-width: 50px !important;
    width: 50px !important;
}

.bui-button-blue {
    min-width: 50px !important;
}

/* 观看人数 */
.bpx-player-video-info {
    margin-right: 6px !important;
}

/* 弹幕数量、弹幕礼仪 */
.bpx-player-video-info-divide,
.bpx-player-video-info-dm,
.bpx-player-dm-hint {
    display: none !important;
}

/* ----------------------------------------------------
  * ---------------------- 播放页组件 ------------------- *
   ----------------------------------------------------- */

/* 信息块（标题） */
.video-info-container {
    height: auto !important;
    padding-top: 0 !important;
}

/* 标题（可两行显示） */
.video-title {
    font-size: 18px !important;

    white-space: wrap !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    /* 去除折叠时的 show-more 按钮 margin */
    margin-right: 0 !important;
}

.show-more {
    top: unset !important;
    transform: none !important;
    bottom: 4px;
    right: 4px !important;
}

.video-desc-container {
    margin: 10px 0 !important;
}

/* 热门排行标签 */
.honor-rank {
    position: absolute;
    align-self: start !important;
}

.video-info-detail-list:has(.honor-rank) {
    height: 48px !important;
    align-items: end !important;
    margin-right: 5px !important;
}

.pubdate-ip {
    display: block !important;
}

.video-info-detail-list .item {
    margin-right: 4px !important;
}

/* 点赞投币行 */
.video-toolbar-container {
    padding: 10px 0 8px !important;
}

.video-toolbar-left,
.video-toolbar-left-main {
    min-width: 0;
}

.toolbar-left-item-wrap {
    flex: 1;
    min-width: 0;
}

.video-toolbar-container * {
    margin: 0 !important;
}

.toolbar-left-item-wrap span {
    padding-left: 2px;
}

.video-share-info {
    width: 40px !important;
}

.video-share-popover {
    display: none !important;
}

/* AI 助手“测试版”字样 */
.video-ai-assistant-badge {
    display: none !important;
}

/* AI 总结 */
.resizable-component.resizable-component {
    width: 100% !important;
    left: 0 !important;
    position: fixed !important;
    height: 100vw !important;
    top: 50% !important;
    transform: translateY(-50%);
}

/* 简介 */
.video-desc-container .toggle-btn {
    text-align: right;
    margin-right: 7px;
}

.basic-desc-info[style="height: 84px;"] {
    height: 70px !important;
}

/* 标签 */
.video-tag-container {
    margin: 6px 0 0 !important;
    padding-bottom: 1px !important;
}

.tag-panel .tag {
    margin-bottom: 6px !important;
    opacity: 0;
    animation: fadeIn 1s ease-in 2s forwards;
}

/* 投票卡片 */
.top-vote-card-left {
    width: unset !important;
    max-width: unset !important;
}

/* ----------------------------------------------------
  * ----------------- 播放组件（评论以下） -------------- *
   ----------------------------------------------------- */

@keyframes fadeIn {
    form {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* 固定评论栏 */
.main-reply-box {
    position: fixed;
    left: 0;
    bottom: var(--header-height);
    z-index: 10;
    background: white;
    width: 100%;
    padding: 8px 12px;
    border-top: 1px solid var(--line_regular);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    transition: .75s transform ease-in;
    display: block !important;
}

/* 评论行滚动隐藏 */
[scroll-hidden=true] .main-reply-box {
    transform: translateY(calc(100% + var(--header-height)))
}

/* 移除原底部评论栏 */
.fixed-reply-box {
    display: none !important;
}

/* 移除评论头像 */
.reply-box-avatar {
    display: none !important;
}

/* 输入块外 */
.reply-box-warp {
    border-radius: 13px !important;
}

/* 输入块内 */
.textarea-wrap {
    padding: 0 !important;
}

/* 文字输入 */
.reply-box-textarea {
    height: 26px !important;
    line-height: 26px !important;
    min-height: 26px !important;
}

/* 输入展开块 */
.main-reply-box .reply-box .box-expand[data-v-a6daab22] {
    height: 26px;
    margin: 8px 0 0 0;
}

/* 插入表情图片 */
.box-left {
    flex: 1;
    justify-content: space-evenly !important;
}

/* 点击发送 */
.reply-box-send {
    width: 50px !important;
    height: 26px !important;
}

/* 评论块 */
#comment {
    margin-top: 12px !important;
}

/* 评论导航 */
.reply-navigation {
    margin-bottom: 0 !important;
}

/* 评论 */
.root-reply-container {
    padding: 12px 0 0 36px !important;
}

.root-reply-avatar,
.root-reply-avatar .bili-avatar {
    width: 36px !important;
    height: 36px !important;
}

.user-info {
    margin: 3px 5px 0 !important;
}

/* 回复评论 */
.sub-reply-container {
    padding-left: 28px !important;
}

.sub-reply-item {
    padding: 4px 0 4px 37px !important;
}

/* 评论举报操作按钮 */
.reply-operation-warp {
    display: block !important;
    right: 4px !important;
}

.sub-reply-operation-warp {
    opacity: 1 !important;
    right: 4px !important;
}

.reply-info,
.sub-reply-info {
    font-size: 12px !important;
}

.reply-info>* .sub-reply-info>* {
    margin: 0 3px !important;
}

/* 评论图片 */
.reply-view-image .show-image-wrap {
    padding: 0 0 145px !important;

    .image-content {
        width: 100% !important;
    }
}

.reply-view-image .operation-btn {

    .last-image,
    .next-image,
    .close-container {
        top: unset !important;
        bottom: 100px;
    }

    .last-image,
    .next-image {
        transform: none !important;
    }

    .close-container {
        right: 50% !important;
        transform: translateX(50%);
    }

    .last-image {
        left: 20vw !important;
    }

    .next-image {
        right: 20vw !important;
    }
}

/* 评论投票 */
.vote-dialog {
    max-width: calc(100% - 10px);
}

/* ----------------------------------------------------
 ------------------------- 按钮 -----------------------
 ----------------------------------------------------- */

/* 视频页返回顶部按钮（添加渐变） */
/* 权重：基本设置属性 < transition < animation */
.back-to-top {
    border-radius: 0 25% 25% 0 !important;
    border-left: 0 !important;
    margin-bottom: 0 !important;
    width: 42px !important;

    visibility: visible !important;
    transform: translateX(-100%);
    transition: transform .5s ease-in-out;
}

.back-to-top.visible {
    transform: none;
}

/* 回顶按钮的位置 */
.fixed-sidenav-storage {
    left: 0;
    right: unset !important;
    bottom: 78px !important;
    z-index: 1 !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_search_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 18 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* ----------------------------------------------------
 ---------------------- 搜索页 ------------------------ 
 ---------------------------------------------------- */

#i_cecream {
    min-width: 0 !important;
}

/* 分类和另几个包含块 */
.i_wrapper {
    padding: 0 5px !important;
}

/* 分类 */
.vui_tabs--nav-link {
    padding: 0 1px !important;
    flex-wrap: wrap;
    justify-content: center !important;
}

ul.vui_tabs--nav>* {
    flex: 1;
}

/* 广告 */
.activity-game-list {
    display: none;
}

/* 排序筛选 */
.search-conditions.i_wrapper {
    margin-top: 8px !important;
}

.search-condition-row .vui_button--tab {
    width: 33.3%;
    margin: 0 !important;
}

.search-condition-row {
    width: 100%;
}

.conditions-order {
    position: relative;
}

.conditions-order .i_button_more {
    position: absolute;
    bottom: 0;
    left: 66.6%;
    padding-left: 23px !important;
    border: 0;
    width: 33.3%;
}

/* 搜索框 */
body .search-layout .search-header .search-input.search-input {
    margin: 10px 0 0 !important;
    padding: 0 5px;
}

/* 禁止搜索框 fixed */
body .search-input .search-input-container .search-fixed-header {
    min-width: 0 !important;
    position: unset !important;
    width: 100% !important;
    margin: 0 !important;
    height: 30px !important;
}

.search-input-wrap {
    height: 30px !important;
    border-radius: 15px !important;
    padding: 0 !important;
}

.search-button {
    height: 30px !important;
    border-radius: 0 15px 15px 0 !important;
    padding: 0 10px !important;
    width: 80px !important;
}

/* 视频结果 */
.video-list>div {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 4px !important;
    margin-bottom: 10px;
}

/* 结果块外 padding */
.search-content {
    padding: 0 5px !important;
}

/* 结果块内 */
.search-page-wrapper .search-page {
    margin-top: 8px !important;
    padding-bottom: 0 !important;
}

/* 页数 */
.search-page .flex_center {
    margin: 5px 0 !important;
}

.vui_pagenation--btns {
    flex-wrap: wrap;
}

.vui_pagenation--btns>*:not(last-child) {
    margin: 0 5px 5px !important;
}

.vui_pagenation--btn-side {
    padding: 0 5px;
    flex: 1 0 20%;
    margin-bottom: 5px;
}

.vui_pagenation--btn-num {
    flex: 1 0 12% !important;
}

span.vui_pagenation--extend {
    flex: 1 0 15% !important;
}

/* 搜索页底部 */
.link-box {
    flex-direction: column;
    margin: 0 10px !important;
}

.bili-footer {
    min-width: 0 !important;
    padding: 5px 0 var(--header-height) !important;
}

.b-footer-wrap {
    min-width: 0 !important;
    margin: 0 5px !important;
}

.link-box {
    flex-direction: column;
}

.link-box>* {
    max-width: 100%;
}

.link-item__right,
.other-link,
.footer-icons {
    display: none !important;
}

/* 影视 */
.media-item-col,
.media-list .col_6 {
    max-width: 100% !important;
    flex: none !important;
    margin-bottom: 10px !important;
    padding: 0 !important;
}

.show-more-text {
    margin: 10px 0 20px !important;
    z-index: 1 !important;
}

.media-item {
    padding: 0 !important;
}

.media-card {
    --image-width: 103px !important;
    --image-height: 139px !important;
    --image-mg-r: 10px !important;
    margin-right: 10px !important;
    --content-head-title-size: 14px !important;
    --content-title-mg-b: 0 !important;
    --content-text-mg-b: 0 !important;
}

.media-card-content-footer-btns {
    --pgc_btn_size: 13px !important;
    --pgc_btn_w: 70px !important;
    --pgc_btn_h: 28px !important;
}

.media-card-content-head-text {
    line-height: 15px !important;
}

/* 位置异常的 logo */
.search-logo.p_center_y {
    display: none;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_user_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_user_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_user_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_user_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_user_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 20 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* ----------------------------------------------------
 --------------------- 个人主页 ----------------------- 
 ----------------------------------------------------- */

.wrapper {
    width: 100% !important;
}

.content {
    max-width: 100%;
}

#page-index .col-1 {
    max-width: 100%;
    padding: 0 !important;
}

.channel-video {
    white-space: wrap !important;
}

.small-item {
    width: calc(50% - 10px);
    padding: 0 5px !important;
}

.small-item .cover {
    width: 100% !important;
    height: auto !important;
}

#i-masterpiece {
    margin-left: 0 !important;
}

#page-index .fav-item {
    margin: 0 10px !important;
}

#page-fav .fav-main {
    width: 100% !important;
}

.n .n-inner {
    display: flex;
    flex-wrap: wrap;
    height: auto !important;
    padding: 0 !important;
}

.n-tab-links>* {
    margin: 0 !important;
}

.n-data {
    padding: 0 5px !important;
    height: auto !important;
}

.n-statistics {
    height: auto !important;
}

.n .n-btn {
    height: auto !important;
    line-height: 30px !important;
}

.n-tab-links {
    white-space: nowrap;
    overflow: auto;
}

.favInfo-details {
    max-width: 60%;
    margin-left: 5px !important;
}

.fav-options>* {
    margin: 0 !important;
}

.favList-info {
    padding: 0 !important;
    margin: 0 10px !important;
}

.n-cursor {
    bottom: 35px !important;
}

.navigator-fixed {
    display: none;
}

span.length {
    z-index: 1 !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 21 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initViewport: () => (/* binding */ initViewport)
/* harmony export */ });
function initViewport () {
  if (document.head) {
    function addViewportMeta () {
      const viewport = document.createElement('meta')
      viewport.setAttribute('name', 'viewport')
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
      document.head.appendChild(viewport)
    }

    addViewportMeta()

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node.nodeName === 'META' && node.getAttribute('name') === 'viewport') {
            addViewportMeta()
          }
        })
      })
    })

    observer.observe(document.head, {
      childList: true
    })
  }
}


/***/ }),
/* 22 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   increaseVideoLoadSize: () => (/* binding */ increaseVideoLoadSize),
/* harmony export */   preventBeforeUnload: () => (/* binding */ preventBeforeUnload),
/* harmony export */   scrollToHidden: () => (/* binding */ scrollToHidden)
/* harmony export */ });
// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次
// 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用

function preventBeforeUnload () {
  const originalAddEventListener = window.addEventListener
  // 重写 addEventListener 方法，禁止网站刷新时的弹窗
  window.addEventListener = (type, listener, options) =>
    type === 'beforeunload' ? undefined : originalAddEventListener.call(this, type, listener, options)
}

// 增加视频加载数量函数
function increaseVideoLoadSize () {
  const origFetch = _unsafeWindow.fetch
  _unsafeWindow.fetch = function (input, init) {
    if (typeof input === 'string' && input.includes('api.bilibili.com') && input.includes('feed/rcmd') && init.method.toUpperCase() === 'GET') {
      input = input.replace('&ps=12&', '&ps=30&')
    }
    return origFetch(input, init)
  }
}

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
function scrollToHidden () {
  let lastScrollTop = 0
  const scrollThreshold = 75

  _unsafeWindow.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY

    const offset = currentScrollTop - lastScrollTop
    const scrollHidden = offset > scrollThreshold ? 'true' : ''
    const shouldUpdate = Math.abs(offset) > scrollThreshold || currentScrollTop < scrollThreshold

    if (shouldUpdate) {
      document.body.setAttribute('scroll-hidden', scrollHidden)
      lastScrollTop = currentScrollTop
    }
  })
}


/***/ }),
/* 23 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleScriptPreSetting: () => (/* binding */ handleScriptPreSetting),
/* harmony export */   handleScriptSetting: () => (/* binding */ handleScriptSetting)
/* harmony export */ });
function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }
function ensureHeadGetted (element) { document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element)) }

// 脚本预加载设置
function handleScriptPreSetting () {
  const defaultValue = [0, 0, 0, 0, 0, 0]

  const css = {
    css1: `
      .bpx-player-sending-area.bpx-player-sending-area {display:none !important;}
      .left-container.left-container {padding:5px 10px 0;}
      .main-reply-box.main-reply-box {display:none !important;}
    `,
    css2: '#v_tag {display:none !important;}',
    css3: `
      .copyright.item {display:none !important;}
      .show-more {display:none;}`,
    css4: '.trending {display:none;}',
    css5: '.bpx-player-ctrl-volume, .bpx-player-ctrl-full, .bpx-player-ctrl-web {position:fixed !important; z-index:-10; visibility:hidden;}',
    css6: '.bpx-player-contextmenu {display:none;}'
  } // 对象的值可通过 object[key] 获取

  readScriptSetting()

  waitDOMContentLoaded(() => {
    createSettingPanel()

    // eslint-disable-next-line no-undef
    GM_registerMenuCommand('元素隐藏设置', () => {
      document.getElementById('setting-panel-style').classList.add('show')
    })
  })

  // 形参 diference 隐式声明成 let
  function readScriptSetting (diference) {
    const settingShowHidden = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
    const values = Object.values(css) // 可枚举属性值，返回 [v1, v2]

    if (diference) {
      for (const [index, value] of diference.entries()) { // 可枚举属性，对数组使用获得元素为索引加值的二维数组，返回 [ [1,v1], [2,v2] ]
        if (value) {
          if (settingShowHidden[index]) {
            const scriptPreStyle = Object.assign(document.createElement('style'), {
              id: `script-pre-style-${index}`,
              textContent: values[index]
            })
            ensureHeadGetted(scriptPreStyle)
          } else {
            document.head
              ? document.getElementById(`script-pre-style-${index}`)?.remove()
              : waitDOMContentLoaded(document.getElementById(`script-pre-style-${index}`))
          }
        }
      }
    } else {
      for (const [index, value] of values.entries()) {
        if (settingShowHidden[index]) {
          const scriptPreStyle = Object.assign(document.createElement('style'), {
            id: `script-pre-style-${index}`,
            textContent: value
          })
          ensureHeadGetted(scriptPreStyle)
        }
      }
    }
  }

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-style',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">隐藏元素</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox"><span>弹幕行与评论行</span></label>
          <label><input type="checkbox"><span>标签块</span></label>
          <label><input type="checkbox"><span>转载声明</span></label>
          <label><input type="checkbox"><span>热搜榜</span></label>
          <label><input type="checkbox"><span>播放器全屏音量键</span></label>
          <label><input type="checkbox"><span>视频色彩音效调节</span></label>
        </div>
        `
    })

    const settingConform = Object.assign(document.createElement('button'), {
      className: 'setting-conform',
      textContent: '确认'
    })

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    const oldValues = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
    for (const [index, element] of checkboxElements.entries()) {
      element.checked = oldValues[index]
    }
    // for (const [index, value] of oldValueEntries) {
    //   checkboxElements[index].checked = value
    // }

    settingConform.addEventListener('click', () => {
      const oldValues = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
      const selectedValues = Array.from(checkboxElements).map((checkbox) => (checkbox.checked ? 1 : 0))

      localStorage.setItem('settingShowHidden', JSON.stringify(selectedValues))
      const difference = selectedValues.map((value, index) => (value === oldValues[index] ? 0 : 1))

      readScriptSetting(difference)

      settingPanel.classList.remove('show')
    })

    settingPanel.appendChild(settingConform)
    document.body.appendChild(settingPanel)
  }
}

// 脚本设置
function handleScriptSetting () {
  const keyValue = {
    key1: 'full-unmuted',
    key2: 'ban-action-hidden',
    key3: 'custom-longpress-speed'
  }

  if ((localStorage.getItem('ban-action-hidden') || '0') === '1') {
    banActionHidden()
  }

  function banActionHidden () {
    const style = Object.assign(document.createElement('style'), {
      id: 'ban-action-hidden',
      textContent: `
        [scroll-hidden=true] #actionbar,
        [scroll-hidden=true] .flexible-roll-btn-inner,
        [scroll-hidden=true] .top-btn {
          transform: none !important;
        }
      `
    })
    ensureHeadGetted(style)
  }

  waitDOMContentLoaded(() => {
    createSettingPanel()

    // eslint-disable-next-line no-undef
    GM_registerMenuCommand('操作偏好设置', () => {
      document.getElementById('setting-panel-preference').classList.add('show')
    })
  })

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-preference',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">操作偏好</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox"><span>用底部全屏键播放和打开声音</span></label>
          <label><input type="checkbox"><span>禁止底栏滚动时隐藏</span></label>
          <label><input type="number" value="2"><span>自定义视频长按倍速</span></label>
        </div>
        `
    })

    const settingConform = Object.assign(document.createElement('button'), {
      className: 'setting-conform',
      textContent: '确认'
    })

    const speedIndex = 2

    const values = Object.values(keyValue) // 返回 [v1, v2]
    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    for (const [index, value] of values.entries()) { // 返回 [ [1,v1], [2,v2] ]
      if (index !== speedIndex) {
        checkboxElements[index].checked = localStorage.getItem(value) === '1'
      }
    }
    settingPanel.querySelector('input[type="number"]').value = Number(localStorage.getItem(values[speedIndex]) || '2')

    settingConform.addEventListener('click', () => {
      const isBanActionHidden = localStorage.getItem('ban-action-hidden') || '0'

      for (const [index, value] of values.entries()) {
        if (index !== speedIndex) {
          localStorage.setItem(value, checkboxElements[index].checked ? '1' : '0')
        }
      }
      localStorage.setItem(values[speedIndex], settingPanel.querySelector('input[type="number"]').value)
      settingPanel.classList.remove('show')

      const newIsBanActionHidden = localStorage.getItem('ban-action-hidden')
      if (newIsBanActionHidden !== isBanActionHidden) {
        if (newIsBanActionHidden === '1') {
          banActionHidden()
        } else {
          document.getElementById('ban-action-hidden').remove()
        }
      }
    })

    settingPanel.appendChild(settingConform)
    document.body.appendChild(settingPanel)
  }
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleHeaderImage: () => (/* binding */ handleHeaderImage)
/* harmony export */ });
// 控制首页头图函数
function handleHeaderImage () {
  const key = 'header-image'
  const url = 'https://source.unsplash.com/random/840x400'
  const elementSelector = '.bili-header__banner'

  loadImage(key, elementSelector)

  setTimeout(async () => {
    try {
      const img = await getImage(url)
      const base64Data = imageToBase64(img)
      storeImage(key, base64Data)
    } catch (error) {
      console.error('Failed to get image:', error)
    }
  }, 5000)

  function getImage (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = url
      img.onload = () => resolve(img)
      img.onerror = reject
    })
  }

  function imageToBase64 (img) {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL('image/jpeg')
  }

  function storeImage (key, base64Data) {
    localStorage.setItem(key, base64Data)
  }

  function loadImage (key, elementSelector) {
    const base64Data = localStorage.getItem(key)
    if (base64Data) {
      const style = document.createElement('style')
      style.innerHTML = `
          ${elementSelector}::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-image: url(${base64Data});
            background-size: cover;
            background-position: center;
          }
        `
      document.head.appendChild(style)
    } else {
      // 如果本地存储中不存在图片数据，则从 URL 中获取图片
      getImage(url).then((img) => {
        const base64Data = imageToBase64(img)
        storeImage(key, base64Data)
        loadImage(key, elementSelector)
      }).catch((error) => {
        console.error('Failed to get image:', error)
      })
    }
  }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   videoInteraction: () => (/* binding */ videoInteraction)
/* harmony export */ });
// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

function videoInteraction () {
  dynamicHeight()
  handlelVideoClick()
  handleVideoLongPress()
}

function dynamicHeight () {
  const player = document.querySelector('#bilibili-player')
  const style = window.getComputedStyle(player)
  const width = style.getPropertyValue('width')
  const height = style.getPropertyValue('height')
  const newHeight = parseInt(height) / parseInt(width) * 100
  player.style.cssText = `width:100vw; height:${newHeight}vw;`

  const playerWrap = document.querySelector('#playerWrap')
  playerWrap.style.cssText = `height:${newHeight}vw; display:block`

  // querySelector 在元素加载后使用才能获取到
  const leftContainer = document.querySelector('.left-container')
  leftContainer.style.cssText = `top:${newHeight}vw; display:block`
  // 顶部下滑，style 中的 top 会清空
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.target.style.top === '' && (leftContainer.style.top = `${newHeight}vw`)
    })
  }).observe(leftContainer, { attributes: true, attributeFilter: ['style'] })

  // getElement 提前使用在元素加载后能获取到
  const miniPlayerBtn = document.getElementsByClassName('mini-player-window')[0]
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.target.classList.contains('on') && miniPlayerBtn.click()
    })
  }).observe(miniPlayerBtn, { attributes: true, attributeFilter: ['class'] })
}

// 接管视频点击事件
function handlelVideoClick () {
  const video = document.getElementsByClassName('bpx-player-video-wrap>video')[0]
  if (video) video.playsInline = true

  const playerContainer = document.getElementsByClassName('bpx-player-container')[0]
  playerContainer.addEventListener('click', handleClick)
  const controlWrap = document.getElementsByClassName('bpx-player-control-wrap')[0]

  let clickTimer = null

  function handleClick () {
    simulateMouseEnter(controlWrap)

    if (clickTimer) {
      clearTimeout(clickTimer)
    }

    clickTimer = setTimeout(() => {
      simulateMouseLeave(controlWrap)
    }, 5000)
  }

  function simulateMouseEnter (element) {
    const event = new MouseEvent('mouseenter', { bubbles: true, view: _unsafeWindow })
    element.dispatchEvent(event)
  }

  function simulateMouseLeave (element) {
    const event = new MouseEvent('mouseleave', { bubbles: true, view: _unsafeWindow })
    element.dispatchEvent(event)
  }
}

function handleVideoLongPress () {
  const video = document.querySelector('video')
  let isLongPress = false
  let timeoutId
  let times

  video.addEventListener('touchstart', () => {
    times = Number(localStorage.getItem('custom-longpress-speed') || '2')
    timeoutId = setTimeout(() => {
      video.playbackRate = video.playbackRate * times
      isLongPress = true
    }, 500)
  })

  video.addEventListener('touchmove', () => {
    clearTimeout(timeoutId)
  })

  video.addEventListener('touchend', () => {
    clearTimeout(timeoutId)

    if (isLongPress) {
      video.playbackRate = video.playbackRate / times
      isLongPress = false
    }
  })
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleActionbar: () => (/* binding */ handleActionbar),
/* harmony export */   handleSidebar: () => (/* binding */ handleSidebar)
/* harmony export */ });
// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

// 操作栏
function handleActionbar () {
  const actionbar = Object.assign(document.createElement('div'), {
    id: 'actionbar',
    /* html */
    innerHTML: `
      <div id="full-now">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(3.6,4.2)" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>
      </div>
      <div id="my-top">
        <svg width="24" height="24" viewBox="0 0 296 296" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(17,18)" stroke="currentColor" stroke-width="1" d="M110.69055,37.98071a20.00016,20.00016,0,0,1,34.6189,0l87.97632,151.99243a19.99992,19.99992,0,0,1-17.30957,30.019H40.0238a19.99992,19.99992,0,0,1-17.30957-30.019L110.69055,37.98071M128,36a11.879,11.879,0,0,0-10.38562,5.98853L29.63806,193.981A11.99988,11.99988,0,0,0,40.0238,211.99219H215.9762A11.99988,11.99988,0,0,0,226.36194,193.981L138.38562,41.98853A11.879,11.879,0,0,0,128,36Z"/></svg>
      </div>
      <div id="my-home">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path></svg>
      </div>
      <div id="search-fab">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>
      </div>
      <div id="menu-fab">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
      </div>
      <div id="sidebar-fab">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
      </div>
      <div id="refresh-fab">
        <svg width="24" height="24" viewBox="0 0 29 29" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(2.3,2.8)" d="M21.3687 13.5827C21.4144 13.3104 21.2306 13.0526 20.9583 13.0069C20.686 12.9612 20.4281 13.1449 20.3825 13.4173L21.3687 13.5827ZM12 20.5C7.30558 20.5 3.5 16.6944 3.5 12H2.5C2.5 17.2467 6.75329 21.5 12 21.5V20.5ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V2.5C6.75329 2.5 2.5 6.75329 2.5 12H3.5ZM12 3.5C15.3367 3.5 18.2252 5.4225 19.6167 8.22252L20.5122 7.77748C18.9583 4.65062 15.7308 2.5 12 2.5V3.5ZM20.3825 13.4173C19.7081 17.437 16.2112 20.5 12 20.5V21.5C16.7077 21.5 20.6148 18.0762 21.3687 13.5827L20.3825 13.4173Z"/><path transform="translate(2.3,2.9)" d="M20.4716 2.42157V8.07843H14.8147"/></svg>
      </div>
      `
  })

  document.body.appendChild(actionbar)

  if (window.location.pathname === '/') {
    actionbar.classList.add('home')

    setTopBtn()
    setRefreshBtn()
  }

  if (window.location.pathname.startsWith('/video')) {
    setFullbtn()
  }

  setHomeBtn()
  setSearchBtn()
  setMenuBtn()

  function setFullbtn () {
    const fullBtn = document.getElementById('full-now')
    fullBtn.addEventListener('click', () => {
      const video = document.querySelector('video')
      // 等于符号优先级更高
      if ((localStorage.getItem('full-unmuted') || '0') === '1') {
        video.play()
        video.muted = false
        if (video.volume === 0) {
          document.querySelector('.bpx-player-ctrl-muted-icon').click()
        }
      }
      fullScreen()
      function fullScreen () {
        const video = document.querySelector('video')
        const isPortrait = video.videoWidth / video.videoHeight < 1
        const btnSelector = isPortrait ? '.bpx-player-ctrl-web' : '.bpx-player-ctrl-full'
        const rawFullBtn = document.querySelector(btnSelector)
        if (rawFullBtn) {
          rawFullBtn.click()
          if (isPortrait) {
            rawFullBtn.style.cssText = 'position:relative !important; visibility:visible;'
            rawFullBtn.addEventListener('click', () => { rawFullBtn.style.cssText = '' })
          }
        } else {
          setTimeout(fullScreen, 500)
        }
      }
    })
  }

  function setTopBtn () {
    const topBtn = document.getElementById('my-top')
    topBtn.addEventListener('click', () => {
      toTop()
      function toTop () {
        const rawTopBtn = document.querySelector('.top-btn')
        rawTopBtn ? rawTopBtn.click() : setTimeout(toTop, 500)
      }
    })
  }

  function setHomeBtn () {
    const home = document.getElementById('my-home')
    home.addEventListener('click', () => { window.location.href = 'https://www.bilibili.com/' })
  }

  function setSearchBtn () {
    const searchFab = document.getElementById('search-fab')

    const searchOverlay = document.createElement('div')
    searchOverlay.id = 'search-overlay'
    searchFab.appendChild(searchOverlay)

    searchFab.addEventListener('click', () => {
      const searchbarContainer = document.querySelector('.center-search-container')

      searchbarContainer.classList.add('show')
      searchbarContainer.querySelector('input').focus()
      searchOverlay.classList.add('show')
      searchFab.style.zIndex = '1'

      searchOverlay.addEventListener('click', event => {
        // 事件完成后立即冒泡
        event.stopPropagation()
        searchbarContainer.classList.remove('show')
        searchOverlay.classList.remove('show')
        setTimeout(() => { searchFab.style.zIndex = '' }, 400)
      })
    })

    // const searchbar = searchbarContainer.querySelector('.center-search__bar')
    // searchbar.addEventListener('click', (event) => {
    //   event.stopPropagation()
    // })
    // document.body.addEventListener('click', (event) => {
    //   if (event.target !== searchbar) {
    //     searchbarContainer.classList.remove('show')
    //   }
    // }, { once: true })
  }

  function setMenuBtn () {
    const menuFab = document.getElementById('menu-fab')
    menuFab.addEventListener('click', () => {
      const menu = document.getElementById('header-in-menu')
      if (menu) {
        menu.style.display = 'block'
        setTimeout(() => {
          menu.classList.add('show')
          menu.style.display = ''
        }, 0)
        menuFab.style.zIndex = '1'
      }
    })

    // headerInMenu
    const menuOverlay = Object.assign(document.createElement('div'), {
      id: 'menu-overlay',
      innerHTML: `
    <div id="header-in-menu">
      <ul>
        <li data-refer=".right-entry--message">私信</li>
        <li data-refer=".right-entry__outside[href='//t.bilibili.com/']">动态</li>
        <li data-refer=".header-favorite-container">收藏</li>
        <li data-refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li data-refer=".header-avatar-wrap">主页</li>
      </li>
    </div>
    `
    })

    waitDOMContentLoaded(() => {
      addMenu()
      function addMenu () {
        if (document.querySelector('.header-avatar-wrap')) {
          handleMenuItem()
        } else {
          setTimeout(addMenu, 500)
        }
      }

      function handleMenuItem () {
        menuFab.appendChild(menuOverlay)

        const items = menuOverlay.querySelectorAll('li')
        const header = document.querySelector('.bili-header__bar')
        items.forEach(item => {
          item.addEventListener('click', event => {
            event.stopPropagation()
            const refer = item.dataset.refer

            const openedDailog = sessionStorage.getItem('opened-dailog') || ''
            if (openedDailog) simulateMouseLeave(header.querySelector(openedDailog))

            simulateMouseEnter(header.querySelector(refer))
            sessionStorage.setItem('opened-dailog', refer)
          })
        })

        const menu = menuOverlay.querySelector('#header-in-menu')
        menuOverlay.addEventListener('click', event => {
          event.stopPropagation()
          const openedDailog = sessionStorage.getItem('opened-dailog') || ''
          if (openedDailog) simulateMouseLeave(header.querySelector(openedDailog))

          if (event.target !== menu) {
            menu.style.display = 'block'
            menu.classList.remove('show')
            setTimeout(() => {
              menu.style.display = ''
              menuFab.style.zIndex = ''
            }, 400)
          }
        })
      }

      function simulateMouseEnter (element) {
        const event = new MouseEvent('mouseenter', { bubbles: true, view: _unsafeWindow })
        element.dispatchEvent(event)
      }

      function simulateMouseLeave (element) {
        const event = new MouseEvent('mouseleave', { bubbles: true, view: _unsafeWindow })
        element.dispatchEvent(event)
      }
    })
  }

  function setRefreshBtn () {
    const refreshBtn = document.getElementById('refresh-fab')
    refreshBtn.addEventListener('click', () => {
      refresh()
      function refresh () {
        const rawRefreshBtn = document.querySelector('.flexible-roll-btn-inner')
        rawRefreshBtn ? rawRefreshBtn.click() : setTimeout(refresh, 500)
      }
    })
  }
}

// 侧边栏(使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。)
function handleSidebar () {
  const sidebarBtn = document.getElementById('sidebar-fab')
  const rightContainer = document.querySelector('.right-container')

  const sidebarOverlay = document.createElement('div')
  sidebarOverlay.id = 'sidebar-overlay'
  sidebarBtn.appendChild(sidebarOverlay)

  sidebarOverlay.addEventListener('click', (event) => {
    event.stopPropagation()
    closeSidebar()
  })

  sidebarBtn.addEventListener('click', () => {
    rightContainer.classList.add('show')
    sidebarOverlay.classList.add('show')
  })

  function closeSidebar () {
    rightContainer.classList.remove('show')
    sidebarOverlay.classList.remove('show')
  }

  const recommendLiist = document.getElementById('reco_list')
  recommendLiist.addEventListener('click', (event) => {
    const nextPlay = document.querySelector('.rec-title')
    const recommendFooter = document.querySelector('.rec-footer')
    if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
  })
}


/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_header_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _style_home_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _style_video_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _style_search_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _style_user_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _setting_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _header_image_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25);
/* harmony import */ var _actionbar_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(26);
// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API
















(function () {
  console.log('Bilibili mobile execute!')
  // setInterval(() => {
  //   console.log(undefined)
  // }, 100)

  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  const url = window.location
  // 简单表达式: 常量折叠，解析引擎优化为只计算一次，然后缓存入临时变量。函数调用、对象属性访问等不适用。
  const part = url.hostname.substring(0, url.hostname.indexOf('.'))

  ;(0,_init_js__WEBPACK_IMPORTED_MODULE_6__.initViewport)()
  ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.preventBeforeUnload)()

  switch (part) {
    case 'www':
      if (url.pathname === '/') {
        (0,_window_js__WEBPACK_IMPORTED_MODULE_7__.increaseVideoLoadSize)()
        ;(0,_header_image_js__WEBPACK_IMPORTED_MODULE_9__.handleHeaderImage)()
      }
      (0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_11__.handleActionbar)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
        if (url.pathname.startsWith('/video')) {
          (0,_video_js__WEBPACK_IMPORTED_MODULE_10__.videoInteraction)()
          ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_11__.handleSidebar)()
        }
        (0,_window_js__WEBPACK_IMPORTED_MODULE_7__.scrollToHidden)()
      })
      break
    case 'search':
      ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_11__.handleActionbar)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
        ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.scrollToHidden)()
      })
      break
    case 'space':
      break
    case 'm':
      break
    default:
      break
  }
})()

})();

/******/ })()
;