// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            4.5
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  Safari打开电脑模式，其它浏览器关闭电脑模式修改网站UA，获取舒适的移动端体验。
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

body {
    --overlay-time: .4s;
}

/* 操作栏 */
#actionbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: var(--actionbar-height);
    z-index: 2;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(255, 255, 255, .85);
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    transition: .5s transform ease-in;

    opacity: 0;
    animation: actionbarFadeIn .4s ease-in forwards;
}

@keyframes actionbarFadeIn {
    to {
        opacity: 1;
    }
}

[scroll-hidden] #actionbar {
    transform: translateY(100%);
}

#actionbar>* {
    padding: 8px;
}

#full-now,
#sidebar-fab,
#refresh-fab,
#show-more-fab {
    display: none;
}

#actionbar.home {
    #refresh-fab {
        display: block;
    }
}

#actionbar.video {
    #full-now {
        display: block;
    }
}

#actionbar.message {
    #menu-fab {
        display: none;
    }
}

#actionbar.video,
#actionbar.message {
    #sidebar-fab {
        display: block;
    }

    #my-top {
        display: none;
    }
}

#actionbar.search {
    #show-more-fab {
        display: block;
    }
}

#menu-fab {
    position: relative;
}

#search-fab,
#menu-fab {
    z-index: 0;
    transition: z-index var(--overlay-time) ease-in;
}

#search-fab.active,
#menu-fab.active {
    z-index: 10;
}

#show-more-fab {
    transition: transform .4s ease-in;
}

#show-more-fab.reverse {
    transform: rotate(180deg);
}

/*显示搜索文本 */
#search-fab {
    display: flex;
    padding: 4px 8px;
    max-width: 40%;
    align-items: center;
}

#search-fab svg {
    flex: 0 0 24px;
}

#search-fab-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 底部菜单内容 */
#header-in-menu {
    position: absolute !important;
    top: 100vh;
    /* space-evenly : 20px 为底栏图标高度的一半*/
    left: calc((200vw + 20px) / 3);
    background-color: white;
    padding: 5px 0;
    white-space: nowrap;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-size: 16px;
    transform: translateX(-50%);
    transition: transform var(--overlay-time) ease-in;

    li {
        list-style-type: none;
        padding: 5px 30px;
        /* 视频页默认行高不同 */
        line-height: 20px !important;
    }
}

/* 有的用户这俩不生效 */
body #header-in-menu li {
    padding: 5px 30px !important;
    line-height: 20px !important;
}

#header-in-menu.show {
    transform: translate(-50%, calc(-100% - var(--actionbar-height) - 5px));
}

/* 底部菜单、侧边栏: layout */
#menu-overlay,
#search-overlay,
#sidebar-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0;
    transition: opacity var(--overlay-time) ease-in;
}

#menu-overlay.show,
#search-overlay.show,
#sidebar-overlay.show {
    pointer-events: auto;
    opacity: 1;
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
    max-height: calc(100vh - var(--actionbar-height) - 10px);
    width: 260px;
    max-width: calc(100% - 20px);
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
}

.setting-panel.show {
    display: flex !important;
}

.setting-title {
    margin: 0 5px 5px;
    padding-bottom: 5px;
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
    margin: 8px 5px 3px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid var(--line_regular);
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

/* #i_cecream 属首页和搜索页，#app #biliMainHeader 属视频页 */

/* 顶栏外框: translate 会生成新的堆叠上下文，导致 position:fixed 的消息数不可显示 */
#biliMainHeader,
#bili-header-container {
    position: fixed;
    width: 100%;
    z-index: 62;
    top: -64px !important;
}

/* 搜索页顶栏外框 */
#bili-header-container {
    background: unset !important;
}

/* 首页顶栏防滚动 */
.bili-header__bar {
    position: fixed !important;
}

/* 首页顶栏偏移 */
.large-header .bili-header__bar {
    top: -64px !important;
}

/* 视频搜索页顶栏内容跟随外框移出屏幕 */
.fixed-header .bili-header__bar {
    position: absolute !important;
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

/* 修复历史项点击时意外移除的问题 */
.history-item .close {
    display: none;
}

/* 移除顶部动图和临时静图 */
.animated-banner,
#bili-header-banner-img,
.biliheader__banner {
    display: none !important;
}

/* 修复插件白名单提示导致首页顶栏异常 */
.adblock-tips {
    display: none !important;
}

/* 使用 controlHeaderImage 获取随机头图 */

/* -------------------------------------------------- 
 --------------------- 菜单消息数 --------------------
 --------------------------------------------------- */

.red-num--message,
.red-num--dynamic {
    position: fixed !important;
    bottom: calc(var(--actionbar-height) + 138px);
    left: calc((200vw + 70px) / 3) !important;
    top: unset !important;
    opacity: 0;
    pointer-events: none;
    transform: translateY(calc(160px + var(--actionbar-height) + 5px));
    transition: var(--overlay-time) ease-in;
}

.red-num--dynamic.red-num--dynamic {
    bottom: calc(var(--actionbar-height) + 108px);
}

[menu] .red-num--message,
[menu] .red-num--dynamic {
    opacity: 1;
    pointer-events: auto;
    transform: none;
}

/* -------------------------------------------------- 
 ---------------------- 展开图类 --------------------- 
 --------------------------------------------------- */

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

/* 客户端广告 */
/* 底部登录弹窗类 .lt-row 可能包含其它元素 */
/* 首页顶部动图上的大 Logo */
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

    --actionbar-height: 46px;
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

/* 视频流广告、影视 */
.container>*:has(.bili-video-card__info--ad),
.floor-single-card {
    display: none !important;
}

/* ----------------------------------------------------
 --------------------- 主页视频卡片 --------------------
 ----------------------------------------------------- */

.container>* {
    margin-top: 0 !important;
}

/* 卡片底板 */
.bili-video-card__wrap,
.bili-live-card__wrap {
    border-radius: 5px;
}

.bili-live-card__wrap {
    height: 100%;
}

/* 封面宽长比 */
.bili-video-card.is-rcmd,
.bili-live-card.is-rcmd {
    --cover-radio: 75% !important;
}

/* 封面圆角 */
.v-img.bili-video-card__cover,
.v-img.bili-live-card__cover {
    border-radius: 5px 5px 0 0 !important;
}

/* 封面信息（阴影层圆角） */
.bili-video-card__stats,
.bili-live-card__stats {
    border-radius: 0 !important;
    --icon-size: 16px;
    --subtitle-font-size: 11px;
    white-space: nowrap;
}

/* 标题 */
.bili-video-card__info {
    --title-padding-right: 13px;
    --title-line-height: 20px;
    --title-font-size: 14px;

    text-align: justify;
}

/* 标题 - 左右距 */
.bili-video-card__info--right,
.bili-live-card__info--text {
    padding: 0 5px;
}

/* 不喜欢按钮 */
.bili-video-card__info--no-interest {
    display: flex !important;

}

/* 撤销不喜欢 */
.bili-video-card__no-interest {
    --no-interest-module-gap: 5px;
    --no-interest-btn-horizontal-padding: var(--no-interest-btn-vertical-padding);

    .revert-btn {
        flex-direction: column;
    }
}

/* 不喜欢: 面板 */
.bili-video-card__info--no-interest-panel {
    width: unset !important;
}

/* 小标 */
.bili-video-card__info--bottom,
.bili-live-card__info--uname {
    --subtitle-font-size: 12px;
}

/* 小标 - 点赞关注文本 */
.bili-video-card__info--icon-text {
    padding: 0 5px !important;
}

/* 小标 - 右侧: 作者加日期 */
.bili-video-card__info--owner {
    flex: 1;
}

/* 小标 - 日期 */
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

#mirror-vdcon {
    --sidebar-time: .6s;
}

/* 主体内容块 */
#app #mirror-vdcon {
    min-width: 0 !important;
    padding: 0;
    top: 0;

    margin-top: 56.25vw;
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
    padding: calc(var(--dm-row-height) + 5px) 10px 0;
}

.left-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity var(--sidebar-time) ease-in;
}

#mirror-vdcon[sidebar] .left-container::after {
    pointer-events: auto;
    opacity: 1;
}

#mirror-vdcon[sidebar] .fixed-sidenav-storage {
    opacity: 0;
}

/* ----------------------------------------------------
  * ----------------------- 推荐块 ---------------------- *
   ----------------------------------------------------- */

/* 推荐块(初始样式不要设transform，否则via在刷新时侧边栏出问题) */
.right-container {
    position: fixed !important;
    width: 100% !important;
    left: 100%;
    padding: 10px 10px calc(var(--actionbar-height) + 10px);
    margin: 0 !important;

    z-index: 1;
    background: white;
    transition: transform var(--sidebar-time) ease-in;
    height: calc(100% - 56.25vw);
    overflow-y: auto;
    /* 避免到达边界后的滚动事件穿透 */
    overscroll-behavior: contain;

    box-sizing: border-box;
}

#mirror-vdcon[sidebar] .right-container {
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

    height: 56.25vw !important;
}

#bilibili-player {
    width: 100vw !important;
    height: 56.25vw !important;
}

/* 竖屏时占满高度 */
#bilibili-player.mode-webscreen {
    width: 100% !important;
    height: 100% !important;
}

.bpx-player-container,
#bilibili-player-placeholder {
    box-shadow: none !important;
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

[scroll-hidden] .bpx-player-sending-area {
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
#v_desc .toggle-btn {
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
}

/* ------ 顶部投票卡片 ------ */

/* 两个选项 */
.left-vote-option,
.right-vote-option {
    min-width: 0 !important;
}

/* 投票: 选题 */
.top-vote-card {
    padding-top: 27px !important;
}

.top-vote-card-left__title {
    transform: translateY(-23px);
}

.vui_ellipsis.multi-mode {
    overflow: visible !important;
    white-space: nowrap;
}

/* ----------------------------------------------------
  * ----------------- 播放组件（评论以下） -------------- *
   ----------------------------------------------------- */

/* 固定评论栏 */
.main-reply-box {
    position: fixed;
    left: 0;
    bottom: var(--actionbar-height);
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
[scroll-hidden] .main-reply-box {
    transform: translateY(calc(100% + var(--actionbar-height)))
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
    opacity: 1;
    transition: opacity var(--sidebar-time) ease-in;
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
    /* 空内容填充高度 */
    min-height: calc(100vh - var(--actionbar-height)) !important;
}

/* 分类和另几个包含块 */
.i_wrapper {
    padding: 0 5px !important;
}

/* 分类 */
.search-tabs.i_wrapper {
    padding-top: 10px !important;
}

.vui_tabs--nav-link {
    padding: 0 1px !important;
    flex-direction: column;
}

ul.vui_tabs--nav>* {
    flex: 1;
}

/* 分类: 排序 */
/* 综合 */
.vui_tabs--nav-item:nth-child(1) .vui_tabs--nav-text {
    padding-bottom: 17px;
}

/* 视频 */
.vui_tabs--nav-item:nth-child(2) {
    order: -1;
}

/* 番剧 */
.vui_tabs--nav-item:nth-child(3) {
    order: -2;
}

/* 影视 */
.vui_tabs--nav-item:nth-child(4) {
    order: -3;
}

/* 直播 */
.vui_tabs--nav-item:nth-child(5) {
    order: 3;
}

/* 专栏 */
.vui_tabs--nav-item:nth-child(6) {
    order: 2;
}

/* 用户 */
.vui_tabs--nav-item:nth-child(7) {
    order: 1;
}

/* 广告 */
.activity-game-list {
    display: none;
}

/* 排序筛选 */
.search-conditions {
    position: fixed;
    bottom: var(--actionbar-height);
    z-index: 2;
    background: white;
    padding: 5px !important;
    transform: translateY(100%);
    opacity: 0;
    transition: .4s ease-in;
}

.search-conditions.show {
    transform: none;
    opacity: 1;
}

/* 排序按钮 */
.conditions-order .vui_button--tab {
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
.search-input {
    display: none;
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
    padding: 5px 0 var(--actionbar-height) !important;
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
.media-item-col {
    max-width: 100% !important;
    flex: none !important;
    margin-bottom: 10px !important;
    padding: 0 !important;
}

/* 用户 */
.media-list .col_6 {
    max-width: 100% !important;
    flex: none !important;
    margin-bottom: 10px !important;
}

/* 直播 */
.live-user-cards .col_6 {
    max-width: 100%;

    .live-user-card {
        margin-bottom: 10px !important;
    }
}

/* 用户头像(用户, 直播) */
.col_6 .bili-avatar {
    height: 66px !important;
    width: 66px !important;
    margin-left: 10px;
    margin-top: 10px;
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

/* 关注按钮 */
.h .h-action {
    bottom: 84px !important;
    left: 20px;
}

/* 置顶内容 */
.content.i-pin-has-content {
    display: flex;
    flex-direction: column;
    margin: 0 5px;
}

.i-pin-c.cover-big {
    padding-bottom: 5px;
}

.i-pin-c .i-pin-cover {
    width: 100% !important;
    height: fit-content !important;
}

.i-pin-title {
    white-space: wrap !important;
}

.i-pin-info {
    margin-left: 0 !important;
    height: auto !important;
}

/* TA的视频: 外框 */
.section-title {
    padding: 0 5px 33px !important;
}

/* TA: 主页视频排序 */
#page-index .video .be-tab {
    position: absolute;
    left: 0;
    transform: translateX(calc(50vw - 50%));
    margin: 33px 0 0 !important;
}

.be-tab-item {
    margin: 0 5px !important;
}

/* 主页视频 */
#page-index .video .content {
    max-height: unset !important;
}

.small-item {
    width: calc(50% - 10px) !important;
    padding: 0 5px 5px !important;
}

.small-item .cover {
    width: 100% !important;
    height: auto !important;
}

/* 频道: 更多 */
#page-index .channel .channel-item .channel-title {
    padding: 0 5px 34px;
}

#page-index .channel .section-right-options {
    position: absolute;
    right: 0;
    bottom: 5px;
}

/* 空番剧文本 */
#page-index .col-1 .section.empty:after {
    left: 100px !important;
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_message_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 22 */
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
___CSS_LOADER_EXPORT___.push([module.id, `/* ----- fuck: 消息页顶栏不统一 ----- */

/* 顶栏外框 */
#internationalHeader {
    top: -64px !important;

    /* 禁用原最小宽度(适配搜索框宽度) */
    min-width: 0 !important;

    /* 登录通知 */
    position: fixed;
}

/* 顶栏空白 */
#message-navbar {
    display: none;
}

/* 主体纵向居中 */
body>.container {
    margin-top: 0;
}

.space-right {
    padding-top: calc(32px - var(--actionbar-height)/2);
}

/* 主体宽度 */
.container {
    width: 100% !important;
}

/* 搜索框 */
.nav-search-box {
    position: absolute !important;
    width: 100% !important;
    left: 0;
    top: 64px;
    padding: 10px 20px 5px !important;
    z-index: 3;
    margin: 0 !important;
    display: none !important;
}

.nav-search-box.show {
    display: block !important;
}

/* 禁止标题("我的消息"等)、发送框、多人点赞时的头像突出 */
.space-right-top,
.send-box,
.count-2 .avatar:first-child {
    z-index: 0 !important;
}

/* 消息分类改为侧边栏 */
.space-left {
    position: fixed;
    height: 100%;
    z-index: 3;
    transform: translateX(-100%);
    transition: transform .4s ease-in;
}

body>.container[sidebar] .space-left {
    transform: none;
}

/* 侧边栏内容居中 */
.space-left .side-bar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

/* 消息列表 */
.bili-im .left {
    width: 70px !important;
    transition: width .4s ease-in;
}

/* 列表头 */
.bili-im .left .title {
    padding-left: 10px !important;
}

/* 列表项 */
.bili-im .left .list-item {
    padding: 15px;

    .avatar {
        margin-right: 15px;
    }
}

/* 列表底部留空 36px */
.bili-im .left .list-container {
    height: calc(100% - 72px) !important;
}

/* 列表添加展开按钮 */
#unfold-btn {
    padding-left: 22px;
    line-height: 35px;
    height: 36px;
    border-top: 1px solid #e9eaec;
    user-select: none;
}

/* 删除聊天 */
.list-item .close {
    width: 18px !important;
}

/* 消息通知 */
.msg-notify {
    width: 100% !important;
}

/* 消息外框 */
.message-list {
    padding: 5px;
    /* 固定宽度: 减去最外(.space-right) padding 20px, 消息列表 70px */
    width: calc(100vw - 90px);
}

/* 聊天设置 */
.bili-im .menu-list {
    left: unset !important;
    right: 0;
}

/* 登录通知 */
.notification-warp {
    width: 100% !important;
    overflow: auto;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 23 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initViewport: () => (/* binding */ initViewport)
/* harmony export */ });
function initViewport () {
  const viewport = Object.assign(document.createElement('meta'), {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  })
  document.head.appendChild(viewport)
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleScroll: () => (/* binding */ handleScroll),
/* harmony export */   increaseVideoLoadSize: () => (/* binding */ increaseVideoLoadSize),
/* harmony export */   preventBeforeUnload: () => (/* binding */ preventBeforeUnload)
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

/**
 * 管理滚动和滑动事件的函数
 * @param {string} page - 简短描述页面的字符串: search, video
 */
function handleScroll (page) {
  // eslint-disable-next-line no-undef
  if (GM_getValue('settingShowHidden', [])[0] === false || GM_getValue('ban-action-hidden', false) === false) {
    scrollToHidden()
  }

  if (page === 'search') {
    scrollToClick()
  }

  if (page === 'video') {
    scrollToToggleSidebar()
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
      scrollHidden ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
      lastScrollTop = currentScrollTop
    }
  })
}

function scrollToClick () {
  let startX = 0
  let endX = 0
  let startY = 0
  let endY = 0
  let clickIndex = 3
  const touchXThreshold = 55

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    endX = event.changedTouches[0].clientX
    endY = event.changedTouches[0].clientY

    const distanceX = endX - startX
    const distanceY = endY - startY

    const navItems = [4, 3, 2, 1, 7, 6, 5]
    if (Math.abs(distanceX) > touchXThreshold && Math.abs(distanceY) < 1 / 2 * Math.abs(distanceX)) {
      distanceX > 0 ? clickIndex-- : clickIndex++
      document.querySelector(`.vui_tabs--nav-item:nth-child(${navItems[clickIndex]})`).click()
    }
  }

  const container = document.querySelector('#i_cecream')
  container.addEventListener('touchstart', handleTouchStart)
  container.addEventListener('touchend', handleTouchEnd)
}

function scrollToToggleSidebar () {
  let startX = 0
  let endX = 0
  let startY = 0
  let endY = 0
  const touchXThreshold = 55
  const videoContainer = document.querySelector('#mirror-vdcon')

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    endX = event.changedTouches[0].clientX
    endY = event.changedTouches[0].clientY

    const distanceX = endX - startX
    const distanceY = endY - startY

    if (Math.abs(distanceX) > touchXThreshold && Math.abs(distanceY) < 1 / 2 * Math.abs(distanceX)) {
      const isSidebarShown = videoContainer.hasAttribute('sidebar')
      if (distanceX > 0) {
        isSidebarShown && videoContainer.removeAttribute('sidebar')
      } else {
        !isSidebarShown && videoContainer.setAttribute('sidebar', '')
      }
    }
  }

  videoContainer.addEventListener('touchstart', handleTouchStart)
  videoContainer.addEventListener('touchend', handleTouchEnd)

  const videoArea = document.querySelector('.bpx-player-video-area')
  videoArea.addEventListener('touchstart', event => {
    // 阻止冒泡只对当前监听器生效，禁止全屏滑动和拖动进度条触发侧边栏
    event.stopPropagation()
  })
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleScriptPreSetting: () => (/* binding */ handleScriptPreSetting),
/* harmony export */   handleScriptSetting: () => (/* binding */ handleScriptSetting)
/* harmony export */ });
/* global GM_getValue GM_setValue GM_registerMenuCommand */
function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }
function ensureHeadGetted (element) { document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element)) }

// 脚本预加载设置
function handleScriptPreSetting () {
  const defaultValue = [false, false, false, false, false, false]

  const css = {
    css1: `
      .bpx-player-sending-area.bpx-player-sending-area {display:none !important;}
      .left-container.left-container {padding:5px 10px 0;}
      .main-reply-box.main-reply-box {display:none !important;}
    `,
    css2: '#v_tag {display:none !important;}',
    css3: `
      .copyright.item {display:none !important;}
      .show-more {display:none;}
    `,
    css4: '.trending {display:none;}',
    css5: '.bpx-player-ctrl-volume, .bpx-player-ctrl-full, .bpx-player-ctrl-web {position:fixed !important; z-index:-10; visibility:hidden;}',
    css6: '.bpx-player-contextmenu {display:none;}',
    css7: `
      .bili-footer {display: none;}
      .vui_pagenation {padding-bottom: var(--actionbar-height);}
    `
  } // 对象的值可通过 object[key] 获取

  readScriptSetting()

  waitDOMContentLoaded(() => {
    createSettingPanel()

    GM_registerMenuCommand('元素隐藏设置', () => {
      document.getElementById('setting-panel-style').classList.add('show')
    })
  })

  // 形参 diference 隐式声明成 let
  function readScriptSetting (diference) {
    // 傻逼 GM_getValue 获取未设的值就报错加阻塞线程，值不自动转字符串
    const settingShowHidden = GM_getValue('settingShowHidden', defaultValue)
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
          <label><input type="checkbox"><span>页脚导航链接</span></label>
        </div>
        <button id="setting-conform-1" class="setting-conform">确认</button>
        `
    })
    document.body.appendChild(settingPanel)

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    const oldValues = GM_getValue('settingShowHidden', defaultValue)
    for (const [index, element] of checkboxElements.entries()) {
      element.checked = oldValues[index]
    }

    settingPanel.querySelector('#setting-conform-1').addEventListener('click', () => {
      const oldValues = GM_getValue('settingShowHidden', defaultValue)
      const selectedValues = Array.from(checkboxElements).map(checkbox => checkbox.checked)

      GM_setValue('settingShowHidden', selectedValues)
      const difference = selectedValues.map((value, index) => value !== oldValues[index])

      readScriptSetting(difference)

      settingPanel.classList.remove('show')
    })
  }
}

// 脚本设置
function handleScriptSetting () {
  const keyValue = {
    key1: 'full-unmuted',
    key2: 'ban-action-hidden',
    key3: 'custom-longpress-speed'
  }

  const speedIndex = 2

  if (GM_getValue('ban-action-hidden', false) === true) {
    banActionHidden()
  }

  function banActionHidden () {
    const style = Object.assign(document.createElement('style'), {
      id: 'ban-action-hidden',
      textContent: `
        [scroll-hidden] #actionbar,
        [scroll-hidden] .flexible-roll-btn-inner,
        [scroll-hidden] .top-btn {
          transform: none !important;
        }
      `
    })
    document.head.appendChild(style)
  }

  createSettingPanel()

  GM_registerMenuCommand('操作偏好设置', () => {
    document.getElementById('setting-panel-preference').classList.add('show')
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
        <button id="setting-conform-2" class="setting-conform">确认</button>
        `
    })
    document.body.appendChild(settingPanel)

    const values = Object.values(keyValue) // 返回 [v1, v2]
    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    for (const [index, value] of values.entries()) { // 返回 [ [1,v1], [2,v2] ]
      if (index !== speedIndex) {
        checkboxElements[index].checked = GM_getValue(value, false)
      }
    }
    settingPanel.querySelector('input[type="number"]').value = GM_getValue(values[speedIndex], 2)

    settingPanel.querySelector('#setting-conform-2').addEventListener('click', () => {
      const isBanActionHidden = GM_getValue('ban-action-hidden', false)

      for (const [index, value] of values.entries()) {
        if (index !== speedIndex) {
          GM_setValue(value, checkboxElements[index].checked)
        }
      }
      GM_setValue(values[speedIndex], Number(settingPanel.querySelector('input[type="number"]').value))

      settingPanel.classList.remove('show')

      if (GM_getValue('ban-action-hidden', false) !== isBanActionHidden) {
        isBanActionHidden ? document.getElementById('ban-action-hidden').remove() : banActionHidden()
      }
    })
  }
}


/***/ }),
/* 26 */
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
/* 27 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   videoInteraction: () => (/* binding */ videoInteraction)
/* harmony export */ });
// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

function videoInteraction () {
  handlePortrait()
  closeMiniPlayer()
  handlelVideoClick()
  handleVideoLongPress()
}

function handlePortrait () {
  const video = document.querySelector('#bilibili-player video')

  function handleResize () {
    const height = video.videoHeight
    if (height !== 0) {
      const width = video.videoWidth
      const aspectRatio = height / width
      if (aspectRatio > 1) {
        portraitVideoDblclick()
      }
    }
  }
  video.addEventListener('resize', handleResize)

  // video dblclick
  function portraitVideoDblclick () {
    const videoArea = document.querySelector('.bpx-player-video-area')
    const videoPerch = document.querySelector('.bpx-player-video-perch')
    const videoWrap = document.querySelector('.bpx-player-video-wrap')
    const video = videoWrap.querySelector('video')

    videoArea.insertBefore(videoWrap, videoPerch)
    videoPerch.remove()

    let clickTimer = null
    videoWrap.addEventListener('click', () => {
      clearTimeout(clickTimer)
      clickTimer = setTimeout(() => {
        video.paused ? video.play() : video.pause()
      }, 300)
    })

    videoWrap.addEventListener('dblclick', () => {
      clearTimeout(clickTimer)
      document.querySelector('.bpx-player-ctrl-web').click()
    })
  }
}

function closeMiniPlayer () {
  // 关闭小窗: getElement 提前使用在元素加载后能获取到, querySelector 在元素加载后使用才能获取到
  const miniPlayerBtn = document.getElementsByClassName('mini-player-window')[0]
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.target.classList.contains('on') && miniPlayerBtn.click()
    })
  }).observe(miniPlayerBtn, { attributes: true, attributeFilter: ['class'] })
}

// 接管视频点击事件
function handlelVideoClick () {
  const video = document.querySelector('.bpx-player-video-wrap>video')
  // safari 内联播放
  if (video) video.playsInline = true

  const playerContainer = document.querySelector('.bpx-player-container')
  playerContainer.addEventListener('click', handleClick)
  const controlWrap = playerContainer.querySelector('.bpx-player-control-wrap')

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

  // 双击打开声音
  playerContainer.addEventListener('dblclick', () => {
    video.muted = false
    if (video.volume === 0) {
      document.querySelector('.bpx-player-ctrl-muted-icon').click()
    }
  })
}

function handleVideoLongPress () {
  const video = document.querySelector('video')
  let isLongPress = false
  let timeoutId
  let times

  video.addEventListener('touchstart', () => {
    // eslint-disable-next-line no-undef
    times = GM_getValue('custom-longpress-speed', 2)
    timeoutId = setTimeout(() => {
      video.playbackRate = video.playbackRate * times
      isLongPress = true
    }, 500)
  })

  video.addEventListener('touchmove', cancelLongPress)
  video.addEventListener('touchend', cancelLongPress)

  function cancelLongPress () {
    clearTimeout(timeoutId)

    if (isLongPress) {
      video.playbackRate = video.playbackRate / times
      isLongPress = false
    }
  }
}


/***/ }),
/* 28 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUnfoldBtn: () => (/* binding */ createUnfoldBtn)
/* harmony export */ });
function createUnfoldBtn () {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // 遍历此次观察到的添加节点
      Array.from(mutation.addedNodes).forEach(addedNode => {
        // Log addedNode 和 addedNode.nodeType, nodeType 为 1 表示 Node.ELEMENT_NODE
        if (addedNode.classList.contains('bili-im')) {
          createElement()
          observer.disconnect()
        }
      })
    })
  })

  observer.observe(document.querySelector('body>.container'), { childList: true, subtree: true })

  function createElement () {
    const unfoldBtn = Object.assign(document.createElement('div'), {
      id: 'unfold-btn',
      textContent: '展开'
    })
    const messageList = document.querySelector('.bili-im .left')
    messageList.appendChild(unfoldBtn)

    unfoldBtn.addEventListener('click', () => {
      if (messageList.style.cssText === '') {
        messageList.style.cssText = 'width: 240px !important'
        unfoldBtn.textContent = '折叠'
      } else {
        messageList.style.cssText = ''
        unfoldBtn.textContent = '展开'
      }
    })
  }
}


/***/ }),
/* 29 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleActionbar: () => (/* binding */ handleActionbar),
/* harmony export */   handleSidebar: () => (/* binding */ handleSidebar)
/* harmony export */ });
/* global GM_getValue */
// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

/**
 * 管理操作栏的函数(DOMContentLoaded 之后)
 * fuck: 消息页顶栏不统一
 */
function handleActionbar () {
  const actionbar = Object.assign(document.createElement('div'), {
    id: 'actionbar',
    // <div style="display:flex; transform:scale(4)">
    // <style>svg {background-color:yellow; border:1px solid;}</style>
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
      <div id="show-more-fab">
        <svg width="24" height="24" viewBox="0 0 40 40" fill="currentColor"  style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(4,4)" d="M0.256 23.481c0 0.269 0.106 0.544 0.313 0.75 0.412 0.413 1.087 0.413 1.5 0l14.119-14.119 13.913 13.912c0.413 0.413 1.087 0.413 1.5 0s0.413-1.087 0-1.5l-14.663-14.669c-0.413-0.412-1.088-0.412-1.5 0l-14.869 14.869c-0.213 0.212-0.313 0.481-0.313 0.756z"></path></svg>
      </div>
      `
  })
  document.body.appendChild(actionbar)

  // window 是全局对象，window.location.href 可省略 window
  if (location.hostname === 'www.bilibili.com' && location.pathname === '/') {
    actionbar.classList.add('home')
    setRefreshBtn()
  }

  if (location.pathname.startsWith('/video')) {
    actionbar.classList.add('video')
    setFullbtn()
  } else if (location.hostname === 'message.bilibili.com') {
    actionbar.classList.add('message')
    setSearchBtn('message')
  } else {
    setTopBtn()
  }

  if (location.hostname === 'search.bilibili.com') {
    actionbar.classList.add('search')
    setSearchBtn('search')
    setShowMoreBtn()
  } else {
    setSearchBtn()
  }

  setHomeBtn()
  if (location.hostname !== 'message.bilibili.com') {
    setMenuBtn()
  }

  function setFullbtn () {
    let clickTimer = null

    const fullBtn = document.getElementById('full-now')
    fullBtn.addEventListener('click', () => {
      clearTimeout(clickTimer)

      clickTimer = setTimeout(function () {
        const video = document.querySelector('video')
        // 等于符号优先级更高
        if (GM_getValue('full-unmuted', false) === true) {
          video.play()
          video.muted = false
          if (video.volume === 0) {
            document.querySelector('.bpx-player-ctrl-muted-icon').click()
          }
        }

        const isPortrait = video.videoWidth / video.videoHeight < 1
        const btnSelector = isPortrait ? '.bpx-player-ctrl-web' : '.bpx-player-ctrl-full'
        const rawFullBtn = document.querySelector(btnSelector)
        rawFullBtn?.click()
      }, 300)
    })

    fullBtn.addEventListener('dblclick', () => {
      clearTimeout(clickTimer)

      const video = document.querySelector('video')
      video.play()
      video.muted = false
      if (video.volume === 0) {
        document.querySelector('.bpx-player-ctrl-muted-icon').click()
      }
    })
  }

  function setTopBtn () {
    const topBtn = document.getElementById('my-top')
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0 })
    })
  }

  function setHomeBtn () {
    const home = document.getElementById('my-home')
    home.addEventListener('click', () => { window.location.href = 'https://www.bilibili.com/' })
  }

  /**
 * 设置不同页面的搜索事件的函数
 * @param {string} page - 简短描述页面的字符串: search, message
 */
  function setSearchBtn (page) {
    const searchFab = document.getElementById('search-fab')
    const svg = searchFab.querySelector('svg')

    const searchOverlay = document.createElement('div')
    searchOverlay.id = 'search-overlay'
    searchFab.appendChild(searchOverlay)

    const containerSelector = page === 'message' ? '.nav-search-box' : '.center-search-container'

    let searchFabText
    if (page === 'search') {
      // 底部显示搜索文本
      const pageInput = document.querySelector('.search-input input')
      searchFabText = Object.assign(document.createElement('div'), {
        id: 'search-fab-text',
        textContent: pageInput.value
      })
      searchFab.appendChild(searchFabText)

      searchFab.style.cssText = `
        background-color: var(--graph_bg_thick);
        border-radius: 16px;
      `
      svg.style.flex = '0 0 20px'
    }

    let clickTimer = null

    let handleInput = null
    searchFab.addEventListener('click', () => {
      clearTimeout(clickTimer)

      clickTimer = setTimeout(() => {
        const input = document.querySelector(`${containerSelector} input`)

        if (input) {
          document.querySelector(`${containerSelector}`).classList.toggle('show')
          input.focus()
          searchOverlay.classList.toggle('show')
          searchFab.classList.toggle('active')

          if (page === 'search') {
            // 移除之前添加的 input 事件监听器
            input.removeEventListener('input', handleInput)

            // 模拟输入: 将文本填入底部搜索
            input.value = searchFabText.textContent
            input.dispatchEvent(new Event('input', { bubbles: true }))

            // 文本更新到搜索页搜索
            handleInput = () => {
              searchFabText.textContent = input.value
              if (input.value === '') {
                searchFab.style.cssText = ''
                svg.style.flex = ''
              } else {
                searchFab.style.cssText = `
                  background-color: var(--graph_bg_thick);
                  border-radius: 16px;
                `
                svg.style.flex = '0 0 20px'
              }
            }
            input.addEventListener('input', handleInput)
          }
        }
      }, 300)
    })

    if (page === 'search') {
      searchFab.addEventListener('dblclick', () => {
        clearTimeout(clickTimer)

        const input = document.querySelector('.center-search-container input')

        if (input) {
          document.querySelector('.center-search-container').classList.toggle('show')
          input.focus()
          searchOverlay.classList.toggle('show')
          searchFab.classList.toggle('active')

          input.value = ''
          input.dispatchEvent(new Event('input', { bubbles: true }))

          searchFabText.textContent = input.value
          searchFab.style.cssText = ''
          svg.style.flex = ''

          input.removeEventListener('input', handleInput)
          // 文本更新到搜索页搜索
          handleInput = () => {
            searchFabText.textContent = input.value
            if (input.value === '') {
              searchFab.style.cssText = ''
              svg.style.flex = ''
            } else {
              searchFab.style.cssText = `
                background-color: var(--graph_bg_thick);
                border-radius: 16px;
              `
              svg.style.flex = '0 0 20px'
            }
          }
          input.addEventListener('input', handleInput)
        }
      })
    }
  }

  function setMenuBtn () {
    const menuFab = document.getElementById('menu-fab')

    // headerInMenu
    const menuOverlay = Object.assign(document.createElement('div'), {
      id: 'menu-overlay',
      innerHTML: `
    <div id="header-in-menu">
      <ul>
        <li data-refer=".right-entry--message">消息</li>
        <li data-refer=".right-entry__outside[href='//t.bilibili.com/']">动态</li>
        <li data-refer=".header-favorite-container">收藏</li>
        <li data-refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li data-refer=".header-avatar-wrap">主页</li>
      </li>
    </div>
    `
    })
    menuFab.appendChild(menuOverlay)
    const menu = menuOverlay.querySelector('#header-in-menu')

    menuFab.addEventListener('click', () => {
      menu.classList.add('show')
      // 显示消息数
      document.body.setAttribute('menu', '')
      menuOverlay.classList.add('show')
      menuFab.classList.add('active')
    })

    const items = menuOverlay.querySelectorAll('li')
    items.forEach(item => {
      item.addEventListener('click', event => {
        event.stopPropagation()
        menu.classList.remove('show')
        document.body.removeAttribute('menu')

        const refer = item.dataset.refer
        sessionStorage.setItem('opened-dailog', refer)

        const mouseEvent = new MouseEvent('mouseenter', { bubbles: true, view: _unsafeWindow })
        document.querySelector(`.bili-header__bar ${refer}`).dispatchEvent(mouseEvent)
      })
    })

    menuOverlay.addEventListener('click', event => {
      event.stopPropagation()
      menu.classList.remove('show')
      document.body.removeAttribute('menu')
      menuOverlay.classList.remove('show')
      menuFab.classList.remove('active')

      const refer = sessionStorage.getItem('opened-dailog') || ''

      const mouseEvent = new MouseEvent('mouseleave', { bubbles: true, view: _unsafeWindow })
      document.querySelector(`.bili-header__bar ${refer}`).dispatchEvent(mouseEvent)
    })
  }

  function setRefreshBtn () {
    const refreshFab = document.getElementById('refresh-fab')
    refreshFab.addEventListener('click', () => {
      refresh()
      function refresh () {
        const rawRefreshBtn = document.querySelector('.flexible-roll-btn-inner')
        rawRefreshBtn ? rawRefreshBtn.click() : setTimeout(refresh, 500)
      }
    })
  }

  function setShowMoreBtn () {
    const showMoreFab = document.getElementById('show-more-fab')

    const handleClick = () => {
      const searchConditions = document.querySelector('.search-conditions')
      if (searchConditions) {
        if (sessionStorage.getItem('show-conditions') !== 'true') {
          searchConditions.classList.add('show')
          showMoreFab.classList.add('reverse')
          sessionStorage.setItem('show-conditions', 'true')
        } else {
          searchConditions.classList.remove('show')
          showMoreFab.classList.remove('reverse')
          sessionStorage.setItem('show-conditions', '')
        }
      }
    }
    showMoreFab.addEventListener('click', handleClick)
  }
}

// 侧边栏(使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。)

/**
 * 处理侧边栏事件的函数
 * @param {string} page - 简短描述页面的字符串: video, message
 */
function handleSidebar (page) {
  if (page === 'message') {
    handleMessageSidebar()
  } else {
    handleVideoSidebar()
  }

  function handleVideoSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab')
    const videoContainer = document.querySelector('#mirror-vdcon')

    sidebarFab.addEventListener('click', () => {
      videoContainer.toggleAttribute('sidebar')
    })

    function closeSidebar () {
      videoContainer.removeAttribute('sidebar')
    }

    const recommendLiist = document.getElementById('reco_list')
    recommendLiist.addEventListener('click', (event) => {
      const nextPlay = document.querySelector('.rec-title')
      const recommendFooter = document.querySelector('.rec-footer')
      if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
    })
  }

  function handleMessageSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab')
    const messageContainer = document.querySelector('body>.container')

    sidebarFab.addEventListener('click', () => {
      messageContainer.toggleAttribute('sidebar')
      sidebarOverlay.classList.toggle('show')
      sidebarFab.classList.toggle('active')
    })

    const sidebarOverlay = document.createElement('div')
    sidebarOverlay.id = 'sidebar-overlay'
    sidebarFab.appendChild(sidebarOverlay)
  }
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
/* harmony import */ var _style_message_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var _setting_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25);
/* harmony import */ var _header_image_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26);
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27);
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28);
/* harmony import */ var _actionbar_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(29);
// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API


















(function () {
  // setInterval(() => { debugger }, 100)

  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  (0,_init_js__WEBPACK_IMPORTED_MODULE_7__.initViewport)()
  ;(0,_window_js__WEBPACK_IMPORTED_MODULE_8__.preventBeforeUnload)()

  console.log('Bilibili mobile execute!')

  // 简单表达式: 常量折叠，解析引擎优化为只计算一次，然后缓存入临时变量。函数调用、对象属性访问等不适用。
  const part = location.hostname.substring(0, location.hostname.indexOf('.'))

  switch (part) {
    case 'www':
      if (location.pathname === '/') {
        (0,_window_js__WEBPACK_IMPORTED_MODULE_8__.increaseVideoLoadSize)()
        ;(0,_header_image_js__WEBPACK_IMPORTED_MODULE_10__.handleHeaderImage)()
      }
      (0,_setting_js__WEBPACK_IMPORTED_MODULE_9__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_13__.handleActionbar)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_9__.handleScriptSetting)()
        if (location.pathname.startsWith('/video')) {
          (0,_video_js__WEBPACK_IMPORTED_MODULE_11__.videoInteraction)()
          ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_13__.handleSidebar)()
          ;(0,_window_js__WEBPACK_IMPORTED_MODULE_8__.handleScroll)('video')
        } else {
          (0,_window_js__WEBPACK_IMPORTED_MODULE_8__.handleScroll)()
        }
      })
      break
    case 'search':
      ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_9__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_13__.handleActionbar)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_9__.handleScriptSetting)()
        ;(0,_window_js__WEBPACK_IMPORTED_MODULE_8__.handleScroll)('search')
      })
      break
    case 'space':
      break
    case 'message':
      ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_9__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_13__.handleActionbar)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_9__.handleScriptSetting)()
        ;(0,_actionbar_js__WEBPACK_IMPORTED_MODULE_13__.handleSidebar)('message')
        // handleScroll('message')
        ;(0,_element_js__WEBPACK_IMPORTED_MODULE_12__.createUnfoldBtn)()
      })
      break
    default:
      break
  }
})()

})();

/******/ })()
;