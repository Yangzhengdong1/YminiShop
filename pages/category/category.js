// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../network/category'
const types = ['pop', 'new', 'sell']
const SCROLLTOP = 1000
Page({
  data: {
    sideList: [],
    subCategoryData: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      },
    },
    currentType: 'pop',
    isBackShow: false
  },

  // 小程序相关函数
  onLoad: function (options) {
    this._getCategory(),
      this._subcategory(3627, 10062603)
  },


  // 网络请求相关
  _getCategory() {
    getCategory().then((res) => {
      const {
        list
      } = res.data.data.category
      // 获取侧边数据
      this.setData({
        sideList: list
      })
    })
  },

  _subcategory(maitKey, miniWallkey) {
    getSubcategory(maitKey).then(res => {
      const {
        list
      } = res.data.data
      this.setData({
        subCategoryData: list
      })
    })
    this._getCategoryDetail(miniWallkey, 'pop')
    this._getCategoryDetail(miniWallkey, 'new')
    this._getCategoryDetail(miniWallkey, 'sell')
  },

  _getCategoryDetail(key, type) {
    getCategoryDetail(key, type).then(res => {
      // 2.1. 获取到商品数据
      const {
        data
      } = res
      // 2.2. 将数据设置到对应 type 的 list 中
      let oldList = this.data.goods[type].list
      oldList = []
      oldList.push(...data)
      const typeKey = `goods.${type}.list`
      this.setData({
        [typeKey]: oldList
      })
    })
  },

  // 自定义事件
  titleClcik(e) {
    const {
      key,
      miniWallkey
    } = e.detail
    this._subcategory(key, miniWallkey)
  },
  handleTabClick(e) {
    // 1、获取到自定义组件内部传出的自定义事件参数
    const index = e.detail.index
    this.setData({
      currentType: types[index]
    })
  },

  imageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },


})