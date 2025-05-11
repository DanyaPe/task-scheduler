import { NewTaskList, ResolvedTaskList, Storage, Task } from "./data.js";

/**
 * Функция создания кнопки "Закрыть задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_resolve_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else if (!taskEl.li.id || taskEl.li.id === undefined || taskEl.li.id === '') {
        console.error(`Ошибка добавление кнопки "Удалить" к элементу задачи, не задан идентификатор:\n${taskEl}`);
        return;
    } else {      
        const TaskResolveButton = document.createElement('button');
        TaskResolveButton.textContent = 'Закрыть задачу';
        TaskResolveButton.id = `${taskEl.li.id}_resolved_button`;
        
        TaskResolveButton.addEventListener('click', () => {
            const SSTask = new Task(JSON.parse(Storage.getItem(taskEl.li.id)));
            SSTask['Статус задачи'] = 'Решена';
            Storage.setItem(taskEl.li.id, JSON.stringify(SSTask));
            taskEl.properties['Статус задачи'].input.value = 'Решена';
            NewTaskList.removeChild(taskEl.li);
            ResolvedTaskList.appendChild(taskEl.li);
            taskEl.buttons['resolve_button'].disabled = true;
            taskEl.buttons['edit_button'].disabled = true;
            taskEl.buttons['reopen_button'].disabled = false;
        });
        
        return TaskResolveButton;
    }
}

export default task_resolve_button;