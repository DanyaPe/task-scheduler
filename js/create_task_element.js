import task_resolve_button from "./task_resolve_button.js";
import task_delete_button from "./task_delete_button.js";
import task_edit_button from "./task_edit_button.js";
import task_save_button from "./task_save_button.js";
import task_edit_cancel_button from "./task_edit_cancel_button.js";
import task_reopen_button from "./task_reopen_button.js";
import create_field from "./create_field.js";
import { Storage } from "./data.js";

/**
 * Функция создания задачи в виде объекта с HTML-элементом списка "li", набором полей, и кнопками.
 * @param {!object} taskObj - Объект экземпляра "Task"
 * @returns {object}
 */
function create_task_element(taskObj) {
    if (!taskObj || !(taskObj instanceof Object)) {
        alert(`Переданный тип данных не является объектом "Task":\n${taskObj}\nОшибка при создании элемента списка`);
        return;
    } else if (taskObj.startDate && taskObj.endDate && taskObj.endDate <= taskObj.startDate) {
        alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
        return;
    } else {
        const TaskListElement = { 
            li: document.createElement('li'),
            properties: {},
            buttons: {}
        };
        Object.keys(taskObj).forEach((key) => {
            switch (key) {
                case 'id':
                    TaskListElement.li.id = taskObj.id;
                    break;
                case 'status':
                    TaskListElement.properties.status = create_field('Статус задачи: ', taskObj[key], `${taskObj.id}_status_field`);
                    break;
                case 'name':
                    TaskListElement.properties.name = create_field('Название задачи: ', taskObj[key], `${taskObj.id}_name_field`);
                    break;
                case 'description':
                    TaskListElement.properties.description = create_field('Описание задачи: ', taskObj[key], `${taskObj.id}_description_field`);
                    break;
                case 'startDate':
                    TaskListElement.properties.startDate = create_field('Дата начала задачи: ', new Date(taskObj[key]), `${taskObj.id}_start_date_field`);
                    break;
                case 'endDate':
                    TaskListElement.properties.endDate = create_field('Дата окончания задачи: ', new Date(taskObj[key]), `${taskObj.id}_end_date_field`);
                    break;
                default:
                    TaskListElement.properties[key] = create_field(key + ': ', taskObj[key]);
                    break;
            };
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
        Storage.getItem(taskObj.id) !== null ? console.log(`Данные по задаче id=${taskObj.id} уже записаны в sessionStorage, проверьте корректность указанных полей`) : Storage.setItem(taskObj.id, JSON.stringify(taskObj));
        console.log(TaskListElement)
        return TaskListElement;
    };
}

export default create_task_element;