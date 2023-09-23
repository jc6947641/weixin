// pages/shoplist/shoplist.js
Page({
   /**
   * 页面的初始数据
   */
  data: {
    shopData: [], // 用于存储数据库中的数据
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
    // 调用云函数shoplistyun并传递参数（如果需要）
    wx.cloud.callFunction({
      name: 'shoplist',
      data: {
        // 如果需要传递参数，请在这里添加
      },
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
  data: {
    dataObj: [],
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
    db.collection("shop")
      .get()
      .then((res) => {
        console.log(res);
        this.setData({
          dataObj: res.data,
        });
      })
      .catch((err) => {
        console.error("获取数据库信息失败", err);
      });
  },

  // 其他生命周期函数和页面相关事件处理函数可以根据需求进行添加

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // 可以在这里配置分享的内容
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})