// index.js
Page({
  data: {
    
  },

  navigateToLight() {
    wx.navigateTo({
      url: '/pages/light-color/light-color'
    })
  },

  navigateToCustomLight() {
    wx.navigateTo({
      url: '/pages/light-custom/light-custom'
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
