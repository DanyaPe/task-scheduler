import { Storage } from "./data.js";

/**
 * Функция создания кнопки "Отмена" для отката изменений задачи. Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-элемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_edit_cancel_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else {      
        const TaskEditCancelButton = document.createElement('button');
        TaskEditCancelButton.textContent = 'Отмена';
        TaskEditCancelButton.id = `${taskEl.id}_edit_cancel_button`;
        TaskEditCancelButton.disabled = true;
        
        TaskEditCancelButton.addEventListener('click', () => {
            const StatusField = document.getElementById(`${taskEl.id}_status_field`);
            const NameField = document.getElementById(`${taskEl.id}_name_field`);
            const DescriptionField = document.getElementById(`${taskEl.id}_description_field`);
            const StartDateField = document.getElementById(`${taskEl.id}_start_date_field`);
            const EndDateField = document.getElementById(`${taskEl.id}_end_date_field`);
            const SSTask = JSON.parse(Storage.getItem(taskEl.id));
            StatusField.value = SSTask.status;
            StatusField.disabled = true;
            NameField.value = SSTask.name;
            NameField.disabled = true;
            DescriptionField.value = SSTask.description;
            DescriptionField.disabled = true;
            StartDateField.value = SSTask.startDate;
            StartDateField.disabled = true;
            EndDateField.value = SSTask.endDate;
            EndDateField.disabled = true;
            TaskEditCancelButton.hidden = true;
            document.getElementById(`${taskEl.id}_save_button`).disabled = true;
            document.getElementById(`${taskEl.id}_edit_button`).disabled = false;
        });
        
        return TaskEditCancelButton;
    }
}

export default task_edit_cancel_button;