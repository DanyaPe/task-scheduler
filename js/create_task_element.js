import task_resolve from "./task_resolve.js";
import task_delete from "./task_delete.js";
import task_edit from "./task_edit.js";
import task_save from "./task_save.js";
import task_edit_cancel from "./task_edit_cancel.js";
import task_reopen from "./task_reopen.js";
import create_field from "./create_field.js";
import { Storage } from "./data.js";
import create_button from './create_button.js';

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
        const TaskListElement = { 
            li: document.createElement('li'),
            properties: {},
            buttons: {}
        };
        TaskListElement.li.id = taskObj.getId();
        Object.keys(taskObj).forEach((key) => {
            TaskListElement.properties[key] = create_field(key + ': ', taskObj[key]);
        });
        TaskListElement.buttons.save_button = create_button(TaskListElement, 'Сохранить задачу', true, task_save);
        TaskListElement.buttons.edit_cancel_button = create_button(TaskListElement, 'Отменить изменения', true, task_edit_cancel);
        TaskListElement.buttons.edit_button = create_button(TaskListElement, 'Редактировать задачу', false, task_edit);
        TaskListElement.buttons.resolve_button = create_button(TaskListElement, 'Выполнить задачу', false, task_resolve);
        TaskListElement.buttons.reopen_button = create_button(TaskListElement, 'Переоткрыть задачу', true, task_reopen);
        TaskListElement.buttons.delete_button = create_button(TaskListElement, 'Удалить задачу', false, task_delete);
        for (let field in TaskListElement.properties) {
            TaskListElement.li.appendChild(TaskListElement.properties[field].label);
        };
        for (let button in TaskListElement.buttons) {
            TaskListElement.li.appendChild(TaskListElement.buttons[button]);
        };
        Storage.getItem(TaskListElement.li.id) !== null ? console.log(`Данные по задаче id=${TaskListElement.li.id} уже записаны в sessionStorage, проверьте корректность указанных полей`) : Storage.setItem(TaskListElement.li.id, JSON.stringify(taskObj));
        
        return TaskListElement;
    };
}

export default create_task_element;