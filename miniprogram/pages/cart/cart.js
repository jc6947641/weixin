// cart.js

Page({
  data: {
    cartItems: [], // 存储购物车中的商品项
  },

  onLoad: function () {
    // 在页面加载时调用云函数获取购物车内容
    this.getCartItems();
  },

  // 获取购物车内容的函数
  getCartItems: function () {
    const userId = wx.getStorageSync('userId');
    wx.cloud.callFunction({
      name: 'getCartItems', // 使用新创建的云函数名称
      data: {
        userId: userId,
      },
      success: res => {
        if (res.result.success) {
          this.setData({
            cartItems: res.result.cartItems, // 将云函数返回的购物车内容存储在页面数据中
          });
        } else {
          wx.showToast({
            title: '获取购物车内容失败',
            icon: 'none',
          });
        }
      },
      fail: error => {
        console.error('获取购物车内容失败：', error);
        wx.showToast({
          title: '获取购物车内容失败',
          icon: 'none',
        });
      },
    });
  },
});
