Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    currentPage: 0, // 当前页码
    pageSize: 5,    // 每页显示的数据条数
    totalData: [],
    shouldRefresh: true,   // 存储所有数据的数组
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

      if (page === 0) {
        // 下拉刷新，重置数据列表
        let newData = res.result.data;
        const firstFiveItems = newData.slice(0, this.data.pageSize);
        newData = [...newData.slice(this.data.pageSize), ...firstFiveItems]; // Move the first 5 items to the end
        this.setData({
          totalData: newData,
          dataList: newData.slice(0, this.data.pageSize),
          currentPage: 0,
        });
      } else {
        // 上拉加载更多，追加数据
        const startIdx = page * this.data.pageSize;
        const endIdx = startIdx + this.data.pageSize;
        this.setData({
          dataList: this.data.totalData.slice(0, endIdx),
          currentPage: page,
        });
      }

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
    this.getData(10000000000000, 0, true); // 调用获取数据函数并要求随机顺序
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    var page = this.data.currentPage + 1; // 计算下一页的页码
    this.getData(this.data.pageSize, page, false); // 请求普通顺序的数据
  },

  // 点击将阅读数增加
  clickRow(res) {
    // 获取点击的 id 和索引值
    // 云函数更新操作
    const newsId = res.currentTarget.dataset.id; // 获取新闻的唯一标识符
    const index = res.currentTarget.dataset.idx; // 获取点击项的索引

    // 使用 wx.navigateTo 跳转到新闻详情页面，并传递参数
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + newsId + '&index=' + index,
    });

    var { id, idx } = res.currentTarget.dataset
    wx.cloud.callFunction({
      name: "uphits",
      data: {
        id: id
      }
    }).then(res => {
      var rowData = this.data.dataList
      rowData[idx].hits += 1;
      this.setData({
        dataList: rowData
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },
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
  onShareAppMessage() { },
});
