// pages/signup/signup.js
import { signup as signupReq } from '../../api/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: '',
    phone: ''
  },
  inputUserName(e) {
    this.setData({
      username: e.detail.value
    });
  },
  inputPhone(e){
    this.setData({
      phone: e.detail.value
    });
  },
  inputPwd(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  signup() {
    // 暂时不需要手机
    // if (this.username && this.pwd && this.pwd.length === 11) {
    if (this.data.username && this.data.pwd) {
      // 进行下一步
      let data = {
        username: this.data.username,
        password: this.data.pwd
      };
      function success(res){
        if(res.status == 0) {
          wx.showToast({
            title: '注册成功！',
            success: function(){
              wx.navigateTo({
                url: '/pages/index/index',
              });
            }
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      }
      function fail(){
        wx.showToast({
          title: '网络错误，请稍后再试',
          icon: 'none'
        });
      }
      signupReq(data, success, fail);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})