define({
    root: ({
        desktopTabLabel: "Desktop",
        configPane: {
            genericSection: {
                title: "Generic settings"
            },
            entryTemplatesSection: {
                title: "Entry templates",
                btnAdd: "Add",
                btnDel: "Delete",
                structure: [
                    {
                        id: "objectType",
                        field: "objectType",
                        name: "Item type",
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "objectTypeDisplay",
                        field: "objectTypeDisplay",
                        name: "Item type (display)",
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "entryTemplate",
                        field: "entryTemplate",
                        name: "Entry template (edit)",
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "entryTemplateRO",
                        field: "entryTemplateRO",
                        name: "Entry template (read)",
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "uniqueProperty",
                        field: "uniqueProperty",
                        name: "Unique attribute",
                        editable: true,
                        alwaysEditing: true
                    },
                    {
                        id: "noNew",
                        field: "noNew",
                        name: "Don't create",
                        editable: true,
                        alwaysEditing: true,
                        editor: "dijit.form.CheckBox"
                    }
                ]
            },
            externalRestServiceUrl: {
                label: "External REST-Service URL",
                help: "Enter the URL of external helper REST Service"
            }
        }
    }),
    ru: true
});