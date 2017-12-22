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
            structure: {
                objectType: "Тип элемента (внутр.)",
                objectTypeDisplay: "Тип элемента (отобр.)",
                entryTemplate: "Шаблон ввода (редакт.)",
                entryTemplateRO: "Шаблон ввода (чтение)",
                uniqueProperty: "Уникальный атрибут",
                noNew: "Тип элемента (внутр.)"
            }
        },
        desktopsSection: {
            title: "Рабочие столы",
            btnAdd: "Добавить",
            btnDel: "Удалить",
            structure: {
                desktopId: 'Раб. стол',
                commonSearchTemplate: 'Шаблон поиска',
                searchTreeJSON: 'JSON-файл структуры',
                searchViewsJSON: 'JSON-файл представлений',
                exportConfigJSON: 'JSON-файл экспорта',
                searchOpen: 'Откр. поиск',
                useDataFilter: 'Фильтр'
            }
        },
        externalRestServiceUrl: {
            label: "URL внешнего REST-Сервиса",
            help: "Укажите URL вспомогательного внешнего REST-Сервиса"
        }
    }
})