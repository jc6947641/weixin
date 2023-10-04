Page({
  data: {
    cartItems: [], // 存储购物车中的商品项
    isAllSelected: false, // 是否全选
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
          // 初始化购物车项的选中状态
          const cartItems = res.result.cartItems.map(item => {
            item.selected = false; // 初始状态为未选中
            return item;
          });

          this.setData({
            cartItems: cartItems, // 将云函数返回的购物车内容存储在页面数据中
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

  // 全选按钮的点击事件处理函数
  selectAllItems: function () {
    const cartItems = this.data.cartItems;
    const isAllSelected = this.data.isAllSelected;

    // 遍历购物车中的商品项，更新选中状态
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].selected = !isAllSelected;
    }

    this.setData({
      cartItems: cartItems,
      isAllSelected: !isAllSelected,
    });
  },
});
