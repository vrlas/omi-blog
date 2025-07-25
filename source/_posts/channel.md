---
title: uniapp实现与原生安卓进行通信
top_img: https://npm.onmicrosoft.cn/o-bed@1.0.9/img/cover/10.jpg
cover: https://npm.onmicrosoft.cn/o-bed@1.0.9/img/cover/10.jpg
tags:
  - uniapp
  - 原生安卓
categories:
  - 前端
abbrlink: '35215129'
date: 2025-05-22 00:00:00
---

## 引言
> 最近正好闲着没事,试了下`uniapp`(aar方式)与`原生安卓`(kotlin)进行通信,官方文档众所周知一如既往的烂,所有这中间也踩了不少坑,然后功能实现的是uniapp nfc读取卡id,因为我没有公交卡和门禁卡,加上身份证和银行卡有加密,暂时就拿id吧,内容暂时就分uniapp和原生安卓两个模块进行介绍。因为我对原生也不是太熟悉,所以写的不对的地方望指正

## 安卓原生
### 创建安卓module
> 需要先创建安卓项目,然后才能创建module

![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/1.png)
![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/2.png)

### 下载uniapp-v8-release.aar
> 这个aar就是uniapp官方开的与安卓桥接的库,下载地址我放在文章底部了

### 项目目录结构
> 将下载的uniapp-v8-release.aar放到如下图片所在位置,然后修改build.gradle.kts文件

![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/3.png)

#### build.gradle.kts
```kotlin
dependencies {
  // ...
  // 这一步非常重要,请确认下路径没有问题
  compileOnly(fileTree("./libs") {
      include("uniapp-v8-release.aar")
  })
}
```

#### main.kt
```kotlin
import android.app.Activity
import android.nfc.NfcAdapter
// 如果这个报错,请检查下uniapp-v8-release.aar
import io.dcloud.feature.uniapp.annotation.UniJSMethod
import io.dcloud.feature.uniapp.common.UniModule

class NfcDataReader : UniModule() {

  @UniJSMethod(uiThread = true)
  fun startListening(callback: (tagId: String) -> Unit) {
    val activity = mUniSDKInstance?.context as? Activity ?: return
    NfcAdapter.getDefaultAdapter(activity)?.enableReaderMode(
      activity,
      { tag -> callback(tag.id.joinToString("") { "%02X".format(it) }) },
      NfcAdapter.FLAG_READER_NFC_A,
      null
    )
  }

  @UniJSMethod(uiThread = true)
  fun stopListening() {
    (mUniSDKInstance?.context as? Activity)?.let { activity ->
      NfcAdapter.getDefaultAdapter(activity)?.disableReaderMode(activity)
    }
  }
}
```

### AndroidManifest.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- 添加这行,开启nfc权限 -->
  <uses-permission android:name="android.permission.NFC" />
</manifest>
```

### 打包aar

> 在`项目根目录`运行如下命令,打包后的aar在如下位置,该文件后续有用

```bash
./gradlew nfc:assembleRelease
```

![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/4.png)

## UniApp
### 项目目录
> 注意: 主文件夹必须叫nativeplugins,然后调用自定义插件必须打**自定义基座**

![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/5.png)

### package.json
```json
{
  "name": "nfc插件",
  "version": "1.0.0",
  "id": "nfc",
  "_dp_type":"nativeplugin",
  "_dp_nativeplugin":{
    "android": {
      "plugins": [{
        "type": "module",
        "name": "nfc",
        "class": "NfcDataReader"
      }],
      "integrateType": "aar"
    }
  }
}
```

### 打自定义基座
> 运行->运行到手机或模拟器->制作自定义调试基座,这儿必须使用传统打包,反正我试了下快速安心打包好像不行,打好了把这个apk装到手机上即可

![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/6.png)

### uniapp调用
```js
// 在需要的地方运行代码即可,此时nfc卡靠近则可以读取到了
const nfc = uni.requireNativePlugin('nfc')
nfc.startListening(({tagId}) => console.log(`nfc识别码: ${tagId}`))
```

### 使用本地基座运行项目

![](https://npm.onmicrosoft.cn/o-bed@1.0.9/img/channel/7.png)

---
[uniapp安卓插件开发教程](https://nativesupport.dcloud.net.cn/NativePlugin/course/android.html)
[android nfc基础知识](https://developer.android.com/develop/connectivity/nfc/nfc?hl=zh-cn)
[aar包下载地址](https://github.com/jeawy/UniPlugin-Hello-AS/tree/master/app/libs)