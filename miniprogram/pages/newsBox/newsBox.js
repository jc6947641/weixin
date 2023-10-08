Page({
  data: {
    title: "",
    auther: "",
    date: "",
    hits: "",
    content: "",
    imagesurl:"",
    image1:"",
    image2:""
  },

  // 用户输入标题
  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    });
  },

  // 用户输入作者
  inputAuther: function (e) {
    this.setData({
      auther: e.detail.value
    });
  },

  // 用户输入日期
  inputDate: function (e) {
    this.setData({
      date: e.detail.value
    });
  },

  // 用户输入点击量
  inputHits: function (e) {
    this.setData({
      hits: e.detail.value
    });
  },

  // 用户输入内容
  inputContent: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  inputImagesUrl: function (e) {
    this.setData({
      imagesurl: e.detail.value
    });
  },
  inputImage1: function (e) {
    this.setData({
      image1: e.detail.value
    });
  },
  inputImage2: function (e) {
    this.setData({
      image2: e.detail.value
    });
  },


  uploadToDatabase: function () {
    // 初始化云开发
    wx.cloud.init({
      env: 'cloud1-4gu3ydprf906aaba', // 小程序环境 ID
    });
  
    // 将 hits 字段转换为数字
    const hitsAsNumber = parseInt(this.data.hits);
  
    // 上传数据到云数据库
    wx.cloud.database().collection('news').add({
      data: {
        title: this.data.title,
        auther: this.data.auther,
        date: this.data.date,
        hits: hitsAsNumber, // 将 hits 转换为数字
        content: this.data.content,
        imagesurl: this.data.imagesurl,
        image1: this.data.image1,
        image2: this.data.image2
      },
      success: function (res) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (err) {
        console.error('上传失败', err);
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
  
});
