// pages/light/light.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '#FFFFFF',
    brightness: 50,
    sharpness: 50,
    screenBrightness: 50,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { color, brightness, sharpness, screenBrightness } = options
    this.setData({
      color: color || '#FFFFFF',
      brightness: parseInt(brightness || 50),
      sharpness: parseInt(sharpness || 50),
      screenBrightness: parseInt(screenBrightness || 50)
    })
    
    // 设置页面背景色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: this.data.color
    })

    // 设置屏幕亮度
    wx.setScreenBrightness({
      value: this.data.screenBrightness / 100
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 恢复默认屏幕亮度
    wx.setScreenBrightness({
      value: 0.5
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onBack() {
    wx.navigateBack()
  },

  // 拍照
  takePhoto() {
    if (this.data.isLoading) return

    this.setData({ isLoading: true })
    
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('拍照成功，图片路径:', res.tempImagePath)
        // 确保路径编码正确
        const encodedPath = encodeURIComponent(res.tempImagePath)
        const encodedColor = encodeURIComponent(this.data.color)
        
        wx.navigateTo({
          url: `/pages/preview/preview?tempImagePath=${encodedPath}&color=${encodedColor}`,
          success: () => {
            console.log('跳转预览页面成功')
          },
          fail: (err) => {
            console.error('跳转预览页面失败:', err)
            wx.showToast({
              title: '跳转失败，请重试',
              icon: 'none'
            })
          },
          complete: () => {
            this.setData({ isLoading: false })
          }
        })
      },
      fail: (error) => {
        console.error('拍照失败:', error)
        wx.showToast({
          title: '拍照失败',
          icon: 'error'
        })
        this.setData({ isLoading: false })
      }
    })
  },

  // 错误处理
  error(e) {
    console.error('相机错误：', e.detail)
    wx.showModal({
      title: '提示',
      content: '相机出错了，请检查相机权限或重试',
      showCancel: false,
      success: () => {
        wx.navigateBack()
      }
    })
  }
})