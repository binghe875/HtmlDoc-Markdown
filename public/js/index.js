$(function() {

    /**
     * 修改只适应高度
     */
    $("#projectItem").height(Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    ) - 395);

    $.getJSON(binghe875.Config().projectUrl, function(data) {

        $("#projectname").html(data.project);

        var projectinfo = [
            '<h1>',
            data.project,
            '</h1>',
            '<p>',
            data.description,
            '</p>'
        ];
        $("#projectinfo .container").html(projectinfo.join(''));

        $.each(data.itme, function(i, v) {
            var doc = [];
            $.each(v.doc, function(di, dv) {
                doc.push('<a href="./page.html?url=' + dv.path + '&v=' + dv.versions + '" class="btn btn-primary" role="button" target="_blank">' + dv.name + '</a>');
            });
            var item = [
                '<div class="col-sm-4 col-md-3">',
                '<div class="panel panel-default">',
                '<div class="panel-heading">',
                v.name,
                '</div>',
                '<div class="panel-body">',
                '<p>',
                doc.join(' '),
                '</p>',
                '</div>',
                '</div>',
                '</div>'
            ];
            $("#projectItem").append(item.join(''));
        });
    });
});