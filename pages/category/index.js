// pages/category/index.js
//引入发送请求的方法
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧导航栏数据
    leftMenuList:[],
    //右侧数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧导航栏距离顶部距离 
    scrollTap:0
  },
  // 存放接口数据
  Cates:[],
  //左侧菜单点击事件
  handelItemTap(e){
    //console.log(e)
    //1.获取被点击标题的索引
    //2.在data中给currentIndex赋值
    const {index} = e.currentTarget.dataset;
    //根据对应的索引获取右侧数据
    let rightContent = this.Cates[index].children;
    //重置右侧菜单点击距离顶部的距离
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTap:0
    })

  },

  //获取分类数据
  getCates(){
    request({url:"/categories"})
    .then(result=>{
      //console.log(result);
      this.Cates=result.data.message;
      // 把接口的数据存入到本地存储中
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      //构造左侧导航栏数据
      //.map 将原数组映射成一个新的数组
      // 遍历数组把 cat_name 的值取出来给leftMenuList
      let leftMenuList =  this.Cates.map(v=>v.cat_name);
      //构造右侧数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
    0 web中的本地存储和 小程序中的本地存储的区别
      1 写代码的方式不一样了 
        web: localStorage.setItem("key","value") localStorage.getItem("key")
    小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
      2:存的时候 有没有做类型转换
        web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
      小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
    1 先判断一下本地存储中有没有旧的数据
      {time:Date.now(),data:[...]}
    2 没有旧数据 直接发送新请求 
    3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
     */
    //使用本地缓存
    const Cates = wx.getStorageSync("cates");
    //如果没有本地缓存 则发送请求获取数据
    if(!Cates){
      this.getCates();
    }else{
      //设置缓存过期时间 5分钟
      if(Date.now()-Cates.time>1000*60*5){
        this.getCates();
      }else{
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
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