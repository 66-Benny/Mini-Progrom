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
    tickesArr: {},
    linesArr: [
      {
        icon: '月票',
        title: '19号线-锦绣',
        fromA: '锦绣',
        fromB: 'IBM',
        month: '',
        hours: '08:00',
        number: '辽BL1370',
        timeRange: ['07:50', '09:00'],
      },
      {
        icon: '月票',
        title: '27号线-桃源桥',
        fromA: '桃源桥',
        fromB: 'IBM',
        month: '',
        hours: '08:00',
        number: '辽BL1350',
        timeRange: ['08:00', '09:00'],
      },
    ],
  },
  // PANDA:1159062999014a5acb70
  // PANDA:115906296473a446431d
  // PANDA:115909684963a446431d
  onReady: function () {
    // this.getTime()
    this.setData({
      tickesArr: this.data.linesArr[0],
      [`tickesArr.title`]: this.data.linesArr[0].title.replace(/-/, ''),
      [`tickesArr.month`]: util.formatNumber(new Date().getMonth() + 1),
    })
  },
  onShow: function () {
    let height = wx.getSystemInfoSync().windowHeight * 2
    let width = wx.getSystemInfoSync().windowWidth * 2
    this.setData({
      height,
      width,
    })
  },
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
    this.setData({
      workTimeText: this.data.workTimeTextArr[event.detail.index],
      [`tickesArr.hours`]: this.data.actions[event.detail.index].name,
    })
    Toast({
      message: '已修改上班时间',
      position: 'bottom',
    })
  },
  getMonth() {
    this.setData({
      [`tickesArr.month`]: util.formatNumber(new Date().getMonth() + 1),
    })
    // var that = this
    // this.data.linesArr.forEach((val, index) =>
    //   this.setData({
    //     [`linesArr[${index}].month`]: util.formatNumber(
    //       new Date().getMonth() + 1
    //     ),
    //     [`linesArr[${index}].hours`]: that.data.actions[0].name,
    //   })
    // )
  },
  onClickClose(event) {
    const index = event.currentTarget.dataset.idx
    this.data.tickesArr.splice(index, 1)
    const tickesArrSplice = this.data.tickesArr
    this.setData({
      tickesArr: tickesArrSplice,
    })
  },
  onClickSelect(event) {
    const index = event.currentTarget.dataset.idx
    this.setData({
      tickesArr: this.data.linesArr[index],
      [`tickesArr.month`]: util.formatNumber(new Date().getMonth() + 1),
      _tapSort: 1,
    })
  },
  onClickQRcode() {
    wx.navigateTo({
      url:
        '/pages/myQRcode/myQRcode?QRcodeInfo=' +
        JSON.stringify(this.data.tickesArr),
    })
  },
})
