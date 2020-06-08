var util = require('../../utils/util.js')
import drawQrcode from '../../utils/weapp.qrcode.js'
Page({
  data: {
    QRcode: {},
    currentTime: '',
    userName: '阿斯顿',
    width: 0,
    height: 0,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '乘车码',
    })
    this.setData({
      QRcode: JSON.parse(options.QRcodeInfo),
    })
    this.getQRWidth()
    this.getTime()
  },
  getTime: function () {
    var that = this
    that.setData({
      currentTime: util.formatTime(new Date()),
    })
    setInterval(function () {
      that.setData({
        currentTime: util.formatTime(new Date()),
      })
    }, 1000)
    setInterval(function () {
      drawQrcode({
        width: this.data.width,
        height: this.data.height,
        canvasId: 'myQrcode',
        text: `PANDA:1${(Date.parse(new Date()) / 1000).toString()}3a446431d`,
      })
    }, 1000 * 60)
  },
  getQRWidth: function () {
    var query = wx.createSelectorQuery()
    var that = this
    query
      .select('.QRcode_code')
      .boundingClientRect(function (rect) {
        console.log(222, that.data.width)
        that.setData({
          width: rect.width - 10,
          height: rect.height - 10,
        })
      })
      .exec()
    setTimeout(function () {
      drawQrcode({
        width: that.data.width,
        height: that.data.height,
        canvasId: 'myQrcode',
        text: `PANDA:1${(Date.parse(new Date()) / 1000).toString()}3a446431d`,
      })
    }, 500)
  },
})
