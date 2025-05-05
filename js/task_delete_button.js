import { Storage } from "./data.js";

/**
 * Функция создания кнопки "Удалить задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий собой задачу на доске
 * @returns {Node}
 */
function task_delete_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Удалить" к элементу задачи:\n${taskEl}`);
        return;
    } else {
        const TaskDeleteButton = document.createElement('button');
        TaskDeleteButton.textContent = 'Удалить задачу';
        TaskDeleteButton.id = `${taskEl.id}_delete_button`;
        
        TaskDeleteButton.addEventListener('click', () => {
            taskEl.parentElement.removeChild(taskEl);
            Storage.getItem(taskEl.id) === null ? console.log(`Данные по задаче id=${taskEl.id} отсутствуют в sessionStorage, проверьте корректность указанных данных`) : Storage.removeItem(taskEl.id);
        });
        
        return TaskDeleteButton;
    }
}

export default task_delete_button;