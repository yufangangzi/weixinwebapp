Page({
    onSuccess() {
        wx.navigateTo({
            url: '../../pages/alarmProcessingResult/success',
        })
    },
    onError() {
        wx.navigateTo({
          url: '../../pages/alarmProcessingResult/error',
        })
    },
})