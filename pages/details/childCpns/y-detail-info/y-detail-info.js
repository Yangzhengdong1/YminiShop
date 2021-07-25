// pages/details/childCpns/y-detail-info/y-detail-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailInfo: {
      type: Object,
      value: {}
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
      setTimeout(() => {
        if(!this.data.isLoad) {
          this.data.isLoad = true
          this.triggerEvent('imageload')
        }
      }, 1000);
    }
  }
})
