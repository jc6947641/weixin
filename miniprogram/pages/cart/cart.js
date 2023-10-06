Page({
  data: {
    cartItems: [],     // 存储购物车中的商品项
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
// 增加数量按钮的点击事件处理函数
increaseQuantity: function (event) {
  const index = event.currentTarget.dataset.index; // 获取商品项在数组中的索引
  const cartItems = this.data.cartItems;

  // 确保购物车中存在相关的商品项
  if (cartItems[index]) {
    // 增加商品数量
    cartItems[index].quantity += 1;
    
    // 增加商品价格（假设价格是 item.price）
    cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;

    // 更新数据
    this.setData({
      cartItems: cartItems,
    });

    // 调用云函数来更新购物车项到数据库
    wx.cloud.callFunction({
      name: 'updateCartItem',
      data: {
        _id: cartItems[index]._id, // 购物车项的唯一标识
        quantity: cartItems[index].quantity,
        totalPrice: cartItems[index].totalPrice,
      },
      success: res => {
        if (res.result.success) {
          console.log('购物车项更新成功');
        } else {
          console.error('购物车项更新失败：', res.result.error);
        }
      },
      fail: error => {
        console.error('调用云函数更新购物车项失败：', error);
      },
    });
  }
},
// 减少数量按钮的点击事件处理函数
decreaseQuantity: function (event) {
  const index = event.currentTarget.dataset.index; // 获取商品项在数组中的索引
  const cartItems = this.data.cartItems;

  // 确保购物车中存在相关的商品项
  if (cartItems[index]) {
    // 减少商品数量，但要确保不小于1
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;

      // 减少商品价格（假设价格是 item.price）
      cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;

      // 更新数据
      this.setData({
        cartItems: cartItems,
      });

      // 调用云函数来更新购物车项到数据库
      wx.cloud.callFunction({
        name: 'updateCartItem',
        data: {
          _id: cartItems[index]._id, // 购物车项的唯一标识
          quantity: cartItems[index].quantity,
          totalPrice: cartItems[index].totalPrice,
        },
        success: res => {
          if (res.result.success) {
            console.log('购物车项更新成功');
          } else {
            console.error('购物车项更新失败：', res.result.error);
          }
        },
        fail: error => {
          console.error('调用云函数更新购物车项失败：', error);
        },
      });
    }
  }
},
deleteCartItem: function (event) {
  const index = event.currentTarget.dataset.index;
  const cartItems = this.data.cartItems;

  // 检查索引是否有效
  if (typeof index !== 'undefined' && index >= 0 && index < cartItems.length) {
    // 获取要删除的购物车项的 _id
    const cartItemId = cartItems[index]._id;

    // 调用云函数删除购物车项
    wx.cloud.callFunction({
      name: 'deleteCartItem', // 替换成你的云函数名称
      data: {
        cartItemId: cartItemId, // 传递要删除的购物车项的 _id
      },
      success: res => {
        if (res.result.success) {
          // 从页面的购物车项列表中移除已删除的购物车项
          cartItems.splice(index, 1);

          this.setData({
            cartItems: cartItems,
          });

          // 清空对应的 storage
          wx.removeStorageSync('cart');

          wx.showToast({
            title: '删除成功',
            icon: 'success',
          });
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
          });
        }
      },
      fail: error => {
        console.error('删除购物车项失败：', error);
        wx.showToast({
          title: '删除失败',
          icon: 'none',
        });
      },
    });
  } else {
    // 如果索引无效，显示错误信息
    console.error('无效的索引:', index);
    wx.showToast({
      title: '删除失败，无效的索引',
      icon: 'none',
    });
  }
},

});
