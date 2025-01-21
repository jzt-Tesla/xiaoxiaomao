// index.js
Page({
  data: {
    
  },

  navigateToLight() {
    wx.navigateTo({
      url: '/pages/light-color/light-color'
    })
  },

  navigateToBeauty() {
    wx.navigateTo({
      url: '/pages/beauty/beauty'
    })
  },

  navigateToLipstick() {
    wx.navigateTo({
      url: '/pages/lipstick/lipstick'
    })
  }
})
