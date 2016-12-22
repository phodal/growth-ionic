/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/*global Windows:true, WinJS, toStaticHTML */

var cordova = require('cordova');

var isAlertShowing = false;
var alertStack = [];

// CB-8928: When toStaticHTML is undefined, prompt fails to run
var _cleanHtml = function(html) { return html; };
if (typeof toStaticHTML !== 'undefined') {
    _cleanHtml = toStaticHTML;
}

// Windows does not provide native UI for promp dialog so we use some
// simple html-based implementation until it is available
function createPromptDialog(title, message, buttons, defaultText, callback) {

    var isPhone = cordova.platformId == "windows" && WinJS.Utilities.isPhone;

    var dlgWrap = document.createElement("div");
    dlgWrap.style.position = "absolute";
    dlgWrap.style.width = "100%";
    dlgWrap.style.height = "100%";
    dlgWrap.style.backgroundColor = "rgba(0,0,0,0.25)";
    dlgWrap.style.zIndex = "100000";
    dlgWrap.className = "dlgWrap";

    var dlg = document.createElement("div");
    dlg.style.width = "100%";
    dlg.style.minHeight = "180px";
    dlg.style.height = "auto";
    dlg.style.overflow = "auto";
    dlg.style.backgroundColor = "white";
    dlg.style.position = "relative";
    dlg.style.lineHeight = "2";

    if (isPhone) {
        dlg.style.padding = "0px 5%";
    } else {
        dlg.style.top = "50%"; // center vertically
        dlg.style.transform = "translateY(-50%)";
        dlg.style.padding = "0px 30%";
    }

    // dialog layout template
    dlg.innerHTML = _cleanHtml("<span id='lbl-title' style='font-size: 24pt'></span><br/>" + // title
        "<span id='lbl-message'></span><br/>" + // message
        "<input id='prompt-input' style='width: 100%'/><br/>"); // input fields

    dlg.querySelector('#lbl-title').appendChild(document.createTextNode(title));
    dlg.querySelector('#lbl-message').appendChild(document.createTextNode(message));
    dlg.querySelector('#prompt-input').setAttribute('placeholder', defaultText);

    function makeButtonCallback(idx) {
        return function () {
            var value = dlg.querySelector('#prompt-input').value;
            dlgWrap.parentNode.removeChild(dlgWrap);

            if (callback) {
                callback({ input1: value, buttonIndex: idx });
            }
        };
    }

    function addButton(idx, label) {
        var button = document.createElement('button');
        button.style.margin = "8px 0 8px 16px";
        button.style.float = "right";
        button.style.fontSize = "12pt";
        button.tabIndex = idx;
        button.onclick = makeButtonCallback(idx + 1);
        if (idx === 0) {
            button.style.color = "white";
            button.style.backgroundColor = "#464646";
        } else {
            button.style.backgroundColor = "#cccccc";
        }
        button.style.border = "none";
        button.appendChild(document.createTextNode(label));
        dlg.appendChild(button);
    }

    // reverse order is used since we align buttons to the right
    for (var idx = buttons.length - 1; idx >= 0; idx--) {
        addButton(idx, buttons[idx]);
    }

    dlgWrap.appendChild(dlg);
    document.body.appendChild(dlgWrap);

    // make sure input field is under focus
    dlg.querySelector('#prompt-input').focus();

    return dlgWrap;
}

module.exports = {
    alert:function(win, loseX, args) {

        if (isAlertShowing) {
            var later = function () {
                module.exports.alert(win, loseX, args);
            };
            alertStack.push(later);
            return;
        }
        isAlertShowing = true;

        var message = args[0];
        var _title = args[1];
        var _buttonLabel = args[2];

        var md = new Windows.UI.Popups.MessageDialog(message, _title);
        md.commands.append(new Windows.UI.Popups.UICommand(_buttonLabel));
        md.showAsync().then(function() {
            isAlertShowing = false;
            if (win) {
                win();
            }

            if (alertStack.length) {
                setTimeout(alertStack.shift(), 0);
            }

        });
    },

    prompt: function (win, lose, args) {
        if (isAlertShowing) {
            var later = function () {
                module.exports.prompt(win, lose, args);
            };
            alertStack.push(later);
            return;
        }

        isAlertShowing = true;

        var message = args[0],
            title = args[1],
            buttons = args[2],
            defaultText = args[3];

        try {
            createPromptDialog(title, message, buttons, defaultText, function (evt) {
                isAlertShowing = false;
                if (win) {
                    win(evt);
                }
            });

        } catch (e) {
            // set isAlertShowing flag back to false in case of exception
            isAlertShowing = false;
            if (alertStack.length) {
                setTimeout(alertStack.shift(), 0);
            }
            // rethrow exception
            throw e;
        }
    },

    confirm:function(win, loseX, args) {

        if (isAlertShowing) {
            var later = function () {
                module.exports.confirm(win, loseX, args);
            };
            alertStack.push(later);
            return;
        }

        isAlertShowing = true;

        try {
            var message = args[0];
            var _title = args[1];
            var buttons = args[2];

            var md = new Windows.UI.Popups.MessageDialog(message, _title);

            buttons.forEach(function(buttonLabel) {
                md.commands.append(new Windows.UI.Popups.UICommand(buttonLabel));
            });

            md.showAsync().then(function(res) {
                isAlertShowing = false;
                var result = res ? buttons.indexOf(res.label) + 1 : 0;
                if (win) {
                    win(result);
                }
                if (alertStack.length) {
                    setTimeout(alertStack.shift(), 0);
                }

            });
        } catch (e) {
            // set isAlertShowing flag back to false in case of exception
            isAlertShowing = false;
            if (alertStack.length) {
                setTimeout(alertStack.shift(), 0);
            }
            // rethrow exception
            throw e;
        }
    },

    beep:function(winX, loseX, args) {

        // set a default args if it is not set
        args = args && args.length ? args : ["1"];

        var snd = new Audio('ms-winsoundevent:Notification.Default');
        var count = parseInt(args[0]) || 1;
        snd.msAudioCategory = "Alerts";

        var onEvent = function () {
            if (count > 0) {
                snd.play();
            } else {
                snd.removeEventListener("ended", onEvent);
                snd = null;
                if (winX) {
                    winX(); // notification.js just sends null, but this is future friendly
                }
            }
            count--;
        };
        snd.addEventListener("ended", onEvent);
        onEvent();

    }
};

require("cordova/exec/proxy").add("Notification",module.exports);
