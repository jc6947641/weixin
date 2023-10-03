// 云函数 addToCart

const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const cartCollection = db.collection('cart'); // 替换为您的购物车集合名称

exports.main = async (event, context) => {
  try {
    const { id, name, price, quantity, userId, image1 } = event;

    // 在购物车中查找是否已存在相同的商品
    const existingItem = await cartCollection
      .where({
        userId: userId,
        id: id,
      })
      .get();

    if (existingItem.data.length > 0) {
      // 如果已存在相同商品，则更新数量
      const cartItemId = existingItem.data[0]._id;
      await cartCollection.doc(cartItemId).update({
        data: {
          quantity: existingItem.data[0].quantity + quantity,
        },
      });
    } else {
      // 否则，将商品添加到购物车
      const result = await cartCollection.add({
        data: {
          id: id,
          name: name,
          price: price,
          quantity: quantity,
          userId: userId,
          image1: image1,
        },
      });

      // 获取刚添加的购物车商品信息
      const addedCartItem = await cartCollection.doc(result._id).get();

      return {
        success: true,
        message: '已成功添加到购物车',
        cartItem: addedCartItem.data, // 返回添加的购物车商品信息
      };
    }

    return {
      success: true,
      message: '已成功添加到购物车',
    };
  } catch (error) {
    console.error('添加到购物车失败：', error);
    return {
      success: false,
      message: '添加到购物车失败',
      error: error,
    };
  }
};
