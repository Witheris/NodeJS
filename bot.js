const TelegramBot = require('node-telegram-bot-api');


const token = '8104875471:AAE8-Bg1Uv7t6NHjaZlKNod68Bc2iCPwwZU';


const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;


  bot.sendMessage(chatId, 'Привет, октагон!');
});