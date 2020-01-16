export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const openSetting=()=>{
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const chooseAddress=()=>{
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content:content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const showToast = ({ title },{icon}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title:title,
        icon:icon,
      mask: true,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}