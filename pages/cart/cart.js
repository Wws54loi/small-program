// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // authSetting.scope.address
    // wx.showModal({
    //   content: '检测到您没打开美团外卖的定位权限，是否去设置打开？',
    //   confirmText: "确认",
    //   cancelText: "取消",
    //   success: function (res) {
    //     console.log(res);
    //     //点击“确认”时打开设置页面
    //     if (res.confirm) {
    //       console.log('用户点击确认')
    //       wx.openSetting({
    //         success: (res) => { }
    //       })
    //     } else {
    //       console.log('用户点击取消')
    //     }
    //   }
    // });
  },
  openSetting() { wx.openSetting() },
  getAddress(){
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.address"] ===false){
         wx.showModal({
           content: '检测到您没打开购物平台的定位权限，是否去设置打开？',
           success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => { }
          })
        } else {
          console.log('用户点击取消')
        }
           }
         })
        }else{
          wx.chooseAddress({
            success: function (res) { }
          })
        }
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