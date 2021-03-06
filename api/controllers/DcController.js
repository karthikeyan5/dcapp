/**
 * DcController
 *
 * @description :: Server-side logic for managing dcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var dateFormat = require('dateformat');
var Promise = require('bluebird');
var request = require('request');
request = request.defaults({ jar: true })
var dcQueryAsync = {};
sails.on('lifted', function () {
    dcQueryAsync = Promise.promisify(Dc.query);   // Your post-lift startup code here
});

module.exports = {

    getdbinfo: function (req, res) {
        //console.log(req.allParams());
        let q = 'SELECT * FROM dbinfo where 1 = 1'
        let d = []
        if (req.param("infoname") != undefined) {
            q = q.concat(' and infoname = ?;')
            d.push(req.param("infoname"))
        }
        else if (req.param("id") != undefined && !isNaN(parseInt(req.param("id")))) {
            q = q.concat(' and infoid = ?;')
            d.push(parseInt(req.param("id")))
        }
        else {
            q = 'SELECT * FROM dbinfo;'
        }
        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
  },
  getuserlocation: function (req, res) {
    let q = "SELECT * FROM dbinfo where infoname = 'user_location_"+req.user.id+"'";
    let d = [];
    Dc.query(q, d, function (err, results) {
      if (err) return res.serverError(err);
      return res.ok(results);
    });
  },
    supplier: function (req, res) {
        // ----
        // ---- param are - allfeilds,department(comma seperated ids for multiple), id
        // ----

        // console.log('all', req.allParams());
        // console.log('a:', req.param('a'), '---b:', req.param('b'), '---c:', req.param('c'))
        let q = ""
        let d = []
        let q_where = ""
        if (req.param('allfeilds') == '1') {
            q = "SELECT supplier.id,name,address1, address2, city, state, pincode, phone1, phone2, gstin, email, otherdetails, deptlist.dept as departments_list,supplier.blame_user, supplier.modified_time ";
        }
        else {
            q = "SELECT supplier.id,name,city,state,pincode,gstin, deptlist.dept as departments_list, supplier.modified_time  ";
        }
        q_from = " FROM supplier LEFT JOIN \
            (SELECT a.id,concat_ws('','',group_concat(a.dname SEPARATOR ','),'') as dept FROM (SELECT supplier.id,department.name as dname FROM supplier,department,supplierdepartment WHERE \
              supplier.id = supplierdepartment.idsup AND department.id = supplierdepartment.iddept) as a GROUP BY a.id) \
              as deptlist on (deptlist.id = supplier.id )";
        if (req.param('department') != undefined) {
            q_from = q_from.concat("JOIN (SELECT supplier.id FROM supplier,supplierdepartment WHERE supplierdepartment.idsup = supplier.id AND supplierdepartment.iddept in (?) GROUP BY supplier.id) as supplierdepartment on (supplier.id = supplierdepartment.id ) ");
            dept_arr = [];
            req.param('department').split(",").map(function (item) {
                dept_arr.push(parseInt(item))
            });
            d.push(dept_arr);
        }
        if (req.param('id') != undefined) {
            q_where = " WHERE supplier.id = ? ";
            d.push(req.param('id'));
        }
        q = q.concat(q_from, q_where, ' order by supplier.modified_time desc;');

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    savesupplier: function (req, res) {
        // res.set('Content-Type', 'application/json');
        Dc.query("INSERT into supplier (name, address1, address2, city, state, pincode, phone1, phone2, gstin, email, otherdetails, blame_user) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", [req.body.name, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.pincode, req.body.phone1, req.body.phone2, req.body.gstin, req.body.email, req.body.otherdetails, req.user.email], function (err, results) {
            if (err) return res.serverError(err);
            else {
                let temp = {}
                let flag = 0;
                temp.main_results = results;
                temp.insertId = results.insertId;
                if (req.body.departments && req.body.departments.length > 0) {
                    let d = [];
                    let q = "INSERT INTO supplierdepartment (iddept, idsup, blame_user) VALUES ";
                    req.body.departments.map(function (dept) {
                        if (flag == 1) {
                            q = q.concat(",");
                        }
                        q = q.concat("(?", ",", temp.insertId, ",\"", req.user.email, "\")");
                        d.push(dept);
                        flag = 1;
                    });
                    q = q.concat(";");
                    Dc.query(q, d, function (err, results) {
                        if (err) return res.serverError(err);
                        else {
                            temp.departments_results = results;
                            return res.ok(temp);
                        }
                    });

                }
                else {
                    return res.ok(temp);
                }
            }
        });
    },
    updatesupplier: function (req, res) {


        let flag = 0;
        let q = "UPDATE supplier "
        let d = []
        let column_list = ["name", "address1", "address2", "city", "state", "pincode", "phone1", "phone2", "gstin", "email", "otherdetails"];
        column_list.map(function (column) {
            if (req.body[column] != undefined) {
                if (flag == 0) { q = q.concat("SET "); flag = 1; }
                else { q = q.concat(","); }
                q = q.concat(column, " = ? ");
                d.push(req.body[column]);
            }
        });

        // blame_user and final touches
        if (flag == 0) {
            q = q.concat("SET ");
            flag = 1;
        }
        else {
            q = q.concat(",");
        }
        q = q.concat("blame_user = ?, modified_time = now() WHERE id = ?;");
        d.push(req.user.email)
        d.push(req.param("id"))
        // console.log(q,d);

        Dc.query(q, d, function (err, results) {
            let q1, q2, d1, d2;
            if (err) return res.serverError(err);
            else {
                let temp = {};
                temp.main_results = results;
                if (req.body.departments) {
                    Dc.query("SELECT supplier.id, group_concat(supplierdepartment.iddept SEPARATOR ',') AS dept FROM supplier, department, supplierdepartment WHERE supplier.id = supplierdepartment.idsup AND department.id = supplierdepartment.iddept AND supplier.id = ? GROUP BY supplier.id;", [req.param("id")], function (err, results) {
                        if (err) return res.serverError(err);
                        else {
                            insert_list = [];
                            del_list = [];
                            if (results.length == 1) {
                                temp_del_list = results[0]['dept'].split(",");
                                temp_del_list.map(function (item) {
                                    del_list.push(parseInt(item));
                                });
                                // console.log("del_list: ",del_list );
                            }
                            else {
                                del_list = [];
                            }
                            req.body.departments.map(function (dept) {
                                pos = del_list.indexOf(dept);
                                if (pos == -1) {
                                    insert_list.push(dept);
                                }
                                else {
                                    del_list.splice(pos, 1);
                                }
                            });
                            // console.log("del_list: ",del_list,"--insert_list: ",insert_list);
                            if (insert_list.length < 1) {
                                q1 = "Select 'No inserts';";
                                d1 = [];
                            }
                            else {
                                flag = 0
                                d1 = [];
                                q1 = "INSERT INTO supplierdepartment (iddept, idsup, blame_user) VALUES ";
                                insert_list.map(function (dept) {
                                    if (flag == 1) {
                                        q1 = q1.concat(",");
                                    }
                                    q1 = q1.concat("(?", ",", req.param("id"), ",\"", req.user.email, "\")");
                                    d1.push(dept);
                                    flag = 1;
                                });
                                q = q.concat(";");
                            }
                            if (del_list.length < 1) {
                                q2 = "Select 'No Deletes';";
                                d2 = [];
                            }
                            else {
                                flag = 0
                                d2 = [req.param("id"), del_list];
                                q2 = "DELETE FROM  supplierdepartment WHERE id IN (SELECT * from (SELECT id FROM supplierdepartment WHERE idsup = ? AND iddept in (?)) as a);";
                            }
                            Dc.query(q1, d1, function (err, results) {
                                if (err) return res.serverError(err);
                                else {
                                    temp.dept_inserts = results;
                                    Dc.query(q2, d2, function (err, results) {
                                        if (err) return res.serverError(err);
                                        else {
                                            temp.dept_delete = results;
                                            return res.ok(temp);
                                        }
                                    });
                                }
                            });

                        }
                    });
                }
                else {
                    return res.ok(temp);
                }
            }
        });
    },
    department: function (req, res) {
        let q = 'SELECT id,name,dept_type,grn_dept_type FROM department WHERE 1 = 1';
        let d = [];

        if (req.param("dept_type") != undefined) {
            q = q.concat(" AND dept_type = ? ");
            dept_type = isNaN(parseInt(req.param("dept_type"))) ? req.param("dept_type") : parseInt(req.param("dept_type"));
            d.push(dept_type);
        }
        if (req.param("grn_dept_type") != undefined) {
            q = q.concat(" AND grn_dept_type = ? ");
            grn_dept_type = isNaN(parseInt(req.param("grn_dept_type"))) ? req.param("grn_dept_type") : parseInt(req.param("grn_dept_type"));
            d.push(grn_dept_type);
        }

        q = q.concat(";");

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    stateslist: function (req, res) {
        Dc.query("SELECT distinct state FROM  supplier;", function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    statecities: function (req, res) {
        Dc.query("SELECT distinct city from  supplier where state = ? order by city;", [req.param("state")], function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    item: function (req, res) {
        // params: id(comma seperated multiple ids) ,naming_series(comma seperated multiple naming_series) , uid, status('active','inactive')
        let q = 'SELECT * from iteminfo WHERE 1=1 ';
        let d = [];
        let q_where = '';

        let param_equal_list = ["uid"];
        param_equal_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q_where = q_where.concat(" AND iteminfo.", param, " = ? ");
                d.push(req.param(param));
            }
        });

        let comma_seperated_in_list = ["id","naming_series"];
        comma_seperated_in_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q_where = q_where.concat(" AND iteminfo.", param, " in (?) ");
                d.push(req.param(param).split(','));
            }
        });

        if (req.param('itemstatus') == 'active' || req.param('itemstatus') == 'inactive') {
            q_where = q_where.concat(" AND iteminfo.status = ? ");
            d.push(req.param('itemstatus'));
        }
        q = q.concat(q_where);
        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                let temp = {}
                temp.items = results;
                Dc.query('SELECT sizerange.* FROM sizerange,(SELECT DISTINCT sizerange FROM iteminfo WHERE 1 = 1 ' + q_where + ') as iteminfo WHERE sizerange.idsize = iteminfo.sizerange;', d, function (err, results) {
                    if (err) return res.serverError(err);
                    else {
                        temp.sizerange = results;
                        Dc.query('SELECT sizetype.* FROM sizetype,(SELECT DISTINCT idsizetype FROM iteminfo,sizerange WHERE sizerange.idsize = iteminfo.sizerange ' + q_where + ') as sizerange WHERE sizerange.idsizetype = sizetype.id;', d, function (err, results) {
                            if (err) return res.serverError(err);
                            else {
                                temp.sizetype = results;
                                return res.ok(temp);
                            }
                        })
                    }
                });
            }
        });
    },
    savecolour: function (req, res) {
        Dc.query("INSERT into master_colour (name, `desc`, blame_user) VALUES (?,?,?);", [req.body.name, req.body.desc, req.user.email], function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    updatecolour: function (req, res) {


        let flag = 0;
        let q = "UPDATE master_colour "
        let d = []
        let column_list = ["name", "desc", "status"];
        column_list.map(function (column) {
            if (req.body[column] != undefined) {
                if (flag == 0) { q = q.concat("SET "); flag = 1; }
                else { q = q.concat(","); }
                q = q.concat(column, " = ? ");
                d.push(req.body[column]);
            }
        });

        // blame_user and final touches
        if (flag == 0) {
            q = q.concat("SET ");
            flag = 1;
        }
        else {
            q = q.concat(",");
        }
        q = q.concat("blame_user = ?, modified_time = now() WHERE id = ?;");
        d.push(req.user.email)
        d.push(req.param("id"))
        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    colour: function (req, res) {
        let q = '';
        let d = [];

        if (req.param('allfeilds') == '1') {
            q = "SELECT * FROM master_colour where 1 = 1 ";
        }
        else {
            q = "SELECT name FROM master_colour where 1 = 1 ";
        }

        let param_equal_list = ["id", "status"];
        param_equal_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND ", param, " = ? ");
                d.push(req.param(param));
            }
        });

        let param_like_list = ["name", "desc"];
        param_like_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND ", param, " LIKE ? ");
                d.push("%" + req.param(param) + "%");
            }
        });

        q = q.concat(";");

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    savelot: function (req, res) {
        Dc.query("INSERT into master_lot (name, `desc`, blame_user) VALUES (?,?,?);", [req.body.name, req.body.desc, req.user.email], function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    updatelot: function (req, res) {


        let flag = 0;
        let q = "UPDATE master_lot "
        let d = []
        let column_list = ["name", "desc", "status"];
        column_list.map(function (column) {
            if (req.body[column] != undefined) {
                if (flag == 0) { q = q.concat("SET "); flag = 1; }
                else { q = q.concat(","); }
                q = q.concat(column, " = ? ");
                d.push(req.body[column]);
            }
        });

        // blame_user and final touches
        if (flag == 0) {
            q = q.concat("SET ");
            flag = 1;
        }
        else {
            q = q.concat(",");
        }
        q = q.concat("blame_user = ?, modified_time = now() WHERE id = ?;");
        d.push(req.user.email)
        d.push(req.param("id"))
        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    lot: function (req, res) {
        let q = '';
        let d = [];

        if (req.param('allfeilds') == '1') {
            q = "SELECT * FROM master_lot where 1 = 1 ";
        }
        else {
            q = "SELECT name FROM master_lot where 1 = 1 ";
        }

        let param_equal_list = ["id", "status"];
        param_equal_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND ", param, " = ? ");
                d.push(req.param(param));
            }
        });

        let param_like_list = ["name", "desc"];
        param_like_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND ", param, " LIKE ? ");
                d.push("%" + req.param(param) + "%");
            }
        });

        q = q.concat(";");

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    savedc: function (req, res) {
        let today = new Date;
        let q = "INSERT INTO dc (idsupplier, naming_series, department, dc_date, rateperkg, additionalvalue, vehicle_number, locationId, comment, blame_user) \
                        VALUES (?,?,?,?,?,?,?,?,?,?);";
        let d = [req.body.supplier_id, req.body.naming_series, req.body.department, dateFormat(today, 'yyyy-mm-dd'), req.body.rateperkg, req.body.additionalvalue, req.body.vehicle_number, req.body.location, req.body.comment, req.user.email];
        let temp = {}

        let get_dc_number = (return_ref, iddc) => new Promise((resolve, reject) => {
            Dc.query("SELECT dc.naming_series,dc.dc_number,series.length, now() as server_time FROM dc,series WHERE dc.naming_series = series.name AND dc.id = ?", [iddc], function (err, results) {
                if (err) return reject(err);
                else {
                    return_ref.dc = results[0];
                    return_ref.dc.current_user = req.user.email + '.';
                    resolve();
                }
            });
        });

        let cdc_insert = (return_ref, iddc, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO cdcitems (iddc, lot_number, colour, colour_index, dia, roll, weight, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.dialist.forEach(dialist => {
                    if (flag == 1) q1 = q1.concat(", ");
                    q1 = q1.concat("(?,?,?,?,?,?,?,?,?)");
                    flag = 1;
                    d1.push(iddc, element.lot_number, dialist.colour, index, dialist.dia, dialist.roll, dialist.weight, dialist.comment, req.user.email);
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) return reject(err);
                else {
                    return_ref.cdcitems_insert = results;
                    resolve();
                }
            });
        });

        let pdc_insert = (return_ref, iddc, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO pdcitems (iddc, colour, lot_number, iditem, part_index, part, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.partlist.forEach(partlist => {
                    if (flag == 1) q1 = q1.concat(", ");
                    q1 = q1.concat("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                    flag = 1;
                    d1.push(iddc, partlist.colour, element.lot_number, element.item.id, index, partlist.part, partlist.size1, partlist.size2, partlist.size3, partlist.size4, partlist.size5, partlist.size6, partlist.size7, partlist.size8, partlist.size9, partlist.size10, partlist.wsize1, partlist.wsize2, partlist.wsize3, partlist.wsize4, partlist.wsize5, partlist.wsize6, partlist.wsize7, partlist.wsize8, partlist.wsize9, partlist.wsize10, partlist.comment, req.user.email);
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.cdcitems_insert = results;
                    resolve();
                }
            });


        });

        let pcdc_insert = (return_ref, iddc, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO pcdcitems (iddc, colour, lot_number, iditem, part_index, part, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.partlist.forEach(partlist => {
                    if (flag == 1) q1 = q1.concat(", ");
                    q1 = q1.concat("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                    flag = 1;
                    d1.push(iddc, partlist.colour, element.lot_number, element.item.id, index, partlist.part, partlist.size1, partlist.size2, partlist.size3, partlist.size4, partlist.size5, partlist.size6, partlist.size7, partlist.size8, partlist.size9, partlist.size10, partlist.comment, req.user.email);
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.pcdcitems_insert = results;
                    resolve();
                }
            });
        });

        let adc_insert = (return_ref, iddc, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO adcitems (iddc, lot_number, lot_index, iditem, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.accessorylist.forEach(accessorylist => {
                    accessorylist.item.forEach(item => {
                        if (flag == 1) q1 = q1.concat(", ");
                        q1 = q1.concat("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                        flag = 1;
                        d1.push(iddc, element.lot_number, index, item.item.id, item.size1, item.size2, item.size3, item.size4, item.size5, item.size6, item.size7, item.size8, item.size9, item.size10, item.wsize1, item.wsize2, item.wsize3, item.wsize4, item.wsize5, item.wsize6, item.wsize7, item.wsize8, item.wsize9, item.wsize10, item.comment, req.user.email);
                    });
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.adcitems_insert = results;
                    resolve();
                }
            });
        });

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                temp.dc_insert = results;
                temp.iddc = results.insertId;
                let promises_list = []
                promises_list.push(get_dc_number(temp, temp.iddc));
                if (req.body.items.cloth && req.body.items.cloth.length > 0) {
                    promises_list.push(cdc_insert(temp, temp.iddc, req.body.items.cloth));
                }
                if (req.body.items.piece && req.body.items.piece.length > 0) {
                    promises_list.push(pdc_insert(temp, temp.iddc, req.body.items.piece));
                }
                if (req.body.items.packed && req.body.items.packed.length > 0) {
                    promises_list.push(pcdc_insert(temp, temp.iddc, req.body.items.packed));
                }
                if (req.body.items.accessory && req.body.items.accessory.length > 0) {
                    promises_list.push(adc_insert(temp, temp.iddc, req.body.items.accessory));
                }
                Promise.all(promises_list).then((result) => res.ok(temp)).catch((err) => res.serverError(err));
            }
        });
    },
    dc: function (req, res) {
        // ----
        // ---- param are - items(available automaticaly if only one dc is returned) ,id, dc_number, naming_series,
        //-----             idsupplier, iditem(available only for pdc), lot_number, vehicle_number, dept_type, status
        // ----             comment, department, after_dc_date (yyyymmdd), before_dc_date , limit, offset
        // ----

        // ---- Warning: the order by in this query acts differently in higher versions of MySQL. watchout during Upgrade.
        let q =
          "SELECT  \
        dc.id iddc,  \
        dc.naming_series,  \
        items_agg.itemlist,  \
        items_agg.iditemlist,  \
        items_agg.colourlist, \
        sizelist.sizelist, \
        items_agg.dialist, \
        series.length dc_no_length,  \
        dc.dc_number,  \
        dc.department,  \
        department.name department_name,  \
        department.dept_type,  \
        department.grn_dept_type,  \
        dc.dc_date,  \
        items_agg.lotlist,  \
        dc_item_type.dc_item_type, \
        dc.rateperkg,  \
        dc.additionalvalue,  \
        dc.vehicle_number,  \
        dc.comment,  \
        dc.locationId location,  \
        dc.status,  \
        dc.modified_time,  \
        dc.blame_user,  \
        supplier.id supplier_id,  \
        supplier.name supplier_name,  \
        supplier.address1 supplier_address1,  \
        supplier.address2 supplier_address2,  \
        supplier.city supplier_city,  \
        supplier.state supplier_state,  \
        supplier.pincode supplier_pincode,  \
        supplier.phone1 supplier_phone1,  \
        supplier.phone2 supplier_phone2,  \
        supplier.gstin supplier_gstin,  \
        supplier.email supplier_email  \
      FROM (SELECT * FROM dc ORDER BY id DESC) as dc LEFT JOIN supplier ON dc.idsupplier = supplier.id  \
        LEFT JOIN department ON dc.department = department.id  \
        LEFT JOIN series ON dc.naming_series = series.name  \
        LEFT JOIN ( \
            SELECT iddc,GROUP_CONCAT(distinct colour SEPARATOR ', ') colourlist, group_concat(distinct iteminfo.name SEPARATOR ', ') itemlist,  group_concat(distinct iteminfo.id SEPARATOR ', ') iditemlist, group_concat(distinct lot_number SEPARATOR ', ') lotlist, group_concat(distinct part SEPARATOR ', ') partlist, group_concat(distinct dia SEPARATOR ', ') dialist \
            FROM ( \
                select iddc, colour, iditem, part, lot_number, null as dia from pdcitems \
                union all \
                select iddc, null as colour, iditem, null as part, lot_number, null as dia from adcitems \
                union all \
                select iddc, colour, iditem, part, lot_number, null as dia from pcdcitems \
                union all \
                select iddc, colour, null as iditem, null as part, lot_number, dia from cdcitems \
            ) as items \
            LEFT JOIN iteminfo on iteminfo.id = items.iditem group by iddc \
        ) items_agg ON dc.id = items_agg.iddc  \
        LEFT JOIN ( \
        Select iddc, group_concat(distinct sizelist.size_text ORDER BY sizelist.id,sizelist.size separator ', ') sizelist from  \
        (SELECT distinct sizerange.idsizetype, 1 size, iddc FROM (select iddc, iditem, size1, wsize1 from pdcitems union all select iddc, iditem, size1, wsize1 from adcitems union all select iddc, iditem, size1, 0 as wsize1 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size1 > 0 or items.wsize1 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 2 size, iddc FROM (select iddc, iditem, size2, wsize2 from pdcitems union all select iddc, iditem, size2, wsize2 from adcitems union all select iddc, iditem, size2, 0 as wsize2 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size2 > 0 or items.wsize2 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 3 size, iddc FROM (select iddc, iditem, size3, wsize3 from pdcitems union all select iddc, iditem, size3, wsize3 from adcitems union all select iddc, iditem, size3, 0 as wsize3 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size3 > 0 or items.wsize3 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 4 size, iddc FROM (select iddc, iditem, size4, wsize4 from pdcitems union all select iddc, iditem, size4, wsize4 from adcitems union all select iddc, iditem, size4, 0 as wsize4 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size4 > 0 or items.wsize4 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 5 size, iddc FROM (select iddc, iditem, size5, wsize5 from pdcitems union all select iddc, iditem, size5, wsize5 from adcitems union all select iddc, iditem, size5, 0 as wsize5 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size5 > 0 or items.wsize5 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 6 size, iddc FROM (select iddc, iditem, size6, wsize6 from pdcitems union all select iddc, iditem, size6, wsize6 from adcitems union all select iddc, iditem, size6, 0 as wsize6 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size6 > 0 or items.wsize6 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 7 size, iddc FROM (select iddc, iditem, size7, wsize7 from pdcitems union all select iddc, iditem, size7, wsize7 from adcitems union all select iddc, iditem, size7, 0 as wsize7 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size7 > 0 or items.wsize7 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 8 size, iddc FROM (select iddc, iditem, size8, wsize8 from pdcitems union all select iddc, iditem, size8, wsize8 from adcitems union all select iddc, iditem, size8, 0 as wsize8 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size8 > 0 or items.wsize8 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 9 size, iddc FROM (select iddc, iditem, size9, wsize9 from pdcitems union all select iddc, iditem, size9, wsize9 from adcitems union all select iddc, iditem, size9, 0 as wsize9 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size9 > 0 or items.wsize9 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 10 size, iddc FROM (select iddc, iditem, size10, wsize10 from pdcitems union all select iddc, iditem, size10, wsize10 from adcitems union all select iddc, iditem, size10, 0 as wsize10 from pcdcitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size10 > 0 or items.wsize10 > 0)) dc_sizes, \
        (SELECT id,1 size,size1 size_text FROM sizetype \
        UNION ALL \
        SELECT id,2 size,size2 size_text FROM sizetype \
        UNION ALL \
        SELECT id,3 size,size3 size_text FROM sizetype \
        UNION ALL \
        SELECT id,4 size,size4 size_text FROM sizetype \
        UNION ALL \
        SELECT id,5 size,size5 size_text FROM sizetype \
        UNION ALL \
        SELECT id,6 size,size6 size_text FROM sizetype \
        UNION ALL \
        SELECT id,7 size,size7 size_text FROM sizetype \
        UNION ALL \
        SELECT id,8 size,size8 size_text FROM sizetype \
        UNION ALL \
        SELECT id,9 size,size9 size_text FROM sizetype \
        UNION ALL \
        SELECT id,10 size,size10 size_text FROM sizetype) as sizelist where sizelist.id = dc_sizes.idsizetype and sizelist.size = dc_sizes.size group by iddc \
        ) sizelist on sizelist.iddc = dc.id \
        LEFT JOIN ( SELECT iddc, group_concat(item_type SEPARATOR ', ') as dc_item_type FROM \
        (SELECT iddc, 'cloth' as item_type from cdcitems group by iddc \
        UNION ALL \
        SELECT iddc, 'piece' as item_type from pdcitems group by iddc \
        UNION ALL \
        SELECT iddc, 'accessory' as item_type from adcitems group by iddc \
        UNION ALL \
        SELECT iddc, 'packed' as item_type from pcdcitems group by iddc) as dc_type GROUP BY iddc \
        ) as dc_item_type on dc_item_type.iddc = dc.id \
        WHERE 1 = 1";
        let d = []
        let q_where = ""
        let limit = Number.MAX_SAFE_INTEGER;
        let offset = 0;

        if (req.param('limit') && !isNaN(parseInt(req.param('limit')))) limit = parseInt(req.param('limit'));
        if (req.param('offset') && !isNaN(parseInt(req.param('offset')))) offset = parseInt(req.param('offset'));

        let param_equal_list = ["id", "dc_number", "naming_series", "idsupplier", "department", "status"];
        param_equal_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND dc.", param, " = ? ");
                d.push(req.param(param));
            }
        });

        let param_like_list = ["vehicle_number", "comment"];
        param_like_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND dc.", param, " LIKE ? ");
                d.push("%" + req.param(param) + "%");
            }
        });

        if (req.param('dept_type') != undefined) {
            q = q.concat(" AND dept_type = ? ");
            d.push(req.param('dept_type'));
        }

        if (req.param('lot_number') != undefined) {
            q = q.concat(" AND (lotlist LIKE ? OR lotlist LIKE ?)");
            d.push('%' + req.param('lot_number') + ',%');
            d.push('%' + req.param('lot_number'));
        }

        if (req.param('iditem') != undefined) {
            q = q.concat(" AND dc.id = any(select distinct iddc from (select distinct iddc from pcdcitems where pcdcitems.iditem = ? union all select distinct iddc from pdcitems where pdcitems.iditem = ? union all select distinct iddc from adcitems where adcitems.iditem = ? ) as a)");
            d.push(req.param('iditem'),req.param('iditem'),req.param('iditem'));
        }

        if (req.param('after_dc_date') != undefined) {
            q = q.concat(" AND dc.dc_date >= ? ")
            d.push(req.param('after_dc_date'));
        }
        if (req.param('before_dc_date') != undefined) {
            q = q.concat(" AND dc.dc_date <= ? ")
            d.push(req.param('before_dc_date'));
        }

        q = q.concat(' LIMIT ?,?;');
        d.push(offset, limit);

        let get_cdcitems = (return_ref, iddc) => new Promise((resolve, reject) => {
            Dc.query('SELECT colour, lot_number, colour_index, dia, roll, weight, comment FROM cdcitems WHERE iddc = ? ORDER BY id;', [iddc], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.cloth = results;
                    }
                    resolve();
                }
            });
        });

        let get_pdcitems = (return_ref, iddc) => new Promise((resolve, reject) => {
            Dc.query('SELECT colour, lot_number, part, part_index, sizerange, iditem, iteminfo.name as itemname, iteminfo.naming_series as item_naming_series, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment FROM pdcitems,iteminfo WHERE pdcitems.iditem = iteminfo.id and iddc = ? ORDER BY pdcitems.id;', [iddc], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.piece = results;
                    }
                    resolve();
                }
            });
        });

        let get_adcitems = (return_ref, iddc) => new Promise((resolve, reject) => {
            Dc.query('SELECT lot_number, lot_index, sizerange, iditem, iteminfo.name as itemname, iteminfo.naming_series as item_naming_series, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment FROM adcitems,iteminfo WHERE adcitems.iditem = iteminfo.id and iddc = ? ORDER BY adcitems.id;', [iddc], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.accessory = results;
                    }
                    resolve();
                }
            });
        });

        let get_pcdcitems = (return_ref, iddc) => new Promise((resolve, reject) => {
            Dc.query('SELECT colour, lot_number, part, part_index, sizerange, iditem, iteminfo.name as itemname, iteminfo.naming_series as item_naming_series, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, comment FROM pcdcitems,iteminfo WHERE pcdcitems.iditem = iteminfo.id and iddc = ? ORDER BY pcdcitems.id;', [iddc], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.packed = results;
                    }
                    resolve();
                }
            });
        });

        let get_size_details = (return_ref, iddc) => new Promise((resolve, reject) => {
            Dc.query('SELECT DISTINCT sizerange.* FROM sizerange,iteminfo WHERE sizerange.idsize = iteminfo.sizerange AND iteminfo.id = any(select distinct iditem from (select distinct iditem from pcdcitems where pcdcitems.iddc = ? union all select distinct iditem from pdcitems where pdcitems.iddc = ? union all select distinct iditem from adcitems where adcitems.iddc = ? ) as a);', [iddc,iddc,iddc], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].sizerange = results;
                    }
                    Dc.query('SELECT DISTINCT sizetype.* FROM sizetype, sizerange, iteminfo WHERE sizerange.idsizetype = sizetype.id AND sizerange.idsize = iteminfo.sizerange AND iteminfo.id = any(select distinct iditem from (select distinct iditem from pcdcitems where pcdcitems.iddc = ? union all select distinct iditem from pdcitems where pdcitems.iddc = ? union all select distinct iditem from adcitems where adcitems.iddc = ? ) as a);', [iddc,iddc,iddc], function (err, results) {
                        if (err) return reject(err);
                        else {
                            if (results.length > 0) {
                                return_ref[0].sizetype = results;
                            }
                            resolve();
                        }
                    });
                }
            });
        });


        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                if (results.length == 1) {
                    let temp = results;
                    temp[0].items = {};
                    temp[0].server_time = new Date();
                    temp[0].current_user = req.user.email;
                    let promises_list = [get_cdcitems(temp, temp[0].iddc), get_pdcitems(temp, temp[0].iddc), get_pcdcitems(temp, temp[0].iddc), get_size_details(temp, temp[0].iddc, get_adcitems(temp, temp[0].iddc))];
                    Promise.all(promises_list).then((result) => res.ok(temp)).catch((err) => res.serverError(err));
                }
                else {
                    return res.ok(results);
                }
            }
        });
    },
    updatedc: function (req, res) {


        let flag = 0;
        let q = "UPDATE dc "
        let d = []
        let column_list = ["status"];
        column_list.map(function (column) {
            if (req.body[column] != undefined) {
                if (flag == 0) { q = q.concat("SET "); flag = 1; }
                else { q = q.concat(","); }
                q = q.concat(column, " = ? ");
                d.push(req.body[column]);
            }
        });

        // blame_user and final touches
        if (flag == 0) {
            q = q.concat("SET ");
            flag = 1;
        }
        else {
            q = q.concat(",");
        }
        q = q.concat("blame_user = ?, modified_time = now() WHERE id = ?;");
        d.push(req.user.email)
        d.push(req.param("id"))
        // console.log(q,d);

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        })

    },
    savegrn: function (req, res) {
        let today = new Date;
        let q = "INSERT INTO grn (idsupplier, naming_series, grn_date, against, supplier_dc_no, against_other, vehicle_number, locationId, comment, blame_user) \
                        VALUES (?,?,?,?,?,?,?,?,?,?);";
        let d = [req.body.supplier_id, req.body.naming_series, dateFormat(today, 'yyyy-mm-dd'), req.body.against, req.body.supplier_dc_no, req.body.against_other, req.body.vehicle_number, req.body.location, req.body.comment, req.user.email];
        let temp = {}

        let get_grn_number = (return_ref, idgrn) => new Promise((resolve, reject) => {
            Dc.query("SELECT grn.naming_series,grn.grn_number,series.length, now() as server_time FROM grn,series WHERE grn.naming_series = series.name AND grn.id = ?", [idgrn], function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.grn = results[0];
                    return_ref.grn.current_user = req.user.email + '.';
                    resolve();
                }
            });
        });

        let add_grn_dc_relation = (return_ref, idgrn, dc_numbers) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO dcgrn (iddc, idgrn, document_type, blame_user) VALUES ";
            let d1 = [];
            dc_numbers.forEach(element => {
                if (flag == 1) q1 = q1.concat(", ");
                q1 = q1.concat("(?,?,?,?)");
                flag = 1;
                d1.push(element, idgrn, 'grn', req.user.email);
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) return reject(err);
                else {
                    return_ref.dcgen_insert = results;
                    resolve();
                }
            });
        });

        let cgrn_insert = (return_ref, idgrn, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO cgrnitems (idgrn, lot_number, colour, colour_index, dia, roll, weight, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.dialist.forEach(dialist => {
                    if (flag == 1) q1 = q1.concat(", ");
                    q1 = q1.concat("(?,?,?,?,?,?,?,?,?)");
                    flag = 1;
                    d1.push(idgrn, element.lot_number, dialist.colour, index, dialist.dia, dialist.roll, dialist.weight, dialist.comment, req.user.email);
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) return reject(err);
                else {
                    return_ref.cgrnitems_insert = results;
                    resolve();
                }
            });
        });

        let pgrn_insert = (return_ref, idgrn, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO pgrnitems (idgrn, colour, lot_number, iditem, part_index, part, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.partlist.forEach(partlist => {
                    if (flag == 1) q1 = q1.concat(", ");
                    q1 = q1.concat("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                    flag = 1;
                    d1.push(idgrn, partlist.colour, element.lot_number, element.item.id, index, partlist.part, partlist.size1, partlist.size2, partlist.size3, partlist.size4, partlist.size5, partlist.size6, partlist.size7, partlist.size8, partlist.size9, partlist.size10, partlist.wsize1, partlist.wsize2, partlist.wsize3, partlist.wsize4, partlist.wsize5, partlist.wsize6, partlist.wsize7, partlist.wsize8, partlist.wsize9, partlist.wsize10, partlist.comment, req.user.email);
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.pgrnitems_insert = results;
                    resolve();
                }
            });
        });

        let pcgrn_insert = (return_ref, idgrn, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO pcgrnitems (idgrn, colour, lot_number, iditem, part_index, part, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.partlist.forEach(partlist => {
                    if (flag == 1) q1 = q1.concat(", ");
                    q1 = q1.concat("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                    flag = 1;
                    d1.push(idgrn, partlist.colour, element.lot_number, element.item.id, index, partlist.part, partlist.size1, partlist.size2, partlist.size3, partlist.size4, partlist.size5, partlist.size6, partlist.size7, partlist.size8, partlist.size9, partlist.size10, partlist.comment, req.user.email);
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.pcgrnitems_insert = results;
                    resolve();
                }
            });
        });

        let agrn_insert = (return_ref, idgrn, items) => new Promise((resolve, reject) => {
            let flag = 0;
            let q1 = "INSERT INTO agrnitems (idgrn, lot_number, lot_index, iditem, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment, blame_user) VALUES ";
            let d1 = [];
            items.forEach((element, index) => {
                element.accessorylist.forEach(accessorylist => {
                    accessorylist.item.forEach(item => {
                        if (flag == 1) q1 = q1.concat(", ");
                        q1 = q1.concat("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                        flag = 1;
                        d1.push(idgrn, element.lot_number, index, item.item.id, item.size1, item.size2, item.size3, item.size4, item.size5, item.size6, item.size7, item.size8, item.size9, item.size10, item.wsize1, item.wsize2, item.wsize3, item.wsize4, item.wsize5, item.wsize6, item.wsize7, item.wsize8, item.wsize9, item.wsize10, item.comment, req.user.email);
                    });
                });
            });
            Dc.query(q1, d1, function (err, results) {
                if (err) reject(err);
                else {
                    return_ref.agrnitems_insert = results;
                    resolve();
                }
            });
        });

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                temp.grn_insert = results;
                temp.idgrn = results.insertId;
                let promises_list = []
                promises_list.push(get_grn_number(temp, temp.idgrn));
                if (req.body.against == 'dc') {
                    promises_list.push(add_grn_dc_relation(temp, temp.idgrn, req.body.dc_numbers));
                }
                if (req.body.items.cloth) {
                    promises_list.push(cgrn_insert(temp, temp.idgrn, req.body.items.cloth));
                }
                if (req.body.items.piece) {
                    promises_list.push(pgrn_insert(temp, temp.idgrn, req.body.items.piece));
                }
                if (req.body.items.packed) {
                    promises_list.push(pcgrn_insert(temp, temp.idgrn, req.body.items.packed));
                }
                if (req.body.items.accessory) {
                    promises_list.push(agrn_insert(temp, temp.idgrn, req.body.items.accessory));
                }
                Promise.all(promises_list).then((result) => res.ok(temp)).catch((err) => res.serverError(err));
            }
        });
    },
    grn: function (req, res) {
        // ----
        // ---- param are - items(available automaticaly if only one grn is returned) ,id, grn_number, naming_series,
        //-----             idsupplier, iditem, lot_number, vehicle_number, status
        // ----             comment, after_grn_date (yyyymmdd), before_grn_date , limit, offset
        // ----

        // ---- Warning: the order by in this query acts differently in higher versions of MySQL. watchout during Upgrade.
        let q =
          "SELECT \
        grn.id idgrn, \
        grn.naming_series, \
        items_agg.itemlist, \
        items_agg.iditemlist, \
        items_agg.colourlist, \
        sizelist.sizelist, \
        items_agg.dialist, \
        series.length grn_no_length, \
        against_dc.dclist, \
        grn.against, \
        grn.supplier_dc_no, \
        grn.against_other, \
        grn.grn_number, \
        grn.grn_date, \
        items_agg.lotlist, \
        grn_item_type.grn_item_type, \
        grn.vehicle_number, \
        grn.locationId location,  \
        grn.comment, \
        grn.status, \
        grn.modified_time, \
        grn.blame_user, \
        supplier.id supplier_id, \
        supplier.name supplier_name, \
        supplier.address1 supplier_address1, \
        supplier.address2 supplier_address2, \
        supplier.city supplier_city, \
        supplier.state supplier_state, \
        supplier.pincode supplier_pincode, \
        supplier.phone1 supplier_phone1, \
        supplier.phone2 supplier_phone2, \
        supplier.gstin supplier_gstin, \
        supplier.email supplier_email \
      FROM (SELECT * FROM grn ORDER BY id DESC) as grn LEFT JOIN supplier ON grn.idsupplier = supplier.id \
        LEFT JOIN series ON grn.naming_series = series.name \
        LEFT JOIN ( \
            SELECT idgrn,GROUP_CONCAT(distinct colour SEPARATOR ', ') colourlist, group_concat(distinct iteminfo.name SEPARATOR ', ') itemlist,  group_concat(distinct iteminfo.id SEPARATOR ', ') iditemlist, group_concat(distinct lot_number SEPARATOR ', ') lotlist, group_concat(distinct part SEPARATOR ', ') partlist, group_concat(distinct dia SEPARATOR ', ') dialist \
            FROM ( \
                select idgrn, colour, iditem, part, lot_number, null as dia from pgrnitems \
                union all \
                select idgrn, null as colour, iditem, null as part, lot_number, null as dia from agrnitems \
                union all \
                select idgrn, colour, iditem, part, lot_number, null as dia from pcgrnitems \
                union all \
                select idgrn, colour, null as iditem, null as part, lot_number, dia from cgrnitems \
            ) as items \
            LEFT JOIN iteminfo on iteminfo.id = items.iditem group by idgrn \
        ) items_agg ON grn.id = items_agg.idgrn \
        LEFT JOIN ( \
        Select idgrn, group_concat(distinct sizelist.size_text ORDER BY sizelist.id,sizelist.size separator ', ') sizelist from \
        (SELECT distinct sizerange.idsizetype, 1 size, idgrn FROM (select idgrn, iditem, size1, wsize1 from pgrnitems union all select idgrn, iditem, size1, wsize1 from agrnitems union all select idgrn, iditem, size1, 0 as wsize1 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size1 > 0 or items.wsize1 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 2 size, idgrn FROM (select idgrn, iditem, size2, wsize2 from pgrnitems union all select idgrn, iditem, size2, wsize2 from agrnitems union all select idgrn, iditem, size2, 0 as wsize2 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size2 > 0 or items.wsize2 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 3 size, idgrn FROM (select idgrn, iditem, size3, wsize3 from pgrnitems union all select idgrn, iditem, size3, wsize3 from agrnitems union all select idgrn, iditem, size3, 0 as wsize3 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size3 > 0 or items.wsize3 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 4 size, idgrn FROM (select idgrn, iditem, size4, wsize4 from pgrnitems union all select idgrn, iditem, size4, wsize4 from agrnitems union all select idgrn, iditem, size4, 0 as wsize4 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size4 > 0 or items.wsize4 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 5 size, idgrn FROM (select idgrn, iditem, size5, wsize5 from pgrnitems union all select idgrn, iditem, size5, wsize5 from agrnitems union all select idgrn, iditem, size5, 0 as wsize5 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size5 > 0 or items.wsize5 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 6 size, idgrn FROM (select idgrn, iditem, size6, wsize6 from pgrnitems union all select idgrn, iditem, size6, wsize6 from agrnitems union all select idgrn, iditem, size6, 0 as wsize6 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size6 > 0 or items.wsize6 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 7 size, idgrn FROM (select idgrn, iditem, size7, wsize7 from pgrnitems union all select idgrn, iditem, size7, wsize7 from agrnitems union all select idgrn, iditem, size7, 0 as wsize7 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size7 > 0 or items.wsize7 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 8 size, idgrn FROM (select idgrn, iditem, size8, wsize8 from pgrnitems union all select idgrn, iditem, size8, wsize8 from agrnitems union all select idgrn, iditem, size8, 0 as wsize8 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size8 > 0 or items.wsize8 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 9 size, idgrn FROM (select idgrn, iditem, size9, wsize9 from pgrnitems union all select idgrn, iditem, size9, wsize9 from agrnitems union all select idgrn, iditem, size9, 0 as wsize9 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size9 > 0 or items.wsize9 > 0) \
        union all \
        SELECT distinct sizerange.idsizetype, 10 size, idgrn FROM (select idgrn, iditem, size10, wsize10 from pgrnitems union all select idgrn, iditem, size10, wsize10 from agrnitems union all select idgrn, iditem, size10, 0 as wsize10 from pcgrnitems) as items, iteminfo, sizerange where items.iditem = iteminfo.id and iteminfo.sizerange = sizerange.idsize and (items.size10 > 0 or items.wsize10 > 0)) grn_sizes, \
        (SELECT id,1 size,size1 size_text FROM sizetype \
        UNION ALL \
        SELECT id,2 size,size2 size_text FROM sizetype \
        UNION ALL \
        SELECT id,3 size,size3 size_text FROM sizetype \
        UNION ALL \
        SELECT id,4 size,size4 size_text FROM sizetype \
        UNION ALL \
        SELECT id,5 size,size5 size_text FROM sizetype \
        UNION ALL \
        SELECT id,6 size,size6 size_text FROM sizetype \
        UNION ALL \
        SELECT id,7 size,size7 size_text FROM sizetype \
        UNION ALL \
        SELECT id,8 size,size8 size_text FROM sizetype \
        UNION ALL \
        SELECT id,9 size,size9 size_text FROM sizetype \
        UNION ALL \
        SELECT id,10 size,size10 size_text FROM sizetype) as sizelist where sizelist.id = grn_sizes.idsizetype and sizelist.size = grn_sizes.size group by idgrn \
        ) sizelist on sizelist.idgrn = grn.id \
        LEFT JOIN (select dcgrn.idgrn, group_concat(concat(naming_series,LPAD(dc_number,series.length,'0')) SEPARATOR ', ') as dclist from dc,dcgrn,series where dc.id = dcgrn.iddc and dcgrn.document_type = 'grn' and dc.naming_series = series.name group by dcgrn.idgrn \
        ) as against_dc on against_dc.idgrn = grn.id \
        LEFT JOIN ( SELECT idgrn, group_concat(item_type SEPARATOR ', ') as grn_item_type FROM \
        (SELECT idgrn, 'cloth' as item_type from cgrnitems group by idgrn \
        UNION ALL \
        SELECT idgrn, 'piece' as item_type from pgrnitems group by idgrn \
        UNION ALL \
        SELECT idgrn, 'accessory' as item_type from agrnitems group by idgrn \
        UNION ALL \
        SELECT idgrn, 'packed' as item_type from pcgrnitems group by idgrn) as grn_type GROUP BY idgrn \
        ) as grn_item_type on grn_item_type.idgrn = grn.id \
        WHERE 1 = 1 ";
        let d = []
        let q_where = ""
        let limit = Number.MAX_SAFE_INTEGER;
        let offset = 0;

        if (req.param('limit') && !isNaN(parseInt(req.param('limit')))) limit = parseInt(req.param('limit'));
        if (req.param('offset') && !isNaN(parseInt(req.param('offset')))) offset = parseInt(req.param('offset'));

        let param_equal_list = ["id", "grn_number", "naming_series", "idsupplier", "status"];
        param_equal_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND grn.", param, " = ? ");
                d.push(req.param(param));
            }
        });

        let param_like_list = ["vehicle_number", "comment"];
        param_like_list.forEach(function (param) {
            if (req.param(param) != undefined) {
                q = q.concat(" AND grn.", param, " LIKE ? ");
                d.push("%" + req.param(param) + "%");
            }
        });

        if (req.param('lot_number') != undefined) {
            q = q.concat(" AND (lotlist LIKE ? OR lotlist LIKE ?)");
            d.push('%' + req.param('lot_number') + ',%');
            d.push('%' + req.param('lot_number'));
        }

        if (req.param('grn_item_type') != undefined) {
            q = q.concat(" AND grn_item_type LIKE ?");
            d.push('%' + req.param('grn_item_type') + '%');
        }

        if (req.param('iditem') != undefined) {
            q = q.concat(" AND grn.id = any(select distinct idgrn from (select distinct idgrn from pcgrnitems where pcgrnitems.iditem = ? union all select distinct idgrn from pgrnitems where pgrnitems.iditem = ? union all select distinct idgrn from agrnitems where agrnitems.iditem = ? ) as a)");
            d.push(req.param('iditem'),req.param('iditem'),req.param('iditem'));
        }

        if (req.param('after_grn_date') != undefined) {
            q = q.concat(" AND grn.grn_date >= ? ")
            d.push(req.param('after_grn_date'));
        }
        if (req.param('before_grn_date') != undefined) {
            q = q.concat(" AND grn.grn_date <= ? ")
            d.push(req.param('before_grn_date'));
        }

        q = q.concat(' LIMIT ?,?;');
        d.push(offset, limit);

        let get_cgrnitems = (return_ref, idgrn) => new Promise((resolve, reject) => {
            Dc.query('SELECT colour, lot_number, colour_index, dia, roll, weight, comment FROM cgrnitems WHERE idgrn = ? ORDER BY id;', [idgrn], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.cloth = results;
                    }
                    resolve();
                }
            });
        });

        let get_pgrnitems = (return_ref, idgrn) => new Promise((resolve, reject) => {
            Dc.query('SELECT colour, lot_number, part, part_index, sizerange, iditem, iteminfo.name as itemname, iteminfo.naming_series as item_naming_series, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment FROM pgrnitems,iteminfo WHERE pgrnitems.iditem = iteminfo.id and idgrn = ? ORDER BY pgrnitems.id;', [idgrn], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.piece = results;
                    }
                    resolve();
                }
            });
        });

        let get_agrnitems = (return_ref, idgrn) => new Promise((resolve, reject) => {
            Dc.query('SELECT lot_number, lot_index, sizerange, iditem, iteminfo.name as itemname, iteminfo.naming_series as item_naming_series, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, wsize1, wsize2, wsize3, wsize4, wsize5, wsize6, wsize7, wsize8, wsize9, wsize10, comment FROM agrnitems,iteminfo WHERE agrnitems.iditem = iteminfo.id and idgrn = ? ORDER BY agrnitems.id;', [idgrn], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.accessory = results;
                    }
                    resolve();
                }
            });
        });

        let get_pcgrnitems = (return_ref, idgrn) => new Promise((resolve, reject) => {
            Dc.query('SELECT colour, lot_number, part, part_index, sizerange, iditem, iteminfo.name as itemname, iteminfo.naming_series as item_naming_series, size1, size2, size3, size4, size5, size6, size7, size8, size9, size10, comment FROM pcgrnitems,iteminfo WHERE pcgrnitems.iditem = iteminfo.id and idgrn = ? ORDER BY pcgrnitems.id;', [idgrn], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].items.packed = results;
                    }
                    resolve();
                }
            });
        });

        let get_size_details = (return_ref, idgrn) => new Promise((resolve, reject) => {
            Dc.query('SELECT DISTINCT sizerange.* FROM sizerange,iteminfo WHERE sizerange.idsize = iteminfo.sizerange AND iteminfo.id = any(select distinct iditem from (select distinct iditem from pcgrnitems where pcgrnitems.idgrn = ? union all select distinct iditem from pgrnitems where pgrnitems.idgrn = ? union all select distinct iditem from agrnitems where agrnitems.idgrn = ? ) as a);', [idgrn,idgrn,idgrn], function (err, results) {
                if (err) return reject(err);
                else {
                    if (results.length > 0) {
                        return_ref[0].sizerange = results;
                    }
                    Dc.query('SELECT DISTINCT sizetype.* FROM sizetype, sizerange, iteminfo WHERE sizerange.idsizetype = sizetype.id AND sizerange.idsize = iteminfo.sizerange AND iteminfo.id = any(select distinct iditem from (select distinct iditem from pcgrnitems where pcgrnitems.idgrn = ? union all select distinct iditem from pgrnitems where pgrnitems.idgrn = ? union all select distinct iditem from agrnitems where agrnitems.idgrn = ? ) as a);', [idgrn,idgrn,idgrn], function (err, results) {
                        if (err) return reject(err);
                        else {
                            if (results.length > 0) {
                                return_ref[0].sizetype = results;
                            }
                            resolve();
                        }
                    });
                }
            });
        });


        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                if (results.length == 1) {
                    let temp = results;
                    temp[0].items = {};
                    temp[0].server_time = new Date();
                    temp[0].current_user = req.user.email;
                    let promises_list = [get_cgrnitems(temp, temp[0].idgrn), get_pgrnitems(temp, temp[0].idgrn), get_pcgrnitems(temp, temp[0].idgrn), get_size_details(temp, temp[0].idgrn, get_agrnitems(temp, temp[0].idgrn))];
                    Promise.all(promises_list).then((result) => res.ok(temp)).catch((err) => res.serverError(err));
                }
                else {
                    return res.ok(results);
                }
            }
        });
    },
    updategrn: function (req, res) {
        let flag = 0;
        let q = "UPDATE grn "
        let d = []
        let column_list = ["status"];
        column_list.map(function (column) {
            if (req.body[column] != undefined) {
                if (flag == 0) { q = q.concat("SET "); flag = 1; }
                else { q = q.concat(","); }
                q = q.concat(column, " = ? ");
                d.push(req.body[column]);
            }
        });

        // blame_user and final touches
        if (flag == 0) {
            q = q.concat("SET ");
            flag = 1;
        }
        else {
            q = q.concat(",");
        }
        q = q.concat("blame_user = ?, modified_time = now() WHERE id = ?;");
        d.push(req.user.email)
        d.push(req.param("id"))
        // console.log(q,d);

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        })

    },
    test: function (req, res) {
        // console.log(req.param(0),req.param(1),req.param(2))
        Dc.query("Select now();", [], function (err, results) {
            // Dc.query("SELECT group_concat(supplierdepartment.iddept SEPARATOR ',') AS dept FROM supplier, department, supplierdepartment WHERE supplier.id = supplierdepartment.idsup AND department.id = supplierdepartment.iddept AND supplier.id = 1 GROUP BY supplier.id;", [], function (err, results) {
            if (err) return res.serverError(err);
            else {
                // console.log(results);
                return res.ok("alive and kicking at : " + Date() + "<br> DB time is: " + results[0]["now()"]);
            }
        });


    }


};

