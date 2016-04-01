//Angular App
(function(){
  angular
    .module('FreeCodeCampModule', ['ngSanitize'])
    .controller('WikipediaViewer', [ '$http', '$scope', '$q', function($http, $scope, $q){
      var vm = this;
      vm.results = [];
      vm.loading = false;
      $scope.search = '';
      var $remove = $('#remove');
      $remove.click(function(){
        vm.results = [];
        $scope.search = '';
        $scope.$apply();
      });
      var promise;
      $scope.$watch('search', function(newValue, oldValue) {
        if(newValue.length == 0){
          vm.loading = false;
          vm.results = [];
        }
        if(promise)
          promise.resolve();
        vm.loading = true;
        promise = $q.defer(); //cancel previous request
        
        //Autocomplete
        //(soon)
        
        //Actual results
        $http.jsonp('https://en.wikipedia.org/w/api.php',{
          timeout: promise.promise,
          params: {
            action: 'query',  
            list: 'search', 
            srsearch: newValue, 
            utf8: '', 
            format:'json', 
            continue: '',
            callback: 'JSON_CALLBACK'
          }
        }).then(function(response){
          var query = response.data.query;
          if(query){
            vm.results = query.search.map(function(result){
              result.id = result.title.toLowerCase().replace(/[^a-z0-9]/g,'-');
              return result;
            });
          }
          vm.loading = false;
        })
        
      });
      vm.goTo = function(title){
        $('#'+title)[0].click();
      };
      
  }]);
})();

//analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66606764-7', 'auto');
  ga('send', 'pageview');