import { Storage } from "./data.js";

/**
 * Функция создания кнопки "Отмена" для отката изменений задачи. Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_edit_cancel_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else if (!taskEl.li.id || taskEl.li.id === undefined || taskEl.li.id === '') {
        console.error(`Ошибка добавление кнопки "Удалить" к элементу задачи, не задан идентификатор:\n${taskEl}`);
        return;
    } else {      
        const TaskEditCancelButton = document.createElement('button');
        TaskEditCancelButton.textContent = 'Отмена';
        TaskEditCancelButton.id = `${taskEl.li.id}_edit_cancel_button`;
        TaskEditCancelButton.disabled = true;
        
        TaskEditCancelButton.addEventListener('click', () => {
            const SSTask = JSON.parse(Storage.getItem(taskEl.li.id));
            for (let prop in taskEl.properties) {
                taskEl.properties[prop].input.value = SSTask[prop];
                taskEl.properties[prop].input.disabled = true;
            }
            TaskEditCancelButton.disabled = true;
            taskEl.buttons['save_button'].disabled = true;
            taskEl.buttons['edit_button'].disabled = false;
            taskEl.buttons['resolve_button'].disabled = false;
        });
        
        return TaskEditCancelButton;
    }
}

export default task_edit_cancel_button;