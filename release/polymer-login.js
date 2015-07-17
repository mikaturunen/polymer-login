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
        if (!this.consoleLogsSilenced) {
            console.log(this.loginRoute, this.logoutRoute);
        }
    },
    tryLogin: function () {
        if (!this.consoleLogsSilenced) {
            console.log("Attempting to login the user through route:", this.loginRoute);
        }
        this.$.TryLogin.generateRequest();
    },
    tryLogout: function () {
        if (!this.consoleLogsSilenced) {
            console.log("Attempting to logout the user through route:", this.logoutRoute);
        }
        this.$.TryLogout.generateRequest();
    }
});
