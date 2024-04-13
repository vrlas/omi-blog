---
title: cesium入门指南
date: 2023-04-28
top_img: /images/wallpapers/2.jpg
cover: /images/wallpapers/2.jpg
tags: ['三维', 'gis']
categories: ['地图']
---

## 基础
### 地图初始化
```js
const viewer = new Viewer(mapRef.value, {
  animation: false, // 时间动画控件
  timeline: false, // 时间轴
  selectionIndicator: false,
  infoBox: false,
  baseLayerPicker: false,
  terrainProvider: createWorldTerrain()
})
```
### 颜色
```js
Cesium.Color.RED
Cesium.Color.RED.withAlpha(0.1) // 透明度
Cesium.Color.fromCssColorString('#67ADDF') // hex颜色
Cesium.Color.freeRandom() // 随机颜色
```
### 点绘制
```js
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(Number(lng), Number(lat)),
  billboard: {
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴地
    image: new Cesium.PinBuilder().fromText(
      'P',
      Cesium.Color.fromRandom({ alpha: Math.random() * 0.2 + 0.8 }),
      40 // 图标大小
    )
  }
})
```
### 线绘制
```js
viewer.entities.add({
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray(y),
    clampToGround: true, // 贴地
    material: Cesium.Color.YELLOW
  }
})
```
### 面绘制
```js
viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray(y),
    clampToGround: true, // 贴地
    material: Cesium.Color.BLUE.withAlpha(0.4)
  }
})
```
### 视距元素显示
```js
// 当视点距离在0-60000米时显示
{
  distanceDisplayCondition: new DistanceDisplayCondition(0, 60000)
}
```
## 进阶
### 矢量点位渲染
```js
const pointPrimitives = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection())
points.forEach(({ lng, lat }: any, idx: number) => {
  const position = Cesium.Cartesian3.fromDegrees(Number(lng), Number(lat))
  pointPrimitives.add({
    pixelSize: 5,
    color: Cesium.Color.GREEN,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 0,
    position
  })
})
```
### 视图
```js
viewer.flyTo(viewer.entities)
```