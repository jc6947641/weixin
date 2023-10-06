// deleteCartItem.js

const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();
const cartCollection = db.collection('cart');

exports.main = async (event, context) => {
  try {
    const { cartItemId } = event;

    // 删除购物车项记录
    const result = await cartCollection.doc(cartItemId).remove();

    if (result.stats.removed > 0) {
      return {
        success: true,
        message: '删除成功',
      };
    } else {
      return {
        success: false,
        message: '删除失败',
      };
    }
  } catch (error) {
    console.error('删除购物车项失败：', error);
    return {
      success: false,
      message: '删除失败',
    };
  }
};
