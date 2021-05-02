# FakeBank

This bank is not real and is intended to fool with scammers. This was inspired by Kitboga and the real US bank login.  

## To run
Install node.js and npm  
`npm update`  
```npm start```  

## To use Fake Bank
Visit: [Localhost Login Link](http://localhost:5000/StaticFiles/USBankLogin.html).  
The login page does not actually authenticate a password, any username is accepted and `hunter2` is the password.  
Account Dashboard: [Localhost Dashboard Link](http://localhost:5000/StaticFiles/USBankDashboard.html).  
Checking: [Localhost Checking Link](http://localhost:5000/StaticFiles/USBankTransactions.html).  

## Making it look real for the scammers

Set `hosts` file :
``` C:\Windows\System32\drivers\etc```

```
127.0.0.1       usbank.com
127.0.0.1       www.usbank.com
127.0.0.1       usabank.com
127.0.0.1       www.usabank.com
```

