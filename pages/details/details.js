// pages/details/details.js
import { getDetails, Goods, getRecommend } from '../../network/details'
const util = require('../../utils/util')
const TOP_DISTANCE = 1000
const app = getApp()
Page({
  data: {
    iid: null,
    titles: ['商品', '参数', '评论', '推荐'],
    swiperList: [],
    goods: {},
    storeInfo: {},
    detailInfo: {},
    itemParams: {},
    rate: {},
    date: '',
    recommends: [],
    backTopShow: false,
    baroptions: [{
        url: '/assets/detail/service.png',
        name: '客服'
      },
      {
        url: '/assets/detail/shop.png',
        name: '店铺'
      },
      {
        url: '/assets/detail/collection.png',
        name: '收藏'
      }
    ],
    scrollTopList: []
  },

  // --------------- 小程序默认函数 -------------
  onLoad: function (options) {
    // 获取页面跳转传递过来的 iid 参数
    this.setData({
      iid: options.iid
    })
    // 请求详情页数据
    this._getDetails(this.data.iid)
    // 请求详情页推荐数据
    this._getRecommend()

  },

  onShow: function () {
    wx.showLoading({
      title: '正在加载。。。',
      mask: true
    })
  },

  // 监听页面滚动
  onPageScroll(options) {
    // 1、取出 scrollTop
    const scrollTop = options.scrollTop

    // 2、修改backTopShow 属性
    const flag = scrollTop >= TOP_DISTANCE
    if (flag != this.data.backTopShow) {
      this.setData({
        backTopShow: flag
      })
    }
  

    // 页面联动
     // 1.获取到组件对象
     const my_cop = this.selectComponent('#nav')
    if(this.data.scrollTopList[3] - 44 > scrollTop && scrollTop >= this.data.scrollTopList[2]) {
      my_cop.setData({
        currentIndex: 1
      })
    } else if(this.data.scrollTopList[4] - 44 > scrollTop && scrollTop >= this.data.scrollTopList[3]) {
      my_cop.setData({
        currentIndex: 2
      })

    } else if(scrollTop > this.data.scrollTopList[4] - 44) {
      my_cop.setData({
        currentIndex: 3
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // ---------------- 网络请求相关 ---------------

  _getDetails(iid) {
    getDetails(iid).then(res => {
      const data = res.data.result
      // 1、获取顶部轮播图
      const list = data.itemInfo.topImages
      this.setData({
        swiperList: list
      })
      // 2、获取商品信息
      const { columns, itemInfo, shopInfo } = data
      const goods = new Goods(itemInfo, columns, shopInfo.services)
      // 3、获取商家信息
      const storeInfo = data.shopInfo
      // 4、获取商品展示信息
      const { detailInfo } = data
      // 5、获取商品参数
      const { itemParams } = data
      // 6、获取商品评价
      const { rate } = data
      // 7、获取发表评论时间
      if(data.rate.cRate === 0) {
        this.setData({
          date: 0
        })
      } else {
        const date = util.formatTime(rate.list[0].created * 1000).substr(0, 11)
        this.setData({
          date: date
        })
      }
      this.setData({
        goods: goods,
        storeInfo: storeInfo,
        detailInfo: detailInfo,
        itemParams: itemParams,
        rate: rate
      }, () => {
        // 数据请求完成 loding 弹窗消失
        wx.hideLoading({
          success: (res) => {},
        })
      })
    })
  },

  _getRecommend() {
    getRecommend().then((res) => {
      const {
        list
      } = res.data.data
      this.setData({
        recommends: list
      })
    })
  },

  // ---------------- 自定义事件相关 -------------

  // 页面联动，点击跳转对应位置
          // 两种方式：
           // 1、组件名跳转
           // 2、获取具体高度后跳转
  handleLinkage(e) {
    const index = e.detail.index
    if(index === 0) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    } else if(index === 1) {
      wx.pageScrollTo({
        scrollTop: this.data.scrollTopList[2] - 44,
        duration: 300,
      })
    } else if(index === 2) {
      wx.pageScrollTo({
        scrollTop: this.data.scrollTopList[3] - 44,
        duration: 300,
      })
    } else {
      wx.pageScrollTo({
        scrollTop: this.data.scrollTopList[4] - 44,
        duration: 300,
      })
    }
  },

  // 图片加载完成获取各组件高度
  handleImageLoad() {
    // 方案1、计算高度，赋值
    const _self = this
    const query = this.createSelectorQuery()
    query.select('#shop').boundingClientRect()
    query.select('#nav').boundingClientRect()
    query.select('#param-info').boundingClientRect()
    query.select('#rate').boundingClientRect()
    query.select('#recommend').boundingClientRect()
    query.exec(function (res) {
      let scrollTopList = []
      res.forEach(item => {
        scrollTopList.push(item.top)
      })
      _self.setData({
        scrollTopList: scrollTopList
      })
    })

  },

  // 加入购物车
  handleAddCar() {
    const product = {}
    product.image = this.data.swiperList[0]
    product.title = this.data.goods.title
    product.desc = this.data.goods.desc
    product.count = 1
    product.price = this.data.goods.realPrice
    product.iid = this.data.iid
    product.checked = false
    app.addToCar(product).then(res => {
      wx.showToast({
        title: res,
        duration: 2000
      })
    })
  }


})