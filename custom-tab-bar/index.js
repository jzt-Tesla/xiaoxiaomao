Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/home.svg",
        selectedIconPath: "/images/home-active.svg"
      },
      {
        pagePath: "/pages/beauty/beauty",
        text: "美妆查询",
        iconPath: "/images/beauty.svg",
        selectedIconPath: "/images/beauty-active.svg"
      },
      {
        pagePath: "/pages/light/light",
        text: "补光灯",
        iconPath: "/images/light.svg",
        selectedIconPath: "/images/light-active.svg"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconPath: "/images/profile.svg",
        selectedIconPath: "/images/profile-active.svg"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
}) 