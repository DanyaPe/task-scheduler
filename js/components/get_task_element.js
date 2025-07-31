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
    document.querySelectorAll(`li#${taskId} label`).forEach((label) => {
        for (let field of label.childNodes) {
            if (field.nodeName === 'INPUT' || field.nodeName === 'TEXTAREA') TaskElement.inputs[field.name] = field;
        };
    });
    document.querySelectorAll(`li#${taskId} button`).forEach((button) => {
        TaskElement.buttons[button.textContent] = button;
    });
    return TaskElement;
}

export default get_task_element;