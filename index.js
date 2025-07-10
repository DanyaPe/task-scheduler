import { ResolvedTaskDesk, NewTaskDesk, ResolvedTaskList, NewTaskList, OpenModal } from "./js/data.js";
//import { onDragOver, CloseOnDrop, ReopenOnDrop, onDragLeave } from './js/drag_and_drop.js';
import open_modal from "./js/open_modal.js";
import fill_desc from "./js/fill_desc.js";

/**
 * Добавляем обработчик для кнопки "Новая задача"
 */
OpenModal.addEventListener('click', () => open_modal());

/**
 * Добавляем обработчики на доски (для перетаскивания элементов)
 */
//ResolvedTaskDesk.addEventListener('dragover', onDragOver);
//ResolvedTaskDesk.addEventListener('dragleave', onDragLeave);
//ResolvedTaskDesk.addEventListener('drop', CloseOnDrop);
//NewTaskDesk.addEventListener('dragover', onDragOver);
//NewTaskDesk.addEventListener('dragleave', onDragLeave);
//NewTaskDesk.addEventListener('drop', ReopenOnDrop);

/**
 * Формируем задачи на досках исходя из данных в localStorage
 */
fill_desc();