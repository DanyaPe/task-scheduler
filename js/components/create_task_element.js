import task_resolve from "../task/task_resolve.js";
import task_delete from "../task/task_delete.js";
import task_edit from "../task/task_edit.js";
import task_save from "../task/task_save.js";
import task_edit_cancel from "../task/task_edit_cancel.js";
import task_reopen from "../task/task_reopen.js";
import create_field from "./create_field.js";
import create_button from './create_button.js';
import { Storage } from "../data.js";
import { onDragStart } from '../drag_and_drop.js';

/**
 * Функция создания задачи в виде объекта с HTML-элементом списка "li", набором полей и кнопок.
 * @param {!object} taskObj - Объект экземпляра "Task"
 * @returns {Node}
 */
function create_task_element(taskObj) {
    if (!taskObj || !(taskObj instanceof Object)) {
        alert(`Переданный тип данных не является объектом "Task":\n${taskObj}\nОшибка при создании элемента списка`);
        return;
    } else if (taskObj['Дата начала задачи'] && taskObj['Дата окончания задачи'] && taskObj['Дата окончания задачи'] <= taskObj['Дата начала задачи']) {
        alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
        return;
    } else {
        const TaskListElement = document.createElement('li');
        TaskListElement.id = taskObj.getId();
        TaskListElement.draggable = true;
        Object.keys(taskObj).forEach((key) => {
            TaskListElement.appendChild(create_field(key, taskObj[key]));
        });
        TaskListElement.appendChild(create_button(TaskListElement.id, 'Сохранить задачу', true, task_save));
        TaskListElement.appendChild(create_button(TaskListElement.id, 'Отменить изменения', true, task_edit_cancel));
        TaskListElement.appendChild(create_button(TaskListElement.id, 'Редактировать задачу', taskObj['Статус задачи'] === 'Решена', task_edit));
        TaskListElement.appendChild(create_button(TaskListElement.id, 'Выполнить задачу', taskObj['Статус задачи'] === 'Решена', task_resolve));
        TaskListElement.appendChild(create_button(TaskListElement.id, 'Вернуть задачу в работу', taskObj['Статус задачи'] !== 'Решена', task_reopen));
        TaskListElement.appendChild(create_button(TaskListElement.id, 'Удалить задачу', false, task_delete));
        TaskListElement.addEventListener('dragstart', onDragStart);
        Storage.getItem(TaskListElement.id) !== null ? console.warn(`Внимание: Данные по задаче ${TaskListElement.id} уже записаны в хранилище, проверьте корректность данных`) : Storage.setItem(TaskListElement.id, JSON.stringify(taskObj));
        return TaskListElement;
    };
}

export default create_task_element;