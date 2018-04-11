import {BASE_PATH} from './config.js';

export function getHealthNow(success, fail){
  wx.request({
    url: `${BASE_PATH}/health/selectNow.do`,
    header: {
      'cookie': wx.getStorageSync("sessionid")
    },
    success: function(res) {
      success(res.data);
    },
    fail: function(res) {
      fail(res);
    }
  });
}

export function getHealthWeek(success, fail) {
  wx.request({
    url: `${BASE_PATH}/health/selectSevenDay.do`,
    header: {
      'cookie': wx.getStorageSync("sessionid")
    },
    success: function (res) {
      success(res.data);
    },
    fail: function (res) {
      fail(res);
    }
  });
}