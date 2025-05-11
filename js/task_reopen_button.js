import { ResolvedTaskList, NewTaskList, Storage, Task } from './data.js';

/**
 * Функция создания кнопки "Вернуть в работу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node} 
 */
function task_reopen_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else if (!taskEl.li.id || taskEl.li.id === undefined || taskEl.li.id === '') {
        console.error(`Ошибка добавление кнопки "Удалить" к элементу задачи, не задан идентификатор:\n${taskEl}`);
        return;
    } else {      
        const TaskReopenButton = document.createElement('button');
        TaskReopenButton.textContent = 'Вернуть задачу в работу';
        TaskReopenButton.id = `${taskEl.li.id}_reopen_button`;
        TaskReopenButton.disabled = true;
        
        TaskReopenButton.addEventListener('click', () => {
            const SSTask = new Task(JSON.parse(Storage.getItem(taskEl.li.id)));
            SSTask['Статус задачи'] = 'Возвращена в работу';
            Storage.setItem(taskEl.li.id, JSON.stringify(SSTask));
            taskEl.properties['Статус задачи'].input.value = 'Возвращена в работу';
            ResolvedTaskList.removeChild(taskEl.li);
            NewTaskList.appendChild(taskEl.li);
            taskEl.buttons['resolve_button'].disabled = false;
            taskEl.buttons['edit_button'].disabled = false;
            taskEl.buttons['delete_button'].disabled = false;
            TaskReopenButton.disabled = true;
        });
        
        return TaskReopenButton;
    }
}

export default task_reopen_button;