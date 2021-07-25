// pages/category/childCpns/y-sild.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    sideList: {
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
    handleSideTitle(e) {
      const { index, key } = e.currentTarget.dataset
      const miniWallkey = this.properties.sideList[index].miniWallkey
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('titleClcik', {key: key, miniWallkey: miniWallkey})
    }
  }
})
