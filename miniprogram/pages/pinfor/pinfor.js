const db=wx.cloud.database()
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

  //存储
  save(){
    console.log("保存")
    let openid=wx.getStorageSync("openid")
    db.collection("userlist").add({
      data:{
        openid:openid,
        name:this.data.name,
        sex:this.data.sex,
        birthday:this.data.birthday,
        tel:this.data.tel,
        address:this.data.address,
      }
    }).then(res=>{
      wx.showToast({
        title: '信息已保存成功',
      })
    })
  },




  })