// name our angular app
var firstApp = angular.module('firstApp', [])
.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
                                                   'self',
                                                   '*://www.youtube.com/**'
                                                   ]);
        });

firstApp.controller('mainController', function($http, $scope) {

 // bind this to vm (view-model)
var vm = this;
vm.artists = ['Elton John', 'Stevie Wonder', 'Frank Sinatra', 'Louis Armstrong'];


$scope.selectedURL="";
$scope.showModal = false;
    $scope.toggleModal = function(selectedArtist){
                       $scope.showModal = !$scope.showModal;
                       $scope.selectedURL = $scope.getVideo(selectedArtist.videoId);
					   alert($scope.selectedURL);
        };

 getResults('One Direction');
 
 function getResults(selectedArtist){
                       $http.get("/"+selectedArtist).success(function(response){
                       vm.message = response;
					   });
        }
		
 $scope.getVideo = function (id) {
                       return "https://www.youtube.com/embed/"+id+"?rel=0"
		}
		
});

firstApp.directive('modal', function () {
                  return {
                  template: '<div class="modal fade">' +
                  '<div class="modal-dialog" >' +
                  '<div class="modal-content" width="800">' +
                  '<div class="modal-header">' +
                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">{{ title }}</h4>' +
                  '</div>' +
                  '<div id="player-modal" class="modal-body" ng-transclude></div>' +
                  '</div>' +
                  '</div>' +
                  '</div>',
                  restrict: 'E',
                  transclude: true,
                  replace:true,
                  scope:true,
                  link: function postLink(scope, element, attrs) {
                  scope.title = attrs.title;
                  
                  scope.$watch(attrs.visible, function(value){
                               if(value == true)
                               $(element).modal('show');
                               else
                               $(element).modal('hide');
                               });
                  
                  $(element).on('shown.bs.modal', function(){
                                scope.$apply(function(){
                                             scope.$parent[attrs.visible] = true;
                                             });
                                });
                  
                  $(element).on('hidden.bs.modal', function(){
                                $("#player-modal iframe").attr("src", $("#player-modal iframe").attr("src"));
                                scope.$apply(function(){
                                             scope.$parent[attrs.visible] = false;
                                             });
                                });
                  }
                  };
                  });