/*
 * SimplePubSub from https://github.com/mbenford/ngTagsInput/blob/master/src/util.js
 * */
'use strict';

function SimplePubSub() {
    var events = {};
    return {
        on: function(names, handler) {
            names.split(' ').forEach(function(name) {
                if (!events[name]) {
                    events[name] = [];
                }
                events[name].push(handler);
            });
            return this;
        },
        trigger: function(name, args) {
            angular.forEach(events[name], function(handler) {
                handler.call(null, args);
            });
            return this;
        }
    };
};

angular.module('tabSlideBox', [])
.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
})
.directive('tabSlideBox', [ '$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
	function($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
		'use strict';

		return {
			restrict : 'A, E, C',
			link : function(scope, element, attrs, ngModel) {
				
				var ta = element[0], $ta = element;
				$ta.addClass("tabbed-slidebox");
				if(attrs.tabsPosition === "bottom"){
					$ta.addClass("btm");
				}
				
				//Handle multiple slide/scroll boxes
				var handle = ta.querySelector('.slider').getAttribute('delegate-handle');
				
				var ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
				if(handle){
					ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle(handle);
				}
				
				var ionicScrollDelegate = $ionicScrollDelegate;
				if(handle){
					ionicScrollDelegate = ionicScrollDelegate.$getByHandle(handle);
				}
				
				function renderScrollableTabs(){
					var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
					var scrollDiv = wrap.querySelector(".scroll");
					
					angular.forEach(icons, function(value, key){
					     var a = angular.element(value);
					     a.on('click', function(){
					    	 ionicSlideBoxDelegate.slide(key);
					     });

						if(a.attr('icon-off')) {
							a.attr("class", a.attr('icon-off'));
						}
					});
					
					var initialIndex = attrs.tab;
					//Initializing the middle tab
					if(typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0){
						initialIndex = Math.floor(icons.length/2);
					}
					
					//If initial element is 0, set position of the tab to 0th tab 
					if(initialIndex == 0){
						setPosition(0);
					}
					
					$timeout(function() {
						ionicSlideBoxDelegate.slide(initialIndex);
					}, 0);
				}
				function setPosition(index){
					var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
					var scrollDiv = wrap.querySelector(".scroll");
					
					var middle = iconsDiv[0].offsetWidth/2;
					var curEl = angular.element(icons[index]);
					var prvEl = angular.element(iconsDiv[0].querySelector(".active"));
					if(curEl && curEl.length){
					var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;

					if(prvEl.attr('icon-off')) {
						prvEl.attr("class", prvEl.attr('icon-off'));
					}else{
						prvEl.removeClass("active");
					}
					if(curEl.attr('icon-on')) {
						curEl.attr("class", curEl.attr('icon-on'));
					}
					curEl.addClass("active");
					
					var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5);
					//If tabs are not scrollable
					if(!scrollDiv){
						var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5) + "px";
						wrap.style.webkitTransform =  "translate3d("+leftStr+",0,0)" ;
					}else{
						//If scrollable tabs
						var wrapWidth = wrap.offsetWidth;
						var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
						var leftOffset = 100;
						var elementOffset = 40;
						//If tabs are reaching right end or left end
						if(((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))){
							if(leftStr > 0){
								leftStr = 0;
							}
							//Use this scrollTo, so when scrolling tab manually will not flicker
							ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
						}
					}
					}
				};
				function getX(matrix) {
					matrix = matrix.replace("translate3d(","");
					matrix = matrix.replace("translate(","");
					return (parseInt(matrix));
				}
				var events = scope.events;
				events.on('slideChange', function(data){
					setPosition(data.index);
				});
				events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
					renderScrollableTabs();
				});
				
				renderScrollableTabs();
			},
			controller : function($scope, $attrs, $element) {
				$scope.events = new SimplePubSub();
				
				$scope.slideHasChanged = function(index){
					$scope.events.trigger("slideChange", {"index" : index});
					$timeout(function(){if($scope.onSlideMove) $scope.onSlideMove({"index" : eval(index)});},100);
				};
				
				$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
					$scope.events.trigger("ngRepeatFinished", {"event" : ngRepeatFinishedEvent});
				});
			}
		};

	} 
]);
