"use strict";

(() => {

const defaultProperties = {
    status: {
        loggedIn: false,
        user: {

        }
    }
};

Polymer({
    /** * What component we are attached to. */
    is: "polymer-login",

    properties: {
        /** {string} Login route the component should use when attempting to login the user. */
        loginRoute: {
            type: String,
            value: "/login"
        },

        /** {string} Logout route the component should use when attemping to logout the user. */
        logoutRoute: {
            type: String,
            value: "/logout"
        },

        /** {boolean} False when the user is not logged in, true when they have logged in. */
        status: {
            type: Object,
            value: defaultProperties.status
        },
    },

    logMetaInfo: function() {
        console.log(
            "Meta information for status:",
            this.$.LoginMeta.byKey("user"),
            this.status
        );
    },

    /**
     * Opens Login dialog.
     */
    openLoginDialog: function() {
        this.$.LoginDialog.open();
        this.$.InputUserName.focus();

        console.log(this.loginRoute, this.logoutRoute);
    },

    /**
     * Opens Logout dialog.
     */
    openLogoutDialog: function() {
        this.$.LogoutDialog.open();
    },

    /**
     * Attempts to login into the system through the provided REST route.
     */
    tryLogin: function() {
        console.log("Attempting to login the user through route:", this.loginRoute);

        this.$.TryLogin.body = JSON.stringify({
            user: this.$.InputUserName.value,
            password: this.$.InputPassword.value,
        });
        this.$.TryLogin.generateRequest();
    },

    /**
     * Callback for the login errors.
     * @param {Error} error Error details.
     */
    handleError: function(error: any) {
        console.log("Error:", error);
        this.logMetaInfo();
    },

    /**
     * Callback for login reponse.
     */
    loginResponse: function(result: any) {
        if (this.$.TryLogin.lastError || !this.$.TryLogin.lastResponse) {
            // Error, something went wrong.
            // TODO fix the property and set the correct message
            this.status = defaultProperties.status;
            this.handleError({ message: "NUUU", callDetails: result });
            return;
        }

        // User credentials received and the user has logged in.
        console.log(this.$.TryLogin.lastResponse);
        this.status.loggedIn = true;
        this.status = { loggedIn: true, user: {} };
        this.$.LoginDialog.close();
        this.logMetaInfo();

        this.fire("login", this.status);
    },

    tryLogout: function() {
        console.log("Attempting to logout the user through route:", this.logoutRoute);
        this.$.TryLogout.generateRequest();
    },

    /**
     * Callback for logout reponse.
     */
    logoutResponse: function(result: any) {
        if (this.$.TryLogout.lastError || !this.$.TryLogout.lastResponse) {
            // Error, something went wrong.
            // TODO fix the property and set the correct message
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
