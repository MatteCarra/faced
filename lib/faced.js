/*jslint node: true, nomen:true*/
"use strict";

var OpenCV = require("opencv");
var path = require('path');

function Faced() {}

Faced.prototype.detect = function (path, fn, context) {
    OpenCV.readImage(path, function(err, im){
        if (err || typeof im !== "object") {
            return fn.call(context, undefined, undefined, path);
        }
        var size = im.size();
        im.detectObject(OpenCV.FACE_CASCADE, {}, function(err, faces){
            if (size[0] === 0 || size[1] === 0) {
                return fn.call(context, undefined, undefined, path);
            }
            fn.call(context, faces, im, path);
        });
    });
};

module.exports = Faced;
