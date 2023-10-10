// pages/paySuccess/paySuccess.js
Page({
  onsuccess() {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  }
  

})