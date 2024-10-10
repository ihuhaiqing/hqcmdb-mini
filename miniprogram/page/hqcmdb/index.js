// page/hqcmdb/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targets: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    
  },

  async getTargets() {
    const res = await app.call({
      path:'/api/host/targets'
    })
    this.setData({targets: res})
    console.log('业务返回结果',res)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  login() {
    wx.login({
      success: res => {
        if (res.code) {
          app.call({
            path: '/api/wechat/login',
            method: 'POST',
            data: {'code': res.code}
          }).then(data =>{
              console.log(data)
              wx.setStorageSync('access_token', data.access)
              wx.setStorageSync('refresh_token', data.refresh)
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  logout() {
    wx.removeStorageSync('access_token');
    wx.removeStorageSync('refresh_token');
    // 提示用户已注销
    wx.showToast({
      title: '已注销',
      icon: 'success',
      duration: 2000
    });
  }
})