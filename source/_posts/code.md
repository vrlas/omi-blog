---
title: 代码片段
top_img: /images/wallpapers/3.jpg
cover: /images/wallpapers/3.jpg
tags:
  - 前端
  - 代码
categories:
  - 前端
abbrlink: '35215128'
date: 2024-03-02 00:00:00
---

### JavaScript
#### switch优化if逻辑
```js
switch(day) {
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
		console.log('工作日')
		break
	case 6:
	case 7:
		console.log('周末')
		break
	default:
		console.log('error')
		break
}
```

#### 闭包实现状态管理
```js
function useState(initialState) {
  let state = initialState
  function getState() {
    return state
  }
  function setState(updatedState) {
    state = updatedState
  }
  return [getState, setState]
}

const [count, setCount] = useState(0)

count() // 0
setCount(1)
count() // 1
setCount(100)
count() // 100
```

#### 手写深拷贝
```js
const deepCopy = (obj, visited = new WeakMap()) => {
  // 检查循环引用
  if (visited.has(obj)) return visited.get(obj)
  // 如果是原始值或 null，直接返回
  if (obj === null || typeof obj !== "object") return obj
  // 如果是数组，创建一个新数组并递归复制每个元素
  if (Array.isArray(obj)) {
    const newArray = []
    // 设置映射以处理循环引用
    visited.set(obj, newArray)
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = deepCopy(obj[i], visited)
    }
    return newArray
  }
  // 如果是对象，创建一个新对象并递归复制每个属性
  const newObj = {}
  // 设置映射以处理循环引用
  visited.set(obj, newObj)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) newObj[key] = deepCopy(obj[key], visited)
  }
  return newObj
}

const originalObject = {
  a: 1,
  b: [2, 3],
  c: { d: 4, e: { f: 5 } },
  fn: function () {
    console.log("Hello from function!")
  }
}
const deepCopyObject = deepCopy(originalObject)
console.log(deepCopyObject) // { a: 1, b: [ 2, 3 ], c: { d: 4, e: { f: 5 } }, func: [Function: func] }
deepCopyObject.func() // 输出：Hello from function!
```

#### 闭包实现数据处理缓存
```js
// 在函数内部用一个对象存储输入的参数，如果下次再输入相同的参数，那就比较一下对象的属性。如果有缓存，就直接把值从这个对象里面取出来
function memorize(fn) {
  const cache = {}

  return (...args) => {
    const key = JSON.stringify(args)
    if (key in cache) {
      return cache[key]
    } else {
      const val = fn(...args)
      cache[key]= val
      return val
    }
  }
}

const add = (num) => num + 1

const adder = memorize(add)
console.log(adder(1))
console.log(adder(2))
```

#### Promise实现请求链式
```js
reqData1(params1).then(res1 => {
  return reqData2(res1)
}).then(res2 => {
  return reqData3(res2)
}).then(res3 => {
  console.log(res3)
}).catch(err => {
  console.log(err)
})
```

### 图片加载超时
```js
const getImg = () => new Promise(resolve => {
  const img = new Image()
  img.src = 'img_src'
  img.onload = () => resolve(img)
})

const timeout = seconds => new Promise((_, reject) => {
  setTimeout(() => reject('图片加载超时'), seconds * 1000)
})

Promise.race([getImg(), timeout(3)])
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

### Vue.js
#### haschange实现路由
```html
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

#### useMouse实现
```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))
  return { x, y }
}
```