import create_task_element from './components/create_task_element.js';
import { OpenModal, Task, NewTaskList } from './data.js';
import format_date from './format_date.js';

/**
 * Функция открытия модального окна с формой для создания новой задачи в планировщике.
 */
function open_modal() {
    const modal = document.createElement('dialog');
    modal.innerHTML = `
        <form id='new_task_form'>
            <button id='close_cross' class='cross'>
                <svg width='15px' height='15px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M19 5L5 19M5.00001 5L19 19' stroke='#000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
                </svg>
            </button>
            <label>Статус задачи:<input type='text' name='status' id='new_task_status' value='Новая' disabled></label>
            <label>Название задачи:<textarea name='name' id='new_task_name' rows='1'></textarea></label>
            <label>Описание задачи:<textarea name='description' id='new_task_description' rows='1'></textarea></label>
            <label>Дата начала задачи:<input type='datetime-local' name='startDate' id='new_task_start_date' value='${format_date(new Date)}'></label>
            <label>Дата выполнения задачи:<input type='datetime-local' name='endDate' id='new_task_end_date'></label>
            <button action='submit' id='create_new_task'>Создать задачу</button>
        </form>`;
    document.body.appendChild(modal);
    const form = modal.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const option = {};
        for (let node of form) {
            if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') option[node.name] = node.value;
        };
        OpenModal.after(create_task_element(new Task(option)));
        close_modal(modal);
    });
    form.querySelector('#close_cross').addEventListener('click', ()=> {
        close_modal(modal);
    });
    form.querySelectorAll('textarea, input').forEach((el) => {
        el.addEventListener('input', () => {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        });
    });
    modal.addEventListener('keydown', (event) => {
        if (event.key === 'Esc') close_modal(modal);
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
    } else console.log(`Ошибка выполнения функции, переданный аргумент не является элементом модального окна\n${modal}`);
}

export default open_modal;