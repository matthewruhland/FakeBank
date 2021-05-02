// File Serving portion
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
app.use("/StaticFiles", express.static(path.join(__dirname, "StaticFiles")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Database API portion
var database = require('./database.js');

app.get("/api/accounts", (req, res, next) => {
    console.log(`api/accounts`);
    database.getAllSQLData(res);
});

app.get("/api/account/:accountType", (req, res, next) => {
    console.log(`api/account/:accountType`);
    database.getAccountSQLData(req, res);
});

app.get("/api/amount", (req, res, next) => {
    console.log(`api/amount`);
    database.getAllAmountSQLData(res);
});

app.get("/api/amount/:accountType", (req, res, next) => {
    console.log(`api/amount/:accountType`);
    database.getAmountSQLData(req, res);
});

// POST method route
app.post('/api/setAccount', function (req, res) {
    console.log(`POST to ${req.body.accountType} `);
    database.setAmountSQLData(req, res);
    res.sendStatus(200);
})

app.get('/api/getCheckingTransactions', function (req, res) {
    database.getCheckingTransactionSQLData(req, res);
})

app.get('/api/getSavingsTransactions', function (req, res) {
    database.getSavingsTransactionSQLData(req, res);
})

// Port Listening portion
app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});