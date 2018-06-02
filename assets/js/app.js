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
  // 'ui.grid',
  'angular-barcode',
  'cleave.js',
  'ngTagsInput']);



app.factory('redirectInterceptor', function ($q, $location, $window) {
  return {
    'responseError': function (response) {
      if (response.status == 401) {
        console.log("LOGIN!!");
        $window.location.href = "/login";
        return $q.reject(response);
      } else {
        // return response;
        return $q.reject(response);
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
    url: 'api/getdbinfo?id=1'
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
    document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };
  $scope.tabselect2 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "active";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };
  $scope.tabselect3 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "active";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };
  $scope.tabselect4 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "active";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };

  $scope.tabselect5 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "active";
    document.getElementById("tabnav").childNodes[11].className = "inactive";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };

  $scope.tabselect6 = function () {
    document.getElementById("tabnav").childNodes[1].className = "inactive";
    document.getElementById("tabnav").childNodes[3].className = "inactive";
    document.getElementById("tabnav").childNodes[5].className = "inactive";
    document.getElementById("tabnav").childNodes[7].className = "inactive";
    document.getElementById("tabnav").childNodes[9].className = "inactive";
    document.getElementById("tabnav").childNodes[11].className = "active";
    // document.getElementById("tabnav").childNodes[13].className = "inactive";
    // document.getElementById("tabnav").childNodes[15].className = "inactive";
  };

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

app.controller('newclothdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', '$route', function newclothdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource, $route) {
  $scope.tabselect1();
  $scope.cdc = {};
  $scope.cdc.items = [];
  $scope.cdc.naming_series = "DC-";
  $scope.cdc.supplier_id = null;
  $scope.dynamicPopover = [];
  $scope.dynamicPopover.templateUrl = "supplierpopup.html";

  $http({
    method: 'GET',
    url: 'api/getdbinfo?infoname=dcseries'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.cdc.naming_series = response.data[0].info;
  },
    function errorCallback(response) {
      console.log(response);
    });

  $scope.$on('$viewContentLoaded', function () {
    setTimeout(function () {
      console.log("yeah!!!");
      document.getElementById("department").focus();
    }, 100);
  });

  window.onbeforeunload = function () {
    return $scope.cdc.items.length > 0 && !$scope.cdc.dc_number ? "If you leave this page you will lose your unsaved changes." : null;
  }
  $scope.$on('$locationChangeStart', function (event) {

    if ($scope.cdc.items.length > 0 && !$scope.cdc.dc_number) {
      var answer = confirm("If you leave this page you will lose your unsaved changes.")
      if (!answer) {
        event.preventDefault();
      }
    }
    // return $scope.cdc.items.length > 0 ? "If you leave this page you will lose your unsaved changes." : null;
  });

  $scope.setsupplier = function () {
    $scope.cdc.supplier_id = $scope.dynamicPopover.supplier_details.id;
    $scope.cdc.supplier_name = $scope.dynamicPopover.supplier_details.name;
    $scope.cdc.supplier_address1 = $scope.dynamicPopover.supplier_details.address1;
    $scope.cdc.supplier_address2 = $scope.dynamicPopover.supplier_details.address2;
    $scope.cdc.supplier_city = $scope.dynamicPopover.supplier_details.city;
    $scope.cdc.supplier_state = $scope.dynamicPopover.supplier_details.state;
    $scope.cdc.supplier_pincode = $scope.dynamicPopover.supplier_details.pincode;
    $scope.cdc.supplier_gstin = $scope.dynamicPopover.supplier_details.gstin;
    $scope.cdc.supplier_phone1 = $scope.dynamicPopover.supplier_details.phone1;
    $scope.cdc.supplier_phone2 = $scope.dynamicPopover.supplier_details.phone2;
    $scope.cdc.supplier_email = $scope.dynamicPopover.supplier_details.email;
    $scope.popoverIsOpen = false;
    // angular.forEach($scope.agentkeymap, function (value, key) {
    //   if (value.idagent === $scope.cdc.supplier_details.idagent)
    //     $scope.cdc.supplier_details.agent = value.agentname;
    // });
    a = findPos(document.getElementById("c1olour"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("c1olour").focus();
  };

  $scope.focussuppliername = function (event1) {
    if (event1 != null) {
      event1.preventDefault()
    }
    if($scope.cdc.supplier_id != null ){
      return;
    }
    //console.log("in focuspartyname()");
    // $scope.popoverIsOpen = !$scope.popoverIsOpen;
    $scope.popoverIsOpen = true;
    //document.getElementById("date").focus();
    //  setTimeout(function(){ document.getElementById("supplierbox").focus();},100);//10ms find a permant solution
    $scope.focussupplierbox();
  };

  $scope.focussupplierbox = function () {
    setTimeout(function () { document.getElementById("supplierbox").focus(); document.getElementById("supplierbox").select(); }, 100);
  };

  $scope.showaddress = function () {
    if ($scope.cdc.supplier_id === null)
      return false;
    else
      return true;
  };

  var open = function (colour, dialist, index) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/colourdetails.html',
      controller: 'colourdetailsCtrl',
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      // animation:false,
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
        delete ret.index;
        $scope.cdc.items.push(ret);
        modalInstance.closed.then(function () {
          a = findPos(document.getElementById("c1olour"));
          $('html, body').animate({ scrollTop: a - 400 }, 'slow');
          document.getElementById("c1olour").focus();
        });

      }
      else {
        $scope.cdc.items[ret.index].colour = ret.colour;
        // $scope.cdc.items[ret.index].dialist = ret.dialist;
      }
      $scope.newcolour = null;


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });

  }

  $scope.add = function (colour) {
    open(colour, [], -1);

  }


  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }

  $scope.removecolour = function (index) {
    $scope.cdc.items.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Colour deleted... '//undo
    });
  }

  $scope.editcolour = function (index) {

    open($scope.cdc.items[index].colour, $scope.cdc.items[index].dialist, index);
  }

  $http({
    method: 'GET',
    url: '/api/department?dept_type=1'
  }).then(function successCallback(response) {
    $scope.departmentlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Department list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });


    $http({
      method: 'GET',
      url: '/api/lot?status=active'
    }).then(function successCallback(response) {
      $scope.lotlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'LOT list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });
  
    $http({
      method: 'GET',
      url: '/api/colour?status=active'
    }).then(function successCallback(response) {
      $scope.colourlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'Colour list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });


  $scope.getsuppliers = function (state) {
    $scope.cdc.supplier_id = null;
    $scope.supplierlist = [];
    $http({
      method: 'GET',
      url: '/api/supplier?allfeilds=1&department=' + $scope.cdc.department
    }).then(function successCallback(response) {
      $scope.supplierlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
      });

  }
  // probs: does not get unbind when a modal opens
  // hotkeys.bindTo($scope)
  // .add({
  //   combo: 'ctrl+s',
  //   description: 'Save Current DC',
  //   allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
  //   callback: function (event, hotkey) {
  //     event.preventDefault();
  //     console.log('ctrl+s');
  //     $scope.savedc();
  //   }
  // });


  $scope.cleardc = () => {
    $route.reload();
  }


  var opendcmodal = function (cdc) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/cdcmodal.html',
      controller: 'cdcmodalCtrl',
      size: 'xl',
      windowTopClass: 'hidden-print',
      resolve: {
        cdc: function () {
          return cdc;
        }
      }
    });

    modalInstance.result.then(function (ret) {
      console.log(ret);


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });

    $scope.$on("modalClosing", function (event, ret) {
      console.log('inside modalClosing event', ret);

      if (ret) {
        $scope.cleardc();
      }


    });


  }


  $scope.savedc = () => {

    if (!$scope.cdc.department) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Department and Supplier... '
      });
      return;
    }

    if ($scope.cdc.supplier_id === null) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Supplier... '
      });
      return;
    }

    if ($scope.cdc.dc_date === undefined) {
      ngToast.create({
        className: 'warning',
        content: 'invalid DC Date... '
      });
      return;
    }

    if ($scope.cdc.items.length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'Nothing to Deliver?... '
      });
      return;
    }

    $scope.cdc.department_name = $scope.departmentlist.filter(item => item.id == $scope.cdc.department)[0].name;

    opendcmodal($scope.cdc);


  }




  // datepicker stuff - to be decoded later
  $scope.today = function () {
    $scope.cdc.dc_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.cdc.dc_date = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    return false;
  }

  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
    $scope.cdc.dc_date = new Date(year, month, day);
  };

  $scope.altInputFormats = ['d!.M!.yyyy', 'd!.M!.yy', 'd!/M!/yyyy', 'd!/M!/yy'];//,'d!.M!','d!.M!.yy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }



}]);


app.controller('cdcmodalCtrl', function ($scope, $http, $uibModalInstance, $uibModal, cdc, ngToast, $rootScope) {
  $scope.cdc = cdc;
  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0);
  if ($scope.cdc.dc_number) $scope.disablesave = true;
  else $scope.disablesave = false;


  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }


  $scope.save = () => {
    $scope.disablesave = true;
    $http({
      method: 'POST',
      url: '/api/cdc',
      data: $scope.cdc
    }).then(function successCallback(response) {
      console.log(response);
      ngToast.create('DC Details Saved.');
      $scope.cdc.dc_number = response.data.dc.dc_number;
      $scope.cdc.dc_no_length = response.data.dc.length;
      $scope.cdc.server_time = response.data.dc.server_time;
      $scope.cdc.current_user = response.data.dc.current_user;
      setTimeout(function () { $scope.print(); }, 800);
    },
      function errorCallback(response) {
        console.log(response);
        $scope.disablesave = false;
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });
  }


  $scope.$on("modal.closing", function () {
    $rootScope.$broadcast("modalClosing", $scope.cdc.dc_number ? $scope.cdc.dc_number : undefined);
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $scope.print = function () {
    window.print();
  }

  $scope.canceldc = () => {
    // TBD:add the cancelcdcmodal then a reason the update all the way down when model is closed
    var answer = confirm("Cancel DC? WARNING!!! This cannot be undone.")
    send_data = { status: 2 }
    if (answer) {
      $http({
        method: 'PUT',
        url: '/api/cdc/' + $scope.cdc.idcdc,
        data: send_data
      }).then(function successCallback(response) {
        console.log(response);
        ngToast.create('DC Cancelled....');
        $scope.cdc.status = 'inactive'
      },
        function errorCallback(response) {
          console.log(response);
          var er = 'DC Cancel ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
          ngToast.create({
            className: 'danger',
            content: er
          });
        });
    }
  }

});

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
      combo: 'ctrl+d',
      description: 'Save Current Dia Details',
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function (event, hotkey) {
        event.preventDefault();
        console.log('ctrl+d');
        $scope.ok();
      }
    });

}]);



app.controller('newpiecesdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', '$route', function newpiecesdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource, $route) {
  $scope.tabselect2();
  $scope.pdc = {};
  $scope.currentSize = { size1: 'size 1', size2: 'size 2', size3: 'size 3', size4: 'size 4', size5: 'size 5', size6: 'size 6', size7: 'size 7', size8: 'size 8', size9: 'size 9', size10: 'size 10' };
  $scope.sizestate = [true, true, true, true, true, true, true, true, true, true];
  $scope.pdc.items = [];
  $scope.pdc.naming_series = "DC-";
  $scope.pdc.supplier_id = null;
  $scope.dynamicPopover = [];
  $scope.dynamicPopover.templateUrl = "supplierpopup.html";
  $scope.newitem = {};

  $http({
    method: 'GET',
    url: 'api/getdbinfo?infoname=dcseries'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.pdc.naming_series = response.data[0].info;
  },
    function errorCallback(response) {
      console.log(response);
    });

  $scope.$on('$viewContentLoaded', function () {
    setTimeout(function () {
      console.log("yeah!!!");
      document.getElementById("department").focus();
    }, 100);
  });

  window.onbeforeunload = function () {
    return $scope.pdc.items.length > 0 && !$scope.pdc.dc_number ? "If you leave this page you will lose your unsaved changes." : null;
  }
  $scope.$on('$locationChangeStart', function (event) {

    if ($scope.pdc.items.length > 0 && !$scope.pdc.dc_number) {
      var answer = confirm("If you leave this page you will lose your unsaved changes.")
      if (!answer) {
        event.preventDefault();
      }
    }
    // return $scope.pdc.items.length > 0 ? "If you leave this page you will lose your unsaved changes." : null;
  });

  $scope.setsupplier = function () {
    $scope.pdc.supplier_id = $scope.dynamicPopover.supplier_details.id;
    $scope.pdc.supplier_name = $scope.dynamicPopover.supplier_details.name;
    $scope.pdc.supplier_address1 = $scope.dynamicPopover.supplier_details.address1;
    $scope.pdc.supplier_address2 = $scope.dynamicPopover.supplier_details.address2;
    $scope.pdc.supplier_city = $scope.dynamicPopover.supplier_details.city;
    $scope.pdc.supplier_state = $scope.dynamicPopover.supplier_details.state;
    $scope.pdc.supplier_pincode = $scope.dynamicPopover.supplier_details.pincode;
    $scope.pdc.supplier_gstin = $scope.dynamicPopover.supplier_details.gstin;
    $scope.pdc.supplier_phone1 = $scope.dynamicPopover.supplier_details.phone1;
    $scope.pdc.supplier_phone2 = $scope.dynamicPopover.supplier_details.phone2;
    $scope.pdc.supplier_email = $scope.dynamicPopover.supplier_details.email;
    $scope.popoverIsOpen = false;
    // a = findPos(document.getElementById("c1olour"));
    // $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    // document.getElementById("c1olour").focus();
  };

  $scope.focussuppliername = function (event1) {
    if (event1 != null) {
      event1.preventDefault()
    }
    if($scope.pdc.supplier_id != null ){
      return;
    }
    //console.log("in focuspartyname()");
    // $scope.popoverIsOpen = !$scope.popoverIsOpen;
    $scope.popoverIsOpen = true;
    //document.getElementById("date").focus();
    //  setTimeout(function(){ document.getElementById("supplierbox").focus();},100);//10ms find a permant solution
    $scope.focussupplierbox();
  };

  $scope.focussupplierbox = function () {
    setTimeout(function () { document.getElementById("supplierbox").focus(); document.getElementById("supplierbox").select(); }, 100);
  };

  $scope.showaddress = function () {
    if ($scope.pdc.supplier_id === null)
      return false;
    else
      return true;
  };

  // $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)
  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }

  $http({
    method: 'GET',
    url: '/api/department?dept_type=2'
  }).then(function successCallback(response) {
    $scope.departmentlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Department list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $http({
    method: 'GET',
    url: '/api/lot?status=active'
  }).then(function successCallback(response) {
    $scope.lotlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'LOT list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $http({
    method: 'GET',
    url: '/api/colour?status=active'
  }).then(function successCallback(response) {
    $scope.colourlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Colour list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $scope.getsuppliers = function (state) {
    $scope.pdc.supplier_id = null;
    $scope.supplierlist = [];
    $http({
      method: 'GET',
      url: '/api/supplier?allfeilds=1&department=' + $scope.pdc.department
    }).then(function successCallback(response) {
      $scope.supplierlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
      });

  }

  $scope.cleardc = () => {
    $route.reload();
  }

  $http({
    method: 'GET',
    url: '/api/item?itemstatus=active'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.itemlist = [];
    $scope.sizerangelist = response.data.sizerange;
    $scope.sizetypelist = response.data.sizetype;
    angular.forEach(response.data.items, function (value, key) {
      var temp = { naming_series: value.naming_series,  fullname: value.naming_series.concat(' ',value.name), name: value.name, id: value.id, sizerange: value.sizerange };
      this.push(temp);
    }, $scope.itemlist);
  }, function errorCallback(response) {
    console.log(response);
  });


  $scope.setnameid = function () {
    $scope.newitem = {};
    $scope.pdc.itemname = $scope.newitemdetails ? $scope.newitemdetails.name : undefined;
    $scope.pdc.iditem = $scope.newitemdetails ? $scope.newitemdetails.id : undefined;
    $scope.pdc.item_naming_series = $scope.newitemdetails ? $scope.newitemdetails.naming_series : undefined;

    if (!$scope.newitemdetails) {
      return;
    }


    if ($scope.idsizerange && $scope.idsizerange != $scope.newitemdetails.sizerange && $scope.pdc.items.length > 0) {
      var answer = confirm("Size Mismatch....  Do you want to DELETE ALL item entries?")
      if (!answer) {
        event.preventDefault();
        $scope.newitemdetails = undefined;
        $scope.pdc.iditem = undefined;
        $scope.pdc.itemname = undefined;
        return;
      }
      else {
        $scope.pdc.items = [];
      }
    }

    angular.forEach($scope.sizerangelist, function (value, key) {
      if ($scope.newitemdetails.sizerange == value.idsize) {
        $scope.idsizetype = value.idsizetype;
        $scope.sizerange = value;
        var temp = [];
        temp.push(value.size1 === 0 ? true : false);
        temp.push(value.size2 === 0 ? true : false);
        temp.push(value.size3 === 0 ? true : false);
        temp.push(value.size4 === 0 ? true : false);
        temp.push(value.size5 === 0 ? true : false);
        temp.push(value.size6 === 0 ? true : false);
        temp.push(value.size7 === 0 ? true : false);
        temp.push(value.size8 === 0 ? true : false);
        temp.push(value.size9 === 0 ? true : false);
        temp.push(value.size10 === 0 ? true : false);
        $scope.sizestate = temp;
      }
    }, $scope.sizestate);

    angular.forEach($scope.sizetypelist, function (value, key) {
      if ($scope.idsizetype == value.id) {
        $scope.currentSize = value;
        $scope.sizetype = value;
      }
    }, $scope.currentSize);


    if (!$scope.idsizerange || $scope.pdc.items.length == 0) {
      setTimeout(function () { $scope.focuspart() }, 100);
    }
    $scope.idsizerange = $scope.newitemdetails.sizerange;


  };


  $scope.focuspart = function () {
    // console.log("heloooooinside", document.getElementById("partbox"));
    a = findPos(document.getElementById("partbox"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("partbox").focus();
  }


  $scope.add = function (item) {
    if ((($scope.newitem.size1 + $scope.newitem.size2 + $scope.newitem.size3 + $scope.newitem.size4 + $scope.newitem.size5 + $scope.newitem.size6 + $scope.newitem.size7 + $scope.newitem.size8 + $scope.newitem.size9 + $scope.newitem.size10) == 0)
      && (($scope.newitem.wsize1 + $scope.newitem.wsize2 + $scope.newitem.wsize3 + $scope.newitem.wsize4 + $scope.newitem.wsize5 + $scope.newitem.wsize6 + $scope.newitem.wsize7 + $scope.newitem.wsize8 + $scope.newitem.wsize9 + $scope.newitem.wsize10) == 0)) {
      ngToast.create({
        className: 'danger',
        content: 'Empty !!! Item not added...<br>Please try again...'
      });
      return;
    }

    if (item.index == undefined) {
      $scope.pdc.items.push(item);
      ngToast.create({
        className: 'success',
        content: 'Item added...'
      });
    }
    else {
      index_temp = item.index;
      $scope.pdc.items[index_temp] = item;
      ngToast.create({
        className: 'success',
        content: 'Item Updated...'
      });
    }

    $scope.clearnewitem();
  }

  $scope.clearnewitem = function () {
    $scope.newitem = { "size1": 0, "wsize1": 0, "size2": 0, "wsize2": 0, "size3": 0, "wsize3": 0, "size4": 0, "wsize4": 0, "size5": 0, "wsize5": 0, "size6": 0, "wsize6": 0, "size7": 0, "wsize7": 0, "size8": 0, "wsize8": 0, "size9": 0, "wsize9": 0, "size10": 0, "wsize10": 0, "part": undefined, "colour": undefined, "comment": undefined };
    setTimeout(function () { $scope.focuspart() }, 100);
  }

  $scope.remove = function (collection, index) {
    collection.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Deleted... '//undo
    });
  }

  $scope.edit = function (collection, index) {
    angular.copy(collection[index], $scope.newitem);
    $scope.newitem.index = index;
  }


  var opendcmodal = function (pdc) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/pdcmodal.html',
      controller: 'pdcmodalCtrl',
      size: 'xl',
      windowTopClass: 'hidden-print',
      resolve: {
        pdc: function () {
          return pdc;
        },
        sizetype: function () {
          return $scope.sizetype;
        },
        sizerange: function () {
          return $scope.sizerange;
        }
      }
    });

    modalInstance.result.then(function (ret) {
      console.log(ret);


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });

    $scope.$on("modalClosing", function (event, ret) {
      console.log('inside modalClosing event', ret);

      if (ret) {
        $scope.cleardc();
      }


    });


  }


  $scope.savedc = () => {

    if (!$scope.pdc.department) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Department and Supplier... '
      });
      return;
    }

    if ($scope.pdc.supplier_id === null) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Supplier... '
      });
      return;
    }

    if ($scope.pdc.dc_date === undefined) {
      ngToast.create({
        className: 'warning',
        content: 'invalid DC Date... '
      });
      return;
    }

    if ($scope.pdc.items.length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'Nothing to Deliver?... '
      });
      return;
    }

    $scope.pdc.department_name = $scope.departmentlist.filter(item => item.id == $scope.pdc.department)[0].name;

    opendcmodal($scope.pdc);


  }






  // datepicker stuff - to be decoded later
  $scope.today = function () {
    $scope.pdc.dc_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.pdc.dc_date = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    return false;
  }

  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
    $scope.pdc.dc_date = new Date(year, month, day);
  };

  $scope.altInputFormats = ['d!.M!.yyyy', 'd!.M!.yy', 'd!/M!/yyyy', 'd!/M!/yy'];//,'d!.M!','d!.M!.yy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }


}]);


app.controller('dcmodalCtrl', function ($scope, $http, $uibModalInstance, $uibModal, dc, sizerange, sizetype, ngToast, $rootScope) {
  $scope.dc = dc;
  $scope.sizerange = sizerange;
  $scope.sizetype = sizetype;
  if ($scope.dc.dc_number) $scope.disablesave = true;
  else $scope.disablesave = false;


  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }


  $scope.save = () => {
    $scope.disablesave = true;
    $http({
      method: 'POST',
      url: '/api/dc',
      data: $scope.dc
    }).then(function successCallback(response) {
      console.log(response);
      ngToast.create('DC Details Saved.');
      $scope.dc.dc_number = response.data.dc.dc_number;
      $scope.dc.dc_no_length = response.data.dc.length;
      $scope.dc.server_time = response.data.dc.server_time;
      $scope.dc.current_user = response.data.dc.current_user;
      setTimeout(function () { $scope.print(); }, 800);
    },
      function errorCallback(response) {
        console.log(response);
        $scope.disablesave = false;
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });
  }


  $scope.$on("modal.closing", function () {
    $rootScope.$broadcast("modalClosing", $scope.dc.dc_number ? $scope.dc.dc_number : undefined);
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $scope.print = function () {
    window.print();
  }

  $scope.canceldc = () => {
    // TBD:add the canceldcmodal then a reason the update all the way down when model is closed
    var answer = confirm("Cancel DC? WARNING!!! This cannot be undone.")
    send_data = { status: 2 }
    if (answer) {
      $http({
        method: 'PUT',
        url: '/api/dc/' + $scope.dc.iddc,
        data: send_data
      }).then(function successCallback(response) {
        console.log(response);
        ngToast.create('DC Cancelled....');
        $scope.dc.status = 'inactive'
      },
        function errorCallback(response) {
          console.log(response);
          var er = 'DC Cancel ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
          ngToast.create({
            className: 'danger',
            content: er
          });
        });
    }
  }

});


app.controller('newdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', '$route', function newdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource, $route) {
  $scope.tabselect6();
  $scope.dc = {};
  $scope.currentSize = { size1: 'size 1', size2: 'size 2', size3: 'size 3', size4: 'size 4', size5: 'size 5', size6: 'size 6', size7: 'size 7', size8: 'size 8', size9: 'size 9', size10: 'size 10' };
  $scope.sizestate = [true, true, true, true, true, true, true, true, true, true];
  $scope.dc.items = [];
  $scope.dc.naming_series = "DC-1819-";
  $scope.dc.supplier_id = null;
  $scope.dynamicPopover = [];
  $scope.dynamicPopover.templateUrl = "supplierpopup.html";
  $scope.newitem = {};
  $scope.temp_storage = {};

  $scope.$on('$viewContentLoaded', function () {
    setTimeout(function () {
      console.log("yeah!!!");
      document.getElementById("department").focus();
    }, 100);
  });

  window.onbeforeunload = function () {
    return $scope.dc.items.length > 0 && !$scope.dc.dc_number ? "If you leave this page you will lose your unsaved changes." : null;
  }
  $scope.$on('$locationChangeStart', function (event) {

    if ($scope.dc.items.length > 0 && !$scope.dc.dc_number) {
      var answer = confirm("If you leave this page you will lose your unsaved changes.")
      if (!answer) {
        event.preventDefault();
      }
    }
    // return $scope.dc.items.length > 0 ? "If you leave this page you will lose your unsaved changes." : null;
  });

  $scope.setsupplier = function () {
    $scope.dc.supplier_id = $scope.dynamicPopover.supplier_details.id;
    $scope.dc.supplier_name = $scope.dynamicPopover.supplier_details.name;
    $scope.dc.supplier_address1 = $scope.dynamicPopover.supplier_details.address1;
    $scope.dc.supplier_address2 = $scope.dynamicPopover.supplier_details.address2;
    $scope.dc.supplier_city = $scope.dynamicPopover.supplier_details.city;
    $scope.dc.supplier_state = $scope.dynamicPopover.supplier_details.state;
    $scope.dc.supplier_pincode = $scope.dynamicPopover.supplier_details.pincode;
    $scope.dc.supplier_gstin = $scope.dynamicPopover.supplier_details.gstin;
    $scope.dc.supplier_phone1 = $scope.dynamicPopover.supplier_details.phone1;
    $scope.dc.supplier_phone2 = $scope.dynamicPopover.supplier_details.phone2;
    $scope.dc.supplier_email = $scope.dynamicPopover.supplier_details.email;
    $scope.popoverIsOpen = false;
    if($scope.dc.dept_type == 'cloth'){
    a = findPos(document.getElementById("c1olour"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("c1olour").focus();
    }
  };

  $scope.focussuppliername = function (event1) {
    if (event1 != null) {
      event1.preventDefault()
    }
    if($scope.dc.supplier_id != null ){
      return;
    }
    //console.log("in focuspartyname()");
    // $scope.popoverIsOpen = !$scope.popoverIsOpen;
    $scope.popoverIsOpen = true;
    //document.getElementById("date").focus();
    //  setTimeout(function(){ document.getElementById("supplierbox").focus();},100);//10ms find a permant solution
    $scope.focussupplierbox();
  };

  $scope.focussupplierbox = function () {
    setTimeout(function () { document.getElementById("supplierbox").focus(); document.getElementById("supplierbox").select(); }, 100);
  };

  $scope.showaddress = function () {
    if ($scope.dc.supplier_id === null)
      return false;
    else
      return true;
  };

  // $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)
  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }

  $http({
    method: 'GET',
    url: '/api/department'
  }).then(function successCallback(response) {
    $scope.departmentlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Department list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $http({
    method: 'GET',
    url: '/api/lot?status=active'
  }).then(function successCallback(response) {
    $scope.lotlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'LOT list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $http({
    method: 'GET',
    url: '/api/colour?status=active'
  }).then(function successCallback(response) {
    $scope.colourlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Colour list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $scope.getsuppliers = function (state) {
    let dc_department = JSON.parse($scope.selected_department)
    if($scope.previousSelectedDepartment && dc_department.dept_type != $scope.dc.dept_type && $scope.dc.items.length > 0){
      var answer = confirm("Deparment Type Mismatch....  Do you want to DELETE ALL item entries?")
      if (!answer) {
        event.preventDefault();
        $scope.selected_department = $scope.previousSelectedDepartment;
        return;
      }
      else {
        $scope.dc.items = [];
        $scope.temp_storage.newitemdetails = undefined;
        $scope.dc.iditem = undefined;
        $scope.dc.itemname = undefined;
      }
    }
    $scope.dc.department = dc_department.id
    $scope.dc.dept_type = dc_department.dept_type
    $scope.dc.department_name = dc_department.name;
    $scope.previousSelectedDepartment = $scope.selected_department;
    $scope.dc.supplier_id = null;
    $scope.supplierlist = [];
    $http({
      method: 'GET',
      url: '/api/supplier?allfeilds=1&department=' + $scope.dc.department
    }).then(function successCallback(response) {
      $scope.supplierlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
      });

  }

  $scope.cleardc = () => {
    $route.reload();
  }

  $http({
    method: 'GET',
    url: '/api/item?itemstatus=active'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.itemlist = [];
    $scope.sizerangelist = response.data.sizerange;
    $scope.sizetypelist = response.data.sizetype;
    angular.forEach(response.data.items, function (value, key) {
      var temp = { naming_series: value.naming_series,  fullname: value.naming_series.concat(' ',value.name), name: value.name, id: value.id, sizerange: value.sizerange };
      this.push(temp);
    }, $scope.itemlist);
  }, function errorCallback(response) {
    console.log(response);
  });


  $scope.setnameid = function () {
    $scope.newitem = {};
    $scope.dc.itemname = $scope.temp_storage.newitemdetails ? $scope.temp_storage.newitemdetails.name : undefined;
    $scope.dc.iditem = $scope.temp_storage.newitemdetails ? $scope.temp_storage.newitemdetails.id : undefined;
    $scope.dc.item_naming_series = $scope.temp_storage.newitemdetails ? $scope.temp_storage.newitemdetails.naming_series : undefined;
    if (!$scope.temp_storage.newitemdetails) {
      return;
    }


    if ($scope.idsizerange && $scope.idsizerange != $scope.temp_storage.newitemdetails.sizerange && $scope.dc.items.length > 0) {
      var answer = confirm("Size Mismatch....  Do you want to DELETE ALL item entries?")
      if (!answer) {
        event.preventDefault();
        $scope.temp_storage.newitemdetails = undefined;
        $scope.dc.iditem = undefined;
        $scope.dc.itemname = undefined;
        return;
      }
      else {
        $scope.dc.items = [];
      }
    }

    angular.forEach($scope.sizerangelist, function (value, key) {
      if ($scope.temp_storage.newitemdetails.sizerange == value.idsize) {
        $scope.idsizetype = value.idsizetype;
        $scope.sizerange = value;
        var temp = [];
        temp.push(value.size1 === 0 ? true : false);
        temp.push(value.size2 === 0 ? true : false);
        temp.push(value.size3 === 0 ? true : false);
        temp.push(value.size4 === 0 ? true : false);
        temp.push(value.size5 === 0 ? true : false);
        temp.push(value.size6 === 0 ? true : false);
        temp.push(value.size7 === 0 ? true : false);
        temp.push(value.size8 === 0 ? true : false);
        temp.push(value.size9 === 0 ? true : false);
        temp.push(value.size10 === 0 ? true : false);
        $scope.sizestate = temp;
      }
    }, $scope.sizestate);

    angular.forEach($scope.sizetypelist, function (value, key) {
      if ($scope.idsizetype == value.id) {
        $scope.currentSize = value;
        $scope.sizetype = value;
      }
    }, $scope.currentSize);


    if (!$scope.idsizerange || $scope.dc.items.length == 0) {
      setTimeout(function () { $scope.focuspart() }, 100);
    }
    $scope.idsizerange = $scope.temp_storage.newitemdetails.sizerange;


  };


  $scope.focuspart = function () {
    // console.log("heloooooinside", document.getElementById("partbox"));
    a = findPos(document.getElementById("partbox"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("partbox").focus();
  }

  var open = function (colour, dialist, index) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/colourdetails.html',
      controller: 'colourdetailsCtrl',
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      // animation:false,
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
        delete ret.index;
        $scope.dc.items.push(ret);
        modalInstance.closed.then(function () {
          a = findPos(document.getElementById("c1olour"));
          $('html, body').animate({ scrollTop: a - 400 }, 'slow');
          document.getElementById("c1olour").focus();
        });

      }
      else {
        $scope.dc.items[ret.index].colour = ret.colour;
        // $scope.cdc.items[ret.index].dialist = ret.dialist;
      }
      $scope.temp_storage.newcolour = null;


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });
  }

  $scope.addColor = function (colour) {
    open(colour, [], -1);

  }

  $scope.add = function (item) {
    if ((($scope.newitem.size1 + $scope.newitem.size2 + $scope.newitem.size3 + $scope.newitem.size4 + $scope.newitem.size5 + $scope.newitem.size6 + $scope.newitem.size7 + $scope.newitem.size8 + $scope.newitem.size9 + $scope.newitem.size10) == 0)
      && (($scope.newitem.wsize1 + $scope.newitem.wsize2 + $scope.newitem.wsize3 + $scope.newitem.wsize4 + $scope.newitem.wsize5 + $scope.newitem.wsize6 + $scope.newitem.wsize7 + $scope.newitem.wsize8 + $scope.newitem.wsize9 + $scope.newitem.wsize10) == 0)) {
      ngToast.create({
        className: 'danger',
        content: 'Empty !!! Item not added...<br>Please try again...'
      });
      return;
    }

    if (item.index == undefined) {
      $scope.dc.items.push(item);
      ngToast.create({
        className: 'success',
        content: 'Item added...'
      });
    }
    else {
      index_temp = item.index;
      $scope.dc.items[index_temp] = item;
      ngToast.create({
        className: 'success',
        content: 'Item Updated...'
      });
    }

    $scope.clearnewitem();
  }

  $scope.clearnewitem = function () {
    $scope.newitem = { "size1": 0, "wsize1": 0, "size2": 0, "wsize2": 0, "size3": 0, "wsize3": 0, "size4": 0, "wsize4": 0, "size5": 0, "wsize5": 0, "size6": 0, "wsize6": 0, "size7": 0, "wsize7": 0, "size8": 0, "wsize8": 0, "size9": 0, "wsize9": 0, "size10": 0, "wsize10": 0, "part": undefined, "colour": undefined, "comment": undefined };
    setTimeout(function () { $scope.focuspart() }, 100);
  }

  $scope.remove = function (collection, index) {
    collection.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Deleted... '//undo
    });
  }

  $scope.edit = function (collection, index) {
    angular.copy(collection[index], $scope.newitem);
    $scope.newitem.index = index;
  }


  var opendcmodal = function (dc) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/dcmodal.html',
      controller: 'dcmodalCtrl',
      size: 'xl',
      windowTopClass: 'hidden-print',
      resolve: {
        dc: function () {
          return dc;
        },
        sizetype: function () {
          return $scope.sizetype;
        },
        sizerange: function () {
          return $scope.sizerange;
        }
      }
    });

    modalInstance.result.then(function (ret) {
      console.log(ret);


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });

    $scope.$on("modalClosing", function (event, ret) {
      console.log('inside modalClosing event', ret);

      if (ret) {
        $scope.cleardc();
      }


    });


  }


  $scope.savedc = () => {

    if (!$scope.dc.department) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Department and Supplier... '
      });
      return;
    }

    if ($scope.dc.supplier_id === null) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Supplier... '
      });
      return;
    }

    if ($scope.dc.dc_date === undefined) {
      ngToast.create({
        className: 'warning',
        content: 'invalid DC Date... '
      });
      return;
    }

    if ($scope.dc.items.length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'Nothing to Deliver?... '
      });
      return;
    }

    

    opendcmodal($scope.dc);


  }






  // datepicker stuff - to be decoded later
  $scope.today = function () {
    $scope.dc.dc_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dc.dc_date = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    return false;
  }

  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
    $scope.dc.dc_date = new Date(year, month, day);
  };

  $scope.altInputFormats = ['d!.M!.yyyy', 'd!.M!.yy', 'd!/M!/yyyy', 'd!/M!/yy'];//,'d!.M!','d!.M!.yy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }


}]);




app.controller('pdcmodalCtrl', function ($scope, $http, $uibModalInstance, $uibModal, pdc, sizerange, sizetype, ngToast, $rootScope) {
  $scope.pdc = pdc;
  $scope.sizerange = sizerange;
  $scope.sizetype = sizetype;
  if ($scope.pdc.dc_number) $scope.disablesave = true;
  else $scope.disablesave = false;


  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }


  $scope.save = () => {
    $scope.disablesave = true;
    $http({
      method: 'POST',
      url: '/api/pdc',
      data: $scope.pdc
    }).then(function successCallback(response) {
      console.log(response);
      ngToast.create('DC Details Saved.');
      $scope.pdc.dc_number = response.data.dc.dc_number;
      $scope.pdc.dc_no_length = response.data.dc.length;
      $scope.pdc.server_time = response.data.dc.server_time;
      $scope.pdc.current_user = response.data.dc.current_user;
      setTimeout(function () { $scope.print(); }, 800);
    },
      function errorCallback(response) {
        console.log(response);
        $scope.disablesave = false;
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });
  }


  $scope.$on("modal.closing", function () {
    $rootScope.$broadcast("modalClosing", $scope.pdc.dc_number ? $scope.pdc.dc_number : undefined);
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $scope.print = function () {
    window.print();
  }

  $scope.canceldc = () => {
    // TBD:add the cancelpdcmodal then a reason the update all the way down when model is closed
    var answer = confirm("Cancel DC? WARNING!!! This cannot be undone.")
    send_data = { status: 2 }
    if (answer) {
      $http({
        method: 'PUT',
        url: '/api/pdc/' + $scope.pdc.idpdc,
        data: send_data
      }).then(function successCallback(response) {
        console.log(response);
        ngToast.create('DC Cancelled....');
        $scope.pdc.status = 'inactive'
      },
        function errorCallback(response) {
          console.log(response);
          var er = 'DC Cancel ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
          ngToast.create({
            className: 'danger',
            content: er
          });
        });
    }
  }

});

app.controller('viewclothdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function viewclothdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect3();

  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0);
  $scope.displayedCollection = [];
  $scope.rowCollection = [];
  $scope.filter = {};
  $scope.addFilter = false;  
  
  $scope.initialState = function(){
  $scope.loadAll = false;
  $scope.itemsByPage = 75;
  $scope.showpagination = false;
  }
  $scope.initialState();
  
  $scope.hidelist = false;
  $scope.isCollapsed = true;
  $scope.filterString = '';

  $scope.refresh = function(){
    $scope.initialState();
    callListAPI($scope.itemsByPage,$scope.filterString)
  }
  
  $scope.addFilters = function(){
    
    if($scope.addFilter == false){
      $scope.addFilter = true;
      downloadFilterList();
    }
    $scope.isCollapsed = !$scope.isCollapsed;
  }

  $scope.applyFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function(key){
      if($scope.filter[key] != null)
        $scope.filterString+='&'+key+'='+$scope.filter[key];
    });
    $scope.initialState();
    callListAPI($scope.itemsByPage,$scope.filterString)
  
}
  $scope.clearFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function(key){
        $scope.filter[key] = null;
    });
    $scope.filter_supplier = null;
    $scope.after_dc_date = null;
    $scope.before_dc_date = null;
    $scope.initialState();
    callListAPI($scope.itemsByPage,$scope.filterString)

}

  $scope.loadAllItems = function () {
    
      $scope.loadAll = true;
      callListAPI(Number.MAX_SAFE_INTEGER,$scope.filterString)
      $scope.showpagination = true;    
  }
  $scope.updateItemsByPage = function () {
    if ($scope.showpagination == true)  {
      $scope.showpagination = false;
      $scope.itemsByPage = $scope.rowCollection.length;
    }
  }

  $scope.setsupplierFilter = function () {
    $scope.filter.idsupplier = $scope.filter_supplier.id;
  }

  $scope.setafterdate = function () {
    $scope.filter.after_dc_date = $scope.after_dc_date.yyyymmdd();
  
  }

  $scope.setbeforedate = function () {
    $scope.filter.before_dc_date = $scope.before_dc_date.yyyymmdd();
  
  }

  $scope.ds = function (a) {
    var b = new Date(a);
    return b.toString('dd.MM.yyyy');
  }



  $scope.getters = {
    dc_number: function (value) {
      //this will sort by the length of the first name string
      return value.naming_series + Array(value.dc_no_length - String(value.dc_number).length + 1).join('0') + value.dc_number;
    }
  }

  let downloadFilterList = function(){
  $http({
    method: 'GET',
    url: '/api/department?dept_type=1'
  }).then(function successCallback(response) {
    $scope.departmentlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Department list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

    $http({
      method: 'GET',
      url: '/api/lot?status=active'
    }).then(function successCallback(response) {
      $scope.lotlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'LOT list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

      $http({
        method: 'GET',
        url: '/api/supplier?allfeilds=0'
      }).then(function successCallback(response) {
        $scope.supplierlist = response.data;
        console.log(response);
      },
        function errorCallback(response) {
          console.log(response);
        });  
  }


  let callListAPI = function (limit, filterString) {
  $http({
    method: 'GET',
    url: '/api/cdc?limit='+limit+filterString
  }).then(function successCallback(response) {
    $scope.rowCollection = [].concat(response.data);
    console.log(response);
    $scope.displayedCollection = [].concat($scope.rowCollection);
  },
    function errorCallback(response) {
      console.log(response);
    });
  }
  callListAPI($scope.itemsByPage, '');

  single_cdc_loading = false;
  $scope.open = function (item) {

    if (single_cdc_loading) {
      ngToast.create({
        className: 'warning',
        content: 'Please wait loading... '
      });
      return;
    }
    single_cdc_loading = true;
    $http({
      method: 'GET',
      url: '/api/cdc?id=' + item.idcdc
    }).then(function successCallback(response) {
      console.log(response);
      $scope.cdc = response.data[0];
      temp_items = {}
      $scope.cdc.items.forEach(element => {
        if (!temp_items[element.cdc_colour_index]) {
          temp_items[element.cdc_colour_index] = {}
          temp_items[element.cdc_colour_index].colour = element.colour;
          temp_items[element.cdc_colour_index].dialist = [];
        }
        temp_items[element.cdc_colour_index].dialist.push({ dia: element.dia, roll: element.roll, weight: element.weight, comment: element.comment });
      });
      cdc_colour_index_list = Object.keys(temp_items).sort();
      $scope.cdc.items = [];
      cdc_colour_index_list.forEach(x => {
        $scope.cdc.items.push(temp_items[x]);
      });
      $scope.hidelist = true;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: './html/cdcmodal.html',
        controller: 'cdcmodalCtrl',
        size: 'xl',
        windowTopClass: 'hidden-print',
        resolve: {
          cdc: function () {
            return $scope.cdc;
          }
        }
      });

      modalInstance.result.then(function (generated) {

      }, function (ret) {

        console.log('Modal dismissed at: ' + new Date(), ret);

      });

      $scope.$on("modalClosing", function (event, ret) {
        console.log('inside modalClosing event', ret);

        $scope.cdc = {};
        single_cdc_loading = false;
        $scope.hidelist = false;

      });



    },
      function errorCallback(response) {
        console.log(response);
        var er = 'Single cdc fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
        single_cdc_loading = false;
      });


  }

  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }



  // datepicker stuff - to be decoded later

  $scope.clear = function () {
    $scope.filter.dc_date = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    return false;
  }

  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
    $scope.pdc.dc_date = new Date(year, month, day);
  };

  $scope.altInputFormats = ['d!.M!.yyyy', 'd!.M!.yy', 'd!/M!/yyyy', 'd!/M!/yy'];//,'d!.M!','d!.M!.yy'];

  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

}]);


app.controller('viewpiecesdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function viewpiecesdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect4();
  $scope.displayedCollection = [];
  $scope.rowCollection = [];
  $scope.filter = {};
  $scope.addFilter = false;

  $scope.initialState = function(){
  $scope.loadAll = false;
  $scope.itemsByPage = 75;
  $scope.showpagination = false;
  }
  $scope.initialState();

  $scope.hidelist = false;
  $scope.isCollapsed = true;
  $scope.filterString = '';

  $scope.refresh = function(){
    $scope.initialState();
    callListAPI($scope.itemsByPage,$scope.filterString)
  }

  $scope.addFilters = function () {

    if($scope.addFilter == false){
      $scope.addFilter = true;
      downloadFilterList();
    }
    $scope.isCollapsed = !$scope.isCollapsed;
}

  $scope.applyFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function(key){
      if($scope.filter[key] != null)
        $scope.filterString+='&'+key+'='+$scope.filter[key];
    });
    $scope.initialState();
    callListAPI($scope.itemsByPage,$scope.filterString)
  
}
  $scope.clearFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function(key){
        $scope.filter[key] = null;
    });
    $scope.filter_supplier = null;
    $scope.filter_item = null;
    $scope.after_dc_date = null;
    $scope.before_dc_date = null;
    $scope.initialState();    
    callListAPI($scope.itemsByPage,$scope.filterString)

}

  $scope.loadAllItems = function () {
    $scope.loadAll = true;
    callListAPI(Number.MAX_SAFE_INTEGER,$scope.filterString)
    $scope.showpagination = true;
}
  $scope.updateItemsByPage = function () {
    if ($scope.showpagination == true) {
      $scope.showpagination = false;
      $scope.itemsByPage = $scope.rowCollection.length;
    }
  }
  $scope.ds = function (a) {
    var b = new Date(a);
    return b.toString('dd.MM.yyyy');
  }

  $scope.setsupplierFilter = function () {
    $scope.filter.idsupplier = $scope.filter_supplier.id;
  }

  $scope.setnameid = function () {
    $scope.filter.iditem = $scope.filter_item.id;
  
  }

  $scope.setafterdate = function () {
    $scope.filter.after_dc_date = $scope.after_dc_date.yyyymmdd();
  
  }

  $scope.setbeforedate = function () {
    $scope.filter.before_dc_date = $scope.before_dc_date.yyyymmdd();
  
  }

  $scope.getters = {
    dc_number: function (value) {
      //this will sort by the length of the first name string
      return value.naming_series + Array(value.dc_no_length - String(value.dc_number).length + 1).join('0') + value.dc_number;
    }
  }

  let downloadFilterList = function(){
  $http({
    method: 'GET',
    url: '/api/department?dept_type=2'
  }).then(function successCallback(response) {
    $scope.departmentlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Department list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

    $http({
      method: 'GET',
      url: '/api/lot?status=active'
    }).then(function successCallback(response) {
      $scope.lotlist = response.data;
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'LOT list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

      $http({
        method: 'GET',
        url: '/api/supplier?allfeilds=0'
      }).then(function successCallback(response) {
        $scope.supplierlist = response.data;
        console.log(response);
      },
        function errorCallback(response) {
          console.log(response);
        });

        $http({
          method: 'GET',
          url: '/api/item?itemstatus=active'
        }).then(function successCallback(response) {
          console.log(response);
          $scope.itemlist = [];
          $scope.sizerangelist = response.data.sizerange;
          $scope.sizetypelist = response.data.sizetype;
          angular.forEach(response.data.items, function (value, key) {
            var temp = { naming_series: value.naming_series,  fullname: value.naming_series.concat(' ',value.name), name: value.name, id: value.id, sizerange: value.sizerange };
            this.push(temp);
          }, $scope.itemlist);
        }, function errorCallback(response) {
          console.log(response);
        });

    }


  let callListAPI = function (limit,filterString) {
  $http({
    method: 'GET',
    url: '/api/pdc?limit='+limit+filterString
  }).then(function successCallback(response) {
    $scope.rowCollection = [].concat(response.data);
    console.log(response);
    $scope.displayedCollection = [].concat($scope.rowCollection);
  },
    function errorCallback(response) {
      console.log(response);
    });
  }
  callListAPI($scope.itemsByPage,'');

  single_pdc_loading = false;
  $scope.open = function (item) {

    if (single_pdc_loading) {
      ngToast.create({
        className: 'warning',
        content: 'Please wait loading... '
      });
      return;
    }
    single_pdc_loading = true;
    $http({
      method: 'GET',
      url: '/api/pdc?id=' + item.idpdc
    }).then(function successCallback(response) {
      console.log(response);
      $scope.pdc = response.data[0];
      $scope.sizerange = $scope.pdc.sizerange[0];
      $scope.sizetype = $scope.pdc.sizetype[0];

      // temp_items = {}
      // $scope.pdc.items.forEach(element => {
      //   if (!temp_items[element.pdc_colour_index]) {
      //     temp_items[element.pdc_colour_index] = {}
      //     temp_items[element.pdc_colour_index].colour = element.colour;
      //     temp_items[element.pdc_colour_index].dialist = [];
      //   }
      //   temp_items[element.pdc_colour_index].dialist.push({ dia: element.dia, roll: element.roll, weight: element.weight, comment: element.comment });
      // });
      // pdc_colour_index_list = Object.keys(temp_items).sort();
      // $scope.pdc.items = [];
      // pdc_colour_index_list.forEach(x => {
      //   $scope.pdc.items.push(temp_items[x]);
      // });
      $scope.hidelist = true;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: './html/pdcmodal.html',
        controller: 'pdcmodalCtrl',
        size: 'xl',
        windowTopClass: 'hidden-print',
        resolve: {
          pdc: function () {
            return $scope.pdc;
          },
          sizerange: function () {
            return $scope.sizerange;
          },
          sizetype: function () {
            return $scope.sizetype;
          }
        }
      });

      modalInstance.result.then(function (generated) {

      }, function (ret) {

        console.log('Modal dismissed at: ' + new Date(), ret);

      });

      $scope.$on("modalClosing", function (event, ret) {
        console.log('inside modalClosing event', ret);

        $scope.pdc = {};
        single_pdc_loading = false;
        $scope.hidelist = false;

      });



    },
      function errorCallback(response) {
        console.log(response);
        var er = 'Single pdc fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
        single_pdc_loading = false;
      });


  }

  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }



  // datepicker stuff - to be decoded later

  $scope.clear = function () {
    $scope.filter.dc_date = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    return false;
  }

  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
    $scope.pdc.dc_date = new Date(year, month, day);
  };

  $scope.altInputFormats = ['d!.M!.yyyy', 'd!.M!.yy', 'd!/M!/yyyy', 'd!/M!/yy'];//,'d!.M!','d!.M!.yy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }




}]);





app.controller('managemasterCtrl', ['$scope', '$uibModal', '$http', function managemasterCtrl($scope, $uibModal, $http) {
  $scope.tabselect5();


  $scope.openaddsupplier = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/supplier.html',
      controller: 'addsupplierCtrl',
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


  $scope.opensupplierlist = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/supplierlist.html',
      controller: 'supplierlistCtrl',
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


  $scope.openaddsimplemaster = function (master_name) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/simplemaster.html',
      controller: 'addsimplemasterCtrl',
      size: 'lg',
      //appendTo: $(document).find('body').eq(0),//'body',
      //  backdrop: 'static',
      // keyboard: false,
      resolve: {
        master_name: function () {
          return master_name;
        },
      }
    });

    modalInstance.result.then(function (saved) {
      // if (saved == 1)
      // location.reload();
    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);

    });
  }



}]);


app.controller('addsupplierCtrl', ['$scope', '$http', 'ngToast', '$uibModalInstance', 'hotkeys', '$resource', function addsupplierCtrl($scope, $http, ngToast, $uibModalInstance, hotkeys, $resource) {

  $http({
    method: 'GET',
    url: '/api/stateslist'
  }).then(function successCallback(response) {
    $scope.stateslist = response.data.map(function (item) { return item.state });
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'States list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $scope.getcities = function (state) {
    $http({
      method: 'GET',
      url: '/api/statecities/' + state
    }).then(function successCallback(response) {
      $scope.citieslist = response.data.map(function (item) { return item.city });
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'City list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

  }

  $scope.ok = function () {
    if ((' ' + document.getElementById("departments").className + ' ').indexOf(' ' + "ng-invalid" + ' ') > -1) {
      ngToast.create({
        className: 'info',
        content: 'Invalid Departments... '
      });
      return;
    }
    $scope.supplier.departments = []
    $scope.departments.map(function (obj) {
      $scope.supplier.departments.push(obj.id);
    });

    console.log("data sent:", $scope.supplier, "local departments:", $scope.departments);

    $http({
      method: 'POST',
      url: '/api/supplier',
      data: $scope.supplier
    }).then(function successCallback(response) {
      console.log(response);
      if (response.status == 200) {
        ngToast.create('Supplier Details Saved.');
        $uibModalInstance.close("saved");
      }
      else {
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      }
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $http({
    method: 'GET',
    url: '/api/department'
  }).then(function successCallback(response) {
    departmentlist = response.data;
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'Department list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $scope.loadTags = function (query) {
    return departmentlist.filter(function (dept) {
      return dept.name.toUpperCase().indexOf(query.toUpperCase()) != -1;
    });
  };
}]);

app.controller('addsimplemasterCtrl', ['$scope', '$http', 'ngToast', '$uibModalInstance', 'hotkeys', '$resource', 'master_name', function addsimplemasterCtrl($scope, $http, ngToast, $uibModalInstance, hotkeys, $resource, master_name) {

  $scope.master_name = master_name;


  $scope.ok = function () {

    console.log("data sent:", $scope.master);

    $http({
      method: 'POST',
      url: '/api/' + $scope.master_name,
      data: $scope.master
    }).then(function successCallback(response) {
      console.log(response);
      ngToast.create('Supplier Details Saved.');
      $uibModalInstance.close("saved");
    },
      function errorCallback(response) {
        console.log(response);
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }


}]);

app.controller('supplierlistCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$http', function supplierlistCtrl($scope, $uibModal, $uibModalInstance, $http) {


  $http({
    method: 'GET',
    url: '/api/supplier?allfeilds=0'
  }).then(function successCallback(response) {
    $scope.rowCollection = [].concat(response.data);
    console.log(response);
    $scope.displayedCollection = [].concat($scope.rowCollection);
  },
    function errorCallback(response) {
      console.log(response);
    });



  $scope.openeditsupplier = function (id) {


    $http({
      method: 'GET',
      url: 'api/supplier?allfeilds=1&id=' + id
    }).then(function successCallback(response) {
      $scope.supplier = response.data[0];
      console.log(response);



      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: './html/supplier.html',
        controller: 'editsupplierCtrl',
        size: 'lg',
        resolve: {
          supplier: function () {
            return $scope.supplier;
          }
          // ,
          // party_safe: function () {
          //   var party_safe
          //   angular.copy($scope.party,party_safe)
          //   return party_safe;
          // }
        }
      });

      modalInstance.result.then(function () {

      }, function (ret) {



        console.log('Modal dismissed at: ' + new Date(), ret);

      });


      $scope.$on("modalClosing", function (event, ret) {
        console.log('inside modalClosing event', ret); //value should be $scope.editMade

        var temppos = arrayObjectIndexOf($scope.displayedCollection, ret.id, "id");
        console.log($scope.displayedCollection[temppos]);

        Object.keys(ret).map(function (key) {
          this[key] = ret[key]
        }, $scope.displayedCollection[temppos])

      });


    },
      function errorCallback(response) {
        console.log(response);
        var er = 'Single Supplier fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss("close clicked");
  }

}]);




app.controller('editsupplierCtrl', function ($scope, $rootScope, $http, $uibModalInstance, ngToast, supplier) {
  $scope.supplier = supplier;


  var supplier_safe = {};
  Object.keys($scope.supplier).map(function (key) {
    this[key] = $scope.supplier[key]
  }, supplier_safe)

  $http({
    method: 'GET',
    url: '/api/stateslist'
  }).then(function successCallback(response) {
    $scope.stateslist = response.data.map(function (item) { return item.state });
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
    });

  $scope.getcities = function (state) {
    $http({
      method: 'GET',
      url: '/api/statecities/' + state
    }).then(function successCallback(response) {
      $scope.citieslist = response.data.map(function (item) { return item.city });
      console.log(response);
    },
      function errorCallback(response) {
        console.log(response);
      });

  }

  $http({
    method: 'GET',
    url: '/api/department'
  }).then(function successCallback(response) {
    departmentlist = response.data;
    $scope.departments = departmentlist.filter(function (dept) {
      return $scope.supplier.departments_list ? $scope.supplier.departments_list.split(",").indexOf(dept.name) > -1 : false;
    });
    console.log(response);
  },
    function errorCallback(response) {
      console.log(response);
      var er = 'States list fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
      ngToast.create({
        className: 'danger',
        content: er
      });
    });

  $scope.loadTags = function (query) {
    return departmentlist.filter(function (dept) {
      return dept.name.toUpperCase().indexOf(query.toUpperCase()) != -1;
    });
  };


  $scope.ok = function () {

    if ((' ' + document.getElementById("departments").className + ' ').indexOf(' ' + "ng-invalid" + ' ') > -1) {
      ngToast.create({
        className: 'info',
        content: 'Invalid Departments... '
      });
      return;
    }

    $scope.supplier_diff = {}
    Object.keys(supplier_safe).map(function (key) {
      if (key != 'departments_list') {
        if (supplier_safe[key] != $scope.supplier[key]) {
          this[key] = $scope.supplier[key]
        }
      }
    }, $scope.supplier_diff)

    dlist_temp = supplier_safe.departments_list ? supplier_safe.departments_list.split(",") : [];
    dept_diff_flag = 0;
    if (dlist_temp.length == $scope.departments.length) {
      $scope.departments.map(function (dept) {
        if (dlist_temp.indexOf(dept.name) == -1) {
          dept_diff_flag = 1;
        }
      });
    }
    else {
      dept_diff_flag = 1;
    }

    if (dept_diff_flag == 1) {
      $scope.supplier_diff.departments = []
      $scope.departments.map(function (obj) {
        $scope.supplier_diff.departments.push(obj.id);
      });
    }



    console.log("supplier_diff: ", $scope.supplier_diff, $scope.supplier, supplier_safe);
    if (Object.keys($scope.supplier_diff).length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'No Changes Made'
      });
      return;
    }




    $http({
      method: 'PUT',
      url: '/api/supplier/' + $scope.supplier.id,
      data: $scope.supplier_diff,
      headers: { 'Accept': 'application/json' }
    }).then(function successCallback(response) {
      console.log(response);

      $http({
        method: 'GET',
        url: 'api/supplier?allfeilds=1&id=' + $scope.supplier.id
      }).then(function successCallback(response) {
        supplier_safe = response.data[0];
        $scope.supplier.modified_time = supplier_safe.modified_time;
        console.log(response);
        ngToast.create('Supplier Details Saved.');
      },
        function errorCallback(response) {
          console.log(response);
          var er = 'Single party fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
          ngToast.create({
            className: 'danger',
            content: er
          });
        });
    }).catch(
      function errorCallback(response) {
        console.log(response);
        var er = 'ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
      });

  }
  $scope.$on("modal.closing", function () {
    $rootScope.$broadcast("modalClosing", supplier_safe);
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss(supplier_safe);
  }
});





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
    when('/newdc', {
      templateUrl: './html/newdc.html',
      controller: 'newdcCtrl'
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
      var result = input.toFixed(2).split('.');

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


app.filter('minLength', function () {
  return function (input, len, pad) {
    if (!input) return ''
    input = input.toString();
    if (input.length >= len) return input;
    else {
      pad = (pad || 0).toString();
      return new Array(1 + len - input.length).join(pad) + input;
    }
  };
  // {{ 22 | minLength:4 }} //Returns "0022"
  // {{ 22 | minLength:4:"-" }} //Returns "--22"
  // {{ "aa" | minLength:4:"&nbsp;" }} //Returns "  aa"
  // {{ 1234567 | minLength:4 }} //Returns "1234567"
});

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};
