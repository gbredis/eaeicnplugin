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
                structure: {
                    objectType: "Item type",
                    objectTypeDisplay: "Item type (display)",
                    entryTemplate: "Entry template (edit)",
                    entryTemplateRO: "Entry template (read)",
                    uniqueProperty: "Unique attribute",
                    noNew: "Don't create"
                }
            },
            desktopsSection: {
                title: "Desktops",
                btnAdd: "Add",
                btnDel: "Delete",
                structure: {
                    desktopId: 'Desktop',
                    commonSearchTemplate: 'Search template',
                    searchTreeJSON: 'Tree JSON',
                    searchViewsJSON: 'Views JSON',
                    exportConfigJSON: 'Export JSON',
                    searchOpen: 'Open search',
                    useDataFilter: 'Use filter'
                }
            },
            externalRestServiceUrl: {
                label: "External REST-Service URL",
                help: "Enter the URL of external helper REST Service"
            }
        }
    }),
    ru: true
});