ionic-rating
============

An angularjs directive that take care of visualising a star rating bar, build
for ionic.

![rating](https://cloud.githubusercontent.com/assets/1183541/3007107/3cee642c-de6c-11e3-8449-18b86ca130a7.png)

Also able to print half star (display only) :

![rating-half](https://cloud.githubusercontent.com/assets/7658059/12101509/67ee6d6c-b335-11e5-9ef6-0ceb92018fd2.png)

#### Why?

`angular-ui` has the same [rating](http://angular-ui.github.io/bootstrap/#/rating) directive,
but it is build on top of bootstrap. This repo just reuse most of the js code, but build for
the [ionic](http://ionicframework.com/) framework.

#### How to use?

Install with bower:

```
$ bower install ionic-rating
```

In your index.html

```HTML
<script src="lib/ionic-rating/ionic-rating.min.js"></script>
```

In you template:

```HTML
<rating ng-model="rating.rate" max="rating.max"></rating>
```

In you controller:

```JavaScript
// first inject it into your app
angular.module('youApp', ['ionic.rating'])

.controller('yourCtrl', function($scope) {

  // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;

});

```

If you want to make it read only

> added readonly="readOnly" to rating directive, and $scope.readOnly = true; to the controller.

**Note:** You may also need to include the style file. But I suggest you just copy it to your
project.

#### Build

```
$ npm i
$ make all
```

#### License

MIT
