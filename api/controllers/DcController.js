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
var userQueryAsync = {};
sails.on('lifted', function () {
    userQueryAsync = Promise.promisify(Dc.query);   // Your post-lift startup code here
});

module.exports = {


    getbrand: function (req, res) {
        Dc.query('SELECT info FROM dbinfo where infoid = 1;', function (err, results) {
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
        q = ""
        d = []
        q_where = ""
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
        q = q.concat(q_from, q_where, ' group by supplier.modified_time desc;');

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
                temp = {}
                flag = 0;
                temp.main_results = results;
                temp.insertId = results.insertId;
                if (req.body.departments && req.body.departments.length > 0) {
                    d = [];
                    q = "INSERT INTO supplierdepartment (iddept, idsup, blame_user) VALUES ";
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


        flag = 0;
        q = "UPDATE supplier "
        d = []
        column_list = ["name", "address1", "address2", "city", "state", "pincode", "phone1", "phone2", "gstin", "email", "otherdetails"];
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
            else {
                temp = {};
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
        Dc.query('SELECT id,name FROM department;', function (err, results) {
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
    savecdc: function (req, res) {
        q = "INSERT INTO cdc (idsupplier, naming_series, department, dc_date, lot_number, rateperkg, vehicle_number, comment, blame_user) \
                        VALUES (?,?,?,?,?,?,?,?,?);";
        d = [req.body.supplier_details.id, req.body.naming_series, req.body.department, dateFormat(req.body.dc_date, 'yyyy-mm-dd'), req.body.lot_number, req.body.rateperkg, req.body.vehicle_number, req.body.comment, req.user.email];
        temp = {}

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                temp.cdc_insert = results;
                temp.idcdc = results.insertId;
                flag = 0;
                q1 = "INSERT INTO cdcitems (idcdc, colour, cdc_colour_index, dia, roll, weight, comment, blame_user) VALUES ";
                d1 = [];
                req.body.items.forEach((element, index) => {
                    element.dialist.forEach(dialist => {
                        if (flag == 1) q1 = q1.concat(", ");
                        q1 = q1.concat("(?,?,?,?,?,?,?,?)");
                        flag = 1;
                        d1.push(temp.idcdc, element.colour, index, dialist.dia, dialist.roll, dialist.weight, dialist.comment, req.user.email);
                    });
                });
                Dc.query(q1, d1, function (err, results) {
                    if (err) return res.serverError(err);
                    else {
                        temp.cdcitems_insert = results;
                        Dc.query("SELECT cdc.naming_series,cdc.dc_number,series.length FROM cdc,series WHERE cdc.naming_series = series.name AND cdc.id = ?", [temp.idcdc], function (err, results) {
                            if (err) return res.serverError(err);
                            else {
                                temp.dc = results[0];
                                return res.ok(temp);
                            }
                        });
                    }
                });
            }
        });
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

