// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const pillsCollection = db.collection('shop'); // 假设你的数据库集合名称为 'pill'

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event; // 从参数中获取商品的唯一标识符

  try {
    // 在数据库中根据唯一标识符查询商品详细信息
    const result = await pillsCollection.doc(id).get();

    if (result.data) {
      return {
        code: 0,
        data: result.data,
      };
    } else {
      return {
        code: -1,
        message: '商品不存在',
      };
    }
  } catch (error) {
    console.error('查询商品详情失败：', error);
    return {
      code: -1,
      message: '查询商品详情失败',
    };
  }
};
