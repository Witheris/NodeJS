const pool = require('../db');

module.exports = async (bot, msg) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items ORDER BY RAND() LIMIT 1');

    if (rows.length === 0) {
      bot.sendMessage(msg.chat.id, 'Предметы не найдены в базе.');
      return;
    }

    const item = rows[0];
    const response = `(${item.id}) - ${item.name}: ${item.desc}`;
    bot.sendMessage(msg.chat.id, response);
  } catch (error) {
    console.error('Ошибка в randomItem:', error);
    bot.sendMessage(msg.chat.id, 'Произошла ошибка при получении случайного предмета.');
  }
};