define([
        "dojo/_base/lang",
        "dojo/_base/declare",
        "dojo/i18n!../nls/common",
        "ecm/model/Desktop",
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
        "dijit/layout/ContentPane"
    ],
    function(
        lang,
        declare,
        common,
        Desktop,
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
        ContentPane
    ) {

        return declare(null, {
            _nls: common,
            data: [],
            mstore: null,
            maxid: 0,
            structure: null,

            idProperty: "id",

            createEmptyStore: function () {
                this.mstore = new Memory({data: [], idProperty: this.idProperty});
            },

            addRow: function() {
                if (this.tableGrid && this.structure) {
                    var newItem = {};
                    this.structure.forEach(function (column) {
                        newItem[column.id] = "";
                    }, this);
                    newItem.id = this.maxid+1;
                    this.mstore.add(newItem);
                    this.tableGrid.model.clearCache();
                    this.tableGrid.setStore(this.mstore);
                    this._onFieldChange();
                    this.maxid++;
                }
            },

            delRow: function() {
                if (this.structure && this.tableGrid && this.tableGrid.body._focusCellRow) {
                    var row = this.tableGrid.body._focusCellRow;
                    if (row) {
                        var id = row;
                        this.mstore.remove(id);
                        this.tableGrid.model.clearCache();
                        this.tableGrid.setStore(this.mstore);
                        this._onFieldChange();
                    }
                }
            },

            createGrid: function() {
                if (this.data) {
                    this.mstore.setData(this.data);
                    if (this.tableGrid) {
                        this.tableGrid.model.clearCache();
                        this.tableGrid.setStore(this.mstore);
                        this.tableGrid.body.refresh();
                    } else {
                        var toolbar = new Toolbar({}, "toolbar");
                        var addButton = new Button({
                            label: common.configPane.entryTemplatesSection.btnAdd,
                            iconClass: "dijitIconNewTask",
                            onClick: lang.hitch(this, this.addRow)
                        });
                        var delButton = new Button({
                            label: common.configPane.entryTemplatesSection.btnDel,
                            iconClass: "dijitIconDelete",
                            onClick: lang.hitch(this, this.delRow)
                        });
                        toolbar.addChild(addButton);
                        toolbar.addChild(delButton);
                        toolbar.startup();
                        this.tableGrid = new Grid({
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
                            structure:  this.getStructure(),
                            modules: [
                                CellWidget,
                                Edit,
                                SelectRow,
                                Bar
                            ]
                        })
                        this.tableGrid.edit.connect(this.tableGrid.edit, "onApply", lang.hitch(this, function(){
                            this._onFieldChange();
                        }))
                        for (i=0; i<this.data.length; i++) {
                            this.maxid = (this.data[i].id > this.maxid) ? this.data[i].id : this.maxid;
                        };
                        this.tableGrid.startup();
                        this.tableGrid.body.refresh();
                        this.tablePane.addChild(this.tableGrid);
                    }
                }
            },

            getStructure: function() {
                return [];
            },

            _onFieldChange: function() {
            }

        });
    });
