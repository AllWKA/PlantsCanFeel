const SerialPort = require('serialport');

//This is the port where arduino is conected, you can find this on Arduino editor --> Tools/port
const arduinoPort = "COM3";
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort(arduinoPort, { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimeter: '\r\n' }));

module.exports = {
    init,
    onData,
    onError
}

var humidity = 0;

//Just to load all the utilities in index.js
function init() { }

function onData(TelegramBot) {
    parser.on('data', (data) => {
        setHumidity((100 - (data * 100 / 1023)));
        TelegramBot.sendStatus(humidity);
    });
}

function onError(TelegramBot) {
    parser.on('error', (error) => {
        TelegramBot.sendMessage(error);
    });
}

function setHumidity(value) {
    humidity = value;
}
function getHumidity() {
    return humidity;
}
