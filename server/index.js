const TelegramBot = require('./classes/TelegramBotClass');
const Arduino = require('./classes/ArduinoClass');

TelegramBot.init();
Arduino.init();

//Wire both services
TelegramBot.onMyPlantsEvent(Arduino);
Arduino.onData(TelegramBot);
Arduino.onError(TelegramBot);




