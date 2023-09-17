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
      const paragraphs = content.split('\n\n');
      const formattedContent = [];
      if (newsDetail.someDynamicContent1) {
        formattedContent.push({ type: 'text', content: newsDetail.someDynamicContent1 });
      }
      
      // 插入 image1
      if (newsDetail.image1) {
        formattedContent.push({ type: 'image', src: newsDetail.image1 });
      }
      
      // 添加第二段动态文本内容
      if (newsDetail.someDynamicContent2) {
        formattedContent.push({ type: 'text', content: newsDetail.someDynamicContent2 });
      }
      
      // 插入 image2
      if (newsDetail.image2) {
        formattedContent.push({ type: 'image', src: newsDetail.image2 });
      }

      let currentText = ''; // 用于存储当前文本内容

      for (const paragraph of paragraphs) {
        if (paragraph.startsWith('[image1]')) {
          if (currentText !== '') {
            formattedContent.push({ type: 'text', content: `<div>${currentText}</div>` });
            currentText = '';
          }
          formattedContent.push({ type: 'image', src: newsDetail.image1 });
        } else if (paragraph.startsWith('[image2]')) {
          if (currentText !== '') {
            formattedContent.push({ type: 'text', content: `<div>${currentText}</div>` });
            currentText = '';
          }
          formattedContent.push({ type: 'image', src: newsDetail.image2 });
        } else {
          if (currentText !== '') {
            currentText += '<br>'; // 添加段落分隔符
          }
          currentText += paragraph;
        }
      }
      
      if (currentText !== '') {
        formattedContent.push({ type: 'text', content: `<div>${currentText}</div>` });
      }
      this.setData({
        newsDetail: newsDetail,
        formattedContent: formattedContent,
      });
    },
    fail: (err) => {
      console.error('获取新闻详情失败', err);
    },
  });
}

});
