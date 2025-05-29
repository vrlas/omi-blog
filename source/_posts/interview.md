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
{% folding 查看答案 %}
`doctype`用于告诉浏览器以何种规范来解析HTML文档
`标准模式`: 默认模式,浏览器使用w3c标准渲染页面,以确保在不同浏览器和设备上呈现一致效果
`怪异模式`: 浏览器使用自己的标准解析页面,可能会导致在不同浏览器呈现不一样的效果
{% endfolding %}

### 说下常见行内元素与块级元素,以及区别
{% folding 查看答案 %}
`inline(行内元素)`: 元素不会换行,无法设置宽高,只能包含文本和其他行内元素(`a` `span` `img` `button` `input` `label`)
`block(块级元素)`: 元素会换行,宽度默认为父元素宽度,可以包含其他元素(`div` `p` `h1~h6` `ul` `li`)
{% endfolding %}

### H5的新元素与新特性
{% folding 查看答案 %}
语义化标签: `section`、`aside`、`article`、`footer`、`header`、`nav`
音视频: `video`、`audio`
绘图: `canvas`、`svg`
表单控件: `date`、`time`、`email`
地理定位: getCurrentPosition()获取用户定位
拖拽释放: drage Api
本地离线存储: `localStorage`、`sessionStorage`
{% endfolding %}

### 常见浏览器内核
{% folding 查看答案 %}
`trident`: ie浏览器
`webkit`: chrome(前期),safari
`gecko`: firefox
`blink`: chrome,opera
{% endfolding %}
### async与defer的区别
{% folding 查看答案 %}
- 脚本没有async或defer浏览器解析js时,遇到js会下载该文件并直接执行(阻塞dom解析)
- `async`下,js加载与执行与dom渲染并行(概率执行期间dom还没渲染完毕,拿不到dom)
- `defer`下,js加载与dom渲染并行,等渲染完毕再执行加载的js

![](/images/interview/3.png)
{% endfolding %}

### 什么是重绘和回流
{% folding 查看答案 %}
`重绘`: 当网页的外观(颜色,背景,阴影等)发生改变时,浏览器需要重新绘制的过程
`回流`: 当网页的布局和几何属性发生改变时,浏览器需要重新计算元素的位置和大小,重新布局的过程
重绘不一定会引发回流,回流必定导致重绘
{% endfolding %}
### 渐进增强与优雅降级区别
{% folding 查看答案 %}
`渐进增强`: 针对低版本浏览器构建页面,保证最基本的功能,然后再针对高级浏览器进行效果交互等改进达到更好的用户体验
`优雅降级`: 一开始根据高级浏览器构建完整功能,然后对低版本浏览器进行兼容
{% endfolding %}
### 前端如何做性能优化
{% folding 查看答案 %}
1. 通过文件合并、雪碧图、base64等减少http请求次数
2. 设置缓存策略,如etag,max-age,配置manifest等
3. 通过延迟加载,减少首屏资源加载资源。当需要时再进行资源加载
4. 使用cdn服务,提高资源相应速度
5. 使用gzip,deflate进行文件(代码,图片等)压缩、减小文件体积
6. 避免使用@import堵塞dom渲染
7. 对代码进行tree-shaking,剔除无用代码
{% endfolding %}
### 从输入url到渲染页面
{% folding 查看答案 %}
1. 地址栏输入url并回车
2. 浏览器查找当前url是否有缓存,并比较缓存是否过期
3. dns解析url的ip地址
4. 根据ip建立tcp连接(三次握手)
5. 发起http请求
6. 服务器处理请求,浏览器接收响应
7. 生成cssom树和dom树,并进行浏览器绘制
8. 关闭tcp连接(四次挥手)
{% endfolding %}
### 强缓存与协商缓存
{% folding 查看答案 %}
`强缓存`: 浏览器不会向服务器发送任何请求,直接从本地缓存(内存/硬盘)中读取文件并返回200状态码
`协商缓存`: 向服务器发送请求，服务器会根据request header的参数来判断是否命中协商缓存,如果命中,则返回304状态码并带上新的response header通知浏览器从缓存中读取资源
{% endfolding %}
## CSS
### link与@import区别
{% folding 查看答案 %}
1. @import是css提供的语法规则,只能导入样式表;link除了加载css,还可定义rss、rel连接属性、引入网站图标等
2. 加载页面时,@import会等页面加载完毕再加载,且必需在头部引入;link会与dom同时加载
3. @import是css2.1语法,存在兼容问题(ie5+: 这年头真有人兼容ie5?);link属于hmtl标签,不存在兼容性问题
4. link标签可以通过js操作link来改变样式;@import则不行
{% endfolding %}
### css伪类
{% folding 查看答案 %}
```css
selector:link {}
selector:visited {}
selector:hover {}
selector:active {}
selector:focus {}
```
{% endfolding %}
### left/top/right/bottom为0与宽高100%区别
{% folding 查看答案 %}
1. 可以让明确宽高的盒子水平垂直居中
2. 让无框高的盒子填满父容器
3. 宽高100%如果存在其他子元素,会导致高度问题
{% endfolding %}

### 标准盒模型与ie盒模型区别
{% folding 查看答案 %}
![](/images/interview/1.png)
![](/images/interview/2.png)
{% endfolding %}

### 谈谈你对BFC的理解
{% folding 查看答案 %}
BFC即`块级格式上下文`,是一个完全独立的空间,让空间里的子元素不会影响到外面的布局

BFC的触发条件：
1. body根元素
2. 浮动元素(float属性不为none)
3. 绝对定位元素(position属性为absolute或fixed)
4. display属性为(inline-block、table-cell、table-caption、flex、grid、inline-flex、inline-grid)的元素
5. overflow属性不为visible的元素

BFC的常见作用：
1. 解决margin重叠问题
2. 清除浮动(解决浮动造成的父元素高度塌陷问题)
3. 自适应多栏布局
{% endfolding %}

### 简单说下可替换元素
{% folding 查看答案 %}
`可替换元素`: 指一些展现效果不由css控制的元素,css只可控制尺寸位置,无法控制其本身。常见的如audio,video,img,常见的表单元素等。

tip: 如果非要修改可替换元素自带样式,可开启chrome如下开关进行调试修改
![](/images/interview/4.png)
![](/images/interview/5.png)
{% endfolding %}

## JavaScript
### cookie/sessionStorage/localStorage的区别
{% folding 查看答案 %}
1. cookie在同源请求中会携带,在过期时间内一直有效
2. sessionStorage只在当前浏览器窗口有效;localStorage所有同源窗口有效(可以借此实现标签页通信)
3. localStorage只要不删除就一直存在,常用于持久化存储
4. cookie大小不超过4k,sessionStorage不超过5M,localStorage不超过20M
5. 都只能存储字符串,如需存储对象需要JSON.stringify编码后存储
{% endfolding %}
### es6(es2015)的几个重要特性
{% folding 查看答案 %}
1. let和const关键字
2. 箭头函数
3. 模板字符串
4. 解构赋值
5. 默认参数
6. 展开运算符和其余参数
7. class
8. 模块化
9. Promise

`资料参考：`[《ES6（ES2015）有什么新特性？》](https://www.explainthis.io/zh-hans/swe/es6)
{% endfolding %}
### 防抖/节流的区别与应用场景
{% folding 查看答案 %}
### 防抖(debounce)与节流(throttle)
区别:
`防抖`: 在事件触发n秒后执行函数,如果在n秒内再次触发,则重新计时
`节流`: n秒内只运行一次,若在n秒内重复触发,则只有一次生效

`防抖`的常见应用场景:
1. 登录、发短信等按钮避免用户点击太快,以致于发送了多次请求
2. 搜索框搜索输入(只需用户最后一次输入完,再发送请求)
3. 手机号、邮箱验证输入检测(change、input、blur、keyup等事件触发,每次键入都会触发)
4. 窗口大小Resize(只需窗口调整完成后,计算窗口大小,防止重复渲染)

`节流`的常见应用场景:
1. 滚动加载(加载更多或滚到底部监听)
2. 搜索联想功能
3. 高频点击提交,表单重复提交
{% endfolding %}
### 聊聊宏任务与微任务
{% folding 查看答案 %}
在javascript中,所有的任务(`宏任务`,`微任务`)都会被加入到一个任务队列中,由事件循环(`Event Loop`)负责调度执行。
当javascript空闲时,事件循环会从任务队列中取出任务,并按照顺序执行。
`微任务的优先级高于宏任务`,也就是当主线程空闲时,如果有微任务存在,就会被优先执行,直到微任务队列为空,然后事件循环才会从宏任务队列中取出下一个任务执行
常见宏任务与微任务:
宏任务: script标签代码,setTimeout/setInterval,I/O操作,UI渲染,postMessage,Web Workers,IndexedDB等
微任务: Promise的then方法,MutationObserver,process.nextTick,Object.observe等
{% endfolding %}
### js数据类型
{% folding 查看答案 %}
1. 基本数据类型(`null`,`undefined`,`boolean`,`number`,`string`,`symbol`,`bigInt`)
2. 引用数据类型(`object`)

基本数据类型保存在`栈`中,引用数据类型保存在`堆`中,栈只保存的该引用数据的内存地址
{% endfolding %}
### continue,break,return的区别
{% folding 查看答案 %}
1. continue用于结束本次循环,继续下次循环
2. break用于跳出当前循环体
3. return用于返回函数,并中断函数执行
{% endfolding %}
### stopPagation()与preventDefault()的区别
{% folding 查看答案 %}
1. stopPagation会阻止事件冒泡与捕获
2. preventDefault会阻止事件的默认行为(如链接跳转/右键菜单/表单提交等)
{% endfolding %}
### var/let/const的区别
{% folding 查看答案 %}

| 区别        | var | let | const |
| --------- | --- | --- | ----- |
| 是否有块级作用域  | ×   | ✔️  | ✔️    |
| 是否存在变量提升  | ✔️  | ×   | ×     |
| 是否添加全局属性  | ✔️  | ×   | ×     |
| 能否重复声明变量  | ✔️  | ×   | ×     |
| 是否存在暂时性死区 | ×   | ✔️  | ✔️    |
| 是否必须设置初始值 | ×   | ×   | ✔️    |
| 能否改变指针指向  | ✔️  | ✔️  | ×     |

{% endfolding %}
### call/apply/bind区别
{% folding 查看答案 %}
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
{% endfolding %}
### 哪些情况会导致内存泄漏
{% folding 查看答案 %}
1. 意外的全局变量: 使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用
4. 闭包
{% endfolding %}
### 什么是闭包
{% folding 查看答案 %}
如果外部作用域有权访问另外一个函数内部的局部变量时，那就产生了闭包
{% endfolding %}
### 说一下js的作用域与作用域链
{% folding 查看答案 %}
> `作用域`指的是当前的执行上下文，在其中的值和表达式“可见”（可被访问）。如果一个变量或表达式不在当前的作用域中，那么它是不可用的。作用域也可以堆叠成层次结构，子作用域可以访问父作用域，反过来则不行。
> `作用域链`指的是当 JavaScript 使用每一个变数的时候，会先尝试在当前作用域中寻找该变数，若在当前的作用域找不到该变数，会一直往父层作用域寻找，直到全局作用域还是没找到，就会直接报错，这一层一层的关系，就是作用域链

JavaScript的作用域分为三种：
1. 全局作用域
2. 函数作用域
3. 块级作用域: 只有`let`和`const`声明的变量会属于块级作用域


{% endfolding %}
## Vue.js
### v-show与v-if的区别
{% folding 查看答案 %}
1. v-if是`惰性`的,满足条件才会进行渲染
2. v-show无论是否满足都会渲染,后续只是css`display`的切换
3. v-if有更高的切换开销,v-show有更高的初始渲染开销(v-show适合频繁切换,反之v-if)
{% endfolding %}
### vue2与vue3的双向数据绑定
{% folding 查看答案 %}
双向数据绑定: `数据劫持`+`发布订阅模式(观察者模式)`
`Vue2`在实例初始化时遍历data中的全部属性,并使用Object.defineProperty把这些属性全部转换为getter/setter并劫持,在数据发生变化时发布消息给订阅者,并触发相应回调,存在如下问题
- 初始化需要遍历所有对象key,如果对象层次较深,性能不好
- 通知更新对象需要维护大量dep实例和watcher实例,额外占用内存较多
- Object.defineProperty无法监听数组元素变化,只能通过劫持重写数组方法
- 动态新增、删除对象属性无法拦截,只能用set/delete API代替
- 不支持Map/Set等数据结构

`Vue3`使用Prxoy来监听数据的变化
{% endfolding %}

### ref与reactive的区别
{% folding 查看答案 %}
1. 数据类型: ref可用于任意数据类型,reactive只可用于引用数据类型
2. 访问方式: ref通过.value调用,reactive可直接访问
3. 适用场景: ref更适合基本类型或需要替换整个对象的场景,reactive适合复杂对象
4. 实现方式: ref通过Object.defineProperty实现响应式,reactive基于Proxy
{% endfolding %}

### watch与watchEffect的区别
{% folding 查看答案 %}
`watch`与`watchEffect`都能响应式地执行有副作用的回调
- `watch`只追踪明确侦听的数据源,此外仅在数据源确实改变时才会触发回调,`watch`会避免在发生副作用时追踪依赖
- `watchEffect`会在副作用发生期间追踪依赖,它会在同步执行过程中,`自动`追踪所有能访问到的响应式属性,代码更简洁,但依赖关系不明显
{% endfolding %}
## HTTP
#### get请求和post请求的区别
{% folding 查看答案 %}
1. GET在浏览器回退时是无害的，而POST会再次提交请求。
2. GET产生的URL地址可以被Bookmark，而POST不可以。
3. GET请求会被浏览器主动cache，而POST不会，除非手动设置。
4. GET请求只能进行url编码，而POST支持多种编码方式。
5. GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
6. GET请求在URL中传送的参数是有长度限制的，而POST没有。
7. 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
8. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
9. GET参数通过URL传递，POST放在Request body中
{% endfolding %}
#### 常见HTTP状态码与含义
{% folding 查看答案 %}
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
- `504`: 客户端作为网关或代理服务器时,未能及时从上游服务器收到响应
{% endfolding %}
---
[2024前端高频面试题之-- JS篇](https://juejin.cn/post/7330065707358208010)
[JavaScript 面试题详解](https://www.explainthis.io/zh-hans/swe/javascript)
[标准内置对象-Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
