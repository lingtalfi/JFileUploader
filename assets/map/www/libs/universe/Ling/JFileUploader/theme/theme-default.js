//----------------------------------------
// default theme
//----------------------------------------
if ('undefined' === typeof window.FileUploaderTheme_Default) {
    (function () {


        //----------------------------------------
        // UTILS
        //----------------------------------------
        // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
        var formatBytes = function (bytes, decimals) {
            if (0 === bytes) {
                return "0 Bytes";
            }
            var c = 1024, d = decimals || 2, e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                f = Math.floor(Math.log(bytes) / Math.log(c));
            return parseFloat((bytes / Math.pow(c, f)).toFixed(d)) + " " + e[f]
        };

        // https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
        function escapeHtml(text) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };

            return text.replace(/[&<>"']/g, function (m) {
                return map[m];
            });
        }


        var imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];


        //----------------------------------------
        //
        //----------------------------------------
        window.FileUploaderTheme_Default = function () {
            this.container = null;
        };
        window.FileUploaderTheme_Default.prototype = {
            //----------------------------------------
            //
            //----------------------------------------
            addUserError: function (msg) {
                var jErrorContainer = this.container.find('.error-container-item');
                var s = '';
                s += '<div class="error-item">\n' +
                    '    <span>' + msg + '</span>\n' +
                    '    <button class="btn-remove-error"><i class="fas fa-times-circle btn-remove-error"></i></button>\n' +
                    '</div>';
                jErrorContainer.append(s);
            },
            removeUserErrorByTarget: function (jTarget) {
                jTarget.closest('.error-item').remove();
            },
            /**
             * Options are:
             * - defaultView: string=text (image|text). The view to open the widget with.
             * - showHiddenInput: bool=false. Whether to show the hidden inputs (useful while debugging).
             *
             *
             *
             */
            buildFileUploader: function (options) {
                var $this = this;


                var s = '        <div class="hidden-inputs" style="display: none"></div>\n' +
                    '        <div class="error-container">\n' +
                    '            <div class="error-container-item"></div>\n' +
                    '        </div>\n' +
                    '        <div class="header">\n' +
                    '            <div class="left text-select-files">Select files</div>\n' +
                    '            <div class="right">\n' +
                    '                <button class="btn-view-text"><i class="fas fa-list-ul btn-view-text"></i></button>\n' +
                    '                <button class="btn-view-image"><i class="far fa-image btn-view-image"></i></button>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="dropzone">\n' +
                    '            <div class="dropzone-text visible">\n' +
                    '                <div class="dropzone-text-header">\n' +
                    '                    <div class="cell-name">Filename</div>\n' +
                    '                    <div class="cell-status">Status</div>\n' +
                    '                    <div class="cell-size">Size</div>\n' +
                    '                    <div class="cell-action"></div>\n' +
                    '                </div>\n' +
                    '                <div class="dropzone-text-container">\n' +
                    '                    <div class="dropzone-droptext">Drag files here.</div>\n' +
                    '                    <ul class="fileuploader-item-container"></ul>\n' +
                    '\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '\n' +
                    '            <div class="dropzone-image">\n' +
                    '                <div class="dropzone-droptext">Drag files here.</div>\n' +
                    '                <div class="filelist fileuploader-item-container"></div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="footer">\n' +
                    '            <div class="left">\n' +
                    '                <button class="btn-add-file"><i class="btn-add-file fas fa-plus-circle"></i> <span\n' +
                    '                            class="text-add-file btn-add-file">Add files</span></button>\n' +
                    '                <button class="btn-start-upload"><i class="btn-start-upload fas fa-arrow-circle-right"></i> <span class="btn-start-upload text-start-upload">Start upload</span></button>\n' +
                    '            </div>\n' +
                    '            <div class="right">\n' +
                    '                <span class="footer-info"><span class="global-number-of-files">0</span> <span class="text-file">file(s)</span></span>\n' +
                    '                <span class="footer-info global-percent-upload">0%</span>\n' +
                    '                <span class="footer-info global-size">0 kb</span>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class="hidden" style="display: none">\n' +
                    '            <input class="input-file" type="file" name="the_file" multiple/>\n' +
                    '        </div>';
                this.container.append(s);


                // injecting i18n text
                this.container.find(".text-start-upload").html(this.lang.get("Start upload"));
                this.container.find(".text-select-files").html(this.lang.get("Select files"));
                this.container.find(".dropzone-droptext").html(this.lang.get("Drag files here"));
                this.container.find(".text-file").html(this.lang.get("file(s)"));
                this.container.find(".cell-name").html(this.lang.get("filename"));
                this.container.find(".cell-status").html(this.lang.get("status"));
                this.container.find(".cell-size").html(this.lang.get("size"));

                var defaultView = options.defaultView || "text";
                this._selectView(defaultView);

                if (true === options.showHiddenInput) {
                    this.container.find('.hidden-inputs').show();
                }


                //----------------------------------------
                // JS LISTENERS
                //----------------------------------------
                this.container.on('click', function (e) {
                    var jTarget = $(e.target);
                    if (jTarget.hasClass('btn-view-text')) {
                        $this._selectView("text");
                        return false;
                    } else if (jTarget.hasClass('btn-view-image')) {
                        $this._selectView("image");
                        return false;
                    }
                });


            },
            addFile: function (oFile) {

                var itemId = oFile.itemId;
                var jUlText = this.container.find('.dropzone-text-container ul');
                var s = '' +
                    '<li class="dropzone-text-item-container fileuploader-item" data-id="' + itemId + '">\n' +
                    '    <div class="cell-name">Filename</div>\n' +
                    '    <div class="cell-status"></div>\n' +
                    '    <div class="cell-size">15 kb</div>\n' +
                    '    <div class="cell-action">\n' +
                    '    <button class="btn-remove-file"><i\n' +
                    '    class="fas fa-minus-circle btn-remove-file"></i>\n' +
                    '    </button>\n' +
                    '    </div>\n' +
                    '</li>';
                var jLi = $(s);
                jLi.find('.cell-name').html(oFile.name);
                jLi.find('.cell-size').html(formatBytes(oFile.size));
                jUlText.append(jLi);


                var jImageContainer = this.container.find('.filelist');
                var s = '' +
                    '<div class="dropzone-image-item-container fileuploader-item" data-id="' + itemId + '">\n' +
                    '    <div class="cell-image"></div>\n' +
                    '    <div class="cell-name">\n' +
                    '    </div>\n' +
                    '    <div class="cell-size">15 kb</div>\n' +
                    '    <div class="cell-action">\n' +
                    '        <button class="btn-remove-file"><i class="fas fa-minus-circle btn-remove-file"></i>\n' +
                    '        </button>\n' +
                    '    </div>\n' +
                    '</div>';

                var escapedName = escapeHtml(oFile.name);
                var jDiv = $(s);
                jDiv.find('.cell-name').html(oFile.name);
                jDiv.find('.cell-name').attr("title", escapedName);
                jDiv.find('.cell-size').html(formatBytes(oFile.size));

                var extension = oFile.name.split('.').pop().toLowerCase();


                // image or not?
                if (-1 === imageExtensions.indexOf(extension)) {
                    jDiv.find(".cell-image").html('<i class="far fa-file fa-5x"></i>');

                } else {

                    var reader = new FileReader();
                    reader.addEventListener("load", function (e) {

                        var jImg = $('<img src="" alt="' + escapeHtml(escapedName) + '">');
                        jImg.attr("src", e.target.result);
                        jDiv.find(".cell-image").append(jImg);

                    }, false);
                    reader.readAsDataURL(oFile);
                }


                jImageContainer.append(jDiv);

            },
            updateFooterInfo: function (files) {

                var msg;
                var nbFiles = files.length;
                var nbQueuedFiles = 0;
                var filesWeight = 0;
                for (var i in files) {
                    var oFile = files[i];
                    filesWeight += oFile.size;
                    if ('undefined' === typeof oFile.id) {
                        nbQueuedFiles++;
                    }
                }


                this.container.find('.global-number-of-files').html(nbFiles);
                this.container.find('.global-size').html(formatBytes(filesWeight));

                if (0 === nbQueuedFiles) {
                    msg = this.lang.get("Add files");
                    this.container.find('.global-percent-upload').html("0 %");
                } else {
                    msg = this.lang.get("{x} files queued", nbQueuedFiles);
                }
                this.container.find('.text-add-file').html(msg);
            },
            removeFileByIndex: function (index) {

                var jText = this.container.find(".dropzone-text");
                var jImage = this.container.find(".dropzone-image");
                jText.find(".fileuploader-item").eq(index).remove();
                jImage.find(".fileuploader-item").eq(index).remove();

            },
            addHiddenInput: function (url, id) {
                var jHiddenContainer = this.container.find('.hidden-inputs');
                var name = this.fileUploader.options.name;
                var maxFile = this.fileUploader.options.maxFile;
                if (1 !== maxFile) {
                    name += '[]';
                }
                var s = '';
                s += '<input type="text" name="' + name + '" value="' + escapeHtml(url) + '" data-id="' + id + '">';
                jHiddenContainer.append(s);
            },

            removeHiddenInputById: function (id) {
                var jInputContainer = this.container.find('.hidden-inputs');
                jInputContainer.find('[data-id="' + id + '"]').remove();
            },
            refreshProgress: function (oFile, percent, loaded, total, globalPercent) {
                var itemId = oFile.itemId;
                var jItem = this.container.find('.dropzone-text-container .fileuploader-item-container').find('.fileuploader-item[data-id="' + itemId + '"]');
                jItem.find('.cell-status').html(percent + " %");


                this.container.find('.global-percent-upload').html(globalPercent + " %");
            },
            reorderFiles: function (oFiles, oldIndex, newIndex) {

                // recreate hidden inputs
                this._clearHiddenInputs();
                for (var i in oFiles) {
                    var oFile = oFiles[i];
                    if ("undefined" !== typeof oFile.id) {
                        this.addHiddenInput(oFile.url, oFile.id);
                    }
                }


                var jTarget = this.container.find(".last-dragged-item");
                var jContainer;
                if (true === jTarget.parent().parent().hasClass("dropzone-image")) {
                    jContainer = this.container.find('.dropzone-text-container .fileuploader-item-container');
                } else {
                    jContainer = this.container.find('.dropzone-image .fileuploader-item-container');
                }

                var jMoved = jContainer.find('.fileuploader-item').eq(oldIndex);
                var jPivot = jContainer.find('.fileuploader-item').eq(newIndex);
                if (newIndex > oldIndex) {
                    jMoved.insertAfter(jPivot);
                } else {
                    jMoved.insertBefore(jPivot);
                }
            },
            hideUploadButton: function () {
                this.container.find("button.btn-start-upload").hide();
            },
            //----------------------------------------
            //
            //----------------------------------------
            _selectView: function (type) {
                var jText = this.container.find(".dropzone-text");
                var jImage = this.container.find(".dropzone-image");
                if ('text' === type) {
                    jText.addClass('visible');
                    jImage.removeClass('visible');
                } else {
                    jImage.addClass('visible');
                    jText.removeClass('visible');
                }
            },
            _clearHiddenInputs: function () {
                this.container.find('.hidden-inputs').empty();
            },
        };


        // auto-registration of the default theme
        window.FileUploaderThemes.default = new FileUploaderTheme_Default();
    })();
}



