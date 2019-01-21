const notice = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMA1pkvcvP6gL8G5xpBJE9fsA94ac8S/W8AAAEQSURBVDjLjZTbloMgDEUDChIuivX8/7cOILZjRWpeWIZtSOAkRCdbpdLG0U9bDZKZj0P6JudEogz02+GBqcGFxEmegLeHJw154QaL7P0PEs0KrwaXzzmDNGuc8/QKGOkKpm/BJdBYLCWjF2qBLFA2LKrpmZogLRB5OTjl6QuUQw1pEQo4MbP53PIBeqhQ/yiF76U2QI61inR27IG5ij3toSR5D9JWIiUFwPbBUIDM6D7IVR4M1QddAfL64+i5On1ZO2CswnkVqd2DC9TeFKZcExC3bRPXJxywiyEVr7grijgeLyj7MuMqaOjwRLir+O6vdiskXVVp9JvLGVj3pF0tbHgyAGiK7tlI4dvhczuk/gBmhhW2VAg6GAAAAABJRU5ErkJggg=='
const close = 'data:image/png;base64,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'

Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    properties: {
        icon: {
            type: String,
            value: notice,
        },
        content: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
              setTimeout(()=>{
                this.clearMarqueeTimer()
                this.initAnimation();
              },50)
            }
        },
        mode: {
            type: String,
            value: '',
        },
        action: {
            type: String,
            value: close,
        },
        loop: {
            type: Boolean,
            value: false,
        },
        leading: {
            type: Number,
            value: 500,
        },
        trailing: {
            type: Number,
            value: 800,
        },
        speed: {
            type: Number,
            value: 25,
        },
    },
    data: {
        animatedWidth: 0,
        overflowWidth: 0,
        visible: true,
    },
    methods: {
        clearMarqueeTimer() {
            if (this.marqueeTimer) {
                clearTimeout(this.marqueeTimer)
                this.marqueeTimer = null
            }
        },
        startAnimation() {
            this.clearMarqueeTimer()
            const { overflowWidth, loop, leading, trailing, speed } = this.data
            const isLeading = this.data.animatedWidth === 0
            const timeout = isLeading ? leading : speed
            const animate = () => {
                let animatedWidth = this.data.animatedWidth + 1
                const isRoundOver = animatedWidth > overflowWidth

                // 判断是否完成一次滚动
                if (isRoundOver) {
                    if (!loop) {
                        return false
                    }
                    // 重置初始位置
                    animatedWidth = 0
                }

                // 判断是否等待一段时间后进行下一次滚动
                if (isRoundOver && trailing) {
                    setTimeout(() => {
                        this.setData({
                            animatedWidth,
                        })

                        this.marqueeTimer = setTimeout(animate, speed)
                    }, trailing)
                } else {
                    this.setData({
                        animatedWidth,
                    })
                    this.marqueeTimer = setTimeout(animate, speed)
                }
            }

            if (this.data.overflowWidth !== 0) {
                this.marqueeTimer = setTimeout(animate, timeout)
            }
        },
        initAnimation() {
            const query = wx.createSelectorQuery().in(this)
            query.select('.wux-notice-bar__marquee-container').boundingClientRect()
            query.select('.wux-notice-bar__marquee').boundingClientRect()
            query.exec((rects) => {
                if (rects.filter((n) => !n).length) {
                    return false
                }

                const [container, text] = rects
                const overflowWidth = text.width - container.width

                if (overflowWidth !== this.data.overflowWidth) {
                    this.setData({ overflowWidth }, this.startAnimation)
                }
            })
        },
        onAction() {
            if (this.data.mode === 'closable') {
                this.clearMarqueeTimer()
                this.setData({
                    visible: false
                })
            }
            this.triggerEvent('click')
        },
        onClick() {
            this.triggerEvent('click')
        },
    },
    ready() {
        this.initAnimation()
    },
    detached() {
        this.clearMarqueeTimer()
    },
})