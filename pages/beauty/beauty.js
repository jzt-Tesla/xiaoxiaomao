// pages/beauty/beauty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstInput: '',
    secondInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
   */
  onUnload() {

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

  onClear() {
    this.setData({
      firstInput: '',
      secondInput: ''
    });
  },

  onFirstInput(e) {
    this.setData({
      firstInput: e.detail.value
    });
  },

  onSecondInput(e) {
    this.setData({
      secondInput: e.detail.value
    });
  },

  onSearch() {
    const { firstInput, secondInput } = this.data;
    if (!firstInput || !secondInput) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 跳转到结果页面
    wx.navigateTo({
      url: `/pages/result/result?brand=${encodeURIComponent(firstInput)}&code=${encodeURIComponent(secondInput)}`
    });
  }
})