'use strict';
var Input = require('./Input');

function UploadForm (baseElement){
    var base = baseElement;

    function selectFile(absolutePath){
        base.$('input[type="file"]').sendKeys(absolutePath);
    }

    this.selectFile = selectFile;
    this.input = new Input(base.$('input[type=text]'));
}

module.exports = UploadForm;