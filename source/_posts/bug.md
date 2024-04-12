---
title: bug修复
date: 2024-04-01
top_img: https://sineava.vercel.app/img/cover/bg-01.jpg
cover: https://sineava.vercel.app/img/cover/bg-01.jpg
tags: ['前端', 'bug']
categories: ['前端']
---

## Git
### 无法连接到github
```bash
# 错误代码  Failed to connect to github.com port 443
$ git config --global http.proxy socks5 127.0.0.1:(代理端口)
$ git config --global https.proxy socks5 127.0.0.1:(代理端口)
$ git config --global https.proxy 127.0.0.1:(代理端口)
$ git config --global http.proxy 127.0.0.1:(代理端口)
```
## flutter
### flutter下载canvasKit或包卡住
```bash
# linux使用export,window直接配置系统环境变量就行,记得重启下
$ export PUB_HOSTED_URL=https://pub.flutter-io.cn
$ export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
### flutter run -d 安卓设备(卡住)
```bash
# 进行检测
$ flutter doctor
# 配置JAVA_HOME
# 切换到android,使用gradlew clean&build
$ cd android
$ ./gradlew clean build
```
### audioplayers视频无法播放
```dart
# 路径不用加/assets
player.play(AssetSource('assets_note2.wav'))
```
### flutter2->3
error: ProcessException: Process exited abnormally
```bash
$ flutter channel stable/beta/master
$ flutter upgrade
# 出现问题可执行如下操作
$ git checkout -- . # 出现网络问题,可切换到flutter sdk安装路径,然后执行该命令
```
### 组件内部返回上一页
我的UI结构: 登录注册页->注册页->注册页子组件按钮,直接路由会黑屏
```dart
// 父组件
Back(pContext: context)

// 子组件
final BuildContext pContext;
const Header({Key? key, required this.pContext}) : super(key: key);
onPressed: () {
  Navigator.pop(widget.pContext);
}
```
## windows系统
### windows不支持yarn
```bash
yarn : 无法加载文件 C:\Users\Administrator\AppData\Roaming\npm\yarn.ps1
## step1 管理员身份运行powershell
## step2 选择Y
$ set-ExecutionPolicy RemoteSigned
## step3 get-ExecutionPolicy结果为RemoteSigned则操作成功
```
### vscod字体变宽
```
中文输入法下,shift+空格键解决
```

---
[flutter升级gradle与gradle plugin](https://www.cnblogs.com/inexbot/p/17593347.html)

