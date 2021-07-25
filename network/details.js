import request from './index'

//1.定义一个类，整合商品基本信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title   
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price    //现价
    this.oldPrice = itemInfo.oldPrice  //原价
    this.discount = itemInfo.discountDesc  //折扣
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

const baseURL = 'http://152.136.185.210:8000/api/w6'
// 获取商品详情页数据
export function getDetails(iid) {
  return request({
    url: baseURL + '/detail',
    data: {
      iid
    }
  })
}

// 获取详情页推荐商品数据
export function getRecommend() {
  return request({
    url: baseURL + '/recommend'
  })
}