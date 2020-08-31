/**
 * 使用Promise封装wx.getSetting
 * 
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}

/**
 * 使用Promise封装wx.openSetting
 * 
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}

/**
 * 使用Promise封装wx.chooseAddress
 * 
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}
/**
 * 使用Promise封装wx.chooseAddress
 * @param {object} param0 参数
 */
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
          
    })
}


/**
 *  promise 形式  showToast
 * @param {object} param0 参数
 */
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
      wx.showToast({
        title: title,
        icon: 'none',
        success :(res) =>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err);
        }
      })
    })
  }