//index.js
//获取应用实例
Page({
  data: {
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 5000, // 自动切换时间间隔
    duration: 1000 // 滑动动画时长
  },
  towebPage: function (e){
    // e.target 返回触发事件的元素
    const url = e.target.dataset.target;
    wx.navigateTo({
      url: '/pages/webview/webview?target='+encodeURIComponent(url),
    })
  },
  towebPage2: function (e) {
    // e.currentTarget 返回绑定事件的元素
    const url = e.currentTarget.dataset.target;
    wx.navigateTo({
      url: '/pages/webview/webview?target=' + encodeURIComponent(url),
    })
  },
  onLoad: function () {
    let _self = this;
    // 1.request请求地址必须是https请求
    // 2.每个微信小程序需要事先设置一个通讯域名，小程序只可以跟指定的域名进行网络通信
    // 3.设置域名需在微信公共平台 -> 开发 -> 开发设置 -> 服务器域名中设置
    wx.request({
      url: 'http://www.html5train.com/orgHomePage.do?action=getOrgHomePageInfo&layoutType=default&organizationId=510&_=1544237109545',
      method: 'GET',
      data: {},
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success(res){  // 成功后的回调
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
      fail(r){  // 失败后的回调
        wx.showToast({
          icon: 'none',
          title: "失败"
        })
      },
      complete(){
       // console.log('不管成功或者失败都会调用');
      }
    });
  }
})
