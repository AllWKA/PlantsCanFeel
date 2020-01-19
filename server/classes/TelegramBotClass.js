const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

//Read .env section in README.md
const dotenv = require('dotenv');
dotenv.config();

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true });
var chat_id = 48631599;

module.exports = {
    init,
    onMyPlantsEvent,
    sendMessage,
    sendStatus
}

function init() {
    telegramBot.onText(/\/start/, (msg) => {
        setChatId(msg.chat.id);
    });
}

function onMyPlantsEvent(Arduino) {
    telegramBot.onText(/\/myplant/, (msg, match) => {
        sendMessage(Arduino.getHumidity() + "%");
    });
}
function setChatId(id) {
    chat_id = id;
}
function getChatId() {
    return chat_id;
}
function sendMessage(msg) {
    telegramBot.sendMessage(getChatId(), msg);
}
function sendStatus(humidity) {
    var stream;

    if (humidity < 10) {
        stream = fs.createReadStream('./sounds/scream.mp3');
        setTimeout(() => { sendMessage("You are a horrible person, human...") }, 10000);
    } else if (humidity > 10 && humidity < 70) {
        stream = fs.createReadStream('./sounds/nioce.mp3');
    } else {
        stream = fs.createReadStream('./sounds/drown.mp3');
        setTimeout(() => { sendMessage("I dont know how your plant still alive.") }, 10000);
    }

    telegramBot.sendVoice(chat_id, stream);
}
