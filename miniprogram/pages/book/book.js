Page({
  data: {
    bloodTypes: ['A', 'B', 'AB', 'O'],
    bloodTypeIndex: 0
  },

  bindBloodTypeChange: function(e) {
    this.setData({
      bloodTypeIndex: e.detail.value
    })
  },

  submitForm: function(e) {
    const formData = e.detail.value;
    console.log('表单数据：', formData);
    // 在这里可以将表单数据提交到服务器或进行其他处理
  }
})
