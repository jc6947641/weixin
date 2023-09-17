// pages/cate/cate.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },


  getData(num = 5,page = 0){
    wx.cloud.callFunction({
      name:"getnews",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      var oldData = this.data.dataList
      var newData = oldData.concat(res.result.data);
      this.setData({
        dataList:newData
      })
    })
  },

  //点击将阅读数增加
  clickRow(res){
    //获取点击的id和索引值 
    //云函数更新操作
    const newsId = res.currentTarget.dataset.id; // 获取新闻的唯一标识符
    const index = res.currentTarget.dataset.idx; // 获取点击项的索引

    // 使用 wx.navigateTo 跳转到新闻详情页面，并传递参数
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + newsId + '&index=' + index,
    });
    wx.showLoading({
      title: '数据加载中...',
    })

    var {id,idx} = res.currentTarget.dataset
    wx.cloud.callFunction({
      name:"uphits",
      data:{
        id:id
      }
    }).then(res=>{
      var rowData = this.data.dataList
      rowData[idx].hits += 1;
      this.setData({  
        dataList:rowData  
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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
    var page=this.data.dataList.length
    this.getData(5,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
