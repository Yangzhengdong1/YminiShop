// pages/category/childCpns/y-category-main/y-category-main.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subCategoryData: {
      type:Array,
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
    handleImage() {
      setTimeout(() => {
        if(!this.data.isLoad) {
          this.triggerEvent('imageLoad')
          this.data.isLoad = true
        }
      }, 1000);
    }
  }
})
