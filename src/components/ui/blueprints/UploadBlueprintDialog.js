'use strict';

var uploadForm = $('#uploadForm');

exports.getUploadForm = function(){
    return uploadForm;
};


exports.getBlueprintIdLabel = function(){
    return uploadForm.element(by.model('blueprintUploadOpts.blueprint_id')).getAttribute('placeholder');
};


exports.setId = function( id ){
    return uploadForm.element(by.model('blueprintUploadOpts.blueprint_id')).sendKeys(id);
};

exports.setUrl = function ( url ){
    return uploadForm.element(by.model('inputText')).sendKeys(url);
};

exports.setBlueprintFile = function( filename ){
    return uploadForm.element(by.model('blueprintUploadOpts.params.application_file_name')).sendKeys(filename);
};


exports.submit = function(){
    uploadForm.element(by.css('[ng-click="uploadFile()"]')).click();
};

/**
 *
 * @param {object} opts
 * @param {object.string} opts.blueprint_location
 * @param {object.string} opts.blueprint_id
 * @param {object.string} opts.blueprint_filename
 */
exports.setDetails = function( opts ){
    if ( opts.blueprint_location ){
        exports.setUrl(opts.blueprint_location);
    }

    if ( opts.blueprint_id ){
        exports.setId(opts.blueprint_id);
    }

    if ( opts.blueprint_filename ){
        exports.setBlueprintFile(opts.blueprint_filename );
    }

};