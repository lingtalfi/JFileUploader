//----------------------------------------
// default theme
//----------------------------------------
if ('undefined' === typeof window.FileUploaderLang_Eng) {
    (function () {


        var dict = {
            'Select files': [
                'Sélectionner les fichiers',
            ],
            'Drag files here' : [
                'Déposez des fichiers ici.',
            ],
            'file(s)' : [
                'fichier(s)',
            ],
            'filename' : [
                'Nom du fichier',
            ],
            'status' : [
                'Statut',
            ],
            'size' : [
                'Poids',
            ],
            'Add files': [
                'Ajouter des fichiers',
            ],
            'Start upload': [
                'Envoyer les fichiers',
            ],
            '{x} files queued': [
                '{x} fichier en attente',
                '{x} fichiers en attente',
            ],
            'err.maxFileExceeded': [
                'Erreur avec "{fileName}": Le poids ne peut pas excéder {maxSize} (le fichier actuel pèse {fileSize}).',
            ],
            'err.wrongMimeType': [
                'Erreurr avec "{fileName}": Mimetype incorrect: "{fileMimeType}" n\'est pas autorisé. Les mimeType autorisés sont: {allowedMimeTypes}.',
            ],
            'err.uploadError': [
                'Erreurr avec "{fileName}": Une erreur est survenue pendant le téléchargement.',
            ],
            'err.uploadAborted': [
                'Erreur avec "{fileName}": Le téléchargement a été annulé.',
            ],
        };


        window.FileUploaderLang_Eng = function () {
        };
        window.FileUploaderLang_Eng.prototype = {
            get: function (msgId, number) {
                /**
                 * In french, plural system is simple.
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



