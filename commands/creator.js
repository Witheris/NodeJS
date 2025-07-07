const config = require('../bot-config');

module.exports = (bot, msg) => {
    bot.sendMessage(msg.chat.id, `Создатель: ${config.creatorName}`);
};