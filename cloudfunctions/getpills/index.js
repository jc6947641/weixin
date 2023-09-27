// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 获取数据库引用
const db = cloud.database()
const collection = db.collection('pill') // 使用正确的集合名称

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 从数据库中获取数据
    const result = await collection.get()

    // 返回获取到的数据
    return {
      code: 0,
      data: result.data
    }
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      message: '获取数据失败'
    }
  }
}