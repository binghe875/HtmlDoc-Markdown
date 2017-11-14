var editor;

function loand(url) {
    if (editor.setValue) {
        $.get(url, function(data) {
            editor.setValue(data);
            binghe875.ShowMarkdown(data);
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
        binghe875.ShowMarkdown(value);
    });
    //默认加载readme
    loand('./../../README.md');
});

//加载文档
function loandDocDropdown() {

    $.getJSON(binghe875.Config.get().projectUrl, function(data) {

        $("#projectname").html(data.project);

        $.each(data.itme, function(i, v) {
            var doc = [];
            $.each(v.doc, function(di, dv) {
                doc.push('<li><a href="javascript:loand(\'' + dv.path + '?v=' + dv.versions + '\');">' + dv.name + '</a></li>');
            });
            var item = [
                doc.join(' '),
                '<li role="separator" class="divider"></li>'
            ];
            $("#projectItem").append(item.join(''));
        });
    });
}


$(function() {
    //加载doc文档列表
    loandDocDropdown();

    $("#btnRun").on("click", function(e) {
        if (editor.getValue) {
            var value = editor.getValue();
            binghe875.ShowMarkdown(value);
        }
    });

    $("#btnhide").on("click", function(e) {
        if ($("#markdownCode").css("display") == "none") {
            $("#markdownCode").show();
            $("#markdownView").removeClass("col-sm-12 col-md-12").addClass("col-sm-6 col-md-6");
            $("#btnhide").text("隐藏");

        } else {
            $("#markdownCode").hide();
            $("#markdownView").removeClass("col-sm-6 col-md-6").addClass("col-sm-12 col-md-12");
            $("#btnhide").text("显示");
        }
    });

    $("#btnSave").on("click", function(e) {
        if (editor.getValue) {
            var value = editor.getValue();
            binghe875.download(binghe875.Config.get().saveFileName, value);
        }
    });
});