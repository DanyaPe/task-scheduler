import task_resolve_button from "./task_resolve_button.js";
import task_delete_button from "./task_delete_button.js";
import task_edit_button from "./task_edit_button.js";
import task_save_button from "./task_save_button.js";
import task_edit_cancel_button from "./task_edit_cancel_button.js";
import task_reopen_button from "./task_reopen_button.js";
import create_field from "./create_field.js";
import { Storage } from "./data.js";

/**
 * Функция создания задачи в виде HTML-элемента списка "li" с набором полей, в зависимости от наполнения объекта, и кнопками.
 * @param {!object} taskObj - Объект экземпляра "Task"
 * @returns {Node}
 */
function create_task_element(taskObj) {
    if (!taskObj || !(taskObj instanceof Object)) {
        alert(`Переданный тип данных не является объектом "Task":\n${taskObj}\nОшибка при создании элемента списка`);
        return;
    } else if (taskObj.startDate && taskObj.endDate && taskObj.endDate <= taskObj.startDate) {
        alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
        return;
    } else {
        const TaskListElement = document.createElement('li');
        Object.getOwnPropertyNames(taskObj).forEach((property) => {
            switch (property) {
                case 'status':
                    TaskListElement.appendChild(create_field('Статус задачи: ', taskObj[property], `${taskObj.id}_status_field`));
                    break;
                case 'name':
                    TaskListElement.appendChild(create_field('Название задачи: ', taskObj[property], `${taskObj.id}_name_field`));
                    break;
                case 'description':
                    TaskListElement.appendChild(create_field('Описание задачи: ', taskObj[property], `${taskObj.id}_description_field`));
                    break;
                case 'startDate':
                    TaskListElement.appendChild(create_field('Дата начала задачи: ', new Date(taskObj[property]), `${taskObj.id}_start_date_field`));
                    break;
                case 'endDate':
                    TaskListElement.appendChild(create_field('Дата окончания задачи: ', new Date(taskObj[property]), `${taskObj.id}_end_date_field`));
                    break;
                case 'id':
                    TaskListElement.id = taskObj.id;
                    break;
                default:
                    TaskListElement.appendChild(create_field(property + ': ', taskObj[property]));
                    break;
            };
        });
        TaskListElement.appendChild(task_save_button(TaskListElement));
        TaskListElement.appendChild(task_edit_cancel_button(TaskListElement));
        TaskListElement.appendChild(task_edit_button(TaskListElement));
        TaskListElement.appendChild(task_resolve_button(TaskListElement));
        TaskListElement.appendChild(task_reopen_button(TaskListElement));
        TaskListElement.appendChild(task_delete_button(TaskListElement));
        Storage.getItem(taskObj.id) !== null ? console.log(`Данные по задаче id=${taskObj.id} уже записаны в sessionStorage, проверьте корректность указанных полей`) : Storage.setItem(taskObj.id, JSON.stringify(taskObj));

        return TaskListElement;
    };
}

export default create_task_element;