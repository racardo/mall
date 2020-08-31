// pages/search/index.js
//引入发送请求的方法
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //轮播图数组
      swiperList:[],
      //导航栏数组
      catesList:[],
      //楼层数组
      floorList:[]
  },
  //获取轮播图函数
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
          this.setData({
          swiperList:result.data.message
        })
    })
  },
  //获取导航栏函数
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
          this.setData({
            catesList:result.data.message
        })
    })
  },
  //获取楼层函数
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
          this.setData({
            floorList:result.data.message
        })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求 获取轮播图数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   //请求失败执行的代码块
    //   fail: () => {},
    //   //最终会执行的代码块
    //   complete: () => {}
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
    
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})