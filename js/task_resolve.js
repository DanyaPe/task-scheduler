import { NewTaskList, ResolvedTaskList, Storage, Task } from "./data.js";

/**
 * Функция перевода задачи в статус "Выполнена"
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 */
function task_resolve(taskEl) {
    const SSTask = new Task(JSON.parse(Storage.getItem(taskEl.li.id)));
    SSTask['Статус задачи'] = 'Решена';
    Storage.setItem(taskEl.li.id, JSON.stringify(SSTask));
    taskEl.properties['Статус задачи'].input.value = 'Решена';
    NewTaskList.removeChild(taskEl.li);
    ResolvedTaskList.appendChild(taskEl.li);
    taskEl.buttons['resolve_button'].disabled = true;
    taskEl.buttons['edit_button'].disabled = true;
    taskEl.buttons['reopen_button'].disabled = false;
}

export default task_resolve;