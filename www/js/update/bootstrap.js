(function(){
// Retrieved and slightly modified from: https://github.com/typicode/pegasus
// --------------------------------------------------------------------------
//
// a   url (naming it a, beacause it will be reused to store callbacks)
// xhr placeholder to avoid using var, not to be used
window.pegasus = function pegasus(a, xhr) {
  xhr = new XMLHttpRequest();

  // Open url
  xhr.open('GET', a);

  // Reuse a to store callbacks
  a = [];

  // onSuccess handler
  // onError   handler
  // cb        placeholder to avoid using var, should not be used
  xhr.onreadystatechange = xhr.then = function(onSuccess, onError, cb) {

    // Test if onSuccess is a function or a load event
    if (onSuccess.call) a = [onSuccess, onError];

    // Test if request is complete
    if (xhr.readyState == 4) {

      // index will be:
      // 0 if status is between 0 and 399
      // 1 if status is over
      cb = a[0|xhr.status / 400];

      // Safari doesn't support xhr.responseType = 'json'
      // so the response is parsed
      if (cb) cb(xhr.status === 200 || xhr.status === 0?JSON.parse(xhr.responseText):xhr);
    }
  };

  // Send
  xhr.send();

  // Return request
  return xhr;
};
//------------------------------------------------------------------
// Step 2: After fetching manifest (localStorage or XHR), load it
function loadManifest(manifest,fromLocalStorage,timeout){
  // Safety timeout. If BOOTSTRAP_OK is not defined,
  // it will delete the 'localStorage' version and revert to factory settings.
  if(fromLocalStorage){
    setTimeout(function(){
      if(!window.BOOTSTRAP_OK){
        console.warn('BOOTSTRAP_OK !== true; Resetting to original manifest.json...');
        localStorage.removeItem('manifest');
        location.reload();
      }
    },timeout);
  }

  if(!manifest.load) {
    console.error('Manifest has nothing to load (manifest.load is empty).',manifest);
    return;
  }

  var el,
      head = document.getElementsByTagName('head')[0],
      scripts = manifest.load.concat(),
      now = Date.now();

  // Load Scripts
  function loadScripts(){
    scripts.forEach(function(src) {
      if(!src) return;
      // Ensure the 'src' has no '/' (it's in the root already)
      if(src[0] === '/') src = src.substr(1);
      src = manifest.root + src ;
      // Load javascript
      if(src.substr(-3) === ".js"){
        el= document.createElement('script');
        el.type= 'text/javascript';
        el.src= src + '?' + now;
        el.async = false;
      // Load CSS
      } else {
        el= document.createElement('link');
        el.rel = "stylesheet";
        el.href = src + '?' + now;
        el.type = "text/css";
      }
      head.appendChild(el);
    });
  }

  //---------------------------------------------------
  // Step 3: Ensure the 'root' end with a '/'
  manifest.root = manifest.root || './';
  if(manifest.root.length > 0 && manifest.root[manifest.root.length-1] !== '/')
    manifest.root += '/';

  // Step 4: Save manifest for next time
  if(!fromLocalStorage)
    localStorage.setItem('manifest',JSON.stringify(manifest));

  // Step 5: Load Scripts
  // If we're loading Cordova files, make sure Cordova is ready first!
  if(typeof window.cordova !== 'undefined'){
    document.addEventListener("deviceready", loadScripts, false);
  } else {
    loadScripts();
  }
  // Save to global scope
  window.Manifest = manifest;
}
//---------------------------------------------------------------------
window.Manifest = {};
// Step 1: Load manifest from localStorage
var manifest = JSON.parse(localStorage.getItem('manifest'));
// grab manifest.json location from <script manifest="..."></script>
var s = document.querySelector('script[manifest]');
// Not in localStorage? Fetch it!
if(!manifest){
  var url = (s? s.getAttribute('manifest'): null) || 'manifest.json';
  // get manifest.json, then loadManifest.
  pegasus(url).then(loadManifest,function(xhr){
    console.error('Could not download '+url+': '+xhr.status);
  });
// Manifest was in localStorage. Load it immediatly.
} else {
  loadManifest(manifest,true,s.getAttribute('timeout') || 10000);
}
})();
