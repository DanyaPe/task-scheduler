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
            properties: [],
            buttons: []
        };
        Object.getOwnPropertyNames(taskObj).forEach((property) => {
            switch (property) {
                case 'status':
                    TaskListElement.properties.push(create_field('Статус задачи: ', taskObj[property], `${taskObj.id}_status_field`));
                    break;
                case 'name':
                    TaskListElement.properties.push(create_field('Название задачи: ', taskObj[property], `${taskObj.id}_name_field`));
                    break;
                case 'description':
                    TaskListElement.properties.push(create_field('Описание задачи: ', taskObj[property], `${taskObj.id}_description_field`));
                    break;
                case 'startDate':
                    TaskListElement.properties.push(create_field('Дата начала задачи: ', new Date(taskObj[property]), `${taskObj.id}_start_date_field`));
                    break;
                case 'endDate':
                    TaskListElement.properties.push(create_field('Дата окончания задачи: ', new Date(taskObj[property]), `${taskObj.id}_end_date_field`));
                    break;
                case 'id':
                    TaskListElement.li.id = taskObj.id;
                    break;
                default:
                    TaskListElement.properties.push(create_field(property + ': ', taskObj[property]));
                    break;
            };
        });
        TaskListElement.buttons.push(task_save_button(TaskListElement));
        TaskListElement.buttons.push(task_edit_cancel_button(TaskListElement));
        TaskListElement.buttons.push(task_edit_button(TaskListElement));
        TaskListElement.buttons.push(task_resolve_button(TaskListElement));
        TaskListElement.buttons.push(task_reopen_button(TaskListElement));
        TaskListElement.buttons.push(task_delete_button(TaskListElement));
        for (let field in TaskListElement.properties) {
            TaskListElement.li.appendChild(TaskListElement.properties[field]);
        };
        for (let button in TaskListElement.buttons) {
            TaskListElement.li.appendChild(TaskListElement.buttons[button]);
        };
        Storage.getItem(taskObj.id) !== null ? console.log(`Данные по задаче id=${taskObj.id} уже записаны в sessionStorage, проверьте корректность указанных полей`) : Storage.setItem(taskObj.id, JSON.stringify(taskObj));

        return TaskListElement;
    };
}

export default create_task_element;