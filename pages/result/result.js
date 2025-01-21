Page({
  data: {
    resultText: '',
    isLoading: true
  },

  onLoad(options) {
    const { brand, code } = options;
    if (brand && code) {
      this.fetchResult(brand, code);
    } else {
      this.setData({
        resultText: '参数错误，请返回重试',
        isLoading: false
      });
    }
  },

  fetchResult(brand, code) {
    this.setData({ 
      isLoading: true,
      resultText: ''
    });
    
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    wx.request({
      url: 'https://api.coze.cn/v3/chat',
      method: 'POST',
      header: {
        'Authorization': 'Bearer pat_eeSyUzM2z4w5BYihHx7F2xmfv8jXmj0KQv5oiBfH8olT2m1nR5GVVf7pxjTRvKjN',
        'Content-Type': 'application/json'
      },
      data: {
        bot_id: '7461706790624362535',
        user_id: '123',
        stream: true,
        auto_save_history: true,
        additional_messages: [{
          role: 'user',
          content: `品牌：${brand}，编号：${code}`,
          content_type: 'text'
        }]
      },
      success: (res) => {
        console.log('API响应:', res);
        if (res.statusCode === 200) {
          try {
            const responseData = res.data;
            console.log('响应数据:', responseData);
            
            // 检查是否有错误码
            if (responseData.code) {
              let errorMessage = '请求失败';
              switch (responseData.code) {
                case 4015:
                  errorMessage = 'Bot未发布，请联系管理员';
                  break;
                case 4001:
                  errorMessage = '认证失败，请检查Token';
                  break;
                case 4004:
                  errorMessage = 'Bot不存在';
                  break;
                default:
                  errorMessage = responseData.msg || '未知错误';
              }
              this.handleError(errorMessage);
              return;
            }
            
            // 检查是否是SSE格式的响应
            if (typeof responseData === 'string') {
              // 处理SSE格式的响应
              const lines = responseData.split('\n');
              let content = '';
              
              for (const line of lines) {
                if (line.startsWith('data:')) {
                  const data = line.slice(5); // 移除 'data:' 前缀
                  try {
                    const parsedData = JSON.parse(data);
                    if (parsedData.content) {
                      content += parsedData.content;
                      this.setData({ resultText: content });
                    }
                  } catch (e) {
                    console.log('解析行数据失败:', e);
                  }
                }
              }
              
              if (!content) {
                this.handleError('未获取到有效内容');
              }
            } else {
              // 处理普通JSON响应
              if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
                this.setData({
                  resultText: responseData.choices[0].message.content
                });
              } else if (responseData.content) {
                this.setData({
                  resultText: responseData.content
                });
              } else {
                console.log('完整响应数据:', responseData);
                this.handleError('响应格式不正确');
              }
            }
          } catch (e) {
            console.error('处理响应失败:', e);
            this.handleError('处理响应失败');
          }
        } else {
          this.handleError(`请求失败: ${res.statusCode}`);
        }
      },
      fail: (error) => {
        console.error('API调用失败:', error);
        let errorMsg = '查询失败，请重试';
        
        if (error.errMsg.includes('url not in domain list')) {
          errorMsg = '请在开发者工具中勾选"不校验合法域名"';
        } else if (error.errMsg.includes('timeout')) {
          errorMsg = '请求超时，请检查网络后重试';
        }
        
        this.handleError(errorMsg);
      },
      complete: () => {
        this.setData({ isLoading: false });
        wx.hideLoading();
      }
    });
  },

  handleError(message) {
    this.setData({
      resultText: message
    });
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 3000
    });
  },

  onBack() {
    wx.navigateBack();
  }
}); 