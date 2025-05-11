import { ResolvedTaskList, NewTaskList, TaskNameInput, TaskDescriptionInput, TaskStartDateInput, TaskEndDateInput, CreateNewTaskButton, Storage, Task } from "./js/data.js";
import create_task_element from "./js/create_task_element.js";

/**
 * Добавляем обработчик для кнопки "Создать новую задачу"
 */
CreateNewTaskButton.addEventListener('click', () => {
    const NewTask = new Task( {
        'Статус задачи': 'Новая',
        'Название задачи': TaskNameInput.value,
        'Описание задачи': TaskDescriptionInput.value,
        'Дата начала задачи': TaskStartDateInput.value,
        'Дата окончания задачи': TaskEndDateInput.value,
        'Другое поле задачи': 'Дополнительная информация',
    } );
    NewTaskList.appendChild(create_task_element(NewTask).li);
    TaskNameInput.value = '';
    TaskDescriptionInput.value = '';
    TaskStartDateInput.value = '';
    TaskEndDateInput.value = '';
});

/**
 * Формируем задачи на досках исходя из данных в localStorage
 */
for (let index = 0; index < Storage.length; index++) {
    try {
        let SSTask = new Task(JSON.parse(Storage.getItem(Storage.key(index))));
        if (SSTask.status !== 'Решена') NewTaskList.appendChild(create_task_element(SSTask).li);
        else ResolvedTaskList.appendChild(create_task_element(SSTask).li);
    } catch (error) {
        console.error(`${error}\nНе удалось распарсить данные для формирования задачи по ключу: ${Storage.key(index)}`);
        continue
    };
};