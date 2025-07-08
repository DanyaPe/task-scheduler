import task_resolve from './task/task_resolve.js';
import task_reopen from './task/task_reopen.js';

/**
 * Handler-функция обработки данных при перетаскивании
 */
function onDragStart(event) {
    event.dataTransfer.setData('id', event.target.id);
    event.dataTransfer.setData('isLeave', false);
}

/**
 * Handler-функция для разрешения перетаскивания элементов
 */
function onDragOver(event) {
    event.preventDefault();
}

/**
 * Handler-функция для определения выхода элемента из зоны сброса
 */
function onDragLeave(event) {
    event.dataTransfer.setData('isLeave', true);
}

/**
 * Handler-функция закрытие задачи с помощью перетаскивания
 */
function CloseOnDrop(event) {
    console.log(event.dataTransfer.getData('isLeave'));
    if(event.dataTransfer.getData('isLeave')) task_resolve(event.dataTransfer.getData('id'));
}

/**
 * Handler-функция возврата задачи в работу при перетаскивании
 */
function ReopenOnDrop(event) {
    console.log(event.dataTransfer.getData('isLeave'));
    if(event.dataTransfer.getData('isLeave')) task_reopen(event.dataTransfer.getData('id'));
}

export { onDragOver, onDragStart, CloseOnDrop, ReopenOnDrop, onDragLeave };