/**
 * Функция создания кнопки "Редактировать задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_edit_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else if (!taskEl.li.id || taskEl.li.id === undefined || taskEl.li.id === '') {
        console.error(`Ошибка добавление кнопки "Удалить" к элементу задачи, не задан идентификатор:\n${taskEl}`);
        return;
    } else {      
        const TaskEditButton = document.createElement('button');
        TaskEditButton.textContent = 'Редактировать задачу';
        TaskEditButton.id = `${taskEl.li.id}_edit_button`;
        
        TaskEditButton.addEventListener('click', () => {
            for (let prop in taskEl.properties) {
                taskEl.properties[prop].input.disabled = false;
            }
            TaskEditButton.disabled = true;
            taskEl.buttons['save_button'].disabled = false;
            taskEl.buttons['edit_cancel_button'].disabled = false;
        });
        
        return TaskEditButton;
    }
}

export default task_edit_button;