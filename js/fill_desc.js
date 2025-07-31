import { NewTaskList, ResolvedTaskList, Storage } from "./data.js";
import create_task_element from "./components/create_task_element.js";

/**
 * Функция наполнения досок задачами по данным из хранилища 
 */
function fill_desc() {
    for (let index = 0; index < Storage.length; index++) {
        const Key = Storage.key(index);
        try {
            JSON.parse(Storage.getItem(Key)).status !== 'Решена' ? NewTaskList.appendChild(create_task_element(Key)) : ResolvedTaskList.appendChild(create_task_element(Key)); 
        } catch (error) {
            console.error(`${error}\nОшибка формирования задачи по ключу хранилища: ${Key}`);
            continue
        };
    };
}

export default fill_desc;