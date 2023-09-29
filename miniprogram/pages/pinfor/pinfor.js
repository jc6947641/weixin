/*const db=wx.cloud.database()
Page({
  //存储
  data:{
    name:'',
    sex:'',
    birthday:'',
    tel:'',
    address:''
  },

  name(e){
    console.log("获取姓名",e.detail.value)
    this.setData({
      name:e.detail.value
    })
  },

  sex(e){
    console.log("获取性别",e.detail.value)
    this.setData({
      sex:e.detail.value
    })
  },

  birthday(e){
    console.log("获取生日",e.detail.value)
    this.setData({
      birthday:e.detail.value
    })
  },

  tel(e){
    console.log("获取电话",e.detail.value)
    this.setData({
      tel:e.detail.value
    })
  },

  address(e){
    console.log("获取地址",e.detail.value)
    this.setData({
      address:e.detail.value
    })
  },

  //修改
  save(){
    console.log("保存")
    let openid=wx.getStorageSync("openid")
    db.collection("userlist").where({
      openid: openid
    }).update({
      data:{
        name:this.data.name,
        sex:this.data.sex,
        birthday:this.data.birthday,
        tel:this.data.tel,
        address:this.data.address,
      }
    }).then(res=>{
      wx.showToast({
        title: '信息已修改成功',
      })
    })
  },
  
//存储
  onLoad: function () {
    let openid = wx.getStorageSync("openid")
    db.collection("userlist").where({
      openid: openid
    }).get().then(res => {
      let user = res.data[0]
      this.setData({
        name: user.name,
        sex: user.sex,
        birthday: user.birthday,
        tel: user.tel,
        address: user.address
      })
    })
  }
  



  })*/

  // pages/userinfo/userinfo.js
  
const db = wx.cloud.database()

Page({
  data: {
    name: '',
    sex: '',
    birthday: '',
    tel: '',
    address: ''
  },

  onLoad: function () {
    // 获取用户信息
    this.getUserInfo()
  },

  getUserInfo() {
    let openid = wx.getStorageSync("openid")
    db.collection("userlist").where({
      openid: openid
    }).get().then(res => {
      let user = res.data[0]
      if (user) {
        this.setData({
          name: user.name,
          sex: user.sex,
          birthday: user.birthday,
          tel: user.tel,
          address: user.address
        })
      }
    })
  },

  save() {
    // 保存用户信息
    if (this.checkInput()) {
      let openid = wx.getStorageSync("openid")
      let userInfo = {
        name: this.data.name,
        sex: this.data.sex,
        birthday: this.data.birthday,
        tel: this.data.tel,
        address: this.data.address
      }
      db.collection("userlist").where({
        openid: openid
      }).update({
        data: userInfo
      }).then(res => {
        wx.showToast({
          title: '信息已保存成功',
        })
      })
    }
  },

  checkInput() {
    // 校验用户输入的信息
    let telReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (!this.data.sex) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      })
      return false
    } else if (!this.data.birthday) {
      wx.showToast({
        title: '请选择生日',
        icon: 'none'
      })
      return false
    } else if (!this.data.tel || !telReg.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: 'none'
      })
      return false
    } else if (!this.data.address) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return false
    }
    return true
  },

  name(e) {
    this.setData({
      name: e.detail.value
    })
  },

  sex(e) {
    this.setData({
      sex: e.detail.value
    })
  },

  birthday(e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  tel(e) {
    this.setData({
      tel: e.detail.value
    })
  },

  address(e) {
    this.setData({
      address: e.detail.value
    })
  }
})
