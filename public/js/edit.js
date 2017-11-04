// 解码markdown
function ShowMarkdown(data) {
    //清空预览从新加载
    $("#editormd-view").html('');
    var result = editormd.markdownToHTML("editormd-view", {
        markdown: data,
        htmlDecode: "style,script,iframe",
        styleActiveLine: false,
        previewCodeHighlight: false,
        toc: true,
        // 自定义 ToC 容器层
        //tocContainer: "#custom-toc-container",
        emoji: true,
        taskList: true,
        tex: false,
        flowChart: true,
        sequenceDiagram: true,
    });
    // 代码高亮
    hljs.initHighlighting();

    //为所有table标签添加bootstap支持的表格类
    $("table").addClass("table table-bordered table-hover");
    //当表格列数过长时将自动出现滚动条
    $.each($('table'), function() {
        $(this).prop('outerHTML', '<div style="width: 100%;overflow-x: auto;">' + $(this).prop('outerHTML') + '</div>');
    });
    //超链接都在新窗口打开
    $('a[href^="http"]').each(function() {
        $(this).attr('target', '_blank');
    });
    // 标题颜色修改
    $("table thead tr").css({
        "background-color": "#08c",
        "color": "#fff"
    });
    $("table tr").each(function() {
        if ($(this).find("td").eq(1).html() == "object" || $(this).find("td").eq(1).html() == "array[object]") {
            $(this).css({
                "background-color": "#99CC99",
                "color": "#000"
            });
        }
    });
}

//下载文件
function download(filename, content) {
    var blob = new Blob([content], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');

    a.style = "display: none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 5);
}

var editor;

function loand(url) {
    if (editor.setValue) {
        $.get(url, function(data) {
            editor.setValue(data);
            ShowMarkdown(data);
        });
    }
}

// 编译器配置
require.config({
    paths: {
        'vs': 'public/js/vs'
    }
});
require(['vs/editor/editor.main'], function() {

    editor = monaco.editor.create(document.getElementById('container'), {
        value: '',
        language: 'markdown',
        theme: 'vs-dark',
    });

    var myBinding = editor.addCommand(monaco.KeyCode.F10, function() {
        var value = editor.getValue();
        ShowMarkdown(value);
    });
    //默认加载readme
    loand('./../../README.md');
});


$("#btnRun").on("click", function(e) {
    if (editor.getValue) {
        var value = editor.getValue();
        ShowMarkdown(value);
    }
});

$("#btnSave").on("click", function(e) {
    if (editor.getValue) {
        var value = editor.getValue();
        var filename = "binghe875.md";
        download(filename, value);
    }
});

//加载文档
function loandDocDropdown() {

    var url = "./../../item/project.json";
    $.getJSON(url, function(data) {

        $("#projectname").html(data.project);

        $.each(data.itme, function(i, v) {
            var doc = [];
            $.each(v.doc, function(di, dv) {
                doc.push('<li><a href="javascript:loand(\'' + dv.path + '\');">' + dv.name + '</a></li>');
            });
            var item = [
                doc.join(' '),
                '<li role="separator" class="divider"></li>'
            ];
            $("#projectItem").append(item.join(''));
        });
    });
}

loandDocDropdown();