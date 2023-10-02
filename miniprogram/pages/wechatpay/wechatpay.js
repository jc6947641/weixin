Page({
  onLoad(options) {
    const price = options.price;
    const title = options.title;
    const up1 = options.up1;
    this.setData({
      goods: {
        name: title,
        cover: up1,
        price: price
      }
    })
  },
  onPay() {
    const price = this.data.goods.price;
    // 调用微信支付接口
    wx.requestPayment({
      nonceStr: '随机字符串',
      package: '统一下单接口返回的 prepay_id',
      paySign: '签名',
      timeStamp: '时间戳',
      success(res) {
        // 支付成功，跳转到订单页面
        wx.navigateTo({
          url: '/pages/order/index'
        })
      },
      fail(res) {
        // 支付失败，提示用户
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        })
      }
    })
  }
})


