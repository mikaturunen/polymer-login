"use strict";
(function () {
    var defaultProperties = {
        status: {
            loggedIn: false,
            user: {}
        }
    };
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
                value: defaultProperties.status
            }
        },
        logMetaInfo: function () {
            console.log("Meta information for status:", this.$.LoginMeta.byKey("user"), this.status);
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
            this.logMetaInfo();
        },
        loginResponse: function (result) {
            if (this.$.TryLogin.lastError || !this.$.TryLogin.lastResponse) {
                this.status = defaultProperties.status;
                this.handleError({ message: "NUUU", callDetails: result });
                return;
            }
            console.log(this.$.TryLogin.lastResponse);
            this.status.loggedIn = true;
            this.status = { loggedIn: true, user: {} };
            this.$.LoginDialog.close();
            this.logMetaInfo();
            this.fire("login", this.status);
        },
        tryLogout: function () {
            console.log("Attempting to logout the user through route:", this.logoutRoute);
            this.$.TryLogout.generateRequest();
        },
        logoutResponse: function (result) {
            if (this.$.TryLogout.lastError || !this.$.TryLogout.lastResponse) {
                this.status = defaultProperties.status;
                this.handleError({ message: "NUUU", callDetails: result });
                return;
            }
            this.status = defaultProperties.status;
            this.$.LogoutDialog.close();
            this.logMetaInfo();
            this.fire("logout", this.status);
        }
    });
})();
