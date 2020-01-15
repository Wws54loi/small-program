// pages/goods_list/goods_list.js
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
		tabs:[
			{
				id:0,
				name:"综合",
				isActive:true
			},
			{
				id:1,
				name:"销量",
				isActive:false
			},
			{
				id:2,
				name:"价格",
				isActive:false
			}
		],
		goodsList:{},
  },
  paramsQuery:{
  	query:"",
  	cid:"",
  	pagenum:1,
  	pagesize:10
  },
  		totalPages:0,
  handletabsItemChange(e) {
	  const {index}=e.detail
	  let {tabs}=this.data
	  tabs.forEach((v,i)=>i===index? v.isActive=true:v.isActive=false)
	  this.setData({
		  tabs
	  })
  },
async getGoodsList() {
	const {data:res} =await request({url:"/goods/search",data:this.paramsQuery})
	console.log(res)
	this.totalPages=Math.ceil(res.message.total/this.paramsQuery.pagesize)
        this.setData({
            goodsList:[...this.data.goodsList,...res.message.goods],
			// totalPages:Math.ceil(res.message.total/this.paramsQuery.pagesize)
           })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.paramsQuery.cid=options.cid;
	  this.getGoodsList()
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
      this.setData({
        goodsList:[]
      })
      this.paramsQuery.pagenum=1
      this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
	  console.log(this.totalPages)
		if(this.paramsQuery.pagenum>=this.totalPages){
			wx.showToast({
        title: '没有下一页'})
		}else{
			this.paramsQuery.pagenum++;
			 this.getGoodsList()
		}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})