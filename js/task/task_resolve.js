import { NewTaskList, ResolvedTaskList, Storage, Task } from "../data.js";
import get_task_element from '../components/get_task_element.js';

/**
 * Функция перевода задачи в статус "Выполнена"
 * @param {!string} taskId - Id элемента задачи
 */
function task_resolve(taskId) {
    const TaskEl = get_task_element(taskId);
    const SSTask = new Task(JSON.parse(Storage.getItem(taskId)));
    SSTask['Статус задачи'] = 'Решена';
    Storage.setItem(taskId, JSON.stringify(SSTask));
    TaskEl.inputs['Статус задачи'].value = 'Решена';
    NewTaskList.removeChild(TaskEl.li);
    ResolvedTaskList.appendChild(TaskEl.li);
    TaskEl.buttons['Выполнить задачу'].disabled = true;
    TaskEl.buttons['Редактировать задачу'].disabled = true;
    TaskEl.buttons['Вернуть задачу в работу'].disabled = false;
}

export default task_resolve;