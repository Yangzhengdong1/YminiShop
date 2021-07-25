// pages/details/childCpns/y-nav-bar/y-nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navItemClick(e) {
      const {
        index
      } = e.target.dataset
      this.setData({
        currentIndex: index
      })

      const data = {index: this.data.currentIndex}
      this.triggerEvent('navClick', data)
    },
    // 返回上一页
    handleBack() {
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})