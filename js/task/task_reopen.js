import { ResolvedTaskList, NewTaskList, Storage, Task } from '../data.js';
import get_task_element from '../components/get_task_element.js';

/**
 * Функция переоткрытия задачи
 * @param {!string} taskId - Id элемента задачи
 */
function task_reopen(taskId) {
    const TaskEl = get_task_element(taskId);
    const SSTask = new Task(JSON.parse(Storage.getItem(taskId)));
    SSTask['Статус задачи'] = 'Возвращена в работу';
    Storage.setItem(taskId, JSON.stringify(SSTask));
    TaskEl.inputs['Статус задачи'].value = 'Возвращена в работу';
    ResolvedTaskList.removeChild(TaskEl.li);
    NewTaskList.appendChild(TaskEl.li);
    TaskEl.buttons['Выполнить задачу'].disabled = false;
    TaskEl.buttons['Редактировать задачу'].disabled = false;
    TaskEl.buttons['Удалить задачу'].disabled = false;
    TaskEl.buttons['Вернуть задачу в работу'].disabled = true;
}

export default task_reopen;