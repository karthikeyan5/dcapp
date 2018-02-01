var app = angular.module('app', ['ngRoute',
  'ngAnimate',
  /*'mgcrea.ngStrap',*/
  'ngSanitize',
  'ngToast',
  'ui.bootstrap',
  'cfp.hotkeys',
  'angular-loading-bar',
  'ngResource',
  'smart-table',
  'ui.grid',
  'angular-barcode',
  'cleave.js']);



app.factory('redirectInterceptor', function ($q, $location, $window) {
  return {
    'responseError': function (response) {
      if (response.status == 401) {
        console.log("LOGIN!!");
        $window.location.href = "/login";
        return $q.reject(response);
      } else {
        return response;
      }
    }
  }

});

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('redirectInterceptor');
}]);





app.config(function (hotkeysProvider) {
  hotkeysProvider.cheatSheetHotkey = 'ctrl+.';
})


app.controller('titleCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'api/getbrand'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.brand = response.data[0].info;

  },
    function errorCallback(response) {
      console.log(response);
    });


});

app.controller('mainCtrl', function ($scope) {


  $scope.tabselect1 = function () {
    document.getElementById("tabnav").childNodes[1].className = "active";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    // document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };
  $scope.tabselect2 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "active";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    // document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };
  $scope.tabselect3 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "active";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    // document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };
  $scope.tabselect4 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "active";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    // document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };

  $scope.tabselect5 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "active";
    // document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };

  // $scope.tabselect6 = function () {
  //   document.getElementById("tabnav").childNodes[1].className = "inactive";
  //   document.getElementById("tabnav").childNodes[3].className = "inactive";
  //   document.getElementById("tabnav").childNodes[5].className = "inactive";
  //   document.getElementById("tabnav").childNodes[7].className = "inactive";
  //   document.getElementById("tabnav").childNodes[9].className = "inactive";
  //   document.getElementById("tabnav").childNodes[11].className = "active";
  //   document.getElementById("tabnav").childNodes[13].className = "inactive";
  //   document.getElementById("tabnav").childNodes[15].className = "inactive";
  // };

  // $scope.tabselect7 = function () {
  //   document.getElementById("tabnav").childNodes[1].className = "inactive";
  //   document.getElementById("tabnav").childNodes[3].className = "inactive";
  //   document.getElementById("tabnav").childNodes[5].className = "inactive";
  //   document.getElementById("tabnav").childNodes[7].className = "inactive";
  //   document.getElementById("tabnav").childNodes[9].className = "inactive";
  //   document.getElementById("tabnav").childNodes[11].className = "inactive";
  //   document.getElementById("tabnav").childNodes[13].className = "active";
  //   document.getElementById("tabnav").childNodes[15].className = "inactive";
  // };

  // $scope.tabselect8 = function () {
  //   document.getElementById("tabnav").childNodes[1].className = "inactive";
  //   document.getElementById("tabnav").childNodes[3].className = "inactive";
  //   document.getElementById("tabnav").childNodes[5].className = "inactive";
  //   document.getElementById("tabnav").childNodes[7].className = "inactive";
  //   document.getElementById("tabnav").childNodes[9].className = "inactive";
  //   document.getElementById("tabnav").childNodes[11].className = "inactive";
  //   document.getElementById("tabnav").childNodes[13].className = "inactive";
  //   document.getElementById("tabnav").childNodes[15].className = "active";
  // };





});

app.controller('newclothdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function newclothdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect1();
  $scope.colourset = [];

  var open = function (colour, dialist, index) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/colourdetails.html',
      controller: 'colourdetailsCtrl',
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        colour: function () {
          return colour;
        },
        dialist: function () {
          return dialist;
        },
        index: function () {
          return index;
        }
      }
    });

    modalInstance.result.then(function (ret) {
      console.log('received dialist: ', ret.dialist, 'received colour:  ', ret.colour);

      if (ret.index == -1) {
        $scope.colourset.push(ret);
      }
      else {
        $scope.colourset[ret.index].colour = ret.colour;
        // $scope.colourset[ret.index].dialist = ret.dialist;
      }
      $scope.newcolour = null;


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });

  }

  $scope.add = function (colour) {
    open(colour, [], -1);

  }



  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }

  $scope.removecolour = function (index) {
    $scope.colourset.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Colour deleted... '//undo
    });
  }

  $scope.editcolour = function (index) {

    open($scope.colourset[index].colour, $scope.colourset[index].dialist, index);
  }


}]);

app.controller('colourdetailsCtrl', ['$scope', '$http', 'ngToast', '$uibModal', '$uibModalInstance', 'hotkeys', '$resource', 'colour', 'dialist', 'index', function colourdetailsCtrl($scope, $http, ngToast, $uibModal, $uibModalInstance, hotkeys, $resource, colour, dialist, index) {
  $scope.colour = colour;
  $scope.dialist = dialist;
  $scope.index = index;
  $scope.add = function (dia) {
    if ($scope.newdia.editmode == undefined) {
      temp_dia = {};
      temp_dia.dia = dia.dia;
      temp_dia.roll = dia.roll;
      temp_dia.weight = dia.weight;
      temp_dia.comment = dia.comment;
      $scope.dialist.push(temp_dia);
      ngToast.create({
        className: 'success',
        content: 'Dia Added... '
      });
    }
    else {
      ngToast.create({
        className: 'success',
        content: 'Dia Updated... '
      });
    }
    $scope.newdia = {}
    $scope.newdia.roll = 0;
    document.getElementById("diabox").focus();
  }


  $scope.removedia = function (index) {
    $scope.dialist.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Dia deleted... '//undo
    });
  }

  $scope.editdia = function (index) {

    $scope.newdia = $scope.dialist[index]
    $scope.newdia.editmode = 1;
    document.getElementById("diabox").focus();
    ngToast.create({
      className: 'info',
      content: 'Please edit dia and press enter... '
    });
  }


  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }

  $uibModalInstance.rendered.then(function () {
    console.log('Modal rendered at: ' + new Date())
    document.getElementById("diabox").focus();
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $scope.ok = function () {

    if ($scope.dialist.length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'Please enter atleast one dia... '
      });
      return;
    }


    $uibModalInstance.close({ dialist: $scope.dialist, colour: $scope.colour, index: index });
  }



  hotkeys.bindTo($scope)
    .add({
      combo: 'ctrl+s',
      description: 'Description goes here',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function (event, hotkey) {
        event.preventDefault();
        console.log('ctrl+s');
        $scope.ok();
      }
    });

}]);



app.controller('newpiecesdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function newpiecesdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect2();


}]);


app.controller('viewclothdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function viewclothdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect3();


}]);


app.controller('viewpiecesdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function viewpiecesdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect4();


}]);





app.controller('managemasterCtrl', ['$scope', '$uibModal', '$http', function managemasterCtrl($scope, $uibModal, $http) {
  $scope.tabselect5();


  $scope.openaddparty = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/addparty.html',
      controller: 'addpartyCtrl',
      size: 'lg',
      //appendTo: $(document).find('body').eq(0),//'body',
      //  backdrop: 'static',
      // keyboard: false,
      // resolve: {
      //   items: function () {
      //     return items;
      //   },
      // }
    });

    modalInstance.result.then(function (saved) {
      if (saved == 1)
        location.reload();
    }, function (ret) {


      console.log('Modal dismissed at: ' + new Date(), ret);

    });
  }


  $scope.openpartylist = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/partylist.html',
      controller: 'partylistCtrl',
      size: 'xl',
      // resolve: {
      //   party: function () {
      //     return $scope.party;
      //   }
      // ,
      // party_safe: function () {
      //   var party_safe
      //   angular.copy($scope.party,party_safe)
      //   return party_safe;
      // }
      // }
    });

    modalInstance.result.then(function () {

    }, function (ret) {


      console.log('Modal dismissed at: ' + new Date(), ret);

    });


  }



}]);


app.config(function ($routeProvider) {
  $routeProvider.
    when('/newclothdc', {
      templateUrl: './html/newclothdc.html',
      controller: 'newclothdcCtrl'
    }).
    when('/newpiecesdc', {
      templateUrl: './html/newpiecesdc.html',
      controller: 'newpiecesdcCtrl'
    }).
    when('/viewclothdc', {
      templateUrl: './html/viewclothdc.html',
      controller: 'viewclothdcCtrl'
    }).
    when('/viewpiecesdc', {
      templateUrl: './html/viewpiecesdc.html',
      controller: 'viewpiecesdcCtrl'
    }).
    when('/managemaster', {
      templateUrl: './html/managemaster.html',
      controller: 'managemasterCtrl'
    }).
    otherwise({
      redirectTo: '/newclothdc'
    });
});


app.directive('contenteditable', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      // view -> model
      elm.bind('blur', function () {
        scope.$apply(function () {
          if (Number.isInteger(parseInt(elm.html()))) {	//ctrl.$setViewValue(Number.isInteger(parseInt(elm.html())));
            if (parseInt(elm.html()) <= 0) {
              if (elm.attr("field") === "size") {
                // could make it better by having a isvalid attribute and changing it accoudingly instead of force change the values here
                ctrl.$setViewValue(-1 * parseInt(elm.html()));
                elm.html(-1 * parseInt(elm.html()));
              }
              if (elm.attr("field") === "mul") {
                ctrl.$setViewValue(1);
                elm.html(1);
                //elm.addClass("ng-invalid")
              }

            }
            ctrl.$setViewValue(parseInt(elm.html()));
            elm.html(parseInt(elm.html()));
          }
          else {
            ctrl.$setViewValue(0);
            elm.html(0);
          }
        });
      });

      elm.bind('focus', function () {
        //console.log("me focus2");
        //SelectText(elm);
        //scope.$apply(function() {
        //elm.select();

        //});
      });

      // model -> view
      ctrl.render = function (value) {
        elm.html(value);
      };

      // load init value from DOM
      //ctrl.$setViewValue(elm.html());

      elm.bind('keydown', function (event) {
        //console.log("keydown " + event.which);
        var esc = event.which == 27,
          enter = event.which == 13,
          el = event.target;

        if (esc || enter) {
          //event.preventDefault();
          // console.log("esc/enter");
          ctrl.$setViewValue(elm.html());
          el.blur();
          event.preventDefault();
        }
        // else if(enter)
        // {
        //  el.blur();
        //  if(Number.isInteger(parseInt(elm.html())))
        // {	//ctrl.$setViewValue(Number.isInteger(parseInt(elm.html())));                
        //   ctrl.$setViewValue(parseInt(elm.html()));
        //   elm.html(parseInt(elm.html()));
        //   }
        //   else
        //   {
        //   ctrl.$setViewValue(0);
        //   elm.html(0);
        //   }

        // }


      });

      elm.bind('keyup', function (event) {
        // console.log("keyup " + event.which);





        if (Number.isInteger(parseInt(elm.html()))) {	//ctrl.$setViewValue(Number.isInteger(parseInt(elm.html())));                
          ctrl.$setViewValue(parseInt(elm.html()));
          //elm.html(parseInt(elm.html()));
        }
        else {
          ctrl.$setViewValue(0);
          //elm.html(0);
        }


      });

    }
  };
});


app.directive('pageSelect', function () {
  return {
    restrict: 'E',
    template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
    link: function (scope, element, attrs) {
      scope.$watch('currentPage', function (c) {
        scope.inputPage = c;
      });
    }
  }
});


function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curtop];
  }
}


function arrayObjectIndexOf(myArray, searchTerm, property) {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}


function SelectText(element) {
  var doc = document
    , text = element
    , range, selection
    ;
  //text = doc.getElementById(element)    
  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}


app.filter('INR', function () {
  return function (input) {
    if (!isNaN(input)) {
      var currencySymbol = '₹ ';
      //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
      var result = input.toString().split('.');

      var lastThree = result[0].substring(result[0].length - 3);
      var otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != '')
        lastThree = ',' + lastThree;
      var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

      if (result.length > 1) {
        output += "." + result[1];
      }

      return currencySymbol + output;
    }
  }
});

