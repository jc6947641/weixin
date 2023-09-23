const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '', // 用于存储从云函数返回的title
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在页面加载时，获取数据库中的"title"
    this.fetchShopTitle();
  },

  // 点击图片时触发的函数
  handleImageClick() {
    this.fetchShopTitle(); // 调用云函数获取"title"
  },

  // 调用云函数获取"title"的函数
  fetchShopTitle() {
    // 调用云函数shoplistyun并传递参数（如果需要）
    wx.cloud.callFunction({
      name: 'shoplistyun',
      data: {
        // 如果需要传递参数，请在这里添加
      },
    }).then(res => {
      // 从云函数返回的数据中获取"title"字段
      const title = res.result.title;
      
      // 更新页面数据，显示title
      this.setData({
        title: title,
      });
    }).catch(err => {
      console.error('云函数调用失败', err);
    });
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    // 可以在这里配置分享的内容
  },
});