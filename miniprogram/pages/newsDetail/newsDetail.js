// pages/newsDetail/newsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetail: {},
    formattedContent: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const newsId = options.id; // 从页面参数中获取新闻ID
    this.getNewsDetail(newsId);
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

  },
  getNewsDetail: function (newsId) {
    wx.cloud.callFunction({
      name: 'getNewsDetail',
      data: {
        id: newsId,
      },
      success: (res) => {
        const newsDetail = res.result; // 从云函数返回的数据中获取新闻详情

        // 处理文本内容，将其分段为数组并添加两个空格
        const content = newsDetail.content || ''; // 获取新闻内容
        const paragraphs = content.split('\n\n');
        const formattedParagraphs = paragraphs.map(paragraph => `  ${paragraph}`);

        this.setData({
          newsDetail: newsDetail,
          formattedContent: formattedParagraphs, // 存储处理后的内容
        });
      },
      fail: (err) => {
        console.error('获取新闻详情失败', err);
      },
    });
  }
})