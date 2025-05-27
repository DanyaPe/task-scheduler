/**
 * Функция создания кнопки
 * @param {!string} taskId - Id элемента задачи
 * @param {!string} text - Текст кнопки
 * @param {!boolean} disabled - Состояние кнопки (активна/неактивна)
 * @param {!function} func - Функция обработчик
 * @returns {HTMLButtonElement}
 */
function create_button(taskId, text, disabled, func) {
    if (!(typeof taskId === 'string') || taskId === undefined || taskId === '') {
        console.error(`Ошибка добавление кнопки "${text}" к элементу задачи, не задан идентификатор задачи:\n${taskId}`);
        return;
    } else {      
        const Button = document.createElement('button');
        Button.textContent = text;
        Button.disabled = disabled;
        Button.addEventListener('click', () => func(taskId));
        
        return Button;
    }
}

export default create_button;