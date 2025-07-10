const NewTaskList = document.getElementById('new_task_list');
const ResolvedTaskList = document.getElementById('resolved_task_list');
const NewTaskDesk = document.getElementById('new_task_desk');
const ResolvedTaskDesk = document.getElementById('resolved_task_desk');
const OpenModal = document.getElementById('open_modal');
const SortSelect = document.getElementById('sort');
const Storage = localStorage;

/**
 * Класс, представляющий сущность задачи на доске, имеет 5 полей по умолчанию
 * @param {?string} "Статус задачи"
 * @param {?string} "Название задачи"
 * @param {?string} "Описание задачи"
 * @param {?string} "Дата начала задачи"
 * @param {?string} "Дата окончания задачи"
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
        for (let key in other) {
            this[key] = other[key];
        }
    }
    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }
}

export { NewTaskDesk, ResolvedTaskDesk, NewTaskList, ResolvedTaskList, OpenModal, Storage, SortSelect, Task };