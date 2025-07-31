const NewTaskList = document.getElementById('new_task_list');
const ResolvedTaskList = document.getElementById('resolved_task_list');
const NewTaskDesk = document.getElementById('new_task_desk');
const ResolvedTaskDesk = document.getElementById('resolved_task_desk');
const OpenModal = document.getElementById('open_modal');
const SortSelect = document.getElementById('sort');
const Storage = localStorage;

/**
 * Класс, представляющий сущность задачи на доске, имеет 5 атрибутов по умолчанию
 * @param {?string} id - Идентификатор задачи
 * @param {?string} status - Статус задачи
 * @param {?string} name - Название задачи
 * @param {?string} description - Описание задачи
 * @param {?string} startDate - Дата начала задачи
 * @param {?string} endDate - Дата окончания задачи
 */
class Task {
    #id;

    constructor({ id, status, name, description, startDate, endDate, ...other } = {}) {
        this.status = status || 'Новая';
        this.name = name || 'Без названия';
        this.description = description || '';
        this.startDate = !isNaN(Date.parse(startDate)) ? new Date(startDate) : new Date();
        this.endDate = !isNaN(Date.parse(endDate)) ? new Date(endDate) : new Date('');
        for (let key in other) {
            this[key] = other[key];
        }
        if (id && typeof id === 'string') this.#id = id;
        else {
            if (Storage.length > 0) {
                this.#id = `task_${Number(Storage.key(Storage.length - 1).slice(-1)) + 1}`;
                while (Storage.getItem(this.#id) !== null) {
                    this.#id = `task_${Number(this.#id.slice(-1)) + 1}`;
                }
            } else {
                this.#id = 'task_1';
            };
        }
    };
    
    getId() {
        return this.#id;
    }
    
    setId(id) {
        this.#id = id;
    }
}

export { NewTaskDesk, ResolvedTaskDesk, NewTaskList, ResolvedTaskList, OpenModal, Storage, SortSelect, Task };