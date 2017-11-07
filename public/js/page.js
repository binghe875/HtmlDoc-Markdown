function gotoTop(min_height) {
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
};
/*  
 * 获取url参数
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

$(function() {
    var _url = getQueryString("url") || url;
    $.get(_url, function(data) {
        // 解码markdown
        var result = editormd.markdownToHTML("editormd-view", {
            markdown: data,
            htmlDecode: "style,script,iframe",
            styleActiveLine: false,
            previewCodeHighlight: false,
            toc: true,
            // 自定义 ToC 容器层
            tocContainer: "#custom-toc-container",
            emoji: false,
            taskList: false,
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
        // 增加目录样式
        $(".markdown-toc>ul").addClass("nav nav-sidebar");

        //修改目录树增加折叠效果
        $(".markdown-toc-list ul ul").each(function() {
            $(this).hide();
        });
        $(".markdown-toc-list>li>ul li").on('click', function(e) {
            //增加选中-删除同级选中
            $(this).addClass('active').siblings().removeClass('active');
            // 隐藏同级子集
            $(this).siblings().find("ul").slideUp(500);
            //显示子集
            $(this).children("ul").slideToggle(500);
            //阻止冒泡事件
            event.stopPropagation();
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
        gotoTop();
    });
});