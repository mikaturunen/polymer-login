"use strict";

Polymer({
    /**
     * What component we are attached to.
     */
    is: "polymer-login",

    /** Opens Login dialog */
    openLoginDialog: function() {
        this.$.LoginDialog.open();
        // this.$.Username.focus();
    }
});
