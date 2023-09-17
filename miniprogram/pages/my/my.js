// pages/my/my.js

Page({
  data:{
    userInfo:''
  },
  onLoad(){
    let user=wx.setStorageSync('user')
    console.log('进入小程序的index页面获取缓存',user)
    this.setData({
      userInfo:user
    })
  },


//授权登录
  login(){
    wx.getUserProfile({
      desc: '必须授权才可以继续使用',
      success: res=> {
        let user=res.userInfo
        //
        wx.setStorageSync('user', user)//缓存
        console.log("用户信息",user)
        this.setData({
          userInfo:user
        })
      },
      fail: res=> {
        console.log('授权失败',res)
      }
    })
  },
//退出登录
  loginOut(){
    this.setData({
      userInfo:''
    })
    wx.setStorageSync('user', null)
  }
})


