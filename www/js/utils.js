var app = angular.module('starter.utils', [])
.factory('utilsFactory', function() {
		function getRandomInt(max) {
			var min = 0;
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function getRandomIntWithout(max, without) {
			var min = 0;
			while(true){
				var random = Math.floor(Math.random() * (max - min)) + min;
				if(random !== without) {
					return random;
				}
			}
		}

		function getRandomIntWithoutArray(max, without) {
			var min = 0;
			while(true){
				var random = Math.floor(Math.random() * (max - min)) + min;
				if(random !== without[0] && random !== without[1]) {
					return random;
				}
			}
		}

		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex ;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}

	return {
		getRandomInt: getRandomInt,
		getRandomIntWithout: getRandomIntWithout,
		getRandomIntWithoutArray: getRandomIntWithoutArray,
		shuffle: shuffle
	};
});