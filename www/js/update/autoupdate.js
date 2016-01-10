(function(){
  // Check for Cordova
  var isCordova = typeof cordova !== 'undefined',
  // CordovaPromiseFS
    fs,
  // CordovaFileLoader
    loader,
  // script-tag...
    script,
  // ...that contains the serverRoot
    serverRoot;

  // Get serverRoot from script tag.
  script = document.querySelector('script[server]');
  if(script) serverRoot= script.getAttribute('server');
  if(!serverRoot) {
    throw new Error('Add a "server" attribute to the bootstrap.js script!');
  }

  // Initialize filesystem and loader
  fs = new CordovaPromiseFS({
    persistent: isCordova, // Chrome should use temporary storage.
    Promise: Promise
  });

  loader = new CordovaAppLoader({
    fs: fs,
    localRoot: 'app',
    serverRoot: serverRoot,
    mode: 'mirror',
    cacheBuster: true
  });

  // Check > Download > Update
  function check(){
    loader.check()
      .then(function(){
        return loader.download();
      })
      .then(function(){
        return loader.update();
      },function(err){
        console.error('Auto-update error:', JSON.stringify(err));
      });
  }

  // Couple events:

  // 1. On launch
  check();

  // 2. Cordova: On resume
  fs.deviceready.then(function(){
    document.addEventListener('resume',check);
  });

  // 3. Chrome: On page becomes visible again
  function handleVisibilityChange() {
    if (!document.webkitHidden) {
      check();
    }
  }
  document.addEventListener("webkitvisibilitychange", handleVisibilityChange, false);
})();
