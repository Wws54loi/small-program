//index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList:[],
    navList:[],
    floorList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success:result => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   } 
    // })
    this.getSwiperList()
    this.getNavList()
     this.getFloorList()
        },
    async getSwiperList(){
     const {data:res} = await request({url:"/home/swiperdata"})
        this.setData({
            swiperList:res.message
           })
    },
    getNavList(){
      request({url:"/home/catitems"}).then(result=>{
          this.setData({
            navList:result.data.message
          })
        })
      },
      getFloorList(){
        request({url:"/home/floordata"}).then(result=>{
            this.setData({
              floorList:result.data.message
            })
          })
        },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
