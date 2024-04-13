---
title: 编程随笔
date: 2023-05-04
top_img: /images/wallpapers/6.jpg
cover: /images/wallpapers/6.jpg
tags: ['前端', '综合']
categories: ['前端']
sticky: 1
---

## HTML
### 根据设备宽度加载不同图片
```html
<picture>
  <source media="(min-width:650px)" srcset="img_pink_flowers.jpg">
  <source media="(min-width:465px)" srcset="img_white_flower.jpg">
  <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto">
</picture>
```
### 图片热力区域
点击tab触发
```html
<img src="workplace.jpg" alt="Workplace" usemap="#workmap" width="400" height="379">

<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">
  <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm">
  <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="coffee.htm">
</map>
```
### 模拟textarea可编辑拉伸
```html
<div style="resize: both;min-height:200px;border: 1px solid #ccc;overflow:auto;" contenteditable="true"></div>
```
### meta
```html
<head>
  <meta charset="UTF-8" />
  <meta name="description" content="Free Web tutorials" />
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content="John Doe" />
  <meta http-equiv="refresh" content="30" />
  <!-- 让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放(移动端需要设置) -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
</head>
```
### a标签图片下载
```html
<!-- 如果存在跨域问题需要解决跨域,否则会变为跳转 -->
<a href="/img/avatar.jpg" download>
<!-- 测试结果: 如果不是图片还是会跳转,如果想直接下载添加响应头Content-Disposition为attachment -->
<a href="/file.pdf">download file</a>
```
## 浏览器
### 调试js控制样式
1. 切到控制台Sources
2. f8 -> ctrl+\
### 调试video标签隐藏元素
![](https://npm.elemecdn.com/picture-bed@1.0.7//cover/random-4.jpg)

![](https://npm.elemecdn.com/picture-bed@1.0.7//cover/random-3.jpg)
## DOM&BOM
### screenX,pageX,clientX,offsetX区别
![](https://npm.elemecdn.com/picture-bed@1.0.7//cover/random-1.png)
### 节点克隆
```js
const container = document.querySelector('.container')
const cloneContainer = container.cloneNode(true) // true:深度克隆,不传只可能表层元素
```
### 获取图片原始宽高
```js
const loadImg = url => {
	const img = new Image()
	img.src = url
	document.body.appendChild(img)
	return new Promise((resolve, reject) => {
	  img.onload = () => {
	    resolve({ width: img.naturalWidth, height: img.naturalHeight })
	  }
	  img.onerror = error => reject('图片加载失败')
	})
}
loadImg('https://npm.elemecdn.com/picture-bed@1.0.7/common/avatar.png')
```
### 拖动图片到指定区域
```html
<img class="img" src="https://gw.alicdn.com/i4/710600684/O1CN01BSkFT41GvJe0mLJBv_!!710600684.jpg_Q75.jpg_.webp" draggable="true" />
<div class="box" ondrop="drop(event)" ondragover="dragover(event)" />

<script>
  const dragover = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  const drop = (e) => {
    e.preventDefault()
    e.target.appendChild(document.querySelector('.img'))
  }
</script>
```
### 文字转语音与语音识别
```html
<textarea id="area" rows="10" cols="100"></textarea>
<div>
  <button onClick="deacon()">朗读</button>
  <button onClick="generate()">生成</button>
</div>
<p></p>
<script>
  const area = document.getElementById('area')
  // 文字转语音
  const deacon = () => {
    const text = area.value
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance()
    utterance.text = text
    synth.speak(utterance)
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  // 语音转文字(语音控制背景)
  recognition.addEventListener('result', (e) => {
    const text = e.results?.[0]?.[0]?.transcript
    if (text) {
      document.querySelector('p').innerText = `识别内容: ${text}`
      const colorText = text.slice(-2)
      const color = new Map([['红色', 'red'], ['绿色', 'green'], ['紫色', 'purple']]).get(colorText)
      if (color) {
        document.body.style.background = color
      }
    }
  })
  const generate = () => {
    recognition.start()
  }
</script>
```
### 页面刷新
```js
location.reload // 方法1
location.search = '' // 方法2
history.go(0) // 方法3
```
### 获取当前经纬度
```js
navigator.geolocation.getCurrentPosition((position) => console.log(position))
```
### 获取剪切板内容
```js
// 包括读写操作
const promise = navigator.clipboard.read()
const promise = navigator.clipboard.readText()
const promise = navigator.clipboard.write(butter)
const promise = navigator.clipboard.writeText(text)
```
### 唤醒电话/发送邮件/发送短信/唤醒app
```html
<a href="tel:183xxxxxxxx">一键拨打号码</a>
<a href="mailto:123@qq.com">一键发送邮件</a>
<a href="sms:183xxxxxxxx">一键发送短信</a>

<!-- 更多schema可查询唤端 -->
<a href="weixin://">唤醒微信</a>
```
### 全屏api
```html
<script>
elem.requestFullscreen()
document.exitFullscreen()
document.fullScreen // bool
</script>

<style>
// 全屏伪类(元素处于全屏状态)
.box:-webkit-full-screen {
  background-color: red;
}
</style>
```
### 网络状态
```js
navigator.onLine // 是否在线
window.addEventListener('online', e => console.log('在线'))
window.addEventListener('offline', e => console.log('离线'))
```
### DOM增删改查
```js
// 创建新节点
createDocumentFragment(node);
createElement(node);
createTextNode(text);

// 添加、移除、替换、插入
appendChild(node)
removeChild(node)
replaceChild(new,old)
insertBefore(new,old)

// 查找
getElementById()
getElementsByName()
getElementsByTagName()
getElementsByClassName()
querySelector()
querySelectorAll()

// 属性操作
getAttribute(key)
setAttribute(key, value)
hasAttribute(key)
removeAttribute(key)
```

## CSS
### box-shadow实现多边框
![](/images/random/1.png)
```css
background: black;
box-shadow: 0 0 0 10px red,
            0 0 0 15px yellow,
            0 0 0 25px green;
```
### 条纹颜色
![](/images/random/2.png)
![](/images/random/3.png)
```css
background: linear-gradient(red 33.3%, green 33.3%, green 66.6%, blue 66.6%);
background-size: 100% 100px;

/* 斜条纹 */
background: repeating-linear-gradient(45deg, #fb3, #fb3 15px, #58a 0, #58a 30px);
```
### border-radius实现半圆
```css
div {
  width: 400px;
  height: 200px;
  background: purple;
  border-radius: 50% / 100% 100% 0 0;
}
```
### 色轮创建
![](/images/random/4.png)
```css
background: conic-gradient(red, yellow, lime, aqua, blue, fuchsia, red);

/* 也可以这样实现饼图 */
background: conic-gradient(red 60deg, green 60deg 120deg, blue 120deg);
```
### 方块背景

![](/images/random/5.png)
```css
background-size: 50px 50px;
background-image: linear-gradient(0deg,transparent 24%,rgba(201,195,195,.329) 25%,hsla(0,8%,80.4%,.05) 26%,transparent 27%,transparent 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,transparent 77%,transparent),linear-gradient(90deg,transparent 24%,rgba(204,196,196,.226) 25%,hsla(0,4%,66.1%,.05) 26%,transparent 27%,transparent 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,transparent 77%,transparent);
```
### table边框重叠问题
```css
table {
  border-collapse:collapse;
}
```
### flex图示
![flex](https://img.smyhvae.com/20190821_2101.png)
### 地图暗黑(通过css)
```css
/* 高德与百度测试效果还可以 */
selector {
  filter: invert(1) hue-rotate(90deg) !important;
}
```
### css前缀
```
-webkit-（Chrome/Safari更新版本的Opera和Edge,几乎所有iOS浏览器,包括Firefox for iOS;基本上,任何基于WebKit或Chromium 的浏览器）
-moz-（火狐）
-o-（Opera 的旧 pre-WebKit 版本）
-ms-（Internet Explorer 和 Microsoft Edge，在 Chromium 之前）
```
### 美化chrome滚动条
```css
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
```
### 伪元素实现浮动清除
```css
selector::after {
  content: '';
  display: block;
  clear: both;
}
```
### hover时暂停动画
```css
selector:hover {
  animation-play-state: paused;
}
```
### 修改选中文本颜色
```css
selector::selection {
  color: pink;
}
```
### 段落分割
```css
p {
  column-count: 2; // 段落列数
  column-gap: 5px; // 分割的段落间距
  column-rule: 1px solid #ccc; // 段落分割线
}
```
### transition先后执行
```css
transition: 2s; // 不指定名称,默认all
transition: background 2s,transform 2s 2s; // 第一个参数为执行时间,第二个为暂停时间
```
### 自定义radio样式
```css
// checkbox等修改同理
input[type="radio"] {
  opacity: 0;
  margin: 0;
  padding: 0;
}

label[for="male"],label[for="female"] {
  background: url('/img/checks.png') 0 -32px no-repeat;
  padding-left: 24px;
}

input[type="radio"]:checked + label[for="male"],
input[type="radio"]:checked + label[for="female"] {
  background-position: 0 0;
  color: #ce1010;
}
```
### 超出省略号显示
```css
/* 单行超出 */
.single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 多行超出 */
.multiple {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
```
### 去除select标签箭头
```css
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
}
```
### 背景铺满元素
```css
elem {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url(imgSrc) no-repeat center / cover; //多背景可用逗号隔开
}
```
### grid命名布局
```css
.grid-wrapper {
  display: grid;
  width: 100vw;
  height: 100vh;
  gap: 10px;
  /* .就表示此处无内容,即空白 */
  grid-template-areas: 
    'header header header header'
    'nav . main main'
    'article . main main'
    'footer footer footer footer';
}
```
### 图片镜像
```css
.img {
  /* below,above,left,right */
  box-reflect: right;
}
```
![](https://npm.elemecdn.com/picture-bed@1.0.7//cover/interview-2.png)
### css属性使用html
```html
<style>
  .data::after {
    content: attr(data-content);
  }
</style>
<div class="data" data-content="test content"></div>
```
### 变量
```css
:root {
  --font-color: red;
}
span {
  color: var(--font-color);
}
```

### css遮罩
```css
/* 点击外部关闭直接mask添加事件即可 */
.mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .8);
}
.dialog {
  z-index: 1;
  /* 其他样式 */
}
```
### 垂直居中方案

```css
/* 太古早的方案就不写了(如table布局),结构: main>div */
/* 方案1 */
main {
  display: flex|grid;
}
div {
  margin: auto;
}
/* 方案2 */
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 方案3 */
div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* 方案4 */
main {
  display: grid;
}
div {
  justify-self: center;
  align-self: center;
}
```
## Tailwind CSS
### 1像素底部border
```html
<!-- tailwindcss border-b-1不会生效(2像素就会生效🙂) -->
<div className="border-b-[1px] border-[#817C7C]"></div>
```
## JavaScript
### unicode表情
```js
console.log('\u{01F61F}') // 😟 (该符号unicode为U+1F61F)
```
### 判断是否为数组
```js
Object.prototype.toString.call(obj).slice(8,-1) === 'Array'
obj.__proto__ === Array.prototype
Array.isArrray(obj)
obj instanceof Array
Array.prototype.isPrototypeOf(obj)
```
### 字符串反转
```js
'hello'.split('').reverse().join('') // olleh
```
### Proxy&Reflect
```js
const obj = { a: 1, b: 2 }
const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver)
  },
  set(target, key, val, receiver) {
    return Reflect.set(target, key, val, receiver)
  }
})
```
### Promise
```js
// Promise.all
const p1 = Promise.resolve(1)
const p2 = 2
const p3 = new Promise(resolve => resolve(3))
Promise.all([p1,p2,p3]).then(res => console.log(res)) // [1,2,3]
// Promise.race
const p1 = new Promise(resolve => setTimeout(() => resolve(1), 1000))
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100))
Promise.race([p1,p2]).then(res => console.log(res)) // 2
```
### Math对象
```js
Math.floor() // 向下取整
Math.ceil()  // 向上取整
Math.round() // 四舍五入
Math.trunc()   // 去掉小数
Math.floor(Math.random() * (max - min + 1)) + min // 范围随机数(min-max)
```
### Date对象
```js
// 也可以调用toLocalDateString&toLocalTimeString获取日期&时间字符串
const [month, day, year, hour, minute, second] = new Date(timestamp).toLocaleString().split(/\/|:|, /)
```
### WeakMap与Map
```js
const map = new Map()
const wMap = new WeakMap()

;(() => {
  const foo = { reference: 'test Map' }
  const bar = { reference: 'test WeakMap' }

  map.set(foo, 'Map')
  wMap.set(bar, 'WeakMap')

  map.set('k', 'Map')
  // 会报错,WeakMap不能使用常量(字符串数字等)作为key
  // wMap.set('k', 'WeakMap')

  console.log(map.get(foo))
  console.log(wMap.get(bar))
  console.log(map.get('k'))
})()

console.log(map) // key无法被垃圾回收机制回收,还是能拿到对象,容易产生内存泄漏
console.log(wMap) // 引用key对象会被GC回收,此时就无法拿到键值了
```
### UUID
```js
// 🥶不要再用uuid包了
console.log(crypto.randomUUID()) // 398a0157-c05f-4d12-a414-a9a9e8abe529
```
### 数组乱序
```js
const arr = [1, 2, 3, 4, 5]
const shuffle = arr => arr.sort(() => Math.random() - 0.5)
```
### 判断数据类型
```js
Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
```
### bind
```js
const module = {
  val: 2233,
  getVal() {
    return this.val
  }
}

const getVal = module.getVal
console.log(getVal()) // undefined

const bindVal = getVal.bind(module)
console.log(bindVal()) // 2233
```
### 大小写互换
```js
const str = 'HeLl0wOrLd'
const newStr = str.replace(/([a-z]*)([A-Z]*)/g, (_, s1, s2) => {
  return `${s1.toUpperCase()}${s2.toLowerCase()}`
})
console.log(newStr) // hElL0WoRlD
```
### 保留三位小数(小数为0则不保留)
```js
Math.round(float * 1000) / 1000
```
### 三元表达式执行
```js
const a = () => 'a'
const b = () => 'b'
let isA = true;
(isA ? a : b)() // a
```
### 低频方法
```js
const str = 'hello '
str.repeat(3) // hello hello hello

const str = 'goodbye'
str.startsWith('good') // true
str.startsWith('bye', 4) // true
str.endsWith('bye') // true
```
### 删除dom元素的另类思路
```js
// dom结构为ul>li>content+<button class="delete">删除</button>
// method1
const delBtn = document.querySelectorAll('.delete');
[...delBtn].forEach(btn => {
  btn.addEventListener('click', e => {
    const li = e.target.parentElement
    li.parentElement.removeChild(li)
  })
})
// method2 => 利用冒泡
const ulElem = document.querySelector('ul')
ulElem.addEventListener('click', e => {
  if(e.target.getAttribute('class') === 'delete') {
    const li = e.target.parentElement
    ulElem.removeChild(li)
  }
})
```
### document.form
```js
// 获取id为user-form的form表单
console.log(document.forms['user-form'])
```
### createElement&踩坑
```js
[...document.querySelectorAll('li')].forEach(li => {
  // 如果把这个写在循环外面,只有最后li会添加span元素
  const span = document.createElement('span')
  li.appendChild(span)
})
```
### classList操作
```js
const btn = document.querySelector('btn')
btn.classList.add('remove')
btn.classList.remove('remove')
btn.classList.toggle('remove')
btn.classList.replace('remove','add')
```
### dataset
```js
// <div id="user" data-id="1234567890" data-date-of-birth>John Doe</div>
const user = document.querySelector('#user')
console.log(user.dataset.id)
console.log(user.dataset.dataOfBirth)
```
### window.onload与DOMContentLoaded
```js
// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('内容加载完毕')
})

window.onload = () => {
  console.log('内容,样式等全部完毕')
}
```
### 颜色随机
```js
el.style.color = `#${Math.random().toString().slice(2,8)}`
```
### 类数组转数组
```js
Array.prototype.slice.call(arrayLike)
Array.prototype.splice.call(arrayLike, 0)
Array.prototype.concat.apply([], arrayLike)
Array.from(arrayLike)
```
### Reflect
```js
// apply
const add = function (num1, num2) { return num1 + num2; }
console.log(Reflect.apply(add, undefined, [1, 2]))

// get
const obj = {
  name: 'zs'
}
console.log(Reflect.get(obj, 'name'))

// has
console.log(Reflect.has(obj, 'name'))

// ownKeys
console.log(Reflect.ownKeys(obj)) // ['name']

// set
Reflect.set(obj, 'name', 'ls')
```

## NodeJs
### 使用es模块
```bash
# 方式1:package.json修改type为module
# 方式2:文件后缀改为.mjs
```

## SQL
### SQL语言集
|SQL功能|动词|
|---|---|
|数据查询|SELECT|
|数据定义|CREATE,DROP,ALTER|
|数据操纵|INSERT,UPDATE,DELETE|
|数据控制|GRANT,REVOTE|
### 数据定义
|操作对象|创建|删除|修改
|---|---|---|---|
|表|CREATE TABLE|DROP TABLE|ALTER TABLE|
|视图|CREATE VIEW|DROP VIEW| |
|索引|CREATE INDEX|DROP INDEX| |

## NPM
### normalize.css
抹除浏览器样式差异

### postcss-px-to-viewport
pc/app分辨率适配方案

### turf
可用于判断点位是否在区域内(地图推荐使用)

### fullpage.js
全屏滚动

### serve
本地HTTP服务器

### 全局升级指定包
```bash
$ npm update -g pnpm
```

## git
### 按时间倒序列出commit
```bash
# 查看3.0.0之前commit,限定一个
$ git rev-list -n 1 v3.0.0
```

### 全局配置用户信息
```bash
git config --global user.name "sineava"
git config --global user.email "sineava@163.com"
```
## nginx

### 设置默认跳转https
```nginx
server {
  if ($scheme = http ) {return 301 https://$host$request_uri;}
}
```

### 代理
```nginx
server {
  listen 120;
  server_name localhost;

  location / {
    proxy_pass http://localhost:5000/;
  }

  location /qq {
    rewrite /qq/(.*) /$1  break;
    proxy_pass https://api.qq.jsososo.com/;
  }
}
```
## 其他
### vim常用命令
```bash
# 文本输入
$ i
# 保存文件并退出
$ wq
# 不保存强制退出
$ q!
# 撤销上一步操作
$ u
# 删除一行
$ dd
# 光标跳行首
$ gg
# 删除光标后全部(配合gg可实现全部删除)
$ dG
# 跳转指定行(n为行数)
$ :n
```
### 快速框选截图
```
win+shift+s
```
---
[性能优化指南](https://web.dev/explore/fast?hl=zh-cn)
