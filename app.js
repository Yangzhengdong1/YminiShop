// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    cartList: []
  },

  addToCar(obj) {
    return new Promise((resolve, reject) => {
      const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
      if(oldInfo) {
        oldInfo.count += 1
        resolve('当前商品数量+1')
      } else {
        this.globalData.cartList.push(obj)
        resolve('添加购物车成功')
      }

      if(this.addCartCallBack) {
        this.addCartCallBack()
      }

    })
  },


})

