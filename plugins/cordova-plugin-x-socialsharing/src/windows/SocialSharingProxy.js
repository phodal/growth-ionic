var cordova = require('cordova');

module.exports = {
    share: function (win, fail, args) {
        //Text Message
        var message = args[0];
        //Title 
        var subject = args[1];
        //File(s) Path
        var fileOrFileArray = args[2];
        //Web link
        var url = args[3];
		
		var folder = Windows.Storage.ApplicationData.current.temporaryFolder;

        var getExtension = function (strBase64) {
            return strBase64.substring(strBase64.indexOf("/") + 1, strBase64.indexOf(";base64"));
        };

        var replaceAll = function (str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        };

        var sanitizeFilename = function (name) {
            return replaceAll(name, "[:\\\\/*?|<> ]", "_");
        };

        var getFileName = function (position, fileExtension) {
            var fileName = (subject ? sanitizeFilename(subject) : "file") + (position == 0 ? "" : "_" + position) + "." + fileExtension;
            return fileName;
        };

        var createTemporalFile = function (fileName, buffer) {

            var filePath = "";
            return folder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
                filePath = file.path;
                return Windows.Storage.FileIO.writeBufferAsync(file, buffer);
            }).then(function(){
                return Windows.Storage.StorageFile.getFileFromPathAsync(filePath);
            });
        };

        var doShare = function (e) {
            e.request.data.properties.title = subject?subject: "Sharing";
            if (message) e.request.data.setText(message);
            if (url) e.request.data.setWebLink(new Windows.Foundation.Uri(url));
            if (fileOrFileArray.length > 0) {
                var deferral = e.request.getDeferral();
                var storageItems = [];
                var filesCount = fileOrFileArray.length;
				
                var completeFile = function () {
                    if (!--filesCount) {
                        storageItems.length && e.request.data.setStorageItems(storageItems);
                        deferral.complete();
                    }
                };

                for (var i = 0; i < fileOrFileArray.length; i++) {

                    var file = fileOrFileArray[i];
                    if (file.indexOf("data:") >= 0) {                        
                        var fileName = getFileName(i, getExtension(file));
                        var buffer = Windows.Security.Cryptography.CryptographicBuffer.decodeFromBase64String(file.split(',')[1]);
                        if (buffer) {
                            createTemporalFile(fileName, buffer).done(
                                function (file) {
                                    storageItems.push(file);
                                    completeFile();
                                },
                                function () {
                                    completeFile();
                                }
                            );
                        }
                        else {
                            completeFile();
                        }
                    }
                    else {
                        Windows.Storage.StorageFile.getFileFromPathAsync(file).done(
                            function (file) {
                                storageItems.push(file);
                                completeFile();
                            },
                            function () {
                                completeFile();
                            }
                        );
                    }
                }
            }
        };


        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();

        dataTransferManager.addEventListener("datarequested", doShare);

        try {
            Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
            win(true);
        } catch (err) {
            fail(err);
        }
    },

    canShareViaEmail: function (win, fail, args) {
        win(true);
    },

    shareViaEmail: function (win, fail, args) {
        //Text Message
        var message = args[0];
        //Title 
        var subject = args[1];
        //File(s) Path
        var fileOrFileArray = args[5];

        var doShare = function (e) {
            e.request.data.properties.title = subject ? subject : "Sharing";
            if (message) {
                var htmlFormat = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(message);
                e.request.data.setHtmlFormat(htmlFormat);
            }

            if (fileOrFileArray.length > 0) {
                var deferral = e.request.getDeferral();
                var storageItems = [];
                var filesCount = fileOrFileArray.length;
                for (var i = 0; i < fileOrFileArray.length; i++) {
                    Windows.Storage.StorageFile.getFileFromPathAsync(fileOrFileArray[i]).done(
                        function (index, file) {
                            var path = fileOrFileArray[index];
                            var streamRef = Windows.Storage.Streams.RandomAccessStreamReference.createFromFile(file);
                            e.request.data.resourceMap[path] = streamRef;
                            storageItems.push(file);
                            if (!--filesCount) {
                                e.request.data.setStorageItems(storageItems);
                                deferral.complete();
                            }
                        }.bind(this, i),
                        function () {
                            if (!--filesCount) {
                                e.request.data.setStorageItems(storageItems);
                                deferral.complete();
                            }
                        }
                    );
                }
            }
        };

        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();

        dataTransferManager.addEventListener("datarequested", doShare);

        try {
            Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
            win(true);
        } catch (err) {
            fail(err);
        }
    }
};

require("cordova/exec/proxy").add("SocialSharing", module.exports);