// pages/cart/cart.js
import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../request/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allCheck: false,
    totalPrice: 0,
    totalNum: 0
  },
  getCartGoods() {
    let cart = wx.getStorageSync("cart") || []
    let totalPrice = 0;
    let totalNum = 0;
    let allCheck = true
    cart.forEach(v => {
      if (v.isSelect) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allCheck = false;
      }
    })
    if (cart.length === 0) allCheck = false;
    this.setData({
      cart,
      allCheck,
      totalPrice,
      totalNum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartGoods()
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
    const address = wx.getStorageSync("address")
    this.setData({
      address
    })
    this.getCartGoods()
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