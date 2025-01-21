// pages/light-studio/light-studio.js

/**
 * 补光颜色卡页面
 * 实现了颜色选择和屏幕亮度调节功能
 */
Page({

  /**
   * 页面的初始数据
   * backgroundColor: 当前显示的背景颜色，默认白色
   * brightness: 系统屏幕亮度值，范围0.1-1
   * showControls: 是否显示控制面板，默认显示
   * colorData: 颜色选择器的初始数据
   *   - hue: 色相值，范围0-360
   *   - saturation: 饱和度，范围0-100
   *   - value: 明度，范围0-100
   * systemBrightness: 保存系统原始亮度值
   */
  data: {
    backgroundColor: '#FFB6C1',
    brightness: 1,
    showControls: true,
    colorData: {
      hue: 0,
      saturation: 0,
      value: 100,
    },
    systemBrightness: 0
  },

  /**
   * 生命周期函数--监听页面加载
   * 设置屏幕常亮，防止屏幕自动关闭
   * 获取并保存系统当前亮度
   */
  onLoad(options) {
    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
    });

    // 获取系统当前亮度
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          systemBrightness: res.value,
          brightness: res.value
        });
      }
    });
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   * 恢复系统原始亮度
   * 取消屏幕常亮设置
   */
  onUnload() {
    // 恢复系统原始亮度
    wx.setScreenBrightness({
      value: this.data.systemBrightness
    });

    // 取消屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: false
    });
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

  /**
   * 颜色改变事件处理函数
   * @param {Object} e 事件对象
   * @param {Object} e.detail 颜色选择器返回的数据
   * @param {string} e.detail.color 十六进制颜色值
   */
  onChangeColor(e) {
    const { color } = e.detail;
    this.setData({
      backgroundColor: color
    });
  },

  /**
   * 系统屏幕亮度改变事件处理函数
   * @param {Object} e 事件对象
   * @param {Object} e.detail 滑块数据
   * @param {number} e.detail.value 当前亮度值
   */
  onBrightnessChange(e) {
    const brightness = e.detail.value;
    // 更新页面数据
    this.setData({ brightness });
    // 设置系统亮度
    wx.setScreenBrightness({
      value: brightness,
      fail: (err) => {
        console.error('设置屏幕亮度失败:', err);
        wx.showToast({
          title: '设置亮度失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 切换控制面板显示状态
   * 点击空白处时触发
   */
  toggleControls() {
    this.setData({
      showControls: !this.data.showControls
    });
  },

  /**
   * 阻止事件冒泡
   * 防止点击控制面板时触发toggleControls
   */
  preventBubble() {
    // 空函数，仅用于阻止事件冒泡
  },

  /**
   * 返回按钮点击事件处理函数
   * 返回上一页
   */
  onBack() {
    wx.navigateBack();
  }
})