angular.module('angularApp')
    .component('homeComponent', {
        templateUrl: 'src/components/homeComponent/home.html',
        
        controller: ['$scope', '$http', function ($scope, $http) {

            $scope.deduplicatedPairs = [];
            $scope.names = [];
            var pairs = [];
            $scope.duplicateMsg = "";
            var invalidInput = false;

            // function to add the users input to the list of names
            $scope.addName = function(name) {
                // if the array is blank
                if($scope.names.length == 0) {
                    // if blank name entered, set validity to invalid
                    if(name === undefined) {
                        invalidInput = true;
                    }
                // if the array is not blank iterate through it to find if the users input matches any of 
                // the previous input names
                }else {
                    for (var i = 0; i < $scope.names.length; i++) {
                        // if blank name netered or name already exists, set validation to incalid
                        if(name == "" || $scope.names[i] === name) {
                            invalidInput = true;
                        }
                    }
                }
                // if validation is invalid, set validation message, if valie, add name to array
                if(invalidInput) {
                    $scope.duplicateMsg = "Duplicate or blank name. Try again.";
                }else {
                    $scope.names.push(name);
                }
                
                // reset validation
                invalidInput = false;
                
            };

            // reset validation message
            $scope.resetMsg = function() {
                $scope.duplicateMsg = "";
            }

            // function to display the pairs
            $scope.displayPairs = function() {
                // iterate through the names list twice
                for (var i = 0; i < $scope.names.length; i++) {
                    for (var j = 0; j < $scope.names.length; j++) {
                        // if names equal, skip pairing
                        if($scope.names[i] === $scope.names[j]) {
                            continue;
                        }
                        // swap names over if the index a is smaller thatn index b
                        // This is to deduplicate the array
                        if(i < j) {
                            pairs.push($scope.names[i] + " - " + $scope.names[j]);
                        }else {
                            try {
                                pairs.push($scope.names[j] + " - " + $scope.names[i]);
                            } catch(err) {
                                console.log("ethsth");
                            }   
                        }   
                    }
                }
                // add array with duplicates to new array with Set to remove the duplicates
                $scope.deduplicatedPairs = Array.from(new Set(pairs));
            };

            // resets all variables to start again.
            $scope.reset = function() {
                $scope.deduplicatedPairs = [];
                $scope.names = [];
            };
        }]
    });

    