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
    const input = document.createElement('input');
    if (!value || value === undefined) {
        input.type = 'text';
        value = '';
    } else if (value instanceof Date) {
        input.type = 'datetime-local';
        input.value = format_date(value);
    } else {
        input.type = typeof value;
        input.value = value;
    };
    if (id) {
        if (typeof id === 'string') {
            input.id = id;
        } else {
            console.error(`Указание добавочного идентификатора поля должно быть в формате строки:\n${id}\nОшибка при создании поля`);
            return;
        };
    };
    input.disabled = true;
    input.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            input.blur();
        }
    });
    label.appendChild(input);
    return label;
}

export default create_field;