Page({
  data: {
    lightColors: {
      warm: '#FFE4B5',    // 暖光颜色
      cold: '#E8F5FF',    // 冷光颜色
      natural: '#FFFFFF',  // 自然光颜色
      sunset: '#FFD4B5',  // 日落光颜色
      studio: '#F8F8F8'   // 影棚光颜色
    }
  },

  selectLight(e) {
    const type = e.currentTarget.dataset.type
    const color = this.data.lightColors[type]
    wx.navigateTo({
      url: `/pages/light/light?color=${color}`
    })
  },

  navigateToCustom() {
    wx.navigateTo({
      url: '/pages/light-custom/light-custom'
    })
  }
}) 