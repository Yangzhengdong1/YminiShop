export default function (options) {
  return new Promise( (resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method,
      data: options.data || {},
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}