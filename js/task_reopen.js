import { ResolvedTaskList, NewTaskList, Storage, Task } from './data.js';

/**
 * Функция переоткрытия задачи
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 */
function task_reopen(taskEl) {
    const SSTask = new Task(JSON.parse(Storage.getItem(taskEl.li.id)));
    SSTask['Статус задачи'] = 'Возвращена в работу';
    Storage.setItem(taskEl.li.id, JSON.stringify(SSTask));
    taskEl.properties['Статус задачи'].input.value = 'Возвращена в работу';
    ResolvedTaskList.removeChild(taskEl.li);
    NewTaskList.appendChild(taskEl.li);
    taskEl.buttons['resolve_button'].disabled = false;
    taskEl.buttons['edit_button'].disabled = false;
    taskEl.buttons['delete_button'].disabled = false;
    taskEl.buttons['reopen_button'].disabled = true;
}

export default task_reopen;