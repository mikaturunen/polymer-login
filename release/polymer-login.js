"use strict";
Polymer({
    is: "polymer-login",
    properties: {
        loginRoute: {
            type: String,
            value: "/login"
        },
        logoutRoute: {
            type: String,
            value: "/logout"
        },
        status: {
            type: Object,
            value: { loggedIn: false }
        }
    },
    openLoginDialog: function () {
        this.$.LoginDialog.open();
        this.$.InputUserName.focus();
        console.log(this.loginRoute, this.logoutRoute);
    },
    openLogoutDialog: function () {
        this.$.LogoutDialog.open();
    },
    tryLogin: function () {
        console.log("Attempting to login the user through route:", this.loginRoute);
        this.$.TryLogin.body = JSON.stringify({
            user: this.$.InputUserName.value,
            password: this.$.InputPassword.value
        });
        this.$.TryLogin.generateRequest();
    },
    handleError: function (error) {
        console.log("Error:", error);
    },
    loginResponse: function (result) {
        if (this.$.TryLogin.lastError || !this.$.TryLogin.lastResponse) {
            this.handleError({ message: "NUUU", callDetails: result });
            return;
        }
        console.log(this.$.TryLogin.lastResponse);
        this.isLoggedIn = true;
        this.$.LoginDialog.close();
    },
    tryLogout: function () {
        console.log("Attempting to logout the user through route:", this.logoutRoute);
        this.$.TryLogout.generateRequest();
    },
    logoutResponse: function (result) {
        console.log(result);
    }
});
