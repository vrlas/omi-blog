---
title: 前端面试题
top_img: /images/wallpapers/5.jpg
cover: /images/wallpapers/5.jpg
tags:
  - 面试题
categories:
  - 面试
abbrlink: '20802113'
date: 2023-07-21 00:00:00
---

## HTML
### HTML中Doctype的作用?标准模式与怪异模式有何区别?
`doctype`用于告诉浏览器以何种规范来解析HTML文档
`标准模式`: 默认模式,浏览器使用w3c标准渲染页面,以确保在不同浏览器和设备上呈现一致效果
`怪异模式`: 浏览器使用自己的标准解析页面,可能会导致在不同浏览器呈现不一样的效果
### 标准盒模型与ie盒模型
![](/images/interview/1.png)
![](/images/interview/2.png)

### 说下常见行内元素与块级元素,以及区别
`inline(行内元素)`: 元素不会换行,无法设置宽高,只能包含文本和其他行内元素(`a` `span` `img` `button` `input` `label`)
`block(块级元素)`: 元素会换行,宽度默认为父元素宽度,可以包含其他元素(`div` `p` `h1~h6` `p` `ul`)

### 常见浏览器内核
`trident`: ie浏览器
`webkit`: chrome(前期),safari
`gecko`: firefox
`blink`: chrome,opera
### async与defer的区别
- 脚本没有async或defer浏览器解析js时,遇到js会下载该文件并直接执行(阻塞dom解析)
- `async`下,js加载与执行与dom渲染并行(概率执行期间dom还没渲染完毕,拿不到dom)
- `defer`下,js加载与dom渲染并行,等渲染完毕再执行加载的js

![](/images/interview/3.png)

### 什么是重绘和回流
`重绘`: 当网页的外观(颜色,背景,阴影等)发生改变时,浏览器需要重新绘制的过程
`回流`: 当网页的布局和几何属性发生改变时,浏览器需要重新计算元素的位置和大小,重新布局的过程
重绘不一定会引发回流,回流必定导致重绘
### 渐进增强与优雅降级区别
`渐进增强`: 针对低版本浏览器构建页面,保证最基本的功能,然后再针对高级浏览器进行效果交互等改进达到更好的用户体验
`优雅降级`: 一开始根据高级浏览器构建完整功能,然后对低版本浏览器进行兼容
### 前端如何做性能优化
1. 通过文件合并、雪碧图、base64等减少http请求次数
2. 设置缓存策略,如etag,max-age,配置manifest等
3. 通过延迟加载,减少首屏资源加载资源。当需要时再进行资源加载
4. 使用cdn服务,提高资源相应速度
5. 使用gzip,deflate进行文件(代码,图片等)压缩、减小文件体积
6. 避免使用@import堵塞dom渲染
7. 对代码进行tree-shaking,剔除无用代码
## CSS
### link与@import区别
1. @import是css提供的语法规则,只能导入样式表;link除了加载css,还可定义rss、rel连接属性、引入网站图标等
2. 加载页面时,@import会等页面加载完毕再加载,且必需在头部引入;link会与dom同时加载
3. @import是css2.1语法,存在兼容问题(ie5+: 这年头真有人兼容ie5?);link属于hmtl标签,不存在兼容性问题
4. link标签可以通过js操作link来改变样式;@import则不行
### css伪类
```css
selector:link {}
selector:visited {}
selector:hover {}
selector:active {}
selector:focus {}
```
### left/top/right/bottom为0与宽高100%区别
1. 可以让明确宽高的盒子水平垂直居中
2. 让无框高的盒子填满父容器
3. 宽高100%如果存在其他子元素,会导致高度问题
## JavaScript
### cookie/sessionStorage/localStorage的区别
1. cookie在同源请求中会携带,在过期时间内一直有效
2. sessionStorage只在当前浏览器窗口有效;localStorage所有同源窗口有效(可以借此实现标签页通信)
3. localStorage只要不删除就一直存在,常用于持久化存储
4. cookie大小不超过4k,sessionStorage不超过5M,localStorage不超过20M
5. 都只能存储字符串,如需存储对象需要JSON.stringify编码后存储
### js数据类型
js数据类型包括`null`,`undefined`,`boolean`,`number`,`string`,`symbol`,`bigInt`,`object`
### continue,break,return的区别
1. continue用于结束本次循环,继续下次循环
2. break用于跳出当前循环体
3. return用于返回函数,并中断函数执行
### stopPagation()与preventDefault()的区别
1. stopPagation会阻止事件冒泡与捕获
2. preventDefault会组织事件的默认行为(如链接跳转/右键菜单/表单提交等)   
### var/let/const的区别

| 区别        | var | let | const |
| --------- | --- | --- | ----- |
| 是否有块级作用域  | ×   | ✔️  | ✔️    |
| 是否存在变量提升  | ✔️  | ×   | ×     |
| 是否添加全局属性  | ✔️  | ×   | ×     |
| 能否重复声明变量  | ✔️  | ×   | ×     |
| 是否存在暂时性死区 | ×   | ✔️  | ✔️    |
| 是否必须设置初始值 | ×   | ×   | ✔️    |
| 能否改变指针指向  | ✔️  | ✔️  | ×     |
### call/apply/bind区别
1. 三者都是用于改变函数运行时的this指向
2. call/apply两者都会立即执行,call传入参数列表,apply传入数组
3. bind不会立即执行,而是返回改变了this指向的函数,bind可多次传参
```js
fn.call(obj,1,2)
fn.apply(obj,[1,2])
const bindFn1 = fn.bind(obj,1,2)
const bindFn2 = fn.bind(obj)
bindFn()
bindFn2(1,2)
```
### 哪些情况会导致内存泄漏
1. 意外的全局变量: 使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用
4. 闭包
### 什么是闭包
> 如果外部作用域有权访问另外一个函数内部的局部变量时，那就产生了闭包
## Vue.js
### v-show与v-if的区别
1. v-if是`惰性`的,满足条件才会进行渲染
2. v-show无论是否满足都会渲染,后续只是css`display`的切换
3. v-if有更高的切换开销,v-show有更高的初始渲染开销(v-show适合频繁切换,反之v-if)
## HTTP
#### get请求和post请求的区别
1. GET在浏览器回退时是无害的，而POST会再次提交请求。
2. GET产生的URL地址可以被Bookmark，而POST不可以。
3. GET请求会被浏览器主动cache，而POST不会，除非手动设置。
4. GET请求只能进行url编码，而POST支持多种编码方式。
5. GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
6. GET请求在URL中传送的参数是有长度限制的，而POST没有。
7. 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
8. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
9. GET参数通过URL传递，POST放在Request body中
#### 常见HTTP状态码与含义
- `100`: 表示请求内容可行, 客户端应该继续请求
- `200`: 请求成功
- `301`: 请求的网页已永久移动到新位置
- `302`: 临时性重定向
- `304`: 自从上次请求后，请求的网页未修改过
- `400`: 服务器无法理解请求的格式
- `401`: 请求未授权
- `403`: 禁止访问
- `404`: 找不到如何与URI相匹配的资源
- `500`: 服务器内部错误
- `503`: 服务器端暂时无法处理请求(常见原因是服务器因维护或重载而停机)

---
[2024前端高频面试题之-- JS篇](https://juejin.cn/post/7330065707358208010)
[标准内置对象-Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
