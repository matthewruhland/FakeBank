var methods = {

    getAllSQLData: function (res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        var sql = "select * from transactions"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
        db.close();
    },

    getAccountSQLData: function (req, res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        var sql = "select * from transactions where accountType = ?"
        var params = [req.params.accountType]
        db.all(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
        db.close();
    },

    getAllAmountSQLData: function (res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        var sql = "select * from accountBalances"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
        db.close();
    },

    getAmountSQLData: function (req, res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        var sql = "SELECT * FROM accountBalances where accountType = ?"
        var params = [req.params.accountType]
        db.all(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
        db.close();
    },

    setAmountSQLData: function (req, res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        let sql = 'UPDATE accountBalances set amount = \'' + req.body.amount + '\' WHERE accountType = \'' + req.body.accountType + '\'';
        // output the UPDATE statement
        console.log(`SQL: ` + sql);
        db.run(sql);


        console.log(req.body.transferAmount);

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let formatedDate = month + "/" + date + "/" + year;
        console.log(formatedDate);
        let description = '';
        if ((req.body.accountType == 'Checking' && req.body.deposit) || (req.body.accountType == 'Savings' && !req.body.deposit))
            description = "Transfer from Checking to Savings";
        if ((req.body.accountType == 'Savings' && req.body.deposit) || (req.body.accountType == 'Checking' && !req.body.deposit))
            description = "Transfer from Savings to Checking";

        sql = 'INSERT INTO transactions (accountType, date, description, deposit, amount) VALUES( \'' + req.body.accountType + '\', \'' + formatedDate + '\', \'' + description + '\', ' + req.body.deposit + ', ' + req.body.transferAmount + ')';
        // output the INSERT statement
        console.log(`SQL: ` + sql);
        db.run(sql);

        db.close();
    },

    getCheckingTransactionSQLData: function (req, res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        var sql = "SELECT * FROM transactions where accountType is \'Checking\' ORDER BY date desc";
        console.log(sql);
        // SELECT * FROM transactions where accountType is 'Savings' ORDER BY date desc
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
        db.close();
    },

    getSavingsTransactionSQLData: function (req, res) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./db/accounts.db');
        var sql = "SELECT * FROM transactions where accountType is \'Savings\' ORDER BY date desc";
        console.log(sql);
        // SELECT * FROM transactions where accountType is 'Savings' ORDER BY date desc
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
        db.close();
    },

};

module.exports = methods;