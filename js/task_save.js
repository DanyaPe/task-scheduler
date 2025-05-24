import { Storage, Task } from "./data.js";

/**
 * Функция сохранения текущего состояния задачи
 * @param {!Node} taskEl - HTML-лемент "li" представляющий задачу на одной из досок
 */
function task_save(taskEl) {
    if (taskEl.properties['Дата начала задачи'].input.value && taskEl.properties['Дата окончания задачи'].input.value && taskEl.properties['Дата окончания задачи'].input.value <= taskEl.properties['Дата начала задачи'].input.value) {
        alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
        return;
    } else {
        const SSTask = new Task(JSON.parse(Storage.getItem(taskEl.li.id)));
        for (let prop in taskEl.properties) {
            SSTask[prop] = taskEl.properties[prop].input.value;
            taskEl.properties[prop].input.disabled = true;
        }
        Storage.setItem(taskEl.li.id, JSON.stringify(SSTask));
        taskEl.buttons['save_button'].disabled = true;
        taskEl.buttons['edit_cancel_button'].disabled = true;
        taskEl.buttons['edit_button'].disabled = false;
        taskEl.buttons['resolve_button'].disabled = false;
    };
}

export default task_save;