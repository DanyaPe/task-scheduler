import { Storage } from "./data.js";

/**
 * Функция создания кнопки "Сохранить задачу". Используется для добавления кнопки в HTML-элемент "li", который представляет сущность задачи на доске. Для определение к какой задаче добавить кнопку используется идентификатор задачи "id".
 * @param {!Node} taskEl - HTML-лемент "li" представляющий задачу на одной из досок
 * @returns {Node}
 */
function task_save_button(taskEl) {
    if (!taskEl || !(taskEl instanceof Object)) {
        console.error(`Ошибка добавление кнопки "Редактировать" к элементу задачи:\n${taskEl}`);
        return;
    } else {      
        const TaskSaveButton = document.createElement('button');
        TaskSaveButton.textContent = 'Сохранить задачу';
        TaskSaveButton.id = `${taskEl.id}_save_button`;
        TaskSaveButton.disabled = true;
        
        TaskSaveButton.addEventListener('click', () => {
            const StatusField = document.getElementById(`${taskEl.id}_status_field`);
            const NameField = document.getElementById(`${taskEl.id}_name_field`);
            const DescriptionField = document.getElementById(`${taskEl.id}_description_field`);
            const StartDateField = document.getElementById(`${taskEl.id}_start_date_field`);
            const EndDateField = document.getElementById(`${taskEl.id}_end_date_field`);
            if (StartDateField.value && EndDateField.value && EndDateField.value <= StartDateField.value) {
                alert('Значение поля "Дата выполнения задачи" должно быть больше значения поля "Дата начала задачи"');
                return;
            } else {
                const SSTask = JSON.parse(Storage.getItem(taskEl.id));
                SSTask.status = StatusField.value;
                SSTask.name = NameField.value;
                SSTask.description = DescriptionField.value;
                SSTask.startDate = StartDateField.value;
                SSTask.endDate = EndDateField.value;
                Storage.setItem(taskEl.id, JSON.stringify(SSTask));
                document.querySelectorAll(`#${taskEl.id} input`).forEach((el) => {
                    el.disabled = true;
                });
                TaskSaveButton.disabled = true;
                document.getElementById(`${taskEl.id}_edit_cancel_button`).disabled = true;
                document.getElementById(`${taskEl.id}_edit_button`).disabled = false;
            };
        });
        
        return TaskSaveButton;
    }
}

export default task_save_button;