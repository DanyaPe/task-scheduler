import task_resolve_button from "./task_resolve_button.js";
import task_delete_button from "./task_delete_button.js";
import task_edit_button from "./task_edit_button.js";
import task_save_button from "./task_save_button.js";
import task_edit_cancel_button from "./task_edit_cancel_button.js";
import task_reopen_button from "./task_reopen_button.js";
import create_field from "./create_field.js";
import { Storage } from "./data.js";

/**
 * Функция создания задачи в виде объекта с HTML-элементом списка "li", набором полей и кнопок.
 * @param {!object} taskObj - Объект экземпляра "Task"
 * @returns {object}
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
        TaskListElement.buttons.save_button = task_save_button(TaskListElement);
        TaskListElement.buttons.edit_cancel_button = task_edit_cancel_button(TaskListElement);
        TaskListElement.buttons.edit_button = task_edit_button(TaskListElement);
        TaskListElement.buttons.resolve_button = task_resolve_button(TaskListElement);
        TaskListElement.buttons.reopen_button = task_reopen_button(TaskListElement);
        TaskListElement.buttons.delete_button = task_delete_button(TaskListElement);
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