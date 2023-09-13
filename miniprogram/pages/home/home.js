// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 创建一个轮播图的数组,存放轮播图数据的列表
    swiperList:[],
    //存放九宫格数据的列表
    gridList:[],
 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    /*轮播图获取*/
    this.getSwiperList()
    

  },


  //获取轮播图数据的方法函数 
  getSwiperList(){
    wx.request({
      url: 'file:///D:/Liiin/html_project/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230907180142.jpg',
      method:'GET',
      success:(res) =>{
        console.log(res)

        this.setData({
          swiperList:res.data
        })
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})