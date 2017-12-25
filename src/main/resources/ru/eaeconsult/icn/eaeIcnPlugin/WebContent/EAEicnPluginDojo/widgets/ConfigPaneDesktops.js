define([
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/i18n!../nls/common",
        "./TableMixin",
        "dijit/layout/ContentPane",
        "dojo/text!./templates/ConfigPaneTable.html",
        "dojo/domReady!"
    ],
    function(
        lang,
        declare,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        common,
        TableMixin,
        ContentPane,
        template
    ) {

        return declare("EAEicnPluginDojo.widgets.ConfigPaneDesktops", [ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin, TableMixin], {

            widgetsInTemplate: true,
            templateString: template,
            _nls: common,
            structure: common.configPane.entryTemplatesSection.structure,
            parentWidget: null,

            postCreate: function () {
                this.inherited(arguments);
                this.createEmptyStore();
                this.createGrid();
            },

            startup: function() {
                this.inherited(arguments);
            },

            _onFieldChange: function() {
                if (this.parentWidget) {
                    this.parentWidget._onFieldChange();
                }
            },

            getStructure: function() {
                var structure = [
                    {
                        id: 'desktopId',
                        field: 'desktopId',
                        name: common.configPane.desktopsSection.structure.desktopId,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: 'commonSearchTemplate',
                        field: 'commonSearchTemplate',
                        name: common.configPane.desktopsSection.structure.commonSearchTemplate,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: 'searchTreeJSON',
                        field: 'searchTreeJSON',
                        name: common.configPane.desktopsSection.structure.searchTreeJSON,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: 'searchViewsJSON',
                        field: 'searchViewsJSON',
                        name: common.configPane.desktopsSection.structure.searchViewsJSON,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: 'exportConfigJSON',
                        field: 'exportConfigJSON',
                        name: common.configPane.desktopsSection.structure.exportConfigJSON,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: 'searchOpen',
                        field: 'searchOpen',
                        name: common.configPane.desktopsSection.structure.searchOpen,
                        width: '80px',
                        editable: true,
                        alwaysEditing: true,
                        editor: "dijit.form.CheckBox"
                    },
                    {
                        id: 'useDataFilter',
                        field: 'useDataFilter',
                        name: common.configPane.desktopsSection.structure.useDataFilter,
                        width: '80px',
                        editable: true,
                        alwaysEditing: true,
                        editor: "dijit.form.CheckBox"
                    }
                ];
                return structure;
            }
        });
    });
