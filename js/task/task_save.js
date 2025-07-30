import { Storage, Task } from "../data.js";
import get_task_element from '../components/get_task_element.js';

/**
 * Функция сохранения текущего состояния задачи
 * @param {!string} taskId - Id элемента задачи
 */
function task_save(taskId) {
    const TaskEl = get_task_element(taskId);
    if (TaskEl.inputs['Дата начала задачи'].value && TaskEl.inputs['Дата окончания задачи'].value && TaskEl.inputs['Дата окончания задачи'].value <= TaskEl.inputs['Дата начала задачи'].value) {
        alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
        return;
    } else {
        const SSTask = new Task(JSON.parse(Storage.getItem(taskId)));
        for (let prop in TaskEl.inputs) {
            SSTask[prop] = TaskEl.inputs[prop].value;
            TaskEl.inputs[prop].disabled = true;
        }
        Storage.setItem(taskId, JSON.stringify(SSTask));
        TaskEl.buttons['Сохранить задачу'].disabled = true;
        TaskEl.buttons['Отменить изменения'].disabled = true;
        TaskEl.buttons['Редактировать задачу'].disabled = false;
        TaskEl.buttons['Выполнить задачу'].disabled = false;
    };
}

export default task_save;