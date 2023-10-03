// pillDetail.js

Page({
  data: {
    
    pillDetail: {}, // 存储详情页数据
    productId: null, // 存储从 options 中获取的 id
  },

  onLoad: function (options) {
    // 直接从 options 中获取传递的 id 并存储到 data 中
    const { id } = options;
    this.setData({
      productId: id
    });

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
  onPay() {
    const price = this.data.shops.pillDetail.price;
    const title = this.data.shops.pillDetail.title;
    const up1 = this.data.shops.pillDetail.up1;
    wx.navigateTo({
      url: `/pages/wetchatpay/index?price=${price}&title=${title}&up1=${up1}`
      
    })
  },

  gotoWechatPay: function () {
    wx.navigateTo({
      url: '/pages/wechatpay/wechatpay',
    });
  },

  addToCart: function () {
    const { productId } = this.data; // 直接使用从 options 中获取的 productId
    const userId = wx.getStorageSync('userId');
    const cartItem = { id: productId, quantity: 1, userId }; // 创建一个初始购物车项目对象
  
    // 调用云函数获取商品详细信息，包括 name, price, 和 image1
    wx.cloud.callFunction({
      name: 'getshopDetail',
      data: {
        id: productId,
      },
      success: res => {
        const { title, price, up1 } = res.result.data; // 获取商品详细信息
        cartItem.name = title; // 将商品名称添加到购物车项目
        cartItem.price = price; // 将商品价格添加到购物车项目
        cartItem.image1 = up1; // 将商品图片添加到购物车项目
  
        let cart = wx.getStorageSync('cart') || [];
  
        // 深度克隆购物车数组以确保每个商品都是独立的对象
        cart = JSON.parse(JSON.stringify(cart));
  
        const existingItemIndex = cart.findIndex(item => item.id === productId);
  
        if (existingItemIndex !== -1) {
          // 如果商品已存在于购物车中，增加商品数量
          cart[existingItemIndex].quantity++;
        } else {
          // 否则，将商品添加到购物车
          cart.push(cartItem);
        }
  
        wx.setStorageSync('cart', cart);
        wx.showToast({
          title: '已添加到购物车',
          icon: 'success',
        });
  
        // 调用云函数或其他逻辑将商品添加到购物车和数据库
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
          },
        });
      },
      fail: error => {
        console.error('获取商品详细信息失败：', error);
        // 在失败情况下可以添加适当的用户提示或错误处理逻辑
      },
    });
  },
  
});
