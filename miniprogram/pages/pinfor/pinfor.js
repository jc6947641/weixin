

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

 
  //旧的
  /*Page({
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
    })*/
  
    const db=wx.cloud.database()

    Page({
      data: {
      name: '', // 姓名
      sex: '', // 性别
      age: '', // 年龄
      tel: '', // 电话
      address: '', // 地址
      person: '' // 当前用户
      },
        //添加姓名
        name(e) {
          console.log("获取姓名",e.detail.value)
        this.setData({
          name: e.detail.value
        })
        },
        // 添加性别
        sex(e) {
          console.log("获取性别",e.detail.value)
        this.setData({
          sex: e.detail.value
        })
        },
        // 添加年龄
        age(e) {
          console.log("获取年龄",e.detail.value)
        this.setData({
          age: e.detail.value
        })
        },
        // 添加电话
        tel(e) {
          console.log("获取电话",e.detail.value)
        this.setData({
          tel: e.detail.value
        })
        },
        // 添加地址
        address(e) {
          console.log("获取地址",e.detail.value)
        this.setData({
          address: e.detail.value
        })
        },

        //确定并存储
        save(){
//用户不存在
          if(this.data.person==0){
            console.log("确定并保存")
            let openid=wx.getStorageSync('openid')
            db.collection("userlist").add({
              data:{
                openid:openid,
                name:this.data.name,
                sex:this.data.sex,
                age:this.data.age,
                tel:this.data.tel,
                address:this.data.address
              }
            }).then(res=>(
              wx.showToast({
                title: '信息已经保存成功',
              })
            ))

          }else{
//用户存在
            let openid=wx.getStorageSync("openid")
            db.collection("userlist").where({
              openid:openid
            }).update({
              data:{
                openid:openid,
                name:this.data.name,
                sex:this.data.sex,
                age:this.data.age,
                tel:this.data.tel,
                address:this.data.address
              }
            }).then(res=>(
              wx.showToast({
                title: '更新成功',
              })
            ))
          }

        },

//显示数据
onLoad(options){
  wx.cloud.callFunction({
    name:"loginopenid"
  }).then(res=>{
    console.log("获取到的当前用户openid",res.result.openid)
    wx.setStorageSync('openid', res.result.openid)
    //查询已有数据 openid
    db.collection("userlist").where({
      openid:res.result.openid
    }).get().then(res=>{
      console.log("获取的用户信息",res.data)
      console.log("用户是否存在",res.data.length)
      this.setData({
        person:res.data.length,
        name:res.data[0].name,
        sex:res.data[0].sex,
        age:res.data[0].age,
        tel:res.data[0].tel,
        address:res.data[0].address,
      })
    })


  })
},
//刷新
/*onShow(){
  wx.cloud.callFunction({
    name:"loginopenid"
  }).then(res=>{
    console.log("获取到的当前用户openid",res.result.openid)
    wx.setStorageSync('openid', res.result.openid)
    //查询已有数据 openid
    db.collection("userlist").where({
      openid:res.result.openid
    }).get().then(res=>{
      console.log("获取的用户信息",res.data)
      this.setData({
        name:res.data[1].name
      })
    })


  })
}*/

    })