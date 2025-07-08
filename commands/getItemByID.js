const pool = require('../db');

module.exports = async function(bot, msg, id) {
    try {
        const [rows] = await pool.query('SELECT * FROM Items WHERE id = ?', [id]);

        if (rows.length === 0) {
            bot.sendMessage(msg.chat.id, 'Предмет с таким ID не найден.');
        } else {
            const item = rows[0];
            bot.sendMessage(msg.chat.id, `(${item.id}) - ${item.name}: ${item.desc}`);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(msg.chat.id, 'Произошла ошибка при поиске.');
    }
};
