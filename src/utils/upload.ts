const fs = require('fs');
const multiparty = require('multiparty');



var upload = function (path, req, res, next) {
    return new Promise(function (resolve, reject) {
        // 解析一个文件上传
        var form = new multiparty.Form();
        // 设置编辑
        form.encoding = 'utf-8';
        // 设置文件存储路径
        form.uploadDir = path;
        // 设置单文件大小限制
        form.maxFilesSize = 2000 * 1024 * 1024;
        var textObj = {};
        var imgObj = {};
        form.parse(req, function (err, fields, files) {
            console.log(files)
            if (err) {
                console.log(err);
            }
            Object.keys(fields).forEach(function (name) { // 文本
                textObj[name] = fields[name];
            });
            Object.keys(files).forEach(function (name) {
                if (files[name] && files[name][0] && files[name][0].originalFilename) {
                    imgObj[name] = files[name];
                    var newPath = unescape(path + '/' + files[name][0].originalFilename);
                    var num = 1;
                    var suffix = newPath.split('.').pop();
                    var lastIndex = newPath.lastIndexOf('.');
                    var tmpname = newPath.substring(0, lastIndex);
                    while (fs.existsSync(newPath)) {
                        newPath = tmpname + '_' + num + '.' + suffix;
                        num++;
                    }
                    fs.renameSync(files[name][0].path, newPath);
                    imgObj[name][0].path = newPath;
                }
            });
            resolve([imgObj, textObj])
        });
    });
};

export default upload