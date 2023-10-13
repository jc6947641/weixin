
  
    /*const db=wx.cloud.database()

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
}

  })*/
  
  const db=wx.cloud.database()

  Page({
    data: {
    imgurl:'',//头像
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
      //上传头像
      upload(){
        console.log("点击上传头像")
        console.log("外部this",this)
        let that=this
        wx.chooseMedia({
          count:1,
          mediaType:["image","video"],
          sourceType:["album","camera"],
          maxDuration:30,
          camera:"back",
          success(res){
            console.log("头像",res.tempFiles[0].tempFilePath)
            //上传云储存空间
            wx.cloud.uploadFile({
              cloudPath:new Date().getTime()+"photo.png",//头像名字
              filePath:res.tempFiles[0].tempFilePath,//文件路径
            }).then(res=>{
              //get resource ID
              console.log("云储存头像路径",res.fileID)
              that.setData({
                imgurl:res.fileID
              })
              console.log("内部this",that)
              console.log("云储存头像路径",that.data.imgurl)
            }).catch(error=>{
              //handle error
            })
          }, 

          
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
              photo:this.data.imgurl,
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
              photo:this.data.imgurl,
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
      imgurl:res.data[0].photo,
      name:res.data[0].name,
      sex:res.data[0].sex,
      age:res.data[0].age,
      tel:res.data[0].tel,
      address:res.data[0].address,
    })
  })


})
}

})