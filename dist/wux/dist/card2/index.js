// var WxParse = require('../../../wxParse/wxParse.js');
Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    properties: {
        bordered: {
            type: Boolean,
            value: false,
        },
        full: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
        thumb: {
            type: String,
            value: '',
        },
        thumbStyle: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        extra2: {
          type: String,
          value: '',
        },
    },
    // attached() {
    //   // debugger
    //   var that = this;
    //   let extra = this.properties.extra;
    //   // if(extra)
    //   WxParse.wxParse('extra', 'html', extra, that, 5);
    //   console.log('this.properties', this.properties);
    // }
})