module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */
// 小程序开发api接口工具包，https://github.com/gooking/wxapi
var API_BASE_URL = 'https://api.it120.cc';
var subDomain = 'tz';

var request = function request(url, needSubDomain, method, data) {
  var _url = API_BASE_URL + (needSubDomain ? '/' + subDomain : '') + url;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function success(request) {
        resolve(request.data);
      },
      fail: function fail(error) {
        reject(error);
      },
      complete: function complete(aaa) {
        // 加载完成
      }
    });
  });
};

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(function (value) {
    Promise.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    Promise.resolve(callback()).then(function () {
      throw reason;
    });
  });
};

module.exports = {
  init2: function init2(a, b) {
    API_BASE_URL = a;
    subDomain = b;
  },
  init: function init(b) {
    subDomain = b;
  },
  request: request,
  queryMobileLocation: function queryMobileLocation() {
    var mobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/common/mobile-segment/location', false, 'get', { mobile: mobile });
  },
  nextMobileSegment: function nextMobileSegment(data) {
    return request('/common/mobile-segment/next', false, 'post', data);
  },
  queryConfigValue: function queryConfigValue(key) {
    return request('/config/value', true, 'get', { key: key });
  },
  queryConfigBatch: function queryConfigBatch(keys) {
    return request('/config/values', true, 'get', { keys: keys });
  },
  scoreRules: function scoreRules(data) {
    return request('/score/send/rule', true, 'post', data);
  },
  scoreSign: function scoreSign(token) {
    return request('/score/sign', true, 'post', {
      token: token
    });
  },
  scoreSignLogs: function scoreSignLogs(data) {
    return request('/score/sign/logs', true, 'post', data);
  },
  scoreTodaySignedInfo: function scoreTodaySignedInfo(token) {
    return request('/score/today-signed', true, 'get', {
      token: token
    });
  },
  scoreExchange: function scoreExchange(number, token) {
    return request('/score/exchange', true, 'post', {
      number: number,
      token: token
    });
  },
  scoreLogs: function scoreLogs(data) {
    return request('/score/logs', true, 'post', data);
  },
  shareGroupGetScore: function shareGroupGetScore(referrer, encryptedData, iv) {
    return request('/score/share/wxa/group', true, 'post', {
      referrer: referrer,
      encryptedData: encryptedData,
      iv: iv
    });
  },
  kanjiaList: function kanjiaList(data) {
    return request('/shop/goods/kanjia/list', true, 'post', data);
  },
  kanjiaSet: function kanjiaSet(goodsId) {
    return request('/shop/goods/kanjia/set', true, 'get', { goodsId: goodsId });
  },
  kanjiaJoin: function kanjiaJoin(kjid, token) {
    return request('/shop/goods/kanjia/join', true, 'post', {
      kjid: kjid,
      token: token
    });
  },
  kanjiaDetail: function kanjiaDetail(kjid, joiner) {
    return request('/shop/goods/kanjia/info', true, 'get', {
      kjid: kjid,
      joiner: joiner
    });
  },
  kanjiaHelp: function kanjiaHelp(kjid, joiner, token, remark) {
    return request('/shop/goods/kanjia/help', true, 'post', {
      kjid: kjid,
      joinerUser: joiner,
      token: token,
      remark: remark
    });
  },
  kanjiaHelpDetail: function kanjiaHelpDetail(kjid, joiner, token) {
    return request('/shop/goods/kanjia/myHelp', true, 'get', {
      kjid: kjid,
      joinerUser: joiner,
      token: token
    });
  },
  checkToken: function checkToken(token) {
    return request('/user/check-token', true, 'get', {
      token: token
    });
  },
  addTempleMsgFormid: function addTempleMsgFormid(data) {
    return request('/template-msg/wxa/formId', true, 'post', data);
  },
  sendTempleMsg: function sendTempleMsg(data) {
    return request('/template-msg/put', true, 'post', data);
  },
  wxpay: function wxpay(data) {
    return request('/pay/wx/wxapp', true, 'post', data);
  },
  alipay: function alipay(data) {
    return request('/pay/alipay/semiAutomatic/payurl', true, 'post', data);
  },
  login_wx: function login_wx(code) {
    return request('/user/wxapp/login', true, 'post', {
      code: code,
      type: 2
    });
  },
  login_username: function login_username(data) {
    return request('/user/username/login', true, 'post', data);
  },
  register_complex: function register_complex(data) {
    return request('/user/wxapp/register/complex', true, 'post', data);
  },
  register_simple: function register_simple(data) {
    return request('/user/wxapp/register/simple', true, 'post', data);
  },
  register_username: function register_username(data) {
    return request('/user/username/register', true, 'post', data);
  },
  banners: function banners(data) {
    return request('/banner/list', true, 'get', data);
  },
  goodsCategory: function goodsCategory() {
    return request('/shop/goods/category/all', true, 'get');
  },
  goods: function goods(data) {
    return request('/shop/goods/list', true, 'post', data);
  },
  goodsDetail: function goodsDetail(id) {
    return request('/shop/goods/detail', true, 'get', {
      id: id
    });
  },
  goodsPrice: function goodsPrice(data) {
    return request('/shop/goods/price', true, 'post', data);
  },
  goodsReputation: function goodsReputation(data) {
    return request('/shop/goods/reputation', true, 'post', data);
  },
  coupons: function coupons(data) {
    return request('/discounts/coupons', true, 'get', data);
  },
  couponDetail: function couponDetail(id) {
    return request('/discounts/detail', true, 'get', {
      id: id
    });
  },
  myCoupons: function myCoupons(data) {
    return request('/discounts/my', true, 'get', data);
  },
  fetchCoupons: function fetchCoupons(data) {
    return request('/discounts/fetch', true, 'post', data);
  },
  sendCoupons: function sendCoupons(data) {
    return request('/discounts/send', true, 'post', data);
  },
  noticeList: function noticeList(data) {
    return request('/notice/list', true, 'post', data);
  },
  noticeLastOne: function noticeLastOne() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/notice/last-one', true, 'get', {
      type: type
    });
  },
  noticeDetail: function noticeDetail(id) {
    return request('/notice/detail', true, 'get', {
      id: id
    });
  },
  addAddress: function addAddress(data) {
    return request('/user/shipping-address/add', true, 'post', data);
  },
  updateAddress: function updateAddress(data) {
    return request('/user/shipping-address/update', true, 'post', data);
  },
  deleteAddress: function deleteAddress(id, token) {
    return request('/user/shipping-address/delete', true, 'post', {
      id: id,
      token: token
    });
  },
  queryAddress: function queryAddress(token) {
    return request('/user/shipping-address/list', true, 'get', {
      token: token
    });
  },
  defaultAddress: function defaultAddress(token) {
    return request('/user/shipping-address/default', true, 'get', {
      token: token
    });
  },
  addressDetail: function addressDetail(id, token) {
    return request('/user/shipping-address/detail', true, 'get', {
      id: id,
      token: token
    });
  },
  pingtuanSet: function pingtuanSet(goodsId) {
    return request('/shop/goods/pingtuan/set', true, 'get', {
      goodsId: goodsId
    });
  },
  pingtuanOpen: function pingtuanOpen(goodsId, token) {
    return request('/shop/goods/pingtuan/open', true, 'post', {
      goodsId: goodsId,
      token: token
    });
  },
  pingtuanList: function pingtuanList(goodsId) {
    return request('/shop/goods/pingtuan/list', true, 'get', {
      goodsId: goodsId
    });
  },
  friendlyPartnerList: function friendlyPartnerList() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/friendly-partner/list', true, 'post', {
      type: type
    });
  },
  videoDetail: function videoDetail(videoId) {
    return request('/media/video/detail', true, 'get', {
      videoId: videoId
    });
  },
  bindMobile: function bindMobile(data) {
    return request('/user/wxapp/bindMobile', true, 'post', data);
  },
  userDetail: function userDetail(token) {
    return request('/user/detail', true, 'get', {
      token: token
    });
  },
  userAmount: function userAmount(token) {
    return request('/user/amount', true, 'get', {
      token: token
    });
  },
  orderCreate: function orderCreate(data) {
    return request('/order/create', true, 'post', data);
  },
  orderList: function orderList(data) {
    return request('/order/list', true, 'post', data);
  },
  orderDetail: function orderDetail(id, token) {
    return request('/order/detail', true, 'get', {
      id: id,
      token: token
    });
  },
  orderDelivery: function orderDelivery(orderId, token) {
    return request('/order/delivery', true, 'post', {
      orderId: orderId,
      token: token
    });
  },
  orderReputation: function orderReputation(data) {
    return request('/order/reputation', true, 'post', data);
  },
  orderClose: function orderClose(orderId, token) {
    return request('/order/close', true, 'post', {
      orderId: orderId,
      token: token
    });
  },
  orderPay: function orderPay(orderId, token) {
    return request('/order/pay', true, 'post', {
      orderId: orderId,
      token: token
    });
  },
  orderStatistics: function orderStatistics(token) {
    return request('/order/statistics', true, 'get', {
      token: token
    });
  },
  withDrawApply: function withDrawApply(token, money) {
    return request('/user/withDraw/apply', true, 'post', {
      money: money,
      token: token
    });
  },
  withDrawDetail: function withDrawDetail(token, id) {
    return request('/user/withDraw/detail', true, 'get', {
      token: token,
      id: id
    });
  },
  withDrawLogs: function withDrawLogs(data) {
    return request('/user/withDraw/list', true, 'post', data);
  },
  province: function province() {
    return request('/common/region/v2/province', false, 'get');
  },
  nextRegion: function nextRegion(pid) {
    return request('/common/region/v2/child', false, 'get', {
      pid: pid
    });
  },
  cashLogs: function cashLogs(data) {
    return request('/user/cashLog', true, 'post', data);
  },
  payLogs: function payLogs(data) {
    return request('/user/payLogs', true, 'post', data);
  },
  rechargeSendRules: function rechargeSendRules() {
    return request('/user/recharge/send/rule', true, 'get');
  },
  payBillDiscounts: function payBillDiscounts() {
    return request('/payBill/discounts', true, 'get');
  },
  payBill: function payBill(data) {
    return request('/payBill/pay', true, 'post', data);
  },
  vipLevel: function vipLevel() {
    return request('/config/vipLevel', true, 'get');
  },
  fxApply: function fxApply(token, name, mobile) {
    return request('/saleDistribution/apply', true, 'post', { token: token, name: name, mobile: mobile });
  },
  fxApplyProgress: function fxApplyProgress(token) {
    return request('/saleDistribution/apply/progress', true, 'get', { token: token });
  },
  fxMembers: function fxMembers(data) {
    return request('/saleDistribution/members', true, 'post', data);
  },
  fxCommisionLog: function fxCommisionLog(data) {
    return request('/saleDistribution/commision/log', true, 'post', data);
  },
  wxaQrcode: function wxaQrcode(data) {
    return request('/qrcode/wxa/unlimit', true, 'post', data);
  },
  uploadFile: function uploadFile(token, tempFilePath) {
    var uploadUrl = API_BASE_URL + '/' + subDomain + '/dfs/upload/file';
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        url: uploadUrl,
        filePath: tempFilePath,
        name: 'upfile',
        formData: {
          'token': token
        },
        success: function success(res) {
          resolve(JSON.parse(res.data));
        },
        fail: function fail(error) {
          reject(error);
        },
        complete: function complete(aaa) {
          // 加载完成
        }
      });
    });
  },
  uploadFileFromUrl: function uploadFileFromUrl() {
    var remoteFileUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return request('/dfs/upload/url', true, 'post', { remoteFileUrl: remoteFileUrl, ext: ext });
  },
  uploadFileList: function uploadFileList() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/dfs/upload/list', true, 'post', { path: path });
  },
  refundApply: function refundApply(token, orderId, type, logisticsStatus, reason, amount, remark, pic) {
    return request('/order/refundApply/apply', true, 'post', {
      token: token,
      orderId: orderId,
      type: type,
      logisticsStatus: logisticsStatus,
      reason: reason,
      amount: amount,
      remark: remark,
      pic: pic
    });
  },
  refundApplyDetail: function refundApplyDetail(token, orderId) {
    return request('/order/refundApply/info', true, 'get', {
      token: token,
      orderId: orderId
    });
  },
  refundApplyCancel: function refundApplyCancel(token, orderId) {
    return request('/order/refundApply/cancel', true, 'post', {
      token: token,
      orderId: orderId
    });
  },
  cmsCategories: function cmsCategories() {
    return request('/cms/category/list', true, 'get', {});
  },
  cmsCategoryDetail: function cmsCategoryDetail(id) {
    return request('/cms/category/detail', true, 'get', { id: id });
  },
  cmsArticles: function cmsArticles(data) {
    return request('/cms/news/list', true, 'post', data);
  },
  cmsArticleUsefulLogs: function cmsArticleUsefulLogs(data) {
    return request('/cms/news/useful/logs', true, 'post', data);
  },
  cmsArticleDetail: function cmsArticleDetail(id) {
    return request('/cms/news/detail', true, 'get', { id: id });
  },
  cmsArticlePreNext: function cmsArticlePreNext(id) {
    return request('/cms/news/preNext', true, 'get', { id: id });
  },
  cmsArticleCreate: function cmsArticleCreate(data) {
    return request('/cms/news/put', true, 'post', data);
  },
  cmsArticleDelete: function cmsArticleDelete(token, id) {
    return request('/cms/news/del', true, 'post', { token: token, id: id });
  },
  cmsArticleUseless: function cmsArticleUseless(data) {
    return request('/cms/news/useful', true, 'post', data);
  },
  cmsPage: function cmsPage(key) {
    return request('/cms/page/info', true, 'get', { key: key });
  },
  cmsTags: function cmsTags() {
    return request('/cms/tags/list', true, 'get', {});
  },
  invoiceList: function invoiceList(data) {
    return request('/invoice/list', true, 'post', data);
  },
  invoiceApply: function invoiceApply(data) {
    return request('/invoice/apply', true, 'post', data);
  },
  invoiceDetail: function invoiceDetail(token, id) {
    return request('/invoice/info', true, 'get', { token: token, id: id });
  },
  depositList: function depositList(data) {
    return request('/deposit/list', true, 'post', data);
  },
  payDeposit: function payDeposit(data) {
    return request('/deposit/pay', true, 'post', data);
  },
  depositInfo: function depositInfo(token, id) {
    return request('/deposit/info', true, 'get', { token: token, id: id });
  },
  depositBackApply: function depositBackApply(token, id) {
    return request('/deposit/back/apply', true, 'post', { token: token, id: id });
  },
  fetchShops: function fetchShops(data) {
    return request('/shop/subshop/list', true, 'post', data);
  },
  shopSubdetail: function shopSubdetail(id) {
    return request('/shop/subshop/detail/v2', true, 'get', { id: id });
  },
  addComment: function addComment(data) {
    return request('/comment/add', true, 'post', data);
  },
  commentList: function commentList(data) {
    return request('/comment/list', true, 'post', data);
  },
  modifyUserInfo: function modifyUserInfo(data) {
    return request('/user/modify', true, 'post', data);
  },
  uniqueId: function uniqueId() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/uniqueId/get', true, 'get', { type: type });
  },
  queryBarcode: function queryBarcode() {
    var barcode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/barcode/info', true, 'get', { barcode: barcode });
  },
  luckyInfo: function luckyInfo(id) {
    return request('/luckyInfo/info', true, 'get', { id: id });
  },
  luckyInfoJoin: function luckyInfoJoin(id, token) {
    return request('/luckyInfo/join', true, 'post', { id: id, token: token });
  },
  luckyInfoJoinMy: function luckyInfoJoinMy(id, token) {
    return request('/luckyInfo/join/my', true, 'get', { id: id, token: token });
  },
  luckyInfoJoinLogs: function luckyInfoJoinLogs(data) {
    return request('/luckyInfo/join/logs', true, 'post', data);
  },
  jsonList: function jsonList(data) {
    return request('/json/list', true, 'post', data);
  },
  jsonSet: function jsonSet(data) {
    return request('/json/set', true, 'post', data);
  },
  jsonDelete: function jsonDelete() {
    var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var id = arguments[1];

    return request('/json/delete', true, 'post', { token: token, id: id });
  },
  graphValidateCodeUrl: function graphValidateCodeUrl() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random();

    var _url = API_BASE_URL + '/' + subDomain + '/verification/pic/get?key=' + key;
    return _url;
  },
  graphValidateCodeCheck: function graphValidateCodeCheck() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random();
    var code = arguments[1];

    return request('/verification/pic/check', true, 'post', { key: key, code: code });
  },
  shortUrl: function shortUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return request('/common/short-url/shorten', false, 'post', { url: url });
  },
  smsValidateCode: function smsValidateCode(mobile) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var picCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return request('/verification/sms/get', true, 'get', { mobile: mobile, key: key, picCode: picCode });
  },
  smsValidateCodeCheck: function smsValidateCodeCheck(mobile, code) {
    return request('/verification/sms/check', true, 'post', { mobile: mobile, code: code });
  },
  mapDistance: function mapDistance(lat1, lng1, lat2, lng2) {
    return request('/common/map/distance', false, 'get', { lat1: lat1, lng1: lng1, lat2: lat2, lng2: lng2 });
  },
  mapQQAddress: function mapQQAddress() {
    var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var coord_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '5';

    return request('/common/map/qq/address', false, 'get', { location: location, coord_type: coord_type });
  }
};

/***/ })
/******/ ]);