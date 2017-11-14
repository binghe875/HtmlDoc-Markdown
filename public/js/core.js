var binghe875 = {
    _defaultConfig: {
        projectUrl: "./item/project.json?random=" + new Date().getTime(),
        saveFileName: new Date().getTime() + ".md"
    },
    /**
     * 配置信息获取
     */
    Config: {
        get: function() {
            return binghe875._defaultConfig;
        },
        set: function(object) {
            binghe875._defaultConfig = $.extend({}, binghe875._defaultConfig, object);
            return _defaultConfig;
        }
    },
    /**
     * 返回页面顶部
     * @min_height 最小高度 默认值是600
     */
    gotoTop: function(min_height) {
        var gotoTop_html = '<div id="gotoTop">TOP</div>';
        $("#editormd-view").append(gotoTop_html);
        //定义返回顶部点击向上滚动的动画
        $("#gotoTop").click(
            function() {
                $('html,body').animate({ scrollTop: 0 }, 700);
            }).hover(
            //为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现
            function() { $(this).addClass("hover"); },
            function() {
                $(this).removeClass("hover");
            });
        //获取页面的最小高度，无传入值则默认为600像素
        min_height ? min_height = min_height : min_height = 600;
        //为窗口的scroll事件绑定处理函数
        $(window).scroll(function() {
            //获取窗口的滚动条的垂直位置
            var s = $(window).scrollTop();
            //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
            if (s > min_height) {
                $("#gotoTop").fadeIn(100);
            } else {
                $("#gotoTop").fadeOut(200);
            };
        });
    },
    /*  
     * 获取url链接参数
     * @name: 参数名称
     */
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    /**
     * 解析md文件
     * @data : markdown 文件数据
     * @object : editormd 配置对象，替换初始化对象
     * @func : 解析完成后调用方法 
     */
    ShowMarkdown: function(data, object, func) {
        var _default = {
            markdown: data,
            htmlDecode: "style,script,iframe",
            styleActiveLine: false,
            previewCodeHighlight: false,
            toc: true,
            emoji: false,
            taskList: false,
            tex: false,
            flowChart: true,
            sequenceDiagram: true,
        }
        var settings = $.extend({}, _default, object);
        $("#editormd-view").html('');
        // 解码markdown
        var result = editormd.markdownToHTML("editormd-view", settings);
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
        if (func)
            func();
    },
    /**
     * 下载文件
     * @filename: 文件名称
     * @content: 文件内容
     */
    download: function(filename, content) {
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
};