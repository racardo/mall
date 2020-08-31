// pages/cart/index.js
import {getSetting,openSetting,chooseAddress,showModal,showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{

    },
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  //获取收货地址
  handleChooseAddress(){
    // wx.chooseAddress({
    //   success: (result) => {
    //     console.log(result);
        
    //   }
     
    // });
    console.log("获取收货地址");
    
    //获取用户权限
    // wx.getSetting({
    //   success: (result) => {
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if(scopeAddress===true||scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1);
    //         }
    //       });  
    //     }else{
    //       //用户拒绝过授权 先诱导用户打开授权页面
    //       wx.openSetting({
    //         success: (result2) => {
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3);
    //             }
    //           }); 
    //         }
    //       });
            
    //     }
    //   }
    // });
    //获取用户授权
    getSetting()
    //成功获取用户授权
    .then(result=>{
      const scopeAddress = result.authSetting["scope.address"];
      console.log(scopeAddress);
      
      //如果用户已经授权
      if(scopeAddress===true||scopeAddress===undefined){
        //获取用户地址
        chooseAddress()
        .then(result=>{
          let address = result;
          console.log(address);
          //存入到缓存中
          wx.setStorageSync("address", address);
          
        })
      }
      else{
        //用户拒绝过授权 先诱导用户打开授权页面
        openSetting()
        .then(result=>{
          //成功打开用户授权
          chooseAddress(result=>{
            let address = result;
            console.log(address);
            //存入到缓存中
            wx.setStorageSync("address", address);
          });
        })
        .catch(err=>{
          //未成功打开用户授权
          console.log(err);
        })
      }
    })
    
    
    
    
    
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //获取缓存中的地址信息
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    console.log(cart);
    this.setData({ address });
    this.setCart(cart);
    
    //every 数组遍历方法 会接收一个回调函数 每一个回调函数都返回true every方法才会返回true 
    //有一项不为true  every方法返回false
    //const allChecked = cart.length?cart.every(v=>v.checked):false;
    //console.log(allChecked);
    // let allChecked = true;
    // let totalPrice = 0;
    // let totalNum = 0;
    
    // cart.forEach(v=>{
    //   if(v.checked){
    //     //总价格
    //     totalPrice += v.num * v.goods_price;
    //     //总数量
    //     totalNum+=v.num;
    //   }else{
    //     allChecked=false
    //   }
    // })
    // //判断数组是否为空
    // allChecked = cart.length!=0?allChecked:false;
    // this.setData({
    //   //地址
    //   address,
    //   //购物车缓存
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })

  },
  // 商品的选中
  handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let { cart } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);

  },

  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  //商品对的选中点击事件
  handleItemAllCheck(e){
        //  获取data中的数据
        let { cart, allChecked } = this.data;
        //  修改值
        allChecked = !allChecked;
        //  循环修改cart数组 中的商品选中状态
        cart.forEach(v => v.checked = allChecked);
        //  把修改后的值 填充回data或者缓存中
        this.setCart(cart);
  },
  // 商品数量的编辑功能
  handleItemNumEdit(e) {
    //  获取传递过来的参数 
    const { operation, id } = e.currentTarget.dataset;
    //  获取购物车数组
    let { cart } = this.data;
    //  找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 判断是否需要删除
    if (cart[index].num === 1 && operation === -1){
      // wx.showModal({
      //   title: '提示',
      //   content: '您是否要删除',
      //   showCancel: true,
      //   cancelText: '取消',
      //   cancelColor: '#000000',
      //   confirmText: '确定',
      //   confirmColor: '#3CC51F',
      //   success: (result) => {
      //     //用户点击确认
      //     if (result.confirm) {
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     } else if(result.cancel){
      //       console.log("用户点击取消")
            
      //     }
      //   }
      // });
      showModal({content:"您是否要删除"})
      .then(result=>{
        cart.splice(index, 1);
        this.setCart(cart);
      })
        
    }else{
       //  进行修改数量
      cart[index].num += operation;
      //  设置回缓存和data中
      this.setCart(cart);
    }
   
    
  },
    // 点击 结算 
  handlePay(){
    //  判断收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      showToast({title:"您还没有选择收货地址"})
      
     
      return;
    }
    //  判断用户有没有选购商品
    if(totalNum===0){
      showToast({title:"您还没有选购商品"})
      
      return ;
    }
    //  跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  }

})

