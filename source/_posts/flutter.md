---
title: flutter整理
date: 2023-06-08
top_img: https://sineava.vercel.app/img/cover/bg-03.jpg
cover: https://sineava.vercel.app/img/cover/bg-03.jpg
tags: ['dart', 'flutter']
categories: ['跨平台']
---

## dart语法
### list
```dart
// 创建指定长度list
List.generate(6, (index) => CircleButton(index: index));
```
## 基础
### 视图结构
![](https://npm.elemecdn.com/picture-bed@1.0.7//cover/flutter-1.png)
### StatelessWidget与StatefulWidget区别
- StatelessWidget: 无状态的widgets是不可变的,这意味着它们的属性不能改变,所有的值都是final
- StatefulWidget: 有状态的widgets也是不可变的,内部维护着可变的State
### 布局约束
- 上层widget向下层widget传递约束条件
- 下层widget向上层widget传递大小信息
- 上层widget决定下层widget的位置
### 常见Widgets
- Container: 容器(可添加padding,margin,border,background color等)
- GridView: 可滚动网格
- ListView: 可滚动列表
- Stack: 将widget覆盖到另一个上面(有点类似绝对定位),常搭配Positioned使用
- Expanded: 分配剩余空间,内部可设置flex
- Row/Column: 行/列布局,可配置主轴与交叉轴
- Card: 将相关信息整理到一个有圆角和阴影的盒子中
- ListTile: 将最多三行的文本、可选的导语以及后面的图标组织在一行中
- Tooltip: 简单提示
- Center: 居中布局
- Align: 放置子widget位于左上,右下等
- SafeArea: 安全区
- Inkwell: 常用于右侧展开
- TextField/TextFormField: 前者纯展示,如果有数据绑定等使用后者,搭配Form
- ListWheelScrollView: 滚轮列表,可用于时间滚动等功能
### 自适应与响应式
- 自适应: 应用以自适应的方式在不同的设备上（移动端和桌面端）运行，需要同时处理鼠标、键盘和触控输入
-  响应式: 一个响应式应用的布局会根据可用的屏幕大小而调整
### 设备类型判断
```dart
class FormFactor {
  static double desktop = 900;
  static double tablet = 600;
  static double handset = 300;
}

ScreenType getFormFactor(BuildContext context) {
  double deviceWidth = MediaQuery.of(context).size.shortestSide;
  if (deviceWidth > FormFactor.desktop) return ScreenType.Desktop;
  if (deviceWidth > FormFactor.tablet) return ScreenType.Tablet;
  if (deviceWidth > FormFactor.handset) return ScreenType.Handset;
  return ScreenType.Watch;
}
```

### 设备细分
Platform配合kIsWeb(检测是否支持浏览器,web端无Platform)使用
```dart
bool get isMobileDevice => !kIsWeb && (Platform.isIOS || Platform.isAndroid);
bool get isDesktopDevice => !kIsWeb && (Platform.isMacOS || Platform.isWindows || Platform.isLinux);
bool get isMobileDeviceOrWeb => kIsWeb || isMobileDevice;
bool get isDesktopDeviceOrWeb => kIsWeb || isDesktopDevice;
```
### 跳转页面
```dart
Navigator.of(context).push(
  MaterialPageRoute(
    builder: (context) => const SongScreen(song: song)
  )
)
```

### 可选择文本
```dart
return SelectableText('Select me!');

// 富文本
return SelectableText.rich(
  TextSpan(
    children: [
      TextSpan(text: 'Hello'),
      TextSpan(text: 'Bold', style: TextStyle(fontWeight: FontWeight.bold))
    ]
  )
);
```

## flutter常用库
### english_words
生成随机英文单词
### cupertino_icons
图标库(flutter已经内置)
### bitsdojo_window
桌面端:禁用顶部栏,用于定制应用窗口的标题栏
### audioplayers
音频播放
## 其他
### 开发环境
1. 安装flutter sdk
2. 配置环境变量(到bin目录)
3. vscode安装flutter插件(会自动安装dart)
4. 安装android studio(安装sdk)
5. android settings -> system settings -> android sdk -> sdk tools(勾选commond-line tools下载)

### 连接真机(无数据线)
1. adb tcpip 任意端口(此时需要数据线连接)
2. 断开数据线
3. adb connect 手机ip:刚才的端口

### 常用命令
```bash
# flutter 检测
$ flutter doctor
# 查询所有设备
$ flutter devices
# 运行到指定设备
$ flutter run -d 设备号
# 创建模板项目
$ flutter create project
# flutter拉包
$ flutter pub add 包名
# flutter更新/下载依赖
$ flutter pub get
# 更新flutter
$ flutter upgrade
```
### 关闭右上角debug
```dart
MaterialApp(
  debugShowCheckedModeBanner: false
)
```
### 快捷键
```dart
stless // 快速创建无状态class
stful  // 快速创建状态class
```
---
[flutter中文文档](https://flutter.cn/)
[dartpad](https://dartpad.cn/)
[flutter插件库](https://pub.dev/)
[flutter cookbook](https://flutter.cn/docs/cookbook)
[核心widget](https://flutter.cn/docs/development/ui/widgets)
[资源与图片](https://flutter.cn/docs/development/ui/assets-and-images)
[图片在线转App Icon](https://appicon.co/)
[flutter实战](https://book.flutterchina.club/)
[flutter组件详解](http://laomengit.com/)