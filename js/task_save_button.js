import { Storage, Task } from "./data.js";

/**
 * Функция создания кнопки "Сохранить задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-лемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_save_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else if (!taskEl.li.id || taskEl.li.id === undefined || taskEl.li.id === '') {
        console.error(`Ошибка добавление кнопки "Удалить" к элементу задачи, не задан идентификатор:\n${taskEl}`);
        return;
    } else {      
        const TaskSaveButton = document.createElement('button');
        TaskSaveButton.textContent = 'Сохранить задачу';
        TaskSaveButton.id = `${taskEl.li.id}_save_button`;
        TaskSaveButton.disabled = true;
        
        TaskSaveButton.addEventListener('click', () => {
            if (taskEl.properties['Дата начала задачи'].input.value && taskEl.properties['Дата окончания задачи'].input.value && taskEl.properties['Дата окончания задачи'].input.value <= taskEl.properties['Дата начала задачи'].input.value) {
                alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
                return;
            } else {
                const SSTask = new Task(JSON.parse(Storage.getItem(taskEl.li.id)));
                for (let prop in taskEl.properties) {
                    SSTask[prop] = taskEl.properties[prop].input.value;
                    taskEl.properties[prop].input.disabled = true;
                }
                Storage.setItem(taskEl.li.id, JSON.stringify(SSTask));
                TaskSaveButton.disabled = true;
                taskEl.buttons['edit_cancel_button'].disabled = true;
                taskEl.buttons['edit_button'].disabled = false;
            };
        });
        
        return TaskSaveButton;
    }
}

export default task_save_button;