# HtmlDoc-Markdown

发布markdown 文件用于网络查看。

## 第三方组件

1. [Jquery](https://github.com/jquery/jquery) v3.2.0
1. [bootstrap](https://github.com/twbs/bootstrap) V3.3.7
1. [editormd.js](https://github.com/pandao/editor.md) v1.5.0  markdown解析
1. [highlight.js](https://highlightjs.org/) v9.12.0  代码美化
1. [monaco-editor](https://github.com/Microsoft/monaco-editor) V0.10.1  在线编辑器，代替editormd.js

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
