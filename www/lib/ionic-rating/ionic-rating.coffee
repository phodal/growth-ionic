angular.module 'ionic.rating', []

.constant 'ratingConfig', {
    max: 5
    stateOn: null
    stateOff: null
}

.controller 'RatingController', ($scope, $attrs, ratingConfig) ->
    ngModelCtrl = { $setViewValue: angular.noop }

    this.init = (ngModelCtrl_) ->
        ngModelCtrl = ngModelCtrl_
        ngModelCtrl.$render = this.render

        this.stateOn = if angular.isDefined($attrs.stateOn)
        then $scope.$parent.$eval($attrs.stateOn)
        else ratingConfig.stateOn

        this.stateOff = if angular.isDefined($attrs.stateOff)
        then $scope.$parent.$eval($attrs.stateOff)
        else ratingConfig.stateOff

        max = if angular.isDefined($attrs.max) then $scope.$parent.$eval($attrs.max) else ratingConfig.max

        ratingStates = if angular.isDefined($attrs.ratingStates)
        then $scope.$parent.$eval($attrs.ratingStates)
        else new Array(max)

        $scope.range = this.buildTemplateObjects(ratingStates)

    this.buildTemplateObjects = (states) ->
        for i in states.length
            states[i] = angular.extend { index: 1 }, { stateOn: this.stateOn, stateOff: this.stateOff }, states[i]
        return states

    $scope.rate = (value) ->
        if not $scope.readonly and value >= 0 && value <= $scope.range.length
            ngModelCtrl.$setViewValue value
            ngModelCtrl.$render()

    $scope.reset = ->
        $scope.value = ngModelCtrl.$viewValue
        $scope.onLeave()

    $scope.enter = (value) ->
        if not $scope.readonly
            $scope.value = value
        $scope.onHover({value: value})

    $scope.onKeydown = (evt) ->
        if /(37|38|39|40)/.test evt.which
            evt.preventDefault()
            evt.stopPropagation()
            $scope.rate $scope.value + (if evt.which is 38 or evt.which is 39 then 1 : -1 )

    this.render = ->
        $scope.value = ngModelCtrl.$viewValue

    return this

.directive 'rating', ->
    return {
        restrict: 'EA'
        require: ['rating', 'ngModel']
        scope:
            readonly: '=?'
            onHover: '&'
            onLeave: '&'
        controller: 'RatingController'
        template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' +
            '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' +
            '</ul>'
        replace: true
        link: (scope, element, attrs, ctrls) ->
            ratingCtrl = ctrls[0]
            ngModelCtrl = ctrls[1]

            if ngModelCtrl
                ratingCtrl.init ngModelCtrl
    }

