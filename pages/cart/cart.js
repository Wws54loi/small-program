// pages/cart/cart.js
import { getSetting, openSetting, chooseAddress, showModal, showToast} from "../../request/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allCheck:false,
    totalPrice:0,
    totalNum:0
  },
 async getAddress(){
   const res1 = await getSetting();
   if (res1.authSetting["scope.address"] === false) {
    wx.showModal ({
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
     const res3 =await chooseAddress()
     wx.setStorageSync("address", res3)
   }
 },
 getCartGoods(){
   let cart = wx.getStorageSync("cart")||[]
   let totalPrice=0;
   let totalNum=0;
   let allCheck=true
   cart.forEach(v=>{
     if(v.isSelect){
       totalPrice += v.num * v.goods_price
       totalNum +=v.num
     }else{
       allCheck=false;
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
  handleItemChange(e){
    let cart=this.data.cart
    const goods_id = e.currentTarget.dataset.index
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].isSelect = !cart[index].isSelect;
    this.setData({
      cart
    })
    wx.setStorageSync("cart", cart)
    this.getCartGoods()
  },
  handleAllSelect(){
    let cart=this.data.cart;
    cart.map(v => v.isSelect = !v.isSelect)
    this.setData({
      cart
    })
    wx.setStorageSync("cart", cart)
    this.getCartGoods()
  },
  handleAdd(e){
    let cart = this.data.cart;
    const goods_id = e.currentTarget.dataset.index
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].num++;
    this.setData({
      cart
    })
    wx.setStorageSync("cart", cart)
    this.getCartGoods()
  },
  async handleReduce(e) {
    let cart = this.data.cart;
    const goods_id = e.currentTarget.dataset.index
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].num--;
    if (cart[index].num<1){
      cart[index].num=1
      const res = await showModal({content:"您是否要删除"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setData(
          { cart }
        )
      }
    }
    this.setData({
      cart
    })
    wx.setStorageSync("cart", cart)
    this.getCartGoods()
  },
  toPay(){
    const address =this.data.address
    const totalNum =this.data.totalNum
    if (!address.userName){
     const res =showToast({title:"您还没选择地址"},{icon:"none"})
    } else if (totalNum===0){
      const res = showToast({ title: "您还没选择商品" }, { icon: "none" })
    }else{
      wx.navigateTo({
        url: '/pages/pay/pay'
      })
    }
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