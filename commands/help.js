module.exports = (bot, msg) => {
    const helpText = `
Доступные команды:
/help - список команд
/site - ссылка на сайт
/creator - информация о создателе
/randomItem - случайный предмет из базы
/getItemByID ID - получить предмет по ID
/deleteItem ID - удалить предмет по ID
    `;
    bot.sendMessage(msg.chat.id, helpText);
};
