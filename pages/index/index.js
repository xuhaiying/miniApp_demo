//index.js
//获取应用实例
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  towebPage: function (e){
    const url = e.target.dataset.target;
    wx.navigateTo({
      url: '/pages/webview/webview?target='+encodeURIComponent(url),
    })
  },
  towebPage2: function (e) {
    const url = e.currentTarget.dataset.target;
    wx.navigateTo({
      url: '/pages/webview/webview?target=' + encodeURIComponent(url),
    })
  },
  onLoad: function () {
    let _self = this;
    wx.request({
      url: 'http://www.html5train.com/orgHomePage.do?action=getOrgHomePageInfo&layoutType=default&organizationId=510&_=1544237109545',
      method: 'GET',
      data: {},
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        if (res.statusCode === 200){
          // 写自己的逻辑
          let data = {};
          let list = res.data.moduleDTOList.list;
          list.forEach(l=>{
            if (l.moduleType === "picture"){
              data.imgUrls = l.moduleMap.map.pictureDTOList.list;
            } else if (l.moduleType === "recommend"){
              data.recommedTitle = "最新视频";
              data.recommedAndPost = l.moduleMap.map.recommedAndPost.list[0].list;
            }
          })
          console.log(data)
          _self.setData(data);
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      },
      fail(r){
        wx.showToast({
          icon: 'none',
          title: "失败"
        })
      },
      complete(){
       // console.log('不管成功失败都会调用');
      }
    });
  }
})
