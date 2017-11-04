# HtmlDoc-Markdown

发布markdown 文件用于网络查看。

## 第三方组件

1. Jquery v3.2.0
1. bootstrap V3.3.7
1. editormd.js v1.5.0
1. highlight.js v9.12.0

## 使用方法

修改`item/project.json`

```json
{
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