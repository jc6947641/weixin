// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();  
// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event;

  try {
    const db = cloud.database();
    const collection = db.collection('news');

    const res = await collection.doc(id).get();
    return res.data;
  } catch (error) {
    console.error('获取新闻详情失败', error);
    throw error;
  }
}