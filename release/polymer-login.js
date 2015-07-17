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
        },
        consoleLogsSilenced: {
            type: Boolean,
            value: true
        }
    },
    openLoginDialog: function () {
        this.$.LoginDialog.open();
        this.$.InputUserName.focus();
        if (this.consoleLogsSilenced === false) {
            console.log(this.loginRoute, this.logoutRoute);
        }
    },
    tryLogin: function () {
        if (this.consoleLogsSilenced === false) {
            console.log("Attempting to login the user through route:", this.loginRoute);
        }
        this.$.TryLogin.body = JSON.stringify({
            user: this.$.InputUserName.value,
            password: this.$.InputPassword.value
        });
        this.$.TryLogin.generateRequest();
    },
    loginError: function (error) {
        console.log(error);
    },
    loginResponse: function (result) {
        console.log(result);
    },
    tryLogout: function () {
        if (this.consoleLogsSilenced === false) {
            console.log("Attempting to logout the user through route:", this.logoutRoute);
        }
        this.$.TryLogout.generateRequest();
    },
    logoutError: function (error) {
        console.log(error);
    },
    logoutResponse: function (result) {
        console.log(result);
    }
});
