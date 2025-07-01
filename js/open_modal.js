import create_task_element from './create_task_element.js';
import { Task, NewTaskList } from './data.js';

/**
 * Функция открытия модального окна с формой для создания новой задачи в планировщике.
 */
function open_modal() {
    const modal = document.createElement('dialog');
    modal.innerHTML = `
        <form>
            <label>
                Название задачи: <input type='text' id='new_task_name'>
            </label>
            <label>
                Описание задачи: <textarea id='new_task_description' rows='3'></textarea>
            </label>
            <label>
                Дата начала задачи: <input type='datetime-local' id='new_task_start_date'>
            </label>
            <label>
                Дата выполнения задачи: <input type='datetime-local' id='new_task_end_date'>
            </label>
            <button id='create_new_task'>Создать задачу</button>
        </form>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => {
        if(event.target == event.currentTarget) {
            modal.close();
            document.body.removeChild(modal);
            document.body.classList.remove('scroll_lock');
        }
    });
    document.getElementById('create_new_task').addEventListener('click', () => {
        NewTaskList.appendChild(create_task_element(new Task( {
            'Статус задачи': 'Новая',
            'Название задачи': document.getElementById('new_task_name').value,
            'Описание задачи': document.getElementById('new_task_description').value,
            'Дата начала задачи': document.getElementById('new_task_start_date').value,
            'Дата окончания задачи': document.getElementById('new_task_end_date').value,
            'Другое поле задачи': 'Дополнительная информация',
        })));
        modal.close();
        document.body.removeChild(modal);
        document.body.classList.remove('scroll_lock');
    });
    modal.showModal();
    document.body.classList.add('scroll_lock');
}

export default open_modal;