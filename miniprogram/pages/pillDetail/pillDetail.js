// pillDetail.js

Page({
  data: {
    pillDetail: {}, // 存储详情页数据
    productId: null, // 存储从 options 中获取的 id
  },

  onLoad: function (options) {
    console.log(options);
    // 直接从 options 中获取传递的 id 并存储到 data 中
    const { id } = options;
    this.setData({
      productId: id
    });

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
  addToCart: function () {
    const { productId } = this.data; // 直接使用从 options 中获取的 productId
    const userId = wx.getStorageSync('userId');
    let cartItem = {
      id: productId,
      quantity: 1,
      userId,
      price: 0,
      totalPrice: 0,
      detailPagePath: '', // 新增详情页路径字段
    }; // 初始化 price 和 totalPrice
  
    wx.showLoading({
      title: '加载中...',
    });
  
    // 调用云函数获取商品详细信息，包括 name, price, 和 image1
    wx.cloud.callFunction({
      name: 'getpillsDetail',
      data: {
        id: productId,
      },
      // 获取商品详细信息成功后
      success: res => {
        wx.hideLoading();
        const { name, price, image1 } = res.result.data; // 获取商品详细信息
        cartItem.name = name; // 将商品名称添加到购物车项目
        cartItem.price = price; // 将商品价格添加到购物车项目
        cartItem.image1 = image1; // 将商品图片添加到购物车项目
        cartItem.totalPrice = price; // 设置totalPrice等于price
  
        // 设置商品详情页路径
        cartItem.detailPagePath = `/pages/pillDetail/pillDetail`; // 请替换为你的详情页路径
  
        let cart = wx.getStorageSync('cart') || [];
  
        // 深度克隆购物车数组以确保每个商品都是独立的对象
        cart = JSON.parse(JSON.stringify(cart));
  
        const existingItemIndex = cart.findIndex(item => item.id === productId);
  
        if (existingItemIndex !== -1) {
          // 如果商品已存在于购物车中，增加商品数量
          cart[existingItemIndex].quantity++;
          // 更新购物车中的商品总价
          cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * price; // 使用最新的商品价格计算总价
  
          // 更新 cartItem，克隆 cart[existingItemIndex] 的值
          cartItem = { ...cart[existingItemIndex] };
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
  
            // 在成功将商品添加到数据库后，也将 cartItem 的值传递给数据库存储
            // 请确保云函数中的 addToCart 能够接收并存储 detailPagePath 字段
          },
          fail: error => {
            wx.hideLoading();
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
