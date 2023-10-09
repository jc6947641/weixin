  Page({
    data: {
      cartItems: [],     // 存储购物车中的商品项
      isAllSelected: false, // 是否全选
      MaxPrice: 0,
      MaxNum: 0,
      selectedItems: [],
    },
    onLoad: function () {
      // 在页面加载时调用云函数获取购物车内容
      this.getCartItems();
    },
  
    getCartItems: function () {
      const userId = wx.getStorageSync('userId');
      wx.cloud.callFunction({
        name: 'getCartItems',
        data: {
          userId: userId,
        },
        success: res => {
          if (res.result.success) {
            // 初始化购物车项的选中状态
            const cartItems = res.result.cartItems.map(item => {
              item.selected = true; // 初始状态为全选
              item.productId = item._id; // 设置 productId 为购物车项的 _id
              return item;
            });
    
            // 设置全选状态为 true，仅当购物车中有商品时
            const isAllSelected = cartItems.length > 0;
    
            // 更新页面数据并计算总计和结算金额
            this.setData({
              cartItems: cartItems,
              isAllSelected: isAllSelected,
            });
  
            // 计算并更新总计和结算金额
            this.updateTotalAmount();
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
  
  // 增加数量按钮的点击事件处理函数
  // 增加数量按钮的点击事件处理函数
  increaseQuantity: function (event) {
    const index = event.currentTarget.dataset.index; // 获取商品项在数组中的索引
    let cartItems = this.data.cartItems;

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

      // 更新总计和结算金额（只计算被勾选的商品）
      this.updateTotalAmount();

      // 调用云函数来更新购物车项到数据库
      this.updateCartItem(cartItems[index]);
    }
  },


  // 减少数量按钮的点击事件处理函数
  decreaseQuantity: function (event) {
    const index = event.currentTarget.dataset.index; // 获取商品项在数组中的索引
    let cartItems = this.data.cartItems;

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

        // 更新总计和结算金额（只计算被勾选的商品）
        this.updateTotalAmount();

        // 调用云函数来更新购物车项到数据库
        this.updateCartItem(cartItems[index]);
      }
    }
  },

  // 更新购物车项到数据库的函数
  updateCartItem: function (cartItem) {
    wx.cloud.callFunction({
      name: 'updateCartItem',
      data: {
        _id: cartItem._id, // 购物车项的唯一标识
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
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
  },

  // 更新总计和结算金额的函数
  updateTotalAmount: function () {
    const cartItems = this.data.cartItems;
    let MaxPrice = 0;
    let MaxNum = 0;

    cartItems.forEach(v => {
      // 确保 v 中的 totalPrice 和 quantity 存在且有效，同时商品处于被勾选状态
      if (v.totalPrice && v.quantity && v.selected) {
        MaxPrice += v.totalPrice;
        MaxNum += v.quantity;
      }
    });

    this.setData({
      MaxPrice,
      MaxNum
    });
  },

  // 更新总计和结算金额的函数
  toggleCartItem: function (e) {
    const _id = e.currentTarget.dataset.id;
    let { cartItems } = this.data;
    let index = cartItems.findIndex(v => v._id === _id);
    cartItems[index].selected = !cartItems[index].selected;
    this.setData({
      cartItems
    });

    // 更新购物车项到数据库
    this.updateCartItem(cartItems[index]);

    // 计算被选中的商品的总价和数量
    this.updateTotalAmount();

    // 检查购物车中是否有未勾选的商品
    const hasUnselectedItem = cartItems.some(item => !item.selected);

    this.setData({
      isAllSelected: !hasUnselectedItem // 更新全选框状态
    });
  },

  deleteCartItem: function (event) {
  const index = event.currentTarget.dataset.index;
  let cartItems = this.data.cartItems;

  // 检查索引是否有效
  if (typeof index !== 'undefined' && index >= 0 && index < cartItems.length) {
    // 获取要删除的购物车项的 _id
    const cartItemId = cartItems[index]._id;

    // 显示加载中提示
    wx.showLoading({
      title: '删除中...',
      mask: true, // 遮罩层，防止用户点击其他操作
    });

    // 调用云函数删除购物车项
    wx.cloud.callFunction({
      name: 'deleteCartItem',
      data: {
        cartItemId: cartItemId,
      },
      success: res => {
        if (res.result.success) {
          // 从页面的购物车项列表中移除已删除的购物车项
          cartItems.splice(index, 1);

          // 手动计算总计金额和结算个数，只计算已勾选的商品
          let MaxPrice = 0;
          let MaxNum = 0;

          cartItems.forEach(v => {
            if (v.selected) {
              MaxPrice += v.totalPrice;
              MaxNum += v.quantity;
            }
          });

          // 更新总计金额和结算个数
          this.setData({
            cartItems: cartItems,
            MaxPrice: MaxPrice,
            MaxNum: MaxNum,
          });

          // 如果购物车为空，则取消全选
          if (cartItems.length === 0) {
            this.setData({
              isAllSelected: false,
            });
          }

          // 更新 storage 中的购物车数据，只保留没有被删除的商品项
          wx.setStorageSync('cart', cartItems);

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
      complete: () => {
        // 隐藏加载中提示，无论成功或失败都需要执行
        wx.hideLoading();
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

  onShow: function () {
    this.getCartItems();
    const cartItems = wx.getStorageSync('cart') || [];
    let MaxPrice = 0;
    let MaxNum = 0;

    cartItems.forEach(v => {
      // 确保 v 中的 totalPrice 和 quantity 存在且有效
      if (v.totalPrice && v.quantity) { 
        v.selected = 'true';
        MaxPrice += v.totalPrice;
        MaxNum += v.quantity;
      }
    });


    // 更新页面数据，使用 cartItems
    this.setData({
      cartItems: cartItems,
      MaxPrice: MaxPrice,
      MaxNum: MaxNum,
    });

    // 如果购物车为空，则取消全选
    if (cartItems.length === 0) {
      this.setData({
        isAllSelected: false,
      });
    }
  },


  selectAllItems: function () {
  let { cartItems, isAllSelected } = this.data;
  const newIsAllSelected = !isAllSelected;

  // 更新每个商品的选中状态
  const updatedCartItems = cartItems.map(item => {
    item.selected = newIsAllSelected;
    return item;
  });

  this.setData({
    cartItems: updatedCartItems,
    isAllSelected: newIsAllSelected,
  });

  wx.setStorageSync('cart', updatedCartItems);

  // 计算总计金额和结算个数
  let selectedMaxPrice = 0;
  let selectedMaxNum = 0;

  updatedCartItems.forEach(item => {
    if (item.selected) {
      selectedMaxPrice += item.totalPrice;
      selectedMaxNum += item.quantity;
    }
  });

  // 更新总计金额和结算个数
  this.setData({
    MaxPrice: selectedMaxPrice,
    MaxNum: selectedMaxNum
  });
  },


  toggleCartItem: function (e) {
    const _id = e.currentTarget.dataset.id;
    let { cartItems } = this.data;
    let index = cartItems.findIndex(v => v._id === _id);
    cartItems[index].selected = !cartItems[index].selected;
    this.setData({
      cartItems
    });
    wx.setStorageSync('cart', cartItems);

    // 计算被选中的商品的总价和数量
    let selectedMaxPrice = 0;
    let selectedMaxNum = 0;

    cartItems.forEach(item => {
      if (item.selected) {
        selectedMaxPrice += item.totalPrice;
        selectedMaxNum += item.quantity;
      }
    });

    // 更新总计金额和结算个数
    this.setData({
      MaxPrice: selectedMaxPrice,
      MaxNum: selectedMaxNum
    });

    // 检查购物车中是否有未勾选的商品
    const hasUnselectedItem = cartItems.some(item => !item.selected);

    this.setData({
      isAllSelected: !hasUnselectedItem // 更新全选框状态
    });
  },
  gotoProductDetail(event) {
    const selectedItemIndex = event.currentTarget.dataset.index; // 使用 data-index 属性获取索引
    const selectedItem = this.data.cartItems[selectedItemIndex]; // 根据索引获取选中的商品

    // 获取购物车项中的 detailPagePath 字段
    const detailPagePath = selectedItem.detailPagePath;

    // 将商品的 _id 参数添加到 URL
    const url = `${detailPagePath}?id=${selectedItem.id}&fromCart=true`; // 在 URL 中添加标志参数

    // 跳转到详情页，并传递标志参数
    wx.navigateTo({
      url: url,
      success: (res) => {
        console.log('成功跳转到商品详情页');
      },
      fail: (error) => {
        console.error('跳转到商品详情页失败：', error);
      },
    });
  },

  });
