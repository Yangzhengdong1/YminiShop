// pages/cart/cart.js
const app = getApp()
Page({
  data: {
    isShow: true,
    total: 0,
    cartList: [],
    selectAll: false,
    checkedList: []
  },

                                  // ------------------- 小程序自带函数 ----------------
  onLoad: function () {
    this.setData({
        cartList: app.globalData.cartList
      }),
      // 为 app.js 设置回调，点击一次添加购物车，回调一次。以此来刷新购物车界面
      app.addCartCallBack = () => {
        this.setData({
          cartList: app.globalData.cartList
        })
      }
  },
                                  // ------------------- 自定义处理函数 -----------------
  // 全选
  handleSelectAll() {
    // 1、更改全选按钮状态
    if (this.data.cartList.length === 0) {
      return
    } else {
      this.setData({
        selectAll: !this.data.selectAll
      })
    }

    // 2、判断全选按钮是否被选中
    // 2.1、全选按钮被选中，将购物车全部的商品信息添加到 checkedList 数组中，并更改全部商品更改为选中状态
    if (this.data.selectAll) {
      let list = []
      this.data.cartList.forEach((item, index) => {
        let checked = `cartList[${index}].checked`
        list.push(item)
        this.setData({
          checkedList: list,
          [checked]: true
        })
      })
      this.calcTotalPrice()
    } else {
    // 2.2、全选按钮未被选中， checkedList 数组中的信息清空，并更改全部商品更改为未选中状态，并将总价格清零
      let list = []
      this.data.cartList.forEach((item, index) => {
        let checked = `cartList[${index}].checked`
        this.setData({
          checkedList: list,
          [checked]: false,
          total: 0
        })
      })
    }

  },

  // 单选 
  handleRadio(e) {
    // 1、更改当前点击元素的 checked
    const { index } = e.currentTarget.dataset
    let checked = `cartList[${index}].checked`
    this.setData({
      [checked]: !this.data.cartList[index].checked
    }, () => {
      // 1.1、更改完 checked 的状态后回调寻找是否还有被选中的商品，并做出判断：如果没有，将存放被选中商品信息的数组清空，以及将总价格清零
      let a = this.data.cartList.find(item => item.checked === true)
      if(!a) {
        this.setData({
          checkedList: [],
          total: 0
        })
      }

    })
    // 2、将选中的商品添加到 checkedList （存放被选中商品数组）中
    let list = []
    this.data.cartList.forEach(item => {
      if (item.checked) {
        list.push(item)
        this.setData({
          checkedList: list
        })
      }
    })

    // 3、判断全选
    if (this.data.checkedList.length === this.data.cartList.length) {
      this.setData({
        selectAll: true
      })
    } else {
      this.setData({
        selectAll: false
      })
    }

    // 4、计算总价格
    this.calcTotalPrice()
  },

  // 计算总价处理函数
  calcTotalPrice() {
    let total = 0
    this.data.checkedList.forEach(item => {
      total += parseFloat(item.count * item.price)
    })
    this.setData({
      total: total
    })
  }

})