// collect.js
Page({
  data: {
    bloodTypes: ['A', 'B', 'AB', 'O'],
    bloodTypeIndex: 0
  },

  bindBloodTypeChange: function(e) {
    this.setData({
      bloodTypeIndex: e.detail.value
    })
  },

  submitForm: function(e) {
    const formData = e.detail.value;
    console.log('表单数据：', formData);
    // 将表单数据保存到本地存储中
    wx.setStorageSync('healthRecord', formData);
    // 跳转到健康档案展示页面
    wx.navigateTo({
      url: '/pages/show/show'
    })
  }
})

