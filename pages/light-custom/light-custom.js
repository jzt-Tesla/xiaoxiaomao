/***** 自定义补光页面逻辑 *****/
Page({
  /***** 页面初始数据 *****/
  data: {
    screenBrightness: 50,
    selectedColor: '#FFFFFF',
    backgroundColor: '#FFFFFF'
  },

  /***** 生命周期函数 *****/
  // 页面加载时执行
  onLoad() {
    // 隐藏底部导航栏
    wx.hideTabBar()
    
    // 获取系统亮度
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          screenBrightness: res.value * 100
        })
      },
      fail: (err) => {
        console.error('获取屏幕亮度失败:', err)
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