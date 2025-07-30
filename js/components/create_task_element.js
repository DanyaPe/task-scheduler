import task_resolve from "../task/task_resolve.js";
import task_delete from "../task/task_delete.js";
import task_edit from "../task/task_edit.js";
import task_save from "../task/task_save.js";
import task_edit_cancel from "../task/task_edit_cancel.js";
import task_reopen from "../task/task_reopen.js";
import create_field from "./create_field.js";
import create_button from './create_button.js';
import storage_check from "../storage_check.js";
import { Storage, Task } from "../data.js";
//import { onDragStart } from '../drag_and_drop.js';

/**
 * Функция создания задачи в виде HTML-элемента "li" с набором полей и кнопок.
 * @param {Task | string} param - Параметр формирования, объект экземпляра "Task" или идентификатор уже созданной задачи в хранилище
 * @returns {HTMLLIElement}
 */
function create_task_element(param) {
    if (!param || (typeof param !== 'string' && !(param instanceof Object))) {
        throw new Error('Необходимо указать корректный параметр функции');
    } else {
        const TaskListElement = document.createElement('li');
        //TaskListElement.draggable = true;
        let SSTask;
        if (typeof param === 'string') {
            if (Storage.getItem(param) !== null) {
                try {
                    SSTask = new Task(JSON.parse(Storage.getItem(param)));
                    TaskListElement.id = param;
                } catch (error) {
                    throw new Error(`Ошибка формирования задачи по ключу хранилища: ${param}`);
                };
            } else {
                throw new Error(`Не найден элемент задачи в хранилище по ключу ${param}`);
            };
        } else if (param['Дата начала задачи'] && param['Дата окончания задачи'] && param['Дата окончания задачи'] <= param['Дата начала задачи']) {
            alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
            throw new Error('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
        } else {
            SSTask = param;
            TaskListElement.id = SSTask.getId();
            Storage.setItem(TaskListElement.id, JSON.stringify(SSTask));
            storage_check();
        };
        Object.keys(SSTask).forEach((field) => {
            let text;
            switch (field) {
                case 'status':
                    text = 'Статус задачи';
                    break;
                case 'name':
                    text = 'Название задачи';
                    break;
                case 'description':
                    text = 'Описание задачи';
                    break;
                case 'startDate':
                    text = 'Дата начала задачи';
                    break;
                case 'endDate':
                    text = 'Дата окончания задачи';
                    break;
                default:
                    text = field;
                    break;
            };
            TaskListElement.appendChild(create_field({ text: text, name: field, value: SSTask[field] }));
        });
        console.log(SSTask);
        TaskListElement.appendChild(create_button('Сохранить задачу', task_save, TaskListElement.id)).disabled = true;
        TaskListElement.appendChild(create_button('Отменить изменения', task_edit_cancel, TaskListElement.id)).disabled = true;
        TaskListElement.appendChild(create_button('Редактировать задачу', task_edit, TaskListElement.id)).disabled = SSTask.status === 'Решена';
        TaskListElement.appendChild(create_button('Выполнить задачу', task_resolve, TaskListElement.id)).disabled = SSTask.status === 'Решена';
        TaskListElement.appendChild(create_button('Вернуть задачу в работу', task_reopen, TaskListElement.id)).disabled = SSTask.status !== 'Решена';
        TaskListElement.appendChild(create_button('Удалить задачу', task_delete, TaskListElement.id)).disabled = false;
        
        //TaskListElement.addEventListener('dragstart', onDragStart);

        return TaskListElement;
    }
}

export default create_task_element;