import { Storage } from "./data.js";

/**
 * Функция проверки количества записей в хранилище данных, если записей 10 или больше - функция блокирует кнопку создания задач
 */
function storage_check() {
    if (Storage.length >= 10) {
        document.getElementById('open_modal').disabled = true;
    } else {
        document.getElementById('open_modal').disabled = false;
    }
}

export default storage_check;