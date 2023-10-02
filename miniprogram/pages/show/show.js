// show.js
Page({
  data: {
    healthRecord: {}
  },
  onLoad: function () {
    // 从本地存储中获取健康档案数据
    const healthRecord = wx.getStorageSync('healthRecord') || {};
    this.setData({
      healthRecord
    });
  }
})
