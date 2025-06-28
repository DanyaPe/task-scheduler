import format_date from "./format_date.js";
import task_save from "./task_save.js";

/**
 * Функция создания именованного поля для ввода и хранения данных. Поле формата HTML-элемента "input" вложенного в "label".
 * @param {!string} text - Наименование поля, будет отображаться как "label"
 * @param {?(string|Date)} value - Значение, которое будет указано в поле
 * @param {?string} id - Идентификатор для поиска поля в документе
 * @returns {HTMLLabelElement}
 */
function create_field(text, value, id) {
    if (!(typeof text === 'string')) {
        console.error(`Указание наименование поля должно быть в формате строки:\n${text}\nОшибка при создании поля`);
        return;
    };
    const label = document.createElement('label');
    label.textContent = text;
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
        if(event.keyCode == 13) { // 13 код клавиши - Enter, при нажатии с элемента будет уходить фокус
            input.blur();
        }
    });
    label.appendChild(input);
    return label;
}

export default create_field;