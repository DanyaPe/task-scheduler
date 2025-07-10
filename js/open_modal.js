import create_task_element from './components/create_task_element.js';
import { Task, NewTaskList, Storage } from './data.js';

/**
 * Функция открытия модального окна с формой для создания новой задачи в планировщике.
 */
function open_modal() {
    const modal = document.createElement('dialog');
    const id = Storage.length > 0 ? `task_${Number(Storage.key(Storage.length - 1).slice(-1)) + 1}` : 'task_1';
    modal.innerHTML = `
        <form id='create_new_task'>
            <button id='close_cross'>
                <svg width='15px' height='15px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M19 5L5 19M5.00001 5L19 19' stroke='#000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
                </svg>
            </button>
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
            <button action='submit'>Создать задачу</button>
        </form>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => {
        if(event.target == event.currentTarget) {
            close_modal(modal);
        }
    });
    modal.addEventListener('keydown', (event) => {
        if(event.keyCode == 27) {
            close_modal(modal);
        }
    });
    document.getElementById('close_cross').addEventListener('click', ()=> {
        close_modal(modal);
    });
    document.getElementById('create_new_task').addEventListener('submit', (event) => {
        event.preventDefault();
        const taskObj = new Task( {
            'Статус задачи': 'Новая',
            'Название задачи': document.getElementById('new_task_name').value,
            'Описание задачи': document.getElementById('new_task_description').value,
            'Дата начала задачи': document.getElementById('new_task_start_date').value,
            'Дата окончания задачи': document.getElementById('new_task_end_date').value,
        });
        taskObj.setId(id);
        NewTaskList.appendChild(create_task_element(taskObj));
        close_modal(modal);
    });
    modal.showModal();
    document.body.classList.add('scroll_lock');
}

/**
 * Функция закрытия модального окна.
 * @param {HTMLDialogElement} modal - HTML элемент "dialog", что представляет собой модальное окно, которое необходимо закрыть
 */
function close_modal(modal) {
    if(modal instanceof Object && modal.nodeName === 'DIALOG') {
        modal.close();
        document.body.removeChild(modal);
        document.body.classList.remove('scroll_lock');
    }
}

export default open_modal;