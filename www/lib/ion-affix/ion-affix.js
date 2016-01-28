/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - <Ali Ok> - <Collin Donahue-Oponski>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// ------ ion-affix ---------
// version 1.0.1
// date 2015-05-19
// ion-affix is a lightweight Angular directive for Ionic framework to have sticky affix elements.
// see project page : http://www.aliok.com.tr/projects/2015-04-17-ion-affix.html


angular.module('ion-affix', ['ionic'])
    .directive('ionAffix', ['$ionicPosition', '$compile', function ($ionicPosition, $compile) {

        // keeping the Ionic specific stuff separated so that they can be changed and used within an other context

        // see https://api.jquery.com/closest/ and http://ionicframework.com/docs/api/utility/ionic.DomUtil/
        function getParentWithClass(elementSelector, parentClass) {
            return angular.element(ionic.DomUtil.getParentWithClass(elementSelector[0], parentClass));
        }

        // see http://underscorejs.org/#throttle
        function throttle(theFunction) {
            return ionic.Utils.throttle(theFunction);
        }

        // see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        // see http://ionicframework.com/docs/api/utility/ionic.DomUtil/
        function requestAnimationFrame(callback) {
            return ionic.requestAnimationFrame(callback);
        }

        // see https://api.jquery.com/offset/
        // see http://ionicframework.com/docs/api/service/$ionicPosition/
        function offset(elementSelector) {
            return $ionicPosition.offset(elementSelector);
        }

        // see https://api.jquery.com/position/
        // see http://ionicframework.com/docs/api/service/$ionicPosition/
        function position(elementSelector) {
            return $ionicPosition.position(elementSelector);
        }

        function applyTransform(element, transformString) {
            // do not apply the transformation if it is already applied
            if (element.style[ionic.CSS.TRANSFORM] == transformString) {
            }
            else {
                element.style[ionic.CSS.TRANSFORM] = transformString;
            }
        }

        function translateUp(element, dy, executeImmediately) {
            var translateDyPixelsUp = dy == 0 ? 'translate3d(0px, 0px, 0px)' : 'translate3d(0px, -' + dy + 'px, 0px)';
            // if immediate execution is requested, then just execute immediately
            // if not, execute in the animation frame.
            if (executeImmediately) {
                applyTransform(element, translateDyPixelsUp);
            }
            else {
                // see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
                // see http://ionicframework.com/docs/api/utility/ionic.DomUtil/
                requestAnimationFrame(function () {
                    applyTransform(element, translateDyPixelsUp);
                });
            }
        }

        var CALCULATION_THROTTLE_MS = 500;

        return {
            // only allow adding this directive to elements as an attribute
            restrict: 'A',
            // we need $ionicScroll for adding the clone of affix element to the scroll container
            // $ionicScroll.element gives us that
            require: '^$ionicScroll',
            link: function ($scope, $element, $attr, $ionicScroll) {
                // get the affix's container. element will be affix for that container.
                // affix's container will be matched by "affix-within-parent-with-class" attribute.
                // if it is not provided, parent element will be assumed as the container
                var $container;
                if ($attr.affixWithinParentWithClass) {
                    $container = getParentWithClass($element, $attr.affixWithinParentWithClass);
                    if (!$container) {
                        $container = $element.parent();
                    }
                }
                else {
                    $container = $element.parent();
                }

                var scrollMin = 0;
                var scrollMax = 0;
                var scrollTransition = 0;
                // calculate the scroll limits for the affix element and the affix's container
                var calculateScrollLimits = function (scrollTop) {
                    var containerPosition = position($container);
                    var elementOffset = offset($element);

                    var containerTop = containerPosition.top;
                    var containerHeight = containerPosition.height;

                    var affixHeight = elementOffset.height;

                    scrollMin = scrollTop + containerTop;
                    scrollMax = scrollMin + containerHeight;
                    scrollTransition = scrollMax - affixHeight;
                };
                // throttled version of the same calculation
                var throttledCalculateScrollLimits = throttle(
                    calculateScrollLimits,
                    CALCULATION_THROTTLE_MS,
                    {trailing: false}
                );

                var affixClone = null;

                // creates the affix clone and adds it to DOM. by default it is put to top
                var createAffixClone = function () {
                    var clone = $element.clone().css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0
                    });

                    // if directive is given an additional CSS class to apply to the clone, then apply it
                    if ($attr.affixClass) {
                        clone.addClass($attr.affixClass);
                    }

                    // remove the directive matching attribute from the clone, so that an affix is not created for the clone as well.
                    clone.removeAttr('ion-affix').removeAttr('data-ion-affix').removeAttr('x-ion-affix');

                    angular.element($ionicScroll.element).append(clone);

                    // compile the clone so that anything in it is in Angular lifecycle.
                    $compile(clone)($scope);

                    return clone;
                };

                // removes the affix clone from DOM. also deletes the reference to it in the memory.
                var removeAffixClone = function () {
                    if (affixClone)
                        affixClone.remove();
                    affixClone = null;
                };

                $scope.$on("$destroy", function () {
                    // 2 important things on destroy:
                    // remove the clone
                    // unbind the scroll listener
                    // see https://github.com/aliok/ion-affix/issues/1
                    removeAffixClone();
                    angular.element($ionicScroll.element).off('scroll');
                });


                angular.element($ionicScroll.element).on('scroll', function (event) {
                    var scrollTop = (event.detail || event.originalEvent && event.originalEvent.detail).scrollTop;
                    // when scroll to top, we should always execute the immediate calculation.
                    // this is because of some weird problem which is hard to describe.
                    // if you want to experiment, always use the throttled one and just click on the page
                    // you will see all affix elements stacked on top
                    if (scrollTop == 0) {
                        calculateScrollLimits(scrollTop);
                    }
                    else {
                        throttledCalculateScrollLimits(scrollTop);
                    }

                    // when we scrolled to the container, create the clone of element and place it on top
                    if (scrollTop >= scrollMin && scrollTop <= scrollMax) {

                        // we need to track if we created the clone just now
                        // that is important since normally we apply the transforms in the animation frame
                        // but, we need to apply the transform immediately when we add the element for the first time. otherwise it is too late!
                        var cloneCreatedJustNow = false;
                        if (!affixClone) {
                            affixClone = createAffixClone();
                            cloneCreatedJustNow = true;
                        }

                        // if we're reaching towards the end of the container, apply some nice translation to move up/down the clone
                        // but if we're reached already to the container and we're far away than the end, move clone to top
                        if (scrollTop > scrollTransition) {
                            translateUp(affixClone[0], Math.floor(scrollTop - scrollTransition), cloneCreatedJustNow);
                        } else {
                            translateUp(affixClone[0], 0, cloneCreatedJustNow);
                        }
                    } else {
                        removeAffixClone();
                    }
                });
            }
        }
    }]);