/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.config.font_names = 'Vazir; Tahoma';
CKEDITOR.config.uiColor = '#f0f0f0';
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
    config.height = 300;
    config.language = 'fa';
    config.uiColor = '#f0f0f0';
    config.filebrowserBrowseUrl = '/assets/editors/kcfinder/browse.php?opener=ckeditor&type=files';
    config.filebrowserImageBrowseUrl = '/assets/editors/kcfinder/browse.php?opener=ckeditor&type=images';
    config.filebrowserFlashBrowseUrl = '/assets/editors/kcfinder/browse.php?opener=ckeditor&type=flash';
    config.filebrowserUploadUrl = '/assets/editors/kcfinder/upload.php?opener=ckeditor&type=files';
    config.filebrowserImageUploadUrl = '/assets/editors/kcfinder/upload.php?opener=ckeditor&type=images';
    config.filebrowserFlashUploadUrl = '/assets/editors/kcfinder/upload.php?opener=ckeditor&type=flash';
};