const TelegramBot = require('node-telegram-bot-api');

module.exports = {
    setHumidity,
    getHumidity,
    setChatId,
    getChatId,
    setBot,
    sendMessage
};

var humidity = 0;
var chat_id = 0;
var telegramBot = new TelegramBot();

function setHumidity(value) {
    humidity = value;
    sendMessage(humidity + "%");
}
function getHumidity() {
    return humidity;
}

function setChatId(id) {
    chat_id = id;
}
function getChatId() {
    return chat_id;
}

function setBot(bot) {
    telegramBot = bot;
}

function sendMessage(msg) {
    telegramBot.sendMessage(chat_id, msg);
}