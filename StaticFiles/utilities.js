function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
        ",");
}

function verifySelection(value) {
    var x = document.getElementById("TransferTo")
        .selectedIndex;
    var y = document.getElementById("TransferFrom")
        .selectedIndex;
    if (x !== y) {
        alert("Cannot transfer to the same account");
        return false;
    }
    return true;
}
async function GetAccountDataFromJSON(TransferAmount) {
    // api url 
    const api_url =
        "http://localhost:5000/api/amount/";
    var checkingIndex = 0;
    var savingsIndex = 1;
    var DbCheckingAmount = await new Promise(
        function (resolve) {
            setTimeout(function () {
                resolve(fetchAccountData(
                    api_url,
                    checkingIndex
                ))
            }, 200)
        });
    var DbSavingsAmount = await new Promise(
        function (resolve) {
            setTimeout(function () {
                resolve(fetchAccountData(
                    api_url,
                    savingsIndex
                ))
            }, 200)
        });
    SaveAccountData(DbCheckingAmount,
        DbSavingsAmount, TransferAmount);

}

function fetchAccountData(api_url, accountIndex) {
    var data;
    var amount = fetch(api_url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            return data.data[accountIndex].amount;
        });
    return amount;
}

function SaveAccountData(currentChecking,
    currentSavings, transferAmount) {
    const api_url =
        "http://localhost:5000/api/setAccount/";

    var fromChecking;
    var newSavings;
    var newChecking;
    var checkingDeposit;
    var savingsDeposit;
    var transferFloat = parseFloat(transferAmount).toFixed(2);

    var FromAccount = document.getElementById(
        "TransferFrom").selectedIndex;
    if (FromAccount == 1) {
        fromChecking = 1;
        checkingDeposit = 0;
        savingsDeposit = 1;
    } else {
        fromChecking = 0;
        checkingDeposit = 1;
        savingsDeposit = 0;
    }

    console.log(transferFloat, fromChecking);
    if (fromChecking) {
        var x = +currentChecking - +transferFloat;
        var s = +currentSavings + +transferFloat;
        newChecking = parseFloat(x).toFixed(2);
        newSavings = parseFloat(s).toFixed(2);
    } else {
        var x = +currentChecking + +transferFloat;
        var s = +currentSavings - +transferFloat;
        newChecking = parseFloat(x).toFixed(2);
        newSavings = parseFloat(s).toFixed(2);
    }
    if (newChecking > 0)
        if (newSavings > 0) {
            postAccount("Checking", newChecking, checkingDeposit, transferFloat);
            postAccount("Savings", newSavings, savingsDeposit, transferFloat);
        }
    else {
        alert("Must be enough money in savings!");
    } else
        alert("Must be enough money in checking!");

    var FormattedChecking = numberWithCommas(
        newChecking);
    var FormattedSavings = numberWithCommas(newSavings);
    document.getElementById("CheckingAmount")
        .innerHTML = `$${FormattedChecking}`;
    document.getElementById("SavingsAmount")
        .innerHTML = `$${FormattedSavings}`;
}

function postAccount(account, newAmount, deposit, transferAmount) {
    const api_url =
        "http://localhost:5000/api/setAccount/";
    fetch(api_url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "accountType": account,
                "amount": newAmount,
                "transferAmount": transferAmount,
                "deposit": deposit
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(
                'Request succeeded with JSON response',
                data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function transferMoney() {
    var amount = document.getElementById(
        "txtTransferAmount").value;
    var TransferAmount = parseFloat(amount.replace(
        /[^0-9.]/g, '')).toFixed(2);
    if (verifySelection()) {
        GetAccountDataFromJSON(TransferAmount);
    }
}



function fetchJsonData(api_url, accountIndex) {
    var data;
    var amount = fetch(api_url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            return data.data[accountIndex].amount;
        });
    return amount;
}

async function UpdateAccountDataFromJSON(exclusivePage) {
    // api url 
    const api_url = "http://localhost:5000/api/amount/";
    var checkingIndex = 0;
    var savingsIndex = 1;
    var DbCheckingAmount = await new Promise(function (
        resolve) {
        setTimeout(function () {
            resolve(fetchJsonData(api_url,
                checkingIndex))
        }, 200)
    });
    var DbSavingsAmount = await new Promise(function (
        resolve) {
        setTimeout(function () {
            resolve(fetchJsonData(api_url,
                savingsIndex))
        }, 200)
    });
    if (exclusivePage != "Savings") {
        document.getElementById("CheckingAmount").innerHTML =
            `$${numberWithCommas(DbCheckingAmount.toFixed(2))}`;
    }
    if (exclusivePage != "Checking") {
        document.getElementById("SavingsAmount").innerHTML =
            `$${numberWithCommas(DbSavingsAmount.toFixed(2))}`;
    }
}




function fetchTransactionData(api_url) {
    // var data;
    // var transactions = fetch(api_url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "accountType": account
    //         })
    //     })
    //     .then(function (resp) {
    //         return resp.json();
    //     })
    //     .then(function (data) {
    //         return data.data;
    //     });
    // return transactions;

    var transactionsDataJson = fetch(api_url)
        .then(function (resp) {
            return resp.json();
        });
    return transactionsDataJson;
}

async function addTransaction(account) {
    const api_account_url = "http://localhost:5000/api/amount/";
    var amount;
    var transactionsData;
    var checkingIndex = 0;
    var savingsIndex = 1;
    if (account == "Checking") {
        // api url 
        const api_url =
            "http://localhost:5000/api/getCheckingTransactions/";
        transactionsData = await new Promise(
            function (resolve) {
                setTimeout(function () {
                    resolve(fetchTransactionData(
                        api_url
                    ))
                }, 400)
            });

        amount = await new Promise(function (
            resolve) {
            setTimeout(function () {
                resolve(fetchJsonData(api_account_url,
                    checkingIndex))
            }, 400)
        });
    }
    if (account == "Savings") {
        // api url 
        const api_url =
            "http://localhost:5000/api/getSavingsTransactions/";
        transactionsData = await new Promise(
            function (resolve) {
                setTimeout(function () {
                    resolve(fetchTransactionData(
                        api_url
                    ))
                }, 400)
            });

        amount = await new Promise(function (
            resolve) {
            setTimeout(function () {
                resolve(fetchJsonData(api_account_url,
                    savingsIndex))
            }, 400)
        });
    }
    addTransactionDiv(transactionsData, amount);

}

var runningBalance;

function addTransactionDiv(transJson, amount) {
    console.log(transJson);
    runningBalance = amount;
    appendHtmlFunc(transJson.data);
}

function appendHtmlFunc(jsonDataArray) {
    jsonDataArray.forEach((jsonData, index) => {
        var elementId;
        if (index == 0)
            elementId = "TransactionStartAfterHere";
        else
            elementId = `ADTransactionHistoryDbData_${index-1}`;
        var location = "afterend";
        if (jsonData.deposit) {
            document.getElementById(elementId)
                .insertAdjacentHTML(location,
                    `<tr id=\"ADTransactionHistoryDbData_${index}\" data-tid=\"fcb54da5-19c8-ea11-9c5e-005056859397\" data-category=\"24a04b4d-de51-4146-b12c-bb2695adcff0\" data-subcategory=\"dc597d83-b3f9-4102-83c4-3b7030b7b315\" class=\"ADTransactionHistoryPostedTrans\">
                <td class=\"ADTransactionHistoryTableBoders\" id=\"AD_TransactionHistoryGridPlusMinusCell_${index}\">
                </td>
                <td id=\"TransactionLevelPostedDate_${index}\" class=\"ADTransactionHistoryTableBoders padLeft10\">${jsonData.date}</td>
                <td class=\"ADTransactionHistoryTableBoders\">
                    <div>
                        <div id=\"ADTransactionHistoryDescription_${index}\" class=\"acText333Size11 padLeft10 padTop5 padBottom5 keepWith divDescription\" autocatdescription=\"\">${jsonData.description} </div>
                    </div>
                </td>
                <td class=\"ADTransactionHistoryTableBoders\">
                    <span id=\"TransactionLevelKeyCtlSequenceNumber_${index}\" name=\"TrxnLevelCtlSequence\" style=\"display: none;\">
                    </span>
                </td>
                <td class=\"ADTransactionHistoryTableBoders\">
                    <span id=\"TransactionHistoryCheckNumber_${index}\" class=\"MarRight10\">
                    </span>
                </td>
                <td class=\"ADTransactionHistoryTableBoders textRight padRight5\">
                    <span>$${jsonData.amount}</span>
                </td>
                <td class=\"ADTransactionHistoryTableBoders\">
                    <span id=\"TransactionLevelKeyOccur_${index}\" name=\"TrxnLevelOccur\" style=\"display: none;\">
                    </span>
                </td>
                <td class=\"ADTransactionHistoryTableBoders textRight padRight10\">
                    &nbsp;
                </td>
                <td class=\"ADTransactionHistoryTableBoders\">
                    <span id=\"TransactionLevelKeySequenceNumber_${index}\" name=\"TrxnLevelSeqNumber\" style=\"display: none;\">&nbsp;
                    </span>
                </td>
                <td class=\"ADTransactionHistoryTableBoders textRight\">
                    <span class=\"padRight35\">$${numberWithCommas(runningBalance.toFixed(2))}</span>
                </td>
            </tr>`
                );
            runningBalance = +runningBalance - +jsonData.amount;

        } else {
            document.getElementById(elementId)
                .insertAdjacentHTML(location,
                    `<tr id="ADTransactionHistoryDbData_${index}" data-tid="fbb54da5-19c8-ea11-9c5e-005056859397" data-category="24a04b4d-de51-4146-b12c-bb2695adcff0" data-subcategory="dc597d83-b3f9-4102-83c4-3b7030b7b315" class="ADTransactionHistoryPostedTrans">
                <td class="ADTransactionHistoryTableBoders" id="AD_TransactionHistoryGridPlusMinusCell_${index}">
                </td>
                <td id="TransactionLevelPostedDate_${index}" class="ADTransactionHistoryTableBoders padLeft10">${jsonData.date}</td>
                <td class="ADTransactionHistoryTableBoders">
                    <div>
                        <div id="ADTransactionHistoryDescription_${index}" class="acText333Size11 padLeft10 padTop5 padBottom5 keepWith divDescription" autocatdescription="">${jsonData.description} </div>
                    </div>
                </td>
                <td class="ADTransactionHistoryTableBoders">
                    <span id="TransactionLevelKeyCtlSequenceNumber_${index}" name="TrxnLevelCtlSequence" style="display: none;">
                    </span>
                </td>
                <td class="ADTransactionHistoryTableBoders">
                    <span id="TransactionHistoryCheckNumber_${index}" class="MarRight10">
                    </span>
                </td>
                <td class="ADTransactionHistoryTableBoders textRight padRight5">
                    &nbsp;
                </td>
                <td class="ADTransactionHistoryTableBoders">
                    <span id="TransactionLevelKeyOccur_${index}" name="TrxnLevelOccur" style="display: none;">
                    </span>
                </td>
                <td class="ADTransactionHistoryTableBoders textRight padRight10">
                    <span>
                        $${numberWithCommas(jsonData.amount.toFixed(2))}
                    </span>
                </td>
                <td class="ADTransactionHistoryTableBoders">
                    <span id="TransactionLevelKeySequenceNumber_${index}" name="TrxnLevelSeqNumber" style="display: none;">&nbsp;
                    </span>
                </td>
                <td class="ADTransactionHistoryTableBoders textRight">
                    <span class="padRight35">$${numberWithCommas(runningBalance.toFixed(2))}</span>
                </td>
            </tr>`
                );
            runningBalance = +runningBalance + +jsonData.amount;
        }
    });

}