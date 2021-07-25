// components/y-tab-control/y-tab-control.js
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
    itemClick(e) {
      // 1、获取到当前被点击的 title 的 index
      const { index } = e.currentTarget.dataset

      // 2、将当前被点击的 title 的 index 赋给 currentIndex
      this.setData({
        currentIndex: index
      })

      // 3、将当前组件数据发送出去
      const data = {index: this.data.currentIndex}
      this.triggerEvent('tabclick', data)
    }
  }
})
