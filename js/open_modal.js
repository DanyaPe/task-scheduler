import create_task_element from './components/create_task_element.js';
import { Task, NewTaskList, Storage } from './data.js';
import format_date from './format_date.js';

/**
 * Функция открытия модального окна с формой для создания новой задачи в планировщике.
 */
function open_modal() {
    const modal = document.createElement('dialog');
    modal.innerHTML = `
        <form id='new_task_form'>
            <button id='close_cross'>
                <svg width='15px' height='15px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M19 5L5 19M5.00001 5L19 19' stroke='#000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
                </svg>
            </button>
            <label>
                Название задачи: <textarea type='text' id='new_task_name' rows='1'></textarea>
            </label>
            <label>
                Описание задачи: <textarea id='new_task_description' rows='1'></textarea>
            </label>
            <label>
                Дата начала задачи: <input type='datetime-local' id='new_task_start_date' value=${format_date(new Date())}>
            </label>
            <label>
                Дата выполнения задачи: <input type='datetime-local' id='new_task_end_date'>
            </label>
            <button action='submit' id='create_new_task'>Создать задачу</button>
        </form>`;
    document.body.appendChild(modal);
    document.getElementById('new_task_form').addEventListener('submit', (event) => {
        event.preventDefault();
        const taskObj = new Task( {
            'Статус задачи': 'Новая',
            'Название задачи': document.getElementById('new_task_name').value,
            'Описание задачи': document.getElementById('new_task_description').value,
            'Дата начала задачи': document.getElementById('new_task_start_date').value,
            'Дата окончания задачи': document.getElementById('new_task_end_date').value,
        });
        NewTaskList.appendChild(create_task_element(taskObj));
        close_modal(modal);
    });
    document.getElementById('close_cross').addEventListener('click', ()=> {
        close_modal(modal);
    });
    modal.addEventListener('keydown', (event) => {
        if (event.key === 'Esc') close_modal(modal);
    });
    document.querySelectorAll('form textarea,input').forEach((el) => {
        el.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                modal.focus();
            }
        });
        el.addEventListener('input', () => {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        });
    });
    modal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            document.getElementById('new_task_form').dispatchEvent(new Event('submit'));
        }
    });
    modal.showModal();
    modal.focus();
    document.body.classList.add('scroll_lock');
}

/**
 * Функция закрытия модального окна.
 * @param {HTMLDialogElement} modal - HTML элемент "dialog", что представляет собой модальное окно, которое необходимо закрыть
 */
function close_modal(modal) {
    if (modal instanceof Object && modal.nodeName === 'DIALOG') {
        modal.close();
        document.body.removeChild(modal);
        document.body.classList.remove('scroll_lock');
    } else console.log(`не модалка\n${modal}`);
}

export default open_modal;