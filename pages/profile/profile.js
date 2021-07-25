// pages/profile/profile.js
const city = require('../../utils/city')
Page({
  data: {
    list1: [
      {url: '/assets/profile/news.png', title: '我的消息'},
      {url: '/assets/profile/market.png', title: '我的商场'},
      {url: '/assets/profile/member.png', title: '我的会员'},
    ],
    list2: [
      {url: '/assets/profile/cart.png', title: '我的购物车'},
      {url: '/assets/profile/mgicon.png', title: '下载购物APP'}
    ],
    city: '',
    userInfo: {}
  },

  handleLogin() {
    wx.getUserProfile({
      desc: 'desc',
      success: (res) => {
        const {userInfo} = res
        this.setData({
          userInfo: userInfo
        }, () => {
          wx.showToast({
            title: '已登录',
            duration: 1000
          })
        })
      }
    })
  }
})