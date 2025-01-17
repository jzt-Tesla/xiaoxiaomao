const app = getApp()

// 默认图片
const DEFAULT_LIPSTICK_IMAGE = '/images/lipstick-default.png'

// 颜色分类
const COLOR_CATEGORIES = {
  RED: '正红色',
  CORAL: '珊瑚色',
  BEAN: '豆沙色',
  ROSE: '玫瑰色',
  NUDE: '裸粉色',
  ORANGE: '橘色'
}

const lipstickData = {
  dior: {
    id: 'dior',
    name: 'Dior 迪奥',
    logo: '/images/brands/dior.svg',
    colors: [
      { 
        code: '999', 
        name: '传奇红', 
        hex: '#BE002F', 
        price: '320',
        description: '经典正红色，显白提气质',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.RED
      },
      { 
        code: '080', 
        name: '红棕色', 
        hex: '#A75D57',
        price: '320',
        description: '温柔知性的红棕色',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.BEAN
      },
      { 
        code: '720', 
        name: '珊瑚红', 
        hex: '#FF4E59',
        price: '320',
        description: '元气满满的珊瑚色',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.CORAL
      }
    ]
  },
  ysl: {
    id: 'ysl',
    name: 'YSL 圣罗兰',
    logo: '/images/brands/ysl.svg',
    colors: [
      { 
        code: '1', 
        name: '星星色', 
        hex: '#BE002F',
        price: '320',
        description: '经典正红色',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.RED
      },
      { 
        code: '13', 
        name: '正橘色', 
        hex: '#FF4500',
        price: '320',
        description: '活力橘色',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.ORANGE
      }
    ]
  },
  mac: {
    id: 'mac',
    name: 'MAC 魅可',
    logo: '/images/brands/mac.svg',
    colors: [
      { 
        code: 'Ruby Woo', 
        name: '经典红', 
        hex: '#CC0000',
        price: '170',
        description: '蓝调正红色',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.RED
      },
      { 
        code: 'See Sheer', 
        name: '珊瑚色', 
        hex: '#FF6B6B',
        price: '170',
        description: '清新珊瑚色',
        image: DEFAULT_LIPSTICK_IMAGE,
        category: COLOR_CATEGORIES.CORAL
      }
    ]
  }
}

// 将数据保存到全局
app.globalData = {
  ...app.globalData,
  lipstickData,
  colorCategories: Object.values(COLOR_CATEGORIES)
}

Page({
  data: {
    brands: Object.values(lipstickData),
    currentBrand: 'dior',
    searchKey: '',
    colors: [],
    categories: Object.values(COLOR_CATEGORIES),
    currentCategory: ''
  },

  onLoad: function() {
    this.updateColors()
  },

  // 搜索功能
  onSearch: function(e) {
    this.setData({ 
      searchKey: e.detail.value
    }, () => {
      this.updateColors()
    })
  },

  // 切换品牌
  switchBrand: function(e) {
    const brandId = e.currentTarget.dataset.brand
    this.setData({ 
      currentBrand: brandId,
      currentCategory: '' // 切换品牌时重置分类
    }, () => {
      this.updateColors()
    })
  },

  // 切换分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      currentCategory: category
    }, () => {
      this.updateColors()
    })
  },

  // 更新颜色数据
  updateColors: function() {
    const { currentBrand, searchKey, currentCategory } = this.data
    let colors = lipstickData[currentBrand].colors

    // 搜索过滤
    if (searchKey) {
      const key = searchKey.toLowerCase()
      colors = colors.filter(color => 
        color.code.toLowerCase().includes(key) ||
        color.name.toLowerCase().includes(key)
      )
    }

    // 分类过滤
    if (currentCategory) {
      colors = colors.filter(color => color.category === currentCategory)
    }
    
    this.setData({ colors })
  },

  // 选择颜色，跳转到颜色展示页面
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color
    wx.navigateTo({
      url: `/pages/lipstick-detail/lipstick-detail?brandId=${encodeURIComponent(this.data.currentBrand)}&colorCode=${encodeURIComponent(color.code)}`
    })
  }
}) 