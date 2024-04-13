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