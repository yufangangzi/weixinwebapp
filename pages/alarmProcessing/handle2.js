// pages/alarmProcessing/alarmProcessing.js
//获取应用实例
import { $wuxDialog, $wuxToast, $wuxLoading } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');

const getCtx = (selector, ctx = getCurrentPages()[getCurrentPages().length - 1]) => {
  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    throw new Error('无法找到对应的组件，请按文档说明使用组件')
  }

  return componentCtx
}
const $wuxSelect = (selector = '#wux-select', ctx) => getCtx(selector, ctx);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    uploadUrl: util.baseUrl + 'picture/upload',
    suggestCheckList2: [],
    repairPeopleList: [],
    isSelectNo: false,
    isSelectOther: false,
    title1: '',
    value1: [],
    title2: '',
    value2: '',
    value4: '1',
    value5: [],
    value6: '',
    value7: '',
    sugggestArray: [
      // {
      //   name: '不平衡',
      //   id: '1',
      // },
      // {
      //   name: '不对中',
      //   id: '2',
      // },
      // {
      //   name: '轴承磨损',
      //   id: '3',
      // },
      // {
      //   name: '其他',
      //   id: '4',
      // }
    ]
  },

  onImgChange(e) {
    console.log('onChange', e)
    // const { file } = e.detail
    // if (file.status === 'done') {
    //   this.setData({
    //     imageUrl: file.url,
    //   })
    // }
  },
  onImgSuccess(e) {
    console.log('onSuccess', e)
    const { fileList } = e.detail
    this.setData({
      fileList: fileList,
    })
  },
  onImgFail(e) {
    console.log('onFail', e)
  },
  onImgComplete(e) {
    console.log('onComplete', e)
    // wx.hideLoading()
  },
  onImgPreview(e) {
    console.log('onPreview', e)
    // debugger
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onImgRemove(e) {
    // debugger
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },

  onChange(field, e) {
    this.setData({
      [field]: e.detail.value
    })

    if(e.detail.value==2){
      this.setData({
        isSelectNo: true
      })
    }else{
      this.setData({
        isSelectNo: false
      })
    }

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  onChange4(e) {
    this.onChange('value4', e)
  },

  onChange2(field, e) {
    const { value } = e.detail
    const data = this.data[field]
    const index = data.indexOf(value)
    const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

    this.setData({
      [field]: current,
    })
    // console.log(this.data.value5.find(v => v == 4))
    if (this.data.value5.find(v => v == 4)){
      this.setData({
        isSelectOther: true,
      })
    }else{
      this.setData({
        isSelectOther: false,
      })
    }

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  onChange5(e) {
    this.onChange2('value5', e)
  },
  onClick1() {
    let options = this.data.suggestCheckList2;
    // debugger
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      multiple: true,
      toolbar: {
        title: '请选择故障名称',
        confirmText: '确定',
      },
      options: options,
      // options: [{
      //   title: '画画',
      //   value: '1',
      //   // color: 'positive',
      // },
      // {
      //   title: '打球',
      //   value: '2',
      //   // color: 'positive',
      // },
      // {
      //   title: '唱歌',
      //   value: '3',
      //   // color: 'positive',
      // },
      // {
      //   title: '游泳',
      //   value: '4',
      //   // color: 'positive',
      // },
      // {
      //   title: '健身',
      //   value: '5',
      //   // color: 'positive',
      // },
      // {
      //   title: '睡觉',
      //   value: '6',
      //   // color: 'positive',
      // },
      // ],
      onChange: (value, index, options) => {
        console.log('onChange', value, index, options)
        this.setData({
          value1: value,
          title1: index.map((n) => options[n].title),
        })
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        this.setData({
          value1: value,
          title1: index.map((n) => options[n].title),
        })
      },
    })
  },

  onClick2() {
    let options = this.data.repairPeopleList;
    $wuxSelect('#wux-select2').open({
      value: this.data.value2,
      // multiple: true,
      toolbar: {
        title: '请选择指派人员',
        confirmText: '确定',
      },
      options: options,
      // options: [{
      //   title: '张三',
      //   value: '1',
      //   // color: 'positive',
      // },
      // {
      //   title: '李四',
      //   value: '2',
      //   // color: 'positive',
      // },
      // {
      //   title: '王五',
      //   value: '3',
      //   // color: 'positive',
      // },
      // {
      //   title: '赵六',
      //   value: '4',
      //   // color: 'positive',
      // },
      // {
      //   title: '刘名',
      //   value: '5',
      //   // color: 'positive',
      // },
      // {
      //   title: '朱八',
      //   value: '6',
      //   // color: 'positive',
      // },
      // ],
      onChange: (value, index, options) => {
        console.log('onChange', value, index, options)
        this.setData({
          value2: value,
          title2: options[index].title,
        })
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        this.setData({
          value2: value,
          title2: options[index].title,
        })
      },
    })
  },

  onChange6(e) {
    const v = e.detail.value;
    this.setData({
      value6: v
    });
  },
  onBlur6(e) {
    const v = e.detail.value;
    this.setData({
      value6: v
    });
  },

  onChange7(e) {
    const v = e.detail.value;
    this.setData({
      value7: v
    });
  },
  onBlur7(e) {
    const v = e.detail.value;
    this.setData({
      value7: v
    });
  },

  open2Page(){
    // util.openPage("../../pages/alarmProcessingResult/index");
    // debugger
    let flag_1 = true;
    let acceptIds = this.data.value5.filter(v => v!=4);//.map(v => v[0]);
    if (!(acceptIds && Array.isArray(acceptIds) && acceptIds.length > 0)) {
      flag_1 = false;
    }

    let flag_2 = true;
    let newFaultIds = this.data.value1;
    if (!(this.data.isSelectOther && newFaultIds && Array.isArray(newFaultIds) && newFaultIds.length > 0)) {
      flag_2 = false;
    }

    if (this.data.value4==1 && !(flag_1 || flag_2)) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '请勾选故障名称',
        success: () => console.log('请勾选故障名称')
      })
      return;
    }
    // if (!this.data.title2) {
    //   $wuxToast().show({
    //     type: 'forbidden',
    //     duration: 1000,
    //     color: '#f66',
    //     text: '请选择维修人员',
    //     success: () => console.log('请选择维修人员')
    //   })
    //   return;
    // }
    const faultInfoVOList = wx.getStorageSync('faultInfoVOList') || [];
    acceptIds = acceptIds.map(p => {
      let m = faultInfoVOList.find(v => {
        return v.id == p;
      });
      if (m) {
        return m.otherId;
      }
    });
    newFaultIds.push(...acceptIds);
    acceptIds = [];
    let param = {
      id: wx.getStorageSync('repairId'),
      newFaultIds: newFaultIds,
      acceptIds: acceptIds,
      processStatus: 1
    };
    // debugger;
    param.processResult = this.data.value7;
    param.remark = this.data.value6;
    param.reportStatus = this.data.value4==1 ? 1 : 0;
    param.deviceCode = wx.getStorageSync('deviceCode') || '';
    // 新增提交字段
    let stepList = wx.getStorageSync('stepList') || '';
    param.faultPerformance = stepList+ '\n\n' + param.remark;
    // 添加图片
    try{
      param.picUrl = this.data.fileList.map(v => {return JSON.parse(v.res.data).result[0] }).join(',');
    }catch(e){

    }
    if (param.reportStatus == '0') {
      delete param.processResult;
      delete param.remark;
      delete param.acceptIds;
      delete param.picUrl;
    }
    // console.log(param);
    // return;
    //
    util.dealDeviceAlarm(param, res => {
      // debugger;
      // return;
      if (res.code === 0) {
        $wuxToast().show({
          type: 'text',
          duration: 1000,
          color: '#f66',
          text: '操作成功!',
          success: () => {
            app.globalData.listReload = true;
            let url = "../../pages/alarmProcessingResult/success";
            wx.redirectTo({
              url: url
            });
          }
        });
      } else if (res.code === 4) {
        wx.showModal({
          title: '提示',
          content: res.msg,
          success: (r) => {
            if(r.confirm){
              app.globalData.detailReload = true;
              app.globalData.listReload = true;
              wx.navigateBack();
            }

          }
        })
      }
    }, err => {

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let suggestCheckList1 = wx.getStorageSync('suggestCheckList1')
    let suggestCheckList2 = wx.getStorageSync('suggestCheckList2')
    let repairPeopleList  = wx.getStorageSync('repairPeopleList')
    if(suggestCheckList1){
      suggestCheckList1 = JSON.parse(suggestCheckList1);
      suggestCheckList1 = suggestCheckList1.map(v => {return { name: v.faultName, id: v.id }});
      suggestCheckList1.push({
        name: '其他',
        id: '4',
      });
    // debugger;

      this.setData({
        sugggestArray: suggestCheckList1
      })
    }

    if (suggestCheckList2) {
      suggestCheckList2 = JSON.parse(suggestCheckList2);
      suggestCheckList2 = suggestCheckList2.map(v => { return { title: v.label, value: v.value } });
      // debugger;

      this.setData({
        suggestCheckList2: suggestCheckList2
      })
    }

    if (repairPeopleList) {
      repairPeopleList = JSON.parse(repairPeopleList);
      repairPeopleList = repairPeopleList.map(v => { return { title: v.label, value: v.value } });
      // debugger;

      this.setData({
        repairPeopleList: repairPeopleList
      })
    }

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