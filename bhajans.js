var app;

app = angular.module("bhajans", ["ngMaterial"]);

app.config(function($sceProvider, $mdThemingProvider) {
  $sceProvider.enabled(false);
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('pink');
});

app.filter("highlight", function() {
  return function(text, search, caseSensitive) {
    if (text && (search || angular.isNumber(search))) {
      text = text.toString();
      search = search.toString();
      if (caseSensitive) {
        return text.split(search).join("<span class=\"ui-match\">" + search + "</span>");
      } else {
        return text.replace(new RegExp(search, "gi"), "<span class=\"ui-match\">$&</span>");
      }
    } else {
      return text;
    }
  };
});

app.controller("BhajanSearchCtrl", [
  "$scope", "$http", function(_, $http) {
    _.query = ''
    function makeSearchable(line) {
      if(! (line && line.replace)){
      }
      return line
        .replace('h','')
        .replace(/a+/g,'a')
        .replace(/[iey]+/g,'iey')
        .replace(/[uo]+/g,'uo')
        .replace(/[td]/g,'td')
        .replace('z','r')
    }
    $http.get("bhajan-index.json").success(function(data) {
      _.bhajans = data.map(function (line) {
        return {bhajan:line, search:makeSearchable(line)}
      })
    });
    _.closeMatch = function(actual) {
      var searched = makeSearchable(_.query.toLowerCase())
      return !!actual.search.match(searched)
    }
  }
]);
