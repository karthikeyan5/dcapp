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
  //   // document.getElementById("tabnav").childNodes[7].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[9].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[11].className = "active";
  //   // document.getElementById("tabnav").childNodes[13].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[15].className = "inactive";
  // };

  // $scope.tabselect7 = function () {
  //   document.getElementById("tabnav").childNodes[1].className = "inactive";
  //   document.getElementById("tabnav").childNodes[3].className = "inactive";
  //   document.getElementById("tabnav").childNodes[5].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[7].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[9].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[11].className = "inactive";
  //   // document.getElementById("tabnav").childNodes[13].className = "active";
  //   // document.getElementById("tabnav").childNodes[15].className = "inactive";
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

app.controller('colourdetailsCtrl', ['$scope', '$http', 'ngToast', '$uibModal', '$uibModalInstance', 'hotkeys', '$resource', 'colour', 'lot_number', 'dialist', 'index', function colourdetailsCtrl($scope, $http, ngToast, $uibModal, $uibModalInstance, hotkeys, $resource, colour, lot_number, dialist, index) {
  $scope.colour = colour;
  $scope.lot_number = lot_number;
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


    $uibModalInstance.close({ dialist: $scope.dialist, colour: $scope.colour, lot_number: $scope.lot_number, index: index });
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

app.controller('dcmodalCtrl', function ($scope, $http, $uibModalInstance, $uibModal, dc, ngToast, $rootScope) {
  $scope.dc = dc;
  if ($scope.dc.dc_number) $scope.disablesave = true;
  else $scope.disablesave = false;


  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }
  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.grand_total_weight_partlist = arr => arr.reduce((a, b) => a + $scope.total(b.partlist, 'wsize1', 3) +
    $scope.total(b.partlist, 'wsize2', 3) +
    $scope.total(b.partlist, 'wsize3', 3) +
    $scope.total(b.partlist, 'wsize4', 3) +
    $scope.total(b.partlist, 'wsize5', 3) +
    $scope.total(b.partlist, 'wsize6', 3) +
    $scope.total(b.partlist, 'wsize7', 3) +
    $scope.total(b.partlist, 'wsize8', 3) +
    $scope.total(b.partlist, 'wsize9', 3) +
    $scope.total(b.partlist, 'wsize10', 3), 0)

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
      $scope.dc.dc_date = response.data.dc.server_time;
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

app.controller('itemdetailsCtrl', ['$scope', '$http', 'ngToast', '$uibModal', '$uibModalInstance', 'hotkeys', '$resource', 'item', 'lot_number', 'partlist', 'index', 'sizerange', 'sizetype', 'colourlist', 'master_colourlist', 'cur_dept_type', function itemdetailsCtrl($scope, $http, ngToast, $uibModal, $uibModalInstance, hotkeys, $resource, item, lot_number, partlist, index, sizerange, sizetype, colourlist, master_colourlist, cur_dept_type) {
  $scope.cur_dept_type = cur_dept_type;
  $scope.item = item;
  $scope.lot_number = lot_number;
  $scope.partlist = partlist;
  $scope.index = index;
  $scope.sizerange = sizerange;
  $scope.sizetype = sizetype;
  $scope.colourlist = colourlist;
  $scope.newitem = {};
  $scope.add = function (collection, item) {
    if (((item.size1 + item.size2 + item.size3 + item.size4 + item.size5 + item.size6 + item.size7 + item.size8 + item.size9 + item.size10) == 0)
      && ((item.wsize1 + item.wsize2 + item.wsize3 + item.wsize4 + item.wsize5 + item.wsize6 + item.wsize7 + item.wsize8 + item.wsize9 + item.wsize10) == 0)) {
      ngToast.create({
        className: 'danger',
        content: 'Empty !!! Item not added...<br>Please try again...'
      });
      return;
    }

    if (item.index == undefined) {

      collection.push(item);
      ngToast.create({
        className: 'success',
        content: 'Item added...'
      });
    }
    else {
      index_temp = item.index;
      collection[index_temp] = item;
      ngToast.create({
        className: 'success',
        content: 'Item Updated...'
      });
    }

    $scope.clearnewitem();
  }

  $scope.focuspart = function () {
    a = findPos(document.getElementById("partbox"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("partbox").focus();
  }

  $scope.clearnewitem = function () {
    if ($scope.cur_dept_type == 'piece') {
      $scope.newitem = { "size1": 0, "wsize1": 0, "size2": 0, "wsize2": 0, "size3": 0, "wsize3": 0, "size4": 0, "wsize4": 0, "size5": 0, "wsize5": 0, "size6": 0, "wsize6": 0, "size7": 0, "wsize7": 0, "size8": 0, "wsize8": 0, "size9": 0, "wsize9": 0, "size10": 0, "wsize10": 0, "part": undefined, "colour": undefined, "comment": undefined };
    }
    else if ($scope.cur_dept_type == 'packed') {
      $scope.newitem = { "size1": 0, "size2": 0, "size3": 0, "size4": 0, "size5": 0, "size6": 0, "size7": 0, "size8": 0, "size9": 0, "size10": 0, "part": undefined, "colour": undefined, "comment": undefined };

    }
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



  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }

  $scope.loadallcolour = function () {
    $scope.colourlist = master_colourlist;
  }


  $uibModalInstance.rendered.then(function () {
    console.log('Modal rendered at: ' + new Date())
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $scope.ok = function () {

    if ($scope.partlist.length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'Please make atleast one entry... '
      });
      return;
    }


    $uibModalInstance.close({ partlist: $scope.partlist, item: $scope.item, lot_number: $scope.lot_number, index: index, sizerange: $scope.sizerange, sizetype: $scope.sizetype, cur_dept_type: $scope.cur_dept_type });
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

app.controller('newdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', '$route', function newdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource, $route) {
  $scope.tabselect1();
  $scope.dc = {};
  $scope.currentSize = { size1: 'size 1', size2: 'size 2', size3: 'size 3', size4: 'size 4', size5: 'size 5', size6: 'size 6', size7: 'size 7', size8: 'size 8', size9: 'size 9', size10: 'size 10' };
  $scope.sizestate = [true, true, true, true, true, true, true, true, true, true];
  $scope.dc.items = [];
  $scope.dc.naming_series = "DC-";
  $scope.dc.supplier_id = null;
  $scope.dynamicPopover = [];
  $scope.dynamicPopover.templateUrl = "supplierpopup.html";
  $scope.newitem = {};
  $scope.temp_storage = {};

  $http({
    method: 'GET',
    url: 'api/getdbinfo?infoname=dcseries'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.dc.naming_series = response.data[0].info;
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
    a = findPos(document.getElementById("lotbox"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("lotbox").focus();
  };

  $scope.focussuppliername = function (event1) {
    if (event1 != null) {
      event1.preventDefault()
    }
    if ($scope.dc.supplier_id != null) {
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
    if ($scope.previousSelectedDepartment && dc_department.dept_type != $scope.dc.dept_type && $scope.dc.items.length > 0) {
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
      $scope.focussuppliername(null)
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
      var temp = { naming_series: value.naming_series, fullname: value.naming_series.concat(' ', value.name), name: value.name, id: value.id, sizerange: value.sizerange };
      this.push(temp);
    }, $scope.itemlist);
  }, function errorCallback(response) {
    console.log(response);
  });


  $scope.setnameid = function () {
    if (!$scope.temp_storage.newitemdetails) {
      return;
    }


    angular.forEach($scope.sizerangelist, function (value, key) {
      if ($scope.temp_storage.newitemdetails.sizerange == value.idsize) {
        $scope.idsizetype = value.idsizetype;
        $scope.sizerange = value;
      }
    });

    angular.forEach($scope.sizetypelist, function (value, key) {
      if ($scope.idsizetype == value.id) {
        $scope.sizetype = value;
      }
    });
    $scope.idsizerange = $scope.temp_storage.newitemdetails.sizerange;


  };


  $scope.focuspart = function () {
    // console.log("heloooooinside", document.getElementById("partbox"));
    a = findPos(document.getElementById("partbox"));
    $('html, body').animate({ scrollTop: a - 400 }, 'slow');
    document.getElementById("partbox").focus();
  }

  var open = function (colour, lot_number, dialist, index) {
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
        lot_number: function () {
          return lot_number;
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

  var openitemdetails = function (item, lot_number, partlist, index, sizerange, sizetype) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/itemdetails.html',
      controller: 'itemdetailsCtrl',
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      // animation:false,
      resolve: {
        item: function () {
          return item;
        },
        lot_number: function () {
          return lot_number;
        },
        partlist: function () {
          return partlist;
        },
        index: function () {
          return index;
        },
        sizerange: function () {
          return sizerange;
        },
        sizetype: function () {
          return sizetype;
        },
        colourlist: function () {
          return $scope.colourlist;
        },
        master_colourlist: () => $scope.colourlist,
        cur_dept_type: () => 'piece'
      }
    });

    modalInstance.result.then(function (ret) {
      console.log('received partlist: ', ret.partlist, 'received item:  ', ret.item);

      if (ret.index == -1) {
        delete ret.index;
        $scope.dc.items.push(ret);
        modalInstance.closed.then(function () {
          a = findPos(document.getElementById("itembox"));
          $('html, body').animate({ scrollTop: a - 400 }, 'slow');
          document.getElementById("itembox").focus();
        });

      }
      else {
        // $scope.dc.items[ret.index].item = ret.item;
        // $scope.cdc.items[ret.index].dialist = ret.dialist;
      }
      $scope.temp_storage.newitemdetails = null;


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });
  }


  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.grand_total_weight_partlist = arr => arr.reduce((a, b) => a + $scope.total(b.partlist, 'wsize1', 3) +
    $scope.total(b.partlist, 'wsize2', 3) +
    $scope.total(b.partlist, 'wsize3', 3) +
    $scope.total(b.partlist, 'wsize4', 3) +
    $scope.total(b.partlist, 'wsize5', 3) +
    $scope.total(b.partlist, 'wsize6', 3) +
    $scope.total(b.partlist, 'wsize7', 3) +
    $scope.total(b.partlist, 'wsize8', 3) +
    $scope.total(b.partlist, 'wsize9', 3) +
    $scope.total(b.partlist, 'wsize10', 3), 0)







  $scope.addColor = function (colour, lot_number) {
    if(!colour){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Colour... '
      });
      return;
    }
    if(!lot_number){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Lot Number... '
      });
      return;
    }
    open(colour, lot_number, [], -1);
  }

  $scope.removecolour = function (index) {
    $scope.dc.items.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Colour deleted... '//undo
    });
  }

  $scope.editcolour = function (index) {

    open($scope.dc.items[index].colour, $scope.dc.items[index].lot_number, $scope.dc.items[index].dialist, index);
  }


  $scope.addItem = function (item, lot_number, sizerange, sizetype) {
    if(!item){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Item name... '
      });
      return;
    }
    if(!lot_number){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Lot Number... '
      });
      return;
    }
    openitemdetails(item, lot_number, [], -1, sizerange, sizetype);
  }

  $scope.removeitem = function (index) {
    $scope.dc.items.splice(index, 1);
    ngToast.create({
      className: 'danger',
      content: 'Item deleted... '//undo
    });
  }

  $scope.edititem = function (index) {

    openitemdetails($scope.dc.items[index].item, $scope.dc.items[index].lot_number, $scope.dc.items[index].partlist, index, $scope.dc.items[index].sizerange, $scope.dc.items[index].sizetype);
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

    if ($scope.dc.items.length < 1) {
      ngToast.create({
        className: 'warning',
        content: 'Nothing to Deliver?... '
      });
      return;
    }



    opendcmodal($scope.dc);


  }


}]);

app.controller('viewdcCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function viewdcCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect2();
  $scope.displayedCollection = [];
  $scope.rowCollection = [];
  $scope.filter = {};
  $scope.addFilter = false;

  $scope.initialState = function () {
    $scope.loadAll = false;
    $scope.itemsByPage = 75;
    $scope.showpagination = false;
  }
  $scope.initialState();

  $scope.hidelist = false;
  $scope.isCollapsed = true;
  $scope.filterString = '';

  $scope.refresh = function () {
    $scope.initialState();
    callListAPI($scope.itemsByPage, $scope.filterString)
  }

  $scope.addFilters = function () {

    if ($scope.addFilter == false) {
      $scope.addFilter = true;
      downloadFilterList();
    }
    $scope.isCollapsed = !$scope.isCollapsed;
  }

  $scope.applyFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function (key) {
      if ($scope.filter[key] != null)
        $scope.filterString += '&' + key + '=' + $scope.filter[key];
    });
    $scope.initialState();
    callListAPI($scope.itemsByPage, $scope.filterString)

  }
  $scope.clearFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function (key) {
      $scope.filter[key] = null;
    });
    $scope.filter_supplier = null;
    $scope.filter_item = null;
    $scope.after_dc_date = null;
    $scope.before_dc_date = null;
    $scope.initialState();
    callListAPI($scope.itemsByPage, $scope.filterString)

  }

  $scope.loadAllItems = function () {
    $scope.loadAll = true;
    callListAPI(Number.MAX_SAFE_INTEGER, $scope.filterString)
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

  let downloadFilterList = function () {
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
        var temp = { naming_series: value.naming_series, fullname: value.naming_series.concat(' ', value.name), name: value.name, id: value.id, sizerange: value.sizerange };
        this.push(temp);
      }, $scope.itemlist);
    }, function errorCallback(response) {
      console.log(response);
    });

  }


  let callListAPI = function (limit, filterString) {
    $http({
      method: 'GET',
      url: '/api/dc?limit=' + limit + filterString
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

  single_dc_loading = false;
  $scope.open = function (item) {

    if (single_dc_loading) {
      ngToast.create({
        className: 'warning',
        content: 'Please wait loading... '
      });
      return;
    }
    single_dc_loading = true;
    $http({
      method: 'GET',
      url: '/api/dc?id=' + item.iddc
    }).then(function successCallback(response) {
      console.log(response);
      $scope.dc = response.data[0];
      if ($scope.dc.dept_type == 'piece') {
        temp_items = {}
        $scope.dc.items.forEach(element => {
          if (!temp_items[element.pdc_part_index]) {
            temp_items[element.pdc_part_index] = {}
            temp_items[element.pdc_part_index].lot_number = element.lot_number;
            temp_items[element.pdc_part_index].item = { name: element.itemname, id: element.iditem, naming_series: element.item_naming_series, };
            angular.forEach($scope.dc.sizerange, function (value, key) {
              if (element.sizerange == value.idsize) {
                $scope.idsizetype = value.idsizetype;
                temp_items[element.pdc_part_index].sizerange = value;
              }
            });

            angular.forEach($scope.dc.sizetype, function (value, key) {
              if ($scope.idsizetype == value.id) {
                temp_items[element.pdc_part_index].sizetype = value;
              }
            });

            temp_items[element.pdc_part_index].lot_number = element.lot_number;
            temp_items[element.pdc_part_index].partlist = [];
          }
          temp_items[element.pdc_part_index].partlist.push({
            part: element.part, colour: element.colour, comment: element.comment,
            size1: element.size1,
            size2: element.size2,
            size3: element.size3,
            size4: element.size4,
            size5: element.size5,
            size6: element.size6,
            size7: element.size7,
            size8: element.size8,
            size9: element.size9,
            size10: element.size10,
            wsize1: element.wsize1,
            wsize2: element.wsize2,
            wsize3: element.wsize3,
            wsize4: element.wsize4,
            wsize5: element.wsize5,
            wsize6: element.wsize6,
            wsize7: element.wsize7,
            wsize8: element.wsize8,
            wsize9: element.wsize9,
            wsize10: element.wsize10
          });

        });
        dc_colour_index_list = Object.keys(temp_items).sort();
        $scope.dc.items = [];
        dc_colour_index_list.forEach(x => {
          $scope.dc.items.push(temp_items[x]);
        });
        console.log('dc.items: ', $scope.dc.items)
      }
      else if ($scope.dc.dept_type == 'cloth') {
        temp_items = {}
        $scope.dc.items.forEach(element => {
          if (!temp_items[element.cdc_colour_index]) {
            temp_items[element.cdc_colour_index] = {}
            temp_items[element.cdc_colour_index].colour = element.colour;
            temp_items[element.cdc_colour_index].lot_number = element.lot_number;
            temp_items[element.cdc_colour_index].dialist = [];
          }
          temp_items[element.cdc_colour_index].dialist.push({ dia: element.dia, roll: element.roll, weight: element.weight, comment: element.comment });
        });
        dc_colour_index_list = Object.keys(temp_items).sort();
        $scope.dc.items = [];
        dc_colour_index_list.forEach(x => {
          $scope.dc.items.push(temp_items[x]);
        });
      }
      $scope.hidelist = true;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: './html/dcmodal.html',
        controller: 'dcmodalCtrl',
        size: 'xl',
        windowTopClass: 'hidden-print',
        resolve: {
          dc: function () {
            return $scope.dc;
          }
        }
      });

      modalInstance.result.then(function (generated) {

      }, function (ret) {

        console.log('Modal dismissed at: ' + new Date(), ret);

      });

      $scope.$on("modalClosing", function (event, ret) {
        console.log('inside modalClosing event', ret);

        $scope.dc = {};
        single_dc_loading = false;
        $scope.hidelist = false;

      });



    },
      function errorCallback(response) {
        console.log(response);
        var er = 'Single dc fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
        single_dc_loading = false;
      });


  }

  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }
  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.grand_total_weight_partlist = arr => arr.reduce((a, b) => a + $scope.total(b.partlist, 'wsize1', 3) +
    $scope.total(b.partlist, 'wsize2', 3) +
    $scope.total(b.partlist, 'wsize3', 3) +
    $scope.total(b.partlist, 'wsize4', 3) +
    $scope.total(b.partlist, 'wsize5', 3) +
    $scope.total(b.partlist, 'wsize6', 3) +
    $scope.total(b.partlist, 'wsize7', 3) +
    $scope.total(b.partlist, 'wsize8', 3) +
    $scope.total(b.partlist, 'wsize9', 3) +
    $scope.total(b.partlist, 'wsize10', 3), 0)


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

app.controller('grnmodalCtrl', function ($scope, $http, $uibModalInstance, $uibModal, grn, ngToast, $rootScope) {
  $scope.grn = grn;
  if ($scope.grn.grn_number) $scope.disablesave = true;
  else $scope.disablesave = false;


  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }
  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.grand_total_weight_partlist = arr => arr.reduce((a, b) => a + $scope.total(b.partlist, 'wsize1', 3) +
    $scope.total(b.partlist, 'wsize2', 3) +
    $scope.total(b.partlist, 'wsize3', 3) +
    $scope.total(b.partlist, 'wsize4', 3) +
    $scope.total(b.partlist, 'wsize5', 3) +
    $scope.total(b.partlist, 'wsize6', 3) +
    $scope.total(b.partlist, 'wsize7', 3) +
    $scope.total(b.partlist, 'wsize8', 3) +
    $scope.total(b.partlist, 'wsize9', 3) +
    $scope.total(b.partlist, 'wsize10', 3), 0)

  $scope.save = () => {
    $scope.disablesave = true;
    $http({
      method: 'POST',
      url: '/api/grn',
      data: $scope.grn
    }).then(function successCallback(response) {
      console.log(response);
      ngToast.create('GRN Details Saved.');
      $scope.grn.grn_number = response.data.grn.grn_number;
      $scope.grn.grn_no_length = response.data.grn.length;
      $scope.grn.server_time = response.data.grn.server_time;
      $scope.grn.grn_date = response.data.grn.server_time;
      $scope.grn.current_user = response.data.grn.current_user;
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
    $rootScope.$broadcast("modalClosing", $scope.grn.grn_number ? $scope.grn.grn_number : undefined);
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  }

  $scope.print = function () {
    window.print();
  }

  $scope.cancelgrn = () => {
    // TBD:add the cancelgrnmodal then a reason the update all the way down when model is closed
    var answer = confirm("Cancel GRN? WARNING!!! This cannot be undone.")
    send_data = { status: 2 }
    if (answer) {
      $http({
        method: 'PUT',
        url: '/api/grn/' + $scope.grn.idgrn,
        data: send_data
      }).then(function successCallback(response) {
        console.log(response);
        ngToast.create('GRN Cancelled....');
        $scope.grn.status = 'inactive'
      },
        function errorCallback(response) {
          console.log(response);
          var er = 'GRN Cancel ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
          ngToast.create({
            className: 'danger',
            content: er
          });
        });
    }
  }

});

app.controller('newgrnCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', '$route', function newgrnCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource, $route) {
  $scope.tabselect3();
  $scope.grn = {};
  $scope.grn.supplier_id = null;
  $scope.grn.naming_series = "GRN-"
  $scope.dynamicPopover = [];
  $scope.dynamicPopover.templateUrl = "supplierpopup.html";
  $scope.grn.against = 'dc';
  $scope.temp_storage = {};
  let master = {};
  $scope.grn.items = {};

  window.onbeforeunload = function () {
    return $scope.grn.items && Object.keys($scope.grn.items).length > 0 && !$scope.grn.grn_number ? "If you leave this page you will lose your unsaved changes." : null;
  }
  $scope.$on('$locationChangeStart', function (event) {

    if ($scope.grn.items && Object.keys($scope.grn.items).length > 0 && !$scope.grn.grn_number) {
      var answer = confirm("If you leave this page you will lose your unsaved changes.")
      if (!answer) {
        event.preventDefault();
      }
    }
    // return $scope.dc.items.length > 0 ? "If you leave this page you will lose your unsaved changes." : null;
  });

  $http({
    method: 'GET',
    url: 'api/getdbinfo?infoname=grnseries'
  }).then(function successCallback(response) {
    console.log(response);
    $scope.grn.naming_series = response.data[0].info;
  },
    function errorCallback(response) {
      console.log(response);
    });

  $scope.setsupplier = function () {
    if ($scope.grn.supplier_id && $scope.grn.supplier_id != $scope.dynamicPopover.supplier_details.id) {
      $scope.temp_storage.dcnumbers = null;
    }
    $scope.grn.supplier_id = $scope.dynamicPopover.supplier_details.id;
    $scope.grn.supplier_name = $scope.dynamicPopover.supplier_details.name;
    $scope.grn.supplier_address1 = $scope.dynamicPopover.supplier_details.address1;
    $scope.grn.supplier_address2 = $scope.dynamicPopover.supplier_details.address2;
    $scope.grn.supplier_city = $scope.dynamicPopover.supplier_details.city;
    $scope.grn.supplier_state = $scope.dynamicPopover.supplier_details.state;
    $scope.grn.supplier_pincode = $scope.dynamicPopover.supplier_details.pincode;
    $scope.grn.supplier_gstin = $scope.dynamicPopover.supplier_details.gstin;
    $scope.grn.supplier_phone1 = $scope.dynamicPopover.supplier_details.phone1;
    $scope.grn.supplier_phone2 = $scope.dynamicPopover.supplier_details.phone2;
    $scope.grn.supplier_email = $scope.dynamicPopover.supplier_details.email;
    $scope.popoverIsOpen = false;
    callDCListAPI(Number.MAX_SAFE_INTEGER, '&status=active&idsupplier=' + $scope.grn.supplier_id)
  };

  $scope.focussuppliername = function (event1) {
    if (event1 != null) {
      event1.preventDefault()
    }
    if ($scope.grn.supplier_id != null) {
      return;
    }
    $scope.popoverIsOpen = true;
    $scope.focussupplierbox();
  };

  $scope.focussupplierbox = function () {
    setTimeout(function () { document.getElementById("supplierbox").focus(); document.getElementById("supplierbox").select(); }, 100);
  };

  $scope.showaddress = function () {
    if ($scope.grn.supplier_id === null)
      return false;
    else
      return true;
  };




  $http({
    method: 'GET',
    url: '/api/supplier?allfeilds=0'
  }).then(function successCallback(response) {
    $scope.supplierlist = response.data;
    console.log(response);
    fetchMaster();
  },
    function errorCallback(response) {
      console.log(response);
    });

  let callDCListAPI = function (limit, filterString) {
    $http({
      method: 'GET',
      url: '/api/dc?limit=' + limit + filterString
    }).then(function successCallback(response) {
      console.log(response);
      $scope.dclist = [].concat(response.data);
      $scope.dclist.forEach(value => { value.dc_no = value.naming_series + Array(value.dc_no_length - String(value.dc_number).length + 1).join('0') + value.dc_number; })
      console.log($scope.dclist);
    },
      function errorCallback(response) {
        console.log(response);
      });
  }

  let fetchMaster = () => {

    $http({
      method: 'GET',
      url: '/api/lot?status=active'
    }).then(function successCallback(response) {
      master.lotlist = response.data;
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
      master.colourlist = response.data;
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

    $http({
      method: 'GET',
      url: '/api/item?itemstatus=active'
    }).then(function successCallback(response) {
      console.log(response);
      master.itemlist = [];
      $scope.sizerangelist = response.data.sizerange;
      $scope.sizetypelist = response.data.sizetype;
      angular.forEach(response.data.items, function (value, key) {
        var temp = { naming_series: value.naming_series, fullname: value.naming_series.concat(' ', value.name), name: value.name, id: value.id, sizerange: value.sizerange };
        this.push(temp);
      }, master.itemlist);
    }, function errorCallback(response) {
      console.log(response);
    });


  }

  $scope.updateMaster = (tag, action) => {
    $scope.lotlist = [];
    $scope.colourlist = [];
    $scope.itemlist = [];
    let dcnumberlist = [];

    if (!$scope.temp_storage.dcnumbers) {
      $scope.cur_item_type = tag.grn_dept_type;
    }
    else if ($scope.temp_storage.dcnumbers.length == 0 && action == 'add') {
      $scope.cur_item_type = tag.grn_dept_type;
    }
    else {
      $scope.cur_item_type = $scope.temp_storage.dcnumbers[0].grn_dept_type;
    }

    if ($scope.temp_storage.dcnumbers && $scope.temp_storage.dcnumbers.length > 0) {
      $scope.temp_storage.dcnumbers.map(dc => {
        dcnumberlist.push(dc);
      })
    }
    if (action == 'add') {
      dcnumberlist.push(tag);
    }
    // else if (action == 'remove'){
    //   console.log('dcnumberlist 1: ',dcnumberlist)
    //   dcnumberlist.splice(arrayObjectIndexOf(dcnumberlist,tag.iddc,'iddc'),1);
    //   console.log('dcnumberlist 2: ',dcnumberlist)
    // }

    console.log('dcnumberlist: ', dcnumberlist)
    dcnumberlist.forEach(dc => {
      if (dc.lotlist) {
        console.log('dc.lotlist.split: ', dc.lotlist.split(','));
        dc.lotlist.split(',').forEach(lot => {
          if ($scope.lotlist.length == 0 || arrayObjectIndexOf($scope.lotlist, lot, 'name', true) == -1) {
            $scope.lotlist.push(master.lotlist[arrayObjectIndexOf(master.lotlist, lot, 'name', true)]);
          }
        });
      }
      if (dc.colourlist) {
        console.log('dc.colourlist.split: ', dc.colourlist.split(','), '---', $scope.colourlist);
        dc.colourlist.split(',').forEach(colour => {
          if ($scope.colourlist.length == 0 || arrayObjectIndexOf($scope.colourlist, colour, 'name', true) == -1) {
            $scope.colourlist.push(master.colourlist[arrayObjectIndexOf(master.colourlist, colour, 'name', true)]);
          }
        });
      }
      if (dc.iditemlist) {
        console.log('dc.iditemlist.split: ', dc.iditemlist.split(','), '---', $scope.itemlist, '---', master.itemlist);
        dc.iditemlist.split(',').forEach(iditem => {
          iditem = parseInt(iditem)
          if ($scope.itemlist.length == 0 || arrayObjectIndexOf($scope.itemlist, iditem, 'id') == -1) {
            $scope.itemlist.push(master.itemlist[arrayObjectIndexOf(master.itemlist, iditem, 'id')]);
          }
        });
      }
    });
  }


  $scope.loadalllot = function () {
    $scope.lotlist = master.lotlist;
  }


  $scope.loadallcolour = function () {
    $scope.colourlist = master.colourlist;
  }

  $scope.loadallitem = function () {
    $scope.itemlist = master.itemlist;
  }

  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += key.split(',').reduce((a, b) => a[b], item)
    });
    return parseFloat(total.toFixed(precision));
  }

  $scope.loadDCs = function (query) {
    return $scope.dclist.filter(function (dc) {
      return dc.dc_no.toUpperCase().indexOf(query.toUpperCase()) != -1;
    });
  };

  $scope.setitemsize = function () {
    if (!$scope.temp_storage.newitemdetails) {
      return;
    }


    angular.forEach($scope.sizerangelist, function (value, key) {
      if ($scope.temp_storage.newitemdetails.sizerange == value.idsize) {
        $scope.idsizetype = value.idsizetype;
        $scope.sizerange = value;
      }
    });

    angular.forEach($scope.sizetypelist, function (value, key) {
      if ($scope.idsizetype == value.id) {
        $scope.sizetype = value;
      }
    });
    $scope.idsizerange = $scope.temp_storage.newitemdetails.sizerange;


  };


  var open = function (colour, lot_number, dialist, index) {
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
        lot_number: function () {
          return lot_number;
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
        if (!$scope.grn.items.cloth) $scope.grn.items.cloth = [];
        $scope.grn.items.cloth.push(ret);
        modalInstance.closed.then(function () {
          a = findPos(document.getElementById("c1olour"));
          $('html, body').animate({ scrollTop: a - 400 }, 'slow');
          document.getElementById("c1olour").focus();
        });

      }
      else {
        // $scope.dc.items[ret.index].colour = ret.colour;
        // $scope.cdc.items[ret.index].dialist = ret.dialist;
      }
      $scope.temp_storage.newcolour = null;


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });
  }

  var openitemdetails = function (item, lot_number, partlist, index, sizerange, sizetype, cur_item_type) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/itemdetails.html',
      controller: 'itemdetailsCtrl',
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      // animation:false,
      resolve: {
        item: function () {
          return item;
        },
        lot_number: function () {
          return lot_number;
        },
        partlist: function () {
          return partlist;
        },
        index: function () {
          return index;
        },
        sizerange: function () {
          return sizerange;
        },
        sizetype: function () {
          return sizetype;
        },
        colourlist: function () {
          return $scope.colourlist;
        },
        master_colourlist: () => master.colourlist,
        cur_dept_type: () => cur_item_type
      }
    });

    modalInstance.result.then(function (ret) {
      console.log('received partlist: ', ret.partlist, 'received item:  ', ret.item);

      if (ret.index == -1) {
        delete ret.index;
        if (ret.cur_dept_type == 'piece') {
          if (!$scope.grn.items.piece) $scope.grn.items.piece = [];
          $scope.grn.items.piece.push(ret);
        }
        if (ret.cur_dept_type == 'packed') {
          if (!$scope.grn.items.packed) $scope.grn.items.packed = [];
          $scope.grn.items.packed.push(ret);
        }
        modalInstance.closed.then(function () {
          a = findPos(document.getElementById("itembox"));
          $('html, body').animate({ scrollTop: a - 400 }, 'slow');
          document.getElementById("itembox").focus();
        });

      }
      else {
        // $scope.dc.items[ret.index].item = ret.item;
        // $scope.cdc.items[ret.index].dialist = ret.dialist;
      }
      $scope.temp_storage.newitemdetails = null;


    }, function (ret) {
      console.log('Modal dismissed at: ' + new Date(), ret);
    });
  }


  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.grand_total_weight_partlist = arr => arr.reduce((a, b) => a + $scope.total(b.partlist, 'wsize1', 3) +
    $scope.total(b.partlist, 'wsize2', 3) +
    $scope.total(b.partlist, 'wsize3', 3) +
    $scope.total(b.partlist, 'wsize4', 3) +
    $scope.total(b.partlist, 'wsize5', 3) +
    $scope.total(b.partlist, 'wsize6', 3) +
    $scope.total(b.partlist, 'wsize7', 3) +
    $scope.total(b.partlist, 'wsize8', 3) +
    $scope.total(b.partlist, 'wsize9', 3) +
    $scope.total(b.partlist, 'wsize10', 3), 0)


  $scope.addClothItem = function (colour, lot_number) {
    if(!colour){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Colour... '
      });
      return;
    }
    if(!lot_number){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Lot Number... '
      });
      return;
    }
    open(colour, lot_number, [], -1);
  }

  $scope.removeClothItem = function (index) {
    $scope.grn.items.cloth.splice(index, 1);
    if ($scope.grn.items.cloth.length == 0) {
      delete $scope.grn.items.cloth;
    }
    ngToast.create({
      className: 'danger',
      content: 'Colour deleted... '//undo
    });
  }

  $scope.editClothItem = function (item, index) {
    open(item.colour, item.lot_number, item.dialist, index);
  }


  $scope.addItem = function (item, lot_number, sizerange, sizetype, cur_item_type) {
    if(!item){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Item name... '
      });
      return;
    }
    if(!lot_number){
      ngToast.create({
        className: 'warning',
        content: 'Please select valid Lot Number... '
      });
      return;
    }
    openitemdetails(item, lot_number, [], -1, sizerange, sizetype, cur_item_type);
  }

  $scope.removeItem = function (index, cur_item_type) {
    $scope.grn.items[cur_item_type].splice(index, 1);
    if ($scope.grn.items[cur_item_type].length == 0) {
      delete $scope.grn.items[cur_item_type];
    }
    ngToast.create({
      className: 'danger',
      content: 'Item deleted... '//undo
    });
  }

  $scope.editItem = function (item, index, cur_item_type) {
    openitemdetails(item.item, item.lot_number, item.partlist, index, item.sizerange, item.sizetype, cur_item_type);
  }

  var opengrnmodal = function (grn) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './html/grnmodal.html',
      controller: 'grnmodalCtrl',
      size: 'xl',
      windowTopClass: 'hidden-print',
      resolve: {
        grn: function () {
          return grn;
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
        $scope.cleargrn();
      }


    });
  }

  $scope.cleargrn = () => {
    $route.reload();
  }

  $scope.savegrn = () => {

    if ($scope.grn.supplier_id === null) {
      ngToast.create({
        className: 'warning',
        content: 'Please select Supplier... '
      });
      return;
    }

    if ($scope.grn.against == 'dc') {
      if(!$scope.temp_storage.dcnumbers || $scope.temp_storage.dcnumbers.length == 0){
        ngToast.create({
          className: 'warning',
          content: 'Please select DC... '
        });
        return;
      }
      else{
        $scope.grn.dclist = "";
        $scope.grn.dc_numbers = [];
        $scope.temp_storage.dcnumbers.forEach(dc =>{
          $scope.grn.dclist += dc.dc_no + ", ";
          $scope.grn.dc_numbers.push(dc.iddc);
        }
        );
        $scope.grn.dclist = $scope.grn.dclist.substring(0,$scope.grn.dclist.length-2);
      }
    }

    if (!$scope.grn.items.piece && !$scope.grn.items.cloth && !$scope.grn.items.packed) {
      ngToast.create({
        className: 'warning',
        content: 'Nothing to Deliver?... '
      });
      return;
    }

    $scope.grn.grn_item_type = Object.keys($scope.grn.items).join(', ');
    if($scope.grn.against != 'dc'){
      $scope.grn.supplier_dc_no = null;
    }

    opengrnmodal($scope.grn);
  }

}]);

app.controller('viewgrnCtrl', ['$scope', '$http', 'ngToast', '$uibModal', 'hotkeys', '$resource', function viewgrnCtrl($scope, $http, ngToast, $uibModal, hotkeys, $resource) {
  $scope.tabselect4();
  $scope.displayedCollection = [];
  $scope.rowCollection = [];
  $scope.filter = {};
  $scope.addFilter = false;

  $scope.initialState = function () {
    $scope.loadAll = false;
    $scope.itemsByPage = 75;
    $scope.showpagination = false;
  }
  $scope.initialState();

  $scope.hidelist = false;
  $scope.isCollapsed = true;
  $scope.filterString = '';

  $scope.refresh = function () {
    $scope.initialState();
    callListAPI($scope.itemsByPage, $scope.filterString)
  }

  $scope.addFilters = function () {
    if ($scope.addFilter == false) {
      $scope.addFilter = true;
      downloadFilterList();
    }
    $scope.isCollapsed = !$scope.isCollapsed;
  }

  $scope.applyFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function (key) {
      if ($scope.filter[key] != null)
        $scope.filterString += '&' + key + '=' + $scope.filter[key];
    });
    $scope.initialState();
    callListAPI($scope.itemsByPage, $scope.filterString);
  }

  $scope.clearFilters = function () {
    $scope.filterString = '';
    Object.keys($scope.filter).map(function (key) {
      $scope.filter[key] = null;
    });
    $scope.filter_supplier = null;
    $scope.filter_item = null;
    $scope.after_grn_date = null;
    $scope.before_grn_date = null;
    $scope.initialState();
    callListAPI($scope.itemsByPage, $scope.filterString);
  }

  $scope.loadAllItems = function () {
    $scope.loadAll = true;
    callListAPI(Number.MAX_SAFE_INTEGER, $scope.filterString)
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
    $scope.filter.after_grn_date = $scope.after_grn_date.yyyymmdd();

  }

  $scope.setbeforedate = function () {
    $scope.filter.before_grn_date = $scope.before_grn_date.yyyymmdd();

  }

  $scope.getters = {
    grn_number: function (value) {
      //this will sort by the length of the first name string
      return value.naming_series + Array(value.grn_no_length - String(value.grn_number).length + 1).join('0') + value.grn_number;
    }
  }

  let downloadFilterList = function () {
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
        var temp = { naming_series: value.naming_series, fullname: value.naming_series.concat(' ', value.name), name: value.name, id: value.id, sizerange: value.sizerange };
        this.push(temp);
      }, $scope.itemlist);
    }, function errorCallback(response) {
      console.log(response);
    });

  }


  let callListAPI = function (limit, filterString) {
    $http({
      method: 'GET',
      url: '/api/grn?limit=' + limit + filterString
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

  single_grn_loading = false;
  $scope.open = function (item) {

    if (single_grn_loading) {
      ngToast.create({
        className: 'warning',
        content: 'Please wait loading... '
      });
      return;
    }
    single_grn_loading = true;
    $http({
      method: 'GET',
      url: '/api/grn?id=' + item.idgrn
    }).then(function successCallback(response) {
      console.log(response);
      $scope.grn = response.data[0];
      if ($scope.grn.items.piece && $scope.grn.items.piece.length > 0) {
        temp_items = {}
        $scope.grn.items.piece.forEach(element => {
          if (!temp_items[element.part_index]) {
            temp_items[element.part_index] = {}
            temp_items[element.part_index].lot_number = element.lot_number;
            temp_items[element.part_index].item = { name: element.itemname, id: element.iditem, naming_series: element.item_naming_series, };
            angular.forEach($scope.grn.sizerange, function (value, key) {
              if (element.sizerange == value.idsize) {
                $scope.idsizetype = value.idsizetype;
                temp_items[element.part_index].sizerange = value;
              }
            });

            angular.forEach($scope.grn.sizetype, function (value, key) {
              if ($scope.idsizetype == value.id) {
                temp_items[element.part_index].sizetype = value;
              }
            });

            temp_items[element.part_index].lot_number = element.lot_number;
            temp_items[element.part_index].partlist = [];
          }
          temp_items[element.part_index].partlist.push({
            part: element.part, colour: element.colour, comment: element.comment,
            size1: element.size1,
            size2: element.size2,
            size3: element.size3,
            size4: element.size4,
            size5: element.size5,
            size6: element.size6,
            size7: element.size7,
            size8: element.size8,
            size9: element.size9,
            size10: element.size10,
            wsize1: element.wsize1,
            wsize2: element.wsize2,
            wsize3: element.wsize3,
            wsize4: element.wsize4,
            wsize5: element.wsize5,
            wsize6: element.wsize6,
            wsize7: element.wsize7,
            wsize8: element.wsize8,
            wsize9: element.wsize9,
            wsize10: element.wsize10
          });

        });
        grn_part_index_list = Object.keys(temp_items).sort();
        $scope.grn.items.piece = [];
        grn_part_index_list.forEach(x => {
          $scope.grn.items.piece.push(temp_items[x]);
        });
        console.log('grn.items.piece: ', $scope.grn.items.piece)
      }
      if ($scope.grn.items.cloth && $scope.grn.items.cloth.length > 0) {
        temp_items = {}
        $scope.grn.items.cloth.forEach(element => {
          if (!temp_items[element.colour_index]) {
            temp_items[element.colour_index] = {}
            temp_items[element.colour_index].colour = element.colour;
            temp_items[element.colour_index].lot_number = element.lot_number;
            temp_items[element.colour_index].dialist = [];
          }
          temp_items[element.colour_index].dialist.push({ dia: element.dia, roll: element.roll, weight: element.weight, comment: element.comment });
        });
        grn_colour_index_list = Object.keys(temp_items).sort();
        $scope.grn.items.cloth = [];
        grn_colour_index_list.forEach(x => {
          $scope.grn.items.cloth.push(temp_items[x]);
        });
      }
      if ($scope.grn.items.packed && $scope.grn.items.packed.length > 0) {
        temp_items = {}
        $scope.grn.items.packed.forEach(element => {
          if (!temp_items[element.part_index]) {
            temp_items[element.part_index] = {}
            temp_items[element.part_index].lot_number = element.lot_number;
            temp_items[element.part_index].item = { name: element.itemname, id: element.iditem, naming_series: element.item_naming_series, };
            angular.forEach($scope.grn.sizerange, function (value, key) {
              if (element.sizerange == value.idsize) {
                $scope.idsizetype = value.idsizetype;
                temp_items[element.part_index].sizerange = value;
              }
            });

            angular.forEach($scope.grn.sizetype, function (value, key) {
              if ($scope.idsizetype == value.id) {
                temp_items[element.part_index].sizetype = value;
              }
            });

            temp_items[element.part_index].lot_number = element.lot_number;
            temp_items[element.part_index].partlist = [];
          }
          temp_items[element.part_index].partlist.push({
            part: element.part, colour: element.colour, comment: element.comment,
            size1: element.size1,
            size2: element.size2,
            size3: element.size3,
            size4: element.size4,
            size5: element.size5,
            size6: element.size6,
            size7: element.size7,
            size8: element.size8,
            size9: element.size9,
            size10: element.size10
          });

        });
        grn_part_index_list = Object.keys(temp_items).sort();
        $scope.grn.items.packed = [];
        grn_part_index_list.forEach(x => {
          $scope.grn.items.packed.push(temp_items[x]);
        });
        console.log('grn.items.packed: ', $scope.grn.items.packed)
      }
      $scope.hidelist = true;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: './html/grnmodal.html',
        controller: 'grnmodalCtrl',
        size: 'xl',
        windowTopClass: 'hidden-print',
        resolve: {
          grn: function () {
            return $scope.grn;
          }
        }
      });

      modalInstance.result.then(function (generated) {

      }, function (ret) {

        console.log('Modal dismissed at: ' + new Date(), ret);

      });

      $scope.$on("modalClosing", function (event, ret) {
        console.log('inside modalClosing event', ret);

        $scope.grn = {};
        single_grn_loading = false;
        $scope.hidelist = false;

      });



    },
      function errorCallback(response) {
        console.log(response);
        var er = 'Single grn fetch ERROR !!! ' + response.statusText + '  :' + response.status + '... try again...'
        ngToast.create({
          className: 'danger',
          content: er
        });
        single_grn_loading = false;
      });


  }

  $scope.total = function (collection, key, precision) {
    var total = 0;
    collection.map(function (item) {
      total += item[key];
    });
    return parseFloat(total.toFixed(precision));
  }
  $scope.grand_total_weight = arr => arr.reduce((a, b) => a + $scope.total(b.dialist, 'weight', 3), 0)

  $scope.grand_total_weight_partlist = arr => arr.reduce((a, b) => a + $scope.total(b.partlist, 'wsize1', 3) +
    $scope.total(b.partlist, 'wsize2', 3) +
    $scope.total(b.partlist, 'wsize3', 3) +
    $scope.total(b.partlist, 'wsize4', 3) +
    $scope.total(b.partlist, 'wsize5', 3) +
    $scope.total(b.partlist, 'wsize6', 3) +
    $scope.total(b.partlist, 'wsize7', 3) +
    $scope.total(b.partlist, 'wsize8', 3) +
    $scope.total(b.partlist, 'wsize9', 3) +
    $scope.total(b.partlist, 'wsize10', 3), 0)


  // datepicker stuff - to be decoded later

  $scope.clear = function () {
    $scope.filter.grn_date = null;
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
    $scope.grn.grn_date = new Date(year, month, day);
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
    when('/managemaster', {
      templateUrl: './html/managemaster.html',
      controller: 'managemasterCtrl'
    }).
    when('/newdc', {
      templateUrl: './html/newdc.html',
      controller: 'newdcCtrl'
    }).
    when('/viewdc', {
      templateUrl: './html/viewdc.html',
      controller: 'viewdcCtrl'
    }).
    when('/newgrn', {
      templateUrl: './html/newgrn.html',
      controller: 'newgrnCtrl'
    }).
    when('/viewgrn', {
      templateUrl: './html/viewgrn.html',
      controller: 'viewgrnCtrl'
    }).
    otherwise({
      redirectTo: '/newdc'
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

function arrayObjectIndexOf(myArray, searchTerm, property, trim = false) {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (trim) {
      if (myArray[i][property].trim() === searchTerm.trim()) return i;
    }
    else {
      if (myArray[i][property] === searchTerm) return i;
    }
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

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('');
};
