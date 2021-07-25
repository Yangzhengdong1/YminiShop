// pages/home/home.js
import { getMultidata, getGoodsData } from '../../network/home'
const types = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000
Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []},
    },
    currentType: 'pop',
    backTopShow: false,
    isTabShow: false,
    tabScrollTop: 0
  },
  
  onLoad: function(options) {
    // 1、请求轮播图以及推荐数据
    this._getMultidata()
    // 2、请求首页商品数据
    this._getGoodsData('pop', 1)
    this._getGoodsData('new', 1)
    this._getGoodsData('sell', 1)
  },

// ---------------------- 网络请求函数 -------------
  _getMultidata() {
    getMultidata().then((res) => {
      // 2、取出轮播图和推荐的数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      //3、将取出的数据存放到 data 中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 1、获取页码
    const page = this.data.goods[type].page + 1
    // 2、发送网络请求
    getGoodsData(type,page).then((res) => {
      // 2.1. 获取到商品数据
      const { list } = res.data.data
      // 2.2. 将数据设置到对应 type 的 list 中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      //如果数据是一个对象或数组 setData 不能直接去修改它们中的属性和元素，只能通过字符串的形式，如果其中的某个属性是动态的可以先将其定义好再通过 [] 在setData中修改
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

  // -------------------- 事件监听函数 ---------------
  handleTabClick(e) {
    // 1、获取到自定义组件内部传出的自定义事件参数
    const index = e.detail.index
    this.setData({
      currentType: types[index]
    })
  },

  // 图片监听
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },


  //--------------------- 小程序内部事件 ---------------
  // 上拉加载更多
  onReachBottom() {
    // 页面滚到底部加载 Lodig 弹窗
    wx.showLoading({
      title: '正在加载更多....',
      mask: true
    })
     // 请求新的数据
    // this._getGoodsData(this.data.currentType)
      // 1、获取页码
      const page = this.data.goods[this.data.currentType].page + 1
      const type = this.data.currentType
      // 2、发送网络请求
      getGoodsData(type,page).then((res) => {
        // 2.1. 获取到商品数据
        const { list } = res.data.data
        // 2.2. 将数据设置到对应 type 的 list 中
        const oldList = this.data.goods[type].list
        oldList.push(...list)
        //如果数据是一个对象或数组 setData 不能直接去修改它们中的属性和元素，只能通过字符串的形式，如果其中的某个属性是动态的可以先将其定义好再通过 [] 在setData中修改
        const typeKey = `goods.${type}.list`
        const pageKey = `goods.${type}.page`
        this.setData({
          [typeKey]: oldList,
          [pageKey]: page
        })
        // 数据加载完成，Loding 弹窗取消
        wx.hideLoading({
          success: (res) => {},
        })
      })
  },

  // 监听页面滚动
  onPageScroll(options) {
    // 1、取出 scrollTop
    const scrollTop = options.scrollTop

    // 2、修改backTopShow 属性
    // 官方：不要在滚动的函数回调中频繁的调用 this.setData
    const flag1 = scrollTop >= TOP_DISTANCE
    if(flag1 != this.data.backTopShow) {
      this.setData({
        backTopShow: flag1
      })
    }

    // 修改 isTabShow 属性，决定是否吸顶
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabShow) {
      this.setData({
        isTabShow: flag2
      })
    }

  }
  
})
