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

        return declare("EAEicnPluginDojo.widgets.ConfigPaneItemTypes", [ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin, TableMixin], {

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
                        id: "objectType",
                        field: "objectType",
                        name: common.configPane.entryTemplatesSection.structure.objectType,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "objectTypeDisplay",
                        field: "objectTypeDisplay",
                        name: common.configPane.entryTemplatesSection.structure.objectTypeDisplay,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "entryTemplate",
                        field: "entryTemplate",
                        name: common.configPane.entryTemplatesSection.structure.entryTemplate,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "entryTemplateRO",
                        field: "entryTemplateRO",
                        name: common.configPane.entryTemplatesSection.structure.entryTemplateRO,
                        editable: true,
                        alwaysEditing: true},
                    {
                        id: "uniqueProperty",
                        field: "uniqueProperty",
                        name: common.configPane.entryTemplatesSection.structure.uniqueProperty,
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "noNew",
                        field: "noNew",
                        name: common.configPane.entryTemplatesSection.structure.noNew,
                        editable: true,
                        alwaysEditing: true,
                        editor: "dijit.form.CheckBox"
                    }
                ];
                return structure;
            }
        });
    });
