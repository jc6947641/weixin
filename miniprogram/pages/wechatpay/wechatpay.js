Page({
  data:{
    title:'',
    price:'',
    up1:''
  },

  onLoad:function(options) {
    console.log(options)

    this.setData({
      title:options.title,
      up1:options.up1,
      price:options.price
    })
  },

  onPay() {
    // 支付逻辑，成功后跳转到 paySuccess 页面
    wx.navigateTo({
      url: '/pages/paySuccess/paySuccess'
    })
  }
})



