let loadingNum = 0
export const request=(params)=>{
  loadingNum++
  const baseUrl="https://api.zbztb.cn/api/public/v1"
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve,reject) =>{
     wx.request({
       ...params,
       url:baseUrl+params.url,
       success:(result)=>{
         resolve(result)
       },
       fail:(err)=>{
         reject(err)
       },
	   complete:()=>{
		   loadingNum--
		   if(loadingNum===0){
			   wx.hideLoading()
		   } 
	   }
     })
  })
}