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
    tickesArr: [
      {
        icon: '月票',
        title: '19号线锦绣',
        fromA: '锦绣',
        fromB: 'IBM',
        month: '',
        hours: '',
        id: 0,
      },
      {
        icon: '月票',
        title: '1号线锦绣',
        fromA: '',
        fromB: '',
        month: '',
        hours: '',
        id: 1,
      },
      {
        icon: '月票',
        title: '2号线锦绣',
        fromA: '',
        fromB: '',
        month: '',
        hours: '',
        id: 2,
      },
      {
        icon: '月票',
        title: '3号线锦绣',
        fromA: '',
        fromB: '',
        month: '',
        hours: '',
        id: 3,
      },
    ],
  },
  onReady: function () {
    this.getTime()
    this.getMonth()
  },
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
    this.data.tickesArr.forEach((val, index) =>
      this.setData({
        workTimeText: that.data.workTimeTextArr[event.detail.index],
        [`tickesArr[${index}].hours`]: that.data.actions[event.detail.index]
          .name,
      })
    )
    Toast({
      message: '已修改上班时间',
      position: 'bottom',
    })
  },
  getMonth() {
    var that = this
    this.data.tickesArr.forEach((val, index) =>
      this.setData({
        [`tickesArr[${index}].month`]: util.formatNumber(
          new Date().getMonth() + 1
        ),
        [`tickesArr[${index}].hours`]: that.data.actions[0].name,
      })
    )
  },
  onClose(event) {
    const { instance } = event.detail;
    instance.close();
  },
  onClickClose(event){
    const index = event.currentTarget.dataset.idx;    
    this.data.tickesArr.splice(index,1);
    const tickesArrSplice = this.data.tickesArr
    this.setData({
      tickesArr: tickesArrSplice
    })
  }
})
