// pages/category/category.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      leftList:[],
      rightList:[],
      currentIndex:0,
      scrollTop:0
  },
      cateList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates=wx.getStorageSync("cates")
    if(!cates){
      this.getCateList()
    }else{
      if(Date.now()-cates.time >=1000*300)
      {this.getCateList()
      }else{
        this.cateList=cates.data
        let leftList=this.cateList.map(item =>item.cat_name)
        let rightList=this.cateList[0].children
        this.setData({
          leftList,
          rightList
        })
        }
    }
  },
getCateList(){
  request({url:"/categories"}).then(result =>{
      this.cateList=result.data.message;
      wx.setStorageSync("cates",{time:Date.now(),data:this.cateList})
      let leftList=this.cateList.map(item =>item.cat_name)
      let rightList=this.cateList[0].children
      this.setData({
        leftList,
        rightList
      })
  }).catch((err)=>{
        console.log(err)
        })
},
getItemActive(e){
  let {index}=e.currentTarget.dataset
  let rightList=this.cateList[index].children
  this.setData({
    currentIndex:index,
        rightList,
        scrollTop:0
  })
}
})