const NewTaskList = document.getElementById('new_task_list');
const ResolvedTaskList = document.getElementById('resolved_task_list');
const TaskNameInput = document.getElementById('new_task_name');
const TaskDescriptionInput = document.getElementById('new_task_description');
const TaskStartDateInput = document.getElementById('new_task_start_date');
const TaskEndDateInput = document.getElementById('new_task_end_date');
const CreateNewTaskButton = document.getElementById('create_new_task');
const Storage = localStorage;

class Task {
    constructor(options = {}) {
        const { status, name, description, startDate, endDate, ...other } = options;
        this.status = status || 'Новая';
        this.name = name || 'Без названия';
        this.description = description || '';
        this.startDate = !isNaN(Date.parse(startDate)) ? new Date(startDate) : '' || '';
        this.endDate = !isNaN(Date.parse(endDate)) ? new Date(endDate) : '' || '';
        this.id = document.querySelectorAll('li[id^="task_"]').length > 0 ? `task_${Number(Array.from(document.querySelectorAll('li[id^="task_"]')).at(-1).id.slice(-1)) + 1}` : 'task_1';
        for (let key in other) {
            this[key] = other[key];
        }
    }
}

export { NewTaskList, ResolvedTaskList, TaskNameInput, TaskDescriptionInput, TaskStartDateInput, TaskEndDateInput, CreateNewTaskButton, Storage, Task };