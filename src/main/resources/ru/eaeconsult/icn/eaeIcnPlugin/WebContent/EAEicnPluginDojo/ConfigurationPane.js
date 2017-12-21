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
        "dijit/form/CheckBox"
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
        CheckBox
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

            addEtRow: function() {
                var newItem={
                    id: this.maxid_et+1,
                    objectType: "",
                    objectTypeDisplay: "",
                    entryTemplate: "",
                    entryTemplateRO: "",
                    uniqueProperty: "",
                    noNew: false
                };
                this.mstore_et.add(newItem);
                this.etTypesGrid.model.clearCache();
                this.etTypesGrid.setStore(this.mstore_et);
                this._onFieldChange();
                this.maxid_et++;
            },

            addDtRow: function () {
                var newItem={
                    id: this.maxid_dt+1,
                    desktopId: "",
                    commonSearchTemplate: "",
                    searchTreeJSON: "",
                    searchViewsJSON: "",
                    exportConfigJSON: "",
                    searchOpen: false,
                    useDataFilter: false
                };
                this.mstore_dt.add(newItem);
                this.desktopsGrid.model.clearCache();
                this.desktopsGrid.setStore(this.mstore_dt);
                this._onFieldChange();
                this.maxid_dt++;
            },

            delEtRow: function() {
                var row = this.etTypesGrid.body._focusCellRow;
                if (row) {
                    var id = row;
                    this.mstore_et.remove(id);
                    this.etTypesGrid.model.clearCache();
                    this.etTypesGrid.setStore(this.mstore_et);
                    this._onFieldChange();
                }
            },

            delDtRow: function() {
                var row = this.desktopsGrid.body._focusCellRow;
                if (row) {
                    var id = row;
                    this.mstore_dt.remove(id);
                    this.desktopsGrid.model.clearCache();
                    this.desktopsGrid.setStore(this.mstore_dt);
                    this._onFieldChange();
                }
            },

            createTypesGrid: function() {
                if (this.etTypesGrid) {
                    this.etTypesGrid.destroyRecursive();
                }

                this.mstore_et = new Memory({data: this.etdata});

                var toolbar = new Toolbar({}, "toolbar");
                var addButton = new Button({
                    label: common.configPane.entryTemplatesSection.btnAdd,
                    iconClass: "dijitIconNewTask",
                    onClick: lang.hitch(this, this.addEtRow)
                });
                var delButton = new Button({
                    label: common.configPane.entryTemplatesSection.btnDel,
                    iconClass: "dijitIconDelete",
                    onClick: lang.hitch(this, this.delEtRow)
                });
                toolbar.addChild(addButton);
                toolbar.addChild(delButton);
                toolbar.startup();
                this.etTypesGrid = new Grid({
                    cacheClass: Cache,
                    store: this.mstore_et,
                    selectRowTriggerOnCell: true,
                    autoHeight: true,
                    barTop: [
                        toolbar
                    ],
                    style: {
                        height: "100px",
                        width: "100%"
                    },
                    structure:  common.configPane.entryTemplatesSection.structure,
                    modules: [
                        CellWidget,
                        Edit,
                        SelectRow,
                        Bar
                    ]
                })
                this.etTypesGrid.placeAt(this.etTablePane);

                this.etTypesGrid.edit.connect(this.etTypesGrid.edit, "onApply", lang.hitch(this, function(){
                    this._onFieldChange();
                }))
                this.etTypesGrid.startup();
                this.etTypesGrid.model.clearCache();
                this.etTypesGrid.setStore(this.mstore_et);

                if (this.jsonConfig && this.jsonConfig.etDataArray) {
                    this.etdata=this.jsonConfig.etDataArray;
                }

                for (i=0; i<this.etdata.length; i++) {
                    this.maxid_et = (this.etdata[i].id > this.maxid_et) ? this.etdata[i].id : this.maxid_et;
                };

                this.mstore_et = new Memory({data: this.etdata});
                this.etTypesGrid.startup();
                this.etTypesGrid.model.clearCache();
                this.etTypesGrid.setStore(this.mstore_et);

            },

            createDesktopsGrid: function() {
                if (this.desktopsGrid) {
                    this.desktopsGrid.destroyRecursive();
                }
                this.mstore_dt = new Memory({data: this.dtdata});

                var toolbar = new Toolbar({}, "toolbar");
                var addButton = new Button({
                    label: common.configPane.desktopsSection.btnAdd,
                    iconClass: "dijitIconNewTask",
                    onClick: lang.hitch(this, this.addDtRow)
                });
                var delButton = new Button({
                    label: common.configPane.desktopsSection.btnDel,
                    iconClass: "dijitIconDelete",
                    onClick: lang.hitch(this, this.delDtRow)
                });
                toolbar.addChild(addButton);
                toolbar.addChild(delButton);
                toolbar.startup();

                this.desktopsGrid = new Grid({
                    cacheClass: Cache,
                    store: this.mstore_dt,
                    selectRowTriggerOnCell: true,
                    autoHeight: true,
                    barTop: [
                        toolbar
                    ],
                    style: {
                        height: "50px",
                        width: "100%"
                    },
                    structure: common.configPane.desktopsSection.structure,
                    modules: [
                        CellWidget,
                        Edit,
                        SelectRow,
                        Bar
                    ]
                })
                this.desktopsGrid.placeAt(this.dtTablePane);

                this.desktopsGrid.edit.connect(this.desktopsGrid.edit, "onApply", lang.hitch(this, function(){
                    this._onFieldChange();
                }))
                this.desktopsGrid.startup();
                this.desktopsGrid.model.clearCache();
                this.desktopsGrid.setStore(this.mstore_et);

                if (this.jsonConfig && this.jsonConfig.desktopConfigsArray) {
                    this.dtdata=this.jsonConfig.desktopConfigsArray;
                } else {

                }

                for (i=0; i<this.dtdata.length; i++) {
                    this.maxid_dt = (this.dtdata[i].id > this.maxid_dt) ? this.dtdata[i].id : this.maxid_dt;
                };

                this.mstore_dt = new Memory({data: this.dtdata});
                this.desktopsGrid.startup();
                this.desktopsGrid.model.clearCache();
                this.desktopsGrid.setStore(this.mstore_dt);
            },

            load: function(callback) {
                if (this.configurationString) {
                    this.jsonConfig = JSON.parse(this.configurationString);
                    this.externalRestServiceUrl.set('value', this.jsonConfig.externalRestServiceUrl);
                }
                this.createTypesGrid();
                this.createDesktopsGrid();
            },

            _onFieldChange : function() {
                var repoId = Desktop.defaultRepositoryId;
                var repo = Desktop.getRepository(this.repoId);

                var paramAdmin = {};
                paramAdmin.externalRestServiceUrl = this.externalRestServiceUrl.get('value');

                var etDataArray = [];
                for (i=0; i<this.mstore_et.data.length; i++) {
                    etDataRow={};
                    etDataRow.id = this.mstore_et.data[i].id;
                    etDataRow.objectType = this.mstore_et.data[i].objectType;
                    etDataRow.objectTypeDisplay = this.mstore_et.data[i].objectTypeDisplay;
                    etDataRow.entryTemplate = this.mstore_et.data[i].entryTemplate;
                    etDataRow.entryTemplateRO = this.mstore_et.data[i].entryTemplateRO;
                    etDataRow.uniqueProperty = this.mstore_et.data[i].uniqueProperty;
                    etDataRow.noNew = this.mstore_et.data[i].noNew;
                    etDataArray.push(etDataRow);
                }
                paramAdmin.etDataArray = etDataArray;

                this.configurationString = JSON.stringify(paramAdmin);
                this.onSaveNeeded(true);
            },

            validate: function() {
                return true;
            }
        });
    });
