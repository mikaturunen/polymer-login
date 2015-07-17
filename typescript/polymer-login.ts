"use strict";

Polymer({
    /** * What component we are attached to. */
    is: "polymer-login",

    properties: {
        /** {string} Login route the component should use when attempting to login the user. */
        loginRoute: {
            type: String,
            // TODO change default to /login after we've confirmed the attribute work
            value: "/user/login"
        },

        /** {string} Logout route the component should use when attemping to logout the user. */
        logoutRoute: {
            type: String,
            value: "/user/login"
        },

        consoleLogsSilenced: {
            type: Boolean,
            value: true
        }
    },

    /**
     * Opens Login dialog.
     */
    openLoginDialog: function() {
        this.$.LoginDialog.open();
        this.$.InputUserName.focus();

        if (this.consoleLogsSilenced === false) {
            console.log(this.loginRoute, this.logoutRoute);
        }
    },

    /**
     * Attempts to login into the system through the provided REST route.
     */
    tryLogin: function() {
        if (this.consoleLogsSilenced === false) {
            console.log("Attempting to login the user through route:", this.loginRoute);
        }

        this.$.TryLogin.body = JSON.stringify({
            user: this.$.InputUserName.value,
            password: this.$.InputPassword.value,
        });
        this.$.TryLogin.generateRequest();
    },

    /**
     * Callback for the login errors.
     */
    loginError: function(error: any) {
        console.log(error);
    },

    /**
     * Callback for login reponse.
     */
    loginResponse: function(result: any) {
        if (result.detail.succeeded === true) {
            // TODO Token received -- handle token and token passing (store in local storage?)
            console.log(result);
            this.$.LoginDialog.close();
            // TODO pass token information forward and make sure it's included in all other calls
        } else {
            // TODO fix the property and set the correct message
            this.loginError({ message: "NUUU" });
        }
    },

    tryLogout: function() {
        if (this.consoleLogsSilenced === false) {
            console.log("Attempting to logout the user through route:", this.logoutRoute);
        }

        this.$.TryLogout.generateRequest();
    },

    /**
     * Callback for the logout errors.
     */
    logoutError: function(error: any) {
        console.log(error);
    },

    /**
     * Callback for logout reponse.
     */
    logoutResponse: function(result: any) {
        console.log(result);
    }
});
