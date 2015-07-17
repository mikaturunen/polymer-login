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

        if (!this.consoleLogsSilenced) {
            console.log(this.loginRoute, this.logoutRoute);
        }
    },

    /**
     * Attempts to login into the system through the provided REST route.
     */
    tryLogin: function() {
        if (!this.consoleLogsSilenced) {
            console.log("Attempting to login the user through route:", this.loginRoute);
        }

        this.$.TryLogin.generateRequest();
    },

    tryLogout: function() {
        if (!this.consoleLogsSilenced) {
            console.log("Attempting to logout the user through route:", this.logoutRoute);
        }

        this.$.TryLogout.generateRequest();
    }
});
