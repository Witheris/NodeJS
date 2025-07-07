module.exports = (bot, msg) => {
    const commands = `
Доступные команды:
/help - список команд
/site - ссылка на сайт Октагона
/creator - информация о создателе
    `;
    bot.sendMessage(msg.chat.id, commands);
};