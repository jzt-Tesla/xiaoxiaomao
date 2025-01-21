/***** 自定义补光页面逻辑 *****/
Page({
  /***** 页面初始数据 *****/
  data: {
    screenBrightness: 50,
    selectedColor: '#FFFFFF',
    backgroundColor: '#FFB6C1',
    systemBrightness: 0  // 保存系统原始亮度
  },

  /***** 生命周期函数 *****/
  // 页面加载时执行
  onLoad() {
    // 隐藏底部导航栏
    wx.hideTabBar()
    
    // 获取并保存系统当前亮度
    wx.getScreenBrightness({
      success: (res) => {
        console.log('获取到系统亮度:', res.value)
        this.setData({
          screenBrightness: res.value * 100,
          systemBrightness: res.value  // 保存原始亮度
        })
      },
      fail: (err) => {
        console.error('获取屏幕亮度失败:', err)
      }
    })
  },

  // 页面卸载时执行
  onUnload() {
    console.log('页面卸载，恢复系统亮度:', this.data.systemBrightness)
    // 恢复系统原始亮度
    wx.setScreenBrightness({
      value: this.data.systemBrightness,
      success: () => {
        console.log('成功恢复系统亮度')
      },
      fail: (err) => {
        console.error('恢复系统亮度失败:', err)
      }
    })
  },

  onScreenBrightnessChange(e) {
    const value = e.detail.value / 100
    this.setData({
      screenBrightness: e.detail.value
    })
    wx.setScreenBrightness({
      value,
      fail: (err) => {
        console.error('设置屏幕亮度失败:', err)
      }
    })
  },

  onColorChange(e) {
    const color = e.detail.color
    this.setData({
      selectedColor: color,
      backgroundColor: color
    })
  },

  onBack() {
    console.log('点击返回，恢复系统亮度:', this.data.systemBrightness)
    // 先恢复系统亮度，再返回
    wx.setScreenBrightness({
      value: this.data.systemBrightness,
      success: () => {
        console.log('成功恢复系统亮度，准备返回')
        wx.navigateBack()
      },
      fail: (err) => {
        console.error('恢复系统亮度失败:', err)
        wx.navigateBack()
      }
    })
  },

  onConfirm() {
    const { selectedColor, screenBrightness } = this.data
    
    wx.navigateTo({
      url: `/pages/light/light?color=${selectedColor}&screenBrightness=${screenBrightness}`,
      fail: (err) => {
        console.error('页面跳转失败:', err)
        wx.showToast({
          title: '跳转失败，请重试',
          icon: 'none'
        })
      }
    })
  }
}) 