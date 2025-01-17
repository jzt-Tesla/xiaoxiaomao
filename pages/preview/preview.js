Page({
  data: {
    tempImagePath: '',
    color: '#FFFFFF'
  },

  onLoad(options) {
    console.log('预览页面接收参数:', options)
    const { tempImagePath, color } = options
    // 解码路径
    const decodedPath = decodeURIComponent(tempImagePath)
    const decodedColor = decodeURIComponent(color)
    
    console.log('解码后的图片路径:', decodedPath)
    this.setData({
      tempImagePath: decodedPath,
      color: decodedColor
    })
  },

  // 处理图片加载错误
  handleImageError(e) {
    console.error('图片加载失败:', e)
    wx.showToast({
      title: '图片加载失败',
      icon: 'error'
    })
  },

  // 重新拍照
  retake() {
    wx.navigateBack()
  },

  // 保存照片到相册
  savePhoto() {
    wx.showLoading({
      title: '保存中...',
      mask: true
    })

    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempImagePath,
      success: () => {
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
      },
      fail: (error) => {
        wx.hideLoading()
        console.error('保存失败:', error)
        if (error.errMsg.includes('auth deny')) {
          wx.showModal({
            title: '提示',
            content: '需要您授权保存图片到相册',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'error'
          })
        }
      }
    })
  }
}) 