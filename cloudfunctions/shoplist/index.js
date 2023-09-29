// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 获取数据库引用
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    // 查询数据库中的 "shop" 集合，获取所有文档数据
    const result = await db.collection('shop').get();

    // 从查询结果中提取值
    const data = result.data.map(item => ({
      title: item.title,
      up1: item.up1,
      up2:item.up2,
      down:item.down,
      price:item.price,
    }));

    

    return {
      code: 0, // 自定义返回码，可根据需要修改
      data: data, // 返回查询结果中的 "title" 和 "up1" 字段值
    };
  } catch (err) {
    console.error(err);
    return {
      code: -1, // 自定义错误码，可根据需要修改
      errMsg: '云函数执行失败', // 自定义错误消息，可根据需要修改
    };
  }
};