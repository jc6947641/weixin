// pages/personinfo/personinfo.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    nickName : "",
    avatarUrl : "",
    gender : "",
    province : "",
    city : "",
    country : ""
  },
 
  showUserInfoTap:function(){
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        
        var userInfo = res.userInfo
        console.log(userInfo);
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender  //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        if(gender==1){
          gender = '男'
        }else if(gender==2){
          gender='女'
        }else{
          gender = '未知'
        }
        that.setData({
          nickName : nickName,
          avatarUrl : avatarUrl,
          gender : gender,
          country : country,
          province : province
        })
      }
    })
  }
})