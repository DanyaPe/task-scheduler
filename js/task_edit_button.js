/**
 * Функция создания кнопки "Редактировать задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_edit_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else {      
        const TaskEditButton = document.createElement('button');
        TaskEditButton.textContent = 'Редактировать задачу';
        TaskEditButton.id = `${taskEl.id}_edit_button`;
        
        TaskEditButton.addEventListener('click', () => {
            document.querySelectorAll(`#${taskEl.id} input`).forEach((el) => {
                el.disabled = false;
            });
            TaskEditButton.disabled = true;
            document.getElementById(`${taskEl.id}_save_button`).disabled = false;
            document.getElementById(`${taskEl.id}_edit_cancel_button`).disabled = false;
        });
        
        return TaskEditButton;
    }
}

export default task_edit_button;