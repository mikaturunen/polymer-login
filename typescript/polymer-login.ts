"use strict";

Polymer({
    /**
     * What component we are attached to.
     */
    is: "yhbt-header",

    /** Opens Login dialog */
    openLoginDialog: function() {
        this.$.LoginDialog.open();
        // this.$.Username.focus();
    }
});
