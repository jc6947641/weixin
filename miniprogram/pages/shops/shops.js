// pillDetail.js

Page({
  data: {
    pillDetail: {}, // 存储详情页数据
  },

  onLoad: function (options) {
    const { id } = options // 从参数中获取id
    // 调用云函数获取详情页数据
    wx.cloud.callFunction({
      name: 'getshopDetail',
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

  addToCart: function () {
    const { id, name, price } = this.data.pillDetail; // 从商品详情页获取商品信息
    const userId = wx.getStorageSync('userId'); // 获取当前登录用户的ID，假设使用缓存存储用户ID

    // 构建购物车商品对象
    const cartItem = { id, name, price, quantity: 1, userId };
    
    const cart = wx.getStorageSync('cart') || [];

    // 检查购物车中是否已存在相同商品，如果存在，则更新数量
    const existingItemIndex = cart.findIndex(item => item.id === id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
    } else {
      // 否则，将商品添加到购物车
      cart.push(cartItem);
    }

    // 更新购物车数据并提示用户
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
    });

    // 跳转到购物车页面

    // 调用云函数或其他逻辑将商品添加到购物车
    wx.cloud.callFunction({
      name: 'addToCart',
      data: cartItem,
      success: res => {
        wx.showToast({
          title: '已添加到购物车',
          icon: 'success',
        });
      },
      fail: error => {
        console.error('添加到购物车失败：', error);
        // 在失败情况下可以添加适当的用户提示或错误处理逻辑
      },
    });
  },

  gotoWechatPay: function () {
    wx.navigateTo({
      url: '/pages/wechatpay/wechatpay',
    });
  },
});
