import format_date from "../format_date.js";

/**
 * Функция создания именованного поля для ввода и хранения данных. Поле формата HTML-элемента "input" вложенного в "label".
 * @param {string} name - Наименование поля, будет отображаться как "label"
 * @param {?(string|Date)} value - Значение, которое будет указано в поле
 * @param {?string} id - Идентификатор для поиска поля в документе
 * @returns {HTMLLabelElement}
 */
function create_field(name, value, id) {
    if (!(typeof name === 'string')) {
        console.error(`Указание наименование поля должно быть в формате строки:\n${name}\nОшибка при создании поля`);
        return;
    };
    const label = document.createElement('label');
    label.textContent = name;
    let field;
    if (!value || value === undefined) {
        field = document.createElement('textarea');
        field.rows = '1';
        field.value = '';
        field.addEventListener('input', () => {
            field.style.height = 'auto';
            field.style.height = `${field.scrollHeight}px`;
        });
    } else if (typeof value === 'string') {
        field = document.createElement('textarea');
        field.rows = '1';
        field.value = value;
        field.addEventListener('input', () => {
            field.style.height = 'auto';
            field.style.height = `${field.scrollHeight}px`;
        });
    } else if (value instanceof Date) {
        field = document.createElement('input');
        field.type = 'datetime-local';
        field.value = format_date(value);
    };
    if (id) {
        if (typeof id === 'string') {
            field.id = id;
        } else {
            console.error(`Указание добавочного идентификатора поля должно быть в формате строки:\n${id}\nОшибка при создании поля`);
            return;
        };
    };
    field.disabled = true;
    label.appendChild(field);
    return label;
}

export default create_field;