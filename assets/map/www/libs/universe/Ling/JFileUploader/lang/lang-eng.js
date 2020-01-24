//----------------------------------------
// default theme
//----------------------------------------
if ('undefined' === typeof window.FileUploaderLang_Eng) {
    (function () {


        var dict = {
            'Select files': [
                'Select files',
            ],
            'Drag files here' : [
                'Drag files here.',
            ],
            'file(s)' : [
                'file(s)',
            ],
            'filename' : [
                'Filename',
            ],
            'status' : [
                'Status',
            ],
            'size' : [
                'Size',
            ],
            'Add files': [
                'Add files',
            ],
            'Start upload': [
                'Start upload',
            ],
            '{x} files queued': [
                '{x} file queued',
                '{x} files queued',
            ],
            'err.maxFileExceeded': [
                'Error with "{fileName}": The size cannot exceed {maxSize} (your file weights {fileSize}).',
            ],
            'err.wrongMimeType': [
                'Error with "{fileName}": Wrong mimetype: "{fileMimeType}" is not allowed. The allowed mime types are: {allowedMimeTypes}.',
            ],
            'err.uploadError': [
                'Error with "{fileName}": An error occurred during the upload for some reason.',
            ],
            'err.uploadAborted': [
                'Error with "{fileName}": The upload was aborted for some reason.',
            ],
        };


        window.FileUploaderLang_Eng = function () {
        };
        window.FileUploaderLang_Eng.prototype = {
            get: function (msgId, number) {
                /**
                 * In english, plural system is simple.
                 */
                return this._get(msgId, number);

            },
            //----------------------------------------
            // PRIVATE
            //----------------------------------------
            _get: function (msg, number) {

                if ('undefined' === typeof number || '' === number) {
                    return dict[msg][0]; // singular form
                }


                // plural form
                var pluralKey;
                if (number > 1) {
                    pluralKey = 1;
                } else {
                    pluralKey = 0;
                }
                return dict[msg][pluralKey].replace('{x}', number);
            },
        };


        // auto-registration of the default theme
        window.FileUploaderLangs.eng = new FileUploaderLang_Eng();
    })();
}



