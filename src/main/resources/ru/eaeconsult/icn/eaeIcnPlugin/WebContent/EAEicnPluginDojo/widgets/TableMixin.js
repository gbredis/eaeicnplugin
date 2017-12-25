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
        "dojo/store/Memory"
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
        Memory
    ) {

        return declare(null, {
            _nls: common,
            data: [],
            mstore: null,
            maxid: 0,

            idProperty: "id",

            createEmptyStore: function () {
                this.mstore = new Memory({data: [], idProperty: this.idProperty});
            },

            addRow: function() {
                if (this.tableGrid && this.tableGrid.structure) {
                    var newItem = {};
                    this.tableGrid.structure.forEach(function (column) {
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
                if (this.tableGrid && this.tableGrid.structure && this.tableGrid.body._focusCellRow) {
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

            setData: function(data) {
                this.mstore.setData(data);
            },

            refreshGrid: function() {
                if (this.tableGrid) {
                    this.tableGrid.model.clearCache();
                    this.tableGrid.setStore(this.mstore);
                    this.tableGrid.body.refresh();
                }
            },

            createGrid: function() {
                if (this.data) {
                    this.mstore.setData(this.data);
                    if (this.tableGrid) {
                        this.refreshGrid();
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
                            onClick: this.delRow.bind(this)
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
                        this.tableGrid.placeAt(this.tablePane);
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
