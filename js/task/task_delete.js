import get_task_element from '../get_task_element.js';
import { Storage } from '../data.js';

/**
 * Функция удаления задачи из списка
 * @param {!string} taskId - Id элемента задачи
 */
function task_delete(taskId) {
    const TaskEl = get_task_element(taskId);
    TaskEl.li.parentElement.removeChild(TaskEl.li);
    Storage.getItem(taskId) === null ? console.warn(`Данные по задаче id=${taskId} отсутствуют в хранилище, проверьте корректность указанных данных`) : Storage.removeItem(taskId);
}

export default task_delete;