import * as echarts from '../../ec-canvas/echarts';
import { getEnvWeek } from '../../api/index.js';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.showLoading();

  var option = {
    backgroundColor: "#fff",
    color: ["#37A2DA", "#67E0E3"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {

      data: ['温度', '湿度']
    },
    grid: {
      containLabel: true
    },

    xAxis: {
    },
    yAxis: [{
      name: '温度(℃)',
      x: 'center',
      type: 'value'
    }, {
      name: '湿度(%)',
      x: 'center',
      type: 'value'
    }],
    series: []
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },
  getWeek() {
    getEnvWeek((res) => {
      if (res.status == 0) {
        let temperatures = [];
        let humiditys = [];
        let times = [];
        for (let i = 0; i < res.data.length; i++) {
          temperatures.push(res.data[i].temperature);
          humiditys.push(res.data[i].humidity);
          times.push(res.data[i].createTime);
        }
        chart.setOption({
          series: [{
            name: '温度',
            type: 'line',
            smooth: true,
            data: temperatures
          }, {
            name: '湿度',
            type: 'line',
            smooth: true,
            data: humiditys
          }],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times
          },
        });
        chart.hideLoading();
      } else if (res.status === 10) {
        wx.redirectTo({
          url: '/pages/index/index',
        });
      } else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    }, (res) => {

    });
  },
  return() {
    wx.navigateBack({

    });
  },
  onLoad(options) {
    setTimeout(() => {
      this.getWeek();
    }, 500);
  }
});
