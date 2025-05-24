import { Storage } from './data.js';

/**
 * Функция удаления задачи из списка
 * @param {!Node} taskEl - HTML-элемент "li" представляющий собой задачу на доске
 */
function task_delete(taskEl) {
    taskEl.li.parentElement.removeChild(taskEl.li);
    Storage.getItem(taskEl.li.id) === null ? console.log(`Данные по задаче id=${taskEl.li.id} отсутствуют в sessionStorage, проверьте корректность указанных данных`) : Storage.removeItem(taskEl.li.id);
}

export default task_delete;