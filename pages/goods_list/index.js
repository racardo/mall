// pages/goods_list/index.js
//引入发送请求的方法
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    //商品列表
    goodsList:[

    ]
  },
  //接口要传的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数 默认值为1 
  totalPage:1,

  //监听事件  从子组件传递过来的
  hendleTabsIetmChange(e){
    //console.log(e);
    //获取被点击事件索引
    const {index} =  e.detail;
    //修改源数组  解构赋值 相当于 let tabs = this.data.tabs
    let {tabs} = this.data;
    //循环tabs数组 v是value i是索引
    tabs.forEach((v,i)=>{i===index?v.isActive=true:v.isActive=false});
    //赋值到data中
    this.setData({
      tabs
    })
    
  },

  //获取商品列表
  getGoodsList(){
    request({url:"/goods/search",data:this.QueryParams})
    .then(result=>{
      //console.log(result);
      //获取总条数  解构赋值 相当于 const total = result.data.message.total
      const {total} = result.data.message
      this.totalPage = Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        //goodsList :result.data.message.goods
        //拼接数组
        goodsList:[...this.data.goodsList,...result.data.message.goods]
      })
      
    })
    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.QueryParams.cid= options.cid;
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList();
    
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
    //判断是否有下一页数据
    if(this.QueryParams.pagenum >= this.totalPage){
      //没有下一页数据
      wx.showToast({
        title: '没有下一页数据了'
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 下拉刷新事件 
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.getGoodsList();
  }
})