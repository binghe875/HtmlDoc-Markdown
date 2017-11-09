$(function() {
    var _url = getQueryString("url") || url;
    var _data;
    $.get(_url, function(data) {
        _data = data;
        ShowMarkdown(data, {
            tocContainer: "#markdownMenu",
        }, function() {
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
            gotoTop();
        });
    });

    $("#btnShowMenu").on("click", function(e) {
        if ($("#markdownMenu").css("display") == "none") {
            $("#markdownMenu").show();
            $("#markdownView").removeClass("col-sm-12 col-md-12").addClass("col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2");
            $("#btnShowMenu").html("目录<br>隐藏");
            ShowMarkdown(_data, {
                tocContainer: "#markdownMenu",
            }, function() {
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
                gotoTop();
            });
        } else {
            $("#markdownMenu").hide();
            $("#markdownView").removeClass("col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2").addClass("col-sm-12 col-md-12");
            $("#btnShowMenu").html("目录<br>显示");
            ShowMarkdown(_data, {}, function() {
                gotoTop();
            });
        }
    });
});