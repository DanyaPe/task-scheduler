import get_task_element from '../components/get_task_element.js';
import storage_check from '../storage_check.js';
import { Storage } from '../data.js';

/**
 * Функция удаления задачи из списка
 * @param {!string} taskId - Id элемента задачи
 */
function task_delete(taskId) {
    const TaskEl = get_task_element(taskId);
    TaskEl.li.parentElement.removeChild(TaskEl.li);
    if (Storage.getItem(taskId) === null) {
        console.warn(`Данные по задаче id=${taskId} отсутствуют в хранилище, проверьте корректность указанных данных`);
    } else {
        Storage.removeItem(taskId);
        storage_check();
    };
}

export default task_delete;