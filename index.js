import { ResolvedTaskDesk, NewTaskDesk, ResolvedTaskList, NewTaskList, OpenModal, Storage, Task } from "./js/data.js";
import { onDragOver, CloseOnDrop, ReopenOnDrop } from './js/drag_and_drop.js';
import create_task_element from "./js/create_task_element.js";
import open_modal from "./js/open_modal.js";

/**
 * Добавляем обработчик для кнопки "Новая задача"
 */
OpenModal.addEventListener('click', () => open_modal());

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