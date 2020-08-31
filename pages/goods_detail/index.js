// pages/goods_detail/index.js
//引入发送请求的方法
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{

    }
  },
    // 商品对象
  GoodsInfo: {},
  //获取商品详情
  getGoodsDetail(goods_id){
    request({url:"/goods/detail",data: { goods_id }})
    .then(result=>{
      this.GoodsInfo = result.data.message;
      //console.log(result);
      this.setData({
        goodsObj:result.data.message
      })
    })
  },
    // 点击轮播图 放大预览
    handlePrevewImage(e) {
      // 1 先构造要预览的图片数组 
      const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
      // // 2 接收传递过来的图片url
      const current = e.currentTarget.dataset.url;
      wx.previewImage({
        current,
        urls
      });
    },
      // 点击 加入购物车
  handleCartAdd() {
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //3  不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 4 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取商品id
    const goods_id = options.goods_id;
    //console.log(goods_id);
    this.getGoodsDetail(goods_id);

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