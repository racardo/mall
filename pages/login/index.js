// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handlegGetUserInfo(e){
    //console.log(e);
    const {userInfo} = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    //console.log(userInfo);
    
    wx.navigateBack({
      delta: 1
    });
      
      
    
  }
})