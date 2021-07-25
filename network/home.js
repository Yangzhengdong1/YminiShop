import request from './index'
const baseURL = 'http://152.136.185.210:8000/api/w6'
// 1、请求轮播图以及推荐数据
export function getMultidata() {
  return request({
    url: baseURL + '/home/multidata'
  })
}

// 2、请求首页商品数据
export function getGoodsData(type, page) {
  return request({
    url: baseURL + `/home/data`,
    data: {
      type,
      page
    }
  })
}