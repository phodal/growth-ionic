/**
 * Jasmine Based test suites
 *
 * Several of SocialSharing APIs cannot be automatically tested, because
 * they depend on user interaction in order to call success or fail
 * handlers. For most of them, there is a basic test that assert the presence of
 * the API.
 *
 * There are some cases that test automation can be applied, i.e in "canShareVia",
 * "canShareViaEmail" and "available" methods. For those cases, there is some level
 * of automatic test coverage.
 */
exports.defineAutoTests = function () {
  'use strict';

  describe('socialsharing', function () {
    it('should be defined', function () {
      expect(window.plugins.socialsharing).toBeDefined();
    });

    describe('share', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.share).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.share).toEqual('function');
      });
    });

    describe('shareVia', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareVia).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareVia).toEqual('function');
      });
    });

    describe('shareViaTwitter', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareViaTwitter).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareViaTwitter).toEqual('function');
      });
    });

    describe('shareViaFacebook', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareViaFacebook).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareViaFacebook).toEqual('function');
      });
    });

    describe('shareViaFacebookWithPasteMessageHint', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint).toEqual('function');
      });
    });

    describe('shareViaWhatsApp', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareViaWhatsApp).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareViaWhatsApp).toEqual('function');
      });
    });

    describe('shareViaSMS', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareViaSMS).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareViaSMS).toEqual('function');
      });
    });

    describe('shareViaEmail', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.shareViaEmail).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.shareViaEmail).toEqual('function');
      });
    });

    describe('canShareVia', function () {
      it('should be defined', function () {
        expect(window.plugins.socialsharing.canShareVia).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.canShareVia).toEqual('function');
      });

      it('should always call callback or error function', function (done) {
        function onSuccess(data){
          expect(data).not.toEqual(null);
          done();
        }

        function onError(error){
          expect(error).not.toEqual(null);
          done();
        }

        window.plugins.socialsharing.canShareVia('dummytarget','dummymessage', null, null, null, onSuccess, onError);
      });
    });

    describe('canshareViaEmail', function(){
      it('should be defined', function () {
        expect(window.plugins.socialsharing.canShareViaEmail).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.canShareViaEmail).toEqual('function');
      });

      it('should always call callback or error function', function (done) {
        function onSuccess(data){
          expect(data).not.toEqual(null);
          done();
        }

        function onError(error){
          expect(error).not.toEqual(null);
          done();
        }

        window.plugins.socialsharing.canShareViaEmail(onSuccess, onError);
      });
    });

    describe('availabe', function(){
      it('should be defined', function () {
        expect(window.plugins.socialsharing.available).toBeDefined();
      });

      it('should be a function', function () {
        expect(typeof window.plugins.socialsharing.available).toEqual('function');
      });

      it('should return a boolean when called', function(done){
        window.plugins.socialsharing.available(function(isAvailable) {
          expect(typeof isAvailable).toEqual('boolean');
          done();
        });
      });
    });
  });
};

/**
 * Manual tests suites
 *
 * Some actions buttons to execute SocialSharing plugin methods
 */
exports.defineManualTests = function (contentEl, createActionButton) {
  'use strict';

  /** helper function to log messages in the log div element */
  function logMessage(message, color) {
    var log = document.getElementById('info'),
        logLine = document.createElement('div');

    if (color) {
      logLine.style.color = color;
    }

    logLine.innerHTML = message;
    log.appendChild(logLine);
  }

  /** helper function to clear the log div element */
  function clearLog() {
    var log = document.getElementById('info');
    log.innerHTML = '';
  }

  /** helper function to declare a not implemented test */
  function testNotImplemented(testName) {
    return function () {
      console.error(testName, 'test not implemented');
    };
  }

  /** init method called on deviceready event */
  function init() {}

  /** object to hold properties and configs */
  var TestSuite = {};

  TestSuite.getCanShareViaTarget = function(){
    return document.getElementById('inputCanShareVia').value;
  };

  TestSuite.$markup = '' +
  '<fieldset>' +
  '<legend>Available Tests</legend>' +

  '<h3>Available</h3>' +
  '<div id="buttonIsAvailable"></div>' +
  'Expected result: Should log if the plugin is available or not' +
  '</fieldset>' +

  '<fieldset>' +
  '<legend>Share Tests</legend>' +

  '<h3>Share Message</h3>' +
  '<div id="buttonShareMessage"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "Message body"' +

  '<h3>Share Message with Subject</h3>' +
  '<div id="buttonShareMessageWithSubject"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "Message body", and the subject should be "Message subject"' +

  '<h3>Share Link</h3>' +
  '<div id="buttonShareLink"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "http://www.x-services.nl"' +

  '<h3>Share Message with Link</h3>' +
  '<div id="buttonShareMessageAndLink"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "Message body http://www.x-services.nl"' +

  '<h3>Share Image</h3>' +
  '<div id="buttonShareImage"></div>' +
  'Expected result: Should display share widget, and the message to share should contain an image' +

  '<h3>Share Image in base 64</h3>' +
  '<div id="buttonShareImageBase64"></div>' +
  'Expected result: Should display share widget, and the message to share should contain an image. The image is encoded in base 64' +

  '<h3>Share Image with Message</h3>' +
  '<div id="buttonShareMessageImage"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "Message body" and an image' +

  '<h3>Share Image with Message and Link</h3>' +
  '<div id="buttonShareMessageImageLink"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "Message body http://www.x-services.nl" and an image' +

  '<h3>Share Image with Message, Subject and Link</h3>' +
  '<div id="buttonShareMessageSubjectImageLink"></div>' +
  'Expected result: Should display share widget, and the message to share should contain "Message body http://www.x-services.nl", "Message subject" as subject, and an image' +
  '</fieldset>' +

  '<fieldset>' +
  '<legend>Can Share Tests</legend>' +

  'Target: <input id="inputCanShareVia" type="text"/><br>' +

  '<h3>Can Share via</h3>' +
  '<div id="buttonCanShareVia"></div>' +
  'Expected result: should log OK if can share, or should log a list of available share targets' +

  '<h3>Can Share via Email</h3>' +
  '<div id="buttonCanShareViaEmail"></div>' +
  'Expected result: should log OK if can share' +
  '</fieldset>' +
  '';

  contentEl.innerHTML = '<div id="info"></div>' + TestSuite.$markup;

  createActionButton('availabe', function () {
    clearLog();
    window.plugins.socialsharing.available(function(isAvailable) {
      var message = 'is this plugin available? ';
      message += isAvailable? 'Yes' : 'No';

      logMessage(message, isAvailable? 'green' : 'red');
    });
  }, 'buttonIsAvailable');

  createActionButton('share message', function () {
    window.plugins.socialsharing.share('Message body');
  }, 'buttonShareMessage');

  createActionButton('share message and subject', function () {
    window.plugins.socialsharing.share('Message body', 'Message subject');
  }, 'buttonShareMessageWithSubject');

  createActionButton('share link', function () {
    window.plugins.socialsharing.share(null, null, null, 'http://www.x-services.nl');
  }, 'buttonShareLink');

  createActionButton('share message and link', function () {
    window.plugins.socialsharing.share('Message body', null, null, 'http://www.x-services.nl');
  }, 'buttonShareMessageAndLink');

  createActionButton('share image', function () {
    window.plugins.socialsharing.share(null, null, 'https://www.google.nl/images/srpr/logo4w.png', null);
  }, 'buttonShareImage');

  createActionButton('share image base 64', function () {
    window.plugins.socialsharing.share(null, 'Android filename', 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null);
  }, 'buttonShareImageBase64');

  createActionButton('share message with image', function () {
    window.plugins.socialsharing.share('Message body', null, 'https://www.google.nl/images/srpr/logo4w.png', null);
  }, 'buttonShareMessageImage');

  createActionButton('share message, image, and link', function () {
    window.plugins.socialsharing.share('Message body', null, 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
  }, 'buttonShareMessageImageLink');

  createActionButton('share message, subject, image, and link', function () {
    window.plugins.socialsharing.share('Message body', 'Message subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
  }, 'buttonShareMessageSubjectImageLink');

  createActionButton('can share via', function () {
    var target = TestSuite.getCanShareViaTarget();

    if(!target){
      console.error('must have a canShareVia target');
    }
    else {
      clearLog();
      window.plugins.socialsharing.canShareVia(target, 'msg', null, null, null, function(e){
        console.log('canShareVia success, see log for more information');
        logMessage('canShareVia: ' + e,'green');
      }, function(e){
        console.error('canShareVia fail, see log for more information');
        var message = "Share targets<br>";

        message += "<ul>";

        e.forEach(function(target){
          message += "<li>" + target + "</li>";
        });

        message += "</ul>";
        logMessage(message,'red');
      });
    }
  }, 'buttonCanShareVia');

  createActionButton('can share via email', function () {
    clearLog();
    window.plugins.socialsharing.canShareViaEmail(function(e){
      console.log('canShareViaEmail success, see log for more information');
      logMessage('canShareViaEmail: ' + e,'green');
    }, function(e){
      console.error('canShareViaEmail fail, see log for more information');
      logMessage('canShareViaEmail: ' + e,'red');
    });
  }, 'buttonCanShareViaEmail');

  document.addEventListener('deviceready', init, false);
};
