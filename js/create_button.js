/**
 * Функция создания кнопки
 * @param {!Node} taskEl - HTML-элемент "li" представляющий собой задачу на доске
 * @param {!string} text - Текст кнопки
 * @param {!boolean} disabled - Состояние кнопки (активна/неактивна)
 * @param {!function} func - Функция обработчик
 * @returns {HTMLButtonElement}
 */
function create_button(taskEl, text, disabled, func) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки ${text} к элементу задачи, сущность задачи не определена:\n${taskEl}`);
        return;
    } else if (!taskEl.li.id || taskEl.li.id === undefined || taskEl.li.id === '') {
        console.error(`Ошибка добавление кнопки ${text} к элементу задачи, не задан идентификатор задачи:\n${taskEl}`);
        return;
    } else {      
        const Button = document.createElement('button');
        Button.textContent = text;
        Button.id = `${taskEl.li.id}_${text}`;
        Button.disabled = disabled;
        Button.addEventListener('click', () => func(taskEl));
        
        return Button;
    }
}

export default create_button;