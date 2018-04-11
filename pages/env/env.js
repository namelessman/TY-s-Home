import { getEnvNow, } from '../../api/index.js';

Page({
  data: {
    temperature: 0,
    humidity: 0,
    isGas: false
  },
  getNow() {
    getEnvNow((res) => {
      if (res.status === 0) {
        this.setData({
          temperature: res.data.temperature,
          humidity: res.data.humidity
        });
        if (res.data.isGas) {
          if (res.data.gas >= 0) {
            wx.showModal({
              title: `当前可燃气体浓度为${res.data.gas}%`,
              showCancel: false,
              confirmColor: '#eb3939'
            });
            this.setData({
              isGas: true
            });
          }
        } else {
          this.setData({
            isGas: false
          });
        }
      } else if (res.status === 10){
        wx.redirectTo({
            url: '/pages/index/index',
          });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    }, (res) => {
      console.log(res)
    });
  },
  goSeven() {
    wx.navigateTo({
      url: './seven',
    });
  },
  // onReady(options) {
  //   this.getNow();
  // },
  onShow(){
    this.getNow();
    wx.setTabBarStyle({
      backgroundColor: '#104b6a'
    });
  }
});
