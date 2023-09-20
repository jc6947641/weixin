// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event;

  try {
    const collection = db.collection('news');
    const res = await collection.doc(id).get();

    // 获取新闻详情中的文本内容
    const content = res.data.content;

    // 解析文本内容并将<img>标签替换为<image>
    const textWithImages = content.replace(/<img src='(.*?)' \/>/g, "<image src='$1' />");

    // 获取作者信息，假设作者信息存储在数据库中的 author 字段中
    const author = res.data.author;

    // 将解析后的文本内容和作者信息添加到结果中
    res.data.content = textWithImages;
    res.data.author = author;

    return res.data;
  } catch (error) {
    console.error('获取新闻详情失败', error);
    throw error;
  }
}
