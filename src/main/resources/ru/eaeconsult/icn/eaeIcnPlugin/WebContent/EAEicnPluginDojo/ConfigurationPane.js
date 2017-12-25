define([
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "ecm/widget/admin/PluginConfigurationPane",
        "dojo/text!./templates/ConfigurationPane.html",
        "dojo/i18n!./nls/common",
        "ecm/model/Desktop",
        "ecm/model/SearchQuery",
        "ecm/model/ResultSet",
        "gridx/Grid",
        "gridx/core/model/cache/Sync",
        "gridx/modules/Edit",
        "gridx/modules/extendedSelect/Row",
        "gridx/modules/CellWidget",
        "gridx/modules/Bar",
        "dijit/Toolbar",
        "dijit/form/Button",
        "dojo/store/Memory",
        "dojo/on",
        "dijit/form/CheckBox",
        "./widgets/ConfigPaneItemTypes"
    ],
    function(
        lang,
        declare,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        PluginConfigurationPane,
        template,
        common,
        Desktop,
        SearchQuery,
        ResultSet,
        Grid,
        Cache,
        Edit,
        SelectRow,
        CellWidget,
        Bar,
        Toolbar,
        Button,
        Memory,
        on,
        CheckBox,
        ConfigPaneItemTypes
    ) {

        return declare("EAEicnPluginDojo.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {

            templateString: template,
            widgetsInTemplate: true,
            _nls: common,
            etdata: [],
            dtdata: [],
            mstore_et: null,
            mstore_dt: null,
            maxid_et: 0,
            maxid_dt: 0,

            startup: function() {
                this.inherited(arguments);
                //Item types grid
                this.itemtypesTablePane.parentWidget = this;
                if (this.jsonConfig.itDataArray) {
                    this.itemtypesTablePane.setData(this.jsonConfig.itDataArray);
                    this.itemtypesTablePane.refreshGrid();
                }
                //Desktops grid
                this.desktopsTablePane.parentWidget = this;
                if (this.jsonConfig.dtDataArray) {
                    this.desktopsTablePane.setData(this.jsonConfig.dtDataArray);
                    this.desktopsTablePane.refreshGrid();
                }
            },

            load: function(callback) {
                if (this.configurationString) {
                    this.jsonConfig = JSON.parse(this.configurationString);
                    this.externalRestServiceUrl.set('value', this.jsonConfig.externalRestServiceUrl);
                }
            },

            _onFieldChange : function() {
                var repoId = Desktop.defaultRepositoryId;
                var repo = Desktop.getRepository(this.repoId);

                var paramAdmin = {};
                paramAdmin.externalRestServiceUrl = this.externalRestServiceUrl.get('value');
                //Item types grid
                var itDataArray = [];
                for (i=0; i<this.itemtypesTablePane.mstore.data.length; i++) {
                    itDataRow={};
                    itDataRow.id = this.itemtypesTablePane.mstore.data[i].id;
                    itDataRow.objectType = this.itemtypesTablePane.mstore.data[i].objectType;
                    itDataRow.objectTypeDisplay = this.itemtypesTablePane.mstore.data[i].objectTypeDisplay;
                    itDataRow.entryTemplate = this.itemtypesTablePane.mstore.data[i].entryTemplate;
                    itDataRow.entryTemplateRO = this.itemtypesTablePane.mstore.data[i].entryTemplateRO;
                    itDataRow.uniqueProperty = this.itemtypesTablePane.mstore.data[i].uniqueProperty;
                    itDataRow.noNew = this.itemtypesTablePane.mstore.data[i].noNew;
                    itDataArray.push(itDataRow);
                }
                paramAdmin.itDataArray = itDataArray;
                //Desktops grid
                var dtDataArray = [];
                for (i=0; i<this.desktopsTablePane.mstore.data.length; i++) {
                    dtDataRow={};
                    dtDataRow.id = this.desktopsTablePane.mstore.data[i].id;
                    dtDataRow.desktopId = this.desktopsTablePane.mstore.data[i].desktopId;
                    dtDataRow.commonSearchTemplate = this.desktopsTablePane.mstore.data[i].commonSearchTemplate;
                    dtDataRow.searchTreeJSON = this.desktopsTablePane.mstore.data[i].searchTreeJSON;
                    dtDataRow.searchViewsJSON = this.desktopsTablePane.mstore.data[i].searchViewsJSON;
                    dtDataRow.exportConfigJSON = this.desktopsTablePane.mstore.data[i].exportConfigJSON;
                    dtDataRow.searchOpen = this.desktopsTablePane.mstore.data[i].searchOpen;
                    dtDataRow.useDataFilter = this.desktopsTablePane.mstore.data[i].useDataFilter;
                    dtDataArray.push(dtDataRow);
                }
                paramAdmin.dtDataArray = dtDataArray;

                this.configurationString = JSON.stringify(paramAdmin);
                this.onSaveNeeded(true);
            },

            validate: function() {
                return true;
            }
        });
    });
