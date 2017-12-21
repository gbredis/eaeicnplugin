define({
    desktopTabLabel: "Рабочий стол",
    configPane: {
        genericSection: {
            title: "Общие настройки"
        },
        entryTemplatesSection: {
            title: "Шаблоны ввода",
            btnAdd: "Добавить",
            btnDel: "Удалить",
            structure: [
                {
                    id: "objectType",
                    field: "objectType",
                    name: "Тип элемента (внутр.)",
                    editable: true,
                    alwaysEditing: true
                },
                {
                    id: "objectTypeDisplay",
                    field: "objectTypeDisplay",
                    name: "Тип элемента (отобр.)",
                    editable: true,
                    alwaysEditing: true
                },
                {
                    id: "entryTemplate",
                    field: "entryTemplate",
                    name: "Шаблон ввода (редакт.)",
                    editable: true,
                    alwaysEditing: true
                },
                {
                    id: "entryTemplateRO",
                    field: "entryTemplateRO",
                    name: "Шаблон ввода (чтение)",
                    editable: true,
                    alwaysEditing: true
                },
                {
                    id: "uniqueProperty",
                    field: "uniqueProperty",
                    name: "Уникальный атрибут",
                    editable: true,
                    alwaysEditing: true
                },
                {
                    id: "noNew",
                    field: "noNew",
                    name: "Тип элемента (внутр.)",
                    editable: true,
                    alwaysEditing: true,
                    editor: "dijit.form.CheckBox"
                }
            ]
        },
        externalRestServiceUrl: {
            label: "URL внешнего REST-Сервиса",
            help: "Укажите URL вспомогательного внешнего REST-Сервиса"
        }
    }
})