const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const cartCollection = db.collection('cart'); // 替换为您的购物车集合名称

exports.main = async (event, context) => {
  try {
    const { id, name, price, userId, image1 } = event;

    // 在购物车中查找是否已存在相同的商品
    const existingItem = await cartCollection
      .where({
        userId: userId,
        id: id,
      })
      .get();

    if (existingItem.data.length > 0) {
      // 如果已存在相同商品，更新数量和总价
      const cartItemId = existingItem.data[0]._id;
      await cartCollection.doc(cartItemId).update({
        data: {
          quantity: existingItem.data[0].quantity + 1,
          totalPrice: existingItem.data[0].totalPrice + price,
        },
      });
    } else {
      // 否则，将商品添加到购物车，数量为1
      await cartCollection.add({
        data: {
          id: id,
          name: name,
          price: price,
          quantity: 1,
          userId: userId,
          image1: image1,
          totalPrice: price,
        },
      });
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
