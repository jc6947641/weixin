Page({
  data: {
    newsDetail: {},
    formattedContent: [],
  },

  onLoad(options) {
    const newsId = options.id;
    this.getNewsDetail(newsId);
  },

  // 修改 getNewsDetail 函数
  getNewsDetail: function (newsId) {
    wx.cloud.callFunction({
      name: 'getNewsDetail',
      data: {
        id: newsId,
      },
      success: (res) => {
        const newsDetail = res.result;
        const content = newsDetail.content || '';

        // 解析文本内容并在文章1/3和2/3的位置插入图片
        this.parseContentWithImages(content, newsDetail);
      },
      fail: (err) => {
        console.error('获取新闻详情失败', err);
      },
    });
  },

  // 解析文本内容并在文章1/3和2/3的位置插入图片
  parseContentWithImages: function (content, newsDetail) {
    const paragraphs = content.split('\n\n');
    const formattedContent = [];

    for (const paragraph of paragraphs) {
      // 将段落内容拆分为三部分，然后在1/3和2/3位置插入图片1和图片2
      const paragraphLength = paragraph.length;
      const oneThird = Math.floor(paragraphLength / 3);
      const twoThirds = oneThird * 2;

      const firstThird = paragraph.slice(0, oneThird);
      const secondThird = paragraph.slice(oneThird, twoThirds);
      const lastThird = paragraph.slice(twoThirds);

      // 添加第一部分内容
      formattedContent.push({ type: 'text', content: firstThird });

      // 插入图片1
      formattedContent.push({ type: 'image', src: newsDetail.image1 });

      // 添加第二部分内容
      formattedContent.push({ type: 'text', content: secondThird });

      // 插入图片2
      formattedContent.push({ type: 'image', src: newsDetail.image2 });

      // 添加第三部分内容
      formattedContent.push({ type: 'text', content: lastThird });
    }

    this.setData({
      newsDetail: newsDetail,
      formattedContent: formattedContent,
    });
  },
});
