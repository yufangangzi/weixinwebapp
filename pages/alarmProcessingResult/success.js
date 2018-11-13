Page({
    data: {
        buttons: [
            {
                type: 'positive',
                block: true,
                text: '知道了',
            },
            {
                type: 'light',
                block: true,
                text: '查看详情',
            },
        ],
    },
    onClick(e) {
        console.log(e)
        const { index } = e.detail

        // index === 0 && wx.showModal({
        //     title: 'Thank you for your support!',
        //     showCancel: !1,
        // })

        index === 1 && wx.navigateBack()
    },
})