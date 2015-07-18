"use strict";
Polymer({
    is: "polymer-login",
    properties: {
        loginRoute: {
            type: String,
            value: "/user/login"
        },
        logoutRoute: {
            type: String,
            value: "/user/login"
        }
    },
    openLoginDialog: function () {
        this.$.LoginDialog.open();
        this.$.InputUserName.focus();
        console.log(this.loginRoute, this.logoutRoute);
    },
    tryLogin: function () {
        console.log("Attempting to login the user through route:", this.loginRoute);
        this.$.TryLogin.body = JSON.stringify({
            user: this.$.InputUserName.value,
            password: this.$.InputPassword.value
        });
        this.$.TryLogin.generateRequest();
    },
    loginError: function (error) {
        console.log("Error:", error);
    },
    loginResponse: function (result) {
        if (this.$.TryLogin.lastError || !this.$.TryLogin.lastResponse) {
            this.loginError({ message: "NUUU", callDetails: result });
            return;
        }
        console.log(this.$.TryLogin.lastResponse);
        this.$.LoginDialog.close();
    },
    tryLogout: function () {
        console.log("Attempting to logout the user through route:", this.logoutRoute);
        this.$.TryLogout.generateRequest();
    },
    logoutError: function (error) {
        console.log(error);
    },
    logoutResponse: function (result) {
        console.log(result);
    }
});
