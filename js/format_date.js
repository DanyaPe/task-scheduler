/**
 * Функция форматирования даты к строчному виду "datetime-local"
 * @param {!Date} date - Объект Date
 * @returns {string} Строчное представление даты в формате `yyyy-mm-ddThh:mm`
 */
function format_date(date) {
    if (date && !isNaN(date) && date instanceof Date) {
        const day = date.getDate().toString().padStart(2,0);
        const month = (date.getMonth() + 1).toString().padStart(2,0);
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2,0);
        const minutes = date.getMinutes().toString().padStart(2,0);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } else {
        return '';
    }
}

export default format_date;