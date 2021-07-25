// pages/home/childCpns/y-recommend/y-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad() {
      // 如果监听是 4 张图片全部监听，我们只需要监听一张图片加载完成就行。一张图片加载完成就说明全部加载完成
      if(!this.data.isLoad) {
        
        this.data.isLoad = true
        this.triggerEvent('imageload')
      }
    }
  }
})
