const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopData: [], // 用于存储数据库中的数据
  },
  // 支付导航
  gotoAlipay: function() {
    wx.navigateTo({
      url: '/pages/wechatpay/wechatpay',
    })
  },
  gotoWechatPay: function() {
    wx.navigateTo({
      url: '/pages/wechatpay/wechatpay',
    })
  },
  gotoUnionPay: function() {
    wx.navigateTo({
      url: '/pages/wechatpay/wechatpay',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在页面加载时获取数据库信息
    this.getData();
  },

  // 获取数据库信息的函数
  getData() {
    // 通过云函数 "shoplist" 获取数据库中的数据
    wx.cloud.callFunction({
      name: 'shoplist', // 云函数名称为 "shoplist"
      data: {},
    }).then(res => {
      // 从云函数返回的数据中获取 "title" 和 "up1" 字段值
      const shopData = res.result.data;
      
      // 更新页面数据，显示 "title" 和 "up1"
      this.setData({
        shopData: shopData,
      });
    }).catch(err => {
      console.error('云函数调用失败', err);
    });
  },

  // 其他生命周期函数和页面相关事件处理函数可以根据需求进行添加

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // 可以在这里配置分享的内容
  },
});
