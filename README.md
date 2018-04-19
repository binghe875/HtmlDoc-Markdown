# HtmlDoc-Markdown

发布markdown 文件用于网络查看。

支持多项目多文档自动，目录自动左侧生成。

## 更新说明

V1.8

`E` 修改页面增加高度自适应功能，自动识别页面高度加载编辑器。

V1.7

`E` 修改加载参数链接增加版本号防止缓存，配置文件增加随机数防止缓存。

V1.6

`A` 文档页面增加2种目录展示方式，可自由切换。

`A` 增加主脚本文件，相关重复方法合并到核心脚本，增加默认配置对象。

V1.5

`A` 编辑页面增加隐藏按钮，方便浏览，按钮修改到导航栏方便操作。

V1.4

`E` 修改浏览页面菜单样式

V1.3

`E` 修改配置文件路径问题，支持任意路径发布

V1.2

`E` 网站介绍也增加到配置文件

V1.1

`A` 标题目录证据配置文件可以配置

V1.0

`A` 发布第一版

> A 新增 E 修改 D 删除

## 第三方组件

- [Jquery](https://github.com/jquery/jquery) v3.2.0

    不需要什么解释吧

- [bootstrap](https://github.com/twbs/bootstrap) V3.3.7

    同上

- [editormd.js](https://github.com/pandao/editor.md) v1.5.0

    markdown解析，支持各种扩展语法，并未使用其编辑功能。

- [highlight.js](https://highlightjs.org/) v9.12.0

    鼎鼎大名的代码美化

- [monaco-editor](https://github.com/Microsoft/monaco-editor) V0.10.1

    vs code的在线编辑器，代替editormd.js的编辑功能，性能真的好

## 运行环境

ie10+ chrome Firefox

## 使用方法

### 发布

用任意web服务器发布

### 配置

修改`item/project.json`

```json
{
    "project": "文档中心",
    "description": "项目中涉及的文档，以网页形式发布，方便沟通和交流存档，并且规范文档化办公。",
    "itme": [{
        "name": "项目名称",
        "description": "项目描述",
        "doc": [{
            "name": "文档名称",
            "path": "文档路径",
            "versions": "版本号"
        }]
    }]
}
```

### 运行

访问index.html 即可看到对应项目的文档目录，点击即可查看。

### 访问edit.html 在线编写并保存。

保存就是下载，因为未用到服务端代码，因此无法实现服务端直接保存，需要自行复制到相应目录 并配置。

## 扩展使用

可自行编写服务端保存，并且读取文件目录自动生成project.json。即可完美解决。
