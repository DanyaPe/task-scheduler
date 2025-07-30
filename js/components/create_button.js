/**
 * Функция создания кнопки
 * @param {!string} text - Текст кнопки
 * @param {!function} func - Функция обработчик
 * @param {!string} taskId - Id элемента задачи
 * @returns {HTMLButtonElement}
 */
function create_button(text, func, taskId) {
    if (!(typeof taskId === 'string') || taskId === undefined || taskId === '') {
        console.error(`Ошибка добавление кнопки "${text}" к элементу задачи, не задан идентификатор задачи:\n${taskId}`);
        return;
    } else {      
        const Button = document.createElement('button');
        Button.textContent = text;
        Button.addEventListener('click', () => func(taskId));
        
        return Button;
    }
}

export default create_button;