# twitch-draws-led-matrix

Twitch Chat bot to draw on an LED matrix

![stream](https://i.imgur.com/O87D9ze.jpg)

Does work, but very much a work in progress.

Feel free to reach out if you have any questions:

- [YouTube](https://www.youtube.com/c/BrianLough)
- [Twitch](https://www.twitch.tv/brianlough)
- [Twitter](https://twitter.com/witnessmenow)

## Instructions

1. Setup up display as described [here](https://github.com/witnessmenow/ESP8266-Led-Matrix-Web-Draw), including installing the DisplayWithWebscokets.ino
2. Edit index.js to update the url of your esp8266
3. Either add your twitch Auth token to your environment variables as 'twitchOAuth' or paste it manually into index.js

## Usage

!draw x y color e.g. !draw 0 0 red
