// 云函数 getCartItems

const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const cartCollection = db.collection('cart'); // 替换为您的购物车集合名称

exports.main = async (event, context) => {
  try {
    const userId = event.userId; // 从传递的参数中获取 userId

    // 查询购物车内容
    const cartItems = await cartCollection
      .where({
        userId: userId,
      })
      .get();

    return {
      success: true,
      message: '获取购物车内容成功',
      cartItems: cartItems.data, // 返回购物车内容数组
    };
  } catch (error) {
    console.error('获取购物车内容失败：', error);
    return {
      success: false,
      message: '获取购物车内容失败',
      error: error,
    };
  }
};
