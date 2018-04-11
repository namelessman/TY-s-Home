//index.js
import {login as loginReq} from '../../api/index.js';
//获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    pwd: ''
  },
  //事件处理函数
  signup: function() {
    wx.navigateTo({
      url: '../signup/signup'
    })
  },
  inputUserName(e){
    this.setData({
      username: e.detail.value
    });
  },
  inputPwd(e){
    this.setData({
      pwd: e.detail.value
    });
  },
  login(){
    let that = this;
    if(this.data.username && this.data.pwd) {
      // 进行下一步
      let data = {
        username: this.data.username,
        password: this.data.pwd
      };
      function success(res){
        console.log(res);
        if(res.status == 0) {
          // 下一步
          wx.switchTab({
            url: '../man/man'
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      }
      function fail(res) {
        console.log(res);
      }
      loginReq(data, success, fail);
    }
  }
})
