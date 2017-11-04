$(function() {
    var url = "./../../item/project.json";
    $.getJSON(url, function(data) {
        $.each(data.itme, function(i, v) {
            var doc = [];
            $.each(v.doc, function(di, dv) {
                doc.push('<a href="./page.html?url=' + dv.path + '" class="btn btn-primary" role="button" target="_blank">' + dv.name + '</a>');
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