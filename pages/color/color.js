Page({
  data: {
    hex: '',
    name: '',
    code: '',
    isReady: false
  },

  onLoad: function(options) {
    // 获取传递的参数
    this.setData({
      hex: decodeURIComponent(options.hex),
      name: decodeURIComponent(options.name),
      code: decodeURIComponent(options.code)
    })

    // 延迟一帧启动动画
    setTimeout(() => {
      this.setData({
        isReady: true
      })
    }, 100)
  },

  // 点击返回
  onTap: function() {
    wx.navigateBack()
  }
}) 