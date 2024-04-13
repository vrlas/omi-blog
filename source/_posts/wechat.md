---
title: 微信原生小程序
top_img: /images/wallpapers/8.jpg
cover: /images/wallpapers/8.jpg
tags:
  - wechat
categories:
  - 小程序
abbrlink: 9bd382fd
date: 2023-01-15 00:00:00
---

## 小程序框架
### 目录结构
```js
|- card
	index.js   // 页面逻辑(必需)
	index.wxml // 页面结构(必需)
	index.json // 页面配置
	index.wxss // 页面样式表
|- utils // 工具函数
app.js // 小程序逻辑(必需)
app.json // 小程序公共配置(必需)
app.wxss // 小程序公共样式表
sitemap.json // 爬虫文件
project.config.json // 项目配置文件
project.private.config.json // 项目私人配置文件(优先级更高)
```
### 逻辑层
#### app.js
```js
App({
  onLaunch (options) {},
  onShow (options) {},
  onHide () {},
  onError (msg) {},
  globalData: 'I am global data'
})

// getApp(整个小程序只有一个 App 实例，是全部页面共享的)
const appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```
#### page.js
- behavior.js
```js
module.exports = Behavior({
	data: { msg: 'behavior类似mixin' },
	methods: { custom() {} }
})
```
- index.js
```js
const mineBehavior = require('/path/to/behavior.js')

// Page构造器适用于简单的页面,复杂页面推荐Component构造器
Page({
  behaviors: [mineBehavior],
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {}, // 页面创建时执行
  onShow: function() {}, // 页面出现在前台时执行
  onReady: function() {}, // 页面首次渲染完毕时执行
  onHide: function() {}, // 页面从前台变为后台时执行
  onUnload: function() {}, // 页面销毁时执行
  onPullDownRefresh: function() {}, // 触发下拉刷新时执行
  onReachBottom: function() {}, // 页面触底时执行
  onShareAppMessage: function () {}, // 页面被用户分享时执行
  onPageScroll: function() {}, // 页面滚动时执行
  onResize: function() {}, // 页面尺寸变化时执行
  onTabItemTap(item) { // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  viewTap: function() { // 事件响应函数
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {} /* setDataCallBack */)
  },
  // 自由数据
  customData: { hi: 'MINA' }
})

Component({
  behaviors: ['wx://component-export'],
  // 如果配置该方法,selectCompoent获取的会变成自定义值{ myField: 'myValue' }
  export() {
    return { myField: 'myValue' }
  },
  options: {
    multipleSlots: true // 启用多slot支持
  },
  data: { total: 0 },
  properties: {
    myValue: String
  },
  // 组件所在页面的生命周期
  pageLifetimes: {
    show: function () { },
    hide: function () { },
    resize: function () { },
  },
  // 组件自身的生命周期
  lifetimes: {
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
  observers: {
    'a,b': function(a,b) {
      this.setData({ total: a + b })
    }
  },
  methods: {
    update: function() {
      // 更新 myValue
      this.setData({
        myValue: 'leaf'
      })
    }
  }
})
```
### 路由
##### 注意事项
- `navigateTo`, `redirectTo` 只能打开非 tabBar 页面。
- `switchTab` 只能打开 tabBar 页面。
- `reLaunch` 可以打开任意页面。
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的`onLoad`中获取。

| 路由方式 | 触发 |
|-|-|
| 打开新页面 | wx.navigateTo或\<navigator open-type="navigateTo"/> |
| 页面重定向 | wx.redirectTo或\<navigator open-type="redirectTo"/> |
| 页面返回 | wx.navigateBack或\<navigator open-type="navigateBack或"/> |
| tab切换 | wx.switchTab\<navigator open-type="switchTab"/> |
| 重启动 | wx.reLaunch\<navigator open-type="reLaunch"/> |
### API
```js
wx.chooseMedia() // 选择媒体文件(图片/音视频等)
wx.request() // 发送请求
wx.login() // 登录获取code
wx.requestPayment() // 发起微信支付(需要申请微信支付)
wx.chooseAddress() // 调用收获地址原生界面(地理相关需要开通权限)

// 缓存相关(上限为10M)
wx.setStorage()
wx.setStorageSync()
wx.getStorage()
wx.getStorageSync()
wx.clearStorage()
wx.clearStorageSync()
wx.removeStorage()
wx.removeStorageSync()

// 文件系统(wx.env.USER_DATA_PATH:开发者对这个目录有完全自由的读写权限)
const fs = wx.getFileSystemManager()
fs.writeFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'hello, world', 'utf8')
```
### 获取节点信息
```js
// 获取节点坐标信息
const query = wx.createSelectorQuery()
query.select('#the-id').boundingClientRect(function(res){
  res.top // #the-id 节点的上边界坐标（相对于显示区域）
})
query.selectViewport().scrollOffset(function(res){
  res.scrollTop // 显示区域的竖直滚动位置
})
query.exec()
```
### 组件
#### 自定义组件
```json
// 需要在当前页面json添加如下配置(如在app.json配置则为全局)
{
  "usingComponents": {
	  "custom-component": "/pages/custom-component/index"
  }
}
```
#### 组件间通信
```js
// 父组件
<child id="child" bind:fn="fn" />
Page({
	fn() {
		// 获取组件实例
		const child = this.selectComponet('#child')
		console.log(child)
	}
})

// 子组件
<button bind:tap="tap">调用父组件方法</button>
Page({
	tap() {
		// data为传递给父组件数据,option包括是否冒泡/是否捕获/是否穿越边界
		this.triggerEvent('fn', data, option)
	}
})
```
#### 组件模板
```html
<template name="odd">
	<view>odd</view>
</template>
<template name="even">
	<view>even</view>
</template>
<block wx:for="{{[1, 2, 3, 4, 5]}}">
	<template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
</block>
```
---
[Component构造器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
[微信小程序开发：微信小程序生命周期总结](https://juejin.cn/post/7234322782057529405?searchId=20240115224254F16055FCC5089A3561AA)
[组件生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)
[数据监听器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html)
[微信支付](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html)
[地理位置接口新增与相关流程调整](https://developers.weixin.qq.com/community/develop/doc/000a02f2c5026891650e7f40351c01)
[小程序用户信息相关接口调整公告](https://developers.weixin.qq.com/community/develop/doc/000e881c7046a8fa1f4d464105b001)
[文件系统](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/file-system.html)
[canvas画布](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/canvas.html)
[分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)
[微信登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
[获取昵称头像](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)
[小程序配置/场景值/框架接口/wxml语法/wxs语法](https://developers.weixin.qq.com/miniprogram/dev/reference/)
[小程序组件](https://developers.weixin.qq.com/miniprogram/dev/component/)
