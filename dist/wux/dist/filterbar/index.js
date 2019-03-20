import baseBehavior from '../helpers/baseBehavior'
import { $wuxBackdrop } from '../index'

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        items: {
            type: Array,
            value: [],
        },
    },
    methods: {
        /**
         * 重置按钮
         * @param {Object} e 事件对象
         * @param {Object} prevState 上一个状态值 
         */
        onReset(e, prevState) {
            const { index, item } = e.currentTarget.dataset
            const children = prevState && prevState.children || item.children.map((n) => {
                return Object.assign({}, n, {
                    children: n.children.map((m) => Object.assign({}, m, {
                        checked: false,
                    })),
                    selected: '',
                })
            })
            const filterk1 = wx.getStorageSync('filterArr');
            let k2 = filterk1.map(item => {
                  return {
                    label: item,
                    value: item
                  };
            });
          if (wx.getStorageSync('selFlag') === 0){
              this.$$setData({
                [`items[${index}].children`]: children,
                'items[0].children[1].children': k2
              })
          }else if (wx.getStorageSync('selFlag') === 1){ //filter
            this.$$setData({
              [`items[${index}].children`]: children,
              'items[4].children[3].children': k2
            })}
           //debugger
          // this.$$setData({
          //   [`items[${index}].children`]: children,
          //   'items[4].children[3].children': filterk1
          // })

        },
        /**
         * 关闭侧边栏筛选框
         * @param {Object} e 事件对象
         * @param {Function} callback 回调函数
         */
        onClose(e, callback) {
            const { index } = e.currentTarget.dataset
            const params = {
                [`items[${index}].visible`]: false,
            }

            this.$$setData(params)
                .then(() => {
                    if (typeof callback === 'function') {
                        callback.call(this, e)
                    } else {
                        this.onReset(e, this.prevState)
                    }

                    this.$wuxBackdrop.release()
                })
        },
        /**
         * 确认按钮
         * @param {Object} e 事件对象
         */
        onConfirm(e) {
            this.onClose(e, this.onChange)
        },
        /**
         * 筛选栏内单项选择触发 change 事件
         * @param {Object} e 事件对象
         */
        onRadioChange(e) {
          
            const { value } = e.detail
            const { index, item, parentIndex } = e.currentTarget.dataset
            const children = item.children.map((n) => Object.assign({}, n, {
                checked: n.value === value,
            }))
            const selected = children.filter((n) => n.checked).map((n) => n.label).join(',')
            this.$$setData({
                [`items[${parentIndex}].children[${index}].children`]: children,
                [`items[${parentIndex}].children[${index}].selected`]: selected,
            })
          if (wx.getStorageSync('selFlag') === 0 ? index === 0 :index === 2){
            var id = children.find(v => { return v.checked }).id; //选中的id
            let deviceNameList = [];
            let a;
            
            if (id) {
              const i = children.findIndex(item => {
                return item.id == id;
              });
              a = children.slice(i, i + 1);
            } else {
              a = children;
            }
            
            // console.log("item-000---" + JSON.stringify(this.properties.items[4].children[2].selected));
           // console.log("item111---" + JSON.stringify(this.properties.items[0].children[0]));
            // this.deviceNameList.splice(0);
            a.map(it => {
              if (Array.isArray(it.menuDeviceList)) {
                let deviceNameListQ = it.menuDeviceList.map(item => {
                  return {
                    // id: item,
                    // value: it.id.toString()
                    label: item,
                    value: item
                  };
                });
                deviceNameList.push(...deviceNameListQ);
                if (wx.getStorageSync('selFlag') === 0) {
                  this.$$setData({
                    'items[0].children[1].children': deviceNameListQ,
                  })
                } else if (wx.getStorageSync('selFlag') === 1) { //filter
                  this.$$setData({
                    'items[4].children[3].children': deviceNameListQ,
                  })
                }
               
              }
            });
            // console.log("item222---" + JSON.stringify(this.properties.items[4].children[3].children));
          }else{
            // conslole.log("0000000000")
          }
     
        },
      
        /**
         * 筛选栏内多项选择触发 change 事件
         * @param {Object} e 事件对象
         */
        onCheckboxChange(e) {
            const { value } = e.detail
            const { index, item, parentIndex } = e.currentTarget.dataset
            const children = item.children.map((n) => Object.assign({}, n, {
                checked: value.includes(n.value),
            }))
            const selected = children.filter((n) => n.checked).map((n) => n.label).join(',')

            this.$$setData({
                [`items[${parentIndex}].children[${index}].children`]: children,
                [`items[${parentIndex}].children[${index}].selected`]: selected,
            })
        },
        /**
         * 下拉框内单项选择触发 change 事件
         * @param {Object} e 事件对象
         */
        radioChange(e) {
            
            const { value } = e.detail
            const { index, item } = e.currentTarget.dataset
            const children = item.children.map((n) => Object.assign({}, n, {
                checked: n.value === value,
            }))
            const params = {
                [`items[${index}].children`]: children,
            }

            this.$$setData(params)
                .then(() => this.onChange())
        },
        /**
         * 下拉框内多项选择触发 change 事件
         * @param {Object} e 事件对象
         */
        checkboxChange(e) {
            const { value } = e.detail
            const { index, item } = e.currentTarget.dataset
            const data = item.children.filter((n) => n.checked).map((n) => n.value)
            const children = item.children.map((n) => Object.assign({}, n, {
                checked: n.value === value ? !data.includes(n.value) : n.checked,
            }))
            const params = {
                [`items[${index}].children`]: children,
            }

            this
                .$$setData(params)
                .then(() => this.onChange())
        },
        /**
         * 点击事件
         * @param {Object} e 事件对象
         */
        onClick(e) {
            const { index } = e.currentTarget.dataset
            this.onOpenSelect(this.data.items, index)
        },
        /**
         * 打开下拉框
         * @param {Array} data 菜单数据
         * @param {Number} index 当前索引
         */
        onOpenSelect(data = [], index = 0) {
            const current = data[index]
            const items = data.map((n, i) => {
                const params = Object.assign({}, n, {
                    checked: index === i ? !n.checked : false,
                })

                // 判断已选择的元素是否同组
                if (n.checked) {
                    const has = this.getDifference(n.groups, current.groups)

                    params.checked = !!has.length

                    // 判断非同组的元素清空选择内容
                    if (index !== i && !has.length) {
                        if (typeof params.children === 'object') {
                            if (['radio', 'checkbox'].includes(n.type)) {
                                params.children = params.children.map((n) => Object.assign({}, n, {
                                    checked: false,
                                }))
                            }

              if (['filter'].includes(n.type)) {
                params.children = params.children.map((n) => {
                  return Object.assign({}, n, {
                    children: n.children.map((m) => Object.assign({}, m, {
                      checked: false,
                    })),
                    selected: '',
                  })
                })
              }
            }

            if (['sort'].includes(n.type)) {
              params.sort = undefined
            }
          }
        }

        // 展开或隐藏下拉框
        if (['radio', 'checkbox', 'filter'].includes(n.type)) {
          params.visible = index === i ? !n.visible : false
          // debugger
          if (n.type === 'filter') {
            this.$wuxBackdrop[index === i ? !n.visible ? 'retain' : 'release' : 'release']()
          }
        }

        // 当前点击排序做出处理
        if (index === i && ['sort'].includes(n.type)) {
          params.sort = typeof params.sort === 'number' ? -params.sort : 1
        }

        return params
      })

      this.$$setData({ items, index }).then(() => {
        this.prevState = current
        if (!['radio', 'checkbox', 'filter'].includes(current.type)) {
          this.onChange()
        }
      })
    },
    /** 
     * 关闭下拉框
     */
    onCloseSelect() {
      const items = this.data.items
      const params = {}

      items.forEach((n, i) => {
        if (n.checked && n.visible) {
          params[`items[${i}].visible`] = false
        }
      })

      this.$$setData(params)
    },
    /**
     * 获取两个数组相同的元素
     * @param {Array} data 数组
     * @param {Array} values 数组
     */
    getDifference(data = [], values = []) {
      return data.filter(v => values.includes(v))
    },
    /**
     * 元素发生变化时的事件
     */
    onChange() {
      // debugger;
      const { items } = this.data
      const checkedItems = items.filter((n) => n.checked)

      const childs = this.data.items[4].children[4].children;
      // const childs = this.data.items[4].children[4];
      const params = {};
      //若为未处理跟处理中状态，则处理结果不可选中
      if (checkedItems[0].type === 'text' && (checkedItems[0].value === 'state0' || checkedItems[0].value === 'state1')){
        childs.forEach((n, i) => {
          params[`items[4].children[4].children[${i}].checked`] = false;
        })
        
        params[`items[4].children[4].hidden`] = true;
        params[`items[4].children[4].selected`] = '';
        
      }else{
        // childs.forEach((n, i) => {
        //   params[`items[4].children[4].children[${i}].disabled`] = false;
        // })
        params[`items[4].children[4].hidden`] = false;
      }
      this.$$setData(params);

      this.$$requestAnimationFrame(() => this.onCloseSelect(), 300)
        .then(() => this.triggerEvent('change', { checkedItems, items }))
    },
    /**
     * scroll-view 滚动时触发的事件
     * @param {Object} e 事件对象
     */
    onScroll(e) {
      this.triggerEvent('scroll', e)
    },
    /**
     * 打开 select 或 filter 时触发的回调函数
     * @param {Object} e 事件对象
     */
    onEnter(e) {
      this.triggerEvent('open', e);
      wx.getStorageSync('selFlag');
      // console.log("--" + wx.getStorageSync('selFlag'));
      // debugger
    },
    /**
     * 关闭 select 或 filter 时触发的回调函数
     * @param {Object} e 事件对象
     */
    onExit(e) {
      this.triggerEvent('close', e)
    },
  },
  created() {
    this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this);
    
  },
})