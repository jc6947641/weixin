// 云函数 updateCartItem
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();
const cartCollection = db.collection('cart');

exports.main = async (event, context) => {
  const { id, quantity, totalPrice } = event;

  try {
    // 更新购物车项的数量和总价
    await cartCollection.doc(id).update({
      data: {
        quantity: quantity,
        totalPrice: totalPrice,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('更新购物车项失败：', error);
    return {
      success: false,
      error: error,
    };
  }
};
