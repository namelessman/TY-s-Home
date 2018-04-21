import { getHealthNow } from '../../api/index.js';
import { getEnvNow } from '../../api/index.js';

Page({
  data: {
    heartRate: 0,
    bloodOxygen: 0,
    isGas: false
  },
  getNow(){
    getHealthNow((res) => {
    if(res.status === 0) {
      this.setData({
        heartRate: Math.round(res.data.heartRate),
        bloodOxygen: Math.round(res.data.bloodOxygen)
      })
    } else if (res.status === 10) {
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
  goSeven(){
    wx.navigateTo({
      url: './seven',
    });
  },
  onReady(options) {
    // this.getNow();
    getEnvNow((res) => {
      if (res.status === 0) {
        if (res.data.isGas) {
          if (res.data.gas >= 0){
            wx.showModal({
              title: `警告:可燃气体状态异常！`,
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
      }
    }, (res) => {
      console.log(res)
    });
  },
  onShow(){
    this.getNow();
    wx.setTabBarStyle({
      backgroundColor: '#45252a'
    });
  }
});
