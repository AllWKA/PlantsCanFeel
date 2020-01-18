const SerialPort = require('serialport');
const TelegramBot = require('node-telegram-bot-api');

const ArduinoBotService = require('./ArduinoBotService')

const dotenv = require('dotenv');
dotenv.config();

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true })
ArduinoBotService.setBot(telegramBot);

const ReadLine = SerialPort.parsers.Readline;


telegramBot.onText(/\/myplant/, (msg, match) => {
    ArduinoBotService.sendMessage(ArduinoBotService.getHumidity() + "%")
});

telegramBot.onText(/\/start/, (msg, match) => {
    ArduinoBotService.setChatId(msg.chat.id);
});

const port = new SerialPort('COM3', {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({ delimeter: '\r\n' }));

parser.on('data', (data) => {
    ArduinoBotService.setHumidity((100 - (data * 100 / 1023)));
});

parser.on('error', (error) => {
    console.log(error);
});