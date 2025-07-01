const NewTaskList = document.getElementById('new_task_list');
const ResolvedTaskList = document.getElementById('resolved_task_list');
const NewTaskDesk = document.getElementById('new_task_desk');
const ResolvedTaskDesk = document.getElementById('resolved_task_desk');
const OpenModal = document.getElementById('open_modal');
const Storage = localStorage;

/**
 * Класс, представляющий сущность задачи на доске, имеет 5 полей по умолчанию
 * @param "Статус задачи"
 * @param "Название задачи"
 * @param "Описание задачи"
 * @param "Дата начала задачи"
 * @param "Дата окончания задачи"
 */
class Task {
    #id;
    constructor(options = {}) {
        const { ['Статус задачи']: status, ['Название задачи']: name, ['Описание задачи']: description, ['Дата начала задачи']: startDate, ['Дата окончания задачи']: endDate, ...other } = options;
        this['Статус задачи'] = status || 'Новая';
        this['Название задачи'] = name || 'Без названия';
        this['Описание задачи'] = description || '';
        this['Дата начала задачи'] = !isNaN(Date.parse(startDate)) ? new Date(startDate) : new Date('');
        this['Дата окончания задачи'] = !isNaN(Date.parse(endDate)) ? new Date(endDate) : new Date('');
        this.#id = document.querySelectorAll('li[id^="task_"]').length > 0 ? `task_${Number(Array.from(document.querySelectorAll('li[id^="task_"]')).at(-1).id.slice(-1)) + 1}` : 'task_1';
        for (let key in other) {
            this[key] = other[key];
        }
    }
    getId() {
        return this.#id;
    }
}

export { NewTaskDesk, ResolvedTaskDesk, NewTaskList, ResolvedTaskList, OpenModal, Storage, Task };