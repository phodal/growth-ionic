Collide
--------

Collide is a powerful yet simple javascript animation engine for web and hybrid mobile apps, inspired by [Facebook Pop](https://github.com/facebook/pop), built by the [Ionic Framework](http://ionicframework.com/) team.

Animations in Collide have more power and control than CSS animations or transitions, all without sacrificing performance.

Collide allows the user to pause, play, reverse, repeat, and skip to any part of an animation at any time, and has support for non-cubic bezier curves, enabling powerful Physics animations (Springs, Gravity, and Velocity) without the complexity of a full-fledged physics engine.

We built Collide because we wanted to give Ionic developers the power to build complicated animation and gesture driven mobile apps with HTML5 and Javascript, something that wasn't possible before.

Collide solves the problems with CSS animations using a simple Javascript animation engine and API. It also provides a tweening API similar to WebAnimations, and allows the developer to hook into every frame for full control over the behavior of the animation.

Coming Soon:

- Animation decay. Set a velocity on an animation and let it decelerate to a certain point.

### Development

- `npm install`
- `npm install -g browserify`
- `npm run test` runs jasmine-node tests. `npm run autotest` will watch and test
- `npm run build`
- Generated file `dist/collide.js` is require/CommonJS/window friendly. If you include it, it will be included as `window.collide`.
- Note: the `collide.js` found in project root is only updated on release. The built version in dist is not added to git and should be used while developing.

### API

**This is in flux, better documentation coming after API is stable**

```js
var animation = collide.animation({
  // 'linear|ease|ease-in|ease-out|ease-in-out|cubic-bezer(x1,y1,x2,y2)',
  // or function(t, duration),
  // or a dynamics configuration (see below)
  easing: 'ease-in-out', 
  duration: 1000,
  percent: 0,
  reverse: false
});

// Actions, all of these return `this` and are chainable
// .on('step' callback is given a 'percent', 0-1, as argument (for springs it could be outside 0-1 range)
// .on('stop' callback is given a boolean, wasCompleted
animation.on(/step|destroy|start|stop|complete/, function() {})
animation.once(...) //same event types
animation.off(...) //works like jquery.off
animation.stop(); //stop/pause at current position
animation.start(shouldSetImmediately); //start from current position
animation.restart();
animation.velocity(n) //starts the animation going at the given velocity ,relative to the distance, decaying
animation.distance(n); //distance for the velocity to be relative to
animation.destroy(); //unbind all events & deallocate

animation.isRunning(); //boolean getter

//These are getters and setters.
//No arguments is a getter, argument is a chainable setter.
animation.percent(newPercent, shouldSetImmediately); //0-1
animation.duration(duration); //milliseconds
animation.reverse(isReverse);

animation.easing(easing); //setter, string|function(t,duration)|dynamicsConfiguration.
// Dynamics configuration looks like this one of these:
// animation.easing({
//   type: 'spring',
//   frequency: 15,
//   friction: 200,
//   initialForce: false
// });
// animation.easing({
//   type: 'gravity',
//   bounce: 40,
//   gravity: 1000,
// });

```

### Examples

See test.html.

```js
var animation = collide.animation({
  duration: 1000,
  easing: 'ease-in-out'
})
  .on('step', function(v) {
    //Have the element spring over 400px
    myElement.css('webkitTransform', 'translateX(' + (v*400) + 'px)');
  })
  .start();
```
