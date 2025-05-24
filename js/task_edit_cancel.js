import { Storage } from "./data.js";

/**
 * Функция отмены внесенных изменений в задачу
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 */
function task_edit_cancel(taskEl) {
    const SSTask = JSON.parse(Storage.getItem(taskEl.li.id));
    for (let prop in taskEl.properties) {
        taskEl.properties[prop].input.value = SSTask[prop];
        taskEl.properties[prop].input.disabled = true;
    }
    taskEl.buttons['edit_cancel_button'].disabled = true;
    taskEl.buttons['save_button'].disabled = true;
    taskEl.buttons['edit_button'].disabled = false;
    taskEl.buttons['resolve_button'].disabled = false;
}

export default task_edit_cancel;