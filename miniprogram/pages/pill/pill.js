// pages/pill/pill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [], // 存储列表项数据的数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchPills(); // 调用获取数据的函数
  },
  

  // 示例函数，用于获取列表项数据
  fetchPills() {
    wx.cloud.callFunction({
      name: 'getpills', // 云函数的名称
      success: res => {
        this.setData({
          itemList: res.result.data,
        });
      },
      fail: error => {
        console.error('获取数据失败：', error);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 页面初次渲染完成后，你可以在这里执行一些页面渲染后的操作
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时，你可以执行一些需要在页面显示时刷新的操作
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏时，你可以执行一些需要在页面隐藏时处理的操作
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时，你可以执行一些清理操作
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 用户下拉刷新时，你可以执行一些数据刷新的操作
    this.fetchItemList(); // 刷新列表数据
    wx.stopPullDownRefresh(); // 停止下拉刷新动画
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 用户上拉触底时，你可以执行一些加载更多数据的操作
    // 如果有分页加载的需求，可以在这里处理
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // 定义分享功能，当用户点击右上角分享按钮时触发
    // 返回一个包含分享信息的对象
  }
});
