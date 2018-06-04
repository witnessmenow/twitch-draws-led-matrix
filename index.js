const TwitchBot = require('twitch-bot');

var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

var colourConversion = {
  red: '0xF800',
  green: '0x07E0',
  blue: '0x001F',
  purple: '0xF81F',
  lightBlue: '0x07FF',
  yellow: '0xFFE0',
  white: '0xFFFF',
  black: '0x0000',
}

console.log('Connecting to display');

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

var socketConnection;
client.on('connect', function(connection) {
  console.log('WebSocket Client Connected');
  socketConnection = connection;
  connection.on('error', function(error) {
      console.log("Connection Error: " + error.toString());
  });
});

client.connect('ws://192.168.1.18:81');

const Bot = new TwitchBot({
 username: 'ledmatrix',
 oauth: process.env.twitchOAuth,
 channels: ['brianlough']
})

Bot.on('join', () => {

  console.log('joined Channel');

 Bot.on('message', chatter => {
   if(chatter.message.indexOf('!draw') === 0) {
      var message = chatter.message.replace('!draw ', '');
      var splitMessage = message.split(' ');
      if(splitMessage.length !== 3){
        Bot.say('Wrong number of params: e.g. !draw 0 0 red');
      } else {
        var x = splitMessage[0];
        var y = splitMessage[1];
        var colour = splitMessage[2].toLowerCase();
        var convertedColour = colourConversion[colour];
        
        if (convertedColour){
          var messageCommand = x + ',' + y + ',' + convertedColour;
          console.log(messageCommand);
          socketConnection.sendUTF(messageCommand);
        } else {
          var colourOptions = object.keys(colourConversion);
          Bot.say('Unsupported Colour, use: ' + colourOptions.join(','));
        }
      }
   }
   else if(chatter.message.indexOf('!rect') === 0) {
    var message = chatter.message.replace('!rect ', '');
    var splitMessage = message.split(' ');
    if(splitMessage.length !== 5){
      Bot.say('Wrong number of params: e.g. !rect x y w h red');
    } else {
      var x = splitMessage[0];
      var y = splitMessage[1];
      var w = splitMessage[2];
      var h = splitMessage[3];
      var colour = splitMessage[4].toLowerCase();
      var convertedColour = colourConversion[colour];
      
      if (convertedColour){
        var messageCommand = x + ',' + y + ',' + w + ',' + h + ',' + convertedColour;
        console.log(messageCommand);
        socketConnection.sendUTF(messageCommand);
      } else {
        var colourOptions = object.keys(colourConversion);
        Bot.say('Unsupported Colour, use: ' + colourOptions.join(','));
      }
    }
 }
 })
})

Bot.on('error', err => {
 console.log(err)
})