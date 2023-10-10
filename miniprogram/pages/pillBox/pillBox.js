Page({
  data: {
    name: "",
    image3: "",
    image1: "",
    image2: "",
    price: " ",
  },

  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  inputPrice: function (e) {
    this.setData({
      price: e.detail.value
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

  inputImage3: function (e) {
    this.setData({
      image3: e.detail.value
    });
  },



  uploadToDatabase: function () {

    // 初始化云开发
    wx.cloud.init({
      env: 'cloud1-4gu3ydprf906aaba', // 小程序环境 ID
    });
    const priceAsNumber = parseInt(this.data.price);
    // 上传数据到云数据库
    wx.cloud.database().collection('pill').add({
      data: {
        price:priceAsNumber,
        name: this.data.name,
        image3: this.data.image3,
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
