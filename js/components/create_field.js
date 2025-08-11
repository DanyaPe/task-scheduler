import format_date from "../format_date.js";

/**
 * Функция создания именованного поля для ввода и хранения данных. Поле формата HTML-элемента "input" вложенного в "label".
 * @param {!string} text - Наименование поля, которое будет отображаться в интерфейсе
 * @param {?string} name - Техническое наименование поля
 * @param {!string} type - Тип данных поля
 * @param {?(string | Date)} value - Значение, которое будет указано в поле
 * @returns {HTMLLabelElement}
 */
function create_field(text, name, type, value) {
    if ((name && !(typeof name === 'string')) || (text && !(typeof text === 'string')) || (type && !(typeof type === 'string'))) {
        console.error(`Указаны некорректные данные при создании поля`);
        return;
    };
    const label = document.createElement('label');
    label.textContent = text;
    let field;
    switch (type) {
        case 'text':
        case 'textarea':
            field = document.createElement('textarea');
            field.rows = '1';
            field.value = value;
            field.addEventListener('input', () => {
                field.style.height = 'auto';
                field.style.height = `${field.scrollHeight}px`;
            });
            break;
        case 'date':
        case 'datetime':
        case 'datetime-local':
            field = document.createElement('input');
            field.type = 'datetime-local';
            field.value = format_date(value);
            break;
        default:
            console.error(`Ошибка при создании поля\nЗначение: ${value}\nТип: ${type}`);
            return;
    };
    field.name = name;
    field.disabled = true;
    label.appendChild(field);
    return label;
}

export default create_field;