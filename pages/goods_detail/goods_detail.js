// pages/goods_detail/goods_detail.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsObj:{}
  },
  goodsInfo:{},
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: '/goods/detail',data:{goods_id}})
    this.goodsInfo=goodsObj.data.message;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.data.message.goods_name,
        goods_price: goodsObj.data.message.goods_price,
        pics: goodsObj.data.message.pics,
        goods_introduce: goodsObj.data.message.goods_introduce
      }
    })
  },
  handlePreviewImage(e){
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    console.log(e)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handleAddCart(){
    console.log(this.goodsInfo)
    let cart =wx.getStorageSync("cart")||[];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if(index===-1){
      this.goodsInfo.num=1
      cart.push(this.goodsInfo)
    }else{
        cart[index].num++;
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goodsId}=options;
    console.log(goodsId)
    this.getGoodsDetail(goodsId)
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