import { ResolvedTaskList, NewTaskList, Storage } from './data.js';

/**
 * Функция создания кнопки "Вернуть в работу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node} 
 */
function task_reopen_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else {      
        const TaskReopenButton = document.createElement('button');
        TaskReopenButton.textContent = 'Вернуть задачу в работу';
        TaskReopenButton.id = `${taskEl.id}_reopen_button`;
        TaskReopenButton.disabled = true;
        
        TaskReopenButton.addEventListener('click', () => {
            const SSTask = JSON.parse(Storage.getItem(taskEl.id));
            SSTask.status = 'Возвращена в работу';
            Storage.setItem(taskEl.id, JSON.stringify(SSTask));
            document.getElementById(`${taskEl.id}_status_field`).value = 'Возвращена в работу';
            ResolvedTaskList.removeChild(taskEl);
            NewTaskList.appendChild(taskEl);
            document.getElementById(`${taskEl.id}_resolved_button`).disabled = false;
            document.getElementById(`${taskEl.id}_edit_button`).disabled = false;
            document.getElementById(`${taskEl.id}_delete_button`).disabled = false;
            TaskReopenButton.disabled = true;
        });
        
        return TaskReopenButton;
    }
}

export default task_reopen_button;