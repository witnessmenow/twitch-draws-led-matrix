const TwitchBot = require('twitch-bot');

var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

var colourConversion = {
  red: '0xF800',
  green: '0x07E0',
  blue: '0x001F',
  purple: '0xF81F',
  lightblue: '0x07FF',
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

client.connect('ws://192.168.1.24:81');

const Bot = new TwitchBot({
 username: 'ledmatrix',
 oauth: process.env.twitchOAuth,
 channels: ['brianlough']
})

Bot.on('join', () => {

  console.log('joined Channel');

  //let message = chatter.message.replace
 Bot.on('message', chatter => {
  if(chatter.message.indexOf('!help') === 0)
  {
    Bot.say('help!');
    Bot.say('!draw x y col');
    Bot.say('!rect x y w h col');
    Bot.say('!line x1 y1 x2 y2 col');
    Bot.say('!circle x y r col');
    Bot.say('Colours: ' + colourOptions.join(','));
  }
  else if(chatter.message.indexOf('!draw') === 0)
  {
      var message = chatter.message.replace('!draw ', '');
      var splitMessage = message.split(' ');
      if(splitMessage.length !== 3){
        Bot.say('Wrong number of params: e.g. !draw x y col');
      } else {
        var x = splitMessage[0];
        var y = splitMessage[1];
        var colour = splitMessage[2].toLowerCase();
        var convertedColour = colourConversion[colour];
        
        if (!isNaN(x) && !isNaN(y) && convertedColour){
          var messageCommand = '0:'+ x + ',' + y + ',' + convertedColour;
          console.log(messageCommand);
          socketConnection.sendUTF(messageCommand);
        } else {
          var colourOptions = Object.keys(colourConversion);
          Bot.say('Unsupported Colour, use: ' + colourOptions.join(','));
        }
      }
   }
   else if(chatter.message.indexOf('!rect') === 0)
   {
    var message = chatter.message.replace('!rect ', '');
    var splitMessage = message.split(' ');
    if(splitMessage.length !== 5)
    {
      Bot.say('Wrong number of params: e.g. !rect x y w h col');
    }
    else 
    {
      var x = splitMessage[0];
      var y = splitMessage[1];
      var w = splitMessage[2];
      var h = splitMessage[3];
      var colour = splitMessage[4].toLowerCase();
      var convertedColour = colourConversion[colour];
      
      if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) &&convertedColour)
      {
        var messageCommand = "1:" + x + ',' + y + ',' + w + ',' + h + ',' + convertedColour;
        console.log(messageCommand);
        socketConnection.sendUTF(messageCommand);
      }
      else
      {
        var colourOptions = Object.keys(colourConversion);
        Bot.say('Unsupported Colour, use: ' + colourOptions.join(','));
      }
    }
  }
  else if(chatter.message.indexOf('!line') === 0)
   {
    var message = chatter.message.replace('!line ', '');
    var splitMessage = message.split(' ');
    if(splitMessage.length !== 5)
    {
      Bot.say('Wrong number of params: e.g. !line x1 y1 x2 y2 col');
    }
    else 
    {
      var x = splitMessage[0];
      var y = splitMessage[1];
      var w = splitMessage[2];
      var h = splitMessage[3];
      var colour = splitMessage[4].toLowerCase();
      var convertedColour = colourConversion[colour];
      
      if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) &&convertedColour)
      {
        var messageCommand = "2:" + x + ',' + y + ',' + w + ',' + h + ',' + convertedColour;
        console.log(messageCommand);
        socketConnection.sendUTF(messageCommand);
      }
      else
      {
        var colourOptions = Object.keys(colourConversion);
        Bot.say('Unsupported Colour, use: ' + colourOptions.join(','));
      }
    }
  }
  else if(chatter.message.indexOf('!circle') === 0)
   {
    var message = chatter.message.replace('!circle ', '');
    var splitMessage = message.split(' ');
    if(splitMessage.length !== 4)
    {
      Bot.say('Wrong number of params: e.g. !circle x y r col');
    }
    else 
    {
      var x = splitMessage[0];
      var y = splitMessage[1];
      var r = splitMessage[2];
      var colour = splitMessage[3].toLowerCase();
      var convertedColour = colourConversion[colour];
      
      if (!isNaN(x) && !isNaN(y) && !isNaN(r) && convertedColour)
      {
        var messageCommand = "3:" + x + ',' + y + ',' + r + ',' + convertedColour;
        console.log(messageCommand);
        socketConnection.sendUTF(messageCommand);
      }
      else
      {
        var colourOptions = Object.keys(colourConversion);
        Bot.say('Unsupported Colour, use: ' + colourOptions.join(','));
      }
    }
  }
 })
})

Bot.on('error', err => {
 console.log(err)
})