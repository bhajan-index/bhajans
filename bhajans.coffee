app = angular.module("bhajans", ["ngStorage", "ngTouch", "ngAnimate"])
app.config ($sceProvider) ->
  $sceProvider.enabled false

app.filter "highlight", ->
  (text, search, caseSensitive) ->
    if text and (search or angular.isNumber(search))
      text = text.toString()
      search = search.toString()
      if caseSensitive
        text.split(search).join "<span class=\"ui-match\">" + search + "</span>"
      else
        text.replace new RegExp(search, "gi"), "<span class=\"ui-match\">$&</span>"
    else
      text


app.controller "BhajanSearchCtrl", ["$scope", "$http", "$localStorage", ($scope, $http, storage) ->
  if storage.bhajans?
    $scope.bhajans = storage.bhajans
  else
    $http.get("bhajan-index.json").success (data) ->
      $scope.bhajans = data
      storage.bhajans = data
]