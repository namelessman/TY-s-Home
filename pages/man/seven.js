import * as echarts from '../../ec-canvas/echarts';
import { getHealthWeek } from '../../api/index.js';

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

      data: ['心率', '血氧']
    },
    grid: {
      containLabel: true
    },

    xAxis: {
    },
    yAxis: [{
      name: '心率',
      x: 'center',
      type: 'value'
    }, {
      name: '血氧(%)',
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
    getHealthWeek((res) => {
      if (res.status == 0) {
        let heartRates = [];
        let bloodOxygens = [];
        let times = [];
        for (let i = 0; i < res.data.length; i++) {
          heartRates.push(Math.round(res.data[i].heartRate));
          bloodOxygens.push(Math.round(res.data[i].bloodOxygen));
          times.push(res.data[i].date + '-' + res.data[i].hour);
        }
        chart.setOption({
          series: [{
            name: '心率',
            type: 'line',
            smooth: true,
            data: heartRates
          }, {
            name: '血氧',
            type: 'line',
            smooth: true,
            data: bloodOxygens
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
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    }, (res) => {

    });
  },
  return(){
    wx.navigateBack({
      
    });
  },
  onLoad(options) {
    setTimeout(() => {
      this.getWeek();
    }, 500);
  }
});
