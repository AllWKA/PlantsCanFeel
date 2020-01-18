const SerialPort = require('serialport');

const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort('COM3', {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({ delimeter: '\r\n' }));

parser.on('open', () => {
    console.log("connection open");
});

parser.on('data', (data) => {
    console.log((100 - (data * 100 / 1023)) + "%");
})

parser.on('error', (error) => {
    console.log(error);
});