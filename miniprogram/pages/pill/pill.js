// pages/pill/pill.js
Page({
  data: {
    itemList: [], // 存储列表项数据的数组
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
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
        // 在失败情况下可以添加适当的用户提示或错误处理逻辑
      },
    });
  },

  // 点击列表项跳转到详情页
  onListItemClick(event) {
    const itemId = event.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: `/pages/pillDetail/pillDetail?itemId=${itemId}`,
    });
  },
});