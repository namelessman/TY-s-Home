import { BASE_PATH } from './config.js';

export function login(data, success, fail) {
  wx.request({
    url: `${BASE_PATH}/user/login.do`,
    method: 'POST',
    data,
    header: {"Content-Type": "application/x-www-form-urlencoded" },
    // header: { "Content-Type": "t/json;charset=UTF-8"},
    success: function (res) {
      success(res.data);
      wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

export function signup(data, success, fail) {
  wx.request({
    url: `${BASE_PATH}/user/register.do`,
    method: 'POST',
    data,
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success: function (res) {
      success(res.data);
    },
    fail: function (res) {
      fail(res);
    }
  });
}