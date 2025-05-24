/**
 * Функция перевода задачи в режим редактирования
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 */
function task_edit(taskEl) {
    for (let prop in taskEl.properties) {
        taskEl.properties[prop].input.disabled = false;
    }
    taskEl.buttons['edit_button'].disabled = true;
    taskEl.buttons['save_button'].disabled = false;
    taskEl.buttons['edit_cancel_button'].disabled = false;
    taskEl.buttons['resolve_button'].disabled = true;
}

export default task_edit;