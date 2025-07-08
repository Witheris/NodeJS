const TelegramBot = require('node-telegram-bot-api');
const config = require('./bot-config');

const helpCommand = require('./commands/help');
const siteCommand = require('./commands/site');
const creatorCommand = require('./commands/creator');
const getItemByIDCommand = require('./commands/getItemByID');
const deleteItemCommand = require('./commands/deleteItem');

const bot = new TelegramBot(config.token, { polling: true });

const userStates = {}; 

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет, октагон!');
});
bot.onText(/\/help/, (msg) => {
    helpCommand(bot, msg);
});

bot.onText(/\/site/, (msg) => {
    siteCommand(bot, msg);
});

bot.onText(/\/creator/, (msg) => {
    creatorCommand(bot, msg);
});
bot.onText(/\/randomItem/, (msg) => {
  require('./commands/randomItem')(bot, msg);
});

bot.onText(/\/getItemByID/, (msg) => {
    userStates[msg.chat.id] = 'awaiting_get_id';
    bot.sendMessage(msg.chat.id, 'Введите ID предмета для поиска:');
});

bot.onText(/\/deleteItem/, (msg) => {
    userStates[msg.chat.id] = 'awaiting_delete_id';
    bot.sendMessage(msg.chat.id, 'Введите ID предмета для удаления:');
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const state = userStates[chatId];

    if (msg.text.startsWith('/')) return;

    if (state === 'awaiting_get_id') {
        const id = parseInt(msg.text);
        if (isNaN(id)) {
            bot.sendMessage(chatId, 'Неверный ID. Введите целое число.');
        } else {
            getItemByIDCommand(bot, msg, id);
        }
        delete userStates[chatId];
    }

    if (state === 'awaiting_delete_id') {
        const id = parseInt(msg.text);
        if (isNaN(id)) {
            bot.sendMessage(chatId, 'Неверный ID. Введите целое число.');
        } else {
            deleteItemCommand(bot, msg, id);
        }
        delete userStates[chatId];
    }
});
