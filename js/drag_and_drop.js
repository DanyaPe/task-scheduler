import task_resolve from './task_resolve.js';
import task_reopen from './task_reopen.js';

/**
 * Handler-функция для разрешения перетаскивания элементов
 */
function onDragOver(event) {
    event.preventDefault();
}

/**
 * Handler-функция обработки данных при перетаскивании
 */
function onDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

/**
 * Handler-функция закрытие задачи с помощью перетаскивания
 */
function CloseOnDrop(event) {
    task_resolve(event.dataTransfer.getData('text'));
}

/**
 * Handler-функция возврата задачи в работу при перетаскивании
 */
function ReopenOnDrop(event) {
    task_reopen(event.dataTransfer.getData('text'));
}

export {onDragOver, onDragStart, CloseOnDrop, ReopenOnDrop};