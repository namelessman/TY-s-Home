import { BASE_PATH } from './config.js';

export function getEnvNow(success, fail) {
  wx.request({
    url: `${BASE_PATH}/env/selectNow.do`,
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

export function getEnvWeek(success, fail) {
  wx.request({
    url: `${BASE_PATH}/env/selectSevenDay.do`,
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