// pages/index/index.js
var util = require('../../utils/util.js')
import Toast from '../../@vant/weapp/toast/toast'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    width: 0,
    tabActive: {},
    time: 0,
    _tapSort: 1,
    workTimeText: '当前按照 上班：08:00 下班：17:00 购票',
    workTimeTextArr: [
      '当前按照 上班：08:00 下班：17:00 购票',
      '当前按照 上班：09:00 下班：18:00 购票',
    ],
    show: false,
    actions: [
      {
        name: '08:00',
        index: 0,
      },
      {
        name: '09:00',
        index: 1,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTime()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let height = wx.getSystemInfoSync().windowHeight * 2
    let width = wx.getSystemInfoSync().windowWidth * 2
    this.setData({
      height,
      width,
    })
  },
  getTime: function () {
    var that = this
    setInterval(function () {
      that.setData({
        time: util.formatTime(new Date()),
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  onClickTicket: function () {
    this.setData({
      _tapSort: 1,
    })
  },
  onClickMonth: function () {
    this.setData({
      _tapSort: 2,
    })
  },
  onClickChoseWorkTime: function () {
    this.setData({
      show: true,
    })
  },
  onClose: function () {
    this.setData({
      show: false,
    })
  },
  onSelectTime: function (event) {
    var that = this
    this.setData({
      workTimeText: that.data.workTimeTextArr[event.detail.index],
    })
    Toast({
      message: '已修改上班时间',
      position: 'bottom',
    })
  },
})
