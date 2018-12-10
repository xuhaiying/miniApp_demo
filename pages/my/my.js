// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false
  },
  phoneCall: function (){
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  },
  onGotUserInfo: function (e){
    const userInfo = e.detail.userInfo;
    app.globalData.userInfo = userInfo;
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})