import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'

const app = getApp();
// debugger;
const defaults = {
    value: '',
    options: [],
    multiple: false,
    max: -1,
    toolbar: {
        title: '请选择',
        cancelText: '取消',
        confirmText: '确定',
    },
    onChange() {},
    onConfirm() {},
    onCancel() {},
}

const getSelectIndex = ({ value = '', options = [], multiple = false }) => {
    const origins = options.map((n) => n.value || n)

    if (!multiple) {
        return origins.indexOf(value)
    }

    return (value || []).map((n) => origins.indexOf(n))
}

Component({
    data: {
      wHeight: '',
      
    },
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: mergeOptionsToData(defaults),
    methods: {
        /**
         * 打开
         */
        open(opts = {}) {
            // debugger
            // 此处曾置为全屏显示，后又去掉了
            // this.setData({
            //   wHeight: (app.globalData.winHeight - 88) + 'px'
            // })
            // debugger
            this.setData({
              wHeight: opts.maxHeight
            });
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts, {
                max: parseInt(opts.max),
            }))
            const index = getSelectIndex(options)
            
            this.$$setData({ visible: true, ...options, index })
        },
        /**
         * 关闭
         */
        close(callback) {
            this.$$setData({ visible: false })

            if (typeof callback === 'function') {
                const { value, index, options } = this.data
                callback.call(this, value, index, options)
            }
        },
        /**
         * 点击确定按钮时的回调函数
         */
        onConfirm() {
          // debugger
          //   setTimeout(() => {
              this.close(this.fns.onConfirm)
            // },500)
        },
        /**
         * 点击取消按钮时的回调函数
         */
        onCancel(e) {
            this.close(this.fns.onCancel)
        },
        /**
         * checkbox change 事件触发的回调函数
         */
        onCheckboxChange(e) {
            const oldValue = this.data.value
            const { value: newValue, checked } = e.detail
            // debugger
            // const value = checked ? [...oldValue, newValue] : oldValue.filter((n) => n !== newValue)
            // const value = checked ? [newValue] : oldValue.filter((n) => n !== newValue)
            const value = checked ? [newValue] : oldValue;
            const index = getSelectIndex({ ...this.data, value })
            // debugger
            this.onChange(value, index)
        },
        /**
         * radio change 事件触发的回调函数
         */
        onRadioChange(e) {
            const { value, index } = e.detail
            
            this.onChange(value, index)
        },
        /**
         * 选择完成后的回调函数
         */
        onChange(value, index) {
            const { options, max, multiple } = this.data

            // 限制最多选择几项
            if (multiple && max >= 1 && max < value.length) return

            this.$$setData({ value, index })

            if (typeof this.fns.onChange === 'function') {
                this.fns.onChange.call(this, value, index, options)
            }

            // 点击后直接跳转
            this.onConfirm();
        },
    },
})