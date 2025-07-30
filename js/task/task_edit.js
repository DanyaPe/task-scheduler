import get_task_element from '../components/get_task_element.js';

/**
 * Функция перевода задачи в режим редактирования
 * @param {!string} taskId - Id элемента задачи
 */
function task_edit(taskId) {
    const TaskEl = get_task_element(taskId);
    for (let prop in TaskEl.inputs) {
        TaskEl.inputs[prop].disabled = false;
    }
    TaskEl.buttons['Редактировать задачу'].disabled = true;
    TaskEl.buttons['Сохранить задачу'].disabled = false;
    TaskEl.buttons['Отменить изменения'].disabled = false;
    TaskEl.buttons['Выполнить задачу'].disabled = true;
}

export default task_edit;