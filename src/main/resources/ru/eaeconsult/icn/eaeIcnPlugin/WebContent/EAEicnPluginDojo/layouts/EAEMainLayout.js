define([
        "dojo/_base/declare",
        "ecm/widget/layout/NavigatorMainLayout",
        "dojo/text!./templates/EAEMainLayout.html",
        "dojo/i18n!../nls/common"
    ],
    function (declare, NavigatorMainLayout, template, common) {

        return declare("EAEicnPluginDojo.layouts.EAEMainLayout", [NavigatorMainLayout], {
            templateString: template,
            _nls: common,
            postCreate: function () {
                this.inherited(arguments);
                ecm.model.ehdTabController = this.eaeTabController;
            }
        });
    });
