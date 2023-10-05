/*const app = getApp()
//数据库初始化
const DB = wx.cloud.database().collection("list")
let name = ""
let age = ""
let sex = ""
let tel = ""
let address = ""
let delId = "" // 将delId变量的初始值设为空

Page({
  
  //获取用户输入的名字
  addName(event){
    name = event.detail.value
  },
  //获取用户输入的年龄
  addAge(event){
    age = event.detail.value
  },
  //性别
  addSex(event) {
    sex= event.detail.value
  },
  //电话
  addTel(event) {
      tel= event.detail.value
  },
  //地址
  addAddress(event) {
      address=event.detail.value
  },

  //添加数据
  addData(){
    DB.add({
      data:{
        name: name,
        age: age,
        sex:sex,
        tel:tel,
        address:address
      },
      success(res){
        console.log("添加成功", res)
      },
      fail(res){
        console.log("添加失败", res)
      }
    })
  },

  //查询数据
  getData(){
    DB.get({
      success(res){
        console.log("查询成功", res)
      },
      fail(res){
        console.log("查询失败", res)
      }
    })
  },

  //获取用户要更新的id
  updateId(event){
    delId = event.detail.value
  },

  //获取用户要更新的名字
  updateName(event){
    name = event.detail.value
  },
  //获取用户要更新的年龄
  updateAge(event){
    age = event.detail.value
  },

  //性别
  updateSex(event) {
    sex= event.detail.value
  },
  //电话
  updateTel(event) {
    tel= event.detail.value
  },
  //地址
  updateAddress(event) {
    address=event.detail.value
  },

  //修改数据
  upData(){
    DB.doc(delId).update({
      data:{
        name: name,
        age: age,
        sex:sex,
        tel:tel,
        address:address
      },
      success(res){
        console.log("修改成功", res)
      },
      fail(res){
        console.log("修改失败", res)
      }
    })
  }

})*/

/*Page({
  data: {
  name: '',
  sex: '',
  age: '',
  tel: '',
  address: '',
  dataList: [],
  curIndex: -1,
  },
  // 添加姓名
  addName(e) {
  this.setData({
  name: e.detail.value
  })
  },
  // 添加性别
  addSex(e) {
  this.setData({
  sex: e.detail.value
  })
  },
  // 添加年龄
  addAge(e) {
  this.setData({
  age: e.detail.value
  })
  },
  // 添加电话
  addTel(e) {
  this.setData({
  tel: e.detail.value
  })
  },
  // 添加地址
  addAddress(e) {
  this.setData({
  address: e.detail.value
  })
  },
  // 点击“确定并保存”按钮，保存数据
  addData() {
  let dataList = wx.getStorageSync('dataList') || []
  let data = {
  name: this.data.name,
  sex: this.data.sex,
  age: this.data.age,
  tel: this.data.tel,
  address: this.data.address
  }
  dataList.push(data)
  wx.setStorageSync('dataList', dataList)
  this.setData({
  name: '',
  sex: '',
  age: '',
  tel: '',
  address: ''
  })
  },
  // 点击“查询”按钮，获取已保存的数据
  getData() {
  let dataList = wx.getStorageSync('dataList') || []
  this.setData({
  dataList: dataList
  })
  },
  // 点击“修改”按钮，根据姓名获取对应的数据
  upData() {
  let dataList = wx.getStorageSync('dataList') || []
  let index = -1
  for (let i = 0; i < dataList.length; i++) {
  if (dataList[i].name == this.data.name) {
  index = i
  break
  }
  }
  if (index >= 0) {
  this.setData({
  curIndex: index,
  sex: dataList[index].sex,
  age: dataList[index].age,
  tel: dataList[index].tel,
  address: dataList[index].address
  })
  } else {
  wx.showToast({
  title: '未找到对应数据',
  icon: 'none'
  })
  }
  },
  // 点击“更新”按钮，更新数据
  updateData() {
    let dataList = wx.getStorageSync('dataList') || []
    if (this.data.curIndex >= 0) {
    dataList[this.data.curIndex].sex = this.data.sex
    dataList[this.data.curIndex].age = this.data.age
    dataList[this.data.curIndex].tel = this.data.tel
    dataList[this.data.curIndex].address = this.data.address
    wx.setStorageSync('dataList', dataList)
    this.setData({
    curIndex: -1,
    sex: '',
    age: '',
    tel: '',
    address: '',
    dataList: dataList
    })
    } else {
    wx.showToast({
    title: '未找到对应数据',
    icon: 'none'
    })
    }
    }
  })*/

 
  
  Page({
    data: {
    dataList: [], // 数据列表
    name: '', // 姓名
    sex: '', // 性别
    age: '', // 年龄
    tel: '', // 电话
    address: '', // 地址
    id: '' // 当前数据id
    },
    // 存储数据
    addData: function () {
    const db = wx.cloud.database() // 获取数据库实例
    const dataList = db.collection('dataList') // 获取集合实例
    dataList.add({
    data: {
    name: this.data.name,
    sex: this.data.sex,
    age: this.data.age,
    tel: this.data.tel,
    address: this.data.address
    },
    success: res => {
    wx.showToast({
    title: '保存成功',
    })
    this.getDataList() // 保存成功后刷新列表展示
    },
    fail: err => {
    wx.showToast({
    title: '保存失败',
    icon: 'none'
    })
    console.error('[数据库] [新增记录] 失败：', err)
    }
    })
    },
    // 修改数据
    upData: function () {
    const db = wx.cloud.database() // 获取数据库实例
    const dataList = db.collection('dataList') // 获取集合实例
    dataList.doc(this.data.id).update({
    data: {
    name: this.data.name,
    sex: this.data.sex,
    age: this.data.age,
    tel: this.data.tel,
    address: this.data.address
    },
    success: res => {
    wx.showToast({
    title: '修改成功',
    })
    this.getDataList() // 修改成功后刷新列表展示
    },
    fail: err => {
    wx.showToast({
    title: '修改失败',
    icon: 'none'
    })
    console.error('[数据库] [修改记录] 失败：', err)
    }
    })
    },
    // 更新数据列表
    getDataList: function () {
    const db = wx.cloud.database() // 获取数据库实例
    const dataList = db.collection('dataList') // 获取集合实例
    dataList.get({
    success: res => {
    this.setData({
    dataList: res.data
    })
    },
    fail: err => {
    console.error('[数据库] [查询记录] 失败：', err)
    }
    })
    },
    // 监听姓名输入框
    addName: function (e) {
    this.setData({
    name: e.detail.value
    })
    },
    // 监听性别输入框
    addSex: function (e) {
    this.setData({
    sex: e.detail.value
    })
    },
    // 监听年龄输入框
    addAge: function (e) {
    this.setData({
    age: e.detail.value
    })
    },
    // 监听电话输入框
    addTel: function (e) {
    this.setData({
    tel: e.detail.value
    })
    },
    // 监听地址输入框
    addAddress: function (e) {
    this.setData({
    address: e.detail.value
    })
    },
    // 监听列表项点击事件
    onItemClick: function (e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    const sex = e.currentTarget.dataset.sex
    const age = e.currentTarget.dataset.age
    const tel = e.currentTarget.dataset.tel
    const address = e.currentTarget.dataset.address
    this.setData({
    id: id,
    name: name,
    sex: sex,
    age: age,
    tel: tel,
    address: address
    })
    },
    onLoad: function () {
    this.getDataList() // 加载页面时获取数据列表
    }
    })
  
  