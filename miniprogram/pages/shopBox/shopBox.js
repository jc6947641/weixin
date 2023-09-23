Page({
  data: {
    title: "",
    down: "",
    up1: "",
    up2: ""
  },

  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    });
  },

  inputUp1: function (e) {
    this.setData({
      up1: e.detail.value
    });
  },

  inputUp2: function (e) {
    this.setData({
      up2: e.detail.value
    });
  },

  inputDown: function (e) {
    this.setData({
      down: e.detail.value
    });
  },

  uploadToDatabase: function () {
    // 初始化云开发
    wx.cloud.init({
      env: 'cloud1-4gu3ydprf906aaba', // 小程序环境 ID
    });

    // 上传数据到云数据库
    wx.cloud.database().collection('shop').add({
      data: {
        title: this.data.title,
        down: this.data.down,
        up1: this.data.up1,
        up2: this.data.up2
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
