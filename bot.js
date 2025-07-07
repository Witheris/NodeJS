const TelegramBot = require('node-telegram-bot-api');
const config = require('./bot-config');

const helpCommand = require('./commands/help');
const siteCommand = require('./commands/site');
const creatorCommand = require('./commands/creator');

const bot = new TelegramBot(config.token, { polling: true });

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
