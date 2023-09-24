// pages/pillDetail/pillDetail.js
Page({
  data: {
    itemDetail: {}, // 存储商品详情数据
  },

  onLoad: function (options) {
    const itemId = options.itemId; // 从URL参数中获取商品ID
    this.fetchItemDetail(itemId); // 调用函数获取商品详情
  },

  // 示例函数，用于获取商品详情数据
  fetchItemDetail(itemId) {
    wx.cloud.callFunction({
      name: 'getpills', // 云函数的名称
      data: { productId: itemId }, // 传递商品ID给云函数
      success: res => {
        const itemDetail = res.result.data[0]; // 假设返回的数据是一个对象
        this.setData({
          itemDetail: itemDetail,
        });
      },
      fail: error => {
        console.error('获取商品详情失败：', error);
        // 在失败情况下可以添加适当的用户提示或错误处理逻辑
      },
    });
  },
});
