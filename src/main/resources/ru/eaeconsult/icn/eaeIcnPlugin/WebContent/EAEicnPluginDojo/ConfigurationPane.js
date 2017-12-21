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
            mstore: null,
            mstore1: null,
            maxid: 0,
            maxid1: 0,

            addEtRow: function() {
                var newItem={
                    id: this.maxid+1,
                    objectType: "",
                    objectTypeDisplay: "",
                    entryTemplate: "",
                    entryTemplateRO: "",
                    uniqueProperty: "",
                    noNew: false
                };
                this.mstore.add(newItem);
                this.etTypesGrid.model.clearCache();
                this.etTypesGrid.setStore(this.mstore);
                this._onFieldChange();
                this.maxid++;
            },

            addPrivRow: function () {
                var newItem1={
                    id: this.maxid1+1,
                    privName: "",
                    fieldsList: ""
                };
                this.mstore1.add(newItem1);
                this.privsGrid.model.clearCache();
                this.privsGrid.setStore(this.mstore1);
                this._onFieldChange();
                this.maxid1++;
            },

            delEtRow: function() {
                var row = this.etTypesGrid.body._focusCellRow;
                if (row) {
                    var id = row;
                    this.mstore.remove(id);
                    this.etTypesGrid.model.clearCache();
                    this.etTypesGrid.setStore(this.mstore);
                    this._onFieldChange();
                }

            },

            createTypesGrid: function() {
                this.mstore = new Memory({data: this.etdata});

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
                    store: this.mstore,
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
                this.etTypesGrid.setStore(this.mstore);

                if (this.jsonConfig && this.jsonConfig.etDataArray) {
                    this.etdata=this.jsonConfig.etDataArray;
                }

                for (i=0; i<this.etdata.length; i++) {
                    this.maxid = (this.etdata[i].id > this.maxid) ? this.etdata[i].id : this.maxid;
                };

                this.mstore = new Memory({data: this.etdata});
                this.etTypesGrid.startup();
                this.etTypesGrid.model.clearCache();
                this.etTypesGrid.setStore(this.mstore);

            },

            load: function(callback) {
                if (this.configurationString) {
                    this.jsonConfig = JSON.parse(this.configurationString);
                    this.externalRestServiceUrl.set('value', this.jsonConfig.externalRestServiceUrl);
                }
                this.createTypesGrid();
            },

            _onFieldChange : function() {
                var repoId = Desktop.defaultRepositoryId;
                var repo = Desktop.getRepository(this.repoId);

                var paramAdmin = {};
                paramAdmin.externalRestServiceUrl = this.externalRestServiceUrl.get('value');

                var etDataArray = [];
                for (i=0; i<this.mstore.data.length; i++) {
                    etDataRow={};
                    etDataRow.id = this.mstore.data[i].id;
                    etDataRow.objectType = this.mstore.data[i].objectType;
                    etDataRow.objectTypeDisplay = this.mstore.data[i].objectTypeDisplay;
                    etDataRow.entryTemplate = this.mstore.data[i].entryTemplate;
                    etDataRow.entryTemplateRO = this.mstore.data[i].entryTemplateRO;
                    etDataRow.uniqueProperty = this.mstore.data[i].uniqueProperty;
                    etDataRow.noNew = this.mstore.data[i].noNew;
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
