const pool = require('../db');

module.exports = async function(bot, msg, id) {
    try {
        const [result] = await pool.query('DELETE FROM Items WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            bot.sendMessage(msg.chat.id, 'Ошибка: предмет с таким ID не найден.');
        } else {
            bot.sendMessage(msg.chat.id, `Предмет с ID ${id} успешно удалён.`);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(msg.chat.id, 'Произошла ошибка при удалении.');
    }
};
