// show.js
Page({
  data: {
    healthRecord: {}
  },

  onLoad: function () {
    // 从本地存储中获取表单数据
    const healthRecord = wx.getStorageSync('healthRecord');
    if (healthRecord) {
      this.setData({
        healthRecord: healthRecord
      })
    }
  }
})
