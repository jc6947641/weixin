// pillDetail.js

Page({
  data: {
    pillDetail: {}, // 存储详情页数据
  },

  onLoad: function (options) {
    const { id } = options; // 从参数中获取id
    // 调用云函数获取详情页数据
    wx.cloud.callFunction({
      name: 'getpillsDetail',
      data: {
        id: id,
      },
      success: res => {
        this.setData({
          pillDetail: res.result.data,
        });
      },
      fail: error => {
        console.error('获取详情数据失败：', error);
        // 在失败情况下可以添加适当的用户提示或错误处理逻辑
      },
    });
  },
  gotoWechatPay: function() {
    wx.navigateTo({
      url: '/pages/wechatpay/wechatpay',
    })
  },
});
