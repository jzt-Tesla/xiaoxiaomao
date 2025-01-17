Component({
  properties: {
    color: {
      type: String,
      value: '#00BFFF'
    }
  },

  data: {
    hue: 195,
    presetColors: [
      { color: '#FFB6C1', name: '少女粉' },
      { color: '#E0FFFF', name: '清爽蓝' },
      { color: '#9370DB', name: '魅紫色' },
      { color: '#FFFFFF', name: '百搭光' },
      { color: '#FFD700', name: '温暖黄' },
      { color: '#87CEEB', name: '天真蓝' }
    ]
  },

  methods: {
    // 处理预设颜色点击
    onPresetColorTap(e) {
      const color = e.currentTarget.dataset.color
      this.updateColorAndNotify(color)
    },

    // 处理滑块变化
    onSliderChange(e) {
      const hue = e.detail.value
      this.setData({ hue })
      const color = this.hueToRgb(hue)
      this.updateColorAndNotify(color)
    },

    // 更新颜色并通知父组件
    updateColorAndNotify(color) {
      const validColor = this.normalizeColor(color)
      this.triggerEvent('change', { color: validColor })
    },

    // 标准化颜色值
    normalizeColor(color) {
      if (color.startsWith('#')) {
        const hex = color.substring(1)
        if (hex.length === 3) {
          return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
        }
        return color.toUpperCase()
      }
      const rgb = color.match(/\d+/g)
      if (rgb) {
        const hex = rgb.map(x => {
          const hex = parseInt(x).toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        return `#${hex.join('')}`.toUpperCase()
      }
      return color
    },

    // 将色相值转换为RGB颜色
    hueToRgb(hue) {
      const h = hue / 360
      let r, g, b

      const i = Math.floor(h * 6)
      const f = h * 6 - i
      const p = 0
      const q = 1 * (1 - f)
      const t = 1 * f

      switch (i % 6) {
        case 0: r = 1; g = t; b = p; break
        case 1: r = q; g = 1; b = p; break
        case 2: r = p; g = 1; b = t; break
        case 3: r = p; g = q; b = 1; break
        case 4: r = t; g = p; b = 1; break
        case 5: r = 1; g = p; b = q; break
      }

      const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
    }
  }
}) 