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
  
})
wx.navigateTo({
  url: '/pages/paySuccess/paySuccess'
  })


