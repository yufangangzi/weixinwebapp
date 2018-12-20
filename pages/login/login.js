// pages/login/login.js
import { $wuxToast } from '../../dist/wux/dist/index'
const app = getApp();
const imgUrl = app.globalData.imgUrl;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    pwd: '',
    logUrl: imgUrl+"log.png",
    loginimg1: imgUrl +"login1.png",
    loginimg2: imgUrl +"login2.png",
    loginbg: imgUrl +"loginbg.png",
    pageHidden: true
  },
  onChange(e) {
    const userName = e.detail.value;
    // if(!userName){
    //   $wuxToast().show({
    //     type: 'forbidden',
    //     duration: 1500,
    //     color: '#f66',
    //     text: '手机号不能为空',
    //     success: () => console.log('服务异常稍后再试')
    //   })
    //   return;
    // }
    // if (!/^(1[358][0-9]{9})$/.test(userName)){
    //   console.log('手机号不合法')
    //   $wuxToast().show({
    //     type: 'forbidden',
    //     duration: 1000,
    //     color: '#f66',
    //     text: '手机号不合法',
    //     success: () => console.log('服务异常稍后再试')
    //   })
    //   return;
    // }
    this.setData({
      userName: userName
    });
  },
  onFocus(e) {
  },
  onBlur(e) {
    const userName = e.detail.value;
    this.setData({
      userName: userName
    });
  },
  onChangePwd(e) {
    const pwd = e.detail.value;
    // if (!pwd) {
    //   $wuxToast().show({
    //     type: 'forbidden',
    //     duration: 1000,
    //     color: '#f66',
    //     text: '密码不能为空',
    //     success: () => console.log('服务异常稍后再试')
    //   })
    //   return;
    // }
    // if (pwd.length<6) {
    //   $wuxToast().show({
    //     type: 'forbidden',
    //     duration: 1000,
    //     color: '#f66',
    //     text: '密码至少6位',
    //     success: () => console.log('服务异常稍后再试')
    //   })
    //   return;
    // }
    this.setData({
      pwd: pwd
    });
  },
  onFocusPwd(e) {

  },
  onBlurPwd(e) {
    const pwd = e.detail.value;
    this.setData({
      pwd: pwd
    });
  },

  // 登陆接口
  open2Page() {
    debugger;
    var that = this;
    // util.wxlogin({}, res => {
    //   if(res.code===0){
    //     util.openPage("../../pages/alarmProcessing/detail");
    //   }else if(res.code==400){

    //   }
    // });
    let param = {};
    param.phone = this.data.userName;
    param.pwd = this.data.pwd;

    const userName = param.phone;
    if (!userName) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '手机号不能为空',
        success: () => console.log('服务异常稍后再试')
      })
      return;
    }
    if (!/^(1[358][0-9]{9})$/.test(userName)) {
      console.log('手机号不合法')
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '手机号不合法',
        success: () => console.log('服务异常稍后再试')
      })
      return;
    }

    const pwd = param.pwd;
    if (!pwd) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '密码不能为空',
        success: () => console.log('服务异常稍后再试')
      })
      return;
    }
    if (pwd.length < 6) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '密码至少6位',
        success: () => console.log('服务异常稍后再试')
      })
      return;
    }

    
      param.openId = app.globalData.openId;
      util.wxbind(param, res => {
        // debugger;
        if(res.code===200){
          $wuxToast().show({
            type: 'text',
            duration: 1000,
            color: '#f66',
            text: res.msg || '绑定成功!',
            success: () => {
              util.wxlogin({}, res => {
                if (res.result && res.result.openId) {
                  app.globalData.openId = res.result.openId;
                }
                if (res.code === 0) {
                  app.globalData.islogined = true;
                  app.globalData.userInfo = res.result.user;
                  app.globalData.token = res.result.token;
                  wx.setStorageSync('token', res.result.token);
                  app.globalData.islogined = true;

                  util.openPage("../../pages/alarmProcessing/detail");
                } else if (res.code == 50001) {
                  console.log(res.msg);
                  app.globalData.islogined = false;
                  util.openPage("../../pages/login/login");
                }
              });
            }
          })
        }else{
          $wuxToast().show({
            type: 'forbidden',
            duration: 1000,
            color: '#f66',
            text: res.msg,
            success: () => console.log('服务异常稍后再试')
          })
        }
      });
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageHidden: app.globalData.islogined
    })
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