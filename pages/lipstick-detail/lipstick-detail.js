const app = getApp()

Page({
  data: {
    color: null,
    similarColors: [],
    isCollected: false
  },

  onLoad: function(options) {
    const { brandId, colorCode } = options
    const color = this.getColorInfo(brandId, colorCode)
    const similarColors = this.findSimilarColors(color)
    
    this.setData({
      color,
      similarColors,
      isCollected: this.checkIfCollected(brandId, colorCode)
    })
  },

  // 获取颜色信息
  getColorInfo: function(brandId, colorCode) {
    const brand = app.globalData.lipstickData[brandId]
    const color = brand.colors.find(c => c.code === colorCode)
    return {
      ...color,
      brand: brand.name,
      brandId
    }
  },

  // 查找相似色号
  findSimilarColors: function(currentColor) {
    const allColors = []
    Object.entries(app.globalData.lipstickData).forEach(([brandId, brand]) => {
      brand.colors.forEach(color => {
        if (color.code !== currentColor.code || brandId !== currentColor.brandId) {
          allColors.push({
            ...color,
            brand: brand.name,
            brandId
          })
        }
      })
    })

    // 根据颜色相似度排序并返回前5个
    return allColors
      .sort((a, b) => this.getColorSimilarity(currentColor.hex, a.hex) - this.getColorSimilarity(currentColor.hex, b.hex))
      .slice(0, 5)
  },

  // 计算颜色相似度（简单版本）
  getColorSimilarity: function(hex1, hex2) {
    const rgb1 = this.hexToRgb(hex1)
    const rgb2 = this.hexToRgb(hex2)
    
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    )
  },

  // HEX转RGB
  hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  // 检查是否已收藏
  checkIfCollected: function(brandId, colorCode) {
    const collections = wx.getStorageSync('collections') || []
    return collections.some(item => 
      item.brandId === brandId && item.colorCode === colorCode
    )
  },

  // 切换收藏状态
  toggleCollect: function() {
    const { color } = this.data
    const collections = wx.getStorageSync('collections') || []
    const index = collections.findIndex(item => 
      item.brandId === color.brandId && item.colorCode === color.code
    )

    if (index === -1) {
      // 添加收藏
      collections.push({
        brandId: color.brandId,
        colorCode: color.code,
        timestamp: Date.now()
      })
      wx.showToast({
        title: '已收藏',
        icon: 'success'
      })
    } else {
      // 取消收藏
      collections.splice(index, 1)
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }

    wx.setStorageSync('collections', collections)
    this.setData({
      isCollected: !this.data.isCollected
    })
  },

  // 选择相似色号
  selectSimilarColor: function(e) {
    const color = e.currentTarget.dataset.color
    wx.redirectTo({
      url: `/pages/lipstick-detail/lipstick-detail?brandId=${color.brandId}&colorCode=${color.code}`
    })
  },

  // 分享功能
  onShareAppMessage: function() {
    const { color } = this.data
    return {
      title: `${color.brand} ${color.name} ${color.code}`,
      path: `/pages/lipstick-detail/lipstick-detail?brandId=${color.brandId}&colorCode=${color.code}`
    }
  }
}) 