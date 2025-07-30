import format_date from "../format_date.js";

/**
 * Функция создания именованного поля для ввода и хранения данных. Поле формата HTML-элемента "input" вложенного в "label".
 * @param {string} name - Наименование поля, отображается как текст тега "label"
 * @param {?(string | Date)} value - Значение, которое будет указано в поле
 * @returns {HTMLLabelElement}
 */
function create_field({ text = null , name = null, value = null } = {}) {
    if ((name && !(typeof name === 'string')) || (text && !(typeof text === 'string'))) {
        console.error(`Указание наименование и описание поля должно быть в формате строки:\nОшибка при создании поля`);
        return;
    };
    const label = document.createElement('label');
    label.textContent = text;
    let field;
    if (!value || value === undefined) {
        field = document.createElement('textarea');
        field.rows = '1';
        field.value = '';
        field.addEventListener('input', () => {
            field.style.height = 'auto';
            field.style.height = `${field.scrollHeight}px`;
        });
    } else if (value instanceof Date) {
        field = document.createElement('input');
        field.type = 'datetime-local';
        field.value = format_date(value);
    } else if (typeof value === 'string') {
        field = document.createElement('textarea');
        field.rows = '1';
        field.value = value;
        field.addEventListener('input', () => {
            field.style.height = 'auto';
            field.style.height = `${field.scrollHeight}px`;
        });
    } else {
        console.error(`Ошибка при создании поля\n${value}`);
        return;
    };
    field.name = name;
    field.disabled = true;
    label.appendChild(field);
    return label;
}

export default create_field;