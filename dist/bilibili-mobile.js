// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            5.0-beta.21
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  Safari打开电脑模式，其它浏览器关闭电脑模式修改网站UA，获取舒适的移动端体验。
// @author             jk278
// @license            MIT
// @match              https://*.bilibili.com/*
// @exclude            https://message.bilibili.com/pages/nav/*
// @grant              GM_registerMenuCommand
// @grant              GM_getValue
// @grant              GM_setValue
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// @homepageURL        https://github.com/jk278/bilibili-mobile
// @require            https://unpkg.com/js-md5@latest/src/md5.js
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
___CSS_LOADER_EXPORT___.push([module.id, `/* ---------------------- 操作栏 ----------------------*/

body {
    --overlay-time: .4s;
    --actionbar-time: .5s;
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
    background-color: rgba(255, 255, 255, .8);
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    transition: var(--actionbar-time) transform ease-in;

    opacity: 0;
    animation: actionbarFadeIn .4s ease-in forwards;

    backdrop-filter: blur(5px);
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

#actionbar.search,
#actionbar.space {
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

/* 底部菜单、侧边栏等: overlay */
#menu-overlay,
#search-overlay,
#sidebar-overlay,
#ai-conclusion-overlay {
    position: fixed;
    bottom: 0;
    /* actionbar 使用 backdrop-filter 导致创建了新的堆叠上下文 */
    height: 100vh;
    left: 0;
    right: 0;
    pointer-events: none;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0;
    transition: opacity var(--overlay-time) ease-in;
}

#menu-overlay.show,
#search-overlay.show,
#sidebar-overlay.show,
#ai-conclusion-overlay.show {
    pointer-events: auto;
    opacity: 1;
}

/* 底部提示 */
#toast {
    position: fixed;
    left: 0;
    bottom: var(--actionbar-height);
    transform: translate(calc(50vw - 50%), 100%);
    z-index: 1;
    font-size: 14px;
    line-height: 20px;
    padding: 5px 12px;
    margin-bottom: 5px;
    background-color: white;
    border: 1px solid var(--line_regular);
    border-radius: 16px;
    opacity: 0;
    transition: .3s ease-in;
    display: none;
}

#toast[show] {
    transform: translateX(calc(50vw - 50%));
    opacity: 1;
}

.bpx-player-container #toast {
    color: var(--text4);
    background-color: rgba(0, 0, 0, .5);
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
    background: white;
    z-index: 1;
    border: 1px solid var(--line_regular);
    flex-direction: column;
    padding: 10px 5px;
    border-radius: 10px;
    font-size: 16px;
    max-height: calc(100vh - var(--actionbar-height) - 10px);
    width: 260px;
    max-width: calc(100% - 20px);
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);

    opacity: 0;
    transform: translate(-50%, -50%) scale(.9);
    transition: .4s ease-in;
    display: none;
}

.setting-panel[show] {
    opacity: 1;
    transform: translate(-50%, -50%);
}

/* 自定义菜单选项 */
.setting-panel.mini {
    opacity: 1;
    transform: translate(-50%, -50%);
    display: flex;
    width: 150px;
}

.mini .setting-checkboxes label {
    height: 16px;
}

/* 顶部标题 */
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

.setting-checkboxes span,
.setting-checkboxes details {
    flex-grow: 1;
    text-align: center;
}

/* 属性选择器中只存在单个值时 (无空格) 可省略引号 */

.setting-checkboxes input[type=checkbox] {
    width: 16px;
    height: 26px;
}

.setting-checkboxes input[type=number] {
    width: 40px;
    appearance: textfield;
    height: 22px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

.setting-conform {
    margin: 8px 5px 3px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid var(--line_regular);
    background-color: var(--graph_bg_thin) !important;
}

/* 自定义菜单弹窗边距放在选项下面,选中才显示 */
label:has([data-key=menu-dialog-move-down])+label {
    display: none;
}

label:has([data-key=menu-dialog-move-down]:checked)+label {
    display: flex;
}

/* 帮助 */
.setting-content {
    font-size: 14px;
}

.setting-content a {
    text-decoration: underline;
}

/* ------ 关注菜单视图 ------ */

/* 添加的关注窗口 (历史弹窗外框 + 空间关注列表) */
#follow-list-dialog {
    z-index: 2;
}

/* 列表项 */
#follow-list-dialog .list-item {
    border-bottom: 1px solid #eee;
    padding: 10px 0 8px;
}

/* 列表框 */
ul.follow-list-content {
    height: 480px;
    overflow-y: auto;
    padding: 10px;
}

/* 头像 */
#follow-list-dialog .cover-container {
    position: static;
    width: 60px;
    height: 60px;
    float: left;
}

/* 内容 */
#follow-list-dialog .content {
    margin: 10px 0 8px 75px;
}

/* 用户名 */
.list-item a.title {
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    margin-bottom: 6px;
    display: inline-block;
}

/* 用户描述 */
.list-item .auth-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
    font-size: 13px;
    line-height: 15px;
    height: 30px;
    line-break: anywhere;
}

/* 粉丝操作 */
.follow-list-content .list-item .fans-action {
    position: absolute;
    right: 0;
    top: unset;
    transform: translateY(-58px);
    /* 遮盖用户描述 */
    z-index: 1;
}

/* 按钮 */
.list-item .be-dropdown {
    display: inline-block;
}

/* 关注按钮 */
.list-item .fans-action-btn {
    padding: 4px 9px 4px 7px;
    margin-right: 4px;
    background-color: #e5e9ef;
    border-radius: 4px;
    color: #6d757a;
    float: left;
    line-height: 16px;
    /* 去除空格导致的高度增加 */
    font-size: 0;
}

/* 关注字体图标 */
.fans-action-btn .video-commonmenu {
    vertical-align: middle;
    margin-right: 2px;
}

/* 取关后 */
div.fans-action-btn.follow {
    line-height: 16px;
    height: 24px;
    border: none;
    width: 70px;
    box-sizing: border-box;
    text-align: center;
}

/* 关注按钮文字 */
.fans-action-text {
    line-height: 16px;
    font-size: 12px;
    vertical-align: middle;
}

/* 操作按钮展开 */
.follow-list-content ul.be-dropdown-menu {
    top: 30px;
    border: 1px solid #e5e9ef;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .14);
}

/* 关注按钮展开 (暂不使用) */
/* .follow-list-content .fans-action-text+.be-dropdown-menu {
    left: 0;
    padding: 5px 10px;
    z-index: 1;
    background-color: #fff;
} */

/* 操作选项 */
.follow-list-content li.be-dropdown-item {
    height: 28px;
    line-height: 28px;
    padding: 0;
}

/* 更多按钮展开 */
.follow-list-content .be-dropdown-trigger+.be-dropdown-menu {
    right: 0;
    padding: 3px 10px;
}

/* ------ 视频滑动进度信息 ------ */
#progress-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    display: none;
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
___CSS_LOADER_EXPORT___.push([module.id, `/* ------------------------ 顶栏 -------------------- */

/* #i_cecream 属首页(含顶栏)和搜索页(不含顶栏)，#app #biliMainHeader 属视频页 */

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

/* 首页顶栏偏移 */
.large-header .bili-header__bar {
    top: -64px !important;
    /* 首页顶栏防滚动(避免搜索页异常) */
    position: fixed !important;
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
    opacity: 0;
    transform: scale(.9);
    transition: .4s ease-in;
    display: none;
}

.center-search-container[show] {
    opacity: 1;
    transform: none;
}

/* 失焦后立即重新聚焦会导致搜索历史折叠闪烁，直接强制保留聚焦状态 (.is-focus) */
.center-search-container #nav-searchform {
    border-radius: 8px 8px 0px 0px !important;

    border: 1px solid var(--line_regular) !important;
    border-bottom: none !important;
    background: var(--bg1) !important;
}

.center-search-container #nav-searchform .nav-search-content {
    background-color: var(--graph_bg_thick) !important;
}

.center-search-container .search-panel {
    display: block !important;
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

/* 偏好设置中有更改 */
div.bili-header .v-popover {
    position: fixed;
    margin: 0 !important;
    max-width: 100%;
    padding: 5px !important;
    left: 50%;
    opacity: 0;
    transition: .4s ease-in;
    display: none;
    
    top: 50vh !important;
    transform: translate(-50%, -50%) scale(.9);
}

/* 修复鼠标移动导致的隐藏 */
div.bili-header .v-popover[display] {
    display: block !important;
}

div.bili-header .v-popover[show] {
    opacity: 1;
    /* 修复鼠标移动导致的隐藏时的位移 */
    transform: translate(-50%, -50%) !important;
}

/* 复制的分类图外框 */
.bili-header.false-header {
    min-height: 0;
    pointer-events: none;
}

.bili-header.false-header:has(>[show]) {
    pointer-events: auto;
}

/* 复制的分类图 */
#copy-category-dialog.v-popover {
    /* transform: translate(-50%, -50%) !important; */
    display: none;
    z-index: 2;
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

/* 消息展开图 */
.message-entry-popover .message-inner-list__item {
    padding-left: 43px !important;
}

/* 动态展开图 */
.dynamic-video-item {
    margin-right: 0 !important;
}

.header-dynamic-list-item {
    padding: 0 !important;
    margin: 10px 0 !important;
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

/* 查看全部动态按钮 */
.wnd_bottom {
    max-width: calc(100% - 40px);
    display: none;
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

/* 查看全部历史按钮 */
a.view-all-history-btn {
    display: none !important;
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

/* 首页顶部动图上的大 Logo */
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
___CSS_LOADER_EXPORT___.push([module.id, `/* ---------------------- 首页 ----------------------- */

body {
    /* 避免评论未加载时显示灰色 */
    background: white !important;

    --actionbar-height: 46px;
}

/* 双列视频 */
.recommended-container_floor-aside .container {
    grid-template-columns: repeat(2, 1fr) !important;
    padding: 8px;
    grid-gap: 8px !important;
    background-color: #f1f2f3;
}

/* 头图 */
.bili-header__banner {
    background-color: #f1f2f3 !important;
    height: 50vw !important;
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

/* 客户端广告 */
/* 底部登录弹窗类 .lt-row 可能包含其它元素 */
/* 菜单-个人: 会员广告 */
.desktop-download-tip,
.lt-row,
.vip-entry-containter {
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
    --cover-radio: 66.67% !important;
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
.bili-video-card__info,
.bili-live-card__info {
    --title-padding-right: 22px;
    --title-line-height: 20px;
    --title-font-size: 13px;
    --no-interest-entry-size: 22px;
    --info-margin-top: 7px;
    padding-bottom: 5px;
    text-align: justify;
}

/* 标题 - 左右距 */
.bili-video-card__info--right,
.bili-live-card__info--text {
    padding: 0 5px;
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

/* 小标 - 直播中 */
div.bili-live-card .bili-live-card__info--living {
    font-size: 11px;
}

/* 标题 - 不喜欢按钮：打开面板添加预览视频选项  */
div.bili-video-card .bili-video-card__info--no-interest,
div.bili-live-card .bili-live-card__info--no-interest {
    display: flex !important;
    top: calc((var(--title-line-height) * 2 - var(--no-interest-entry-size)) / 2);
    right: 2px;
    box-shadow: 0 0 2px rgba(127, 127, 127, .6);
    opacity: 0;
    transition: opacity .2s ease-in;
}

/* 不喜欢按钮: svg 加载完成后再显示边框，修复 svg 动态加载导致边框阴影提前显示 */
.bili-video-card .bili-video-card__info--no-interest:has(svg path),
.bili-live-card .bili-live-card__info--no-interest:has(svg path) {
    opacity: 1;
}

/* 不喜欢按钮: 有 ai 总结时 */
div.bili-video-card[data-has-ai=true] .bili-video-card__info--no-interest:after {
    content: '';
    position: absolute;
    top: 0;
    right: 3px;
    width: 3px;
    height: 3px;
    /* --brand_blue: #00AEEC */
    background-color: rgb(0, 174, 236);
    border-radius: 50%;
}

/* 撤销不喜欢 */
.bili-video-card__no-interest {
    --no-interest-module-gap: 5px;
    --no-interest-btn-horizontal-padding: var(--no-interest-btn-vertical-padding);

    .revert-btn {
        flex-direction: column;
    }
}

/* ------------------- 视频预览 ------------------- */

/* 稍后观看的文字 */
.bili-watch-later.bili-watch-later--pip span {
    display: none;
}

/* 视频预览隐藏信息 (同 :hover) */
.bili-video-card__image--wrap:has(>.mouse-in)+.bili-video-card__mask {
    visibility: hidden;
    opacity: 0;
}

/* 添加预览进度条 */
.inline-progress-bar {
    position: absolute;
    bottom: 0;
    height: 10px;
    left: 0;
    width: 100%;
    z-index: 2;
    background-color: #ddd;
    display: none;
}

.v-inline-player.mouse-in+.inline-progress-bar {
    display: block;
}

.inline-progress-bar-filled {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #007bff;
}

.inline-progress-bar-thumb {
    position: absolute;
    top: -5px;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    touch-action: none;
    pointer-events: auto;
}

/* ------------------- AI总结 ------------------- */

#ai-conclusion-overlay {
    z-index: 2;
}

.ai-conclusion-card {
    position: fixed;
    max-height: 530px;
    width: 400px;
    z-index: 99;
    color: rgb(0, 0, 0);
    filter: drop-shadow(rgba(0, 0, 0, 0.5) 0px 0px 15px);
    padding-bottom: 1.25rem;
    overflow: auto;
    border-radius: 0.5rem;
    border-width: 1px;
    background: white;
}

.ai-conclusion-card .ai-conclusion-card-header {
    font-weight: 700;
    padding: 1.25rem;
    background: linear-gradient(to bottom, rgb(200, 225, 255) 0%, rgb(255, 255, 255) 100%);
}

.ai-conclusion-card .ai-conclusion-card-header .ai-conclusion-card-header-left {
    display: flex;
    align-items: center;
}

.ai-conclusion-card .ai-conclusion-card-summary {
    margin-bottom: 1.25rem;
    font-weight: 700;
    padding: 0px 1.25rem;
}

.ai-conclusion-card .ai-conclusion-card-selection {
    margin-bottom: 1.25rem;
    padding: 0px 1.25rem;
}

.ai-conclusion-card .ai-conclusion-card-selection .ai-conclusion-card-selection-title {
    display: flex;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 1rem;
}

/* ----------------------------------------------------
 ------------------------- 按钮 -----------------------
 ----------------------------------------------------- */

/* 原首页按钮(置顶、刷新按钮): 可以通过 JavaScript 与隐藏元素进行交互 */
.palette-button-outer {
    display: none;
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
___CSS_LOADER_EXPORT___.push([module.id, `/* ---------------------- 视频详情页 ------------------- */

/* 适配 shadowDOM 的评论行滚动隐藏 */
body {
    --shadow-transform: none;
    --commentbox-display: block;
}

body[scroll-hidden] {
    --shadow-transform: translateY(calc(100% + var(--actionbar-height)));
}

/* 主应用块 */
#app {
    --sidebar-time: .6s;
}

/* 主体内容块 */
#app #mirror-vdcon {
    min-width: 0;
    padding: 0;
    margin-top: 56.25vw;
}

#app {
    height: 100%;
}

#mirror-vdcon {
    height: 100%;
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
    padding: calc(var(--dm-row-height) + 5px) 10px 10px;
    
    background: white;
}

.left-container::after {
    content: '';
    /* 因为现在是限制高度 + overflow:auto，所以不用 absolute 了 */
    position: fixed;
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

/* 视频选集 */
div.multi-page-v1 .cur-list {
    overflow-y: auto;
}

/* 推荐视频图块 */
#reco_list .card-box .pic-box {
    max-width: 50%;
}

/* 展开按钮 */
.rec-footer {
    display: none;
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

/* 移除白色阴影 */
.bpx-player-container,
#bilibili-player-placeholder {
    box-shadow: none !important;
}

/* 视频页不显示原双击全屏层 */
#app .bpx-player-video-perch {
    max-height: 0;
}

/* 小窗时的隐藏 - 始终隐藏*/
/* 顶部关注、音乐、反馈 */
/* 右下角暂停图标 */
/* 取消静音 */
.bpx-player-top-wrap,
.bpx-player-state-wrap {
    display: none !important;
}

/* 小窗时的隐藏：定位、解除静音、点赞关注等弹窗 */
.bpx-player-toast-wrap {
    display: block !important;
    bottom: 65px !important;
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

/* ------------ 控制栏隐藏 (覆盖原显隐：3级选择器覆盖2级) ------------ */

/* control-bottom 和 mask (阴影) */
.bpx-player-container[ctrl-shown=false] .bpx-player-control-wrap .bpx-player-control-mask {
    opacity: 0;
    /* 渐变属性应用在需要变化的状态 */
    transition: opacity .2s ease-in;
}

.bpx-player-container[ctrl-shown=true] .bpx-player-control-wrap .bpx-player-control-mask {
    opacity: 1;
}

.bpx-player-container[ctrl-shown=true] .bpx-player-control-entity .bpx-player-control-bottom {
    opacity: 1;
    display: flex;

}

.bpx-player-container[ctrl-shown=false] .bpx-player-control-entity .bpx-player-control-bottom {
    display: none;
}

/* 进度条 */
.bpx-player-container[ctrl-shown=true] .bpx-player-control-entity .bpx-player-control-top,
.bpx-player-container[ctrl-shown=false] .bpx-player-control-entity .bpx-player-shadow-progress-area {
    opacity: 1;
    visibility: visible;
}

.bpx-player-container[ctrl-shown=false] .bpx-player-control-entity .bpx-player-control-top,
.bpx-player-container[ctrl-shown=true] .bpx-player-control-entity .bpx-player-shadow-progress-area {
    opacity: 0;
    visibility: hidden;
}

/* 高能进度 */
.bpx-player-container[ctrl-shown=true] .bpx-player-control-entity .bpx-player-pbp {
    bottom: calc(100% + 6px);
    left: 0;
    opacity: 1;
    width: 100%;
}

/*
    权重：
    ID 选择器：100
    类选择器、属性选择器、伪类选择器：10
    元素选择器、伪元素选择器：1

    如果有多个选择器同时作用于同一个元素，则计算每个选择器的权重值，并将其相加，得出总权重值。
*/

/* 覆盖 show */
div.bpx-player-control-entity .bpx-player-pbp {
    bottom: 1px;
    opacity: 0;
    left: -12px;
    width: calc(100% + 24px);
}

/* 不覆盖 pin */
div.bpx-player-control-entity .bpx-player-pbp.pin {
    opacity: 1;
}

/* pin 按钮: display 代替 opacity */
.bpx-player-pbp-pin {
    opacity: 1 !important;
    display: none;
}

.bpx-player-container[ctrl-shown=true] .bpx-player-control-entity .bpx-player-pbp-pin {
    display: block;
}

/* ------------ 控制栏样式 ------------ */

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

/* 清晰度文本:全屏时恢复大小 */
@media screen and (min-width: 750px) {
    .bpx-player-container[data-screen=full] .bpx-player-ctrl-quality-result {
        font-size: 16px !important;
        height: unset !important;
    }
}

/* 修复宽屏全屏时的控制栏图标增大导致的高度过高 */
@media screen and (min-width: 750px) {
    .bpx-player-container[data-screen=full] .bpx-player-control-wrap {
        height: 43px !important;
    }

    .bpx-player-container[data-screen=full] .bpx-player-control-top {
        bottom: 43px !important;
    }
}

/* 主控制区: 覆盖宽屏全屏样式 (图标22px，算 margin 37px) */
div.bpx-player-control-bottom {
    height: 29px !important;
    margin-top: 7px !important;
    padding: 0 7px !important;
}

/* 进度条 */
div.bpx-player-control-top {
    bottom: 36px;
    transition: none;
}

/* 隐藏颠倒的高能进度条常驻切换提示 */
.bpx-player-pbp .bpx-player-pbp-pin-tip {
    display: none !important;
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

/* 进度条细条包含块（高12px） */
.bpx-player-progress-wrap {
    height: 7px !important;
    padding-bottom: 3px !important;
}

/* 替换via暗色异常的阴影 */
.bpx-player-control-mask {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 100%) !important;
}

/* 清晰度弹窗 */
.bpx-player-ctrl-quality-menu-wrap {
    bottom: 22px !important;
}

.bpx-player-ctrl-quality-menu-item {
    height: 7.7vw !important;
    max-height: 36px;
    max-width: 95px;
    padding: 0 8px 0 12px !important;
}

/* 高码率会员图标 */
.bpx-player-ctrl-quality-badge-bigvip {
    background-color: #f25d8e;
    color: #fff;
    width: 16px;
    overflow: hidden;
    right: 8px !important;
}

/* 用字母 V 覆盖 */
.bpx-player-ctrl-quality-badge-bigvip:before {
    background-color: #f25d8e;
    color: #fff;
    content: 'V';
    padding: 0 4px;
    position: absolute;
    left: 0;
}

/* 倍速弹窗 */
.bpx-player-ctrl-playbackrate-menu {
    bottom: 22px !important;
}

.bpx-player-ctrl-playbackrate-menu-item {
    height: 7.7vw !important;
    max-height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 弹幕弹窗 */
div.bpx-player-ctrl-subtitle-box {
    bottom: 0;
    right: 0;
    transform: scale(.8);
}

/* 设置弹窗 */
.bpx-player-ctrl-setting-box {
    right: 0 !important;
    bottom: 0 !important;
}

/* 更多设置 */
.bpx-player-ctrl-setting-menu-right {
    padding: 5px !important;
}

.bpx-player-ctrl-setting-menu-right>div {
    height: 10vw !important;
    max-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 更多设置 - 选项行 */
.bpx-player-ctrl-setting-menu-right .bui-radio {
    margin: 0 0 8px 7px;
    width: 77%;
}

.bpx-player-ctrl-setting-others-content {
    width: 77% !important;
    margin-left: 7px;
}

/* 高能进度条选项 */
.bpx-player-ctrl-setting-highenergy .bui-checkbox-name {
    white-space: nowrap;
    width: 48px;
    overflow: hidden;
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

/* 隐藏旧控制栏 */
.bpx-player-control-wrap:not(.new) {
    display: none;
}

/* 窄屏不禁用控制条和阴影 (新控制栏默认不禁用阴影) */
.bpx-player-control-entity,
.bpx-player-control-mask {
    display: block !important;
}

/* 隐藏控制条时不响应点击 */
.bpx-player-container[data-ctrl-hidden=true] .bpx-player-control-bottom {
    display: none;
}

/* --------- 播完预览 --------- */

/* 窄屏不隐藏 */
.bpx-player-ending-wrap[hidden] {
    display: block !important;
}

/* .bpx-player-ending-content 的 scale 根据 screen-mode 和 data-screen 动态调整 */

/* 修改网页全屏样式为竖屏 */
div.bpx-player-container[data-screen=web] .bpx-player-ending-content {
    margin-left: -268px;
    width: 536px;
}

/* 关注按钮 */
.bpx-player-ending-functions-follow {
    width: auto !important;
    padding: 0 15px !important;
}

/* 重播按钮 */
.bpx-player-ending-functions-btn[data-action=restart] {
    padding-right: 15px !important;
}

/* 反馈按钮组 */
.bpx-player-ending-functions-pagecallback {
    margin-left: 5px !important;

    .bpx-player-ending-functions-btn {
        margin-left: 10px !important;
    }
}

/* 横屏展开顶部按钮 */
@media screen and (orientation: landscape) {
    .bpx-player-ending-functions-btn[data-action=restart] {
        padding-right: 42px !important;
    }

    .bpx-player-ending-functions-pagecallback {
        margin-left: 14px !important;

        .bpx-player-ending-functions-btn {
            margin-left: 28px !important;
        }
    }
}

/* 自动连播倒计时图标 */
.bpx-player-ending-related-item-countdown {
    margin-top: 34px !important;
    width: 48px !important;
}

/* up 名 */
.bpx-player-ending-functions-upinfo {
    height: 56px !important;
    margin-top: 0 !important;
}

/* 适配互动视频 */
.bui-swiper~.bpx-player-ending-related {
    height: 109px !important;
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
    border-bottom: 1px solid var(--line_regular);
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

/* 弹幕行高度、背景色 */
.bpx-player-sending-bar {
    height: var(--dm-row-height) !important;
    /* 适配 dark reader 全局变量值更改延后，否则临时白块 */
    background-color: white !important;
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
    line-clamp: 2;

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

.video-info-detail-list .item {
    margin-right: 4px !important;
}

/* 更新时间: 避免窄屏隐藏 */
.pubdate-ip {
    display: block !important;
}

/* 全站排行、每周必看等标签 & 温馨提示 */
.video-info-detail-list:has(.honor.item) {
    margin-top: 24px;
}

.video-info-detail-list:has(.video-argue.item) {
    margin-bottom: 20px;
}

.honor.item {
    position: absolute;
    align-self: start !important;
    top: 0;
}

.video-argue.item {
    position: absolute;
    align-self: start !important;
    bottom: 0;
    /* 避免窄屏隐藏温馨提示 */
    display: block !important;
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
div.resizable-component.resizable-component {
    width: 100% !important;
    left: 0 !important;
    height: fit-content !important;
    max-height: 100vw;
    top: 50% !important;
    transform: translateY(-50%);
    border-radius: 12px !important;
}

/* 总结内容继承高度限制 */
div.ai-summary-popup {
    max-height: inherit;
    border-radius: 12px;
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

/* 评论信息 (点赞等) */
.reply-info,
.sub-reply-info {
    justify-content: space-between;
}

.reply-info>*,
.sub-reply-info>* {
    margin-right: 0 !important;
}

/* 评论举报操作按钮 */
.reply-operation-warp,
.sub-reply-operation-warp {
    display: inline-flex !important;
    position: static !important;
}

.sub-reply-operation-warp {
    opacity: 1 !important;
}

.reply-info,
.sub-reply-info {
    font-size: 12px !important;
}

.reply-info>* .sub-reply-info>* {
    margin: 0 3px !important;
}

/* 评论投票 */
.vote-dialog {
    max-width: calc(100% - 10px);
}

/* 点击展开的评论详情 */
[itemprop=video]+body .dynamic-card {
    left: 0;
    max-width: 100%;
    /* 百分比以父元素为基准 */
    top: 50%;
    transform: translateY(-50%);
}

/* 内框 (在 iframe 内) */
div.bili-dyn-item-draw {
    min-width: 0;
    width: 100%;
}

/* 评论详情 - 头像 */
div.bili-dyn-item-draw__avatar {
    height: 62px;
}

/* 内容 */
.bili-dyn-item-draw__body {
    transform: translateX(-68px);
    /* 子元素的宽度会减去父元素的 padding (左间距=88px-68px=20px=右间距) */
    width: calc(100% + 68px);
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

/* 替代原 visible 类 */
.fixed-sidenav-storage .back-to-top[show] {
    transform: none;
}

/* 覆盖鼠标悬浮样式 */
#app .fixed-sidenav-storage .fixed-sidenav-storage-item:hover {
    background: white;
}

#app .fixed-sidenav-storage div.fixed-sidenav-storage-item.touch-active {
    background: var(--graph_bg_thick);
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
___CSS_LOADER_EXPORT___.push([module.id, `/* -------------------- 搜索页 ---------------------- */

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
    bottom: 0;
    z-index: 2;
    background: white;
    padding: 5px !important;
    opacity: 0;
    transition: calc(var(--actionbar-time)*1.62) ease-in;
}

.search-conditions.show {
    bottom: var(--actionbar-height);
    opacity: 1;
}

[scroll-hidden] .search-conditions {
    transform: translateY(calc(100% + var(--actionbar-height)));
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

/* 搜索页视频预览 */

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

/* 用户和直播 */
.media-list .col_6,
.live-user-cards .col_6 {
    max-width: 100% !important;
    flex: none !important;

    --avatar-scale: 56px;
}

.media-list .col_6 {
    margin-bottom: 10px !important;
}

/* 用户布局层 */
div.b-user-info-card {
    align-items: start;
}

/* 用户头像(用户, 直播) */
.col_6 .bili-avatar {
    height: var(--avatar-scale) !important;
    width: var(--avatar-scale) !important;
}

/* 头像外框 */
.search-user-avatar {
    width: var(--avatar-scale) !important;
    min-width: var(--avatar-scale) !important;
}

.avatar-wrap {
    height: var(--avatar-scale) !important;
}

/* 用户和直播内容 */
div.user-content,
div.live-content {
    width: 100% !important;
    padding-right: 0 !important;
}

div.user-content {
    height: 85px;
}

/* 用户名 */
.i_card_title {
    height: 20px;
}

h2.i_card_title>a {
    font-size: 16px;
}

/* 用户简介 */
.user-content span {
    position: absolute;
    left: calc(var(--avatar-scale) + 20px);
    top: 50px;
    white-space: wrap !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-right: 10px;
}

/* 关注按钮 */
.user-actions,
.live-actions {
    position: absolute;
    right: 10px;
    top: 20px;
}

.user-actions button,
.live-actions button {
    height: 26px !important;
    width: 70px !important;
    border-radius: 13px !important;
}

/* 直播的其它样式 */
.live-user-card {
    margin-bottom: 10px !important;
}

/* 直播标签 */
.live-tags {
    position: absolute;
    left: calc(var(--avatar-scale) + 15px);
    top: 50px;
    max-width: calc(100% - var(--avatar-scale) - 30px) !important;
}

/* 直播内容 */
div.live-content {
    height: 65px;
}

/* 标签 - 直播中 */
.search-user-avatar .live-tab {
    bottom: -16px !important;
}

/* 综合里的影视、番剧 */
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_space_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_space_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_space_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_space_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_space_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
___CSS_LOADER_EXPORT___.push([module.id, `/* ------------------- 个人主页 ----------------------- */

/* 包裹块、分栏内容 */
div.wrapper,
.content {
    max-width: 100%;
}

/* 单击页内搜索添加提示 */
div.header.space-search-tip {
    justify-content: center;
}

/* 隐藏提示下面的历史或建议 */
.space-search-tip+div {
    display: none;
}

/* --------- 导航栏 --------- */

/* 隐藏贴顶栏 (不是主页而是 up 名) */
#navigator-fixed {
    display: none;
}

/* 静态版块栏贴顶 */
#navigator.sticky {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
}

/* 移除搜索框: 隐藏后依然能模拟输入和代码触发元素点击事件 */
/* 用 CSS 属性 display: none; 隐藏元素后，虽然元素在视觉上消失了，但是它在 DOM 中仍然存在。这意味着仍然可以通过 JavaScript 与隐藏元素进行交互 */
#navigator .search-container {
    display: none;
}

/* 贴顶后内容区高度补偿 (移除搜索框后) */
#app:has(>.sticky)>.s-space {
    padding-top: 49px;
}

/* 内框 */
.n .n-inner {
    height: auto !important;
    padding: 0 !important;
}

/* 导航项框 */
.n .n-tab-links {
    display: flex !important;
    justify-content: space-evenly;
}

/* 导航项 */
#app .n .n-btn {
    line-height: unset;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .iconfont {
        margin-right: 0;
    }

    .n-text {
        line-height: 15px;
        width: 26px;
        white-space: nowrap;
        overflow: hidden;
    }

    .n-num {
        line-height: 14px;
        margin-left: 0;
        text-align: center;
    }
}

/* 导航: 排序 */
/* 投稿 */
.n .n-video.n-audio.n-article.n-album {
    order: -2;
}

/* 动态 */
.n .n-dynamic {
    order: -1;
}

/* 主页 .n .n-index.n-fans */

/* 合集 */
.n .n-channel {
    order: 1;
}

/* 收藏 */
.n .n-favlist {
    order: 2;
}

/* 课程 */
.n .n-pugv {
    order: 3;
}

/* 降低高度: 时长、充电头像、充电图 */
.col-1 span.length,
.col-2 .elec .elec-hito:nth-child(4),
.col-2 .elec .elec-status {
    z-index: 1;
}

/* --------- 关注栏 --------- */

/* 降低关注栏高度 */
#app .h {
    z-index: 1;
}

/* 折叠关注按钮栏 */
#app .h .h-action {
    position: fixed;
    background-color: #f1f2f3;
    left: 0;
    bottom: 0 !important;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    opacity: 0;
    /* easi-in 距离与时间的平方成正比 */
    transition: calc(var(--actionbar-time)*1.44) ease-in;
}

#app .h .h-action.show {
    bottom: var(--actionbar-height) !important;
    opacity: 1;
}

[scroll-hidden] #app .h .h-action {
    transform: translateY(calc(100% + var(--actionbar-height)));
}

.h .h-action .h-f-btn {
    margin: 10px;
}

/* 更多按钮 */
.be-dropdown.h-add-to-black {
    background: rgba(0, 0, 0, .45);
    box-shadow: 0 0 0 2px hsla(0, 0%, 100%, .3);
    border-radius: 4px;
}

/* --------- up 块 --------- */

/* up 块背景阴影 */
.h .h-gradient {
    height: 120% !important;
    background-size: auto 100%;
}

/* up 信息上空白 */
#app .h .h-inner {
    padding-top: 20px;
}

/* up 信息 */
#app .h .h-info {
    margin: 0 10px;
    padding-bottom: calc(40px + 12px);
}

/* up 简介 */
#app .h .h-sign {
    width: 100%;
    word-break: break-all;
    height: fit-content;
    line-height: 18px;
}

/* 关注、粉丝数 (height: 40px) */
.n .n-statistics {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    z-index: 10;
    /* 不减去左右 margin 会溢出 */
    width: calc(100% - 20px);
    height: auto !important;
    display: flex;
    justify-content: space-evenly;
    padding: 4px 0 5px;
    margin: 0 10px;
    border-top: 1px solid var(--line_regular);

    .n-data {
        padding: 0 5px;
        height: auto;
    }

    .n-data-k {
        color: white !important;
    }

    .n-data-v {
        color: hsla(0, 0%, 100%, .8) !important;
        margin-top: 0 !important;
    }
}

/* 宽度 100% 时, 溢出因素: margin、padding、border */

/* up 视频 */
#page-index .col-1 {
    max-width: calc(100% - 20px);
    padding: 0 10px !important;
    border: none !important;
    margin-bottom: 10px;
}

.channel-video {
    white-space: wrap !important;
}

/* ------ 已关注置顶推荐 ------ */

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

/* 描述 - 不限高 */
.i-pin-desc {
    max-height: unset !important;
}

/* ------ TA的视频 ------ */

/* 标题 */
.section-title {
    padding: 0 5px 33px !important;
}

/* 标题 - 视频排序 */
#page-index .video .be-tab {
    position: absolute;
    left: 0;
    transform: translateX(calc(50vw - 50%));
    margin: 33px 0 0 !important;
}

.be-tab-item {
    margin: 0 5px !important;
}

/* 标题 - 右侧按钮 */
.section .more,
.section-title .play-all-channel {
    margin-right: 5px;
}

/* TA的视频: 不限制高度 */
#page-index .video .content {
    max-height: unset !important;
}

/* 代表作 */
#i-masterpiece .i-mp-multi {
    height: unset;
}

#i-masterpiece .i-mp-multi .small-item {
    height: unset;
}

/* 某块视频 */
.small-item {
    width: calc(50% - 10px) !important;
    padding: 0 5px 5px !important;
}

.small-item .cover {
    width: 100% !important;
    height: auto !important;
}

.small-item .title {
    text-align: justify;
    line-break: anywhere;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    padding: 0 3px;
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

/* 隐藏回顶小飞机 */
#app .to-top {
    display: none !important;
}

/* --- 专栏项 (横向排列) -- */
.article-item .clearfix {
    display: flex;
}

/* 文本 */
.article-content {
    min-width: 0;
    padding-right: 10px;
    /* 元信息栏 width: 10vw */
    overflow: hidden;
}

/* 配图 */
.article-img {
    flex-shrink: 0;
}

/* 文本内容 */
.article-content .article-con a {
    height: 54px;
    line-height: 18px;
    white-space: normal;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

/* 文本标题 */
h2.article-title {
    max-height: unset;
    font-size: 17px;
    line-height: 20px;
}

.article-title a {
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

/* 元信息栏 (笔记类型、访问量) */
.article-content .meta-col {
    display: flex;
    justify-content: space-evenly;
    width: 100vw;

    span {
        margin-right: 0;
    }
}

/* 导航 - 动态 */

#page-dynamic .col-1 {
    max-width: 100%;
}

div.bili-dyn-item {
    min-width: 0;
}

div.bili-dyn-item__main {
    padding: 0 15px 0 60px;
}

div.bili-dyn-item__avatar {
    width: 60px;
    height: 77px;
}

/* 内容填充左侧空白 */
.bili-dyn-item__body {
    position: relative;
    left: -45px;
    width: calc(100% + 45px);
}

/* 封面尺寸 - 投稿边框 */
a.bili-dyn-card-video {
    border: 1px solid var(--line_regular);
    border-radius: 0 6px 6px 0;
}

/* 封面尺寸 */
div.bili-dyn-card-video__header {
    width: 40%;
    height: fit-content;
    align-self: center;
}

/* 投稿边框、内容 */
div.bili-dyn-card-video__body {
    border: none;
    min-height: 85px;
    padding: 10px 12px 8px;
}

div.bili-dyn-card-video__title {
    font-size: 14px;
}

/* 动态图片 */
.bili-album__preview__picture {
    width: 100% !important;
    height: 100% !important;
}

/* 动态图片 */
div.bili-album__preview.grid6 {
    width: unset;
}

/* 点赞评论 */
div.bili-dyn-action {
    width: unset;
}

div.bili-dyn-item__footer {
    position: relative;
    left: -45px;
    width: calc(100% + 45px);
    padding-right: 0;
    justify-content: space-around;
}

/* 导航 - 投稿 */

/* 菜单 */
div.contribution-sidenav {
    width: 100%;
}

div.contribution-sidenav .contribution-list-container {
    margin-bottom: 10px;
}

.contribution-list {
    display: flex;
    justify-content: space-evenly;
}


.contribution-sidenav li.contribution-item {
    padding-left: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contribution-sidenav a.text {
    width: auto;
}

.contribution-sidenav .num {
    position: absolute;
    left: calc(50% + 28px);
    transform: translateX(-50%);
}

/* 视频区 */
.contribution-sidenav~div.main-content {
    max-width: 100%;
    padding: 10px;
}

/* 标题 */
div.page-head {
    padding-bottom: 33px;
}

#page-video .page-head .be-tab {
    position: absolute;
    left: 0;
    transform: translateX(calc(50vw - 10px - 50%));
    margin: 33px 0 0;
}

/* 视频列表 */
#page-video .cube-list {
    max-width: 100%;
}

/* 修复向左偏移 */
#page-video div#submit-video-list {
    margin-left: 0;
}

/* 视频分类 */
#page-video div#submit-video-type-filter a {
    margin-right: 0;
    flex: 25%;
}

/* 导航 - 合集 */
/* 视频列表 */
#page-channel .series-item .video-list {
    flex-flow: wrap;
}

#page-channel .series-item .video-list li {
    /* flex-flow: row 则要用 0 0 50% */
    flex: 50%;
}

.video-list div.video-card {
    width: calc(100% - 10px);
    padding: 5px;
}

div.video-card.card-item .cover {
    width: 100%;
    height: fit-content;
}

/* 列表标题 */
#page-channel .series-item .header .btn {
    font-size: 12px;
}

/* --- 搜索页 --- */

.s-space .search-page {
    flex-direction: column;
    max-width: 100%;
}

/* 导航 */
.s-space .search-page .search-nav {
    display: flex;
}

div.s-space .search-nav-item {
    padding-left: 0;
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.s-space .search-nav-item .text {
    width: unset;
}

/* 搜索页内容 (padding 影响底部 - 没有更多) */
.s-space .search-page .feed-dynamic {
    max-width: 100%;
    padding: 0 12px;
}

div.feed-dynamic .feed-card {
    min-width: 0;
}

div.feed-card .card {
    min-width: 0;
}

/* 动态 */
div.feed-card .card .main-content {
    width: calc(100% - 60px);
    margin-left: 60px;
}

/* 头像 */
div.feed-card .card .user-head {
    left: 0;
}

/* 动态内容 */
div.main-content .card-content {
    position: relative;
    left: -60px;
    width: calc(100% + 60px);
}

div.card-content .imagesbox {
    max-width: 100%;
}

/* 投稿 */
div.card-content .video-container {
    max-width: 100%;
    height: unset;
}

.video-container .video-wrap {
    display: flex;
}

div.card-content .video-container .image-area {
    flex: 40%;
    height: fit-content;
    align-self: center;
}

div.card-content .video-container .text-area {
    width: unset;
    margin: 0 8px 0 12px;
    flex: 60%;
}

div.card-content .video-container .text-area .content {
    margin-top: 5px;
    line-height: 16px;
    height: unset;
}

/* 没有更多 */
div.feed-dynamic-content .div-load-more .no-more {
    margin-bottom: var(--actionbar-height);
}

div.feed-dynamic-content .div-load-more .no-more .end-img {
    position: absolute;
    /* .feed-dynamic 的左 padding */
    width: calc(100% + 24px);
    left: -12px;
    bottom: 0;
}

/* 我的信息 */
.h .h-basic {
    max-width: calc(100% - 22px - 60px);
}

/* 个性签名 */
.h #h-sign {
    max-width: 100%;
}

/* 订阅番剧 */
.large-item {
    max-width: 100%;
}

/* 空上传视频 */
div.sec-empty-hint {
    left: 104px;
    top: 3px;
}

/* ------ 我的关注 ------ */

#page-follows div.follow-main {
    max-width: 100%;
    border: none;
}

/* 关注用户 */
#page-follows .list-item {
    padding: 10px 0 8px;
}

/* 关注用户内容 */
#page-follows .list-item div.content {
    padding-right: 0;
    margin-left: 75px;
}

/* 关注用户操作块 */
#page-follows .list-item .fans-action {
    top: 0;
}

/* 关注用户描述 */
#page-follows .follow-main .list-item p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: unset;
    font-size: 13px;
    line-height: 16px;
    height: 32px;
    line-break: anywhere;
    padding: 3px 20px 0 0;
    width: calc(100% - 20px);
}

/* 设置分组 */
div.follow-dialog-wrap .follow-dialog-window {
    max-width: 100%;
    margin-left: 0;
    transform: translate(-50%, -50%);
}

div.follow-dialog-wrap .follow-dialog-window .content {
    padding: 0 10px;
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
___CSS_LOADER_EXPORT___.push([module.id, `/* ------------- 消息页(fuck: 顶栏不统一) ------------ */

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
div.international-header .nav-search-box {
    position: absolute;
    width: 100%;
    left: 0;
    top: 64px;
    padding: 10px 20px 5px;
    z-index: 3;
    margin: 0;

    opacity: 0;
    transform: scale(.9);
    transition: .4s ease-in;
    display: none;
}

div.international-header .nav-search-box[show] {
    opacity: 1;
    transform: none;
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
    left: -140px;
    transition: transform .4s ease-in;
}

body>.container[sidebar] .space-left {
    transform: translateX(100%);
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
/* harmony export */   countViewTime: () => (/* binding */ countViewTime),
/* harmony export */   handleScroll: () => (/* binding */ handleScroll),
/* harmony export */   increaseVideoLoadSize: () => (/* binding */ increaseVideoLoadSize),
/* harmony export */   preventBeforeUnload: () => (/* binding */ preventBeforeUnload)
/* harmony export */ });
/* global GM_getValue GM_setValue unsafeWindow */

function preventBeforeUnload () {
  const originalAddEventListener = window.addEventListener
  // 重写 addEventListener 方法，禁止网站刷新时的弹窗
  window.addEventListener = (type, listener, options) =>
    type === 'beforeunload' || originalAddEventListener.call(this, type, listener, options)
}

// 增加视频加载数量函数
function increaseVideoLoadSize () {
  // 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用
  // typeof undefinedVariable 不会报错，而是返回 'undefined'

  const _unsafeWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
  // 不使用 //@grant none 则沙盒运行; unsafeWindow: 重写 fetch, MouseEvent 对象的 view 属性

  const originalFetch = _unsafeWindow.fetch
  _unsafeWindow.fetch = (input, init) => {
    if (typeof input === 'string' && input.startsWith('https://api.bilibili.com') && input.includes('feed/rcmd')) {
      input = input.replace('&ps=12&', '&ps=30&')
    }
    return originalFetch(input, init)
  }
}

function countViewTime () {
  window.onload = function () {
    let storedTime = GM_getValue('view-time', undefined)
    let storedTimestamp = GM_getValue('timestamp', undefined)

    if (storedTime && storedTimestamp) {
      const diff = Math.floor((Date.now() - storedTimestamp) / 1000 / 60)
      storedTime = diff < 2 ? storedTime + diff : 0
    } else {
      storedTime = 0
    }
    storedTimestamp = Date.now()

    GM_setValue('view-time', storedTime)
    GM_setValue('timestamp', storedTimestamp)

    setInterval(function () {
      storedTime++
      GM_setValue('view-time', storedTime)
      GM_setValue('timestamp', Date.now())
      if (storedTime % 120 === 0) {
        const fullscreenElem = document.fullscreenElement
        if (fullscreenElem && !fullscreenElem.querySelector(':scope>#toast')) {
          fullscreenElem.appendChild(document.querySelector('#toast').cloneNode())
        }
        const toasts = document.querySelectorAll('#toast')

        toasts.forEach(toast => {
          toast.textContent = `您已连续浏览 ${storedTime / 60} 小时，请注意休息`
          toast.style.display = 'block'
          setTimeout(() => { toast.setAttribute('show', '') }, 10)

          setTimeout(() => {
            toast.removeAttribute('show')
            toast.addEventListener('transitionend', () => { toast.style.cssText = '' }, { once: true })
          }, 5000)
        })
      }
    }, 60000)
  }
}

/**
 * 管理滚动和滑动事件的函数
 * @param {string} page - 简短描述页面的字符串: search, video, message, space
 */
function handleScroll (page) {
  if (page !== 'video') { scrollToHidden() }

  switch (page) {
    case 'search':
      slideSearchSort()
      break
    case 'video':
      scrollToHidden('video')
      slideVideoSidebar()
      break
    case 'message':
      slideMessageSidebar()
      break
    case 'space':
      handleSpaceSwipe()
      break
    default:
      break
  }
}

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
function scrollToHidden (page) {
  let lastScrollY = 0
  const scrollThreshold = 75

  // if (page !== 'video') {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY
    const offsetY = currentScrollY - lastScrollY

    if (currentScrollY < scrollThreshold) { document.body.removeAttribute('scroll-hidden') }

    if (Math.abs(offsetY) > scrollThreshold) {
      offsetY > 0 ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
      lastScrollY = currentScrollY
    }
  })
  // } else {
  //   const leftContainer = document.body.querySelector('.left-container')
  //   const backToTop = document.getElementsByClassName('back-to-top')[0]

  //   leftContainer.addEventListener('scroll', () => { // change
  //     const currentScrollY = leftContainer.scrollTop // change
  //     const offsetY = currentScrollY - lastScrollY

  //     if (currentScrollY < scrollThreshold) { document.body.removeAttribute('scroll-hidden') }

  //     if (Math.abs(offsetY) > scrollThreshold) {
  //       offsetY > 0 ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
  //       lastScrollY = currentScrollY
  //     }

  //     // 修复更改滚动区后的置顶按钮不显示
  //     currentScrollY > leftContainer.clientHeight ? backToTop?.setAttribute('show', '') : backToTop?.removeAttribute('show')
  //   })

  //   backToTop.addEventListener('click', () => {
  //     leftContainer.scrollTo({ top: 0 })
  //     backToTop.classList.add('touch-active')
  //     backToTop.addEventListener('transitionend', () => { backToTop.classList.remove('touch-active') }, { once: true })
  //   })
  // }
}

function slideSearchSort () {
  let startX = 0; let startY = 0

  let clickIndex = 3
  const touchXThreshold = 55

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    const offsetX = event.changedTouches[0].clientX - startX
    const offsetY = event.changedTouches[0].clientY - startY

    const navItems = [4, 3, 2, 1, 7, 6, 5]

    if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
      offsetX > 0 ? clickIndex-- : clickIndex++
      document.querySelector(`.vui_tabs--nav-item:nth-child(${navItems[clickIndex]})`).click()
    }
  }

  const container = document.querySelector('#i_cecream')
  container.addEventListener('touchstart', handleTouchStart)
  container.addEventListener('touchend', handleTouchEnd)
}

function slideVideoSidebar () {
  let startX = 0; let startY = 0

  const touchXThreshold = 55
  const videoContainer = document.querySelector('#mirror-vdcon')

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    const offsetX = event.changedTouches[0].clientX - startX
    const offsetY = event.changedTouches[0].clientY - startY

    if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
      const isToShow = offsetX < 0

      if (isToShow !== videoContainer.hasAttribute('sidebar')) {
        isToShow ? videoContainer.setAttribute('sidebar', '') : videoContainer.removeAttribute('sidebar')
      }
    }
  }

  videoContainer.addEventListener('touchstart', handleTouchStart)
  videoContainer.addEventListener('touchend', handleTouchEnd)
}

function slideMessageSidebar () {
  let startX = 0; let startY = 0

  const touchXThreshold = 55
  const messageContainer = document.querySelector('body>.container')

  const sidebarOverlay = document.querySelector('#sidebar-overlay')
  const sidebarFab = document.querySelector('#sidebar-fab')

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    const offsetX = event.changedTouches[0].clientX - startX
    const offsetY = event.changedTouches[0].clientY - startY

    if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
      const isToShow = GM_getValue('message-sidebar-right', false) ? offsetX < 0 : offsetX > 0

      if (isToShow !== messageContainer.hasAttribute('sidebar')) {
        if (isToShow) {
          messageContainer.setAttribute('sidebar', '')
          sidebarOverlay.classList.add('show')
          sidebarFab.classList.add('active')
        } else {
          messageContainer.removeAttribute('sidebar')
          sidebarOverlay.classList.remove('show')
          sidebarFab.classList.remove('active')
        }
      }
    }
  }

  messageContainer.addEventListener('touchstart', handleTouchStart)
  messageContainer.addEventListener('touchend', handleTouchEnd)
  sidebarOverlay.addEventListener('touchstart', handleTouchStart)
  sidebarOverlay.addEventListener('touchend', handleTouchEnd)
}

// 处理space滚动和滑动事件
function handleSpaceSwipe () {
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode.id === 'app') {
          setTimeout(scrollToStick, 50) // 等待粉丝牌宽度 (可能影响高度) 动态加载
          slideSpaceNavigator()
          observer.disconnect()
        }
      })
    })
  })
  observer.observe(document.body, { childList: true })

  function scrollToStick () {
    const navigator = document.querySelector('#navigator')
    const threshold = navigator.getBoundingClientRect().top

    let isStuck = false

    window.addEventListener('scroll', () => {
      if (isStuck !== (window.scrollY > threshold)) {
        navigator.classList.toggle('sticky')
        isStuck = !isStuck
      }
    })
  }

  function slideSpaceNavigator () {
    let startX = 0; let startY = 0

    const touchXThreshold = 55

    const current = document.querySelector('#navigator .active')
    const siblings = Array.from(document.querySelectorAll('#navigator .n-btn')).sort((a, b) => {
      return parseInt(getComputedStyle(a).order) - parseInt(getComputedStyle(b).order)
    })
    let index = siblings.findIndex(el => el === current)

    const handleTouchStart = event => {
      startX = event.changedTouches[0].clientX
      startY = event.changedTouches[0].clientY
    }

    const handleTouchEnd = event => {
      const offsetX = event.changedTouches[0].clientX - startX
      const offsetY = event.changedTouches[0].clientY - startY

      if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
        offsetX > 0 ? index-- : index++
        siblings[index].click()
      }
    }

    const container = document.querySelector('#app')
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)
  }
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleScriptPreSetting: () => (/* binding */ handleScriptPreSetting),
/* harmony export */   handleScriptSetting: () => (/* binding */ handleScriptSetting),
/* harmony export */   setScriptHelp: () => (/* binding */ setScriptHelp)
/* harmony export */ });
/* global GM_getValue GM_setValue GM_registerMenuCommand */
function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

// 脚本预加载设置
function handleScriptPreSetting () {
  const defaultValue = Array(6).fill(false)

  const css = {
    css1: `
      .bpx-player-sending-area.bpx-player-sending-area {display:none !important;}
      .left-container.left-container {padding:5px 10px 10px;}
      html body {--commentbox-display: none;}
    `,
    css2: '#v_tag {display:none !important;}',
    css3: `
      .copyright.item {display:none !important;}
      .show-more {display:none;}
    `,
    css4: '.trending {display:none;}',
    css5: '.bpx-player-ctrl-volume, .bpx-player-ctrl-full, .bpx-player-ctrl-web {display: none;}',
    css6: `
      .bili-footer {display: none;}
      .vui_pagenation {padding-bottom: var(--actionbar-height);}
    `
  } // 对象的值可通过 object[key] 获取

  readScriptSetting()

  if (GM_getValue('home-single-column', false)) { homeSingleColumn() }

  waitDOMContentLoaded(() => {
    createSettingPanel()

    GM_registerMenuCommand('元素隐藏设置', () => {
      const settingPanel = document.getElementById('setting-panel-style')
      settingPanel.style.display = 'flex'
      setTimeout(() => { settingPanel.setAttribute('show', '') }, 10) // 修复搜索页show类优先块状显示
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
              id: `script-pre-style-${index}`, textContent: values[index]
            })
            document.head.appendChild(scriptPreStyle)
          } else {
            document.getElementById(`script-pre-style-${index}`)?.remove()
          }
        }
      }
    } else {
      for (const [index, value] of values.entries()) {
        if (settingShowHidden[index]) {
          const scriptPreStyle = Object.assign(document.createElement('style'), {
            id: `script-pre-style-${index}`, textContent: value
          })
          document.head.appendChild(scriptPreStyle)
        }
      }
    }
  }

  function homeSingleColumn () {
    const style = Object.assign(document.createElement('style'), {
      id: 'home-single-column',
      textContent: `
      div.recommended-container_floor-aside .container {
          grid-template-columns: repeat(1, 1fr) !important;
      }

      div.bili-video-card.is-rcmd,
      div.bili-live-card.is-rcmd {
          --cover-radio: 56.25% !important;
      }

      /* 修复直播info占位高度变窄 */
      .bili-live-card__skeleton--right {
        height: 70px;
      }
      `
    })
    document.head.appendChild(style)
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

      settingPanel.removeAttribute('show')
      settingPanel.addEventListener('transitionend', () => { settingPanel.style.cssText = '' }, { once: true })
    })
  }
}

// 脚本设置
function handleScriptSetting () {
  const keyValues = {
    key1: 'ban-video-click-play',
    key2: 'ban-action-hidden',
    key3: 'message-sidebar-change-right',
    key4: 'home-single-column',
    key5: 'allow-video-slid',
    key6: 'menu-dialog-move-down'
  }

  const keyNames = {
    'ban-video-click-play': '禁用点击视频播放/暂停',
    'ban-action-hidden': '禁止底栏滚动时隐藏',
    'message-sidebar-change-right': '消息页侧边栏靠右',
    'home-single-column': '首页单列推荐',
    'allow-video-slid': '视频滑动调整进度',
    'menu-dialog-move-down': '菜单弹窗(收藏、历史等)靠下'
  }

  const customKeyValues = {
    'menu-dialog-move-down-value': '20',
    'video-longpress-speed': '2',
    'header-image-source': 'bing'
  }

  const customKeyNames = {
    'menu-dialog-move-down-value': '自定义菜单弹窗底边距',
    'video-longpress-speed': '自定义视频长按倍速',
    'header-image-source': '主页头图换源'
  }

  const menuOptions = {
    key: 'modify-menu-options',
    value: [true, ...Array(6).fill(false)],
    names: ['热门', '消息', '动态', '收藏', '历史', '主页', '关注']
  }

  // 初始化设置
  initSettings()

  // 创建设置面板
  createSettingPanel()

  // 注册菜单命令
  GM_registerMenuCommand('操作偏好设置', () => {
    const settingPanel = document.getElementById('setting-panel-preference')
    settingPanel.style.display = 'flex'
    setTimeout(() => { settingPanel.setAttribute('show', '') }, 10)
  })

  function initSettings () {
    if (GM_getValue('ban-action-hidden', false)) { banActionHidden() }
    if (GM_getValue('message-sidebar-change-right', false)) { messageSidebarRight() }
    if (GM_getValue('menu-dialog-move-down', false)) { menuDialogMoveDown() }
    if (GM_getValue('home-single-column', false)) { homeSingleColumn() }
    if (!GM_getValue(menuOptions.key, menuOptions.value).every(item => item === false)) { modifyMenuOptions() }
  }

  function banActionHidden () {
    appendStyle('ban-action-hidden', `
      [scroll-hidden] #actionbar,
      [scroll-hidden] .flexible-roll-btn-inner,
      [scroll-hidden] .top-btn {
        transform: none !important;
      }
    `)
  }

  function messageSidebarRight () {
    appendStyle('message-sidebar-change-right', `
      .space-left.space-left { left: 100%; }      
      body>.container[sidebar] .space-left.space-left { transform: translateX(-100%); }
    `)
  }

  function menuDialogMoveDown () {
    const downValue = GM_getValue('menu-dialog-move-down-value', '20')
    appendStyle('menu-dialog-move-down-value', `
      div.bili-header .v-popover.v-popover {
        top: unset !important;
        bottom: var(--actionbar-height);
        transform: translate(-50%, -${downValue}px) scale(.9);
      }
      div.bili-header .v-popover.v-popover[show] {
        transform: translate(-50%, -${downValue}px) !important;
      }
    `)
  }

  function homeSingleColumn () {
    appendStyle('home-single-column', `
      div.recommended-container_floor-aside .container {
        grid-template-columns: repeat(1, 1fr) !important;
      }
      div.bili-video-card.is-rcmd,
      div.bili-live-card.is-rcmd {
        --cover-radio: 56.25% !important;
      }
      .bili-live-card__skeleton--right {
        height: 70px;
      }
    `)
  }

  function modifyMenuOptions () {
    const options = GM_getValue(menuOptions.key, menuOptions.value)
    let selector = ''
    options.forEach((value, index) => {
      if (value) { selector += `#header-in-menu ul li:nth-of-type(${index + 1}), ` }
    })
    appendStyle('modify-menu-options', `${selector.slice(0, -2)} { display: none; }`)
  }

  function appendStyle (id, textContent) {
    const style = Object.assign(document.createElement('style'), { id, textContent })
    document.head.appendChild(style)
  }

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-preference',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">操作偏好</div>
        <div class="setting-checkboxes">
        ${Object.values(keyValues).map((key) => `
          <label><input type="checkbox" data-key="${key}"><span>${keyNames[key]}</span></label>
        `).join('')}
        ${Object.entries(customKeyValues).filter(([key]) => key !== 'header-image-source').map(([key, value]) => `
          <label><input type="number" value="${value}" data-key="${key}"><span>${customKeyNames[key]}</span></label>
        `).join('')}
          <label><select class="header-image-source" data-key="header-image-source">
              <option value="local">本地图片</option>
              <option value="bing">必应每日</option>
              <option value="unsplash">Unsplash</option>
              <option value="picsum">Picsum</option>
              <option value="meizi">妹子⏳</option>
              <option value="dongman">动漫⏳</option>
              <option value="fengjing">风景⏳</option>
              <option value="suiji">随机⏳</option>
          </select><details><summary>主页头图换源</summary>本地图片限制大小</details></label>
          <label class="modify-menu-options"><span>修改菜单显示选项</span></label>
        </div>
        <button id="setting-conform-2" class="setting-conform">确认</button>
      `
    })
    document.body.appendChild(settingPanel)

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    const customElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="number"], .setting-checkboxes select')

    checkboxElements.forEach((checkbox, index) => {
      checkbox.checked = GM_getValue(Object.values(keyValues)[index], false)
    })

    customElements.forEach((elem, index) => {
      elem.value = GM_getValue(Object.keys(customKeyValues)[index], Object.values(customKeyValues)[index])
    })

    settingPanel.querySelector('#setting-conform-2').addEventListener('click', () => {
      const selectedValues = Array.from(checkboxElements).map(checkbox => checkbox.checked)
      const writenValues = Array.from(customElements).map(elem => elem.value)

      selectedValues.forEach((value, index) => {
        const key = Object.values(keyValues)[index]
        if (value !== GM_getValue(key, false)) {
          GM_setValue(key, value)
          switch (key) {
            case 'ban-action-hidden': value ? banActionHidden() : document.getElementById(key).remove(); break
            case 'message-sidebar-change-right': value ? messageSidebarRight() : document.getElementById(key).remove(); break
            case 'menu-dialog-move-down': value ? menuDialogMoveDown() : document.getElementById(key + '-value').remove(); break
            case 'home-single-column': value ? homeSingleColumn() : document.getElementById(key).remove(); break
          }
        }
      })

      writenValues.forEach((value, index) => {
        const key = Object.keys(customKeyValues)[index]
        if (value !== GM_getValue(key, Object.values(customKeyValues)[index])) {
          GM_setValue(key, value)
          if (key === 'menu-dialog-move-down-value') {
            document.getElementById(key)?.remove()
            menuDialogMoveDown()
          } else if (key === 'header-image-source' && value !== 'local') {
            window.dispatchEvent(new CustomEvent('variableChanged', { detail: { key, newValue: value } }))
          }
        }
      })

      settingPanel.removeAttribute('show')
      settingPanel.addEventListener('transitionend', () => { settingPanel.style.cssText = '' }, { once: true })
    })

    settingPanel.querySelector('.header-image-source').addEventListener('change', event => {
      if (event.target.value === 'local') {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.addEventListener('change', () => {
          const file = input.files[0]
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const base64Data = reader.result
            localStorage.setItem('header-image', base64Data)
          }
        })
        input.click()
      }
    })

    settingPanel.querySelector('.modify-menu-options').addEventListener('click', () => {
      const settingPanel = Object.assign(document.createElement('div'), {
        id: 'setting-panel-modify-menu-options',
        className: 'setting-panel mini',
        innerHTML: `
          <div class="setting-title">隐藏选项</div>
          <div class="setting-checkboxes">
            ${menuOptions.names.map((name, index) => `
              <label><input type="checkbox" data-index="${index}"><span>${name}</span></label>
            `).join('')}
          </div>
          <button id="setting-conform-3" class="setting-conform">确认</button>
        `
      })
      document.body.appendChild(settingPanel)

      const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
      const oldValues = GM_getValue(menuOptions.key, menuOptions.value)

      checkboxElements.forEach((element, index) => {
        element.checked = oldValues[index]
      })

      settingPanel.querySelector('#setting-conform-3').addEventListener('click', () => {
        const selectedValues = Array.from(checkboxElements).map(checkbox => checkbox.checked)

        if (selectedValues !== oldValues) {
          GM_setValue(menuOptions.key, selectedValues)
          document.head.querySelector('#modify-menu-options')?.remove()
          modifyMenuOptions()
        }

        settingPanel.remove()
      })
    })
  }
}

// 脚本帮助
function setScriptHelp () {
  createSettingPanel()

  GM_registerMenuCommand('脚本说明', () => {
    const settingPanel = document.getElementById('setting-panel-help')
    settingPanel.style.display = 'flex'
    setTimeout(() => { settingPanel.setAttribute('show', '') }, 10)
  })

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-help',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">脚本说明</div>
        <div class="setting-content">
          <li>视频页：双击全屏按钮竖屏播放，左右滑动切换侧边栏</li>
          <li>搜索页：双击搜索按钮清空输入框，左右滑动切换分类</li>
          <li>个人空间：双击搜索按钮全局搜索，左右滑动切换分类</li>
          <li>作者持续改进和处理反馈，交流群：113980230</li>
          <li>Firefox 推荐扩展：<a href="https://addons.mozilla.org/zh-CN/firefox/addon/uaswitcher/" target="_blank">User Agent Switcher</a></li>
          <li>更多自定义功能，请查看脚本设置</li>
        </div>
        <button id="setting-conform-3" class="setting-conform">关闭</button>
      `
    })
    document.body.appendChild(settingPanel)

    settingPanel.querySelector('#setting-conform-3').addEventListener('click', () => {
      settingPanel.removeAttribute('show')
      settingPanel.addEventListener('transitionend', () => { settingPanel.style.cssText = '' }, { once: true })
    })

    if (GM_getValue('is-first-use', true)) {
      settingPanel.style.display = 'flex'
      setTimeout(() => { settingPanel.setAttribute('show', '') }, 10)
      GM_setValue('is-first-use', false)
    }
  }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleActionbar: () => (/* binding */ handleActionbar)
/* harmony export */ });
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _sidebar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);




/**
 * 管理操作栏的函数 (DOMContentLoaded 之后)
 * @param {string} page - 简短描述页面的字符串: home, video, search, space, message
 */
function handleActionbar (page) {
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

  document.body.appendChild(Object.assign(document.createElement('div'), { id: 'toast' }))

  actionbar.classList.add(page)
  setHomeBtn()
  ;(0,_search_js__WEBPACK_IMPORTED_MODULE_0__.setSearchBtn)(page)
  if (page !== 'message') { (0,_menu_js__WEBPACK_IMPORTED_MODULE_1__.setMenuBtn)() }

  switch (page) {
    case 'home':
      setTopBtn()
      setRefreshBtn()
      break
    case 'video':
      setFullbtn()
      ;(0,_sidebar_js__WEBPACK_IMPORTED_MODULE_2__.setSidebarBtn)(page)
      break
    case 'search':
      setTopBtn()
      setShowMoreBtn()
      break
    case 'space':
      setTopBtn()
      setShowMoreBtn()
      break
    case 'message':
      ;(0,_sidebar_js__WEBPACK_IMPORTED_MODULE_2__.setSidebarBtn)(page)
      break
    default:
      break
  }

  function setTopBtn () {
    const topBtn = document.getElementById('my-top')
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0 }))
  }

  function setHomeBtn () {
    const home = document.getElementById('my-home')
    home.addEventListener('click', () => (location.href = 'https://www.bilibili.com/'))
  }

  function setRefreshBtn () {
    const refreshFab = document.getElementById('refresh-fab') // 返回动态 HTML Collection

    // 使用rollBtn?.click可选链操作符前的rollBtn会立即执行，如果rollBtn存在才传递该元素的click函数引用。而创建了一个新的箭头函数()=>{rollBtn?.click()}则会在监听事件触发时才执行rollBtn
    refreshFab.addEventListener('click', () => { document.querySelector('.flexible-roll-btn-inner')?.click() })
  }

  function setFullbtn () {
    let clickTimer = null

    const fullBtn = document.getElementById('full-now')

    function playVideo () {
      const video = document.querySelector('video')
      video.play()
      video.muted = false
      if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }
    }

    fullBtn.addEventListener('click', () => {
      clearTimeout(clickTimer) // 双击会产生两次单击事件和两个定时器, 双击事件只能清除第二个定时器

      // via 报错：DOMException: play() can only be initiated by a user gesture. 是浏览器为防止未经请求的视频播放而实施的安全措施。
      // 如果 video.play() 方法是在 setTimeout 函数中调用的，这不被视为直接用户手势。
      playVideo()

      clickTimer = setTimeout(() => {
        const videoWrap = document.querySelector('.bpx-player-video-wrap')
        videoWrap.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
      }, 250)
    })

    fullBtn.addEventListener('dblclick', () => { clearTimeout(clickTimer) })
  }

  function setShowMoreBtn () {
    const showMoreFab = document.getElementById('show-more-fab')

    const handleClick = () => {
      if (page === 'search') {
        const searchConditions = document.querySelector('.search-conditions')

        if (searchConditions) {
          if (sessionStorage.getItem('show-conditions') !== 'true') {
            searchConditions.style.transition = '.4s ease-in'
            searchConditions.classList.add('show')
            searchConditions.addEventListener('transitionend', () => { searchConditions.style.transition = '' }, { once: true })

            showMoreFab.classList.add('reverse')
            sessionStorage.setItem('show-conditions', 'true')
          } else {
            searchConditions.style.transition = '.4s ease-in'
            searchConditions.classList.remove('show')
            searchConditions.addEventListener('transitionend', () => { searchConditions.style.transition = '' }, { once: true })

            showMoreFab.classList.remove('reverse')
            sessionStorage.setItem('show-conditions', '')
          }
        }
      } else if (page === 'space') {
        const followRow = document.querySelector('.h .h-action')

        followRow.style.transition = '.4s ease-in'
        followRow?.classList.toggle('show')
        followRow.addEventListener('transitionend', () => { followRow.style.transition = '' }, { once: true })

        showMoreFab.classList.toggle('reverse')
      }
    }
    showMoreFab.addEventListener('click', handleClick)
  }
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSearchBtn: () => (/* binding */ setSearchBtn)
/* harmony export */ });
/**
 * 设置不同页面的搜索事件的函数
 */
function setSearchBtn (page) {
  const searchFab = document.getElementById('search-fab')
  const svg = searchFab.querySelector('svg')

  const searchOverlay = document.createElement('div')
  searchOverlay.id = 'search-overlay'
  searchFab.appendChild(searchOverlay)

  const searchContainerSelector = page === 'message' ? '.nav-search-box' : '.center-search-container'

  let clickTimer = null

  function handleClick (input) {
    // 滑动时 .center-search-container 的 class 会刷新
    const searchContainer = document.querySelector(`${searchContainerSelector}`)

    searchContainer.style.cssText = 'display: block !important' // 修复搜索页优先隐藏
    // 在同一个执行上下文中修改多个 CSS 属性时，浏览器会将这些属性的变化合并为一个重绘和重排操作
    setTimeout(() => { searchContainer.setAttribute('show', '') }, 10)

    input.focus()
    searchOverlay.classList.add('show')
    searchFab.classList.add('active')
  }

  /**
     * 单击事件、双击事件、searchOverlay 共用的 input
     */
  let input = null

  if (page !== 'search' && page !== 'space') {
    searchFab.addEventListener('click', () => {
      input = document.querySelector(`${searchContainerSelector} input`)
      if (!input) { return }

      handleClick(input)
    })
  }

  if (page === 'search') {
    // 底部显示搜索文本
    const pageInput = document.querySelector('.search-input input')

    const searchFabText = Object.assign(document.createElement('div'), { id: 'search-fab-text', textContent: pageInput.value })
    searchFab.appendChild(searchFabText)

    searchFab.style.cssText = 'background-color: var(--graph_bg_thick); border-radius: 16px;'
    svg.style.flex = '0 0 20px'

    // 文本更新到底部搜索
    const handleInput = () => {
      searchFabText.textContent = input.value
      if (input.value === '') {
        searchFab.style.cssText = ''
        svg.style.flex = ''
      } else {
        searchFab.style.cssText = 'background-color: var(--graph_bg_thick); border-radius: 16px;'
        svg.style.flex = '0 0 20px'
      }
    }

    searchFab.addEventListener('click', () => {
      input = document.querySelector(`${searchContainerSelector} input`)
      if (!input) { return }

      clearTimeout(clickTimer)

      clickTimer = setTimeout(() => {
        handleClick(input)

        // 移除之前添加的 input 事件监听器
        input.removeEventListener('input', handleInput)

        // 模拟输入: 将文本填入底部搜索
        input.value = searchFabText.textContent
        input.dispatchEvent(new Event('input', { bubbles: true }))

        handleInput()

        input.addEventListener('input', handleInput)
      }, 300)
    })

    searchFab.addEventListener('dblclick', () => {
      if (!input) { return } // return 语句结束当前函数的执行

      clearTimeout(clickTimer)

      handleClick(input)

      input.value = ''
      input.dispatchEvent(new Event('input', { bubbles: true }))

      searchFabText.textContent = input.value
      searchFab.style.cssText = ''
      svg.style.flex = ''

      handleInput()

      input.removeEventListener('input', handleInput)
      input.addEventListener('input', handleInput)
    })
  }

  if (page === 'space') {
    // 使用 let handleInput 声明变量并在内部块中赋值时，实际上是在创建一个新的函数。即使引用移除事件监听器时能访问到 let handleInput 变量，但是此时 handleInput 变量引用的函数并不是添加事件监听器时使用的那个函数
    const spaceHandleInput = event => {
      if (event.key === 'Enter') {
        const spaceInput = document.querySelector('#navigator .space_input')
        const spaceSearchBtn = document.querySelector('#navigator .search-btn')

        event.preventDefault()
        spaceInput.value = input.value
        spaceInput.dispatchEvent(new Event('input', { bubbles: true }))
        spaceSearchBtn.click()

        searchOverlay.click()
      }
    }

    searchFab.addEventListener('click', () => {
      input = document.querySelector(`${searchContainerSelector} input`)
      if (!input) { return }

      clearTimeout(clickTimer)

      clickTimer = setTimeout(() => {
        handleClick(input)
        // 移除之前添加的 keydown 事件监听器
        input.removeEventListener('keydown', spaceHandleInput)

        // 移除事件监听器时，回调函数需要与添加事件监听器时使用的回调函数完全一致。内联定义的新箭头函数不是添加事件监听器时使用的原始回调函数
        // 引用回调函数时，形参写在函数声明中，不需要内联一个匿名函数 (匿名内部函数, 无函数名)
        input.addEventListener('keydown', spaceHandleInput)

        const searchPanel = document.querySelector('.search-panel')
        const firstChild = searchPanel.firstChild
        if (firstChild.nodeType === Node.COMMENT_NODE || !firstChild.classList.contains('space-search-tip')) {
          const spaceSearchTip = Object.assign(document.createElement('div'), {
            className: 'header space-search-tip', innerHTML: '<div class="title">搜索 up 的视频、动态</div>'
          })
          searchPanel.insertBefore(spaceSearchTip, firstChild)
        }
      }, 300)
    })

    searchFab.addEventListener('dblclick', () => {
      if (!input) { return }

      clearTimeout(clickTimer)

      handleClick(input)

      input.removeEventListener('keydown', spaceHandleInput)

      document.querySelector('.space-search-tip')?.remove()
    })
  }

  // 避免存在双击事件时的延时操作导致视频页滑动阴影无法滚动内容以及卡顿感
  searchOverlay.addEventListener('click', event => {
    event.stopPropagation()

    const searchContainer = document.querySelector(`${searchContainerSelector}`)

    searchContainer.removeAttribute('show')
    searchContainer.addEventListener('transitionend', () => { searchContainer.style.cssText = '' }, { once: true })

    searchOverlay.classList.remove('show')
    searchFab.classList.remove('active')
  })

  // 移动端 click 会先触发 touchstart, touchend 和 mousemove
  function handleTouchMove () { searchOverlay.click() } // searchOverlay.click() 返回值为 undefined
  searchOverlay.addEventListener('touchstart', () => searchOverlay.addEventListener('touchmove', handleTouchMove, { once: true }))
  searchOverlay.addEventListener('touchend', () => searchOverlay.removeEventListener('touchmove', handleTouchMove))
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setMenuBtn: () => (/* binding */ setMenuBtn)
/* harmony export */ });
/* harmony import */ var _menu_follow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _menu_history_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var _menu_dynamic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);




function setMenuBtn () {
  // 覆盖显隐，初始化加载动态、收藏、历史、主页
  const preloadeditems = [
    '.v-popover-wrap:has(>.right-entry__outside[href="//t.bilibili.com/"])',
    '.v-popover-wrap:has(>.right-entry__outside[data-header-fav-entry])',
    '.right-entry__outside[href="//www.bilibili.com/account/history"]',
    '.header-avatar-wrap']

  const waitRightEntry = () => {
    document.querySelector('.right-entry') ? tryPreload() : setTimeout(waitRightEntry, 200)
  }
  waitRightEntry()

  function tryPreload () {
    if (document.querySelector(preloadeditems[2])) {
      preloadeditems.forEach(item => {
        document.querySelector(item).dispatchEvent(new MouseEvent('mouseenter'))
      })
      setTimeout(_menu_history_js__WEBPACK_IMPORTED_MODULE_1__.handleHistoryShowMore, 70)
      setTimeout(_menu_dynamic_js__WEBPACK_IMPORTED_MODULE_2__.handleDynamicShowMore, 60)
    } else setTimeout(tryPreload, 1000)
  }

  const menuFab = document.getElementById('menu-fab')

  // headerInMenu
  const menuOverlay = Object.assign(document.createElement('div'), {
    id: 'menu-overlay',
    innerHTML: `
    <div id="header-in-menu">
      <ul>
        <li><a target="_blank" href="https://www.bilibili.com/v/popular/all/">热门</a></li>
        <li data-refer=".right-entry__outside[href='//message.bilibili.com']">消息</li>
        <li data-refer=".right-entry__outside[href='//t.bilibili.com/']">动态</li>
        <li data-refer=".right-entry__outside[data-header-fav-entry]">收藏</li>
        <li data-refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li data-refer=".header-avatar-wrap--container">主页</li>
        <li data-refer=".right-entry__outside.follow-list">关注</li>
      </li>
    </div>
    `
  })
  menuFab.appendChild(menuOverlay)
  const menu = menuOverlay.querySelector('#header-in-menu')

  menuFab.addEventListener('click', () => {
    menu.classList.add('show')
    document.body.setAttribute('menu', '') // 显示消息数
    menuOverlay.classList.add('show')
    menuFab.classList.add('active')
  })

  let openedDialog = '' // sessionStorage 刷新网页不变

  const items = menuOverlay.querySelectorAll('li')
  items.forEach(item =>
    item.addEventListener('click', event => {
      event.stopPropagation()
      menu.classList.remove('show')
      document.body.removeAttribute('menu')

      const refer = item.dataset.refer

      if (!refer) { return } // 热门

      const referElement = document.querySelector(`${refer}+.v-popover`)
      if (!referElement) {
        const toast = document.querySelector('#toast')
        toast.textContent = '网页菜单加载中，请稍后重试'
        toast.style.display = 'block'
        setTimeout(() => { toast.setAttribute('show', '') }, 10)

        menuOverlay.click()

        setTimeout(() => {
          toast.removeAttribute('show')
          toast.addEventListener('transitionend', () => { toast.style.cssText = '' }, { once: true })
        }, 3000)

        return
      }

      openedDialog = refer

      referElement.setAttribute('display', '')
      setTimeout(() => { referElement.setAttribute('show', '') }, 10)
    })
  )

  menuOverlay.addEventListener('click', event => {
    event.stopPropagation()
    menu.classList.remove('show')
    document.body.removeAttribute('menu')
    menuOverlay.classList.remove('show')
    menuFab.classList.remove('active')

    if (openedDialog === '') { return }

    const referElement = document.querySelector(`${openedDialog}+.v-popover`)
    referElement.removeAttribute('show')
    referElement.addEventListener('transitionend', () => { referElement.removeAttribute('display') }, { once: true }) // 鼠标一动就会触发 mouseleave
  })

  function handleTouchMove () { menuOverlay.click() }
  menuOverlay.addEventListener('touchstart', () => menuOverlay.addEventListener('touchmove', handleTouchMove, { once: true }))
  menuOverlay.addEventListener('touchend', () => menuOverlay.removeEventListener('touchmove', handleTouchMove))

  createExtraDialog()

  // 添加关注弹窗
  function createExtraDialog () {
    const falseHeader = Object.assign(document.createElement('div'), {
      className: 'bili-header false-header'
    })
    document.body.appendChild(falseHeader)

    const followOutside = document.createElement('div')
    followOutside.className = 'right-entry__outside follow-list'
    falseHeader.appendChild(followOutside)

    const followDialog = Object.assign(document.createElement('div'), {
      className: 'v-popover is-bottom',
      id: 'follow-list-dialog',
      // /* html */
      innerHTML: `
        <div class="v-popover-content"><div class="history-panel-popover">
          <div class="header-tabs-panel">
            <div class="header-tabs-panel__item--active header-tabs-panel__item">最常访问</div>
            <div class="header-tabs-panel__item">最近添加</div>
          </div>
          <ul class="follow-list-content"></ul>
        </div></div>
        `
    })
    falseHeader.appendChild(followDialog)

    ;(0,_menu_follow_js__WEBPACK_IMPORTED_MODULE_0__.loadFollowList)(1)
  }
}


/***/ }),
/* 28 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadFollowList: () => (/* binding */ loadFollowList)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);


/**
 * 加载关注列表
 * @param {number} orderType 排序方式，1: 最常访问，2: 最近关注
 */
async function loadFollowList (orderType) {
  const content = document.querySelector('#follow-list-dialog .follow-list-content')

  let pageNumber = 1
  let pageSize = 20
  const data = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getFollowList)(pageNumber, pageSize, orderType)

  const list = data.list
  list.forEach(addElementByItem)

  const total = data.total

  async function onScroll () {
    const { scrollTop, scrollHeight, clientHeight } = content
    if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

    content.removeEventListener('scroll', onScroll)

    const remainingData = total - pageNumber * pageSize
    if (remainingData <= pageSize) {
      pageSize = remainingData
    } else {
      setTimeout(() => { content.addEventListener('scroll', onScroll) }, 2000)
      console.log('Scroll to bottom')
    }

    const data = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getFollowList)(++pageNumber, pageSize, 1)

    const list = data.list
    list.forEach(addElementByItem)
  }
  content.addEventListener('scroll', onScroll)

  const tabsPanel = document.querySelector('#follow-list-dialog .header-tabs-panel')
  const firstItem = tabsPanel.firstElementChild
  const secondItem = firstItem.nextElementSibling

  firstItem.addEventListener('click', () => {
    if (firstItem.classList.contains('header-tabs-panel__item--active')) { return }

    firstItem.classList.add('header-tabs-panel__item--active')
    secondItem.classList.remove('header-tabs-panel__item--active')

    content.innerHTML = ''
    content.removeEventListener('scroll', onScroll)
    loadFollowList(1)
  })

  secondItem.addEventListener('click', () => {
    if (secondItem.classList.contains('header-tabs-panel__item--active')) { return }

    secondItem.classList.add('header-tabs-panel__item--active')
    firstItem.classList.remove('header-tabs-panel__item--active')

    content.innerHTML = ''
    content.removeEventListener('scroll', onScroll)
    loadFollowList(2)
  })

  function addElementByItem (item) {
    const up = Object.assign(document.createElement('li'), {
      className: 'list-item clearfix',
      /* html */
      innerHTML: `
          <div class="cover-container"><a href="//space.bilibili.com/${item.mid}" target="_blank" class="up-cover-components">
            <div class="bili-avatar" style="width: 100%;height:100%;">
              <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${formatUrl(item.face)}@96w_96h_1c_1s_!web-avatar-space-list.avif" alt="" src="${formatUrl(item.face)}@96w_96h_1c_1s_!web-avatar-space-list.avif">
            </div>
          </a></div>
          <div class="content">
            <a href="//space.bilibili.com/${item.mid}/" target="_blank" class="title"><span class="fans-name" style="color: rgb(251, 114, 153);">${item.uname}</span></a>
            <p title="${desc(item)}" class="auth-description">${desc(item)}</p>
            <div class="fans-action">
              <div class="be-dropdown fans-action-btn fans-action-follow">
                <i class="iconfont video-commonmenu"></i><span class="fans-action-text">已关注</span>
                <!--ul class="be-dropdown-menu" style="display: none;">
                  <li class="be-dropdown-item">设置分组</li>
                  <li class="be-dropdown-item">取消关注</li>
                </ul-->
              </div>
              <div class="be-dropdown">
                <div class="be-dropdown-trigger"><i title="更多操作" class="iconfont icon-ic_more"></i></div>
                <ul class="be-dropdown-menu" style="display: none;">
                  <li class="be-dropdown-item"><a target="_blank" href="//message.bilibili.com/#whisper/mid${item.mid}">发消息</a></li>
                </ul>
              </div>
            </div>
          </div>
          `
    })
    content.appendChild(up)

    const fansAction = up.querySelector('.fans-action')
    const follow = fansAction.firstElementChild
    const more = follow.nextElementSibling

    follow.addEventListener('click', async () => {
      if (!follow.classList.contains('follow')) {
        const followRes = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.followUser)(item.mid, false)
        if (followRes.code === 0) {
          follow.className = 'fans-action-btn follow'
          follow.innerHTML = '<span class="fans-action-text">+&nbsp;&nbsp;关注</span>'
          follow.style.backgroundColor = '#00a1d6'
          follow.style.color = 'white'
        }
      } else {
        const followRes = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.followUser)(item.mid, true)
        if (followRes.code === 0) {
          follow.className = 'be-dropdown fans-action-btn fans-action-follow'
          follow.innerHTML = '<i class="iconfont video-commonmenu"></i><span class="fans-action-text">已关注</span>'
          follow.style.backgroundColor = ''
          follow.style.color = ''
        }
      }
    })

    more.addEventListener('mouseenter', () => {
      const dropdownMenu = more.querySelector('.be-dropdown-menu')
      dropdownMenu.style.display = ''
      fansAction.style.zIndex = 2
      more.style.color = '#00a1d6'
    })
    more.addEventListener('mouseleave', () => {
      const dropdownMenu = more.querySelector('.be-dropdown-menu')
      dropdownMenu.style.display = 'none'
      fansAction.style.zIndex = 1
      more.style.color = ''
    })
  }

  // 若为函数表达式，则不能在声明前调用
  function formatUrl (url) { return url.slice(url.indexOf(':') + 1) }
  function desc (item) { return item.official_verify.desc || item.sign }
}


/***/ }),
/* 29 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   followUser: () => (/* binding */ followUser),
/* harmony export */   getAIConclusion: () => (/* binding */ getAIConclusion),
/* harmony export */   getDynamicList: () => (/* binding */ getDynamicList),
/* harmony export */   getFollowList: () => (/* binding */ getFollowList),
/* harmony export */   getHistoryList: () => (/* binding */ getHistoryList),
/* harmony export */   getJudgeAI: () => (/* binding */ getJudgeAI),
/* harmony export */   getVideoInfo: () => (/* binding */ getVideoInfo)
/* harmony export */ });
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
// fork 自 BiliPlus 项目：https://github.com/0xlau/biliplus


const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
  61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
  36, 20, 34, 44, 52
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
// 使用缓存机制减少重复计算
const mixinKeyCache = new Map()

const getMixinKey = (orig) => {
  if (mixinKeyCache.has(orig)) {
    return mixinKeyCache.get(orig)
  }
  const mixinKey = mixinKeyEncTab
    .map((n) => orig[n])
    .join('')
    .slice(0, 32)
  mixinKeyCache.set(orig, mixinKey)
  return mixinKey
}

// 为请求参数进行 wbi 签名
function encWbi (params, imgKey, subKey) {
  const mixinKey = getMixinKey(imgKey + subKey)
  const currTime = Math.round(Date.now() / 1000)
  const chrFilter = /[!'()*]/g

  Object.assign(params, { wts: currTime }) // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chrFilter, '')
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  // 在脚本 metadata 中引用 AI 总结使用的 md5 算法
  // eslint-disable-next-line no-undef
  const wbiSign = md5(query + mixinKey) // 计算 w_rid

  return query + '&w_rid=' + wbiSign
}

// 获取最新的 imgKey 和 subKey
async function getWbiKeys () {
  const {
    wbi_img: { img_url: imgUrl, sub_url: subUrl }
  } = await getNavUserInfo()

  return {
    imgKey: imgUrl.slice(
      imgUrl.lastIndexOf('/') + 1,
      imgUrl.lastIndexOf('.')
    ),
    subKey: subUrl.slice(
      subUrl.lastIndexOf('/') + 1,
      subUrl.lastIndexOf('.')
    )
  }
}

// 刷新 wts 和 wrid
async function getwts (params) {
  const webKeys = await getWbiKeys()
  const imgKey = webKeys.imgKey
  const subKey = webKeys.subKey
  const query = encWbi(params, imgKey, subKey)
  return query
}

/**
 * 提取公共的 fetch 逻辑
 * @param {string} url 请求的 URL
 * @param {Object} options 请求的配置对象
 * @returns {Promise<Object>} 响应主体 response.json().data
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function fetchAPI (url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const jsonData = await response.json()
    return jsonData.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

/**
 * 获取导航栏用户信息
 * @returns {Promise<Object>} 用户信息数据
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getNavUserInfo () {
  return fetchAPI(`${_values_js__WEBPACK_IMPORTED_MODULE_0__.BILIBILI_API}/x/web-interface/nav`, { credentials: 'include' })
}

/**
 * 获取B站视频 aid、cid 等信息
 * @param {string} bvid 视频 bvid
 * @returns {Promise<Object>} 视频信息数据
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getVideoInfo (bvid) {
  return fetchAPI(`${_values_js__WEBPACK_IMPORTED_MODULE_0__.BILIBILI_API}/x/web-interface/view?bvid=${bvid}`)
}

/**
 * 获取 AI判断 响应
 * @param {object} params 请求参数
 * @returns {Promise<Object>} 响应主体 data
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getJudgeAI (params) {
  const query = await getwts(params)
  return fetchAPI(`${_values_js__WEBPACK_IMPORTED_MODULE_0__.BILIBILI_API}/x/web-interface/view/conclusion/judge?${query}`)
}

/**
 * 获取 AI 总结
 * @param {object} params { bvid, cid, up_mid }
 * @returns {Promise<Object>} 响应主体 data
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getAIConclusion (params) {
  const query = await getwts(params)
  return fetchAPI(`${_values_js__WEBPACK_IMPORTED_MODULE_0__.BILIBILI_API}/x/web-interface/view/conclusion/get?${query}`)
}

/**
 * 获取用户ID
 * @returns cookie: DedeUserID
 */
function getUserID () {
  const cookies = document.cookie
  const cookieArray = cookies.split('; ')
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split('=')
    if (cookie[0] === 'DedeUserID') {
      return cookie[1]
    }
  }
  return null // 如果不返回 null，那么函数就会返回 undefined，这可能会导致一些意想不到的问题。
}

/**
 * 获取 CSRF
 * @returns cookie: bili_jct
 */
function getCSRF () {
  const cookies = document.cookie
  const cookieArray = cookies.split('; ')
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split('=')
    if (cookie[0] === 'bili_jct') {
      return cookie[1]
    }
  }
  return null // 如果不返回 null，那么函数就会返回 undefined，这可能会导致一些意想不到的问题。
}

/**
 * 获取关注列表
 * @param {number} pageNumber 页码
 * @param {number} pageSize 每页显示的数据条数
 * @param {number} orderType 排序方式，1: 最常访问，2: 最近关注
 * @returns {Promise<Object>} 响应主体 data
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getFollowList (pageNumber, pageSize, orderType) {
  const vmid = getUserID()
  const query = await getwts({})
  return fetchAPI(`${_values_js__WEBPACK_IMPORTED_MODULE_0__.BILIBILI_API}/x/relation/followings?vmid=${vmid}&pn=${pageNumber}&ps=${pageSize}&order=desc&order_type=${orderType === 1 ? 'attention' : ''}&gaia_source=main_web&web_location=333.999&${query}`, { credentials: 'include' })
}

/**
 * 获取动态列表
 * @param {string} offset the data.offset of last response
 * @returns {Promise<Object>} 响应主体 data
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getDynamicList (offset) {
  return fetchAPI(`${_values_js__WEBPACK_IMPORTED_MODULE_0__.BILIBILI_API}/x/polymer/web-dynamic/v1/feed/nav?offset=${offset}`, { credentials: 'include' })
}

/**
 * 获取历史记录列表
 * @param {Object} cursor the data.cursor of last response
 * @returns {Promise<Object>} 响应主体 data
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function getHistoryList (cursor) {
  const url = `https://api.bilibili.com/x/web-interface/history/cursor?max=${cursor.max}&view_at=${cursor.view_at}&business=archive`
  const options = { credentials: 'include' }
  return fetchAPI(url, options)
}

/**
 * 关注用户
 * @param {string} mid 用户 id
 * @param {boolean} isFollow 关注/取关
 * @returns {Promise<Object>} 响应数据
 * @throws {Error} 如果请求失败或响应状态码不是 200
 */
async function followUser (mid, isFollow) {
  const response = await fetch('https://api.bilibili.com/x/relation/modify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      fid: mid,
      act: isFollow ? '1' : '2',
      // eslint-disable-next-line camelcase
      re_src: '11',
      csrf: getCSRF()
    }).toString(),
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BILIBILI_API: () => (/* binding */ BILIBILI_API),
/* harmony export */   aiData: () => (/* binding */ aiData)
/* harmony export */ });
const BILIBILI_API = 'https://api.bilibili.com'

const aiData = {}


/***/ }),
/* 31 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleHistoryShowMore: () => (/* binding */ handleHistoryShowMore)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);


// 设置历史自动展开
async function handleHistoryShowMore () {
  let cursor = {
    max: 0,
    // eslint-disable-next-line camelcase
    view_at: 0
  }

  const data = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getHistoryList)(cursor)
  cursor = data.cursor

  const historyContent = document.querySelector('.history-panel-popover>.header-tabs-panel__content')

  async function onScroll () {
    const { scrollTop, scrollHeight, clientHeight } = historyContent
    if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

    historyContent.removeEventListener('scroll', onScroll) // 内容加载后再重新监听滚动
    setTimeout(() => { historyContent.addEventListener('scroll', onScroll) }, 2000)
    console.log('Scroll to bottom')

    const data = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getHistoryList)(cursor)
    cursor = data.cursor
    data.list.forEach(addElementByItem) // 简写形式有时需绑定 this
  }
  historyContent.addEventListener('scroll', onScroll)

  function addElementByItem (item) {
    const record = Object.assign(document.createElement('a'), {
      href: `//www.bilibili.com/video/${item.history.bvid}/?`,
      className: 'header-history-card header-history-video',
      target: '_blank',
      'data-mod': 'top_right_bar_window_history',
      'data-idx': 'content',
      'data-ext': 'click',
      // /* html */
      innerHTML: `
          <div class="header-history-video__image">
            <picture class="v-img">
              <source srcset="${formatUrl(item.cover)}@256w_144h_1c.avif" type="image/avif">
              <source srcset="${formatUrl(item.cover)}@256w_144h_1c.webp" type="image/webp">
              <img src="${formatUrl(item.cover)}@256w_144h_1c" alt="" loading="lazy" onload="" onerror="typeof window.imgOnError === 'function' &amp;&amp; window.imgOnError(this)">
            </picture>
            <div class="header-history-video__duration"><span class="header-history-video__duration--text">${formatProgressTime(item.progress) + '/' + formatProgressTime(item.duration)}</span></div>
            <div class="header-history-video__progress"><div class="header-history-video__progress--inner" style="width: ${item.progress / item.duration * 100}%; border-radius: 0px;"></div></div>
          </div>
          <div class="header-history-card__info">
            <div title="${item.title}" class="header-history-card__info--title">${item.title}</div>
            <div class="header-history-card__info--date">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="device-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.55 13C10.8262 13 11.05 13.2239 11.05 13.5C11.05 13.7761 10.8262 14 10.55 14H5.55005C5.27391 14 5.05005 13.7761 5.05005 13.5C5.05005 13.2239 5.27391 13 5.55005 13H10.55ZM13.05 2C14.1546 2 15.05 2.89543 15.05 4V10C15.05 11.1046 14.1546 12 13.05 12H3.05005C1.94548 12 1.05005 11.1046 1.05005 10V4C1.05005 2.89543 1.94548 2 3.05005 2H13.05ZM13.05 3H3.05005C2.53721 3 2.11454 3.38604 2.05678 3.88338L2.05005 4V10C2.05005 10.5128 2.43609 10.9355 2.93343 10.9933L3.05005 11H13.05C13.5629 11 13.9856 10.614 14.0433 10.1166L14.05 10V4C14.05 3.44772 13.6023 3 13.05 3Z" fill="#999999"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7 11H9L10 14H6L7 11Z" fill="#999999"></path></svg>
              <span>${formatViewTime(item.view_at)}</span>
            </div>
            <div class="header-history-card__info--name" title="${item.author_name}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="up-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.33334 5.16669C1.33334 3.78597 2.45263 2.66669 3.83334 2.66669H12.1667C13.5474 2.66669 14.6667 3.78597 14.6667 5.16669V10.8334C14.6667 12.2141 13.5474 13.3334 12.1667 13.3334H3.83334C2.45263 13.3334 1.33334 12.2141 1.33334 10.8334V5.16669ZM3.83334 3.66669C3.00492 3.66669 2.33334 4.33826 2.33334 5.16669V10.8334C2.33334 11.6618 3.00492 12.3334 3.83334 12.3334H12.1667C12.9951 12.3334 13.6667 11.6618 13.6667 10.8334V5.16669C13.6667 4.33826 12.9951 3.66669 12.1667 3.66669H3.83334ZM4.33334 5.50002C4.60949 5.50002 4.83334 5.72388 4.83334 6.00002V8.50002C4.83334 9.05231 5.28106 9.50002 5.83334 9.50002C6.38563 9.50002 6.83334 9.05231 6.83334 8.50002V6.00002C6.83334 5.72388 7.0572 5.50002 7.33334 5.50002C7.60949 5.50002 7.83334 5.72388 7.83334 6.00002V8.50002C7.83334 9.60459 6.93791 10.5 5.83334 10.5C4.72877 10.5 3.83334 9.60459 3.83334 8.50002V6.00002C3.83334 5.72388 4.0572 5.50002 4.33334 5.50002ZM9.00001 5.50002C8.72387 5.50002 8.50001 5.72388 8.50001 6.00002V10C8.50001 10.2762 8.72387 10.5 9.00001 10.5C9.27615 10.5 9.50001 10.2762 9.50001 10V9.33335H10.5833C11.6419 9.33335 12.5 8.47523 12.5 7.41669C12.5 6.35814 11.6419 5.50002 10.5833 5.50002H9.00001ZM10.5833 8.33335H9.50001V6.50002H10.5833C11.0896 6.50002 11.5 6.91043 11.5 7.41669C11.5 7.92295 11.0896 8.33335 10.5833 8.33335Z" fill="#999999"></path></svg>
              <span>${item.author_name}</span>
            </div>
          </div>
          `
    })
    historyContent.appendChild(record)
  }

  const formatUrl = url => url.slice(url.indexOf(':') + 1)

  function formatProgressTime (seconds) {
    const hrs = Math.floor(seconds / 3600) // Math.floor() 向下取整
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hrs ? (hrs + ':') : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  function formatViewTime (timestamp) {
    const days = Math.floor(timestamp / 86400)
    const hrs = Math.floor((timestamp % 86400) / 3600)
    const mins = Math.floor((timestamp % 3600) / 60)

    const now = Math.floor(Date.now() / 1000)
    const today = Math.floor(now / 86400)

    const dayTextMap = {
      0: '今天',
      1: '昨天',
      2: '前天'
    }

    const dayText = dayTextMap[today - days] || (today - days) + '天前'

    return `${dayText} ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }
}


/***/ }),
/* 32 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleDynamicShowMore: () => (/* binding */ handleDynamicShowMore)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);


// 设置动态自动展开
function handleDynamicShowMore () {
  let offset = ''

  let i = 0
  async function getLoadedData () {
    const data = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getDynamicList)(offset)
    offset = data.offset
    if (i < 2) { getLoadedData(); i++ }
  }
  getLoadedData()

  const dynamicContent = document.querySelector('.dynamic-panel-popover>.header-tabs-panel__content')
  const dynamicAll = dynamicContent.querySelector('.dynamic-all')

  let loadedTitle = []

  async function onScroll () {
    const { scrollTop, scrollHeight, clientHeight } = dynamicContent
    if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

    dynamicContent.removeEventListener('scroll', onScroll) // 内容加载后再重新监听滚动
    setTimeout(() => { dynamicContent.addEventListener('scroll', onScroll) }, 2000)
    console.log('Scroll to bottom')

    const data = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getDynamicList)(offset)
    offset = data.offset
    data.items.forEach(checkIsLoaded) // 简写形式有时需绑定 this

    const dynamics = dynamicAll.querySelectorAll(':scope>a')
    loadedTitle = Array.from(dynamics).map(a => a.title)
  }
  dynamicContent.addEventListener('scroll', onScroll)

  function checkIsLoaded (item) { if (!loadedTitle.includes(item.title)) { addElementByItem(item) } }

  function addElementByItem (item) {
    const record = Object.assign(document.createElement('a'), {
      href: `${item.jump_url}`,
      title: `${item.title}`,
      target: '_blank',
      'data-mod': 'top_right_bar_window_dynamic',
      'data-idx': 'content',
      'data-ext': 'click',
      // /* html */
      innerHTML: `
          <div data-v-16c69722="" data-v-0290fa94="" class="header-dynamic-list-item" title="${item.title}" target="_blank">
            <div data-v-16c69722="" class="header-dynamic-container">
              <div data-v-16c69722="" class="header-dynamic__box--left"><a data-v-16c69722="" class="header-dynamic-avatar" href="${item.author.jump_url}" title="${item.author.name}" target="_blank">
                <div class="bili-avatar" style="width: 100%;height:100%;">
                  <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${formatUrl(item.author.face)}@96w_96h_1c_1s_!web-avatar.avif" alt="" src="${formatUrl(item.author.face)}@96w_96h_1c_1s_!web-avatar.avif">
                </div>
              </a></div>
              <div data-v-16c69722="" class="header-dynamic__box--center">
                <div data-v-16c69722="" class="dynamic-name-line">
                  <div data-v-16c69722="" class="user-name">
                    <a data-v-16c69722="" href="${item.author.jump_url}" title="${item.author.name}" target="_blank">${item.author.name}</a>
                  </div>
                </div>
                <div data-v-16c69722="" class="dynamic-info-content" title="">
                  <div data-v-0290fa94="" class="all-in-one-article-title">${item.title}</div>
                </div>
                <span data-v-0290fa94="" class="publish-time">${item.pub_time}</span>
              </div>
              <a data-v-16c69722="" class="header-dynamic__box--right" href="${item.jump_url}" target="_blank">
                <div data-v-0290fa94="" class="cover">
                  <picture data-v-0290fa94="" class="v-img">
                    <source srcset="${formatUrl(item.cover)}@164w_92h_1c.avif" type="image/avif">
                    <source srcset="${formatUrl(item.cover)}@164w_92h_1c.webp" type="image/webp">
                    <img src="${formatUrl(item.cover)}@164w_92h_1c" alt="" loading="lazy" onload="" onerror="typeof window.imgOnError === 'function' &amp;&amp; window.imgOnError(this)">
                  </picture>
                  <div data-v-0290fa94="" class="watch-later"><svg data-v-0290fa94="" class="bili-watch-later__icon"><use xlink:href="#widget-watch-later"></use></svg></div>
                </div>
              </a>
            </div>
          </div>
          `
    })
    dynamicAll.appendChild(record)
  }

  const formatUrl = url => url.slice(url.indexOf(':') + 1)
}


/***/ }),
/* 33 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSidebarBtn: () => (/* binding */ setSidebarBtn)
/* harmony export */ });
/* harmony import */ var _comment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);


/* 使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。
   head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。 */

/**
 * 处理侧边栏事件的函数
 */
function setSidebarBtn (page) {
  if (page === 'video') {
    handleVideoSidebar()
    showMoreRecommend()
  } else if (page === 'message') {
    handleMessageSidebar()
  }

  function handleVideoSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab')
    const videoContainer = document.querySelector('#mirror-vdcon')

    sidebarFab.addEventListener('click', () => videoContainer.toggleAttribute('sidebar'))

    function closeSidebar () {
      videoContainer.removeAttribute('sidebar')
    }

    const rightContainer = videoContainer.querySelector('.right-container')
    const recommendLiist = document.getElementById('reco_list')

    recommendLiist.addEventListener('click', event => {
      const nextPlay = document.querySelector('.rec-title')
      const recommendFooter = document.querySelector('.rec-footer') // 自动收起侧边栏
      if (!nextPlay?.contains(event.target) && !recommendFooter.contains(event.target)) {
        closeSidebar()
        rightContainer.addEventListener('transitionend', event => {
          if (event.propertyName === 'transform') { rightContainer.scrollTop = 0 }
        }, { once: true })

        // 此处不要使用监听器，否则会干扰原函数执行
        ;(0,_comment_js__WEBPACK_IMPORTED_MODULE_0__.modifyShadowDOMLate)()
      }
    })
  }

  // 自动展开侧边栏
  function showMoreRecommend () {
    const recommendFooter = document.querySelector('.rec-footer')
    setTimeout(() => { recommendFooter?.click() }, 2000) // 直接传递 recommendFooter?.click: 可选链操作符前的 recommendFooter 条件判断将会立即执行

    document.querySelector('video').addEventListener('canplay', showMoreRecommend, { once: true })
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


/***/ }),
/* 34 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modifyShadowDOMLate: () => (/* binding */ modifyShadowDOMLate)
/* harmony export */ });
/**
 * 动态修改播放组件样式
 * @param {boolean} isDynamicRefresh - 是否动态刷新
 */
function modifyShadowDOMLate (isDynamicRefresh) {
  let commentsShadow
  let commentsHeaderShadow
  let headerBoxShadow

  // 初始化动态要获胜 #comment，第一次变化删除.comment增加.comment，第二次添加bili-comments
  const comment = document.getElementById('comment')
  const observer = new MutationObserver(handleCommentMutation)
  observer.observe(comment, { childList: true, subtree: true })

  function handleCommentMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'bili-comments') {
          observeComments()
          observer.disconnect()
        }
      })
    })
  }

  function observeComments () {
    commentsShadow = document.querySelector('bili-comments').shadowRoot
    const observer = new MutationObserver(handleCommentsMutation)
    observer.observe(commentsShadow, { childList: true, subtree: true })

    appendStyle(commentsShadow, `
        div#contents {
          padding-top: 0;
        }`)
  }

  function handleCommentsMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.id === 'contents') {
          observeHeader()
          observeContent()
          observer.disconnect()
        }
      })
    })
  }

  // --------------------
  // header
  function observeHeader () {
    commentsHeaderShadow = commentsShadow.querySelector('bili-comments-header-renderer').shadowRoot
    const observer = new MutationObserver(handleHeaderMutation)
    observer.observe(commentsHeaderShadow, { childList: true, subtree: true })

    appendStyle(commentsHeaderShadow, `
        div#commentbox {
          position: fixed;
          left: 0;
          bottom: var(--actionbar-height);
          z-index: 10;
          background: white;
          width: 100%;
          padding: 8px 12px;
          border-top: 1px solid var(--line_regular);
          transition: calc(var(--actionbar-time)*1.40) ease-in;
          display: var(--commentbox-display);
          transform: var(--shadow-transform);
        }
        div#navbar {
          margin-bottom: 0;
        }
        #notice {
          display: none;
        }`)
  }

  function handleHeaderMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'div' && node.id === 'commentbox') {
          observeHeader2()
          observer.disconnect()
        }
      })
    })
  }

  function observeHeader2 () {
    headerBoxShadow = commentsHeaderShadow.querySelector('bili-comment-box').shadowRoot
    const observer = new MutationObserver(handleHeader2Mutation)
    observer.observe(headerBoxShadow, { childList: true, subtree: true })

    appendStyle(headerBoxShadow, `
        :host {
          display: var(--commentbox-display) !important;
        }
        div#user-avatar {
          display: none;
        }
        div#comment-area {
          width: calc(100% - 24px);
        }
        div#editor {
          border-radius: 13px;
          padding: 0;
        }`)
  }

  function handleHeader2Mutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'div' && node.id === 'comment-area') {
          observeHeader3()
          observer.disconnect()
        }
      })
    })
  }

  function observeHeader3 () {
    const textareaShadow = headerBoxShadow.querySelector('bili-comment-textarea').shadowRoot
    appendStyle(textareaShadow, `
        textarea#input {
          line-height: 26px;
          min-height: 26px;
          height: 26px !important;
        }`)
  }

  // --------------------
  // content
  function observeContent () {
    const commentThreads = commentsShadow.querySelectorAll('bili-comment-thread-renderer')
    commentThreads.forEach(thread => {
      const threadShadow = thread.shadowRoot
      const observer = new MutationObserver(handleContentMutation)
      observer.observe(threadShadow, { childList: true, subtree: true })
    })
  }

  function handleContentMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'div' && node.id === 'replies') {
          observeContent2(mutation.target)
          observer.disconnect()
        }
      })
    })
  }

  function observeContent2 (threadShadow) {
    const commentShadow = threadShadow.querySelector('bili-comment-renderer').shadowRoot
    const repliesShadow = threadShadow.querySelector('bili-comment-replies-renderer').shadowRoot

    appendStyle(commentShadow, `
        div#body {
          padding-left: 45px;
          --bili-comment-hover-more-display: block;
        }
        a#user-avatar {
          left: 0;
        }`)

    appendStyle(repliesShadow, `
        div#expander {
          padding-left: 40px;
        }`)

    const observer = new MutationObserver(handleCommentShadowMutation)
    observer.observe(commentShadow, { childList: true, subtree: true })

    const observer2 = new MutationObserver(handleRepliesShadowMutation)
    observer2.observe(repliesShadow, { childList: true, subtree: true })
  }

  function handleCommentShadowMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'div' && node.id === 'body') {
          const avatarShadow = mutation.target.querySelector('bili-avatar').shadowRoot
          appendStyle(avatarShadow, `
              .layer.center {
                width: 48px !important;
                height: 48px !important;
              }`)
          observer.disconnect()
        }
      })
    })
  }

  function handleRepliesShadowMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'div' && node.id === 'expander') {
          const replies = mutation.target.querySelectorAll('bili-comment-reply-renderer')
          replies.forEach(reply => {
            const replyShadow = reply.shadowRoot
            appendStyle(replyShadow, `
                div#body {
                  padding: 4px 0 4px 29px;
                  --bili-comment-hover-more-display: block;
                }`)
            observer.disconnect()
          })
        }
      })
    })
  }

  if (isDynamicRefresh) { return }

  // 评论区图片
  new MutationObserver(handleBodyMutation).observe(document.body, { childList: true })

  function handleBodyMutation (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'bili-photoswipe') {
          const photoShadow = node.shadowRoot
          appendStyle(photoShadow, `
              #prev, #next, #close {
                top: 90% !important;
              }
              #close {
                right: 50% !important;
                transform: translate(50%, -50%);
              }`)
        }
      })
    })
  }

  function appendStyle (shadowRoot, cssText) {
    const style = document.createElement('style')
    style.textContent = cssText
    shadowRoot.appendChild(style)
  }
}


/***/ }),
/* 35 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleHeaderImage: () => (/* binding */ handleHeaderImage),
/* harmony export */   handleVideoCard: () => (/* binding */ handleVideoCard)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _ai_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);



// 控制首页头图函数
function handleHeaderImage () {
  // eslint-disable-next-line no-undef
  const source = GM_getValue('header-image-source', 'unsplash')
  const mapping = {
    bing: 'https://api.suyanw.cn/api/bing.php',
    unsplash: 'https://unsplash.it/1600/900?random',
    picsum: 'https://picsum.photos/1600/900',
    meizi: 'https://api.suyanw.cn/api/sjbz.php?method=pc&lx=meizi',
    dongman: 'https://api.suyanw.cn/api/sjbz.php?method=pc&lx=dongman',
    fengjing: 'https://api.suyanw.cn/api/sjbz.php?method=pc&lx=fengjing',
    suiji: 'https://api.suyanw.cn/api/sjbz.php?method=pc&lx=suiji'
  }

  let url = mapping[source]
  const elementSelector = '.bili-header__banner'
  const key = 'header-image'

  loadImage(key, elementSelector)

  if (source !== 'local') {
    setTimeout(renewImage, 5000)
  }

  window.addEventListener('variableChanged', e => {
    if (e.detail.key === 'header-image-source') {
      url = mapping[e.detail.newValue]
      setTimeout(() => renewImage(true), 0)
    }
  })

  async function renewImage (loadImmediately) {
    try {
      const img = await getImage(url)
      const base64Data = imageToBase64(img)
      storeImage(key, base64Data)
      if (loadImmediately) loadImage(key, elementSelector)
    } catch (error) {
      console.error('Failed to get image:', error)
    }
  }

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
      applyStyle(elementSelector, base64Data)
    } else {
      getImage(url).then(img => {
        const base64Data = imageToBase64(img)
        storeImage(key, base64Data)
        applyStyle(elementSelector, base64Data)
      }).catch(error => console.error('Failed to get image:', error))
    }
  }

  function applyStyle (elementSelector, base64Data) {
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
  }
}

// 处理视频卡片
function handleVideoCard () {
  judgeHasAi()

  let isLoading = false
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (isLoading) return
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('bili-video-card')) {
          isLoading = true
          setTimeout(() => {
            judgeHasAi()
            isLoading = false
          }, 2000)
        }
      })
    })
  }).observe(document.querySelector('.recommended-container_floor-aside>.container'), { childList: true })

  function judgeHasAi () {
    const imageLinks = document.querySelectorAll('.bili-video-card__image--link')
    let delay = 0
    imageLinks.forEach(async link => {
      await new Promise(resolve => setTimeout(resolve, delay))
      const card = link.closest('.bili-video-card:not(:has(.bili-video-card__info--ad))')
      if (card && !link.dataset.hasJudgedAi) {
        const aiJudgeRes = await judge(card)
        if (aiJudgeRes) card.dataset.hasAi = true
        delay += 100
      }
      link.dataset.hasJudgedAi = true
    })
  }

  let lastPreviewCard = null
  new MutationObserver(mutations => {
    mutations.forEach(async mutation => {
      const firstChild = mutation.addedNodes[0]?.firstChild
      if (firstChild && firstChild.className === 'v-popover is-bottom-end') {
        const panel = firstChild.querySelector('.bili-video-card__info--no-interest-panel')
        const previewOption = createOption('预览此视频')
        panel.insertBefore(previewOption, panel.firstChild)
        previewOption.addEventListener('click', event => onPreviewOptionClick(event, firstChild))

        const card = await getCard()
        if (!card) return // 如果 card 为空，直接返回

        const hasAi = card.dataset.hasAi
        if (!hasAi) return

        const AIOption = createOption('生成视频总结')
        panel.insertBefore(AIOption, previewOption.nextSibling)
        AIOption.addEventListener('click', async event => {
          event.stopPropagation()
          firstChild.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
          ;(0,_ai_js__WEBPACK_IMPORTED_MODULE_1__.loadAI)(card)
        })
      }
    })
  }).observe(document.body, { childList: true })

  window.addEventListener('click', event => {
    const btn = document.querySelector('.bili-video-card__info--no-interest.active')
    if (btn?.contains(event.target)) {
      btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      btn.classList.remove('use')
      btn.addEventListener('click', () => {
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      }, { once: true })
    }
  })

  function onPreviewOptionClick (event, firstChild) {
    event.stopPropagation()
    firstChild.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    window.addEventListener('click', () => {
      lastPreviewCard?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    }, { once: true })

    const card = document.querySelector('.bili-video-card__info--no-interest.active').closest('.bili-video-card')
    const cardEventWrap = card.querySelector('.bili-video-card__image--wrap')
    cardEventWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    lastPreviewCard = cardEventWrap

    if (!cardEventWrap.querySelector('.inline-progress-bar')) {
      const intervalId = setInterval(() => {
        if (cardEventWrap.querySelector('video')) {
          createProgressBar(cardEventWrap)
          clearInterval(intervalId)
        }
      }, 1000)
    }
  }

  function createProgressBar (cardEventWrap) {
    const progressBar = document.createElement('div')
    progressBar.className = 'inline-progress-bar'
    progressBar.innerHTML = '<div class="inline-progress-bar-filled"></div><div class="inline-progress-bar-thumb"></div>'
    cardEventWrap.appendChild(progressBar)

    const video = cardEventWrap.querySelector('video')
    const progressBarFilled = progressBar.querySelector('.inline-progress-bar-filled')
    const progressBarThumb = progressBar.querySelector('.inline-progress-bar-thumb')
    const progressBarWidth = progressBar.offsetWidth

    function updateProgressBar (progress) {
      progressBarFilled.style.width = `${progress * 100}%`
      progressBarThumb.style.left = `${progress * progressBarWidth}px`
    }

    video.addEventListener('timeupdate', () => {
      const progress = Math.min(Math.max(video.currentTime / video.duration, 0), 1)
      updateProgressBar(progress)
    }, true)

    video.addEventListener('timeupdate', event => event.stopImmediatePropagation(), true)

    function onTouchEvent (event) {
      const progress = (event.touches[0].clientX - progressBar.getBoundingClientRect().left) / progressBarWidth
      updateProgressBar(progress)
      video.currentTime = progress * video.duration
    }

    progressBar.addEventListener('touchstart', event => {
      onTouchEvent(event)
      document.addEventListener('touchmove', onTouchEvent)
    })

    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', onTouchEvent)
    })

    progressBar.addEventListener('click', event => {
      event.preventDefault()
      event.stopPropagation()
    })
  }

  async function judge (card) {
    const cardImageLinkElement = card.querySelector('.bili-video-card__image--link')
    const match = /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.dataset.targetUrl) || /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.href)
    const bvid = match[1]

    try {
      const videoInfo = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getVideoInfo)(bvid)
      cardImageLinkElement.dataset.cid = videoInfo.cid
      cardImageLinkElement.dataset.bvid = videoInfo.bvid
      cardImageLinkElement.dataset.upMid = videoInfo.owner.mid
      const cid = videoInfo.cid
      const up_mid = videoInfo.owner.mid

      const aiJudgeRes = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getJudgeAI)({ bvid, cid, up_mid })
      return aiJudgeRes.judge === 1
    } catch (error) {
      console.error(error)
    }
  }

  function createOption (text) {
    return Object.assign(document.createElement('div'), {
      className: 'bili-video-card__info--no-interest-panel--item',
      textContent: text
    })
  }

  async function getCard () {
    return new Promise(resolve => {
      setTimeout(() => {
        const btn = document.querySelector('.bili-video-card__info--no-interest.active:not(.use)')
        if (!btn) {
          resolve(null) // 如果 btn 为空，返回 null
          console.log('疑似弹窗动作被打断：未获取到激活的视频更多选项按钮')
          return
        }
        const card = btn.closest('.bili-video-card')
        btn.classList.add('use')
        resolve(card)
      }, 50)
    })
  }
}


/***/ }),
/* 36 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadAI: () => (/* binding */ loadAI)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);



async function loadAI (card) {
  const aiCardElement = createAICardElement(card.querySelector('.bili-video-card__image--wrap'))

  const aiConclusionRes = await aiConclusion(card)
  const bvid = card.querySelector('.bili-video-card__image--link').dataset.bvid
  genterateAIConclusionCard(aiConclusionRes, aiCardElement, bvid)
}

async function aiConclusion (card) {
  const cardImageLinkElement = card.querySelector('.bili-video-card__image--link')
  const match = /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.dataset.targetUrl) || /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.href)
  const bvid = match[1]

  if (_values_js__WEBPACK_IMPORTED_MODULE_1__.aiData[bvid] && _values_js__WEBPACK_IMPORTED_MODULE_1__.aiData[bvid].code === 0) {
    return _values_js__WEBPACK_IMPORTED_MODULE_1__.aiData[bvid]
  }

  if (cardImageLinkElement.dataset.hasGotAi === undefined) {
    const cid = cardImageLinkElement.dataset.cid
    const up_mid = cardImageLinkElement.dataset.upMid
    const aiConclusionRes = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getAIConclusion)({ bvid, cid, up_mid })
    _values_js__WEBPACK_IMPORTED_MODULE_1__.aiData[bvid] = aiConclusionRes
    cardImageLinkElement.dataset.hasGotAi = true
    if (aiConclusionRes.code === 0) {
      return _values_js__WEBPACK_IMPORTED_MODULE_1__.aiData[bvid]
    }
  }
}

function createAICardElement (cardElement) {
  const overlay = document.createElement('div')
  overlay.id = 'ai-conclusion-overlay'
  overlay.innerHTML = `
      <div class="ai-conclusion-card resizable-component">
        <div class="ai-conclusion-card-header">正在加载 AI 总结</div>
      </div>
    `
  cardElement.closest('.bili-video-card').appendChild(overlay)
  overlay.classList.add('show')

  overlay.addEventListener('click', () => {
    overlay.classList.remove('show')
    overlay.addEventListener('transitionend', overlay.remove)
  }, { once: true })

  const div = overlay.querySelector('.ai-conclusion-card')
  div.addEventListener('click', event => event.stopPropagation())

  return div
}

function genterateAIConclusionCard (aiConclusionRes, aiCardElement, bvid) {
  let aiCard = `
      <div class="ai-conclusion-card-header">
        <div class="ai-conclusion-card-header-left">
          <svg class=ai-summary-popup-icon fill=none height=30 viewBox="0 0 30 30"width=30 xmlns=http://www.w3.org/2000/svg><g clip-path=url(#clip0_8728_3421)><path d="M7.54 2.348a1.5 1.5 0 0 1 2.112.192l2.5 3a1.5 1.5 0 0 1-2.304 1.92l-2.5-3a1.5 1.5 0 0 1 .192-2.112z"fill=url(#paint0_linear_8728_3421) clip-rule=evenodd fill-rule=evenodd /><path d="M21.96 2.348a1.5 1.5 0 0 0-2.112.192l-2.5 3a1.5 1.5 0 0 0 2.304 1.92l2.5-3a1.5 1.5 0 0 0-.192-2.112z"fill=url(#paint1_linear_8728_3421) clip-rule=evenodd fill-rule=evenodd /><path d="M27 18.253C27 25.021 21.627 27 15 27S3 25.02 3 18.253C3 11.486 3.923 6 15 6c11.538 0 12 5.486 12 12.253z"fill=#D9D9D9 filter=url(#filter0_d_8728_3421) opacity=.2 /><path d="M28 18.949C28 26.656 22.18 28 15 28S2 26.656 2 18.949C2 10 3 6 15 6c12.5 0 13 4 13 12.949z"fill=url(#paint2_linear_8728_3421) filter=url(#filter1_ii_8728_3421) /><path d="M4.786 14.21c0-2.284 1.659-4.248 3.925-4.52 4.496-.539 8.057-.559 12.602-.01 2.257.274 3.902 2.234 3.902 4.507v5.005c0 2.14-1.46 4.034-3.57 4.396-4.742.815-8.474.658-13.086-.074-2.197-.35-3.773-2.282-3.773-4.506v-4.799z"fill=#191924 /><path d="M19.643 15.313v2.785"stroke=#2CFFFF stroke-linecap=round stroke-width=2.4 /><path d="M10.357 14.852l1.858 1.857-1.858 1.857"stroke=#2CFFFF stroke-linecap=round stroke-width=1.8 stroke-linejoin=round /></g><defs><filter color-interpolation-filters=sRGB filterUnits=userSpaceOnUse height=27 id=filter0_d_8728_3421 width=30 x=1 y=4><feFlood flood-opacity=0 result=BackgroundImageFix /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"in=SourceAlpha result=hardAlpha /><feOffset dx=1 dy=1 /><feGaussianBlur stdDeviation=1.5 /><feComposite in2=hardAlpha operator=out /><feColorMatrix values="0 0 0 0 0.039545 0 0 0 0 0.0845023 0 0 0 0 0.200107 0 0 0 0.85 0"/><feBlend in2=BackgroundImageFix result=effect1_dropShadow_8728_3421 /><feBlend in2=effect1_dropShadow_8728_3421 result=shape in=SourceGraphic /></filter><filter color-interpolation-filters=sRGB filterUnits=userSpaceOnUse height=26.643 id=filter1_ii_8728_3421 width=30.786 x=0 y=4.143><feFlood flood-opacity=0 result=BackgroundImageFix /><feBlend in2=BackgroundImageFix result=shape in=SourceGraphic /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"in=SourceAlpha result=hardAlpha /><feOffset dx=2.786 dy=3.714 /><feGaussianBlur stdDeviation=1.393 /><feComposite in2=hardAlpha operator=arithmetic k2=-1 k3=1 /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/><feBlend in2=shape result=effect1_innerShadow_8728_3421 /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"in=SourceAlpha result=hardAlpha /><feOffset dx=-2 dy=-1.857 /><feGaussianBlur stdDeviation=1.857 /><feComposite in2=hardAlpha operator=arithmetic k2=-1 k3=1 /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0.15445 0 0 0 0 0.454264 0 0 0 0.11 0"/><feBlend in2=effect1_innerShadow_8728_3421 result=effect2_innerShadow_8728_3421 /></filter><linearGradient gradientUnits=userSpaceOnUse id=paint0_linear_8728_3421 x1=6.804 x2=9.019 y1=2.849 y2=8.297><stop stop-color=#393946 /><stop stop-color=#23232E offset=.401 /><stop stop-color=#191924 offset=1 /></linearGradient><linearGradient gradientUnits=userSpaceOnUse id=paint1_linear_8728_3421 x1=22.696 x2=20.481 y1=2.849 y2=8.297><stop stop-color=#393946 /><stop stop-color=#23232E offset=.401 /><stop stop-color=#191924 offset=1 /></linearGradient><linearGradient gradientUnits=userSpaceOnUse id=paint2_linear_8728_3421 x1=7.671 x2=19.931 y1=10.807 y2=29.088><stop stop-color=#F4FCFF /><stop stop-color=#EAF5F9 offset=1 /></linearGradient><clipPath id=clip0_8728_3421><path d="M0 0h30v30H0z"fill=#fff /></clipPath></defs></svg>
          <span class="tips-text">已为你生成视频总结</span>
        </div>
      </div>
      <div class="ai-conclusion-card-summary">
        ${aiConclusionRes.model_result.summary}
      </div>
    `
  aiConclusionRes.model_result.outline.forEach(item => {
    aiCard += `
        <div class="ai-conclusion-card-selection">
          <div class="ai-conclusion-card-selection-title">${item.title}</div>
          ${item.part_outline.map(s => `
            <a class="bullet" href="https://www.bilibili.com/video/${bvid}/?t=${s.timestamp}s">
              <span class="ai-conclusion-card-selection-timer">${timeNumberToTime(s.timestamp)}</span>
              <span>${s.content}</span>
            </a>
          `).join('')}
        </div>
      `
  })

  function timeNumberToTime (time) {
    const min = Math.floor(time / 60)
    const sec = time % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  aiCardElement.innerHTML = aiCard
}


/***/ }),
/* 37 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   videoInteraction: () => (/* binding */ videoInteraction)
/* harmony export */ });
/* harmony import */ var _comment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* global GM_getValue */



function videoInteraction () {
  handlePortrait()

  handlelVideoClick()

  handleVideoInteraction()

  closeMiniPlayer()

  setEndingContent()

  ;(0,_comment_js__WEBPACK_IMPORTED_MODULE_0__.modifyShadowDOMLate)()
}

let isPortrait = false

function handlePortrait () {
  const video = document.querySelector('#bilibili-player video')

  // 适配侧边栏切换视频
  video.addEventListener('resize', () => {
    // aspectRatio, resize 前宽高为 0
    isPortrait = video.videoHeight / video.videoWidth > 1
  })
}

// 接管视频点击事件
function handlelVideoClick () {
  const playerContainter = document.querySelector('.bpx-player-container')
  const videoArea = playerContainter.querySelector('.bpx-player-video-area')
  const videoPerch = videoArea.querySelector('.bpx-player-video-perch')
  const videoWrap = videoPerch.querySelector('.bpx-player-video-wrap')
  const video = videoWrap.querySelector('video')

  // 架空双击全屏层以适应竖屏
  videoArea.insertBefore(videoWrap, videoPerch)

  // safari 内联播放
  if (video) { video.playsInline = true }

  const oldControlWrap = videoArea.querySelector('.bpx-player-control-wrap')
  const controlEntity = oldControlWrap.querySelector('.bpx-player-control-entity') // 移动后再使用

  let clickTimer = null

  let hideTimer = null

  // 阻止 controlWrap 的 mouseleave 事件隐藏控制栏, mouseleave 事件不会在冒泡阶段和捕获阶段传播
  const controlWrap = Object.assign(document.createElement('div'), {
    className: 'bpx-player-control-wrap new',
    innerHTML: '<div class="bpx-player-control-mask"></div>'
  })
  videoArea.insertBefore(controlWrap, oldControlWrap)
  controlWrap.appendChild(controlEntity)

  // 观察控制栏按键弹窗, 元素发生移动后, 之前的 querySelector 会失效 (无法找到该元素)
  // 当箭头函数的函数体只有一条语句时，如果使用了花括号，则该语句会被解释为函数体，而不是返回值。因此，当使用了花括号时，isBpxStateShow 的返回值为 undefined。
  const isBpxStateShow = () => controlEntity.querySelector('.bpx-player-control-bottom-right>.bpx-state-show')

  const controlTop = controlEntity.querySelector('.bpx-player-control-top')
  const bottomRight = controlEntity.querySelector('.bpx-player-control-bottom-right')

  // 可以作语句的表达式：需要赋值给变量或者作为函数调用的一部分，能够产生一个可以被丢弃的值
  // 布尔值不能直接作为语句，因为它们不执行任何动作，也不改变程序的状态
  // x++ 作语句时执行操作，但是不显式返回值，实际 x 的值隐式地改变了；作表达式时根据前后缀，依次返回 x 的值和执行操作
  const isShown = () => playerContainter.getAttribute('ctrl-shown') === 'true' // controlWrap 的 mouseleave 事件导致点击非视频部分会隐藏控制栏, 实际已不必要

  // 覆盖原显隐
  playerContainter.setAttribute('ctrl-shown', 'false')

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes[0].classList.contains('bpx-player-ctrl-web')) { // 还可以让控制栏显示作为网页全屏按钮加载的标志事件
        if (video.paused) { showControlWrap() }
        // 点击视频关闭字幕设置
        const subtitleBtn = document.querySelector('.bpx-player-ctrl-subtitle')
        if (subtitleBtn) {
          window.addEventListener('click', event => {
            if (!subtitleBtn.contains(event.target)) { subtitleBtn.dispatchEvent(new MouseEvent('mouseleave')) }
          })
        }
        observer.disconnect()
      }
    })
  })
  observer.observe(bottomRight, { childList: true })

  function hideControlWrap (isEnd) {
    if ((!video.paused && !isBpxStateShow()) || isEnd) {
      playerContainter.setAttribute('ctrl-shown', 'false')
      clearTimeout(hideTimer)
    } else {
      delayHideTimer()
    }
  }

  video.addEventListener('ended', () => { hideControlWrap(true) })

  function showControlWrap () {
    playerContainter.setAttribute('ctrl-shown', 'true')
    delayHideTimer()
  }

  function delayHideTimer () {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(hideControlWrap, 3000)
  }

  // 阻止触摸单击触发 videoArea 的 mousemove 事件而显隐控制栏
  videoWrap.addEventListener('mousemove', event => { event.stopPropagation() })
  controlWrap.addEventListener('mousemove', event => { event.stopPropagation() })

  video.addEventListener('play', delayHideTimer)

  controlWrap.addEventListener('click', event => {
    event.stopPropagation()
    delayHideTimer()
  })

  controlTop.addEventListener('touchstart', delayHideTimer)

  // 单击监听
  videoWrap.addEventListener('click', () => {
    clearTimeout(clickTimer)

    clickTimer = setTimeout(() => {
      isShown() ? hideControlWrap() : showControlWrap()

      if (!GM_getValue('ban-video-click-play', false)) { video.paused ? video.play() : video.pause() } // videoPerch.click()
    }, 250)
  })

  // 双击监听
  videoWrap.addEventListener('dblclick', () => {
    clearTimeout(clickTimer)

    // 双击打开声音
    video.muted = false
    if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }

    isPortrait
      ? document.querySelector('.bpx-player-ctrl-web').click()
      // view 省略时指向当前窗口
      : videoPerch.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
  })

  // 阻止视频响应滑动侧边栏
  // 阻止冒泡只对当前监听器生效，禁止全屏滑动和拖动进度条触发侧边栏。要传递参数或用形参，就要用函数而非引用
  videoArea.addEventListener('touchstart', event => { event.stopPropagation() })
}

function closeMiniPlayer () {
  // 关闭小窗: getElement 提前使用在元素加载后能获取到, querySelector 在元素加载后使用才能获取到
  if (!localStorage.getItem('is-mini-player-closed')) {
    const miniPlayerBtn = document.getElementsByClassName('mini-player-window')[0]
    new MutationObserver(mutations =>
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('on')) {
          miniPlayerBtn.click()
          localStorage.setItem('is-mini-player-closed', true)
        }
      })
    ).observe(miniPlayerBtn, { attributes: true, attributeFilter: ['class'] })
  }
}

function handleVideoInteraction () {
  const video = document.querySelector('video')
  let startX, startY, startTime
  const threshold = 10 // 滑动阈值
  const initialCheckDuration = 300 // 前 x 秒，例如 300 毫秒
  let isLongPress = false
  let isSliding = false
  let timeoutId
  let times
  let isSlideAllowed
  let progressInfo
  let progressInfoCreated = false // 标志是否已创建 progressInfo 元素
  let isCreatingProgressInfo = false // 避免 progressInfo 创建完成前被重复创建

  video.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
    startTime = video.currentTime
    times = Number(GM_getValue('video-longpress-speed', '2'))
    isSlideAllowed = GM_getValue('allow-video-slid', false)

    // 设置初始检测定时器
    timeoutId = setTimeout(() => {
      // 如果前 x 秒内没有超出阈值，则认为是长按
      video.playbackRate = video.playbackRate * times
      isLongPress = true
    }, initialCheckDuration)
  })

  video.addEventListener('touchmove', (event) => {
    if (!isSlideAllowed) return

    const moveX = event.touches[0].clientX
    const moveY = event.touches[0].clientY
    const deltaX = moveX - startX
    const deltaY = moveY - startY

    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (!isLongPress) {
        // 如果前 x 秒内超出阈值，则取消长按和初始检测
        clearTimeout(timeoutId)
        isSliding = true
      } else {
        // 如果已经是长按状态，则不处理超出阈值的移动
        return
      }

      if (isSliding) {
        // 第一次滑动时创建 progressInfo 元素
        if (!progressInfoCreated && !isCreatingProgressInfo) {
          isCreatingProgressInfo = true
          progressInfo = document.createElement('div')
          progressInfo.id = 'progress-info'
          video.parentNode.insertBefore(progressInfo, video.nextSibling)
          progressInfoCreated = true
          isCreatingProgressInfo = false
        }

        video.pause()
        const progressChange = deltaX / video.clientWidth * video.duration
        video.currentTime = startTime + progressChange

        if (progressInfoCreated) {
          // 显示进度信息
          progressInfo.textContent = `进度: ${formatTime(video.currentTime)} / ${formatTime(video.duration)}`
          progressInfo.style.display = 'block'
        }
      }
    }
  })

  video.addEventListener('touchend', () => {
    clearTimeout(timeoutId)

    if (isLongPress) {
      video.playbackRate = video.playbackRate / times
      isLongPress = false
    }

    if (isSliding) {
      video.play()
      // 隐藏进度信息
      progressInfo.style.display = ''
      isSliding = false
    }
  })

  function formatTime (seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
}

function setEndingContent () {
  addEndingScale()

  function addEndingScale () {
    const style = Object.assign(document.createElement('style'), {
      id: 'ending-content-scale',
      textContent: `
        .bpx-player-ending-content[screen-mode=little-screen] { transform: scale(calc(${window.innerWidth}/536*0.9)) !important; }
        .bpx-player-ending-content { transform: scale(calc(${window.innerWidth}/710*0.9)) !important; }
        .bpx-player-container[data-screen=full] .bpx-player-ending-content { transform: scale(calc(${window.innerWidth}/952*0.9)) !important; }
      `
    })
    document.head.appendChild(style)
  }

  function renewEndingScale () {
    document.head.querySelector('#ending-content-scale').remove()
    addEndingScale()
  }

  screen.orientation.addEventListener('change', renewEndingScale)
  window.addEventListener('resize', renewEndingScale)
}


/***/ }),
/* 38 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUnfoldBtn: () => (/* binding */ createUnfoldBtn)
/* harmony export */ });
function createUnfoldBtn () {
  const observer = new MutationObserver(mutations =>
    mutations.forEach(mutation => {
    // innerHTML 属性可一次性插入多个节点。此处 mutation.addedNodes.length 为 0 或 1。非数组使用 for...of 循环。
    // addedNode.nodeType 为 1 表示 Node.ELEMENT_NODE
      if (mutation.addedNodes[0]?.classList.contains('bili-im')) {
        createElement()
        observer.disconnect()
      }
    })
  )
  const messageContainer = document.querySelector('body>.container')
  observer.observe(messageContainer, { childList: true, subtree: true })

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
/* harmony import */ var _style_space_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _style_message_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _setting_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var _actionbar_actionbar_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25);
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35);
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(37);
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(38);
// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API
















(function () {
  // setInterval(() => { debugger }, 100)

  if (window.top !== window.self) { return } // 检查当前执行环境是否为顶级窗口

  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  /* initViewport */ document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'viewport', content: 'width=device-width, initial-scale=1' }))

  ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.preventBeforeUnload)()
  ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.countViewTime)()

  /* iconfont */document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: 'https://s1.hdslb.com/bfs/static/jinkela/space/css/space.8.22c06a62b42dec796d083a84f5a769f44a97b325.css' }))

  console.log('Bilibili mobile execute!')

  // 简单表达式: 常量折叠，解析引擎优化为只计算一次，然后缓存入临时变量。函数调用、对象属性访问等不适用。
  const part = location.hostname.substring(0, location.hostname.indexOf('.'))

  switch (part) {
    case 'www':
      if (location.pathname === '/') {
        (0,_window_js__WEBPACK_IMPORTED_MODULE_7__.increaseVideoLoadSize)()
        ;(0,_home_js__WEBPACK_IMPORTED_MODULE_10__.handleHeaderImage)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
        waitDOMContentLoaded(() => {
          ;(0,_actionbar_actionbar_js__WEBPACK_IMPORTED_MODULE_9__.handleActionbar)('home')
          ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
          ;(0,_home_js__WEBPACK_IMPORTED_MODULE_10__.handleVideoCard)()
          ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.handleScroll)()
          ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.setScriptHelp)()
        })
      } else if (location.pathname.startsWith('/video')) {
        (0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
        waitDOMContentLoaded(() => {
          ;(0,_actionbar_actionbar_js__WEBPACK_IMPORTED_MODULE_9__.handleActionbar)('video')
          ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
          ;(0,_video_js__WEBPACK_IMPORTED_MODULE_11__.videoInteraction)()
          ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.handleScroll)('video')
          ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.setScriptHelp)()
        })
      }
      break
    case 'search':
      ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_actionbar_js__WEBPACK_IMPORTED_MODULE_9__.handleActionbar)('search')
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
        ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.handleScroll)('search')
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.setScriptHelp)()
      })
      break
    case 'space':
      ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_actionbar_js__WEBPACK_IMPORTED_MODULE_9__.handleActionbar)('space')
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
        ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.handleScroll)('space')
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.setScriptHelp)()
      })
      break
    case 'message':
      ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptPreSetting)()
      waitDOMContentLoaded(() => {
        ;(0,_actionbar_actionbar_js__WEBPACK_IMPORTED_MODULE_9__.handleActionbar)('message')
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.handleScriptSetting)()
        ;(0,_window_js__WEBPACK_IMPORTED_MODULE_7__.handleScroll)('message')
        ;(0,_message_js__WEBPACK_IMPORTED_MODULE_12__.createUnfoldBtn)()
        ;(0,_setting_js__WEBPACK_IMPORTED_MODULE_8__.setScriptHelp)()
      })
      break
    default:
      break
  }
})()

})();

/******/ })()
;