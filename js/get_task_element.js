/**
 * Функция получения Node узлов по задачи (поля и кнопки) в виде объекта
 * @param {!string} taskId - Id элемента задачи
 * @returns {object}
 */
function get_task_element(taskId) {
    const TaskElement = {
        li: document.getElementById(taskId),
        inputs: {},
        buttons: {},
    };
    document.querySelectorAll(`li#${taskId} label`).forEach((el) => {
        if(el.childNodes[0].nodeName === '#text' && el.childNodes[1].nodeName === 'INPUT') {
            TaskElement.inputs[el.childNodes[0].data] = el.childNodes[1];
        };
    });
    document.querySelectorAll(`li#${taskId} button`).forEach((el) => {
        TaskElement.buttons[el.textContent] = el;
    });
    return TaskElement;
}

export default get_task_element;