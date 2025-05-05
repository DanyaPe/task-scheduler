import { NewTaskList, ResolvedTaskList, Storage } from "./data.js";

/**
 * Функция создания кнопки "Закрыть задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_resolve_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else {      
        const TaskResolveButton = document.createElement('button');
        TaskResolveButton.textContent = 'Закрыть задачу';
        TaskResolveButton.id = `${taskEl.id}_resolved_button`;
        
        TaskResolveButton.addEventListener('click', () => {
            const SSTask = JSON.parse(Storage.getItem(taskEl.id));
            SSTask.status = 'Решена';
            Storage.setItem(taskEl.id, JSON.stringify(SSTask));
            document.getElementById(`${taskEl.id}_status_field`).value = 'Решена';
            NewTaskList.removeChild(taskEl);
            ResolvedTaskList.appendChild(taskEl);
            document.getElementById(`${taskEl.id}_resolved_button`).disabled = true;
            document.getElementById(`${taskEl.id}_edit_button`).disabled = true;
            document.getElementById(`${taskEl.id}_reopen_button`).disabled = false;
        });
        
        return TaskResolveButton;
    }
}

export default task_resolve_button;