import get_task_element from './get_task_element.js';
import { Storage } from "./data.js";

/**
 * Функция отмены внесенных изменений в задачу
 * @param {!string} taskId - Id элемента задачи
 */
function task_edit_cancel(taskId) {
    const TaskEl = get_task_element(taskId);
    const SSTask = JSON.parse(Storage.getItem(taskId));
    for (let prop in TaskEl.inputs) {
        TaskEl.inputs[prop].value = SSTask[prop];
        TaskEl.inputs[prop].disabled = true;
    }
    TaskEl.buttons['Отменить изменения'].disabled = true;
    TaskEl.buttons['Сохранить задачу'].disabled = true;
    TaskEl.buttons['Редактировать задачу'].disabled = false;
    TaskEl.buttons['Выполнить задачу'].disabled = false;
}

export default task_edit_cancel;