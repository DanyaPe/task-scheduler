import { ResolvedTaskDesk, NewTaskDesk, ResolvedTaskList, NewTaskList, TaskNameInput, TaskDescriptionInput, TaskStartDateInput, TaskEndDateInput, CreateNewTaskButton, Storage, Task } from "./js/data.js";
import create_task_element from "./js/create_task_element.js";
import { onDragOver, CloseOnDrop, ReopenOnDrop } from './js/drag_and_drop.js';

/**
 * Добавляем обработчик для кнопки "Создать новую задачу"
 */
CreateNewTaskButton.addEventListener('click', () => {
    NewTaskList.appendChild(create_task_element(new Task( {
        'Статус задачи': 'Новая',
        'Название задачи': TaskNameInput.value,
        'Описание задачи': TaskDescriptionInput.value,
        'Дата начала задачи': TaskStartDateInput.value,
        'Дата окончания задачи': TaskEndDateInput.value,
        'Другое поле задачи': 'Дополнительная информация',
    } )));
    TaskNameInput.value = '';
    TaskDescriptionInput.value = '';
    TaskStartDateInput.value = '';
    TaskEndDateInput.value = '';
});

/**
 * Добавляем обработчики на доски (для перетаскивания элементов)
 */
ResolvedTaskDesk.addEventListener('dragover', onDragOver);
ResolvedTaskDesk.addEventListener('drop', CloseOnDrop);
NewTaskDesk.addEventListener('dragover', onDragOver);
NewTaskDesk.addEventListener('drop', ReopenOnDrop);

/**
 * Формируем задачи на досках исходя из данных в localStorage
 */
for (let index = 0; index < Storage.length; index++) {
    try {
        let SSTask = new Task(JSON.parse(Storage.getItem(Storage.key(index))));
        if (SSTask.status !== 'Решена') NewTaskList.appendChild(create_task_element(SSTask));
        else ResolvedTaskList.appendChild(create_task_element(SSTask));
    } catch (error) {
        console.error(`${error}\nНе удалось распарсить данные для формирования задачи по ключу: ${Storage.key(index)}`);
        continue
    };
};