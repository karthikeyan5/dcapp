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
        // ---- param are - allfeilds,department(comma seperated for multiple)
        // ---- 

        // console.log('all', req.allParams());
        // console.log('a:', req.param('a'), '---b:', req.param('b'), '---c:', req.param('c'))
        q = ""
        d = []
        if (req.param('allfeilds') == '1') {
            q = "SELECT supplier.id,name,address1, address2, city, state, pincode, phone1, phone2, gstin, email, otherdetails, deptlist.dept as departments_list ";
        }
        else {
            q = "SELECT supplier.id,name,city,state,pincode,gstin, deptlist.dept as departments_list ";
        }
        q_from = " FROM \
            (SELECT a.id,concat_ws('','[',group_concat(a.dname SEPARATOR ','),']') as dept FROM (SELECT supplier.id,department.name as dname FROM supplier,department,supplierdepartment WHERE \
              supplier.id = supplierdepartment.idsup AND department.id = supplierdepartment.iddept) as a GROUP BY a.id) \
              as deptlist ,supplier";
        q_where = " WHERE deptlist.id = supplier.id ";
        if (req.param('department') != undefined) {
            q_where = q_where.concat(" AND supplier.id = supplierdepartment.id ");
            q_from = q_from.concat(",(SELECT supplier.id FROM supplier,supplierdepartment WHERE supplierdepartment.idsup = supplier.id AND supplierdepartment.iddept in (?) GROUP BY supplier.id) as supplierdepartment  ");
            dept_arr = [];
            req.param('department').split(",").map(function (item) {
                dept_arr.push(parseInt(item))
            });
            d.push(dept_arr);
        }
        q = q.concat(q_from, q_where, ';');

        Dc.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    savesupplier: function (req, res) {

        User.query("INSERT into supplier (name, address1, address2, city, state, pincode, phone1, phone2, gstin, email, otherdetails, blame_user) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", [req.body.name, req.body.address1, req.body.address2, req.body.address3, req.body.city, req.body.state, req.body.pincode, req.body.phone1, req.body.phone2, req.body.gstin, req.body.email, req.body.otherdetails, req.user.email], function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
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
                q = q.concat(columns, " = ? ");
                d.push(req.body[column]);
            }
        });

        // last_blame_user and final touches
        if (flag == 0) {
            q = q.concat("SET ");
            flag = 1;
        }
        else {
            q = q.concat(",");
        }
        q = q.concat("blame_user = ? WHERE id = ?;");
        d.push(req.user.email)
        d.push(req.param("id"))




        User.query(q, d, function (err, results) {
            if (err) return res.serverError(err);
            else {
                return res.ok(results);
            }
        });
    },
    department: function (req, res) {
        Dc.query('SELECT id,name FROM department;', function (err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },



    test: function (req, res) {
        // console.log(req.param(0),req.param(1),req.param(2))

        return res.ok("alive and kicking at: " + Date());


    }


};

