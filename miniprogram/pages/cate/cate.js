// pages/cate/cate.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
  },

  // 获取数据函数
  getData(num = 5, page = 0, isRandomOrder = false) {
    wx.cloud.callFunction({
      name: "getnews",
      data: {
        num: num,
        page: page,
      },
    }).then((res) => {
      var newData = res.result.data;

      if (isRandomOrder) {
        // 随机打乱新数据的顺序
        newData = this.shuffleArray(newData);
      }

      this.setData({
        dataList: isRandomOrder ? newData : this.data.dataList.concat(newData),
      });

      if (isRandomOrder) {
        wx.stopPullDownRefresh(); // 停止下拉刷新
      }
    });
  },

  // 随机打乱数组的函数
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // 下拉刷新事件
  onPullDownRefresh() {
    this.getData(1000000000, 0, true); // 调用获取数据函数并要求随机顺序
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    var page = this.data.dataList.length // 计算下一页的页码
    this.getData(5, page);
  },

  // 点击将阅读数增加
  clickRow(res) {
    // ...（你的点击事件处理逻辑）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData(); // 初始加载数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
